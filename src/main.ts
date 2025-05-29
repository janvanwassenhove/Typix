import { createApp } from 'vue'
import { createRouter, createWebHashHistory } from 'vue-router'
import App from './App.vue'
import HomePage from './views/HomePage.vue'
import SurveyWizard from './views/SurveyWizard.vue'
import SurveyReport from './views/SurveyReport.vue'
import './style.css'

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: HomePage
    },
    {
      path: '/survey/:type',
      name: 'Survey',
      component: SurveyWizard,
      props: true
    },
    {
      path: '/report/:type',
      name: 'Report',
      component: SurveyReport,
      props: true
    }
  ]
})

const app = createApp(App)
app.use(router)
app.mount('#app')
