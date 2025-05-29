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

const questions = {
  en: [
    {
      text: "I am usually a responsible, reliable person.",
      options: [
        "Completely disagree",
        "Mostly disagree", 
        "Somewhat disagree",
        "Neutral",
        "Somewhat agree",
        "Mostly agree",
        "Completely agree"
      ]
    },
    {
      text: "I feel driven to excel and be the best at what I do.",
      options: [
        "Completely disagree",
        "Mostly disagree", 
        "Somewhat disagree",
        "Neutral",
        "Somewhat agree",
        "Mostly agree",
        "Completely agree"
      ]
    },
    {
      text: "I want to maintain my independence and self-reliance.",
      options: [
        "Completely disagree",
        "Mostly disagree", 
        "Somewhat disagree",
        "Neutral",
        "Somewhat agree",
        "Mostly agree",
        "Completely agree"
      ]
    }
  ],
  es: [
    {
      text: "Generalmente soy una persona responsable y confiable.",
      options: [
        "Completamente en desacuerdo",
        "Mayormente en desacuerdo",
        "Algo en desacuerdo", 
        "Neutral",
        "Algo de acuerdo",
        "Mayormente de acuerdo",
        "Completamente de acuerdo"
      ]
    },
    {
      text: "Me siento impulsado a sobresalir y ser el mejor en lo que hago.",
      options: [
        "Completamente en desacuerdo",
        "Mayormente en desacuerdo",
        "Algo en desacuerdo",
        "Neutral", 
        "Algo de acuerdo",
        "Mayormente de acuerdo",
        "Completamente de acuerdo"
      ]
    },
    {
      text: "Quiero mantener mi independencia y autosuficiencia.",
      options: [
        "Completamente en desacuerdo",
        "Mayormente en desacuerdo",
        "Algo en desacuerdo",
        "Neutral",
        "Algo de acuerdo", 
        "Mayormente de acuerdo",
        "Completamente de acuerdo"
      ]
    }
  ],
  fr: [
    {
      text: "Je suis généralement une personne responsable et fiable.",
      options: [
        "Complètement en désaccord",
        "Plutôt en désaccord",
        "Quelque peu en désaccord",
        "Neutre",
        "Quelque peu d'accord",
        "Plutôt d'accord", 
        "Complètement d'accord"
      ]
    },
    {
      text: "Je me sens poussé à exceller et être le meilleur dans ce que je fais.",
      options: [
        "Complètement en désaccord",
        "Plutôt en désaccord",
        "Quelque peu en désaccord",
        "Neutre",
        "Quelque peu d'accord",
        "Plutôt d'accord",
        "Complètement d'accord"
      ]
    },
    {
      text: "Je veux maintenir mon indépendance et mon autonomie.",
      options: [
        "Complètement en désaccord",
        "Plutôt en désaccord", 
        "Quelque peu en désaccord",
        "Neutre",
        "Quelque peu d'accord",
        "Plutôt d'accord",
        "Complètement d'accord"
      ]
    }
  ],
  de: [
    {
      text: "Ich bin normalerweise eine verantwortliche, zuverlässige Person.",
      options: [
        "Völlig uneinig",
        "Größtenteils uneinig",
        "Etwas uneinig",
        "Neutral",
        "Etwas einig",
        "Größtenteils einig",
        "Völlig einig"
      ]
    },
    {
      text: "Ich fühle mich gedrängt, zu glänzen und der Beste in dem zu sein, was ich tue.",
      options: [
        "Völlig uneinig",
        "Größtenteils uneinig", 
        "Etwas uneinig",
        "Neutral",
        "Etwas einig",
        "Größtenteils einig",
        "Völlig einig"
      ]
    },
    {
      text: "Ich möchte meine Unabhängigkeit und Selbstständigkeit bewahren.",
      options: [
        "Völlig uneinig",
        "Größtenteils uneinig",
        "Etwas uneinig",
        "Neutral",
        "Etwas einig",
        "Größtenteils einig",
        "Völlig einig"
      ]
    }
  ],
  nl: [
    {
      text: "Ik ben meestal een verantwoordelijke, betrouwbare persoon.",
      options: [
        "Helemaal oneens",
        "Grotendeels oneens",
        "Enigszins oneens",
        "Neutraal",
        "Enigszins eens",
        "Grotendeels eens",
        "Helemaal eens"
      ]
    },
    {
      text: "Ik voel me gedreven om uit te blinken en de beste te zijn in wat ik doe.",
      options: [
        "Helemaal oneens",
        "Grotendeels oneens",
        "Enigszins oneens", 
        "Neutraal",
        "Enigszins eens",
        "Grotendeels eens",
        "Helemaal eens"
      ]
    },
    {
      text: "Ik wil mijn onafhankelijkheid en zelfstandigheid behouden.",
      options: [
        "Helemaal oneens",
        "Grotendeels oneens",
        "Enigszins oneens",
        "Neutraal",
        "Enigszins eens",
        "Grotendeels eens",
        "Helemaal eens"
      ]
    }
  ]
}

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
