<template>
  <div class="language-selector">
    <select 
      v-model="selectedLanguage" 
      @change="changeLanguage"
      class="language-select"
    >
      <option value="en">🇺🇸 English</option>
      <option value="es">🇪🇸 Español</option>
      <option value="fr">🇫🇷 Français</option>
      <option value="de">🇩🇪 Deutsch</option>
      <option value="nl">🇳🇱 Nederlands</option>
    </select>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const emit = defineEmits<{
  'language-changed': [language: string]
}>()

const selectedLanguage = ref('en')

const changeLanguage = () => {
  emit('language-changed', selectedLanguage.value)
}
</script>

<style scoped>
.language-selector {
  position: relative;
}

.language-select {
  background: white;
  border: 2px solid #e9ecef;
  border-radius: 8px;
  padding: 8px 12px;
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.3s ease;
  min-width: 140px;
}

.language-select:hover {
  border-color: #667eea;
}

.language-select:focus {
  outline: none;
  border-color: #667eea;
  box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
}

@media (max-width: 768px) {
  .language-select {
    font-size: 0.8rem;
    padding: 6px 10px;
    min-width: 120px;
  }
}
</style>
