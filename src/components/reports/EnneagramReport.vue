<template>
  <div class="card">
    <div v-if="!scores.hasAnswers" class="empty-state">
      <h3>{{ t('no_results_title') }}</h3>
      <p>{{ t('no_results_body') }}</p>
      <router-link to="/survey/enneagram" class="btn btn-primary">{{ t('start_survey') }}</router-link>
    </div>

    <div v-else id="enneagram-report-content" class="report-content">
      <div class="type-header">
        <div class="type-number">{{ scores.dominant }}</div>
        <div class="type-info">
          <h3 class="type-name">{{ typeData.name }}</h3>
          <p class="type-subtitle">{{ typeData.subtitle }}</p>
          <p class="type-wing">{{ t('enneagram_wing') }}: {{ scores.dominant }}w{{ scores.wing }} &mdash; {{ content[scores.wing].name }}</p>
        </div>
      </div>

      <!-- Enneagram Visualization -->
      <div class="enneagram-visualization">
        <h4>{{ t('enneagram_position') }}</h4>
        <div class="enneagram-explanation">
          <p>{{ t('enneagram_lines_intro') }}</p>
        </div>
        <div class="enneagram-circle">
          <svg viewBox="0 0 400 400" class="enneagram-svg">
            <circle cx="200" cy="200" r="160" fill="none" stroke="#e9ecef" stroke-width="2"/>

            <!-- Fixed structure: triangle 3-6-9 and hexad 1-4-2-8-5-7 -->
            <g stroke="#dee2e6" stroke-width="1.5" fill="none">
              <polygon :points="polygonPoints([3, 6, 9])" />
              <polygon :points="polygonPoints([1, 4, 2, 8, 5, 7])" />
            </g>

            <!-- The dominant type's own lines -->
            <line
              :x1="pointOf(scores.dominant).x" :y1="pointOf(scores.dominant).y"
              :x2="pointOf(growthType).x" :y2="pointOf(growthType).y"
              stroke="#2E9E5B" stroke-width="3" stroke-linecap="round"
            />
            <line
              :x1="pointOf(scores.dominant).x" :y1="pointOf(scores.dominant).y"
              :x2="pointOf(stressType).x" :y2="pointOf(stressType).y"
              stroke="#E4572E" stroke-width="3" stroke-dasharray="7 5" stroke-linecap="round"
            />

            <g v-for="node in nodes" :key="node.number">
              <circle
                :cx="node.x"
                :cy="node.y"
                :r="node.number === scores.dominant ? 25 : 18"
                :fill="nodeFill(node.number)"
                :stroke="nodeStroke(node.number)"
                :stroke-width="node.number === scores.dominant ? 3 : 2"
                class="type-circle"
              />
              <text
                :x="node.x"
                :y="node.y + 6"
                text-anchor="middle"
                :fill="node.number === scores.dominant ? 'white' : '#333'"
                :font-size="node.number === scores.dominant ? '18' : '14'"
                font-weight="bold"
              >
                {{ node.number }}
              </text>
              <text
                :x="node.x"
                :y="node.y + (node.number === scores.dominant ? 45 : 35)"
                text-anchor="middle"
                :fill="node.number === scores.dominant ? '#667eea' : '#666'"
                font-size="10"
                font-weight="500"
              >
                {{ content[node.number].shortName }}
              </text>
            </g>
          </svg>
        </div>

        <div class="symbol-legend">
          <span class="legend-item"><span class="swatch dominant"></span>{{ t('enneagram_your_type') }} ({{ scores.dominant }})</span>
          <span class="legend-item"><span class="swatch wing"></span>{{ t('enneagram_wing') }} ({{ scores.wing }})</span>
          <span class="legend-item"><span class="line growth"></span>{{ t('enneagram_growth_line') }} &rarr; {{ growthType }}</span>
          <span class="legend-item"><span class="line stress"></span>{{ t('enneagram_stress_line') }} &rarr; {{ stressType }}</span>
        </div>

        <div class="enneagram-interpretation">
          <p><b>{{ t('enneagram_interpret_label') }}</b> {{ t('enneagram_interpret_body') }}</p>
        </div>
      </div>

      <!-- Score Breakdown -->
      <div class="score-breakdown">
        <h4>{{ t('enneagram_type_scores') }}</h4>
        <div class="scores-grid">
          <div
            v-for="type in ENNEAGRAM_TYPES"
            :key="type"
            class="score-item"
            :class="{ dominant: type === scores.dominant }"
          >
            <div class="score-header">
              <span class="score-type">{{ t('enneagram_type') }} {{ type }} &middot; {{ content[type].shortName }}</span>
              <span class="score-value">{{ scores.percentages[type] }}%</span>
            </div>
            <div class="score-bar">
              <div class="score-fill" :style="{ width: scores.percentages[type] + '%' }"></div>
            </div>
          </div>
        </div>
        <p class="score-footnote">{{ t('enneagram_scores_footnote') }} {{ answeredLabel }}</p>
      </div>

      <div class="description-section">
        <h4>{{ t('enneagram_core_motivation') }}</h4>
        <p>{{ typeData.motivation }}</p>

        <h4>{{ t('enneagram_basic_fear') }}</h4>
        <p>{{ typeData.fear }}</p>

        <h4>{{ t('enneagram_key_characteristics') }}</h4>
        <ul>
          <li v-for="trait in typeData.traits" :key="trait">{{ trait }}</li>
        </ul>
      </div>

      <div class="growth-section">
        <h4>{{ t('enneagram_growth_recommendations') }}</h4>
        <div class="growth-tips">
          <div v-for="tip in typeData.growth" :key="tip" class="growth-tip">
            {{ tip }}
          </div>
        </div>
      </div>

      <div class="pdf-actions">
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
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { usePdfExport } from '../../composables/usePdfExport'
import { useTranslations } from '../../composables/useTranslations'
import questionData from '../../data/enneagram-questions.json'
import { enneagramContent } from '../../i18n/content/enneagram'
import { pickLocale } from '../../i18n/content/locale'
import {
  ENNEAGRAM_TYPES,
  disintegrationOf,
  integrationOf,
  scoreEnneagram,
  wingsOf,
  type EnneagramQuestion,
  type EnneagramType
} from '../../scoring/enneagram'

const props = defineProps<{
  results: unknown
}>()

const { generatePDF, isGeneratingPDF } = usePdfExport()
const { t, currentLanguage } = useTranslations()

// Every language file lists the same questions in the same order, so the
// type mapping can be read from any of them.
const questions = questionData.en as EnneagramQuestion[]

const scores = computed(() => scoreEnneagram(props.results, questions))
const content = computed(() => pickLocale(enneagramContent, currentLanguage.value))

const answeredLabel = computed(() => t(
  scores.value.answered === 1 ? 'based_on_answers_one' : 'based_on_answers_other',
  { count: scores.value.answered }
))

const downloadPDF = async () => {
  try {
    await generatePDF('enneagram-report-content', `Enneagram-Report-Type-${scores.value.dominant}`)
  } catch (error) {
    console.error('Failed to generate PDF:', error)
    alert('Failed to generate PDF. Please try again.')
  }
}

const typeData = computed(() => content.value[scores.value.dominant])
const growthType = computed(() => integrationOf(scores.value.dominant))
const stressType = computed(() => disintegrationOf(scores.value.dominant))
const wingTypes = computed(() => wingsOf(scores.value.dominant))

const CENTRE = 200
const RADIUS = 160

/**
 * Type 9 sits at the top and the remaining types run clockwise, which is the
 * conventional layout — placing the numbers anywhere else makes the fixed
 * triangle and hexad meaningless.
 */
function pointOf(type: EnneagramType): { x: number; y: number } {
  const slot = type === 9 ? 0 : type
  const angle = (slot * 40 * Math.PI) / 180
  return {
    x: CENTRE + Math.sin(angle) * RADIUS,
    y: CENTRE - Math.cos(angle) * RADIUS
  }
}

const nodes = computed(() =>
  ([9, 1, 2, 3, 4, 5, 6, 7, 8] as EnneagramType[]).map(number => ({ number, ...pointOf(number) }))
)

function polygonPoints(types: EnneagramType[]): string {
  return types.map(type => {
    const { x, y } = pointOf(type)
    return `${x.toFixed(1)},${y.toFixed(1)}`
  }).join(' ')
}

function nodeFill(type: EnneagramType): string {
  if (type === scores.value.dominant) return '#667eea'
  if (type === scores.value.wing) return '#dfe3fb'
  return '#f8f9fa'
}

function nodeStroke(type: EnneagramType): string {
  if (type === scores.value.dominant) return '#667eea'
  if (wingTypes.value.includes(type)) return '#a9b3f0'
  return '#dee2e6'
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

.type-header {
  display: flex;
  align-items: center;
  margin-bottom: 30px;
  padding-bottom: 20px;
  border-bottom: 2px solid #e9ecef;
}

.type-number {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2.5rem;
  font-weight: bold;
  margin-right: 25px;
  flex-shrink: 0;
}

.type-info h3 {
  font-size: 1.8rem;
  color: #333;
  margin-bottom: 5px;
}

.type-subtitle {
  color: #666;
  font-size: 1.1rem;
  font-style: italic;
}

.type-wing {
  margin-top: 8px;
  color: #667eea;
  font-size: 0.95rem;
  font-weight: 600;
}

.enneagram-visualization {
  margin-bottom: 40px;
  text-align: center;
}

.enneagram-visualization h4 {
  color: #333;
  font-size: 1.3rem;
  margin-bottom: 25px;
  border-left: 4px solid #667eea;
  padding-left: 15px;
  text-align: left;
}

.enneagram-explanation {
  margin-bottom: 18px;
  color: #555;
  font-size: 1rem;
  text-align: center;
  max-width: 500px;
  margin-left: auto;
  margin-right: auto;
}

.enneagram-circle {
  max-width: 400px;
  margin: 0 auto;
}

.enneagram-svg {
  width: 100%;
  height: auto;
}

.type-circle {
  transition: all 0.3s ease;
}

.symbol-legend {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 8px 20px;
  margin-top: 12px;
  font-size: 0.85rem;
  color: #555;
}

.legend-item {
  display: inline-flex;
  align-items: center;
  gap: 7px;
}

.swatch {
  width: 14px;
  height: 14px;
  border-radius: 50%;
  display: inline-block;
}

.swatch.dominant {
  background: #667eea;
}

.swatch.wing {
  background: #dfe3fb;
  border: 2px solid #a9b3f0;
}

.line {
  width: 22px;
  height: 0;
  display: inline-block;
}

.line.growth {
  border-top: 3px solid #2E9E5B;
}

.line.stress {
  border-top: 3px dashed #E4572E;
}

.score-breakdown {
  margin-bottom: 40px;
}

.score-breakdown h4 {
  color: #333;
  font-size: 1.3rem;
  margin-bottom: 20px;
  border-left: 4px solid #4CAF50;
  padding-left: 15px;
}

.scores-grid {
  display: grid;
  gap: 12px;
}

.score-item {
  background: #f8f9fa;
  padding: 15px;
  border-radius: 10px;
  border-left: 4px solid #dee2e6;
  transition: all 0.3s ease;
}

.score-item.dominant {
  background: linear-gradient(135deg, rgba(102, 126, 234, 0.1) 0%, rgba(118, 75, 162, 0.1) 100%);
  border-left-color: #667eea;
}

.score-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
}

.score-type {
  font-weight: 600;
  color: #333;
}

.score-value {
  font-weight: bold;
  color: #667eea;
}

.score-bar {
  height: 8px;
  background: #e9ecef;
  border-radius: 4px;
  overflow: hidden;
}

.score-fill {
  height: 100%;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 4px;
  transition: width 0.8s ease;
}

.score-footnote {
  margin-top: 15px;
  color: #888;
  font-size: 0.85rem;
  line-height: 1.5;
}

.description-section {
  margin-bottom: 30px;
}

.description-section h4 {
  color: #333;
  font-size: 1.3rem;
  margin: 25px 0 10px 0;
  border-left: 4px solid #667eea;
  padding-left: 15px;
}

.description-section p {
  color: #555;
  line-height: 1.6;
  margin-bottom: 15px;
}

.description-section ul {
  color: #555;
  line-height: 1.6;
  padding-left: 20px;
}

.description-section li {
  margin-bottom: 8px;
}

.growth-section h4 {
  color: #333;
  font-size: 1.3rem;
  margin-bottom: 20px;
  border-left: 4px solid #4CAF50;
  padding-left: 15px;
}

.growth-tips {
  display: grid;
  gap: 15px;
}

.growth-tip {
  background: #f8f9fa;
  padding: 15px 20px;
  border-radius: 10px;
  border-left: 4px solid #4CAF50;
  color: #555;
  line-height: 1.5;
}

.pdf-actions {
  margin-top: 30px;
  text-align: center;
  padding: 20px;
  border-top: 1px solid #e9ecef;
}

.btn-pdf {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  padding: 12px 30px;
  border-radius: 25px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(102, 126, 234, 0.3);
}

.btn-pdf:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(102, 126, 234, 0.4);
}

.btn-pdf:disabled {
  opacity: 0.6;
  cursor: not-allowed;
  transform: none;
}

.enneagram-interpretation {
  margin-top: 18px;
  color: #444;
  font-size: 1rem;
  text-align: center;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
  background: #f8f9fa;
  border-radius: 10px;
  padding: 16px 20px;
  border: 1px solid #e9ecef;
}

@media (max-width: 768px) {
  .type-header {
    flex-direction: column;
    text-align: center;
  }

  .type-number {
    margin-right: 0;
    margin-bottom: 15px;
  }

  .enneagram-circle {
    max-width: 320px;
  }

  .score-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 5px;
  }
}
</style>
