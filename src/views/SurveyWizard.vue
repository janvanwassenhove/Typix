<template>
  <div class="container">
    <div class="card">
      <div class="survey-header">
        <h2 class="survey-title">{{ getSurveyTitle() }}</h2>
        <div class="progress-bar">
          <div class="progress-fill" :style="{ width: progressPercentage + '%' }"></div>
        </div>
        <p class="progress-text">{{ t('question') }} {{ currentStep + 1 }} {{ t('of') }} {{ totalSteps }}</p>
      </div>

      <component 
        :is="currentSurveyComponent" 
        :current-step="currentStep"
        :answers="answers"
        @answer="handleAnswer"
      />

      <div class="navigation-buttons">
        <button 
          v-if="currentStep > 0" 
          @click="previousStep" 
          class="btn btn-secondary"
        >
          {{ t('previous') }}
        </button>
        <router-link 
          v-if="currentStep === totalSteps - 1 && hasCurrentAnswer"
          :to="`/report/${surveyType}`" 
          class="btn btn-primary"
        >
          {{ t('your_results') }}
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useTranslations } from '../composables/useTranslations'
import EnneagramSurvey from '../components/surveys/EnneagramSurvey.vue'
import DiscSurvey from '../components/surveys/DiscSurvey.vue'
import InsightsSurvey from '../components/surveys/InsightsSurvey.vue'

const props = defineProps<{
  type: string
}>()

const { t } = useTranslations()

const surveyType = computed(() => props.type)
const currentStep = ref(0)
const answers = ref<Record<number, any>>({})

// Update totalSteps based on survey type
const totalSteps = computed(() => {
  if (surveyType.value === 'insights') return 5
  return 3
})

const surveyComponents = {
  enneagram: EnneagramSurvey,
  disc: DiscSurvey,
  insights: InsightsSurvey
}

const currentSurveyComponent = computed(() => {
  return surveyComponents[surveyType.value as keyof typeof surveyComponents] || EnneagramSurvey
})

const progressPercentage = computed(() => {
  return ((currentStep.value + 1) / totalSteps.value) * 100
})

const hasCurrentAnswer = computed(() => {
  return answers.value[currentStep.value] !== undefined
})

const getSurveyTitle = () => {
  const titleKeys = {
    enneagram: 'enneagram_title',
    disc: 'disc_title',
    insights: 'insights_title'
  }
  return t(titleKeys[surveyType.value as keyof typeof titleKeys] || 'enneagram_title')
}

const handleAnswer = (answer: any) => {
  answers.value[currentStep.value] = answer
  // Store answers in localStorage for persistence during the session
  localStorage.setItem(`${surveyType.value}_answers`, JSON.stringify(answers.value))
  
  // Auto-advance to next question after a brief delay
  setTimeout(() => {
    if (currentStep.value < totalSteps.value - 1) {
      currentStep.value++
    }
  }, 500)
}

const previousStep = () => {
  if (currentStep.value > 0) {
    currentStep.value--
  }
}

// Reset survey to start fresh
const resetSurvey = () => {
  currentStep.value = 0
  answers.value = {}
  // Clear any saved answers from localStorage
  localStorage.removeItem(`${surveyType.value}_answers`)
}

// Initialize survey on component mount
onMounted(() => {
  // Always start fresh - reset any previous selections
  resetSurvey()
})
</script>

<style scoped>
.survey-header {
  text-align: center;
  margin-bottom: 40px;
}

.survey-title {
  font-size: 2rem;
  color: #333;
  margin-bottom: 20px;
}

.progress-bar {
  width: 100%;
  height: 8px;
  background: #e9ecef;
  border-radius: 4px;
  overflow: hidden;
  margin-bottom: 15px;
}

.progress-fill {
  height: 100%;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  transition: width 0.3s ease;
}

.progress-text {
  color: #666;
  font-size: 0.9rem;
}

.navigation-buttons {
  display: flex;
  justify-content: space-between;
  margin-top: 40px;
  gap: 20px;
}

.navigation-buttons .btn {
  flex: 1;
  max-width: 200px;
}

.btn {
  padding: 12px 24px;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

.btn-primary {
  background: linear-gradient(135deg, #F9A607 0%, #1A4731 100%);
  color: white;
}

.btn-primary:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(249, 166, 7, 0.4);
}

.btn-secondary {
  background: #f8f9fa;
  color: #1A4731;
  border: 2px solid #1A4731;
}

.btn-secondary:hover {
  background: #1A4731;
  color: white;
  transform: translateY(-2px);
}

@media (max-width: 768px) {
  .survey-title {
    font-size: 1.5rem;
  }
  
  .navigation-buttons {
    flex-direction: column;
  }
  
  .navigation-buttons .btn {
    max-width: none;
  }
}
</style>
