import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import Browsing from '../src/components/pages/Browsing.vue'

describe('Browsing Component - Non-Functional Checks', () => {

  // 1️⃣ Performance: Render time
  it('renders within acceptable time', async () => {
    const start = performance.now()
    const wrapper = mount(Browsing)
    const end = performance.now()
    const renderTime = end - start
    console.log('Render time:', renderTime, 'ms')
    expect(renderTime).toBeLessThan(200) // أقل من 200ms كمثال
  })

  // 2️⃣ Accessibility: alt و aria-label
  it('has proper accessibility attributes', () => {
    const wrapper = mount(Browsing)
    wrapper.findAll('img').forEach(img => {
      expect(img.attributes('alt')).toBeTruthy() // كل الصور لها alt
    })
    wrapper.findAll('button').forEach(btn => {
      expect(btn.attributes('aria-label')).toBeTruthy() // كل الأزرار لها aria-label
    })
  })

  // 3️⃣ Stability: يعمل بدون crash مع props فارغة
  it('does not crash with empty props', () => {
    const wrapper = mount(Browsing, {
      props: { items: [] } // تمرير بيانات فارغة
    })
    expect(wrapper.exists()).toBe(true)
  })

})
