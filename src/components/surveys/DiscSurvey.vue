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
      text: "Which word best describes you in a work environment?",
      options: [
        "Direct and results-focused",
        "Enthusiastic and people-oriented", 
        "Steady and supportive",
        "Careful and detail-oriented"
      ]
    },
    {
      text: "When facing a challenge, you tend to:",
      options: [
        "Take charge and push forward",
        "Rally others and find creative solutions",
        "Seek consensus and maintain harmony",
        "Analyze thoroughly before acting"
      ]
    },
    {
      text: "In meetings, you are most likely to:",
      options: [
        "Drive the agenda and make decisions",
        "Generate ideas and energize the group",
        "Listen carefully and support others",
        "Ask detailed questions and ensure accuracy"
      ]
    }
  ],
  es: [
    {
      text: "¿Qué palabra te describe mejor en un entorno de trabajo?",
      options: [
        "Directo y enfocado en resultados",
        "Entusiasta y orientado a las personas",
        "Estable y solidario",
        "Cuidadoso y orientado a los detalles"
      ]
    },
    {
      text: "Cuando enfrentas un desafío, tiendes a:",
      options: [
        "Tomar el control y seguir adelante",
        "Reunir a otros y encontrar soluciones creativas",
        "Buscar consenso y mantener la armonía",
        "Analizar a fondo antes de actuar"
      ]
    },
    {
      text: "En las reuniones, es más probable que:",
      options: [
        "Dirijas la agenda y tomes decisiones",
        "Generes ideas y energices al grupo",
        "Escuches atentamente y apoyes a otros",
        "Hagas preguntas detalladas y asegures la precisión"
      ]
    }
  ],
  fr: [
    {
      text: "Quel mot vous décrit le mieux dans un environnement de travail ?",
      options: [
        "Direct et axé sur les résultats",
        "Enthousiaste et orienté vers les gens",
        "Stable et solidaire",
        "Prudent et soucieux du détail"
      ]
    },
    {
      text: "Face à un défi, vous avez tendance à :",
      options: [
        "Prendre les choses en main et aller de l'avant",
        "Rallier les autres et trouver des solutions créatives",
        "Chercher le consensus et maintenir l'harmonie",
        "Analyser en profondeur avant d'agir"
      ]
    },
    {
      text: "En réunion, vous êtes le plus susceptible de :",
      options: [
        "Diriger l'ordre du jour et prendre des décisions",
        "Générer des idées et dynamiser le groupe",
        "Écouter attentivement et soutenir les autres",
        "Poser des questions détaillées et assurer la précision"
      ]
    }
  ],
  de: [
    {
      text: "Welches Wort beschreibt Sie am besten in einer Arbeitsumgebung?",
      options: [
        "Direkt und ergebnisorientiert",
        "Enthusiastisch und menschenorientiert",
        "Beständig und unterstützend",
        "Vorsichtig und detailorientiert"
      ]
    },
    {
      text: "Wenn Sie vor einer Herausforderung stehen, neigen Sie dazu:",
      options: [
        "Die Führung zu übernehmen und voranzutreiben",
        "Andere zu sammeln und kreative Lösungen zu finden",
        "Konsens zu suchen und Harmonie zu bewahren",
        "Gründlich zu analysieren, bevor Sie handeln"
      ]
    },
    {
      text: "In Besprechungen werden Sie höchstwahrscheinlich:",
      options: [
        "Die Agenda vorantreiben und Entscheidungen treffen",
        "Ideen generieren und die Gruppe energetisieren",
        "Aufmerksam zuhören und andere unterstützen",
        "Detaillierte Fragen stellen und Genauigkeit sicherstellen"
      ]
    }
  ],
  nl: [
    {
      text: "Welk woord beschrijft je het beste in een werkomgeving?",
      options: [
        "Direct en resultaatgericht",
        "Enthousiast en mensgericht",
        "Stabiel en ondersteunend",
        "Voorzichtig en detailgericht"
      ]
    },
    {
      text: "Wanneer je een uitdaging tegenkomt, ben je geneigd om:",
      options: [
        "De leiding te nemen en vooruit te gaan",
        "Anderen te verzamelen en creatieve oplossingen te vinden",
        "Consensus te zoeken en harmonie te behouden",
        "Grondig te analyseren voordat je handelt"
      ]
    },
    {
      text: "In vergaderingen ben je het meest waarschijnlijk:",
      options: [
        "De agenda te sturen en beslissingen te nemen",
        "Ideeën te genereren en de groep te energeren",
        "Aandachtig te luisteren en anderen te ondersteunen",
        "Gedetailleerde vragen te stellen en nauwkeurigheid te waarborgen"
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
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
  max-width: 800px;
  margin: 0 auto;
}

.answer-option {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 25px 20px;
  border: 2px solid #e9ecef;
  border-radius: 15px;
  cursor: pointer;
  transition: all 0.3s ease;
  background: #f8f9fa;
  text-align: center;
}

.answer-option:hover {
  border-color: #667eea;
  background: #f0f2ff;
  transform: translateY(-2px);
}

.answer-option.active {
  border-color: #667eea;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  transform: translateY(-2px);
}

.option-letter {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: #dee2e6;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  font-size: 1.5rem;
  margin-bottom: 15px;
}

.answer-option.active .option-letter {
  background: rgba(255, 255, 255, 0.3);
  color: white;
}

.option-text {
  font-size: 1rem;
  line-height: 1.4;
}

@media (max-width: 768px) {
  .answers-grid {
    grid-template-columns: 1fr;
  }
  
  .question-title {
    font-size: 1.3rem;
  }
  
  .answer-option {
    padding: 20px 15px;
  }
}
</style>
