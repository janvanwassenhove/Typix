<template>
  <div class="home-page">
    <!-- Hero Section First -->
    <div class="hero-section">
      <div class="hero-container">
        <h1 class="hero-title">{{ t('welcome_title') }}</h1>
        <p class="hero-subtitle">{{ t('welcome_subtitle') }}</p>
        <div class="hero-stats">
          <div class="stat-item">
            <span class="stat-number">3</span>
            <span class="stat-label">Assessment Types</span>
          </div>
          <div class="stat-divider"></div>
          <div class="stat-item">
            <span class="stat-number">5</span>
            <span class="stat-label">Languages</span>
          </div>
          <div class="stat-divider"></div>
          <div class="stat-item">
            <span class="stat-number">∞</span>
            <span class="stat-label">Insights</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Assessment Types Section with integrated header -->
    <div class="assessments-section">
      <div class="container">

        <div class="surveys-grid">
          <div class="survey-card" v-for="(survey, index) in surveys" :key="survey.type">
            <div class="card-header">
              <div class="survey-number">{{ String(index + 1).padStart(2, '0') }}</div>
              <div class="survey-icon">
                <component :is="survey.icon" />
              </div>
            </div>
            
            <div class="card-content">
              <h3 class="survey-title">{{ t(survey.titleKey) }}</h3>
              <p class="survey-description">{{ t(survey.descriptionKey) }}</p>
              
              <div class="survey-features">
                <div class="features-header">Key Features:</div>
                <ul class="features-list">
                  <li v-for="feature in survey.features" :key="feature" class="feature-item">
                    <span class="feature-bullet">→</span>
                    {{ t(feature) }}
                  </li>
                </ul>
              </div>
            </div>
            
            <div class="card-footer">
              <div class="survey-meta">
                <span class="duration">~15 min</span>
                <span class="difficulty">{{ survey.difficulty || 'Beginner' }}</span>
              </div>
              <router-link :to="`/survey/${survey.type}`" class="btn btn-primary survey-btn">
                <span class="btn-text">{{ t('start_survey') }}</span>
                <span class="btn-arrow">→</span>
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useTranslations } from '../composables/useTranslations'
import EnneagramIcon from '../components/icons/EnneagramIcon.vue'
import DiscIcon from '../components/icons/DiscIcon.vue'
import InsightsIcon from '../components/icons/InsightsIcon.vue'

const { t } = useTranslations()

const surveys = [
  {
    type: 'enneagram',
    titleKey: 'enneagram_title',
    descriptionKey: 'enneagram_description',
    features: ['personality_types', 'motivations', 'growth_paths'],
    icon: EnneagramIcon,
    difficulty: 'Intermediate'
  },
  {
    type: 'disc',
    titleKey: 'disc_title',
    descriptionKey: 'disc_description',
    features: ['behavioral_styles', 'communication', 'work_preferences'],
    icon: DiscIcon,
    difficulty: 'Beginner'
  },
  {
    type: 'insights',
    titleKey: 'insights_title',
    descriptionKey: 'insights_description',
    features: ['color_psychology', 'thinking_styles', 'team_dynamics'],
    icon: InsightsIcon,
    difficulty: 'Advanced'
  }
]
</script>

<style scoped>
.home-page {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

/* Hero Section */
.hero-section {
  background: #1A4731;
  padding: 60px 0 40px;
  text-align: center;
  position: relative;
  overflow: hidden;
}

.hero-section::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: radial-gradient(circle at 30% 20%, rgba(249, 166, 7, 0.1) 0%, transparent 50%),
              radial-gradient(circle at 70% 80%, rgba(249, 166, 7, 0.05) 0%, transparent 50%);
  pointer-events: none;
}

.hero-container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 32px;
  position: relative;
  z-index: 1;
}

.hero-badge {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: rgba(249, 166, 7, 0.15);
  color: #F9A607;
  padding: 14px 28px;
  border-radius: 50px;
  font-size: 0.95rem;
  font-weight: 600;
  margin-bottom: 32px;
  border: 1px solid rgba(249, 166, 7, 0.3);
  backdrop-filter: blur(10px);
}

.badge-icon {
  font-size: 1.2rem;
}

.hero-title {
  font-size: 4.5rem;
  font-weight: 900;
  color: white;
  margin-bottom: 24px;
  text-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
  letter-spacing: -0.03em;
  line-height: 1.1;
}

.hero-subtitle {
  font-size: 1.5rem;
  color: rgba(255, 255, 255, 0.9);
  max-width: 800px;
  margin: 0 auto 40px;
  line-height: 1.6;
  font-weight: 400;
}

.hero-stats {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 40px;
  margin-top: 40px;
}

.stat-item {
  text-align: center;
}

.stat-number {
  display: block;
  font-size: 3rem;
  font-weight: 900;
  color: #F9A607;
  line-height: 1;
  margin-bottom: 12px;
  text-shadow: 0 2px 8px rgba(249, 166, 7, 0.3);
}

.stat-label {
  font-size: 1rem;
  color: rgba(255, 255, 255, 0.8);
  font-weight: 600;
}

.stat-divider {
  width: 2px;
  height: 50px;
  background: linear-gradient(180deg, transparent, rgba(255, 255, 255, 0.3), transparent);
}

/* Assessments Section with integrated header */
.assessments-section {
  background: linear-gradient(180deg, #0f2a1c 0%, #0a1f15 100%);
  padding: 60px 0 80px;
  position: relative;
}

.container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 32px;
}

/* Section Header - now integrated */
.section-header {
  text-align: center;
  margin-bottom: 60px;
}

.section-title {
  font-size: 3rem;
  font-weight: 800;
  color: white;
  margin-bottom: 20px;
  letter-spacing: -0.02em;
}

.section-subtitle {
  font-size: 1.2rem;
  color: rgba(255, 255, 255, 0.85);
  max-width: 600px;
  margin: 0 auto;
  line-height: 1.6;
}

.surveys-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  gap: 40px;
  max-width: 1200px;
  margin: 0 auto;
}

.survey-card {
  background: white;
  border-radius: 28px;
  overflow: hidden;
  box-shadow: 0 32px 64px rgba(0, 0, 0, 0.15);
  transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
  border: 1px solid rgba(249, 166, 7, 0.1);
  position: relative;
}

.survey-card:hover {
  transform: translateY(-16px) scale(1.03);
  box-shadow: 0 48px 96px rgba(0, 0, 0, 0.25);
}

.card-header {
  background: linear-gradient(135deg, #1A4731 0%, #0f2a1c 100%);
  padding: 40px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;
  overflow: hidden;
}

.card-header::before {
  content: '';
  position: absolute;
  top: -50%;
  right: -50%;
  width: 200px;
  height: 200px;
  background: radial-gradient(circle, rgba(249, 166, 7, 0.2) 0%, transparent 70%);
}

.survey-number {
  font-size: 1.8rem;
  font-weight: 900;
  color: rgba(249, 166, 7, 0.7);
  font-family: 'Courier New', monospace;
}

.survey-icon {
  width: 72px;
  height: 72px;
  background: linear-gradient(135deg, #F9A607 0%, #e6950a 100%);
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  box-shadow: 0 12px 32px rgba(249, 166, 7, 0.4);
}

.card-content {
  padding: 40px;
}

.survey-title {
  font-size: 2rem;
  font-weight: 800;
  color: #1A4731;
  margin-bottom: 20px;
  line-height: 1.3;
}

.survey-description {
  color: #666;
  line-height: 1.7;
  margin-bottom: 36px;
  font-size: 1.05rem;
}

.survey-features {
  margin-bottom: 36px;
}

.features-header {
  font-size: 0.95rem;
  font-weight: 700;
  color: #1A4731;
  margin-bottom: 20px;
  text-transform: uppercase;
  letter-spacing: 0.8px;
}

.features-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.feature-item {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 10px 0;
  color: #666;
  font-size: 1rem;
  font-weight: 500;
}

.feature-bullet {
  color: #F9A607;
  font-weight: 700;
  font-size: 1.2rem;
}

.card-footer {
  padding: 0 40px 40px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
}

.survey-meta {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.duration, .difficulty {
  font-size: 0.9rem;
  color: #999;
  font-weight: 600;
}

.difficulty {
  color: #F9A607;
  font-weight: 700;
}

.survey-btn {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 18px 28px;
  font-size: 1.05rem;
  border-radius: 14px;
  min-width: 160px;
  justify-content: center;
  font-weight: 700;
}

.btn {
  border: none;
  cursor: pointer;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  text-decoration: none;
  display: inline-block;
  text-align: center;
  position: relative;
  overflow: hidden;
}

.btn::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
  transition: left 0.5s;
}

.btn:hover::before {
  left: 100%;
}

.btn-primary {
  background: linear-gradient(135deg, #F9A607 0%, #e6950a 100%);
  color: white;
  box-shadow: 0 12px 40px rgba(249, 166, 7, 0.3);
}

.btn-primary:hover {
  transform: translateY(-4px) scale(1.05);
  box-shadow: 0 20px 60px rgba(249, 166, 7, 0.4);
}

.btn-arrow {
  transition: transform 0.3s ease;
  font-size: 1.3rem;
}

.survey-btn:hover .btn-arrow {
  transform: translateX(6px);
}

@media (max-width: 768px) {
  .hero-section {
    padding: 40px 0 30px;
  }
  
  .hero-container {
    padding: 0 20px;
  }
  
  .hero-title {
    font-size: 3rem;
  }
  
  .hero-subtitle {
    font-size: 1.3rem;
    margin-bottom: 30px;
  }
  
  .hero-stats {
    gap: 24px;
    flex-wrap: wrap;
    margin-top: 30px;
  }
  
  .stat-number {
    font-size: 2.2rem;
  }
  
  .assessments-section {
    padding: 40px 0 60px;
  }
  
  .container {
    padding: 0 20px;
  }
  
  .section-header {
    margin-bottom: 40px;
  }
  
  .section-title {
    font-size: 2.2rem;
  }
  
  .surveys-grid {
    grid-template-columns: 1fr;
    gap: 32px;
  }
  
  .survey-card {
    margin: 0 -10px;
  }
  
  .card-header, .card-content, .card-footer {
    padding: 32px 28px;
  }
  
  .card-footer {
    flex-direction: column;
    align-items: stretch;
    gap: 20px;
  }
  
  .survey-btn {
    width: 100%;
  }
}
</style>
