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
        <div class="option-text">{{ option.text }}</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { useTranslations } from '../../composables/useTranslations'
import questions from '../../data/insights-questions.json'

const props = defineProps<{
  currentStep: number
  answers: Record<number, any>
}>()

const emit = defineEmits<{
  answer: [answer: any]
}>()

const { currentLanguage } = useTranslations()
const selectedAnswer = ref<number | null>(null)

const currentQuestion = computed(() => {
  const langQuestions = questions[currentLanguage as keyof typeof questions] || questions.en
  return langQuestions[props.currentStep] || langQuestions[0]
})

const selectAnswer = (index: number) => {
  selectedAnswer.value = index
  const answer = {
    questionIndex: props.currentStep,
    answerIndex: index,
    value: currentQuestion.value.options[index].value
  }
  emit('answer', answer)
}

// Reset selection when step changes or answers are cleared
watch(() => props.currentStep, () => {
  selectedAnswer.value = props.answers[props.currentStep]?.answerIndex ?? null
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
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
  max-width: 800px;
  margin: 0 auto;
}

.answer-option {
  display: flex;
  align-items: center;
  padding: 20px;
  border: 3px solid #e9ecef;
  border-radius: 15px;
  cursor: pointer;
  transition: all 0.3s ease;
  background: #f8f9fa;
}

.answer-option:hover {
  background: #f0f2ff;
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  border-color: #F9A607;
}

.answer-option.active {
  background: white;
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
  border-color: #F9A607;
}

.option-number {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background: #1A4731;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  margin-right: 15px;
  flex-shrink: 0;
  font-size: 0.9rem;
}

.answer-option.active .option-number {
  background: #F9A607;
}

.option-text {
  flex: 1;
  font-size: 1rem;
  line-height: 1.4;
  text-align: left;
  color: #333;
}

@media (max-width: 768px) {
  .answers-grid {
    grid-template-columns: 1fr;
  }
  
  .question-title {
    font-size: 1.3rem;
  }
  
  .answer-option {
    padding: 15px;
  }
  
  .option-number {
    width: 25px;
    height: 25px;
    font-size: 0.8rem;
  }
}
</style>
