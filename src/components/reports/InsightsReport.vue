<template>
  <div class="card">
    <div id="insights-report-content" class="report-content">
      <div class="insights-circle">
        <canvas ref="circleCanvas" width="400" height="400"></canvas>
      </div>

      <div class="primary-color">
        <h3>Your Primary Color: {{ dominantColor.name }}</h3>
        <div class="color-indicator" :style="{ backgroundColor: dominantColor.hex }"></div>
        <p class="color-description">{{ dominantColor.description }}</p>
        <div class="position-info">
          <span class="position-label">Profile Position: {{ profilePosition }}</span>
        </div>
      </div>

      <div class="color-breakdown">
        <h4>Color Energy Distribution</h4>
        <div class="color-bars">
          <div v-for="color in colorData" :key="color.name" class="color-bar">
            <div class="bar-header">
              <span class="color-name">{{ color.name }}</span>
              <span class="color-percentage">{{ colorScores[color.name] }}%</span>
            </div>
            <div class="bar-container">
              <div 
                class="bar-fill" 
                :style="{ 
                  width: `${colorScores[color.name]}%`, 
                  backgroundColor: color.hex 
                }"
              ></div>
            </div>
          </div>
        </div>
      </div>

      <div class="profile-analysis">
        <h4>Your Color Profile Analysis</h4>
        <div class="analysis-content">
          <p>{{ profileAnalysis.description }}</p>
          <div class="balance-indicator">
            <span class="balance-label">Energy Balance: {{ profileAnalysis.balance }}</span>
          </div>
        </div>
      </div>

      <div class="strengths-section">
        <h4>Your Strengths</h4>
        <div class="strengths-grid">
          <div v-for="strength in dominantColor.strengths" :key="strength" class="strength-item">
            {{ strength }}
          </div>
        </div>
      </div>

      <div class="development-areas">
        <h4>Development Areas</h4>
        <ul>
          <li v-for="area in dominantColor.development" :key="area">{{ area }}</li>
        </ul>
      </div>
    </div>

    <div class="pdf-actions">
      <button 
        @click="downloadPDF" 
        :disabled="isGeneratingPDF"
        class="btn btn-pdf"
      >
        <span v-if="isGeneratingPDF">Generating PDF...</span>
        <span v-else>📄 Download PDF Report</span>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { usePdfExport } from '../../composables/usePdfExport'

const props = defineProps<{
  results: Record<number, number>
}>()

const circleCanvas = ref<HTMLCanvasElement>()
const { generatePDF, isGeneratingPDF } = usePdfExport()

const downloadPDF = async () => {
  try {
    await generatePDF('insights-report-content', `Insights-Report-${dominantColor.value.name}`)
  } catch (error) {
    console.error('Failed to generate PDF:', error)
    alert('Failed to generate PDF. Please try again.')
  }
}

const colorData = [
  {
    name: "Red",
    hex: "#FF6B6B",
    description: "Fiery Red energy represents determination, leadership, and results-oriented thinking. You're direct, competitive, and thrive on challenges.",
    strengths: ["Natural leadership", "Quick decision making", "Results-focused", "Competitive drive"],
    development: [
      "Practice patience with others' pace",
      "Consider others' feelings in decisions", 
      "Delegate more effectively",
      "Balance task focus with relationship building"
    ]
  },
  {
    name: "Yellow", 
    hex: "#FFD93D",
    description: "Sunshine Yellow energy represents enthusiasm, creativity, and people-focused thinking. You're optimistic, persuasive, and energize others.",
    strengths: ["Inspiring others", "Creative problem solving", "Building relationships", "Positive outlook"],
    development: [
      "Follow through on commitments",
      "Focus on details and accuracy",
      "Listen more, talk less sometimes", 
      "Manage time and priorities better"
    ]
  },
  {
    name: "Blue",
    hex: "#45B7D1", 
    description: "Cool Blue energy represents analytical thinking, precision, and quality focus. You're logical, systematic, and value accuracy.",
    strengths: ["Analytical thinking", "Attention to detail", "Quality focus", "Systematic approach"],
    development: [
      "Make decisions with incomplete data",
      "Express emotions more openly",
      "Take calculated risks",
      "Communicate in simpler terms"
    ]
  },
  {
    name: "Green",
    hex: "#96CEB4",
    description: "Earth Green energy represents harmony, support, and steady progress. You're reliable, patient, and create stable environments.",
    strengths: ["Team collaboration", "Reliable support", "Patient approach", "Creating harmony"],
    development: [
      "Assert your opinions more",
      "Embrace change and new ideas",
      "Set personal boundaries", 
      "Take initiative when needed"
    ]
  }
]

const colorScores = computed(() => {
  if (!props.results) return { Red: 25, Yellow: 25, Blue: 25, Green: 25 }
  
  const scores = { Red: 0, Yellow: 0, Blue: 0, Green: 0 }
  const colorMapping = ['Red', 'Yellow', 'Blue', 'Green']
  
  Object.values(props.results).forEach((answer) => {
    const color = colorMapping[answer] as keyof typeof scores
    if (color) scores[color]++
  })
  
  const total = Object.values(scores).reduce((sum, score) => sum + score, 0)
  
  return {
    Red: Math.round((scores.Red / total) * 100),
    Yellow: Math.round((scores.Yellow / total) * 100),
    Blue: Math.round((scores.Blue / total) * 100), 
    Green: Math.round((scores.Green / total) * 100)
  }
})

const dominantColor = computed(() => {
  const maxColor = Object.entries(colorScores.value).reduce((a, b) => 
    colorScores.value[a[0] as keyof typeof colorScores.value] > colorScores.value[b[0] as keyof typeof colorScores.value] ? a : b
  )[0]
  
  return colorData.find(color => color.name === maxColor) || colorData[0]
})

const profilePosition = computed(() => {
  const scores = colorScores.value
  const sortedColors = Object.entries(scores)
    .sort(([,a], [,b]) => b - a)
    .slice(0, 2)
  
  const primary = sortedColors[0][0]
  const secondary = sortedColors[1][0]
  
  // Define position combinations
  const positions = {
    'Red-Yellow': 'Dynamic Leader',
    'Red-Blue': 'Analytical Driver', 
    'Red-Green': 'Supportive Leader',
    'Yellow-Red': 'Inspiring Motivator',
    'Yellow-Blue': 'Creative Analyst',
    'Yellow-Green': 'Collaborative Enthusiast',
    'Blue-Red': 'Strategic Executor',
    'Blue-Yellow': 'Methodical Communicator',
    'Blue-Green': 'Systematic Supporter',
    'Green-Red': 'Steady Achiever',
    'Green-Yellow': 'Harmonious Facilitator',
    'Green-Blue': 'Reliable Analyst'
  }
  
  return positions[`${primary}-${secondary}` as keyof typeof positions] || 'Balanced Profile'
})

const profileAnalysis = computed(() => {
  const scores = colorScores.value
  const total = Object.values(scores).reduce((sum, score) => sum + score, 0)
  const variance = Object.values(scores).reduce((sum, score) => sum + Math.pow(score - 25, 2), 0) / 4
  
  let balance = 'Highly Focused'
  let description = ''
  
  if (variance < 50) {
    balance = 'Well Balanced'
    description = 'You show a balanced approach across all color energies, adapting your style based on the situation. This flexibility is a significant strength in diverse environments.'
  } else if (variance < 150) {
    balance = 'Moderately Focused'
    description = 'You have clear preferences while maintaining some flexibility. Your primary colors guide your approach, but you can draw on other energies when needed.'
  } else {
    balance = 'Highly Focused'
    description = 'You have very strong preferences in specific color energies. This focused approach gives you clear strengths, though developing other areas could enhance your versatility.'
  }
  
  return { balance, description }
})

onMounted(() => {
  if (circleCanvas.value) {
    drawInsightsCircle()
  }
})

const drawInsightsCircle = () => {
  const canvas = circleCanvas.value
  if (!canvas) return
  
  const ctx = canvas.getContext('2d')
  if (!ctx) return
  
  const centerX = canvas.width / 2
  const centerY = canvas.height / 2
  const radius = 180
  
  // Clear canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height)
  
  // Draw quadrants
  const quadrants = [
    { color: '#FF6B6B', name: 'Red', startAngle: -Math.PI/2, endAngle: 0, label: 'LEADER' },
    { color: '#FFD93D', name: 'Yellow', startAngle: 0, endAngle: Math.PI/2, label: 'MOTIVATOR' },
    { color: '#96CEB4', name: 'Green', startAngle: Math.PI/2, endAngle: Math.PI, label: 'SUPPORTER' },
    { color: '#45B7D1', name: 'Blue', startAngle: Math.PI, endAngle: 3*Math.PI/2, label: 'ANALYST' }
  ]
  
  // Draw outer ring with color sections
  quadrants.forEach(quadrant => {
    ctx.beginPath()
    ctx.arc(centerX, centerY, radius, quadrant.startAngle, quadrant.endAngle)
    ctx.lineTo(centerX, centerY)
    ctx.closePath()
    ctx.fillStyle = quadrant.color
    ctx.globalAlpha = 0.3
    ctx.fill()
    ctx.globalAlpha = 1
    
    // Draw quadrant borders
    ctx.beginPath()
    ctx.arc(centerX, centerY, radius, quadrant.startAngle, quadrant.endAngle)
    ctx.lineTo(centerX, centerY)
    ctx.strokeStyle = quadrant.color
    ctx.lineWidth = 3
    ctx.stroke()
    
    // Add quadrant labels
    const labelAngle = (quadrant.startAngle + quadrant.endAngle) / 2
    const labelRadius = radius - 30
    const labelX = centerX + Math.cos(labelAngle) * labelRadius
    const labelY = centerY + Math.sin(labelAngle) * labelRadius
    
    ctx.fillStyle = quadrant.color
    ctx.font = 'bold 14px Arial'
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'
    ctx.fillText(quadrant.label, labelX, labelY)
    
    // Add color names
    const nameRadius = radius + 25
    const nameX = centerX + Math.cos(labelAngle) * nameRadius
    const nameY = centerY + Math.sin(labelAngle) * nameRadius
    
    ctx.font = 'bold 16px Arial'
    ctx.fillText(quadrant.name, nameX, nameY)
  })
  
  // Draw concentric circles for intensity levels
  for (let i = 1; i <= 3; i++) {
    ctx.beginPath()
    ctx.arc(centerX, centerY, (radius * i) / 3, 0, 2 * Math.PI)
    ctx.strokeStyle = '#ddd'
    ctx.lineWidth = 1
    ctx.stroke()
  }
  
  // Calculate profile position based on scores
  const scores = colorScores.value
  
  // Convert scores to coordinates
  // Red = top (negative Y), Yellow = right (positive X), Green = bottom (positive Y), Blue = left (negative X)
  const redWeight = scores.Red / 100
  const yellowWeight = scores.Yellow / 100
  const greenWeight = scores.Green / 100
  const blueWeight = scores.Blue / 100
  
  // Calculate position using weighted average
  const x = (yellowWeight - blueWeight) * radius * 0.7
  const y = (greenWeight - redWeight) * radius * 0.7
  
  const profileX = centerX + x
  const profileY = centerY + y
  
  // Draw profile position
  ctx.beginPath()
  ctx.arc(profileX, profileY, 12, 0, 2 * Math.PI)
  ctx.fillStyle = '#F9A607'
  ctx.fill()
  ctx.strokeStyle = '#1A4731'
  ctx.lineWidth = 3
  ctx.stroke()
  
  // Add profile indicator ring
  ctx.beginPath()
  ctx.arc(profileX, profileY, 20, 0, 2 * Math.PI)
  ctx.strokeStyle = '#F9A607'
  ctx.lineWidth = 2
  ctx.setLineDash([5, 5])
  ctx.stroke()
  ctx.setLineDash([])
  
  // Add "YOU" label
  ctx.fillStyle = '#1A4731'
  ctx.font = 'bold 12px Arial'
  ctx.textAlign = 'center'
  ctx.textBaseline = 'middle'
  ctx.fillText('YOU', profileX, profileY - 35)
  
  // Draw center circle
  ctx.beginPath()
  ctx.arc(centerX, centerY, 40, 0, 2 * Math.PI)
  ctx.fillStyle = 'white'
  ctx.fill()
  ctx.strokeStyle = '#333'
  ctx.lineWidth = 2
  ctx.stroke()
  
  // Add center text
  ctx.fillStyle = '#333'
  ctx.font = 'bold 14px Arial'
  ctx.textAlign = 'center'
  ctx.textBaseline = 'middle'
  ctx.fillText('INSIGHTS', centerX, centerY - 8)
  ctx.font = '12px Arial'
  ctx.fillText('DISCOVERY', centerX, centerY + 8)
}
</script>

<style scoped>
.report-content {
  max-width: 700px;
  margin: 0 auto;
}

.insights-circle {
  text-align: center;
  margin-bottom: 30px;
  padding: 20px;
  background: #f8f9fa;
  border-radius: 15px;
}

.primary-color {
  text-align: center;
  margin-bottom: 30px;
  padding: 25px;
  background: linear-gradient(135deg, #1A4731 0%, #0f2a1c 100%);
  border-radius: 15px;
  color: white;
}

.primary-color h3 {
  color: white;
  font-size: 1.8rem;
  margin-bottom: 15px;
}

.color-indicator {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  margin: 0 auto 15px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
}

.color-description {
  color: rgba(255, 255, 255, 0.9);
  font-size: 1.1rem;
  line-height: 1.6;
  margin-bottom: 20px;
}

.position-info {
  display: inline-block;
  background: #F9A607;
  color: white;
  padding: 12px 24px;
  border-radius: 25px;
  font-weight: bold;
  font-size: 1rem;
}

.profile-analysis {
  margin-bottom: 30px;
  padding: 25px;
  background: linear-gradient(135deg, #F9A607 0%, #e6950a 100%);
  border-radius: 15px;
  color: white;
}

.profile-analysis h4 {
  color: white;
  font-size: 1.5rem;
  margin-bottom: 20px;
}

.analysis-content p {
  font-size: 1.1rem;
  line-height: 1.6;
  margin-bottom: 20px;
  color: rgba(255, 255, 255, 0.95);
}

.balance-indicator {
  display: inline-block;
  background: rgba(255, 255, 255, 0.2);
  color: white;
  padding: 10px 20px;
  border-radius: 20px;
  font-weight: bold;
}

.color-breakdown h4,
.strengths-section h4,
.development-areas h4 {
  color: #333;
  font-size: 1.3rem;
  margin: 25px 0 15px 0;
  border-left: 4px solid #F9A607;
  padding-left: 15px;
}

.color-bars {
  display: grid;
  gap: 15px;
}

.color-bar {
  background: white;
  padding: 15px;
  border-radius: 10px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.bar-header {
  display: flex;
  justify-content: space-between;
  margin-bottom: 8px;
}

.color-name {
  font-weight: bold;
  color: #333;
}

.color-percentage {
  font-weight: bold;
  color: #666;
}

.bar-container {
  height: 12px;
  background: #e9ecef;
  border-radius: 6px;
  overflow: hidden;
}

.bar-fill {
  height: 100%;
  transition: width 0.5s ease;
  border-radius: 6px;
}

.strengths-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 15px;
  margin-bottom: 20px;
}

.strength-item {
  background: #f8f9fa;
  padding: 15px;
  border-radius: 10px;
  color: #555;
  text-align: center;
  border-left: 4px solid #4CAF50;
}

.development-areas ul {
  color: #555;
  line-height: 1.6;
  padding-left: 20px;
}

.development-areas li {
  margin-bottom: 10px;
}

.pdf-actions {
  margin-top: 30px;
  text-align: center;
  padding: 20px;
  border-top: 1px solid #e9ecef;
}

.btn-pdf {
  background: linear-gradient(135deg, #FF6B6B 0%, #FFD93D 25%, #96CEB4 50%, #45B7D1 100%);
  color: white;
  border: none;
  padding: 12px 30px;
  border-radius: 25px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(255, 107, 107, 0.3);
}

.btn-pdf:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(255, 107, 107, 0.4);
}

.btn-pdf:disabled {
  opacity: 0.6;
  cursor: not-allowed;
  transform: none;
}

@media (max-width: 768px) {
  .strengths-grid {
    grid-template-columns: 1fr;
  }
  
  .insights-circle canvas {
    width: 300px !important;
    height: 300px !important;
  }
  
  .primary-color,
  .profile-analysis {
    padding: 20px;
  }
}
</style>
