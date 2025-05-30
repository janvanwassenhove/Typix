<template>
  <div class="card">
    <div id="insights-report-content" class="report-content">
      <div class="insights-circle">
        <canvas ref="circleCanvas" width="500" height="500"></canvas>
      </div>

      <!-- Energy Dynamics Visualization -->
      <div class="energy-dynamics">
        <h4>Energy Dynamics</h4>
        <canvas ref="dynamicsCanvas" width="700" height="350"></canvas>
        <div class="dynamics-labels">
          <div>
            <strong>Persona<br>(Conscious)</strong>
          </div>
          <div>
            <strong>Preference<br>Flow</strong>
          </div>
          <div>
            <strong>Persona<br>(Less Conscious)</strong>
          </div>
        </div>
      </div>

      <div class="primary-color">
        <h3>{{ t('insights_primary_color') }}</h3>
        <div class="color-indicator" :style="{ backgroundColor: dominantColor.hex }"></div>
        <p class="color-description">{{ dominantColor.description }}</p>
        <div class="position-info">
          <span class="position-label">{{ t('insights_profile_position') }}: {{ profilePosition }}</span>
        </div>
      </div>

      <div class="color-breakdown">
        <h4>{{ t('insights_color_distribution') }}</h4>
        <div class="color-bars">
          <div v-for="color in colorData" :key="color.name" class="color-bar">
            <div class="bar-header">
              <span class="color-name">{{ color.name }}</span>
              <span class="color-percentage">{{ colorScores[color.name as keyof typeof colorScores] }}%</span>
            </div>
            <div class="bar-container">
              <div 
                class="bar-fill" 
                :style="{ 
                  width: `${colorScores[color.name as keyof typeof colorScores]}%`, 
                  backgroundColor: color.hex 
                }"
              ></div>
            </div>
          </div>
        </div>
      </div>

      <div class="profile-analysis">
        <h4>{{ t('insights_profile_analysis') }}</h4>
        <div class="analysis-content">
          <p>{{ profileAnalysis.description }}</p>
          <div class="balance-indicator">
            <span class="balance-label">{{ t('insights_energy_balance') }}: {{ profileAnalysis.balance }}</span>
          </div>
        </div>
      </div>

      <div class="strengths-section">
        <h4>{{ t('insights_strengths') }}</h4>
        <div class="strengths-grid">
          <div v-for="strength in dominantColor.strengths" :key="strength" class="strength-item">
            {{ strength }}
          </div>
        </div>
      </div>

      <div class="development-areas">
        <h4>{{ t('insights_development_areas') }}</h4>
        <ul>
          <li v-for="area in dominantColor.development" :key="area">{{ area }}</li>
        </ul>
      </div>

      <!-- Nieuwe secties: Pitfalls, Goede Dag, en Sterke Dag -->
      <div class="insights-extras">
        <div class="pitfalls-section">
          <h4>{{ t('insights_pitfalls') }}</h4>
          <ul>
            <li v-for="pitfall in dominantColor.pitfalls" :key="pitfall">{{ pitfall }}</li>
          </ul>
        </div>
        <div class="good-day-section">
          <h4>{{ t('insights_good_day') }}</h4>
          <p>{{ dominantColor.goodDay }}</p>
        </div>
        <div class="strong-day-section">
          <h4>{{ t('insights_strong_day') }}</h4>
          <p>{{ dominantColor.strongDay }}</p>
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
</template>

<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue'
import { usePdfExport } from '../../composables/usePdfExport'
import { useTranslations } from '../../composables/useTranslations'

const props = defineProps<{
  results: Record<number, number>,
  userName?: string
}>()

const circleCanvas = ref<HTMLCanvasElement>()
const dynamicsCanvas = ref<HTMLCanvasElement>()
const { generatePDF, isGeneratingPDF } = usePdfExport()
const { t } = useTranslations()

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
    ],
    pitfalls: [
      "Impulsiveness in decision making",
      "Overly critical of inefficiency",
      "Struggle to relax and go with the flow",
      "Tendency to overlook details"
    ],
    goodDay: "Today is a great day to take charge and lead initiatives. Your energy is high, and your ability to inspire others is enhanced.",
    strongDay: "You will excel in situations that require strategic thinking and problem-solving. Your natural analytical skills are heightened."
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
    ],
    pitfalls: [
      "Tendency to avoid conflict, leading to unresolved issues",
      "Overcommitment due to eagerness to please",
      "Difficulty in saying no",
      "May overlook practical details"
    ],
    goodDay: "Embrace your creativity and share your ideas with the world. It's a perfect day for collaboration and socializing.",
    strongDay: "Your ability to connect with others and inspire them is at its peak. Use this energy to motivate your team or community."
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
    ],
    pitfalls: [
      "Overly critical of oneself and others",
      "Tendency to dwell on problems rather than solutions",
      "May come across as aloof or detached",
      "Struggle to adapt to sudden changes"
    ],
    goodDay: "Today is ideal for tackling complex problems and focusing on details. Your analytical skills will lead to significant insights.",
    strongDay: "You will perform exceptionally well in tasks that require precision and careful planning. Trust your systematic approach."
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
    ],
    pitfalls: [
      "Tendency to avoid confrontation, leading to pent-up frustration",
      "Overly accommodating, may neglect personal needs",
      "Difficulty in making quick decisions",
      "May resist necessary change or innovation"
    ],
    goodDay: "Focus on nurturing your relationships and creating a positive atmosphere. Your supportive nature will shine through.",
    strongDay: "You will excel in roles that require patience and a steady hand. Your ability to maintain harmony will be a key asset."
  }
]

const colorScores = computed(() => {
  if (!props.results) return { Red: 25, Yellow: 25, Blue: 25, Green: 25 }

  // Extract answerIndex from each answer object or use the number directly
  let answers: number[] = []
  if (Array.isArray(props.results)) {
    answers = props.results.map(v => typeof v === 'number' ? v : (v && typeof v.answerIndex === 'number' ? v.answerIndex : null)).filter(v => v !== null) as number[]
  } else if (typeof props.results === 'object') {
    answers = Object.values(props.results).map((ans: any) => {
      if (typeof ans === 'number') return ans
      if (ans && typeof ans === 'object' && typeof ans.answerIndex === 'number') return ans.answerIndex
      return null
    }).filter(v => v !== null) as number[]
  }

  // Map answer indices to color names: 0=Red, 1=Yellow, 2=Blue, 3=Green
  const scores = { Red: 0, Yellow: 0, Blue: 0, Green: 0 }
  const colorMapping = ['Red', 'Yellow', 'Blue', 'Green']

  // Fix: Use keyof typeof scores for color keys
  answers.forEach((answer) => {
    const color = colorMapping[answer] as keyof typeof scores;
    if (color) scores[color]++;
  })

  const total = answers.length
  if (total === 0) return { Red: 25, Yellow: 25, Blue: 25, Green: 25 }

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
  )[0] as keyof typeof colorScores.value;
  return colorData.find(color => color.name === maxColor) || colorData[0]
})

const profilePosition = computed(() => {
  const scores = colorScores.value;
  const sortedColors = Object.entries(scores)
    .sort(([,a], [,b]) => b - a)
    .slice(0, 2);
  const primary = sortedColors[0][0] as keyof typeof scores;
  const secondary = sortedColors[1][0] as keyof typeof scores;
  
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
  drawEnergyDynamics()
})

watch(() => props.results, () => {
  drawInsightsCircle()
  drawEnergyDynamics()
})

const allTypes = [
  'REFORMER',    // Blue-Red (top, purple)
  'DIRECTOR',    // Red (top-right)
  'MOTIVATOR',   // Red-Yellow (right)
  'INSPIRER',    // Yellow (bottom-right)
  'HELPER',      // Yellow-Green (bottom)
  'SUPPORTER',   // Green (bottom-left)
  'COORDINATOR', // Green-Blue (left)
  'OBSERVER'     // Blue (top-left, 225°)
];
const typeColors = [
  '#9B59B6', // REFORMER (Blue-Red, Purple)
  '#E74C3C', // DIRECTOR (Red)
  '#E67E22', // MOTIVATOR (Red-Yellow, Orange)
  '#F7CA18', // INSPIRER (Yellow)
  '#B6D957', // HELPER (Yellow-Green)
  '#27AE60', // SUPPORTER (Green)
  '#00B5B5', // COORDINATOR (Green-Blue, Teal)
  '#3498DB'  // OBSERVER (Blue)
];
// Angles for each type (radians, starting from top, going clockwise)
const typeAngles = [
  -Math.PI/2,           // REFORMER (top, 270°)
  -Math.PI/4,           // DIRECTOR (top-right, 315°)
  0,                    // MOTIVATOR (right, 0°)
  Math.PI/4,            // INSPIRER (bottom-right, 45°)
  Math.PI/2,            // HELPER (bottom, 90°)
  3*Math.PI/4,          // SUPPORTER (bottom-left, 135°)
  Math.PI,              // COORDINATOR (left, 180°)
  -3*Math.PI/4          // OBSERVER (top-left, 225°)
];

const drawInsightsCircle = () => {
  const canvas = circleCanvas.value
  if (!canvas) return
  const ctx = canvas.getContext('2d')
  if (!ctx) return
  const centerX = canvas.width / 2
  const centerY = canvas.height / 2
  // Fit everything inside the .insights-circle div, so shrink radius if needed
  const maxRadius = Math.min(canvas.width, canvas.height) / 2 - 60; // 60px margin for labels
  const radius = Math.min(180, maxRadius);
  ctx.clearRect(0, 0, canvas.width, canvas.height)
  // Draw quadrants (colors only)
  const quadrants = [
    { color: '#FF6B6B', startAngle: -Math.PI/2, endAngle: 0 },
    { color: '#FFD93D', startAngle: 0, endAngle: Math.PI/2 },
    { color: '#96CEB4', startAngle: Math.PI/2, endAngle: Math.PI },
    { color: '#45B7D1', startAngle: Math.PI, endAngle: 3*Math.PI/2 }
  ]
  quadrants.forEach(quadrant => {
    ctx.beginPath()
    ctx.arc(centerX, centerY, radius, quadrant.startAngle, quadrant.endAngle)
    ctx.lineTo(centerX, centerY)
    ctx.closePath()
    ctx.fillStyle = quadrant.color
    ctx.globalAlpha = 0.3
    ctx.fill()
    ctx.globalAlpha = 1
    ctx.beginPath()
    ctx.arc(centerX, centerY, radius, quadrant.startAngle, quadrant.endAngle)
    ctx.lineTo(centerX, centerY)
    ctx.strokeStyle = quadrant.color
    ctx.lineWidth = 3
    ctx.stroke()
  })
  // Draw 8 types evenly spaced (octants), starting with REFORMER at top
  for (let i = 0; i < 8; i++) {
    const angle = typeAngles[i];
    const labelRadius = radius + 38; // closer to circle, fits in div
    ctx.save();
    ctx.translate(centerX, centerY);
    ctx.rotate(angle);
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.font = 'bold 18px Arial';
    // Draw colored background arc behind the text
    ctx.beginPath();
    // Make each arc 1/8th of the circle (45deg = Math.PI/4), so they touch and are equal
    ctx.arc(0, 0, labelRadius, -Math.PI/8, Math.PI/8); // 45deg arc centered on label
    ctx.lineWidth = 38; // Make arc thicker for better visibility and overlap
    ctx.strokeStyle = typeColors[i];
    ctx.shadowColor = 'rgba(0,0,0,0.13)';
    ctx.shadowBlur = 2;
    ctx.stroke();
    ctx.shadowBlur = 0;
    // Draw the label horizontally, tangent to the circle
    ctx.save();
    ctx.rotate(Math.PI/2); // Make text tangent to the circle
    ctx.fillStyle = '#fff';
    ctx.fillText(allTypes[i], 0, -labelRadius);
    ctx.restore();
    ctx.restore();
  }
  // Draw concentric circles for intensity levels
  for (let i = 1; i <= 3; i++) {
    ctx.beginPath()
    ctx.arc(centerX, centerY, (radius * i) / 3, 0, 2 * Math.PI)
    ctx.strokeStyle = '#ddd'
    ctx.lineWidth = 1
    ctx.stroke()
  }
  
  // Calculate profile position based on scores
  const scores = colorScores.value;
  // Correct quadrant mapping for canvas:
  // Red: 0° (right), Yellow: 90° (bottom), Green: 180° (left), Blue: 270° (top)
  const colorAngles = {
    Red: 0,                  // right
    Yellow: Math.PI / 2,     // bottom
    Green: Math.PI,          // left
    Blue: 3 * Math.PI / 2    // top
  };
  // Calculate vector sum for each color
  let sumX = 0;
  let sumY = 0;
  colorOrder.forEach(color => {
    const percent = scores[color as keyof typeof scores] / 100; // 0..1
    const angle = colorAngles[color as keyof typeof colorAngles];
    sumX += Math.cos(angle) * percent;
    sumY += Math.sin(angle) * percent;
  });
  // Normalize vector to max possible length (all in one direction)
  let norm = Math.sqrt(sumX * sumX + sumY * sumY);
  // Scale to fit within the circle (max radius * 0.7)
  let scale = norm > 0 ? (radius * 0.7) / 1 : 0; // max possible norm is 1
  const profileX = centerX + (sumX * scale);
  const profileY = centerY + (sumY * scale);
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
}

// --- ENERGY DYNAMICS CALCULATION HELPERS ---
const colorOrder = ['Red', 'Yellow', 'Blue', 'Green'];
const colorHex = {
  Red: '#FF6B6B',
  Yellow: '#FFD93D',
  Blue: '#45B7D1',
  Green: '#96CEB4',
};

// For energy dynamics, use the same colorScores as the rest of the report
const energyStats = computed(() => {
  // colorScores is already { Red, Yellow, Blue, Green } in percent
  // For mean, use (percent/100)*6
  const stats: Record<string, { mean: number, percent: number }> = {};
  colorOrder.forEach(color => {
    const percent = colorScores.value[color as keyof typeof colorScores.value];
    const mean = (percent / 100) * 6;
    stats[color] = { mean, percent };
  });
  return stats;
});

// --- NEW: Simulate Less Conscious Persona (for demo, rotate colorScores) ---
const lessConsciousStats = computed(() => {
  // For demo, rotate the color scores (Red->Yellow, Yellow->Blue, Blue->Green, Green->Red)
  const rotated: Record<string, number> = {};
  colorOrder.forEach((color, i) => {
    const prevColor = colorOrder[(i + colorOrder.length - 1) % colorOrder.length] as keyof typeof colorScores.value;
    rotated[color] = colorScores.value[prevColor];
  });
  // Convert to mean/percent
  const stats: Record<string, { mean: number, percent: number }> = {};
  colorOrder.forEach(color => {
    const percent = rotated[color];
    const mean = (percent / 100) * 6;
    stats[color] = { mean, percent };
  });
  return stats;
});

// --- Preference Flow Calculation ---
const preferenceFlow = computed(() => {
  // Flow = Conscious - LessConscious (as percent)
  const flow: Record<string, number> = {};
  colorOrder.forEach(color => {
    flow[color] = energyStats.value[color as keyof typeof energyStats.value].percent - lessConsciousStats.value[color as keyof typeof lessConsciousStats.value].percent;
  });
  return flow;
});

// --- DRAWING FUNCTIONS ---
function drawEnergyDynamics() {
  const canvas = dynamicsCanvas.value;
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  if (!ctx) return;
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  const chartWidth = 120;
  const chartHeight = 220;
  const chartSpacing = 80;
  const baseY = 40;
  const baseX = 60;
  // Draw three charts: persona, flow, persona (less conscious)
  drawPersonaBarChart(ctx, baseX, baseY, chartWidth, chartHeight, energyStats.value);
  drawFlowChart(ctx, baseX + chartWidth + chartSpacing, baseY, chartWidth, chartHeight, preferenceFlow.value);
  drawPersonaBarChart(ctx, baseX + 2 * (chartWidth + chartSpacing), baseY, chartWidth, chartHeight, lessConsciousStats.value);
  // Draw overall flow in center below flow chart (mean of abs values)
  const avgFlow =
    colorOrder.reduce((sum, color) => sum + Math.abs(preferenceFlow.value[color]), 0) / colorOrder.length;
  ctx.font = 'bold 16px Arial';
  ctx.fillStyle = '#333';
  ctx.textAlign = 'center';
  ctx.fillText(`${avgFlow.toFixed(1)}%`, baseX + chartWidth + chartSpacing + chartWidth / 2, baseY + chartHeight + 60);
}

// Persona bar chart: show mean and percent under each bar
function drawPersonaBarChart(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, stats: Record<string, { mean: number, percent: number }>) {
  const max = 6;
  const barW = w / 4 - 10;
  colorOrder.forEach((color, i) => {
    const { mean, percent } = stats[color];
    const barH = (mean / max) * h;
    ctx.fillStyle = colorHex[color as keyof typeof colorHex];
    ctx.fillRect(x + i * (barW + 10), y + h - barH, barW, barH);
    ctx.strokeStyle = '#333';
    ctx.strokeRect(x + i * (barW + 10), y, barW, h);
    // Mean and percent under bar (two lines)
    ctx.font = '11px Arial';
    ctx.fillStyle = '#333';
    ctx.textAlign = 'center';
    ctx.fillText(`${mean.toFixed(2)}`, x + i * (barW + 10) + barW / 2, y + h + 34);
    ctx.fillText(`${Math.round(percent)}%`, x + i * (barW + 10) + barW / 2, y + h + 48);
  });
  // Y axis (0-6)
  ctx.strokeStyle = '#aaa';
  ctx.beginPath();
  ctx.moveTo(x - 5, y);
  ctx.lineTo(x - 5, y + h);
  ctx.stroke();
  // X axis
  ctx.beginPath();
  ctx.moveTo(x - 5, y + h);
  ctx.lineTo(x + w + 5, y + h);
  ctx.stroke();
  // Draw y-ticks for 0-6
  ctx.font = '10px Arial';
  ctx.fillStyle = '#666';
  for (let i = 0; i <= 6; i++) {
    const yTick = y + h - (i / max) * h;
    ctx.fillText(i.toString(), x - 18, yTick + 3);
  }
}

// Preference flow: show positive/negative bars and percent
function drawFlowChart(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, flow: Record<string, number>) {
  ctx.strokeStyle = '#aaa';
  ctx.beginPath();
  ctx.moveTo(x - 5, y + h / 2);
  ctx.lineTo(x + w + 5, y + h / 2);
  ctx.stroke();
  const barW = w / 4 - 10;
  const maxAbs = 100; // percent scale
  colorOrder.forEach((color, i) => {
    const percent = flow[color];
    const barH = (Math.abs(percent) / maxAbs) * (h / 2);
    ctx.fillStyle = colorHex[color as keyof typeof colorHex];
    // Draw bar: up for positive, down for negative
    if (percent >= 0) {
      ctx.fillRect(x + i * (barW + 10), y + h / 2 - barH, barW, barH);
    } else {
      ctx.fillRect(x + i * (barW + 10), y + h / 2, barW, barH);
    }
    ctx.strokeStyle = '#333';
    ctx.strokeRect(x + i * (barW + 10), y, barW, h);
    // Show percent below bar
    ctx.font = '11px Arial';
    ctx.fillStyle = '#333';
    ctx.textAlign = 'center';
    ctx.fillText(`${percent > 0 ? '+' : ''}${Math.round(percent)}%`, x + i * (barW + 10) + barW / 2, y + h + 34);
  });
  // Y axis (100-0-100)
  ctx.strokeStyle = '#aaa';
  ctx.beginPath();
  ctx.moveTo(x - 5, y);
  ctx.lineTo(x - 5, y + h);
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(x - 5, y + h);
  ctx.lineTo(x + w + 5, y + h);
  ctx.stroke();
  ctx.font = '10px Arial';
  ctx.fillStyle = '#666';
  ctx.fillText('100', x - 22, y + 10);
  ctx.fillText('0', x - 15, y + h / 2 + 3);
  ctx.fillText('100', x - 22, y + h - 5);
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

.energy-dynamics {
  margin-bottom: 40px;
  padding: 25px;
  background: #fffbe8;
  border-radius: 15px;
  border: 2px solid #ffe2a0;
  text-align: center;
}

.energy-dynamics h4 {
  color: #F9A607;
  font-size: 1.3rem;
  margin-bottom: 15px;
}

.dynamics-labels {
  display: flex;
  justify-content: space-between;
  margin: 10px 60px 0 60px;
  font-size: 1.1rem;
  color: #333;
}

.dynamics-labels > div {
  width: 200px;
  text-align: center;
  font-weight: 600;
  line-height: 1.2;
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

.insights-extras {
  margin-top: 30px;
  padding: 25px;
  background: #f1f3f5;
  border-radius: 15px;
  color: #333;
}

.pitfalls-section,
.good-day-section,
.strong-day-section {
  margin-bottom: 20px;
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

@media (max-width: 500px) {
  .energy-dynamics canvas {
    width: 100% !important;
    height: 220px !important;
  }
  .dynamics-labels {
    margin: 10px 10px 0 10px;
    font-size: 1rem;
  }
  .dynamics-labels > div {
    width: 100px;
  }
}
</style>
