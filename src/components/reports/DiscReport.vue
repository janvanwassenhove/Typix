<template>
  <div class="card">
    <div id="disc-report-content" class="report-content">
      <!-- Tooltip for DISC abbreviations -->
      <div class="disc-tooltip">
        <span class="tooltip-label">What does <b>DISC</b> mean?</span>
        <span class="tooltip-content">
          <b>D</b>: Dominance &nbsp;|&nbsp;
          <b>I</b>: Influence &nbsp;|&nbsp;
          <b>S</b>: Steadiness &nbsp;|&nbsp;
          <b>C</b>: Conscientiousness
        </span>
      </div>
      
      <div class="disc-chart">
        <canvas ref="chartCanvas" width="400" height="400"></canvas>
      </div>
      
      <div class="primary-style">
        <h3>Your Primary Style: {{ dominantStyle.name }}</h3>
        <p class="style-description">{{ dominantStyle.description }}</p>
        <div class="combination-badge">
          <span class="combination-text">Profile Combination: {{ profileCombination }}</span>
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
        <h4>{{ profileCombination }} Profile</h4>
        <div class="profile-details">
          <div class="profile-description">
            <p>{{ combinationData.description }}</p>
          </div>
          <div class="profile-traits">
            <h5>Key Characteristics:</h5>
            <div class="traits-grid">
              <div v-for="trait in combinationData.traits" :key="trait" class="trait-item">
                {{ trait }}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="characteristics">
        <h4>Behavioral Strengths</h4>
        <div class="traits-grid">
          <div v-for="trait in dominantStyle.traits" :key="trait" class="trait-item">
            {{ trait }}
          </div>
        </div>
      </div>

      <div class="communication-tips">
        <h4>Communication & Work Style</h4>
        <ul>
          <li v-for="tip in dominantStyle.tips" :key="tip">{{ tip }}</li>
        </ul>
      </div>

      <div class="team-dynamics">
        <h4>Team Collaboration</h4>
        <div class="dynamics-content">
          <p>{{ combinationData.teamRole }}</p>
          <div class="collaboration-tips">
            <h5>Works Best With:</h5>
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

const chartCanvas = ref<HTMLCanvasElement>()
const { generatePDF, isGeneratingPDF } = usePdfExport()

const downloadPDF = async () => {
  try {
    await generatePDF('disc-report-content', `DISC-Report-${profileCombination.value}`)
  } catch (error) {
    console.error('Failed to generate PDF:', error)
    alert('Failed to generate PDF. Please try again.')
  }
}

const styleColors = {
  D: '#FF6B6B',
  I: '#FFD93D', 
  S: '#6BCF7F',
  C: '#4D96FF'
}

// Add this function so it's available in the template
function getStyleColor(style: string): string {
  return styleColors[style as keyof typeof styleColors] || '#000'
}

const styleData = {
  D: {
    name: "Dominance",
    description: "Direct, results-oriented, firm, strong-willed, and forceful",
    traits: ["Decisive", "Competitive", "Results-focused", "Direct communication"],
    tips: [
      "Be direct and to the point",
      "Focus on results and outcomes", 
      "Provide options and let them choose",
      "Avoid too much detail or small talk"
    ]
  },
  I: {
    name: "Influence", 
    description: "Outgoing, enthusiastic, optimistic, high-spirited, and lively",
    traits: ["Enthusiastic", "Persuasive", "People-oriented", "Optimistic"],
    tips: [
      "Be enthusiastic and energetic",
      "Allow time for socializing",
      "Use stories and examples",
      "Provide recognition and praise"
    ]
  },
  S: {
    name: "Steadiness",
    description: "Even-tempered, accommodating, patient, humble, and tactful", 
    traits: ["Reliable", "Patient", "Team-oriented", "Good listener"],
    tips: [
      "Be patient and supportive",
      "Provide security and stability",
      "Allow time for decision making",
      "Show appreciation for their loyalty"
    ]
  },
  C: {
    name: "Conscientiousness",
    description: "Private, analytical, logical, critical thinker, and reserved",
    traits: ["Analytical", "Precise", "Quality-focused", "Systematic"],
    tips: [
      "Provide detailed information",
      "Be prepared with facts and data",
      "Allow time for analysis",
      "Focus on quality and accuracy"
    ]
  }
}

const combinationProfiles = {
  'D/I': {
    name: 'INITIATOR',
    description: 'Results-oriented and people-focused. You drive initiatives while inspiring others to follow. Natural leaders who can motivate teams toward ambitious goals.',
    traits: ['Charismatic leader', 'Goal-oriented', 'Persuasive', 'Energetic', 'Risk-taker'],
    teamRole: 'You excel at launching new projects and rallying team support. Your combination of drive and enthusiasm makes you effective at both setting direction and getting buy-in.',
    complements: ['S/C profiles for detailed execution', 'C profiles for analytical support', 'S profiles for steady implementation']
  },
  'D/C': {
    name: 'LEADER',
    description: 'Results-driven with analytical precision. You make decisions based on data and drive for efficient, high-quality outcomes.',
    traits: ['Strategic thinker', 'Quality-focused', 'Efficient', 'Systematic leader', 'Performance-driven'],
    teamRole: 'You provide strong leadership with attention to detail. Your ability to combine vision with precision makes you effective at complex problem-solving.',
    complements: ['I profiles for team motivation', 'S profiles for relationship building', 'I/S profiles for team harmony']
  },
  'S/I': {
    name: 'CONNECTOR',
    description: 'Relationship-focused and supportive. You build strong team connections while maintaining harmony and encouraging collaboration.',
    traits: ['Team builder', 'Supportive', 'Collaborative', 'Encouraging', 'Diplomatic'],
    teamRole: 'You excel at bringing people together and maintaining positive team dynamics. Your warmth and stability create an environment where others thrive.',
    complements: ['D profiles for direction setting', 'C profiles for analytical tasks', 'D/C profiles for strategic leadership']
  },
  'S/C': {
    name: 'SUPPORTER',
    description: 'Steady and detail-oriented. You provide reliable, high-quality work while maintaining team stability and following established processes.',
    traits: ['Dependable', 'Detail-oriented', 'Loyal', 'Process-focused', 'Quality-conscious'],
    teamRole: 'You are the backbone of team operations, ensuring consistent quality and reliable execution. Your thoroughness and loyalty make you invaluable for long-term success.',
    complements: ['D profiles for leadership', 'I profiles for innovation', 'D/I profiles for dynamic leadership']
  },
  'I/D': {
    name: 'MOTIVATOR',
    description: 'Enthusiastic and action-oriented. You inspire others while driving for results, combining social energy with goal achievement.',
    traits: ['Inspiring', 'Action-oriented', 'Socially confident', 'Goal-focused', 'Optimistic'],
    teamRole: 'You energize teams while maintaining focus on results. Your ability to motivate others while driving performance makes you effective in dynamic environments.',
    complements: ['S profiles for stability', 'C profiles for detailed analysis', 'S/C profiles for steady execution']
  },
  'I/C': {
    name: 'PROMOTER',
    description: 'People-oriented with attention to quality. You promote ideas and solutions while ensuring they meet high standards.',
    traits: ['Persuasive', 'Quality-minded', 'Creative', 'Thorough communicator', 'Relationship-focused'],
    teamRole: 'You excel at presenting ideas and building consensus around quality solutions. Your combination of social skills and attention to detail helps in complex negotiations.',
    complements: ['D profiles for decision-making', 'S profiles for implementation', 'D/S profiles for leadership and stability']
  },
  'C/D': {
    name: 'ANALYST',
    description: 'Analytical and results-focused. You solve complex problems with systematic approaches while driving for efficient outcomes.',
    traits: ['Problem solver', 'Systematic', 'Results-oriented', 'Logical', 'Efficient'],
    teamRole: 'You provide analytical leadership, solving complex challenges with data-driven approaches. Your combination of analysis and action orientation drives optimal solutions.',
    complements: ['I profiles for team engagement', 'S profiles for relationship management', 'I/S profiles for team harmony']
  },
  'C/I': {
    name: 'COORDINATOR',
    description: 'Detail-oriented and people-focused. You coordinate complex projects while maintaining positive relationships and ensuring quality outcomes.',
    traits: ['Organized', 'Collaborative', 'Detail-focused', 'Communicative', 'Quality-driven'],
    teamRole: 'You excel at managing complex projects that require both attention to detail and team coordination. Your ability to organize while maintaining relationships is valuable in matrix environments.',
    complements: ['D profiles for strategic direction', 'S profiles for steady support', 'D/S profiles for leadership and stability']
  }
}

const styleScores = computed(() => {
  if (!props.results) return { D: 25, I: 25, S: 25, C: 25 }
  
  const scores = { D: 0, I: 0, S: 0, C: 0 }
  const styles = ['D', 'I', 'S', 'C']
  
  Object.values(props.results).forEach((answer) => {
    const style = styles[answer] as keyof typeof scores
    if (style) scores[style]++
  })
  
  const total = Object.values(scores).reduce((sum, score) => sum + score, 0)
  
  return {
    D: Math.round((scores.D / total) * 100),
    I: Math.round((scores.I / total) * 100), 
    S: Math.round((scores.S / total) * 100),
    C: Math.round((scores.C / total) * 100)
  }
})

const dominantStyle = computed(() => {
  const maxStyle = Object.entries(styleScores.value).reduce((a, b) => 
    styleScores.value[a[0] as keyof typeof styleScores.value] > styleScores.value[b[0] as keyof typeof styleScores.value] ? a : b
  )[0] as keyof typeof styleData
  
  return styleData[maxStyle]
})

const profileCombination = computed(() => {
  const scores = styleScores.value
  const sortedStyles = Object.entries(scores)
    .sort(([,a], [,b]) => b - a)
    .slice(0, 2)
  
  const primary = sortedStyles[0][0]
  const secondary = sortedStyles[1][0]
  
  return `${primary}/${secondary}`
})

const combinationData = computed(() => {
  return combinationProfiles[profileCombination.value as keyof typeof combinationProfiles] || combinationProfiles['D/I']
})

onMounted(() => {
  if (chartCanvas.value) {
    drawDiscCircle()
  }
})

const drawDiscCircle = () => {
  const canvas = chartCanvas.value
  if (!canvas) return
  
  const ctx = canvas.getContext('2d')
  if (!ctx) return
  
  const centerX = canvas.width / 2
  const centerY = canvas.height / 2
  const outerRadius = 180
  const innerRadius = 60
  
  // Clear canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height)
  
  // Draw outer ring with DISC sections
  const sections = [
    { style: 'D', startAngle: -Math.PI/2, endAngle: 0, color: styleColors.D, label: 'LEADER' },
    { style: 'I', startAngle: 0, endAngle: Math.PI/2, color: styleColors.I, label: 'MOTIVATOR' },
    { style: 'S', startAngle: Math.PI/2, endAngle: Math.PI, color: styleColors.S, label: 'SUPPORTER' },
    { style: 'C', startAngle: Math.PI, endAngle: 3*Math.PI/2, color: styleColors.C, label: 'ANALYST' }
  ]
  
  // Draw outer sections
  sections.forEach(section => {
    ctx.beginPath()
    ctx.arc(centerX, centerY, outerRadius, section.startAngle, section.endAngle)
    ctx.arc(centerX, centerY, outerRadius - 40, section.endAngle, section.startAngle, true)
    ctx.closePath()
    ctx.fillStyle = section.color
    ctx.fill()
    
    // Add section labels
    const labelAngle = (section.startAngle + section.endAngle) / 2
    const labelRadius = outerRadius - 20
    const labelX = centerX + Math.cos(labelAngle) * labelRadius
    const labelY = centerY + Math.sin(labelAngle) * labelRadius
    
    ctx.fillStyle = 'black'
    ctx.font = 'bold 14px Arial'
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'
    ctx.fillText(section.label, labelX, labelY)
    
    // Add style letter
    const letterRadius = outerRadius + 25
    const letterX = centerX + Math.cos(labelAngle) * letterRadius
    const letterY = centerY + Math.sin(labelAngle) * letterRadius
    
    ctx.fillStyle = section.color
    ctx.font = 'bold 32px Arial'
    ctx.fillText(section.style, letterX, letterY)
  })
  
  // Draw combination segments
  // Order must match visual positions (starting at top, clockwise)
  const combinations = [
    'D/I', // top
    'I/D', // top-right
    'I/S', // right
    'S/I', // bottom-right
    'S/C', // bottom
    'C/S', // bottom-left
    'C/D', // left
    'D/C'  // top-left
  ]

  combinations.forEach((combo, index) => {
    const angle = (index * Math.PI / 4) - Math.PI/2 + Math.PI/8
    const radius = (outerRadius + innerRadius) / 2

    ctx.fillStyle = '#333'
    ctx.font = 'bold 11px Arial'
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'

    const x = centerX + Math.cos(angle) * radius
    const y = centerY + Math.sin(angle) * radius
    ctx.fillText(combo, x, y)
  })

  // Highlight user's combination (use exact match, not normalized)
  const userCombo = profileCombination.value
  const comboIndex = combinations.indexOf(userCombo)
  if (comboIndex !== -1) {
    const angle = (comboIndex * Math.PI / 4) - Math.PI/2 + Math.PI/8
    const radius = (outerRadius + innerRadius) / 2

    ctx.beginPath()
    ctx.arc(
      centerX + Math.cos(angle) * radius,
      centerY + Math.sin(angle) * radius,
      25, 0, 2 * Math.PI
    )
    ctx.fillStyle = 'rgba(249, 166, 7, 0.3)'
    ctx.fill()
    ctx.strokeStyle = '#F9A607'
    ctx.lineWidth = 3
    ctx.stroke()
  }
  
  // Draw center circle
  ctx.beginPath()
  ctx.arc(centerX, centerY, innerRadius, 0, 2 * Math.PI)
  ctx.fillStyle = 'white'
  ctx.fill()
  ctx.strokeStyle = '#ddd'
  ctx.lineWidth = 2
  ctx.stroke()
  
  // Add center text
  ctx.fillStyle = '#333'
  ctx.font = 'bold 16px Arial'
  ctx.textAlign = 'center'
  ctx.textBaseline = 'middle'
  ctx.fillText('DISC', centerX, centerY - 10)
  ctx.font = '12px Arial'
  ctx.fillText('Profile', centerX, centerY + 10)
}
</script>

<style scoped>
.report-content {
  max-width: 800px;
  margin: 0 auto;
}

.disc-chart {
  text-align: center;
  margin-bottom: 40px;
  padding: 20px;
  background: #f8f9fa;
  border-radius: 15px;
}

.primary-style {
  text-align: center;
  margin-bottom: 40px;
  padding: 30px;
  background: linear-gradient(135deg, #1A4731 0%, #0f2a1c 100%);
  border-radius: 15px;
  color: white;
}

.primary-style h3 {
  color: white;
  font-size: 2rem;
  margin-bottom: 15px;
}

.style-description {
  color: rgba(255, 255, 255, 0.9);
  font-size: 1.1rem;
  line-height: 1.6;
  margin-bottom: 20px;
}

.combination-badge {
  display: inline-block;
  background: #F9A607;
  color: white;
  padding: 12px 24px;
  border-radius: 25px;
  font-weight: bold;
  font-size: 1rem;
}

.style-breakdown {
  margin-bottom: 40px;
  padding: 25px;
  background: white;
  border-radius: 15px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.style-scores {
  display: grid;
  gap: 20px;
}

.score-item {
  display: flex;
  align-items: center;
  gap: 20px;
}

.score-label {
  font-weight: bold;
  width: 30px;
  color: #333;
  font-size: 1.2rem;
}

.score-bar {
  flex: 1;
  height: 25px;
  background: #e9ecef;
  border-radius: 12px;
  overflow: hidden;
}

.score-fill {
  height: 100%;
  transition: width 0.8s ease;
  border-radius: 12px;
}

.score-value {
  font-weight: bold;
  color: #333;
  width: 50px;
  text-align: right;
  font-size: 1.1rem;
}

.profile-explanation {
  margin-bottom: 40px;
  padding: 30px;
  background: linear-gradient(135deg, #F9A607 0%, #e6950a 100%);
  border-radius: 15px;
  color: white;
}

.profile-explanation h4 {
  color: white;
  font-size: 1.8rem;
  margin-bottom: 20px;
}

.profile-details {
  display: grid;
  gap: 25px;
}

.profile-description p {
  font-size: 1.1rem;
  line-height: 1.7;
  color: rgba(255, 255, 255, 0.95);
}

.profile-traits h5 {
  color: white;
  font-size: 1.2rem;
  margin-bottom: 15px;
}

.characteristics h4,
.communication-tips h4,
.team-dynamics h4 {
  color: #333;
  font-size: 1.5rem;
  margin: 0 0 20px 0;
  border-left: 4px solid #F9A607;
  padding-left: 20px;
}

.traits-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 15px;
  margin-bottom: 25px;
}

.trait-item {
  background: #f8f9fa;
  padding: 15px 20px;
  border-radius: 10px;
  color: #555;
  text-align: center;
  font-weight: 500;
  border: 2px solid transparent;
  transition: all 0.3s ease;
}

.trait-item:hover {
  border-color: #F9A607;
  background: #fff;
}

.communication-tips ul,
.collaboration-tips ul {
  color: #555;
  line-height: 1.7;
  padding-left: 25px;
}

.communication-tips li,
.collaboration-tips li {
  margin-bottom: 10px;
  font-size: 1.05rem;
}

.team-dynamics {
  padding: 30px;
  background: #f8f9fa;
  border-radius: 15px;
  border: 2px solid #e9ecef;
}

.dynamics-content p {
  color: #555;
  font-size: 1.1rem;
  line-height: 1.7;
  margin-bottom: 25px;
}

.collaboration-tips h5 {
  color: #333;
  font-size: 1.2rem;
  margin-bottom: 15px;
  font-weight: 700;
}

.pdf-actions {
  margin-top: 30px;
  text-align: center;
  padding: 20px;
  border-top: 1px solid #e9ecef;
}

.btn-pdf {
  background: linear-gradient(135deg, #FF6B6B 0%, #FFD93D 50%, #6BCF7F 75%, #4D96FF 100%);
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

.disc-tooltip {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 10px;
  font-size: 1rem;
  color: #333;
}

.tooltip-label {
  font-weight: 600;
  margin-bottom: 2px;
}

.tooltip-content {
  background: #f8f9fa;
  border-radius: 8px;
  padding: 6px 16px;
  font-size: 0.98rem;
  color: #222;
  box-shadow: 0 2px 8px rgba(0,0,0,0.04);
  letter-spacing: 0.01em;
}

@media (max-width: 768px) {
  .disc-chart canvas {
    width: 300px !important;
    height: 300px !important;
  }
  
  .primary-style,
  .profile-explanation,
  .team-dynamics {
    padding: 20px;
  }
  
  .traits-grid {
    grid-template-columns: 1fr;
  }
  
  .score-item {
    gap: 15px;
  }
  
  .score-label {
    width: 25px;
  }
}
</style>
