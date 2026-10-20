import DefaultTheme from 'vitepress/theme'
import type { Theme } from 'vitepress'
import { h } from 'vue'
import './custom.css'

import BrandCard from './components/BrandCard.vue'
import PromoCard from './components/PromoCard.vue'
import NextStep from './components/NextStep.vue'
import ComparisonTable from './components/ComparisonTable.vue'
import DecisionTree from './components/DecisionTree.vue'
import MetricChart from './components/MetricChart.vue'
import AffiliateNotice from './components/AffiliateNotice.vue'
import AuthorByline from './components/AuthorByline.vue'

export default {
  extends: DefaultTheme,
  Layout() {
    return h(DefaultTheme.Layout, null, {
      'doc-before': () => h(AuthorByline)
    })
  },
  enhanceApp({ app }) {
    app.component('BrandCard', BrandCard)
    app.component('PromoCard', PromoCard)
    app.component('NextStep', NextStep)
    app.component('ComparisonTable', ComparisonTable)
    app.component('DecisionTree', DecisionTree)
    app.component('MetricChart', MetricChart)
    app.component('AffiliateNotice', AffiliateNotice)
    app.component('AuthorByline', AuthorByline)
  }
} satisfies Theme
