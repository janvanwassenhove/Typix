<template>
  <div class="card">
    <div v-if="!scores.hasAnswers" class="empty-state">
      <h3>{{ t('no_results_title') }}</h3>
      <p>{{ t('no_results_body') }}</p>
      <router-link to="/survey/disc" class="btn btn-primary">{{ t('start_survey') }}</router-link>
    </div>

    <div v-else id="disc-report-content" class="report-content">
      <!-- Tooltip for DISC abbreviations -->
      <div class="disc-tooltip">
        <span class="tooltip-label">{{ t('disc_what_is') }}</span>
        <span class="tooltip-content">
          <template v-for="(style, i) in DISC_STYLES" :key="style">
            <span v-if="i > 0" class="tooltip-separator">|</span>
            <b>{{ style }}</b>: {{ content.styles[style].name }}
          </template>
        </span>
      </div>

      <div class="disc-chart">
        <canvas ref="chartCanvas" width="440" height="440"></canvas>
        <p class="chart-caption">{{ t('disc_wheel_caption') }}</p>
      </div>

      <div class="primary-style">
        <h3>{{ t('disc_primary_style') }}: {{ dominantStyle.name }}</h3>
        <p class="style-description">{{ dominantStyle.description }}</p>
        <div class="combination-badge">
          <span class="combination-text">{{ t('disc_profile_combination') }}: {{ scores.combination }}</span>
        </div>
      </div>

      <div class="style-breakdown">
        <div class="style-scores">
          <div v-for="style in DISC_STYLES" :key="style" class="score-item">
            <div class="score-label">{{ style }}</div>
            <div class="score-bar">
              <div class="score-fill" :style="{ width: `${scores.percentages[style]}%`, backgroundColor: getStyleColor(style) }"></div>
            </div>
            <div class="score-value">{{ scores.percentages[style] }}%</div>
          </div>
        </div>
        <p class="score-footnote">{{ answeredLabel }}</p>
      </div>

      <div class="profile-explanation">
        <h4>{{ scores.combination }} &mdash; {{ combinationData.name }}</h4>
        <div class="profile-details">
          <div class="profile-description">
            <p>{{ combinationData.description }}</p>
          </div>
          <div class="profile-traits">
            <h5>{{ t('disc_key_characteristics') }}:</h5>
            <div class="traits-grid">
              <div v-for="trait in combinationData.traits" :key="trait" class="trait-item">
                {{ trait }}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="characteristics">
        <h4>{{ t('disc_behavioral_strengths') }}</h4>
        <div class="traits-grid">
          <div v-for="trait in dominantStyle.traits" :key="trait" class="trait-item">
            {{ trait }}
          </div>
        </div>
      </div>

      <div class="communication-tips">
        <h4>{{ t('disc_communication_style') }}</h4>
        <ul>
          <li v-for="tip in dominantStyle.tips" :key="tip">{{ tip }}</li>
        </ul>
      </div>

      <div class="team-dynamics">
        <h4>{{ t('disc_team_collaboration') }}</h4>
        <div class="dynamics-content">
          <p>{{ combinationData.teamRole }}</p>
          <div class="collaboration-tips">
            <h5>{{ t('disc_works_best_with') }}:</h5>
            <ul>
              <li v-for="complement in combinationData.complements" :key="complement">{{ complement }}</li>
            </ul>
          </div>
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
import {
  DISC_STYLES,
  DISC_WHEEL_SEGMENTS,
  discWheelPosition,
  scoreDisc,
  type DiscStyle
} from '../../scoring/disc'
import { discContent } from '../../i18n/content/disc'
import { pickLocale } from '../../i18n/content/locale'

const props = defineProps<{
  results: unknown
}>()

const chartCanvas = ref<HTMLCanvasElement>()
const { generatePDF, isGeneratingPDF } = usePdfExport()
const { t, currentLanguage } = useTranslations()

const scores = computed(() => scoreDisc(props.results))
const content = computed(() => pickLocale(discContent, currentLanguage.value))

const answeredLabel = computed(() => t(
  scores.value.answered === 1 ? 'based_on_answers_one' : 'based_on_answers_other',
  { count: scores.value.answered }
))

const downloadPDF = async () => {
  try {
    await generatePDF('disc-report-content', `DISC-Report-${scores.value.combination.replace('/', '-')}`)
  } catch (error) {
    console.error('Failed to generate PDF:', error)
    alert('Failed to generate PDF. Please try again.')
  }
}

const styleColors: Record<DiscStyle, string> = {
  D: '#FF6B6B',
  I: '#FFD93D',
  S: '#6BCF7F',
  C: '#4D96FF'
}

function getStyleColor(style: string): string {
  return styleColors[style as DiscStyle] || '#000'
}

const dominantStyle = computed(() => content.value.styles[scores.value.primary])
const combinationData = computed(() => content.value.combinations[scores.value.combination])

const redraw = () => nextTick(drawDiscCircle)

onMounted(redraw)
// The parent loads answers from localStorage after this component mounts, so
// the wheel must follow the scores rather than being painted once on mount.
watch(() => props.results, redraw, { deep: true })

const drawDiscCircle = () => {
  const canvas = chartCanvas.value
  if (!canvas) return

  const ctx = canvas.getContext('2d')
  if (!ctx) return

  const centerX = canvas.width / 2
  const centerY = canvas.height / 2
  const outerRadius = 175
  const ringWidth = 40
  const innerRadius = 62

  ctx.clearRect(0, 0, canvas.width, canvas.height)

  // Outer ring: one coloured band per style, in wheel order C | D / S | I.
  const quadrants: Array<{ style: DiscStyle; startAngle: number }> = [
    { style: 'D', startAngle: -Math.PI / 2 },
    { style: 'I', startAngle: 0 },
    { style: 'S', startAngle: Math.PI / 2 },
    { style: 'C', startAngle: Math.PI }
  ]

  quadrants.forEach(({ style, startAngle }) => {
    const endAngle = startAngle + Math.PI / 2
    ctx.beginPath()
    ctx.arc(centerX, centerY, outerRadius, startAngle, endAngle)
    ctx.arc(centerX, centerY, outerRadius - ringWidth, endAngle, startAngle, true)
    ctx.closePath()
    ctx.fillStyle = styleColors[style]
    ctx.fill()

    // Only the letter goes in the band — the legend above the chart already
    // spells out what each letter stands for, and the full words do not fit
    // around the rim without colliding with it.
    const labelAngle = startAngle + Math.PI / 4
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'
    ctx.fillStyle = '#1A1A1A'
    ctx.font = 'bold 26px Arial'
    ctx.fillText(
      style,
      centerX + Math.cos(labelAngle) * (outerRadius - ringWidth / 2),
      centerY + Math.sin(labelAngle) * (outerRadius - ringWidth / 2)
    )
  })

  // Eight combination segments: each quadrant splits into the half nearest each
  // neighbour, so D/I sits against I/D and C/D sits against D/C.
  const ringInner = outerRadius - ringWidth
  const segmentRadius = (ringInner + innerRadius) / 2
  const segmentAngle = (index: number) => (index * Math.PI) / 4 - Math.PI / 2 + Math.PI / 8

  const highlightIndex = DISC_WHEEL_SEGMENTS.indexOf(scores.value.combination)
  if (highlightIndex !== -1) {
    const centre = segmentAngle(highlightIndex)
    ctx.beginPath()
    ctx.arc(centerX, centerY, ringInner - 2, centre - Math.PI / 8, centre + Math.PI / 8)
    ctx.arc(centerX, centerY, innerRadius + 2, centre + Math.PI / 8, centre - Math.PI / 8, true)
    ctx.closePath()
    ctx.fillStyle = 'rgba(249, 166, 7, 0.22)'
    ctx.fill()
    ctx.strokeStyle = '#F9A607'
    ctx.lineWidth = 2
    ctx.stroke()
  }

  DISC_WHEEL_SEGMENTS.forEach((combo, index) => {
    const angle = segmentAngle(index)
    ctx.fillStyle = combo === scores.value.combination ? '#1A4731' : '#666'
    ctx.font = combo === scores.value.combination ? 'bold 13px Arial' : '11px Arial'
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'
    ctx.fillText(
      combo,
      centerX + Math.cos(angle) * segmentRadius,
      centerY + Math.sin(angle) * segmentRadius
    )
  })

  // Centre disc.
  ctx.beginPath()
  ctx.arc(centerX, centerY, innerRadius, 0, 2 * Math.PI)
  ctx.fillStyle = 'white'
  ctx.fill()
  ctx.strokeStyle = '#ddd'
  ctx.lineWidth = 2
  ctx.stroke()

  ctx.fillStyle = '#1A4731'
  ctx.font = 'bold 20px Arial'
  ctx.textAlign = 'center'
  ctx.textBaseline = 'middle'
  ctx.fillText(scores.value.combination, centerX, centerY - 9)
  ctx.fillStyle = '#666'
  ctx.font = '11px Arial'
  ctx.fillText(combinationData.value.name, centerX, centerY + 11)

  // Marker last, so it is never painted over. Positioned from the actual score
  // distribution, which also covers the four profiles that do not map onto one
  // of the eight segments (D/S, S/D, I/C, C/I).
  if (scores.value.hasAnswers) {
    const { angle, radius } = discWheelPosition(scores.value.percentages)
    const markerRadius = innerRadius + 8 + radius * (ringInner - innerRadius - 16)
    const markerX = centerX + Math.cos(angle) * markerRadius
    const markerY = centerY + Math.sin(angle) * markerRadius

    ctx.beginPath()
    ctx.arc(markerX, markerY, 9, 0, 2 * Math.PI)
    ctx.fillStyle = '#F9A607'
    ctx.fill()
    ctx.strokeStyle = '#fff'
    ctx.lineWidth = 3
    ctx.stroke()
    ctx.beginPath()
    ctx.arc(markerX, markerY, 10.5, 0, 2 * Math.PI)
    ctx.strokeStyle = '#1A4731'
    ctx.lineWidth = 1.5
    ctx.stroke()
  }
}
</script>

<style scoped>
.report-content {
  max-width: 800px;
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

.disc-chart {
  text-align: center;
  margin-bottom: 40px;
  padding: 20px;
  background: #f8f9fa;
  border-radius: 15px;
}

.chart-caption {
  max-width: 480px;
  margin: 10px auto 0;
  color: #666;
  font-size: 0.9rem;
  line-height: 1.5;
}

.primary-style {
  text-align: center;
  margin-bottom: 40px;
  padding: 30px;
  background: linear-gradient(135deg, #1A4731 0%, #0f2a1c 100%);
  border-radius: 15px;
  color: white;
}

.primary-style h3 {
  color: white;
  font-size: 2rem;
  margin-bottom: 15px;
}

.style-description {
  color: rgba(255, 255, 255, 0.9);
  font-size: 1.1rem;
  line-height: 1.6;
  margin-bottom: 20px;
}

.combination-badge {
  display: inline-block;
  background: #F9A607;
  color: white;
  padding: 12px 24px;
  border-radius: 25px;
  font-weight: bold;
  font-size: 1rem;
}

.style-breakdown {
  margin-bottom: 40px;
  padding: 25px;
  background: white;
  border-radius: 15px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.style-scores {
  display: grid;
  gap: 20px;
}

.score-item {
  display: flex;
  align-items: center;
  gap: 20px;
}

.score-label {
  font-weight: bold;
  width: 30px;
  color: #333;
  font-size: 1.2rem;
}

.score-bar {
  flex: 1;
  height: 25px;
  background: #e9ecef;
  border-radius: 12px;
  overflow: hidden;
}

.score-fill {
  height: 100%;
  transition: width 0.8s ease;
  border-radius: 12px;
}

.score-value {
  font-weight: bold;
  color: #333;
  width: 50px;
  text-align: right;
  font-size: 1.1rem;
}

.score-footnote {
  margin-top: 18px;
  color: #888;
  font-size: 0.85rem;
  text-align: right;
}

.profile-explanation {
  margin-bottom: 40px;
  padding: 30px;
  background: linear-gradient(135deg, #F9A607 0%, #e6950a 100%);
  border-radius: 15px;
  color: white;
}

.profile-explanation h4 {
  color: white;
  font-size: 1.8rem;
  margin-bottom: 20px;
}

.profile-details {
  display: grid;
  gap: 25px;
}

.profile-description p {
  font-size: 1.1rem;
  line-height: 1.7;
  color: rgba(255, 255, 255, 0.95);
}

.profile-traits h5 {
  color: white;
  font-size: 1.2rem;
  margin-bottom: 15px;
}

.characteristics h4,
.communication-tips h4,
.team-dynamics h4 {
  color: #333;
  font-size: 1.5rem;
  margin: 0 0 20px 0;
  border-left: 4px solid #F9A607;
  padding-left: 20px;
}

.traits-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 15px;
  margin-bottom: 25px;
}

.trait-item {
  background: #f8f9fa;
  padding: 15px 20px;
  border-radius: 10px;
  color: #555;
  text-align: center;
  font-weight: 500;
  border: 2px solid transparent;
  transition: all 0.3s ease;
}

.trait-item:hover {
  border-color: #F9A607;
  background: #fff;
}

.communication-tips ul,
.collaboration-tips ul {
  color: #555;
  line-height: 1.7;
  padding-left: 25px;
}

.communication-tips li,
.collaboration-tips li {
  margin-bottom: 10px;
  font-size: 1.05rem;
}

.team-dynamics {
  padding: 30px;
  background: #f8f9fa;
  border-radius: 15px;
  border: 2px solid #e9ecef;
}

.dynamics-content p {
  color: #555;
  font-size: 1.1rem;
  line-height: 1.7;
  margin-bottom: 25px;
}

.collaboration-tips h5 {
  color: #333;
  font-size: 1.2rem;
  margin-bottom: 15px;
  font-weight: 700;
}

.pdf-actions {
  margin-top: 30px;
  text-align: center;
  padding: 20px;
  border-top: 1px solid #e9ecef;
}

.btn-pdf {
  background: linear-gradient(135deg, #FF6B6B 0%, #FFD93D 50%, #6BCF7F 75%, #4D96FF 100%);
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

.disc-tooltip {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 10px;
  font-size: 1rem;
  color: #333;
}

.tooltip-label {
  font-weight: 600;
  margin-bottom: 2px;
}

.tooltip-separator {
  margin: 0 6px;
  color: #999;
}

.tooltip-content {
  background: #f8f9fa;
  border-radius: 8px;
  padding: 6px 16px;
  font-size: 0.98rem;
  color: #222;
  box-shadow: 0 2px 8px rgba(0,0,0,0.04);
  letter-spacing: 0.01em;
}

@media (max-width: 768px) {
  .disc-chart canvas {
    width: 320px !important;
    height: 320px !important;
  }

  .primary-style,
  .profile-explanation,
  .team-dynamics {
    padding: 20px;
  }

  .traits-grid {
    grid-template-columns: 1fr;
  }

  .score-item {
    gap: 15px;
  }

  .score-label {
    width: 25px;
  }
}
</style>
