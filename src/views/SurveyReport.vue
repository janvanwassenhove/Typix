<template>
  <div class="container">
    <div class="card">
      <div class="report-header">
        <h2 class="report-title">{{ t('your_results') }}<span v-if="userName">, {{ userName }}</span></h2>
        <p class="report-subtitle">{{ getSurveyTitle() }}</p>
      </div>

      <component 
        :is="currentReportComponent" 
        :results="results" 
        :userName="userName" 
      />

      <div class="report-actions">
        <router-link to="/" class="btn btn-primary">{{ t('take_another_survey') }}</router-link>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { useTranslations } from '../composables/useTranslations'
import EnneagramReport from '../components/reports/EnneagramReport.vue'
import DiscReport from '../components/reports/DiscReport.vue'
import InsightsReport from '../components/reports/InsightsReport.vue'

const props = defineProps<{
  type: string
}>()

const { t } = useTranslations()

const surveyType = computed(() => props.type)

// Load real results from localStorage based on survey type
const results = ref<Record<number, any>>({})
const userName = ref('')

onMounted(() => {
  userName.value = localStorage.getItem('user_name') || ''
  const key = `${surveyType.value}_answers`
  const stored = localStorage.getItem(key)
  // Insights expects results as an array of answer indices
  if (surveyType.value === 'insights' && stored) {
    try {
      const parsed = JSON.parse(stored)
      // Extract answerIndex from each answer object
      if (typeof parsed === 'object' && !Array.isArray(parsed)) {
        results.value = Object.values(parsed).map((v: any) =>
          typeof v === 'object' && v !== null && typeof v.answerIndex === 'number' ? v.answerIndex : (typeof v === 'number' ? v : null)
        ).filter(v => v !== null)
      } else if (Array.isArray(parsed)) {
        results.value = parsed.map((v: any) =>
          typeof v === 'object' && v !== null && typeof v.answerIndex === 'number' ? v.answerIndex : (typeof v === 'number' ? v : null)
        ).filter(v => v !== null)
      } else {
        results.value = []
      }
    } catch {
      results.value = []
    }
  } else {
    results.value = stored ? JSON.parse(stored) : {}
  }
})

const reportComponents = {
  enneagram: EnneagramReport,
  disc: DiscReport,
  insights: InsightsReport
}

const currentReportComponent = computed(() => {
  return reportComponents[surveyType.value as keyof typeof reportComponents] || EnneagramReport
})

const getSurveyTitle = () => {
  const titleKeys = {
    enneagram: 'enneagram_title',
    disc: 'disc_title',
    insights: 'insights_title'
  }
  return t(titleKeys[surveyType.value as keyof typeof titleKeys] || 'enneagram_title')
}
</script>

<style scoped>
.report-header {
  text-align: center;
  margin-bottom: 40px;
}

.report-title {
  font-size: 2.5rem;
  color: #333;
  margin-bottom: 10px;
}

.report-subtitle {
  font-size: 1.2rem;
  color: #666;
}

.report-actions {
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-top: 40px;
}

@media (max-width: 768px) {
  .report-title {
    font-size: 2rem;
  }
  
  .report-actions {
    flex-direction: column;
    align-items: center;
  }
  
  .report-actions .btn {
    width: 100%;
    max-width: 300px;
  }
}
</style>
