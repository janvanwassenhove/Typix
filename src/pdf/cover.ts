import type { jsPDF } from 'jspdf'
import type { ChartImage } from './charts'
import type { Layout } from './layout'
import { CONTENT_WIDTH, COLORS, PAGE, TYPE, printable, rgb } from './theme'

export interface CoverOptions {
  assessmentTitle: string
  /** The result itself, e.g. "Dominance" or "The Investigator". */
  headline: string
  /** One line under the headline — the style or type description. */
  standfirst: string
  /** Short pill under the standfirst, e.g. "D/I — INITIATOR". */
  badge?: string
  chart?: ChartImage | null
  participant: string
  preparedForLabel: string
  generatedOnLabel: string
  generatedOn: string
  footnote: string
}

const BAND_HEIGHT = 54

/**
 * A single cover page: brand band, the result, and the chart. Everything that
 * needs explaining waits until page 2 — the cover exists so the document reads
 * as a deliverable rather than a screen capture.
 */
export function drawCover(doc: jsPDF, layout: Layout, options: CoverOptions) {
  const fill = (hex: string) => {
    const [r, g, b] = rgb(hex)
    doc.setFillColor(r, g, b)
  }
  const text = (hex: string) => {
    const [r, g, b] = rgb(hex)
    doc.setTextColor(r, g, b)
  }

  // --- brand band -------------------------------------------------------
  fill(COLORS.brand)
  doc.rect(0, 0, PAGE.width, BAND_HEIGHT, 'F')
  fill(COLORS.accent)
  doc.rect(0, BAND_HEIGHT, PAGE.width, 1.6, 'F')

  doc.setFont('helvetica', 'bold')
  doc.setFontSize(22)
  text(COLORS.white)
  doc.text('TYPIX', PAGE.margin.left, 26)

  doc.setFont('helvetica', 'normal')
  doc.setFontSize(TYPE.micro)
  text(COLORS.accent)
  doc.text('ASSESSMENT PLATFORM', PAGE.margin.left, 31.5)

  doc.setFont('helvetica', 'normal')
  doc.setFontSize(TYPE.coverSubtitle)
  text(COLORS.white)
  doc.text(
    printable(options.assessmentTitle),
    PAGE.width - PAGE.margin.right,
    26,
    { align: 'right' }
  )

  // --- result -----------------------------------------------------------
  let y = BAND_HEIGHT + 24

  doc.setFont('helvetica', 'bold')
  doc.setFontSize(TYPE.coverTitle)
  text(COLORS.ink)
  const headlineLines = doc.splitTextToSize(printable(options.headline), CONTENT_WIDTH) as string[]
  headlineLines.forEach(line => {
    doc.text(line, PAGE.width / 2, y, { align: 'center' })
    y += TYPE.coverTitle * 0.3528 * 1.2
  })

  y += 2
  doc.setFont('helvetica', 'normal')
  doc.setFontSize(TYPE.body)
  text(COLORS.muted)
  const standfirstLines = doc.splitTextToSize(printable(options.standfirst), CONTENT_WIDTH - 30) as string[]
  standfirstLines.forEach(line => {
    doc.text(line, PAGE.width / 2, y, { align: 'center' })
    y += TYPE.body * 0.3528 * 1.45
  })

  if (options.badge) {
    y += 4
    doc.setFont('helvetica', 'bold')
    doc.setFontSize(TYPE.subheading)
    const label = printable(options.badge)
    const badgeWidth = doc.getTextWidth(label) + 16
    fill(COLORS.accent)
    doc.roundedRect(PAGE.width / 2 - badgeWidth / 2, y - 5, badgeWidth, 9, 4.5, 4.5, 'F')
    text(COLORS.white)
    doc.text(label, PAGE.width / 2, y + 1, { align: 'center' })
    y += 10
  }

  // --- chart ------------------------------------------------------------
  const blockTop = PAGE.height - 48

  if (options.chart) {
    // Centre the chart in whatever room is left between the result and the
    // footer block, so the cover stays balanced whatever the headline length.
    const available = blockTop - 8 - y
    const width = Math.min(112, available * options.chart.aspect)
    const height = width / options.chart.aspect
    doc.addImage(
      options.chart.dataUrl, 'PNG',
      PAGE.width / 2 - width / 2, y + (available - height) / 2,
      width, height, undefined, 'FAST'
    )
  }

  // --- prepared for -----------------------------------------------------
  const [rr, rg, rb] = rgb(COLORS.rule)
  doc.setDrawColor(rr, rg, rb)
  doc.setLineWidth(0.2)
  doc.line(PAGE.margin.left, blockTop, PAGE.width - PAGE.margin.right, blockTop)

  doc.setFont('helvetica', 'normal')
  doc.setFontSize(TYPE.micro)
  text(COLORS.muted)
  doc.text(printable(options.preparedForLabel.toUpperCase()), PAGE.margin.left, blockTop + 7)
  doc.text(
    printable(options.generatedOnLabel.toUpperCase()),
    PAGE.width - PAGE.margin.right,
    blockTop + 7,
    { align: 'right' }
  )

  doc.setFont('helvetica', 'bold')
  doc.setFontSize(TYPE.subheading)
  text(COLORS.ink)
  doc.text(printable(options.participant), PAGE.margin.left, blockTop + 13)
  doc.setFont('helvetica', 'normal')
  doc.text(
    printable(options.generatedOn),
    PAGE.width - PAGE.margin.right,
    blockTop + 13,
    { align: 'right' }
  )

  doc.setFont('helvetica', 'normal')
  doc.setFontSize(TYPE.micro)
  text(COLORS.muted)
  const footnoteLines = doc.splitTextToSize(printable(options.footnote), CONTENT_WIDTH) as string[]
  footnoteLines.forEach((line, i) => {
    doc.text(line, PAGE.margin.left, blockTop + 23 + i * 3.6)
  })

  layout.y = PAGE.margin.top
}
