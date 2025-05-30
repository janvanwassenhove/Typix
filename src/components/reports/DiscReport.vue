<template>
  <div class="card">
    <div id="disc-report-content" class="report-content">
      <div class="disc-chart">
        <canvas ref="chartCanvas" width="400" height="400"></canvas>
      </div>
      
      <div class="primary-style">
        <h3>{{ t('disc_primary_style') }}: {{ dominantStyle.name }}</h3>
        <p class="style-description">{{ dominantStyle.description }}</p>
        <div class="combination-badge">
          <span class="combination-text">{{ t('disc_profile_combination') }}: {{ profileCombination }}</span>
        </div>
      </div>

      <div class="style-breakdown">
        <div class="style-scores">
          <div v-for="(score, style) in styleScores" :key="style" class="score-item">
            <div class="score-label">{{ style }}</div>
            <div class="score-bar">
              <div class="score-fill" :style="{ width: `${score}%`, backgroundColor: getStyleColor(style) }"></div>
            </div>
            <div class="score-value">{{ score }}%</div>
          </div>
        </div>
      </div>

      <div class="profile-explanation">
        <h4>{{ t('disc_profile', { profile: profileCombination }) }}</h4>
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
</template>

<script setup lang="ts">
import { Chart, registerables } from 'chart.js'
import type { ChartConfiguration } from 'chart.js'
import { computed, onMounted, ref } from 'vue'
import { usePdfExport } from '../../composables/usePdfExport'
import { useTranslations } from '../../composables/useTranslations'

const props = defineProps<{
  results: Record<number, number>
}>()

const chartCanvas = ref<HTMLCanvasElement>()
const { generatePDF, isGeneratingPDF } = usePdfExport()
const { t } = useTranslations()

const downloadPDF = async () => {
  try {
    await generatePDF('disc-report-content', `DISC-Report-${profileCombination.value}`)
  } catch (error) {
    console.error('Failed to generate PDF:', error)
    alert('Failed to generate PDF. Please try again.')
  }
}

// Add type definitions
type StyleKey = 'D' | 'I' | 'S' | 'C'
type StyleColors = Record<StyleKey, string>
type CombinationKey = 'D/I' | 'D/C' | 'S/I' | 'S/C' | 'I/D' | 'I/C' | 'C/D' | 'C/I'

const styleColors: StyleColors = {
  D: '#FF6B6B',
  I: '#FFD93D', 
  S: '#6BCF7F',
  C: '#4D96FF'
}

// Fix the template style access
const getStyleColor = (style: string): string => {
  return styleColors[style as StyleKey] || '#000000'
}

const styleData = computed(() => ({
  D: {
    name: t('disc_style_d_name'),
    description: t('disc_style_d_desc'),
    traits: [
      t('disc_style_d_trait_1'),
      t('disc_style_d_trait_2'),
      t('disc_style_d_trait_3'),
      t('disc_style_d_trait_4')
    ],
    tips: [
      t('disc_style_d_tip_1'),
      t('disc_style_d_tip_2'),
      t('disc_style_d_tip_3'),
      t('disc_style_d_tip_4')
    ]
  },
  I: {
    name: t('disc_style_i_name'),
    description: t('disc_style_i_desc'),
    traits: [
      t('disc_style_i_trait_1'),
      t('disc_style_i_trait_2'),
      t('disc_style_i_trait_3'),
      t('disc_style_i_trait_4')
    ],
    tips: [
      t('disc_style_i_tip_1'),
      t('disc_style_i_tip_2'),
      t('disc_style_i_tip_3'),
      t('disc_style_i_tip_4')
    ]
  },
  S: {
    name: t('disc_style_s_name'),
    description: t('disc_style_s_desc'),
    traits: [
      t('disc_style_s_trait_1'),
      t('disc_style_s_trait_2'),
      t('disc_style_s_trait_3'),
      t('disc_style_s_trait_4')
    ],
    tips: [
      t('disc_style_s_tip_1'),
      t('disc_style_s_tip_2'),
      t('disc_style_s_tip_3'),
      t('disc_style_s_tip_4')
    ]
  },
  C: {
    name: t('disc_style_c_name'),
    description: t('disc_style_c_desc'),
    traits: [
      t('disc_style_c_trait_1'),
      t('disc_style_c_trait_2'),
      t('disc_style_c_trait_3'),
      t('disc_style_c_trait_4')
    ],
    tips: [
      t('disc_style_c_tip_1'),
      t('disc_style_c_tip_2'),
      t('disc_style_c_tip_3'),
      t('disc_style_c_tip_4')
    ]
  }
}))

const combinationProfiles = computed(() => ({
  'D/I': {
    name: t('disc_combo_di_name'),
    description: t('disc_combo_di_desc'),
    traits: [
      t('disc_combo_di_trait_1'),
      t('disc_combo_di_trait_2'),
      t('disc_combo_di_trait_3'),
      t('disc_combo_di_trait_4'),
      t('disc_combo_di_trait_5')
    ],
    teamRole: t('disc_combo_di_role'),
    complements: [
      t('disc_combo_di_complement_1'),
      t('disc_combo_di_complement_2'),
      t('disc_combo_di_complement_3')
    ]
  },
  'D/C': {
    name: t('disc_combo_dc_name'),
    description: t('disc_combo_dc_desc'),
    traits: [
      t('disc_combo_dc_trait_1'),
      t('disc_combo_dc_trait_2'),
      t('disc_combo_dc_trait_3'),
      t('disc_combo_dc_trait_4'),
      t('disc_combo_dc_trait_5')
    ],
    teamRole: t('disc_combo_dc_role'),
    complements: [
      t('disc_combo_dc_complement_1'),
      t('disc_combo_dc_complement_2'),
      t('disc_combo_dc_complement_3')
    ]
  },
  'S/I': {
    name: t('disc_combo_si_name'),
    description: t('disc_combo_si_desc'),
    traits: [
      t('disc_combo_si_trait_1'),
      t('disc_combo_si_trait_2'),
      t('disc_combo_si_trait_3'),
      t('disc_combo_si_trait_4'),
      t('disc_combo_si_trait_5')
    ],
    teamRole: t('disc_combo_si_role'),
    complements: [
      t('disc_combo_si_complement_1'),
      t('disc_combo_si_complement_2'),
      t('disc_combo_si_complement_3')
    ]
  },
  'S/C': {
    name: t('disc_combo_sc_name'),
    description: t('disc_combo_sc_desc'),
    traits: [
      t('disc_combo_sc_trait_1'),
      t('disc_combo_sc_trait_2'),
      t('disc_combo_sc_trait_3'),
      t('disc_combo_sc_trait_4'),
      t('disc_combo_sc_trait_5')
    ],
    teamRole: t('disc_combo_sc_role'),
    complements: [
      t('disc_combo_sc_complement_1'),
      t('disc_combo_sc_complement_2'),
      t('disc_combo_sc_complement_3')
    ]
  },
  'I/D': {
    name: t('disc_combo_id_name'),
    description: t('disc_combo_id_desc'),
    traits: [
      t('disc_combo_id_trait_1'),
      t('disc_combo_id_trait_2'),
      t('disc_combo_id_trait_3'),
      t('disc_combo_id_trait_4'),
      t('disc_combo_id_trait_5')
    ],
    teamRole: t('disc_combo_id_role'),
    complements: [
      t('disc_combo_id_complement_1'),
      t('disc_combo_id_complement_2'),
      t('disc_combo_id_complement_3')
    ]
  },
  'I/C': {
    name: t('disc_combo_ic_name'),
    description: t('disc_combo_ic_desc'),
    traits: [
      t('disc_combo_ic_trait_1'),
      t('disc_combo_ic_trait_2'),
      t('disc_combo_ic_trait_3'),
      t('disc_combo_ic_trait_4'),
      t('disc_combo_ic_trait_5')
    ],
    teamRole: t('disc_combo_ic_role'),
    complements: [
      t('disc_combo_ic_complement_1'),
      t('disc_combo_ic_complement_2'),
      t('disc_combo_ic_complement_3')
    ]
  },
  'C/D': {
    name: t('disc_combo_cd_name'),
    description: t('disc_combo_cd_desc'),
    traits: [
      t('disc_combo_cd_trait_1'),
      t('disc_combo_cd_trait_2'),
      t('disc_combo_cd_trait_3'),
      t('disc_combo_cd_trait_4'),
      t('disc_combo_cd_trait_5')
    ],
    teamRole: t('disc_combo_cd_role'),
    complements: [
      t('disc_combo_cd_complement_1'),
      t('disc_combo_cd_complement_2'),
      t('disc_combo_cd_complement_3')
    ]
  },
  'C/I': {
    name: t('disc_combo_ci_name'),
    description: t('disc_combo_ci_desc'),
    traits: [
      t('disc_combo_ci_trait_1'),
      t('disc_combo_ci_trait_2'),
      t('disc_combo_ci_trait_3'),
      t('disc_combo_ci_trait_4'),
      t('disc_combo_ci_trait_5')
    ],
    teamRole: t('disc_combo_ci_role'),
    complements: [
      t('disc_combo_ci_complement_1'),
      t('disc_combo_ci_complement_2'),
      t('disc_combo_ci_complement_3')
    ]
  }
}))

const styleScores = computed(() => {
  if (!props.results) return { D: 25, I: 25, S: 25, C: 25 }
  
  const scores = { D: 0, I: 0, S: 0, C: 0 }
  const styles: StyleKey[] = ['D', 'I', 'S', 'C']
  
  Object.values(props.results).forEach((answer) => {
    const style = styles[answer] as StyleKey
    if (style) {
      scores[style] = (scores[style] || 0) + 1
    }
  })
  
  const total = Object.values(scores).reduce((a, b) => a + b, 0)
  
  return Object.fromEntries(
    Object.entries(scores).map(([style, score]) => [style, Math.round((score / total) * 100)])
  ) as Record<StyleKey, number>
})

const dominantStyle = computed(() => {
  const maxScore = Math.max(...Object.values(styleScores.value))
  const dominantStyles = Object.keys(styleScores.value).filter(
    style => styleScores.value[style as StyleKey] === maxScore
  )
  
  return dominantStyles.length === 1
    ? styleData.value[dominantStyles[0] as StyleKey]
    : { name: t('disc_style_balanced'), description: t('disc_style_balanced_desc'), traits: [], tips: [] }
})

const profileCombination = computed((): CombinationKey => {
  const sortedStyles = Object.keys(styleScores.value).sort(
    (a, b) => styleScores.value[b as StyleKey] - styleScores.value[a as StyleKey]
  )
  return `${sortedStyles[0]}/${sortedStyles[1]}` as CombinationKey
})

const combinationData = computed(() => 
  combinationProfiles.value[profileCombination.value as CombinationKey] || 
  { description: '', traits: [], teamRole: '', complements: [] }
)

let chartInstance: Chart | undefined

// Register Chart.js components
Chart.register(...registerables)

// Add type for chart configuration
const chartConfig: ChartConfiguration = {
  type: 'bar',
  data: {
    labels: ['D', 'I', 'S', 'C'],
    datasets: [{
      label: 'Style Scores',
      data: [],
      backgroundColor: [],
      borderWidth: 1
    }]
  },
  options: {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'DISC Style Scores'
      }
    }
  }
}

onMounted(() => {
  const ctx = chartCanvas.value?.getContext('2d')
  if (!ctx) return

  if (chartInstance) {
    chartInstance.destroy()
  }

  // Update chart data
  chartConfig.data.datasets[0].data = Object.values(styleScores.value)
  chartConfig.data.datasets[0].backgroundColor = Object.keys(styleScores.value)
    .map(style => styleColors[style as keyof typeof styleColors])

  chartInstance = new Chart(ctx, chartConfig)
})
</script>

<style scoped>
.card {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
  background-color: #fff;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.report-content {
  margin-bottom: 20px;
}

.disc-chart {
  margin-bottom: 20px;
}

.primary-style {
  margin-bottom: 20px;
}

.style-breakdown {
  margin-bottom: 20px;
}

.profile-explanation {
  margin-bottom: 20px;
}

.characteristics {
  margin-bottom: 20px;
}

.communication-tips {
  margin-bottom: 20px;
}

.team-dynamics {
  margin-bottom: 20px;
}

.pdf-actions {
  text-align: center;
}

.btn-pdf {
  background-color: #007bff;
  color: #fff;
  border: none;
  padding: 10px 20px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
}

.btn-pdf:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}
</style>
