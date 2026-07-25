<template>
  <div class="card">
    <div v-if="!scores.hasAnswers" class="empty-state">
      <h3>{{ t('no_results_title') }}</h3>
      <p>{{ t('no_results_body') }}</p>
      <router-link to="/survey/insights" class="btn btn-primary">{{ t('start_survey') }}</router-link>
    </div>

    <div v-else id="insights-report-content" class="report-content">
      <div class="insights-circle">
        <canvas ref="circleCanvas" width="500" height="500"></canvas>
        <p class="chart-caption">{{ t('insights_wheel_caption') }}</p>
      </div>

      <!-- Colour energy charts -->
      <div class="energy-dynamics">
        <h4>{{ t('insights_energy_profile') }}</h4>
        <canvas ref="dynamicsCanvas" width="700" height="330"></canvas>
        <div class="dynamics-labels">
          <div><strong>{{ t('insights_chart_conscious') }}</strong></div>
          <div><strong>{{ t('insights_chart_deviation') }}</strong></div>
        </div>
        <p class="chart-caption">
          {{ t('insights_energy_caption', { spread: spread.toFixed(1), balance: balanceLabel }) }}
        </p>
      </div>

      <div class="primary-color">
        <h3>{{ t('insights_primary_color') }}: {{ userName ? userName + ", " : '' }}{{ dominantColor.label }}</h3>
        <div class="color-indicator" :style="{ backgroundColor: colorHex[scores.dominant] }"></div>
        <p class="color-description">{{ dominantColor.description }}</p>
        <div class="position-info">
          <span class="position-label">{{ t('insights_profile_position') }}: {{ profilePosition }}</span>
        </div>
      </div>

      <div class="color-breakdown">
        <h4>{{ t('insights_color_distribution') }}</h4>
        <div class="color-bars">
          <div v-for="color in COLOR_KEYS" :key="color" class="color-bar">
            <div class="bar-header">
              <span class="color-name">{{ content.colors[color].label }}</span>
              <span class="color-percentage">{{ scores.percentages[color] }}%</span>
            </div>
            <div class="bar-container">
              <div
                class="bar-fill"
                :style="{
                  width: `${scores.percentages[color]}%`,
                  backgroundColor: colorHex[color]
                }"
              ></div>
            </div>
          </div>
        </div>
        <p class="score-footnote">{{ answeredLabel }}</p>
      </div>

      <div class="profile-analysis">
        <h4>{{ t('insights_profile_analysis') }}</h4>
        <div class="analysis-content">
          <p>{{ balanceContent.description }}</p>
          <div class="balance-indicator">
            <span class="balance-label">{{ t('insights_energy_balance') }}: {{ balanceLabel }}</span>
          </div>
        </div>
      </div>

      <div class="strengths-section">
        <h4>{{ t('insights_strengths') }}</h4>
        <div class="strengths-grid">
          <div v-for="strength in dominantColor.strengths" :key="strength" class="strength-item">
            {{ strength }}
          </div>
        </div>
      </div>

      <div class="development-areas">
        <h4>{{ t('insights_development_areas') }}</h4>
        <ul>
          <li v-for="area in dominantColor.development" :key="area">{{ area }}</li>
        </ul>
      </div>

      <div class="insights-extras">
        <div class="pitfalls-section">
          <h4>{{ t('insights_pitfalls') }}</h4>
          <ul>
            <li v-for="pitfall in dominantColor.pitfalls" :key="pitfall">{{ pitfall }}</li>
          </ul>
        </div>
        <div class="good-day-section">
          <h4>{{ t('insights_good_day') }}</h4>
          <p>{{ dominantColor.goodDay }}</p>
        </div>
        <div class="strong-day-section">
          <h4>{{ t('insights_strong_day') }}</h4>
          <p>{{ dominantColor.strongDay }}</p>
        </div>
      </div>
    </div>

    <div v-if="scores.hasAnswers" class="pdf-actions">
      <button
          @click="downloadPDF"
          :disabled="isGeneratingPDF"
          class="btn btn-pdf"
      >
        <span v-if="isGeneratingPDF">{{ t('generating_pdf') }}</span>
        <span v-else>📄 {{ t('download_pdf_report') }}</span>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, nextTick, onMounted, ref, watch } from 'vue'
import { usePdfExport } from '../../composables/usePdfExport'
import { useTranslations } from '../../composables/useTranslations'
import { insightsContent } from '../../i18n/content/insights'
import { pickLocale } from '../../i18n/content/locale'
import {
  COLOR_KEYS,
  PREFERENCE_MAX,
  energyBalance,
  energySpread,
  insightsWheelPosition,
  scoreInsights,
  type ColorKey
} from '../../scoring/insights'

const props = defineProps<{
  results: unknown,
  userName?: string
}>()

const circleCanvas = ref<HTMLCanvasElement>()
const dynamicsCanvas = ref<HTMLCanvasElement>()
const { generatePDF, isGeneratingPDF } = usePdfExport()
const { t, currentLanguage } = useTranslations()

const scores = computed(() => scoreInsights(props.results))
const spread = computed(() => energySpread(scores.value.percentages))
const balance = computed(() => energyBalance(scores.value.percentages))

const content = computed(() => pickLocale(insightsContent, currentLanguage.value))
const balanceContent = computed(() => content.value.balance[balance.value])
const balanceLabel = computed(() => balanceContent.value.label)

const answeredLabel = computed(() => t(
  scores.value.answered === 1 ? 'based_on_answers_one' : 'based_on_answers_other',
  { count: scores.value.answered }
))

const downloadPDF = async () => {
  try {
    await generatePDF('insights-report-content', `Insights-Report-${scores.value.dominant}`)
  } catch (error) {
    console.error('Failed to generate PDF:', error)
    alert(t('pdf_failed'))
  }
}

const colorHex: Record<ColorKey, string> = {
  Red: '#FF6B6B',
  Yellow: '#FFD93D',
  Blue: '#45B7D1',
  Green: '#96CEB4'
}

const dominantColor = computed(() => content.value.colors[scores.value.dominant])

// Derived from the same ranking as the headline colour, so the position label
// can no longer disagree with "Your Primary Colour".
const profilePosition = computed(
  () => content.value.positions[`${scores.value.dominant}-${scores.value.secondary}`] || ''
)

const redraw = () => nextTick(() => {
  drawInsightsCircle()
  drawEnergyCharts()
})

onMounted(redraw)
watch([() => props.results, currentLanguage], redraw, { deep: true })

const typeColors = [
  '#9B59B6', '#E74C3C', '#E67E22', '#F7CA18',
  '#B6D957', '#27AE60', '#00B5B5', '#3498DB'
]
const typeAngles = [
  -Math.PI / 2, -Math.PI / 4, 0, Math.PI / 4,
  Math.PI / 2, 3 * Math.PI / 4, Math.PI, -3 * Math.PI / 4
]

function fitText(ctx: CanvasRenderingContext2D, text: string, maxWidth: number, startSize: number) {
  let size = startSize
  ctx.font = `bold ${size}px Arial`
  while (size > 9 && ctx.measureText(text).width > maxWidth) {
    size -= 1
    ctx.font = `bold ${size}px Arial`
  }
}

const drawInsightsCircle = () => {
  const canvas = circleCanvas.value
  if (!canvas) return
  const ctx = canvas.getContext('2d')
  if (!ctx) return

  const centerX = canvas.width / 2
  const centerY = canvas.height / 2
  const radius = Math.min(180, Math.min(canvas.width, canvas.height) / 2 - 60)
  ctx.clearRect(0, 0, canvas.width, canvas.height)

  // Quadrants: Blue top-left, Red top-right, Green bottom-left, Yellow bottom-right.
  const quadrants: Array<{ color: ColorKey; startAngle: number }> = [
    { color: 'Red', startAngle: -Math.PI / 2 },
    { color: 'Yellow', startAngle: 0 },
    { color: 'Green', startAngle: Math.PI / 2 },
    { color: 'Blue', startAngle: Math.PI }
  ]
  quadrants.forEach(({ color, startAngle }) => {
    const endAngle = startAngle + Math.PI / 2
    ctx.beginPath()
    ctx.arc(centerX, centerY, radius, startAngle, endAngle)
    ctx.lineTo(centerX, centerY)
    ctx.closePath()
    ctx.fillStyle = colorHex[color]
    ctx.globalAlpha = 0.3
    ctx.fill()
    ctx.globalAlpha = 1
    ctx.beginPath()
    ctx.arc(centerX, centerY, radius, startAngle, endAngle)
    ctx.lineTo(centerX, centerY)
    ctx.strokeStyle = colorHex[color]
    ctx.lineWidth = 3
    ctx.stroke()
  })

  // Eight named positions around the rim.
  for (let i = 0; i < 8; i++) {
    const labelRadius = radius + 38
    ctx.save()
    ctx.translate(centerX, centerY)
    ctx.rotate(typeAngles[i])
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'
    const arcLength = (labelRadius * Math.PI) / 4 - 10
    ctx.beginPath()
    ctx.arc(0, 0, labelRadius, -Math.PI / 8, Math.PI / 8)
    ctx.lineWidth = 38
    ctx.strokeStyle = typeColors[i]
    ctx.shadowColor = 'rgba(0,0,0,0.13)'
    ctx.shadowBlur = 2
    ctx.stroke()
    ctx.shadowBlur = 0
    ctx.save()
    ctx.rotate(Math.PI / 2)
    ctx.fillStyle = '#fff'
    fitText(ctx, content.value.wheel[i], arcLength, 18)
    ctx.fillText(content.value.wheel[i], 0, -labelRadius)
    ctx.restore()
    ctx.restore()
  }

  // Intensity rings.
  for (let i = 1; i <= 3; i++) {
    ctx.beginPath()
    ctx.arc(centerX, centerY, (radius * i) / 3, 0, 2 * Math.PI)
    ctx.strokeStyle = '#ddd'
    ctx.lineWidth = 1
    ctx.stroke()
  }

  // Marker. Each colour pulls towards the centre of its own quadrant, and the
  // radius is normalised so a single-colour profile reaches the rim.
  const { angle, radius: pull } = insightsWheelPosition(scores.value.percentages)
  const markerRadius = pull * radius * 0.86
  const profileX = centerX + Math.cos(angle) * markerRadius
  const profileY = centerY + Math.sin(angle) * markerRadius

  ctx.beginPath()
  ctx.arc(profileX, profileY, 12, 0, 2 * Math.PI)
  ctx.fillStyle = '#F9A607'
  ctx.fill()
  ctx.strokeStyle = '#1A4731'
  ctx.lineWidth = 3
  ctx.stroke()
  ctx.beginPath()
  ctx.arc(profileX, profileY, 20, 0, 2 * Math.PI)
  ctx.strokeStyle = '#F9A607'
  ctx.lineWidth = 2
  ctx.setLineDash([5, 5])
  ctx.stroke()
  ctx.setLineDash([])
  ctx.fillStyle = '#1A4731'
  ctx.font = 'bold 12px Arial'
  ctx.textAlign = 'center'
  ctx.textBaseline = 'middle'
  ctx.fillText(t('insights_you'), profileX, profileY - 32)
}

/**
 * Two panels drawn from the same scores: the preference means on the 0..6
 * scale, and each colour's distance from an even 25% split.
 *
 * The previous version added a third "less conscious persona" panel produced by
 * rotating the colour list by one position. The questionnaire only captures a
 * single conscious preference per question, so that panel restated the same
 * four numbers under different labels and is no longer drawn.
 */
function drawEnergyCharts() {
  const canvas = dynamicsCanvas.value
  if (!canvas) return
  const ctx = canvas.getContext('2d')
  if (!ctx) return
  ctx.clearRect(0, 0, canvas.width, canvas.height)

  const chartWidth = 200
  const chartHeight = 210
  const baseY = 30
  const leftX = 80
  const rightX = 410

  drawMeansChart(ctx, leftX, baseY, chartWidth, chartHeight)
  drawDeviationChart(ctx, rightX, baseY, chartWidth, chartHeight)
}

function barLayout(x: number, width: number, index: number) {
  const slot = width / COLOR_KEYS.length
  const barWidth = slot - 14
  return { left: x + index * slot + 7, width: barWidth, centre: x + index * slot + slot / 2 }
}

function drawAxes(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number) {
  ctx.strokeStyle = '#aaa'
  ctx.lineWidth = 1
  ctx.beginPath()
  ctx.moveTo(x - 6, y)
  ctx.lineTo(x - 6, y + h)
  ctx.lineTo(x + w + 6, y + h)
  ctx.stroke()
}

function drawColorLabels(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, value: (c: ColorKey) => string) {
  ctx.font = '11px Arial'
  ctx.textAlign = 'center'
  COLOR_KEYS.forEach((color, i) => {
    const { centre } = barLayout(x, w, i)
    ctx.fillStyle = '#333'
    ctx.fillText(content.value.colors[color].short, centre, y + h + 20)
    ctx.fillStyle = '#666'
    ctx.fillText(value(color), centre, y + h + 36)
  })
}

function drawMeansChart(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number) {
  drawAxes(ctx, x, y, w, h)

  ctx.font = '10px Arial'
  ctx.textAlign = 'right'
  ctx.textBaseline = 'middle'
  for (let i = 0; i <= PREFERENCE_MAX; i++) {
    const tickY = y + h - (i / PREFERENCE_MAX) * h
    ctx.fillStyle = '#666'
    ctx.fillText(String(i), x - 12, tickY)
    if (i > 0) {
      ctx.strokeStyle = '#eee'
      ctx.beginPath()
      ctx.moveTo(x - 6, tickY)
      ctx.lineTo(x + w + 6, tickY)
      ctx.stroke()
    }
  }

  COLOR_KEYS.forEach((color, i) => {
    const { left, width } = barLayout(x, w, i)
    const barHeight = (scores.value.means[color] / PREFERENCE_MAX) * h
    ctx.fillStyle = colorHex[color]
    ctx.fillRect(left, y + h - barHeight, width, barHeight)
  })

  ctx.textBaseline = 'alphabetic'
  drawColorLabels(ctx, x, y, w, h, c => scores.value.means[c].toFixed(2))
}

function drawDeviationChart(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number) {
  const maxAbs = 40
  const zeroY = y + h / 2

  drawAxes(ctx, x, y, w, h)

  ctx.strokeStyle = '#bbb'
  ctx.beginPath()
  ctx.moveTo(x - 6, zeroY)
  ctx.lineTo(x + w + 6, zeroY)
  ctx.stroke()

  ctx.font = '10px Arial'
  ctx.textAlign = 'right'
  ctx.textBaseline = 'middle'
  ctx.fillStyle = '#666'
  ctx.fillText(`+${maxAbs}`, x - 12, y)
  ctx.fillText('0', x - 12, zeroY)
  ctx.fillText(`-${maxAbs}`, x - 12, y + h)

  COLOR_KEYS.forEach((color, i) => {
    const { left, width } = barLayout(x, w, i)
    const deviation = scores.value.percentages[color] - 25
    const clamped = Math.max(-maxAbs, Math.min(maxAbs, deviation))
    const barHeight = (Math.abs(clamped) / maxAbs) * (h / 2)
    ctx.fillStyle = colorHex[color]
    ctx.fillRect(left, clamped >= 0 ? zeroY - barHeight : zeroY, width, barHeight)
  })

  ctx.textBaseline = 'alphabetic'
  drawColorLabels(ctx, x, y, w, h, c => {
    const deviation = scores.value.percentages[c] - 25
    return `${deviation > 0 ? '+' : ''}${deviation}pp`
  })
}
</script>

<style scoped>
.report-content {
  max-width: 700px;
  margin: 0 auto;
}

.empty-state {
  text-align: center;
  padding: 40px 20px;
}

.empty-state h3 {
  font-size: 1.6rem;
  color: #1A4731;
  margin-bottom: 12px;
}

.empty-state p {
  color: #666;
  margin-bottom: 24px;
}

.insights-circle {
  text-align: center;
  margin-bottom: 30px;
  padding: 20px;
  background: #f8f9fa;
  border-radius: 15px;
}

/* The canvas keeps its own drawing resolution; CSS only scales it down, so a
   narrow screen never forces the page wider than the viewport. */
.insights-circle canvas,
.energy-dynamics canvas {
  display: block;
  width: 100%;
  height: auto;
  margin: 0 auto;
}

.insights-circle canvas {
  max-width: 500px;
}

.chart-caption {
  max-width: 540px;
  margin: 12px auto 0;
  color: #666;
  font-size: 0.9rem;
  line-height: 1.5;
}

.energy-dynamics {
  margin-bottom: 40px;
  padding: 25px;
  background: #fffbe8;
  border-radius: 15px;
  border: 2px solid #ffe2a0;
  text-align: center;
}

.energy-dynamics h4 {
  color: #F9A607;
  font-size: 1.3rem;
  margin-bottom: 15px;
}

.energy-dynamics canvas {
  max-width: 700px;
}

.dynamics-labels {
  display: flex;
  justify-content: space-around;
  margin: 6px 40px 0 40px;
  font-size: 1rem;
  color: #333;
}

.dynamics-labels > div {
  /* Flexible rather than a fixed width, so the pair never sets a
     min-content floor that a phone screen cannot honour. */
  flex: 1 1 0;
  min-width: 0;
  max-width: 220px;
  text-align: center;
  font-weight: 600;
  line-height: 1.2;
}

.primary-color {
  text-align: center;
  margin-bottom: 30px;
  padding: 25px;
  background: linear-gradient(135deg, #1A4731 0%, #0f2a1c 100%);
  border-radius: 15px;
  color: white;
}

.primary-color h3 {
  color: white;
  font-size: 1.8rem;
  margin-bottom: 15px;
}

.color-indicator {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  margin: 0 auto 15px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
}

.color-description {
  color: rgba(255, 255, 255, 0.9);
  font-size: 1.1rem;
  line-height: 1.6;
  margin-bottom: 20px;
}

.position-info {
  display: inline-block;
  background: #F9A607;
  color: white;
  padding: 12px 24px;
  border-radius: 25px;
  font-weight: bold;
  font-size: 1rem;
}

.profile-analysis {
  margin-bottom: 30px;
  padding: 25px;
  background: linear-gradient(135deg, #F9A607 0%, #e6950a 100%);
  border-radius: 15px;
  color: white;
}

.profile-analysis h4 {
  color: white;
  font-size: 1.5rem;
  margin-bottom: 20px;
}

.analysis-content p {
  font-size: 1.1rem;
  line-height: 1.6;
  margin-bottom: 20px;
  color: rgba(255, 255, 255, 0.95);
}

.balance-indicator {
  display: inline-block;
  background: rgba(255, 255, 255, 0.2);
  color: white;
  padding: 10px 20px;
  border-radius: 20px;
  font-weight: bold;
}

.color-breakdown h4,
.strengths-section h4,
.development-areas h4 {
  color: #333;
  font-size: 1.3rem;
  margin: 25px 0 15px 0;
  border-left: 4px solid #F9A607;
  padding-left: 15px;
}

.color-bars {
  display: grid;
  gap: 15px;
}

.color-bar {
  background: white;
  padding: 15px;
  border-radius: 10px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.bar-header {
  display: flex;
  justify-content: space-between;
  margin-bottom: 8px;
}

.color-name {
  font-weight: bold;
  color: #333;
}

.color-percentage {
  font-weight: bold;
  color: #666;
}

.bar-container {
  height: 12px;
  background: #e9ecef;
  border-radius: 6px;
  overflow: hidden;
}

.bar-fill {
  height: 100%;
  transition: width 0.5s ease;
  border-radius: 6px;
}

.score-footnote {
  margin-top: 12px;
  color: #888;
  font-size: 0.85rem;
  text-align: right;
}

.strengths-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 15px;
  margin-bottom: 20px;
}

.strength-item {
  background: #f8f9fa;
  padding: 15px;
  border-radius: 10px;
  color: #555;
  text-align: center;
  border-left: 4px solid #4CAF50;
}

.development-areas ul {
  color: #555;
  line-height: 1.6;
  padding-left: 20px;
}

.development-areas li {
  margin-bottom: 10px;
}

.insights-extras {
  margin-top: 30px;
  padding: 25px;
  background: #f1f3f5;
  border-radius: 15px;
  color: #333;
}

.pitfalls-section,
.good-day-section,
.strong-day-section {
  margin-bottom: 20px;
}

.pdf-actions {
  margin-top: 30px;
  text-align: center;
  padding: 20px;
  border-top: 1px solid #e9ecef;
}

.btn-pdf {
  background: linear-gradient(135deg, #FF6B6B 0%, #FFD93D 25%, #96CEB4 50%, #45B7D1 100%);
  color: white;
  border: none;
  padding: 12px 30px;
  border-radius: 25px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(255, 107, 107, 0.3);
}

.btn-pdf:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(255, 107, 107, 0.4);
}

.btn-pdf:disabled {
  opacity: 0.6;
  cursor: not-allowed;
  transform: none;
}

@media (max-width: 768px) {
  .strengths-grid {
    grid-template-columns: 1fr;
  }

  .primary-color,
  .profile-analysis {
    padding: 20px;
  }
}

@media (max-width: 500px) {
  .insights-circle,
  .energy-dynamics {
    padding: 12px;
  }

  .dynamics-labels {
    margin: 6px 0 0 0;
    font-size: 0.85rem;
  }
}
</style>
