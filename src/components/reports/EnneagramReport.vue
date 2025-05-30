<template>
  <div class="card">
    <div id="enneagram-report-content" class="report-content">
      <div class="type-header">
        <div class="type-number">{{ dominantType }}</div>
        <div class="type-info">
          <h3 class="type-name">{{ typeData.name }}</h3>
          <p class="type-subtitle">{{ typeData.subtitle }}</p>
        </div>
      </div>

      <!-- Enneagram Visualization -->
      <div class="enneagram-visualization">
        <h4>{{ t('enneagram_position') }}</h4>
        <!-- Explanation about the lines and connections -->
        <div class="enneagram-explanation">
          <p>
            The lines inside the Enneagram symbol represent the dynamic connections between types. 
            The triangle (3-6-9) and hexagon (1-4-2-8-5-7) show how each type is linked to others in patterns of growth, stress, and integration.
          </p>
        </div>
        <div class="enneagram-circle">
          <svg viewBox="0 0 400 400" class="enneagram-svg">
            <!-- Outer circle -->
            <circle cx="200" cy="200" r="180" fill="none" stroke="#e9ecef" stroke-width="2"/>
            
            <!-- Rotated lines and positions, but NOT rotating the text/numbers -->
            <g :transform="`rotate(${rotationAngle} 200 200)`">
              <g stroke="#dee2e6" stroke-width="1" opacity="0.5">
                <!-- Triangle: 3-6-9 -->
                <line :x1="positions[2].x" :y1="positions[2].y" :x2="positions[5].x" :y2="positions[5].y" />
                <line :x1="positions[5].x" :y1="positions[5].y" :x2="positions[8].x" :y2="positions[8].y" />
                <line :x1="positions[8].x" :y1="positions[8].y" :x2="positions[2].x" :y2="positions[2].y" />
                <!-- Hexagon: 1-4-2-8-5-7 -->
                <line :x1="positions[0].x" :y1="positions[0].y" :x2="positions[3].x" :y2="positions[3].y" />
                <line :x1="positions[3].x" :y1="positions[3].y" :x2="positions[1].x" :y2="positions[1].y" />
                <line :x1="positions[1].x" :y1="positions[1].y" :x2="positions[7].x" :y2="positions[7].y" />
                <line :x1="positions[7].x" :y1="positions[7].y" :x2="positions[4].x" :y2="positions[4].y" />
                <line :x1="positions[4].x" :y1="positions[4].y" :x2="positions[6].x" :y2="positions[6].y" />
                <line :x1="positions[6].x" :y1="positions[6].y" :x2="positions[0].x" :y2="positions[0].y" />
              </g>
            </g>
            <!-- Draw circles and text OUTSIDE the rotation group so they are always upright -->
            <g v-for="type in positions" :key="type.number">
              <circle 
                :cx="type.x" 
                :cy="type.y" 
                :r="type.number == dominantType ? 25 : 18"
                :fill="type.number == dominantType ? '#667eea' : '#f8f9fa'"
                :stroke="type.number == dominantType ? '#667eea' : '#dee2e6'"
                :stroke-width="type.number == dominantType ? 3 : 2"
                class="type-circle"
              />
              <text 
                :x="type.x" 
                :y="type.y + 6" 
                text-anchor="middle" 
                :fill="type.number == dominantType ? 'white' : '#333'"
                :font-size="type.number == dominantType ? '18' : '14'"
                font-weight="bold"
              >
                {{ type.number }}
              </text>
              <text 
                :x="type.x" 
                :y="type.y + (type.number == dominantType ? 45 : 35)" 
                text-anchor="middle" 
                :fill="type.number == dominantType ? '#667eea' : '#666'"
                font-size="10"
                font-weight="500"
              >
                {{ type.name }}
              </text>
            </g>
          </svg>
        </div>
        <!-- Add interpretation explanation below the visual -->
        <div class="enneagram-interpretation">
          <p>
            <b>How to interpret:</b> Your main type is highlighted. The connecting lines show which types you may move toward in times of growth or stress. 
            For example, when healthy, you may take on the positive traits of the type your line points to (growth), and under stress, you may display behaviors of the other connected type. 
            Use these connections to better understand your patterns and potential paths for personal development.
          </p>
        </div>
      </div>

      <!-- Score Breakdown -->
      <div class="score-breakdown">
        <h4>{{ t('enneagram_type_scores') }}</h4>
        <div class="scores-grid">
          <div 
            v-for="(score, type) in typeScores" 
            :key="type"
            class="score-item"
            :class="{ dominant: type == dominantType }"
          >
            <div class="score-header">
              <span class="score-type">Type {{ type }}</span>
              <span class="score-value">{{ score }}%</span>
            </div>
            <div class="score-bar">
              <div 
                class="score-fill" 
                :style="{ width: score + '%' }"
              ></div>
            </div>
          </div>
        </div>
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

const props = defineProps<{
  results: Record<number, number>
}>()

const { generatePDF, isGeneratingPDF } = usePdfExport()
const { t } = useTranslations()

const downloadPDF = async () => {
  try {
    await generatePDF('enneagram-report-content', `Enneagram-Report-Type-${dominantType.value}`)
  } catch (error) {
    console.error('Failed to generate PDF:', error)
    alert('Failed to generate PDF. Please try again.')
  }
}

const enneagramTypes = {
  1: {
    name: "The Perfectionist",
    subtitle: "The Rational, Idealistic Type",
    motivation: "To be good, right, perfect, and to improve everything",
    fear: "Being corrupt, defective, or wrong",
    traits: [
      "Principled and purposeful",
      "Self-controlled and perfectionistic", 
      "Critical and resentful when stressed",
      "Well-organized and orderly"
    ],
    growth: [
      "Practice self-compassion and accept imperfection",
      "Learn to delegate and trust others",
      "Focus on progress rather than perfection"
    ]
  },
  2: {
    name: "The Helper",
    subtitle: "The Caring, Interpersonal Type",
    motivation: "To feel loved and needed by being helpful to others",
    fear: "Being unloved or unwanted for themselves",
    traits: [
      "Empathetic and sincere",
      "Warm-hearted and appreciative",
      "People-pleasing and possessive",
      "Generous and demonstrative"
    ],
    growth: [
      "Learn to recognize and express your own needs",
      "Set healthy boundaries with others",
      "Practice self-care without guilt"
    ]
  },
  3: {
    name: "The Achiever", 
    subtitle: "The Success-Oriented, Pragmatic Type",
    motivation: "To feel valuable and worthwhile through being successful",
    fear: "Being worthless or without value apart from achievements",
    traits: [
      "Adaptable and driven",
      "Image-conscious and ambitious",
      "Diplomatic and poised",
      "Competitive and workaholic tendencies"
    ],
    growth: [
      "Connect with your authentic self beyond achievements",
      "Value being over doing",
      "Practice vulnerability and emotional honesty"
    ]
  },
  4: {
    name: "The Individualist",
    subtitle: "The Sensitive, Withdrawn Type",
    motivation: "To find themselves and their significance",
    fear: "Having no identity or personal significance",
    traits: [
      "Self-aware and sensitive",
      "Creative and emotionally honest",
      "Moody and self-conscious",
      "Withdrawn and temperamental"
    ],
    growth: [
      "Focus on what you have rather than what's missing",
      "Develop emotional regulation skills",
      "Practice gratitude and present-moment awareness"
    ]
  },
  5: {
    name: "The Investigator",
    subtitle: "The Intense, Cerebral Type",
    motivation: "To be capable and understanding of the world",
    fear: "Being useless, helpless, or incapable",
    traits: [
      "Perceptive and innovative",
      "Independent and secretive",
      "Isolated and intense",
      "High-strung and cynical"
    ],
    growth: [
      "Share your knowledge and insights with others",
      "Practice emotional expression and connection",
      "Take action on your ideas"
    ]
  },
  6: {
    name: "The Loyalist",
    subtitle: "The Committed, Security-Oriented Type",
    motivation: "To have security and support",
    fear: "Being without support or guidance",
    traits: [
      "Engaging and responsible",
      "Anxious and suspicious",
      "Committed and hard-working",
      "Defensive and evasive"
    ],
    growth: [
      "Trust your own inner guidance",
      "Practice self-reliance and confidence",
      "Question negative assumptions"
    ]
  },
  7: {
    name: "The Enthusiast",
    subtitle: "The Spontaneous, Versatile Type",
    motivation: "To maintain happiness and avoid pain",
    fear: "Being trapped in pain or deprivation",
    traits: [
      "Spontaneous and versatile",
      "Distractible and scattered",
      "Acquisitive and restless",
      "Optimistic and enthusiastic"
    ],
    growth: [
      "Practice focus and follow-through",
      "Learn to sit with difficult emotions",
      "Develop depth over breadth"
    ]
  },
  8: {
    name: "The Challenger",
    subtitle: "The Powerful, Dominating Type",
    motivation: "To be self-reliant and in control of their own life",
    fear: "Being controlled or vulnerable to others",
    traits: [
      "Self-confident and strong",
      "Confrontational and intimidating",
      "Resourceful and decisive",
      "Protective and controlling"
    ],
    growth: [
      "Practice vulnerability and emotional openness",
      "Use your power to serve others",
      "Learn to receive support from others"
    ]
  },
  9: {
    name: "The Peacemaker",
    subtitle: "The Easygoing, Self-Effacing Type",
    motivation: "To maintain inner and outer peace",
    fear: "Loss of connection and fragmentation",
    traits: [
      "Receptive and reassuring",
      "Agreeable and complacent",
      "Creative and optimistic",
      "Stubborn and inattentive"
    ],
    growth: [
      "Develop your own agenda and priorities",
      "Practice assertiveness and self-advocacy",
      "Take action on what matters to you"
    ]
  }
}

const enneagramPositions = [
  { number: 1, x: 285, y: 65, name: "Perfectionist" },
  { number: 2, x: 355, y: 155, name: "Helper" },
  { number: 3, x: 355, y: 245, name: "Achiever" },
  { number: 4, x: 285, y: 335, name: "Individualist" },
  { number: 5, x: 200, y: 360, name: "Investigator" },
  { number: 6, x: 115, y: 335, name: "Loyalist" },
  { number: 7, x: 45, y: 245, name: "Enthusiast" },
  { number: 8, x: 45, y: 155, name: "Challenger" },
  { number: 9, x: 200, y: 40, name: "Peacemaker" }
]

const typeScores = computed(() => {
  if (!props.results) return { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0, 8: 0, 9: 0 }

  const scores = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0, 8: 0, 9: 0 }

  // Assume each answer index maps to a type: 0->1, 1->2, ..., 8->9
  Object.values(props.results).forEach((answerIndex) => {
    const type = (Number(answerIndex) % 9) + 1
    scores[type as keyof typeof scores] += 1
  })

  // Normalize to percentages
  const total = Object.values(scores).reduce((sum, v) => sum + v, 0)
  if (total > 0) {
    Object.keys(scores).forEach(type => {
      const typeNum = Number(type) as keyof typeof scores
      scores[typeNum] = Math.round((scores[typeNum] / total) * 100)
    })
  }

  return scores
})

const dominantType = computed(() => {
  const scores = typeScores.value
  return Number(
    Object.entries(scores).reduce((a, b) =>
      scores[Number(a[0]) as keyof typeof scores] > scores[Number(b[0]) as keyof typeof scores] ? a : b
    )[0]
  )
})

const typeData = computed(() => enneagramTypes[dominantType.value as keyof typeof enneagramTypes] || enneagramTypes[1])

// Helper: get angle for each type (0 is top, clockwise)
function getTypeAngles() {
  const centerX = 200, centerY = 200, radius = 160
  // Type 9 is at the top, then 1-8 clockwise
  return Array.from({ length: 9 }, (_, i) => {
    const angle = ((i - 2) * 40) * Math.PI / 180 // -2 so type 9 is at top
    return {
      number: ((i + 8) % 9) + 1, // 9,1,2,3,4,5,6,7,8
      x: centerX + Math.sin(angle) * radius,
      y: centerY - Math.cos(angle) * radius,
      name: enneagramPositions[((i + 8) % 9)].name
    }
  })
}

// Compute rotation so dominantType is at the top (position 9)
const rotationAngle = computed(() => {
  // Find index of dominantType in enneagramPositions
  const idx = enneagramPositions.findIndex(t => t.number === dominantType.value)
  // Type 9 is at index 0 (top), so rotate by -idx*40 deg
  return -idx * 40
})

// Rotated positions for SVG
const positions = computed(() => getTypeAngles())
</script>

<style scoped>
.report-content {
  max-width: 700px;
  margin: 0 auto;
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
  cursor: pointer;
}

.type-circle:hover {
  transform: scale(1.1);
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
    max-width: 300px;
  }
  
  .score-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 5px;
  }
}
</style>
