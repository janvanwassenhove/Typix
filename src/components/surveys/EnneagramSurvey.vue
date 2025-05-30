<template>
  <div class="question-container">
    <h3 class="question-title">{{ currentQuestion.text }}</h3>
    <div class="answers-grid">
      <div 
        v-for="(option, index) in currentQuestion.options" 
        :key="index"
        class="answer-option"
        :class="{ active: selectedAnswer === index }"
        @click="selectAnswer(index)"
      >
        <div class="option-number">{{ index + 1 }}</div>
        <div class="option-text">{{ option }}</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { useTranslations } from '../../composables/useTranslations'

const props = defineProps<{
  currentStep: number
  answers: Record<number, any>
}>()

const emit = defineEmits<{
  answer: [answer: any]
}>()

const { currentLanguage } = useTranslations()
const selectedAnswer = ref<number | null>(null)

// Import questions from external JSON
import questions from '../../data/enneagram-questions.json'

const currentQuestion = computed(() => {
  const langQuestions = questions[currentLanguage as keyof typeof questions] || questions.en
  return langQuestions[props.currentStep] || langQuestions[0]
})

const selectAnswer = (index: number) => {
  selectedAnswer.value = index
  emit('answer', index)
}

// Reset selection when step changes or answers are cleared
watch(() => props.currentStep, () => {
  selectedAnswer.value = props.answers[props.currentStep] ?? null
}, { immediate: true })

// Watch for answers being cleared (reset)
watch(() => Object.keys(props.answers).length, (newLength) => {
  if (newLength === 0) {
    selectedAnswer.value = null
  }
}, { immediate: true })
</script>

<style scoped>
.question-container {
  text-align: center;
}

.question-title {
  font-size: 1.5rem;
  color: #333;
  margin-bottom: 30px;
  line-height: 1.4;
}

.answers-grid {
  display: grid;
  gap: 15px;
  max-width: 600px;
  margin: 0 auto;
}

.answer-option {
  display: flex;
  align-items: center;
  padding: 15px 20px;
  border: 2px solid #e9ecef;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.3s ease;
  background: #f8f9fa;
}

.answer-option:hover {
  border-color: #667eea;
  background: #f0f2ff;
}

.answer-option.active {
  border-color: #667eea;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
}

.option-number {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background: #dee2e6;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  margin-right: 15px;
  flex-shrink: 0;
}

.answer-option.active .option-number {
  background: rgba(255, 255, 255, 0.3);
  color: white;
}

.option-text {
  flex: 1;
  text-align: left;
}

@media (max-width: 768px) {
  .question-title {
    font-size: 1.3rem;
  }
  
  .answer-option {
    padding: 12px 15px;
  }
  
  .option-text {
    font-size: 0.9rem;
  }
}
</style>
