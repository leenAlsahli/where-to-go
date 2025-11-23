<template>
  <div class="browse-wrapper" :class="mood">
    <HeaderBar @toggle-search="showSearch = !showSearch"/>

    <swiper
      :modules="modules"
      :slides-per-view="1"
      :loop="true"
      navigation
      class="home-slider"
    >
      <swiper-slide v-for="(slide, index) in slides" :key="index">
        <img :src="slide" alt="slide image" class="slide-image" />
      </swiper-slide>
    </swiper>

    <div class="event-categories">
      <div class="category" v-for="item in categories" :key="item.name">
        <img :src="item.icon" alt="" class="category-icon" />
        <div class="category-name">{{ item.name }}</div>
        <div v-if="item.new" class="new-badge">new</div>
      </div>
    </div>

    <!-- البحث: يظهر متحرك فوق الفلترة -->
    <transition name="slide-down">
      <div v-if="showSearch" class="search-container">
        <input
          type="text"
          v-model="searchQuery"
          placeholder="Search events..."
          class="search-input"
        />
        <p v-if="searchQuery && filteredEvents.length === 0" class="no-events">
          Sorry, no events match your search
        </p>
      </div>
    </transition>

    <!-- الفلترة -->
    <div class="filters">
      <label for="mood-filter">Filter by Mood:</label>
      <select id="mood-filter" v-model="selectedMood">
        <option value="">All</option>
        <option value="happy">Happy</option>
        <option value="sad">Sad</option>
        <option value="stressed">Stressed</option>
        <option value="neutral">Neutral</option>
        <option value="calm">Calm</option>
        <option value="hungry">Hungry</option>
        <option value="adventure">Adventure</option>
      </select>
    </div>

    <!-- شبكة الأحداث -->
    <section class="events-grid">
      <div class="event-card" v-for="event in filteredEvents" :key="event.id">
        <img :src="event.image" :alt="event.title" class="event-image" />
        <div class="event-details">
          <h3>{{ event.title }}</h3>
          <p>{{ event.description }}</p>
          <button class="explore-btn" @click="goToDetails(event)">Explore</button>
        </div>
      </div>
    </section>

  </div>
</template>

<script>
import { Swiper, SwiperSlide } from 'swiper/vue';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';

import slide1 from '@/assets/slide1.png';
import slide2 from '@/assets/slide2.png';
import slide3 from '@/assets/slide3.png';
import slide4 from '@/assets/slide4.png';
import slide5 from '@/assets/slide5.png';
import misk from '@/assets/misk.png';
import HeaderBar from '@/components/common/HeaderBar.vue';
import food from '@/assets/food.png';
import camel from '@/assets/camel.png';
import yoga from '@/assets/yoga.png';
import alula from '@/assets/ola.png';
import p from '@/assets/po.png';
import j from '@/assets/ju.png';
import u from '@/assets/uu.png';
import d from '@/assets/x.png';
import o from '@/assets/osos.png';
import s from '@/assets/ss.png';


export default {
  components: {
    Swiper,
    SwiperSlide,
    HeaderBar
  },
  setup() {
    return {
      modules: [Navigation]
    };
  },
  data() {
    return {
      mood: '',
      selectedMood: '',
         searchQuery: '',
    showSearch: false,
      slides: [slide1, slide2, slide3, slide4, slide5],
      events: [
        {
          id: 1,
          title: "Camel Riding Adventures",
          description: "Discover the rich tradition of camel riding in Saudi Arabia",
          image: camel,
          mood: 'adventure'
        },
        {
          id: 2,
          title: "Misk Art Week",
          description: "Explore contemporary works from emerging artists.",
          image: misk,
          mood: 'calm'
        },
        {
          id: 3,
          title: "Food Festival",
          description: "Taste dishes from the top local chefs and kitchens.",
          image: food,
          mood: 'hungry'
        },
        {
          id: 4,
          title: "Discover Alula",
          description: "Discover Alula’s Best Attractions",
          image: alula,
          mood: 'adventure'
        },
        {
          id: 5,
          title: "Yoga Session",
          description: "Relaxing and meditative",
          image: yoga ,
          mood: 'stressed'
        },
        {
          id: 6,
          title: "Poetry Night",
          description: "A calm night of reflection",
          image: p ,
          mood: 'sad'
        },
        {
          id: 7,
          title: "Jump in AlUla",
          description: "Desert adventures in the heart of AlUla.",
          image: j ,
          mood: 'happy'
        },
        {
          id: 8,
          title: "Red Sea Serenity Escape",
          description: "Unwind at a luxurious overwater villa in the Red Sea.",
          image: u ,
          mood: 'neutral'
        },{
  id: 9,
  title: "Sunset Camel Trek",
  description: "Ride into the golden dunes as the sun sets behind the desert hills.",
  image: camel ,
  mood: 'adventure'
},
{
  id: 10,
  title: "Desert Art Walk",
  description: "Experience local and international art in an open desert gallery.",
  image: s ,
  mood: 'calm'
},
{
  id: 11,
  title: "Taste of Arabia",
  description: "Enjoy authentic Saudi flavors in a live cooking festival.",
  image: o ,
  mood: 'hungry'
},
{
  id: 12,
  title: "Hidden Gems of AlUla",
  description: "Explore lesser-known marvels in the breathtaking AlUla region.",
  image: p ,
  mood: 'adventure'
},
{
  id: 13,
  title: "Sunrise Yoga in the Canyons",
  description: "Rejuvenate with early morning stretches surrounded by nature.",
  image: p ,
  mood: 'stressed'
},
{
  id: 14,
  title: "Soulful Evenings",
  description: "Relax with soft poetry and oud music under the stars.",
  image: d ,
  mood: 'sad'
},
{
  id: 15,
  title: "Festive Air Balloon Ride",
  description: "Soar over AlUla with a balloon ride and sweeping desert views.",
  image: s ,
  mood: 'happy'
},
{
  id: 16,
  title: "Blue Horizon Escape",
  description: "Dive into tranquility with a private villa stay by the Red Sea.",
  image: u ,
  mood: 'neutral'
}

      ],
    categories: [

  { id: 2, name: '', icon: new URL('@/assets/sh.png', import.meta.url).href, route: '/store' },
  { id: 3, name: '', icon: new URL('@/assets/fo.png', import.meta.url).href, route: '/auctions' },
  { id: 4, name: '', icon: new URL('@/assets/vi.png', import.meta.url).href, route: '/store' },
  { id: 5, name: '', icon: new URL('@/assets/sp.png', import.meta.url).href, route: '/auctions' },
  { id: 6, name: '', icon: new URL('@/assets/bo.png', import.meta.url).href, route: '/store' }
]

    };
  },
  computed: {
   filteredEvents() {
    let events = this.events;

    if (this.selectedMood) {
      events = events.filter(event => event.mood === this.selectedMood);
    }

    if (this.searchQuery) {
      const q = this.searchQuery.toLowerCase();
      events = events.filter(event =>
        event.title.toLowerCase().includes(q) ||
        event.description.toLowerCase().includes(q)
      );
    }

    return events;
  }

  },
  methods: {
  goToDetails(event) {
    this.$router.push({
      name: 'EventDetails',
      params: { id: event.id },
      query: { data: JSON.stringify(event) }
    });
  },fetchEvents() {
    fetch('http://localhost:3000/events')
      .then(res => res.json())
      .then(data => {
        this.events = [...this.events, ...data];
      })
      .catch(err => {
        console.error('Failed to fetch events. Using only local data.', err);
      });
  },
}
,
  created() {
    const savedMood = sessionStorage.getItem('userMood');
  if (savedMood) this.mood = savedMood;

  this.fetchEvents();
  }
};
</script>




<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Tajawal:wght@400;700&display=swap');

.browse-wrapper {
  min-height: 100vh;
  padding-bottom: 60px;
  font-family: 'Tajawal', sans-serif;
  color: #ffffff;
  transition: background 0.3s ease;
}

.browse-wrapper.happy {
  background: linear-gradient(to right, #74ebd5, #ACB6E5);
}
.browse-wrapper.sad {
  background: linear-gradient(to right, #bdc3c7, #2c3e50);
}
.browse-wrapper.stressed {
  background: linear-gradient(to right, #5f4c67, #8e9eab);
}
.browse-wrapper.neutral {
  background: #0e1a28;
}

.home-slider {
  width: 100%;
  height: 300px;
  margin-bottom: 40px;
}

.slide-image {
  width: 100%;
  height: 300px;
  object-fit: cover;
  border-radius: 18px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.25);
}

.browse-header {
  text-align: center;
  margin-bottom: 50px;
}

.browse-header h1 {
  font-size: 36px;
  margin-bottom: 10px;
}

.browse-header p {
  font-size: 18px;
  opacity: 0.9;
}

.events-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 30px;
  padding: 0 20px;
}

.event-card {
  background: rgba(255, 255, 255, 0.1);
  border-radius: 16px;
  overflow: hidden;
  backdrop-filter: blur(10px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
  transition: transform 0.3s ease;
}

.event-card:hover {
  transform: translateY(-5px);
}

.event-image {
  width: 100%;
  height: 180px;
  object-fit: cover;
}

.event-details {
  padding: 20px;
}

.event-details h3 {
  margin: 0 0 10px;
  font-size: 20px;
}

.event-details p {
  font-size: 14px;
  opacity: 0.85;
}

.explore-btn {
  margin-top: 15px;
  background: #ffffff;
  color: #1c1c1c;
  padding: 10px 20px;
  border: none;
  border-radius: 12px;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s ease;
}

.explore-btn:hover {
  background: #e0e0e0;
}
/* Mood-based text color override */
.browse-wrapper.Light {
  color: #4e433f;
}

.browse-wrapper.Light .browse-header h1,
.browse-wrapper.Light .browse-header p,
.browse-wrapper.Light .event-details h3,
.browse-wrapper.Light .event-details p,
.browse-wrapper.Light .explore-btn {
  color: #4e433f;
}
/* Light mood beige styling */
.browse-wrapper.Light {
  color: #e8e1db;
}

.browse-wrapper.Light .browse-header h1,
.browse-wrapper.Light .browse-header p,
.browse-wrapper.Light .event-details h3,
.browse-wrapper.Light .event-details p {
  color:rgb(152, 133, 117);
}

/* Button also beige background with contrast text */
.browse-wrapper.Light .explore-btn {
  background-color:rgb(164, 151, 140);
  color: #1c1c1c;
}

.browse-wrapper.Light .explore-btn:hover {
  background-color:#b0a49c;
}


.browse-wrapper.Light {
  background: white;
  color: #988575; /* beige text */
}

.browse-wrapper.Dark {
  background: #2c2c2c;
  color: white;
}

.browse-wrapper.neutral {
  background: #e9f0ea;
  color: #1e2a22;
}
.browse-wrapper.Light .browse-header h1,
.browse-wrapper.Light .browse-header p,
.browse-wrapper.Light .event-details h3,
.browse-wrapper.Light .event-details p {
  color: #988575;
}

.browse-wrapper.Dark .browse-header h1,
.browse-wrapper.Dark .browse-header p,
.browse-wrapper.Dark .event-details h3,
.browse-wrapper.Dark .event-details p {
  color: white;
}

.browse-wrapper.neutral .browse-header h1,
.browse-wrapper.neutral .browse-header p,
.browse-wrapper.neutral .event-details h3,
.browse-wrapper.neutral .event-details p {
  color: #1e2a22;
}

.filters {
  margin-bottom: 20px;
}

.category-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 24px;
  justify-content: center;
  margin-top: 40px;
}

.category-card {
  width: 100px;
  height: 100px;
  background: rgba(255,255,255,0.1);
  backdrop-filter: blur(8px);
  border-radius: 14px;
  text-align: center;
  padding: 16px;
  cursor: pointer;
  color: white;
  transition: transform 0.2s ease;
}

.category-card:hover {
  transform: translateY(-5px);
}

.category-card i {
  font-size: 24px;
  margin-bottom: 8px;
}
.category-bar {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 30px;
  padding: 20px 0;
  background-color: rgba(0, 0, 0, 0.3); /* شفاف مع تأثير فيديو */
  backdrop-filter: blur(10px);
  position: sticky;
  top: 0;
  z-index: 10;
}

.category-icon {
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
  color: white;
  transition: transform 0.2s ease, color 0.2s ease;
}

.category-icon i {
  font-size: 24px;
  margin-bottom: 5px;
}

.category-icon span {
  font-size: 12px;
  font-weight: 500;
}

.category-icon:hover {
  transform: scale(1.1);
  color: #ffd700; /* لون مميز عند التمرير */
}

.event-categories {
  display: flex;
  flex-wrap: wrap;
  gap: 30px;
  justify-content: center;
  background: #111;
  padding: 30px;
  border-radius: 12px;
  color: white;
}

.category {
  text-align: center;
  width: 80px;
  position: relative;
}

.category-icon {
  width: 40px;
  height: 40px;
  margin-bottom: 10px;
}

.category-name {
  font-size: 14px;
}

.new-badge {
  color:rgb(255, 255, 255);
  font-size: 12px;
  position: absolute;
  bottom: -18px;
  left: 0;
  right: 0;
}

.event-categories {
  display: flex;
  flex-wrap: wrap;
  gap: 30px;
  justify-content: center;
  background: white; /* ← الخلفية بيضاء */
  padding: 30px;
  border-radius: 12px;
  color: #333; /* ← لون النص مناسب للأبيض */
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08); /* إضافة ظل خفيف */
}

.category {
  text-align: center;
  width: 80px;
  position: relative;
}

.category-icon {
  width: 40px;
  height: 40px;
  margin-bottom: 10px;
}

.category-name {
  font-size: 14px;
}

.new-badge {
  color: #ff0050;
  font-size: 12px;
  position: absolute;
  bottom: -18px;
  left: 0;
  right: 0;
}
.filters {
  margin: 20px;
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 16px;
  font-weight: bold;
}

.filters select {
  padding: 8px 12px;
  border-radius: 8px;
  border: 1px solid #ccc;
}
.category-icon {
  width: 80px;
  height: 80px;
  margin-bottom: 10px;
}
.search-bar {
  text-align: center;
  margin: 20px;
}
.search-input {
  width: 60%;
  padding: 10px 14px;
  border: 1px solid #ccc;
  border-radius: 10px;
  font-size: 16px;
  font-family: 'Tajawal', sans-serif;
}





.search-overlay {
  position: absolute; /* يطفو فوق المحتوى */
  top: 100px; /* اضبط حسب مكان الفلتر */
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  background: rgba(255,255,255,0.95); /* خلفية شفافة قليلاً */
  padding: 20px 30px;
  border-radius: 12px;
  box-shadow: 0 8px 24px rgba(0,0,0,0.2);
  z-index: 50;
}

.search-input {
  width: 400px; /* ثابت */
  padding: 12px 16px;
  font-size: 18px;
  border-radius: 12px;
  border: 1px solid #ccc;
  text-align: center;
}

.no-events {
  margin-top: 15px;
  font-size: 20px;
  font-weight: bold;
  color: #ff0050;
  text-align: center;
}

/* الحركة: البحث ينزل فجأة */
.slide-down-enter-active {
  transition: all 0.3s ease;
}
.slide-down-leave-active {
  transition: all 0.2s ease;
}
.slide-down-enter-from {
  transform: translateY(-50px);
  opacity: 0;
}
.slide-down-enter-to {
  transform: translateY(0);
  opacity: 1;
}
.slide-down-leave-from {
  transform: translateY(0);
  opacity: 1;
}
.slide-down-leave-to {
  transform: translateY(-50px);
  opacity: 0;
}

/* شكل البحث */
.search-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 20px 0;
}

.search-input {
  width: 60%;
  padding: 12px 16px;
  font-size: 18px;
  border-radius: 10px;
  border: 1px solid #ccc;
  text-align: center;
}

.no-events {
  margin-top: 10px;
  font-size: 18px;
  font-weight: bold;
  color: #8B1E3F; /* عنابي غامق */  text-align: center;
}

</style>