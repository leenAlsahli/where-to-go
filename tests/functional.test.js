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

// ==========================
// Browsing Component Full Coverage
// ==========================
describe('Browsing Component - Full Coverage', () => {

  it('renders without crashing', () => {
    const wrapper = mount(Browsing, { global: { plugins: [router] } })
    expect(wrapper.exists()).toBe(true)
  })

  it('renders event cards', () => {
    const wrapper = mount(Browsing, { global: { plugins: [router] } })
    expect(wrapper.findAll('.event-card').length).toBeGreaterThan(0)
  })

  it('formatCategory returns correct values', () => {
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

  it('back arrow should exist and clickable', async () => {
    const mockRouter = { go: vi.fn() }
    const wrapper = mount(Browsing, {
      global: { mocks: { $router: mockRouter } }
    })
    const backArrow = wrapper.find('.back-arrow')
    expect(backArrow.exists()).toBe(true)
    await backArrow.trigger('click')
    expect(mockRouter.go).toHaveBeenCalledWith(-1)
  })

  it('goToDetails calls router.push with correct params', () => {
    const mockRouter = { push: vi.fn() }
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
})

// ==========================
// HeaderBar Component Full Coverage
// ==========================
describe('HeaderBar.vue - Full Coverage', () => {

  it('renders without crashing', () => {
    const wrapper = mount(HeaderBar, { global: { plugins: [router] } })
    expect(wrapper.exists()).toBe(true)
  })

  it('displays logo', () => {
    const wrapper = mount(HeaderBar, { global: { plugins: [router] } })
    expect(wrapper.find('.logo').exists()).toBe(true)
  })

  it('renders nav items', () => {
    const wrapper = mount(HeaderBar, { global: { plugins: [router] } })
    expect(wrapper.findAll('.nav-item').length).toBeGreaterThan(0)
  })

  it('nav items trigger navigation', async () => {
    mockPush.mockClear()
    const wrapper = mount(HeaderBar, { global: { plugins: [router] } })
    const navItems = wrapper.findAll('.nav-item')
    for (const item of navItems) {
      await item.trigger('click')
    }
    expect(mockPush).toHaveBeenCalled()
  })

  it('profile icon navigates to profile', async () => {
    mockPush.mockClear()
    const wrapper = mount(HeaderBar, { global: { plugins: [router] } })
    const profile = wrapper.find('.profile')
    await profile.trigger('click')
    expect(mockPush).toHaveBeenCalledWith('/profile')
  })

  it('reacts to mood prop', () => {
    const wrapper = mount(HeaderBar, { 
      props: { mood: 'dark' },
      global: { plugins: [router] }
    })
    expect(wrapper.classes()).toContain('dark')
  })
})
 