import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import Browsing from '../src/components/pages/Browsing.vue'
import HeaderBar from '../src/components/common/HeaderBar.vue'
import { createRouter, createWebHistory } from 'vue-router'

// ==========================
// إعداد Router وهمي (ضروري لإرضاء المكونات التي تتطلب Router)
// ==========================
const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/profile', name: 'Profile' },
    { path: '/browsing', name: 'Browsing' },
    // ...
  ],
})

// ==========================
// Browsing Component - Non-Functional Checks
// ==========================
describe('Browsing Component - Non-Functional Checks (Performance, Robustness)', () => {

  // Test 1: Performance (Rendering Time)
  it('renders within acceptable time (< 200ms)', async () => {
    const start = performance.now()
    mount(Browsing, { global: { plugins: [router] } }) 
    const end = performance.now()
    const renderTime = end - start
    expect(renderTime).toBeLessThan(200) 
  })

  // Test 2: Robustness (No Crash with Empty Data) - تحذير الـ extraneous props مقبول هنا
  it('does not crash with empty items data', () => {
    const wrapper = mount(Browsing, {
      props: { items: [] }, 
      global: { plugins: [router] } 
    })
    expect(wrapper.exists()).toBe(true)
  })

  // Test 3: Accessibility (ARIA/ALT attributes)
  it('has proper accessibility attributes', () => {
    const wrapper = mount(Browsing)
    wrapper.findAll('img').forEach(img => {
      expect(img.attributes('alt')).toBeTruthy() 
    })
    wrapper.findAll('button').forEach(btn => {
      expect(btn.attributes('aria-label')).toBeTruthy() 
    })
  })
})

// ==========================
// HeaderBar Component - Non-Functional Checks (Mood Prop)
// ==========================
describe('HeaderBar.vue - Non-Functional Checks (Mood Prop)', () => {
  
  // Test 4: Usability/Style - تحقق من الوضع الداكن
  it('renders in dark mode when mood prop is dark', () => {
    const wrapper = mount(HeaderBar, { 
      props: { mood: 'dark' },
      global: { plugins: [router] } 
    })
    expect(wrapper.classes()).toContain('dark')
  })
  
  // Test 5: Usability/Style - تحقق من الوضع الافتراضي/الفاتح
  it('renders in light mode when mood prop is not dark or absent', () => {
    // حالة عدم تمرير الخاصية
    const wrapperDefault = mount(HeaderBar, { global: { plugins: [router] } }) 
    expect(wrapperDefault.classes()).not.toContain('dark')
    
    // حالة تمرير قيمة أخرى
    const wrapperLight = mount(HeaderBar, { 
      props: { mood: 'light' },
      global: { plugins: [router] } 
    })
    expect(wrapperLight.classes()).not.toContain('dark')
  })
})