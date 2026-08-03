import type { jsPDF } from 'jspdf'
import { CONTENT_WIDTH, COLORS, PAGE, SPACE, TYPE, printable, rgb } from './theme'

/** 1 point in millimetres — jsPDF sizes text in points but lays out in mm. */
const PT_TO_MM = 0.3528

export interface DocumentMeta {
  participant: string
  assessmentTitle: string
  generatedOn: string
  /** Rendered bottom-right, e.g. "Page 2 of 5". */
  pageLabel: (page: number, total: number) => string
  disclaimer: string
}

export interface ChipStyle {
  columns?: number
  accent?: string
}

export interface BarRow {
  label: string
  sublabel?: string
  value: number
  color: string
  /** Raw count behind the percentage, set beneath it in small type. */
  note?: string
}

/**
 * A thin layout engine over jsPDF: a vertical cursor, automatic page breaks,
 * and blocks that measure themselves before they draw so a heading is never
 * orphaned at the foot of a page.
 */
export function createLayout(doc: jsPDF, meta: DocumentMeta) {
  const bottomLimit = PAGE.height - PAGE.margin.bottom
  let y = PAGE.margin.top
  /** Cover has no running header; content pages do. */
  let coverPages = 0

  const lineHeight = (size: number) => size * PT_TO_MM * SPACE.lineHeight

  function setFill(hex: string) {
    const [r, g, b] = rgb(hex)
    doc.setFillColor(r, g, b)
  }

  function setStroke(hex: string) {
    const [r, g, b] = rgb(hex)
    doc.setDrawColor(r, g, b)
  }

  function setText(hex: string) {
    const [r, g, b] = rgb(hex)
    doc.setTextColor(r, g, b)
  }

  function font(style: 'normal' | 'bold' | 'italic', size: number, color: string = COLORS.body) {
    doc.setFont('helvetica', style)
    doc.setFontSize(size)
    setText(color)
  }

  /**
   * Wrapping is measured against the active font, so the font has to be
   * selected before the text is split — otherwise a paragraph is broken as if
   * it were still set in the previous heading's size.
   */
  function wrap(
    text: string,
    width = CONTENT_WIDTH,
    size: number = TYPE.body,
    style: 'normal' | 'bold' | 'italic' = 'normal'
  ): string[] {
    doc.setFont('helvetica', style)
    doc.setFontSize(size)
    return doc.splitTextToSize(printable(text), width) as string[]
  }

  function drawRunningHeader() {
    font('normal', TYPE.micro, COLORS.muted)
    doc.text(printable(meta.assessmentTitle.toUpperCase()), PAGE.margin.left, PAGE.margin.top - 10)
    doc.text(printable(meta.participant), PAGE.width - PAGE.margin.right, PAGE.margin.top - 10, { align: 'right' })
    setStroke(COLORS.rule)
    doc.setLineWidth(0.2)
    doc.line(PAGE.margin.left, PAGE.margin.top - 7, PAGE.width - PAGE.margin.right, PAGE.margin.top - 7)
  }

  function newPage() {
    doc.addPage()
    drawRunningHeader()
    y = PAGE.margin.top
  }

  /** Called once the cover is finished, so page numbering can skip it. */
  function beginContent() {
    coverPages = doc.getNumberOfPages()
    newPage()
  }

  function ensure(height: number) {
    if (y + height > bottomLimit) newPage()
  }

  function space(amount: number) {
    y += amount
  }

  /**
   * @param reserve millimetres of following content to keep on the same page as
   * the title. Passing the measured height of the whole section moves it across
   * a page boundary in one piece instead of leaving a stub behind.
   */
  function sectionTitle(text: string, reserve?: number) {
    const height = lineHeight(TYPE.sectionTitle)
    // Breathing room above, so a title never butts up against the block before
    // it — but not at the top of a fresh page, where the margin already gives it.
    if (y > PAGE.margin.top + 1) y += SPACE.betweenSections - SPACE.afterParagraph
    // Keep the title with at least two lines of whatever follows it.
    const wanted = reserve ?? lineHeight(TYPE.body) * 2
    ensure(height + Math.min(wanted, bottomLimit - PAGE.margin.top - height))
    setFill(COLORS.accent)
    doc.rect(PAGE.margin.left, y - 3.4, 1.6, height + 0.6, 'F')
    font('bold', TYPE.sectionTitle, COLORS.ink)
    doc.text(printable(text), PAGE.margin.left + 5, y + 0.6)
    y += height + SPACE.afterSectionTitle
  }

  function subheading(text: string) {
    const height = lineHeight(TYPE.subheading)
    // Keep a subheading with the first two lines that belong to it.
    ensure(height + lineHeight(TYPE.body) * 2)
    font('bold', TYPE.subheading, COLORS.brand)
    doc.text(printable(text), PAGE.margin.left, y)
    y += height + 1.5
  }

  interface ParagraphOptions {
    size?: number
    color?: string
    style?: 'normal' | 'italic'
    gap?: number
    width?: number
    indent?: number
  }

  function paragraph(text: string, options: ParagraphOptions = {}) {
    const size = options.size ?? TYPE.body
    const width = options.width ?? CONTENT_WIDTH
    const indent = options.indent ?? 0
    const style = options.style ?? 'normal'
    const lines = wrap(text, width - indent, size, style)
    const step = lineHeight(size)

    for (const line of lines) {
      ensure(step)
      font(style, size, options.color ?? COLORS.body)
      doc.text(line, PAGE.margin.left + indent, y)
      y += step
    }
    y += options.gap ?? SPACE.afterParagraph
  }

  function bullets(items: string[]) {
    const step = lineHeight(TYPE.body)
    for (const item of items) {
      const lines = wrap(item, CONTENT_WIDTH - 6, TYPE.body)
      ensure(step * lines.length)
      setFill(COLORS.accent)
      doc.circle(PAGE.margin.left + 1.4, y - 1.1, 0.7, 'F')
      font('normal', TYPE.body, COLORS.body)
      lines.forEach((line, i) => {
        doc.text(line, PAGE.margin.left + 6, y + i * step)
      })
      y += step * lines.length + 1.2
    }
    y += SPACE.afterParagraph - 1.2
  }

  /** Trait labels in a tidy grid of soft cards. */
  function chips(items: string[], style: ChipStyle = {}) {
    const columns = style.columns ?? 3
    const gutter = 3
    const cellWidth = (CONTENT_WIDTH - gutter * (columns - 1)) / columns
    const padding = 2.6

    for (let i = 0; i < items.length; i += columns) {
      const row = items.slice(i, i + columns)
      const wrapped = row.map(item => wrap(item, cellWidth - padding * 2, TYPE.small))
      const rowLines = Math.max(...wrapped.map(lines => lines.length))
      const rowHeight = rowLines * lineHeight(TYPE.small) + padding * 2

      ensure(rowHeight + gutter)

      wrapped.forEach((lines, column) => {
        const x = PAGE.margin.left + column * (cellWidth + gutter)
        setFill(COLORS.panel)
        setStroke(COLORS.rule)
        doc.setLineWidth(0.2)
        doc.roundedRect(x, y, cellWidth, rowHeight, 1.6, 1.6, 'FD')
        setFill(style.accent ?? COLORS.accent)
        doc.rect(x, y + 1.4, 1.2, rowHeight - 2.8, 'F')
        font('normal', TYPE.small, COLORS.ink)
        lines.forEach((line, l) => {
          doc.text(line, x + padding + 1.4, y + padding + 2.4 + l * lineHeight(TYPE.small))
        })
      })

      y += rowHeight + gutter
    }
    y += SPACE.afterParagraph - gutter
  }

  /** Horizontal score bars with the value called out on the right. */
  function bars(rows: BarRow[]) {
    const rowHeight = 10
    const labelWidth = 34
    // The raw count sits under the percentage, so the right column has to be
    // wide enough for the longer of the two.
    const valueWidth = rows.some(row => row.note) ? 30 : 14
    const trackX = PAGE.margin.left + labelWidth
    const trackWidth = CONTENT_WIDTH - labelWidth - valueWidth
    const barHeight = 4.2

    ensure(rowHeight * rows.length)

    for (const row of rows) {
      font('bold', TYPE.body, COLORS.ink)
      doc.text(printable(row.label), PAGE.margin.left, y + 3.2)
      if (row.sublabel) {
        font('normal', TYPE.micro, COLORS.muted)
        doc.text(printable(row.sublabel), PAGE.margin.left, y + 6.6)
      }

      setFill(COLORS.rule)
      doc.roundedRect(trackX, y, trackWidth, barHeight, barHeight / 2, barHeight / 2, 'F')

      const filled = Math.max(0, Math.min(100, row.value)) / 100 * trackWidth
      if (filled > 0.5) {
        setFill(row.color)
        doc.roundedRect(trackX, y, filled, barHeight, barHeight / 2, barHeight / 2, 'F')
      }

      font('bold', TYPE.body, COLORS.ink)
      doc.text(`${row.value}%`, PAGE.width - PAGE.margin.right, y + 3.4, { align: 'right' })
      if (row.note) {
        font('normal', TYPE.micro, COLORS.muted)
        doc.text(printable(row.note), PAGE.width - PAGE.margin.right, y + 6.8, { align: 'right' })
      }

      y += rowHeight
    }
    y += SPACE.afterParagraph
  }

  /**
   * A tinted block whose height is measured before it is drawn, so the
   * background always encloses exactly the content placed inside it.
   */
  function panel(measure: () => number, render: () => void, options: { fill?: string; accent?: string } = {}) {
    const padding = 5
    // Text is drawn from its baseline, so the first line needs a little extra
    // room above it for the panel to look evenly padded.
    const baseline = 3
    const height = measure() + padding * 2 + baseline
    ensure(height)

    setFill(options.fill ?? COLORS.panel)
    doc.roundedRect(PAGE.margin.left, y, CONTENT_WIDTH, height, 2, 2, 'F')
    if (options.accent) {
      setFill(options.accent)
      doc.roundedRect(PAGE.margin.left, y, 2, height, 1, 1, 'F')
    }

    const top = y
    y += padding + baseline
    render()
    y = top + height + SPACE.afterParagraph
  }

  /** Measure a paragraph without drawing it, for panel sizing. */
  function measureParagraph(text: string, size = TYPE.body, width = CONTENT_WIDTH): number {
    return wrap(text, width, size).length * lineHeight(size)
  }

  function measureBullets(items: string[]): number {
    const step = lineHeight(TYPE.body)
    return items.reduce(
      (total, item) => total + wrap(item, CONTENT_WIDTH - 6, TYPE.body).length * step + 1.2,
      0
    ) + SPACE.afterParagraph - 1.2
  }

  function measureChips(items: string[], columns = 3): number {
    const gutter = 3
    const cellWidth = (CONTENT_WIDTH - gutter * (columns - 1)) / columns
    const padding = 2.6
    let total = 0
    for (let i = 0; i < items.length; i += columns) {
      const rowLines = Math.max(
        ...items.slice(i, i + columns).map(item => wrap(item, cellWidth - padding * 2, TYPE.small).length)
      )
      total += rowLines * lineHeight(TYPE.small) + padding * 2 + gutter
    }
    return total + SPACE.afterParagraph - gutter
  }

  function measureSubheading(): number {
    return lineHeight(TYPE.subheading) + 1.5
  }

  function image(dataUrl: string, widthMm: number, aspect: number, options: { caption?: string } = {}) {
    const heightMm = widthMm / aspect
    const captionHeight = options.caption ? lineHeight(TYPE.small) * 2 + 2 : 0
    ensure(heightMm + captionHeight + 2)

    const x = PAGE.margin.left + (CONTENT_WIDTH - widthMm) / 2
    doc.addImage(dataUrl, 'PNG', x, y, widthMm, heightMm, undefined, 'FAST')
    y += heightMm + 2

    if (options.caption) {
      const lines = wrap(options.caption, CONTENT_WIDTH - 20, TYPE.small)
      font('normal', TYPE.small, COLORS.muted)
      lines.forEach(line => {
        doc.text(line, PAGE.width / 2, y, { align: 'center' })
        y += lineHeight(TYPE.small)
      })
    }
    y += SPACE.afterParagraph
  }

  function rule() {
    ensure(4)
    setStroke(COLORS.rule)
    doc.setLineWidth(0.2)
    doc.line(PAGE.margin.left, y, PAGE.width - PAGE.margin.right, y)
    y += 4
  }

  /** Stamps the footer on every content page once the total is known. */
  function finalize() {
    const total = doc.getNumberOfPages()
    for (let page = coverPages + 1; page <= total; page++) {
      doc.setPage(page)
      const footerY = PAGE.height - PAGE.margin.bottom + 8

      setStroke(COLORS.rule)
      doc.setLineWidth(0.2)
      doc.line(PAGE.margin.left, footerY - 4, PAGE.width - PAGE.margin.right, footerY - 4)

      font('normal', TYPE.micro, COLORS.muted)
      doc.text(printable(meta.disclaimer), PAGE.margin.left, footerY)
      // Absolute numbering, cover included, so "page 2 of 3" matches the
      // sheets the reader is holding.
      doc.text(
        printable(meta.pageLabel(page, total)),
        PAGE.width - PAGE.margin.right,
        footerY,
        { align: 'right' }
      )
    }
  }

  return {
    get y() { return y },
    set y(value: number) { y = value },
    doc,
    lineHeight,
    setFill,
    setStroke,
    font,
    wrap,
    beginContent,
    newPage,
    ensure,
    space,
    sectionTitle,
    subheading,
    paragraph,
    bullets,
    chips,
    bars,
    panel,
    measureParagraph,
    measureBullets,
    measureChips,
    measureSubheading,
    image,
    rule,
    finalize
  }
}

export type Layout = ReturnType<typeof createLayout>
