<template>
  <div id="app">
    <NavigationMenu @language-changed="handleLanguageChange" />
    <main class="main-content">
      <router-view />
    </main>
    <AppFooter />
  </div>
</template>

<script setup lang="ts">
import { provide, ref } from 'vue'
import NavigationMenu from './components/NavigationMenu.vue'
import AppFooter from './components/AppFooter.vue'

const currentLanguage = ref('en')

const handleLanguageChange = (language: string) => {
  currentLanguage.value = language
}

provide('currentLanguage', currentLanguage)
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: 'Inter', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  background: #1A4731;
  min-height: 100vh;
  margin: 0;
  display: block;
  min-width: 320px;
}

#app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background: rgba(255, 255, 255, 0.98);
  backdrop-filter: blur(20px);
  max-width: 1400px;
  margin: 0 auto;
  box-shadow: 0 0 0 100vw #1A4731;
  clip-path: inset(0 -100vw);
  text-align: left;
}

.main-content {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 40px 20px;
  min-height: calc(100vh - 140px);
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 1;
}

.card {
  background: white;
  border-radius: 24px;
  padding: 48px;
  box-shadow: 0 32px 64px rgba(0, 0, 0, 0.12);
  width: 100%;
  max-width: 1000px;
  border: 1px solid rgba(249, 166, 7, 0.1);
}

.btn {
  padding: 16px 32px;
  border: none;
  border-radius: 12px;
  font-size: 16px;
  font-weight: 600;
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
  box-shadow: 0 8px 32px rgba(249, 166, 7, 0.3);
}

.btn-primary:hover {
  transform: translateY(-4px) scale(1.02);
  box-shadow: 0 16px 48px rgba(249, 166, 7, 0.4);
}

.btn-secondary {
  background: white;
  color: #1A4731;
  border: 2px solid #F9A607;
  box-shadow: 0 4px 16px rgba(26, 71, 49, 0.1);
}

.btn-secondary:hover {
  background: #F9A607;
  color: white;
  transform: translateY(-2px);
  box-shadow: 0 12px 32px rgba(249, 166, 7, 0.3);
}

@media (max-width: 768px) {
  .container {
    padding: 20px 15px;
    min-height: calc(100vh - 120px);
  }
  
  .card {
    padding: 32px 24px;
    border-radius: 20px;
  }
}
</style>
