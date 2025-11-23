<template>
<div class="back-arrow" @click="goBack">←</div>

  <div class="browsing-wrapper" :class="mood">



    <div v-for="(events, category) in categorizedEvents" :key="category" class="category-section">
      <h2 class="category-title">{{ formatCategory(category) }}</h2>
      <div class="event-list">
      <div 
  class="event-card" 
  v-for="(event, index) in events" 
  :key="index" 
  @click="goToDetails(event)"
>
  <img :src="event.image" alt="event image" class="event-image" />
  <div class="event-info">
    <h3>{{ event.title }}</h3>
    <p>{{ event.description }}</p>
  </div>
</div>

      </div>
    </div>
  </div>
</template>

<script>
import HeaderBar from '@/components/common/HeaderBar.vue';

import food from '@/assets/food.png';
import p from '@/assets/po.png';
import camel from '@/assets/camel.png';
import misk from '@/assets/misk.png';
import j from '@/assets/ju.png';
import s from '@/assets/ss.png';

export default {
  name: 'Browsing',
  components: {
    HeaderBar
  },
  data() {
    return {
      mood: sessionStorage.getItem('userMood') || 'Light',
      categorizedEvents: {
        food: [
          { title: 'Taste of Arabia', description: 'Authentic Saudi flavors...', image: food },
          { title: 'Food Festival', description: 'Local chefs and dishes...', image: food }
        ],
        art: [
          { title: 'Misk Art Week', description: 'Modern art exhibits', image: misk },
          { title: 'Desert Art Walk', description: 'Art in the open desert', image: s }
        ],
        adventure: [
          { title: 'Camel Riding Adventures', description: 'Desert fun', image: camel },
          { title: 'Jump in AlUla', description: 'Adrenaline experience', image: j }
        ],
        poetry: [
          { title: 'Poetry Night', description: 'Oud & words under stars', image: p }
        ]
      }
    };
  },
  methods: {
    goToDetails(event) {
      this.$router.push({ name: 'EventDetails', params: { id: event.id }, query: { data: JSON.stringify(event) } });
    },
    formatCategory(key) {
      const map = {
        food: " Food & Dining",
        art: " Art & Culture",
        adventure: " Adventure",
        poetry: " Poetry & Music"
      };
      return map[key] || key;
    },
    goBack() {
    this.$router.go(-1); 
  }
  }
};
</script>


<style scoped>
.browsing-wrapper {
  min-height: 100vh;
  padding: 40px 20px;
  font-family: 'Tajawal', sans-serif;
  transition: background 0.3s ease;
}

.browsing-wrapper.Light {
  background: white;
  color: #4e433f;
}
.browsing-wrapper.Dark {
  background: #1e1e1e;
  color: white;
}
.browsing-wrapper.Natural {
  background: #e9f0ea;
  color: #1e2a22;
}

.category-section {
  margin-bottom: 50px;
}

.category-title {
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 16px;
  padding-left: 10px;
  color: #8b5e3c;
}
.event-list {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: center;
}.event-card {
  width: 250px;
  background: rgba(255,255,255,0.1);
  border-radius: 12px;
  overflow: hidden;
  cursor: pointer;
  transition: transform 0.3s ease;
  box-shadow: 0 4px 14px rgba(0,0,0,0.1);
  backdrop-filter: blur(10px);
}

.event-card:hover {
  transform: translateY(-6px);
}

.event-image {
  width: 100%;
  height: 160px;
  object-fit: cover;
}

.event-info {
  padding: 16px;
}

.event-info h3 {
  margin: 0 0 8px;
  font-size: 18px;
  color: inherit;
}

.event-info p {
  font-size: 14px;
  opacity: 0.8;
}
.back-arrow {
  position: absolute;
  top: 30px;
  left: 30px;
  font-size: 26px;
  color: #8b5e3c;
  cursor: pointer;
  font-weight: bold;
  transition: transform 0.2s ease;
}
.back-arrow:hover {
  transform: scale(1.2);
}

</style>
