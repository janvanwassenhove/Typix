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
      text: "Which approach do you prefer when solving problems?",
      options: [
        { text: "Quick, decisive action", value: "red" },
        { text: "Collaborative brainstorming", value: "yellow" },
        { text: "Methodical analysis", value: "blue" },
        { text: "Supportive facilitation", value: "green" }
      ]
    },
    {
      text: "In social situations, you tend to be:",
      options: [
        { text: "Assertive and direct", value: "red" },
        { text: "Outgoing and expressive", value: "yellow" },
        { text: "Thoughtful and observant", value: "blue" },
        { text: "Warm and accommodating", value: "green" }
      ]
    },
    {
      text: "Your ideal work environment is:",
      options: [
        { text: "Fast-paced and challenging", value: "red" },
        { text: "Dynamic and people-focused", value: "yellow" },
        { text: "Structured and detail-oriented", value: "blue" },
        { text: "Harmonious and supportive", value: "green" }
      ]
    },
    {
      text: "When making decisions, you prioritize:",
      options: [
        { text: "Results and efficiency", value: "red" },
        { text: "People and relationships", value: "yellow" },
        { text: "Facts and accuracy", value: "blue" },
        { text: "Consensus and harmony", value: "green" }
      ]
    },
    {
      text: "Your communication style is typically:",
      options: [
        { text: "Direct and to the point", value: "red" },
        { text: "Enthusiastic and engaging", value: "yellow" },
        { text: "Precise and detailed", value: "blue" },
        { text: "Patient and supportive", value: "green" }
      ]
    }
  ],
  es: [
    {
      text: "¿Qué enfoque prefieres al resolver problemas?",
      options: [
        { text: "Acción rápida y decisiva", value: "red" },
        { text: "Lluvia de ideas colaborativa", value: "yellow" },
        { text: "Análisis metódico", value: "blue" },
        { text: "Facilitación de apoyo", value: "green" }
      ]
    },
    {
      text: "En situaciones sociales, tiendes a ser:",
      options: [
        { text: "Asertivo y directo", value: "red" },
        { text: "Extrovertido y expresivo", value: "yellow" },
        { text: "Reflexivo y observador", value: "blue" },
        { text: "Cálido y complaciente", value: "green" }
      ]
    },
    {
      text: "Tu entorno de trabajo ideal es:",
      options: [
        { text: "Rápido y desafiante", value: "red" },
        { text: "Dinámico y centrado en las personas", value: "yellow" },
        { text: "Estructurado y orientado a los detalles", value: "blue" },
        { text: "Armonioso y solidario", value: "green" }
      ]
    },
    {
      text: "Al tomar decisiones, priorizas:",
      options: [
        { text: "Resultados y eficiencia", value: "red" },
        { text: "Personas y relaciones", value: "yellow" },
        { text: "Hechos y precisión", value: "blue" },
        { text: "Consenso y armonía", value: "green" }
      ]
    },
    {
      text: "Tu estilo de comunicación es típicamente:",
      options: [
        { text: "Directo y al grano", value: "red" },
        { text: "Entusiasta y atractivo", value: "yellow" },
        { text: "Preciso y detallado", value: "blue" },
        { text: "Paciente y solidario", value: "green" }
      ]
    }
  ],
  fr: [
    {
      text: "Quelle approche préférez-vous pour résoudre les problèmes ?",
      options: [
        { text: "Action rapide et décisive", value: "red" },
        { text: "Brainstorming collaboratif", value: "yellow" },
        { text: "Analyse méthodique", value: "blue" },
        { text: "Facilitation de soutien", value: "green" }
      ]
    },
    {
      text: "Dans les situations sociales, vous avez tendance à être :",
      options: [
        { text: "Assertif et direct", value: "red" },
        { text: "Extraverti et expressif", value: "yellow" },
        { text: "Réfléchi et observateur", value: "blue" },
        { text: "Chaleureux et accommodant", value: "green" }
      ]
    },
    {
      text: "Votre environnement de travail idéal est :",
      options: [
        { text: "Rapide et stimulant", value: "red" },
        { text: "Dynamique et axé sur les gens", value: "yellow" },
        { text: "Structuré et orienté vers les détails", value: "blue" },
        { text: "Harmonieux et solidaire", value: "green" }
      ]
    },
    {
      text: "Lors de la prise de décisions, vous priorisez :",
      options: [
        { text: "Résultats et efficacité", value: "red" },
        { text: "Personnes et relations", value: "yellow" },
        { text: "Faits et précision", value: "blue" },
        { text: "Consensus et harmonie", value: "green" }
      ]
    },
    {
      text: "Votre style de communication est généralement :",
      options: [
        { text: "Direct et concis", value: "red" },
        { text: "Enthousiaste et engageant", value: "yellow" },
        { text: "Précis et détaillé", value: "blue" },
        { text: "Patient et solidaire", value: "green" }
      ]
    }
  ],
  de: [
    {
      text: "Welchen Ansatz bevorzugen Sie bei der Problemlösung?",
      options: [
        { text: "Schnelle, entscheidende Aktion", value: "red" },
        { text: "Kollaboratives Brainstorming", value: "yellow" },
        { text: "Methodische Analyse", value: "blue" },
        { text: "Unterstützende Moderation", value: "green" }
      ]
    },
    {
      text: "In sozialen Situationen neigen Sie dazu, zu sein:",
      options: [
        { text: "Durchsetzungsfähig und direkt", value: "red" },
        { text: "Aufgeschlossen und ausdrucksstark", value: "yellow" },
        { text: "Nachdenklich und aufmerksam", value: "blue" },
        { text: "Warm und entgegenkommend", value: "green" }
      ]
    },
    {
      text: "Ihre ideale Arbeitsumgebung ist:",
      options: [
        { text: "Schnelllebig und herausfordernd", value: "red" },
        { text: "Dynamisch und menschenorientiert", value: "yellow" },
        { text: "Strukturiert und detailorientiert", value: "blue" },
        { text: "Harmonisch und unterstützend", value: "green" }
      ]
    },
    {
      text: "Bei Entscheidungen priorisieren Sie:",
      options: [
        { text: "Ergebnisse und Effizienz", value: "red" },
        { text: "Menschen und Beziehungen", value: "yellow" },
        { text: "Fakten und Genauigkeit", value: "blue" },
        { text: "Konsens und Harmonie", value: "green" }
      ]
    },
    {
      text: "Ihr Kommunikationsstil ist typischerweise:",
      options: [
        { text: "Direkt und auf den Punkt", value: "red" },
        { text: "Enthusiastisch und einnehmend", value: "yellow" },
        { text: "Präzise und detailliert", value: "blue" },
        { text: "Geduldig und unterstützend", value: "green" }
      ]
    }
  ],
  nl: [
    {
      text: "Welke aanpak verkies je bij het oplossen van problemen?",
      options: [
        { text: "Snelle, beslissende actie", value: "red" },
        { text: "Collaboratief brainstormen", value: "yellow" },
        { text: "Methodische analyse", value: "blue" },
        { text: "Ondersteunende facilitatie", value: "green" }
      ]
    },
    {
      text: "In sociale situaties ben je geneigd om te zijn:",
      options: [
        { text: "Assertief en direct", value: "red" },
        { text: "Uitgaand en expressief", value: "yellow" },
        { text: "Bedachtzaam en observerend", value: "blue" },
        { text: "Warm en tegemoetkomend", value: "green" }
      ]
    },
    {
      text: "Je ideale werkomgeving is:",
      options: [
        { text: "Snel en uitdagend", value: "red" },
        { text: "Dynamisch en mensgericht", value: "yellow" },
        { text: "Gestructureerd en detailgericht", value: "blue" },
        { text: "Harmonieus en ondersteunend", value: "green" }
      ]
    },
    {
      text: "Bij het nemen van beslissingen geef je prioriteit aan:",
      options: [
        { text: "Resultaten en efficiëntie", value: "red" },
        { text: "Mensen en relaties", value: "yellow" },
        { text: "Feiten en nauwkeurigheid", value: "blue" },
        { text: "Consensus en harmonie", value: "green" }
      ]
    },
    {
      text: "Je communicatiestijl is doorgaans:",
      options: [
        { text: "Direct en to the point", value: "red" },
        { text: "Enthousiast en boeiend", value: "yellow" },
        { text: "Precies en gedetailleerd", value: "blue" },
        { text: "Geduldig en ondersteunend", value: "green" }
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
