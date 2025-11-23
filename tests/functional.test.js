import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'

// ==========================
// Browsing Component Tests
// ==========================
import Browsing from '../src/components/pages/Browsing.vue'

describe('Browsing Component Tests', () => {

  it('should render Browsing component without crashing', () => {
    const wrapper = mount(Browsing)
    expect(wrapper.exists()).toBe(true)
  })

  it('should render Event Cards', () => {
    const wrapper = mount(Browsing)
    expect(wrapper.findAll('.event-card').length).toBeGreaterThan(0)
  })

  it('back arrow should exist and clickable', async () => {
    const mockRouter = { go: vi.fn() }
    const wrapper = mount(Browsing, {
      global: {
        mocks: { $router: mockRouter }
      }
    })
    const backArrow = wrapper.find('.back-arrow')
    expect(backArrow.exists()).toBe(true)
    await backArrow.trigger('click')
    expect(mockRouter.go).toHaveBeenCalledWith(-1)
  })

  it('formatCategory returns correct titles', () => {
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

  it('goToDetails calls router.push with correct params', () => {
    const mockRouter = { push: vi.fn() }
    const wrapper = mount(Browsing, {
      global: {
        mocks: { $router: mockRouter }
      }
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
// HeaderBar Component Tests
// ==========================
import HeaderBar from '../src/components/common/HeaderBar.vue'

describe('HeaderBar.vue', () => {
  it('renders properly', () => {
    const wrapper = mount(HeaderBar)
    expect(wrapper.exists()).toBe(true)
  })

  it('has a logo', () => {
    const wrapper = mount(HeaderBar)
    expect(wrapper.find('img').exists()).toBe(true)
  })
})
