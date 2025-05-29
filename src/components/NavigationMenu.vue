<template>
  <nav class="navigation-menu">
    <div class="nav-container">
      <div class="nav-brand">
        <router-link to="/" class="brand-link">
          <div class="brand-icon">
            <svg width="36" height="36" viewBox="0 0 100 100" fill="currentColor">
              <circle cx="50" cy="50" r="45" fill="none" stroke="currentColor" stroke-width="2"/>
              <rect x="20" y="20" width="25" height="60" fill="currentColor" opacity="0.8"/>
              <rect x="55" y="35" width="25" height="45" fill="currentColor" opacity="0.6"/>
              <rect x="37.5" y="10" width="25" height="70" fill="currentColor" opacity="0.9"/>
              <circle cx="32.5" cy="15" r="3" fill="white"/>
              <circle cx="67.5" cy="30" r="3" fill="white"/>
              <circle cx="50" cy="5" r="3" fill="white"/>
            </svg>
          </div>
          <div class="brand-text">
            <span class="brand-name">{{ t('app_title') }}</span>
            <span class="brand-tagline">Assessment Platform</span>
          </div>
        </router-link>
      </div>
      
      <div class="nav-actions">
        <router-link 
          v-if="$route.path !== '/'" 
          to="/" 
          class="nav-button home-button"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
            <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/>
          </svg>
          <span class="button-text">{{ t('home') }}</span>
        </router-link>
        
        <LanguageSelector @language-changed="$emit('language-changed', $event)" />
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { useTranslations } from '../composables/useTranslations'
import LanguageSelector from './LanguageSelector.vue'

defineEmits<{
  'language-changed': [language: string]
}>()

const { t } = useTranslations()
</script>

<style scoped>
.navigation-menu {
  background: rgba(255, 255, 255, 0.98);
  border-bottom: 1px solid rgba(249, 166, 7, 0.1);
  position: sticky;
  top: 0;
  z-index: 100;
  box-shadow: 0 4px 32px rgba(0, 0, 0, 0.08);
}

.nav-container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 32px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 80px;
}

.nav-brand {
  display: flex;
  align-items: center;
}

.brand-link {
  display: flex;
  align-items: center;
  text-decoration: none;
  color: #1A4731;
  transition: all 0.3s ease;
  gap: 16px;
}

.brand-link:hover {
  transform: scale(1.02);
}

.brand-link:hover .brand-icon {
  color: #F9A607;
  transform: rotate(5deg);
}

.brand-icon {
  display: flex;
  align-items: center;
  color: #F9A607;
  transition: all 0.3s ease;
}

.brand-text {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.brand-name {
  font-size: 1.4rem;
  font-weight: 800;
  color: #1A4731;
  line-height: 1;
}

.brand-tagline {
  font-size: 0.75rem;
  color: #F9A607;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.nav-actions {
  display: flex;
  align-items: center;
  gap: 20px;
}

.nav-button {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 12px 20px;
  background: linear-gradient(135deg, #1A4731 0%, #0f2a1c 100%);
  color: white;
  text-decoration: none;
  border-radius: 12px;
  font-weight: 600;
  transition: all 0.3s ease;
  border: none;
  cursor: pointer;
  font-size: 0.9rem;
  box-shadow: 0 4px 16px rgba(26, 71, 49, 0.2);
}

.nav-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(26, 71, 49, 0.3);
  background: linear-gradient(135deg, #0f2a1c 0%, #1A4731 100%);
}

.button-text {
  font-weight: 600;
}

@media (max-width: 768px) {
  .nav-container {
    padding: 0 20px;
    height: 70px;
  }
  
  .brand-text {
    display: none;
  }
  
  .brand-icon svg {
    width: 32px;
    height: 32px;
  }
  
  .nav-button {
    padding: 10px 16px;
    font-size: 0.85rem;
  }
  
  .button-text {
    display: none;
  }
}
</style>
