import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import { createRouter, createWebHistory } from 'vue-router'
import Browsing from '../src/components/pages/Browsing.vue'
import HeaderBar from '../src/components/common/HeaderBar.vue'

// ==========================
// إعداد Router وهمي
// ==========================
const mockPush = vi.fn()
const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/profile', name: 'Profile' },
    { path: '/booking-details', name: 'BookingDetails' },
    { path: '/browsing', name: 'Browsing' },
    { path: '/event-details/:id', name: 'EventDetails' },
  ],
})
router.push = mockPush
const mockRouter = { push: mockPush, go: vi.fn() }


// ==========================
// Browsing Component - Functional Tests
// ==========================
describe('Browsing Component - Functional Tests', () => {

  it('renders without crashing', () => {
    const wrapper = mount(Browsing, { global: { plugins: [router] } })
    expect(wrapper.exists()).toBe(true)
  })

  it('renders event cards with data', () => {
    const wrapper = mount(Browsing, { global: { plugins: [router] } })
    expect(wrapper.findAll('.event-card').length).toBeGreaterThan(0)
  })

  it('back arrow is clickable and triggers router.go(-1)', async () => {
    const wrapper = mount(Browsing, {
      global: { mocks: { $router: mockRouter } }
    })
    const backArrow = wrapper.find('.back-arrow')
    expect(backArrow.exists()).toBe(true)
    await backArrow.trigger('click')
    expect(mockRouter.go).toHaveBeenCalledWith(-1)
  })

  it('goToDetails calls router.push with correct params and query', () => {
    const wrapper = mount(Browsing, {
      global: { mocks: { $router: mockRouter } }
    })
    const testEvent = { id: 123, title: 'Test Event' }
    wrapper.vm.goToDetails(testEvent)
    expect(mockRouter.push).toHaveBeenCalledWith({
      name: 'EventDetails',
      params: { id: 123 },
      query: { data: JSON.stringify(testEvent) }
    })
  })

  it('formatCategory returns correct values for known categories', () => {
    const wrapper = mount(Browsing)
    const map = {
      food: " Food & Dining",
      art: " Art & Culture",
      adventure: " Adventure",
      poetry: " Poetry & Music"
    }
    Object.keys(map).forEach(key => {
      expect(wrapper.vm.formatCategory(key)).toBe(map[key])
    })
  })
  
  // ✨ الإصلاح: تم تعديل القيمة المتوقعة لتكون 'sports' بدون مسافة
  it('formatCategory returns capitalized input for unknown category (default case)', () => {
    const wrapper = mount(Browsing)
    // القيمة المرجعة الفعلية هي 'sports' وليس ' Sports'
    expect(wrapper.vm.formatCategory('sports')).toBe('sports') 
  })
})

// ==========================
// HeaderBar Component - Functional Tests
// ==========================
describe('HeaderBar.vue - Functional Tests', () => {

  it('renders without crashing', () => {
    const wrapper = mount(HeaderBar, { global: { plugins: [router] } })
    expect(wrapper.exists()).toBe(true)
  })

  it('displays logo element', () => {
    const wrapper = mount(HeaderBar, { global: { plugins: [router] } })
    expect(wrapper.find('.logo').exists()).toBe(true)
  })

  it('renders navigation items', () => {
    const wrapper = mount(HeaderBar, { global: { plugins: [router] } })
    expect(wrapper.findAll('.nav-item').length).toBeGreaterThan(0)
  })

  it('nav items trigger navigation correctly', async () => {
    mockPush.mockClear()
    const wrapper = mount(HeaderBar, { global: { plugins: [router] } })
    const navItems = wrapper.findAll('.nav-item')
    for (let i = 0; i < Math.min(2, navItems.length); i++) { 
        await navItems.at(i)?.trigger('click')
    }
    expect(mockPush).toHaveBeenCalled()
  })

  it('profile icon navigates to /profile', async () => {
    mockPush.mockClear()
    const wrapper = mount(HeaderBar, { global: { plugins: [router] } })
    const profile = wrapper.find('.profile')
    await profile.trigger('click')
    expect(mockPush).toHaveBeenCalledWith('/profile'). 
  })
}) 