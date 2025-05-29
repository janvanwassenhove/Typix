<template>
  <footer class="app-footer">
    <div class="footer-container">
      <div class="footer-content">
        <div class="footer-brand">
          <div class="brand-icon">
            <svg width="28" height="28" viewBox="0 0 100 100" fill="currentColor">
              <circle cx="50" cy="50" r="45" fill="none" stroke="currentColor" stroke-width="2"/>
              <rect x="20" y="20" width="25" height="60" fill="currentColor" opacity="0.8"/>
              <rect x="55" y="35" width="25" height="45" fill="currentColor" opacity="0.6"/>
              <rect x="37.5" y="10" width="25" height="70" fill="currentColor" opacity="0.9"/>
              <circle cx="32.5" cy="15" r="3" fill="white"/>
              <circle cx="67.5" cy="30" r="3" fill="white"/>
              <circle cx="50" cy="5" r="3" fill="white"/>
            </svg>
          </div>
          <div class="brand-info">
            <div class="brand-header">
              <span class="brand-name">{{ t('app_title') }}</span>
              <span class="brand-description">Professional personality assessments to help you understand yourself better and unlock your potential.</span>
            </div>
          </div>
        </div>
      </div>
      
      <div class="footer-bottom">
        <div class="footer-divider"></div>
        <div class="footer-meta">
          <span class="footer-copyright">© 2024 {{ t('app_title') }}. All rights reserved.</span>
          <p class="mb-0">Follow mITy.John on
          <a href="https://www.instagram.com/mity.john/" class="text-white"><i class="fab fa-instagram"></i></a>&nbsp;
          <a href="https://www.linkedin.com/in/jan-van-wassenhove-9b49893/" class="text-white"><i class="fab fa-linkedin"></i></a>&nbsp;
          <a href="https://mityjohn.com/" class="text-white"><i class="fab fa-wordpress"></i></a>&nbsp;
          <a href="https://x.com/mity_john" class="text-white"><i class="fab fa-twitter"></i></a>&nbsp;
          </p>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { useTranslations } from '../composables/useTranslations'

const { t } = useTranslations()
</script>

<style scoped>
.app-footer {
  background: rgba(255, 255, 255, 0.98);
  border-top: 1px solid rgba(249, 166, 7, 0.1);
  margin-top: auto;
  padding: 10px 0 24px;
}

.footer-container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 32px;
}

.footer-content {
  display: grid;
  gap: 64px;
  margin-bottom: 10px;
}

.footer-brand {
  display: flex;
  gap: 16px;
  align-items: flex-start;
}

.brand-icon {
  color: #F9A607;
  flex-shrink: 0;
  margin-top: 4px;
}

.brand-info {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.brand-header {
  display: flex;
  align-items: baseline;
  gap: 12px;
  flex-wrap: wrap;
}

.brand-name {
  font-size: 1.5rem;
  font-weight: 800;
  color: #1A4731;
  flex-shrink: 0;
}

.brand-description {
  font-size: 0.95rem;
  color: #666;
  line-height: 1.6;
  flex: 1;
  min-width: 250px;
}

.footer-links {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 48px;
}

.link-group {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.link-title {
  font-size: 1rem;
  font-weight: 700;
  color: #1A4731;
  margin-bottom: 4px;
}

.footer-link {
  color: #666;
  text-decoration: none;
  font-size: 0.9rem;
  font-weight: 500;
  transition: all 0.3s ease;
  padding: 4px 0;
}

.footer-link:hover {
  color: #F9A607;
  transform: translateX(4px);
}

.footer-bottom {
  margin-top: 10px;
}

.footer-divider {
  height: 1px;
  background: linear-gradient(90deg, transparent, rgba(249, 166, 7, 0.2), transparent);
  margin-bottom: 24px;
}

.footer-meta {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 24px;
}

.footer-copyright {
  color: #1A4731;
  font-size: 0.9rem;
  font-weight: 500;
}

.footer-badges {
  display: flex;
  gap: 12px;
}

.badge {
  background: rgba(249, 166, 7, 0.1);
  color: #F9A607;
  padding: 6px 12px;
  border-radius: 20px;
  font-size: 0.75rem;
  font-weight: 600;
  border: 1px solid rgba(249, 166, 7, 0.2);
}

@media (max-width: 768px) {
  .app-footer {
    padding: 32px 0 20px;
  }
  
  .footer-container {
    padding: 0 20px;
  }
  
  .footer-content {
    grid-template-columns: 1fr;
    gap: 40px;
    margin-bottom: 32px;
  }
  
  .brand-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 8px;
  }
  
  .brand-description {
    min-width: unset;
  }
  
  .footer-links {
    grid-template-columns: 1fr;
    gap: 32px;
  }
  
  .footer-meta {
    flex-direction: column;
    align-items: flex-start;
    gap: 16px;
  }
  
  .footer-badges {
    flex-wrap: wrap;
  }
}
</style>
