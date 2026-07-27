import type { jsPDF } from 'jspdf'
import type { ChartImage } from './charts'
import { drawCover } from './cover'
import { createLayout, type Layout } from './layout'
import { CONTENT_WIDTH, COLORS, TYPE } from './theme'
import { DISC_STYLES, type DiscScores, type DiscStyle } from '../scoring/disc'
import { ENNEAGRAM_TYPES, type EnneagramScores } from '../scoring/enneagram'
import { COLOR_KEYS, type ColorKey, type InsightsScores } from '../scoring/insights'
import type { DiscContent } from '../i18n/content/disc'
import type { EnneagramContent } from '../i18n/content/enneagram'
import type { InsightsContent } from '../i18n/content/insights'

export interface PdfContext {
  participant: string
  assessmentTitle: string
  generatedOn: string
  t: (key: string, vars?: Record<string, string | number>) => string
}

function startDocument(doc: jsPDF, ctx: PdfContext): Layout {
  return createLayout(doc, {
    participant: ctx.participant,
    assessmentTitle: ctx.assessmentTitle,
    generatedOn: ctx.generatedOn,
    pageLabel: (page, total) => ctx.t('pdf_page', { page, total }),
    disclaimer: ctx.t('pdf_disclaimer')
  })
}

function answeredLabel(ctx: PdfContext, answered: number): string {
  return ctx.t(answered === 1 ? 'based_on_answers_one' : 'based_on_answers_other', { count: answered })
}

function footnote(layout: Layout, text: string) {
  layout.font('normal', TYPE.micro, COLORS.muted)
  layout.doc.text(text, CONTENT_WIDTH + 20, layout.y, { align: 'right' })
  layout.y += 5
}

/** Closes every report with the same short note on how the numbers were produced. */
function methodology(layout: Layout, ctx: PdfContext, methodKey: string) {
  layout.sectionTitle(ctx.t('pdf_section_how_to_read'))
  layout.panel(
    () => layout.measureParagraph(ctx.t(methodKey), TYPE.small, CONTENT_WIDTH - 12),
    () => layout.paragraph(ctx.t(methodKey), { size: TYPE.small, color: COLORS.body, indent: 6, width: CONTENT_WIDTH - 6, gap: 0 })
  )
}

// ---------------------------------------------------------------- DISC

export interface DiscPdfData {
  scores: DiscScores
  content: DiscContent
  styleColors: Record<DiscStyle, string>
  chart: ChartImage | null
}

export function buildDiscPdf(doc: jsPDF, ctx: PdfContext, data: DiscPdfData): void {
  const { scores, content } = data
  const style = content.styles[scores.primary]
  const combination = content.combinations[scores.combination]
  const layout = startDocument(doc, ctx)

  drawCover(doc, layout, {
    assessmentTitle: ctx.assessmentTitle,
    headline: style.name,
    standfirst: style.description,
    badge: `${scores.combination} · ${combination.name}`,
    chart: data.chart,
    participant: ctx.participant,
    preparedForLabel: ctx.t('pdf_prepared_for'),
    generatedOnLabel: ctx.t('pdf_generated_on'),
    generatedOn: ctx.generatedOn,
    footnote: ctx.t('pdf_cover_note')
  })

  layout.beginContent()

  layout.sectionTitle(ctx.t('pdf_section_scores'))
  layout.bars(DISC_STYLES.map(key => ({
    label: key,
    sublabel: content.styles[key].name,
    value: scores.percentages[key],
    color: data.styleColors[key]
  })))
  footnote(layout, answeredLabel(ctx, scores.answered))

  layout.sectionTitle(`${scores.combination} · ${combination.name}`)
  layout.paragraph(combination.description)
  layout.subheading(ctx.t('disc_key_characteristics'))
  layout.chips(combination.traits)

  layout.sectionTitle(ctx.t('disc_behavioral_strengths'))
  layout.chips(style.traits, { columns: 2 })

  layout.sectionTitle(ctx.t('disc_communication_style'), layout.measureBullets(style.tips))
  layout.bullets(style.tips)

  layout.sectionTitle(
    ctx.t('disc_team_collaboration'),
    layout.measureParagraph(combination.teamRole) +
      layout.measureSubheading() +
      layout.measureBullets(combination.complements)
  )
  layout.paragraph(combination.teamRole)
  layout.subheading(ctx.t('disc_works_best_with'))
  layout.bullets(combination.complements)

  methodology(layout, ctx, 'pdf_method_disc')
  layout.finalize()
}

// ----------------------------------------------------------- Enneagram

export interface EnneagramPdfData {
  scores: EnneagramScores
  content: EnneagramContent
  growthType: number
  stressType: number
  chart: ChartImage | null
}

export function buildEnneagramPdf(doc: jsPDF, ctx: PdfContext, data: EnneagramPdfData): void {
  const { scores, content } = data
  const type = content[scores.dominant]
  const layout = startDocument(doc, ctx)

  drawCover(doc, layout, {
    assessmentTitle: ctx.assessmentTitle,
    headline: type.name,
    standfirst: type.subtitle,
    badge: `${ctx.t('enneagram_type')} ${scores.dominant} · ${scores.dominant}w${scores.wing}`,
    chart: data.chart,
    participant: ctx.participant,
    preparedForLabel: ctx.t('pdf_prepared_for'),
    generatedOnLabel: ctx.t('pdf_generated_on'),
    generatedOn: ctx.generatedOn,
    footnote: ctx.t('pdf_cover_note')
  })

  layout.beginContent()

  layout.sectionTitle(ctx.t('pdf_section_scores'))
  layout.bars(ENNEAGRAM_TYPES.map(number => ({
    label: `${number}`,
    sublabel: content[number].shortName,
    value: scores.percentages[number],
    color: number === scores.dominant ? COLORS.brand : '#B9C6BF'
  })))
  footnote(layout, answeredLabel(ctx, scores.answered))

  layout.sectionTitle(ctx.t('enneagram_position'))
  layout.paragraph(ctx.t('enneagram_lines_intro'), { size: TYPE.small, color: COLORS.muted })
  layout.paragraph(
    `${ctx.t('enneagram_growth_line')}: ${data.growthType} · ${content[data.growthType as keyof EnneagramContent].shortName}   |   ` +
    `${ctx.t('enneagram_stress_line')}: ${data.stressType} · ${content[data.stressType as keyof EnneagramContent].shortName}   |   ` +
    `${ctx.t('enneagram_wing')}: ${scores.wing} · ${content[scores.wing].shortName}`,
    { size: TYPE.small, color: COLORS.brand }
  )

  layout.sectionTitle(
    ctx.t('enneagram_core_motivation'),
    layout.measureParagraph(type.motivation) +
      layout.measureSubheading() +
      layout.measureParagraph(type.fear)
  )
  layout.paragraph(type.motivation)
  layout.subheading(ctx.t('enneagram_basic_fear'))
  layout.paragraph(type.fear)

  layout.sectionTitle(ctx.t('enneagram_key_characteristics'))
  layout.chips(type.traits, { columns: 2 })

  layout.sectionTitle(ctx.t('enneagram_growth_recommendations'), layout.measureBullets(type.growth))
  layout.bullets(type.growth)

  methodology(layout, ctx, 'pdf_method_enneagram')
  layout.finalize()
}

// ------------------------------------------------------- Typix Discovery

export interface InsightsPdfData {
  scores: InsightsScores
  content: InsightsContent
  colorHex: Record<ColorKey, string>
  profilePosition: string
  balanceLabel: string
  balanceDescription: string
  spread: number
  wheel: ChartImage | null
  energy: ChartImage | null
}

export function buildInsightsPdf(doc: jsPDF, ctx: PdfContext, data: InsightsPdfData): void {
  const { scores, content } = data
  const dominant = content.colors[scores.dominant]
  const layout = startDocument(doc, ctx)

  drawCover(doc, layout, {
    assessmentTitle: ctx.assessmentTitle,
    headline: dominant.label,
    standfirst: dominant.description,
    badge: data.profilePosition,
    chart: data.wheel,
    participant: ctx.participant,
    preparedForLabel: ctx.t('pdf_prepared_for'),
    generatedOnLabel: ctx.t('pdf_generated_on'),
    generatedOn: ctx.generatedOn,
    footnote: ctx.t('pdf_cover_note')
  })

  layout.beginContent()

  layout.sectionTitle(ctx.t('insights_color_distribution'))
  layout.bars(COLOR_KEYS.map(key => ({
    label: content.colors[key].short,
    sublabel: content.colors[key].label,
    value: scores.percentages[key],
    color: data.colorHex[key]
  })))
  footnote(layout, answeredLabel(ctx, scores.answered))

  if (data.energy) {
    layout.sectionTitle(ctx.t('insights_energy_profile'))
    layout.image(data.energy.dataUrl, Math.min(CONTENT_WIDTH, 165), data.energy.aspect, {
      caption: ctx.t('insights_energy_caption', {
        spread: data.spread.toFixed(1),
        balance: data.balanceLabel
      })
    })
  }

  layout.sectionTitle(ctx.t('insights_profile_analysis'))
  layout.panel(
    () => layout.measureParagraph(data.balanceDescription, TYPE.body, CONTENT_WIDTH - 12) + 7,
    () => {
      layout.font('bold', TYPE.subheading, COLORS.brand)
      layout.doc.text(
        `${ctx.t('insights_energy_balance')}: ${data.balanceLabel}`,
        26, layout.y
      )
      layout.y += 6
      layout.paragraph(data.balanceDescription, { indent: 6, width: CONTENT_WIDTH - 6, gap: 0 })
    },
    { accent: COLORS.accent }
  )

  layout.sectionTitle(ctx.t('insights_strengths'))
  layout.chips(dominant.strengths, { columns: 2 })

  layout.sectionTitle(ctx.t('insights_development_areas'), layout.measureBullets(dominant.development))
  layout.bullets(dominant.development)

  layout.sectionTitle(ctx.t('insights_pitfalls'), layout.measureBullets(dominant.pitfalls))
  layout.bullets(dominant.pitfalls)

  layout.sectionTitle(
    ctx.t('insights_good_day'),
    layout.measureParagraph(dominant.goodDay) +
      layout.measureSubheading() +
      layout.measureParagraph(dominant.strongDay)
  )
  layout.paragraph(dominant.goodDay)
  layout.subheading(ctx.t('insights_strong_day'))
  layout.paragraph(dominant.strongDay)

  methodology(layout, ctx, 'pdf_method_insights')
  layout.finalize()
}
