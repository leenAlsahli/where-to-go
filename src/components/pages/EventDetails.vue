<template>
<div class="back-arrow" @click="goBack">
  ←
</div>
<div class="event-info">
  
    <h1>
    {{ event.title }}
    <span 
      class="favorite-icon" 
      :class="{ active: isFavorite }" 
      @click="toggleFavorite"
    ></span>
  </h1>
</div>



  <div class="event-details-wrapper">
    <img :src="event.image" alt="event image" class="event-banner" />
    <div class="event-info">
      <h1>{{ event.title }}</h1>
      <p class="description">{{ event.description }}</p>

      <div class="extra-details">
        <p><strong>Location:</strong> {{ event.city }}</p>
        <p><strong>Time:</strong> {{ event.time }}</p>
        <p><strong>Organizer:</strong> {{ event.organizer }}</p>
      </div>

      <div class="rating">
        <p><strong>Rating:</strong>
          <span v-for="n in 5" :key="n">
            <i class="star" :class="{ filled: n <= event.rating }">★</i>
          </span>
        </p>
      </div>
<div class="add-to-favorites" @click="toggleFavorite">
  <span :class="{ 'heart': true, 'active': isFavorite }">♥</span>
  <span class="fav-text">{{ isFavorite ? 'Added to Favorites' : 'Add to Favorites' }}</span>
</div>

<button class="book-btn" @click="goToBooking">Book Now</button>

      <div class="reviews">
        <h3>Reviews</h3>
        <ul>
          <li v-for="(review, index) in event.reviews" :key="index">
            <strong>{{ review.user }}:</strong> {{ review.comment }}
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      isFavorite: false, // <== حالة القلب (مفعل أو لا)
      event: JSON.parse(this.$route.query.data),
      defaultDetails: {
        // ... بيانات الفعاليات مثل ما هي عندك
      }
    };
  },
  created() {
    const defaults = this.defaultDetails[this.event.title];
    if (defaults) {
      this.event.city = defaults.city;
      this.event.time = defaults.time;
      this.event.organizer = defaults.organizer;
      this.event.rating = defaults.rating;
      this.event.reviews = defaults.reviews;
    }
  },
  methods: {
    goToBooking() {
      this.$router.push({
        name: 'Booked',
        query: {
          title: this.event.title,
          time: this.event.time,
          city: this.event.city
        }
      });
    },
    goBack() {
      this.$router.push('/home');
    },
    toggleFavorite() {
      this.isFavorite = !this.isFavorite;
      
    }
  }
};
</script>


<style scoped>
.event-details-wrapper {
  max-width: 900px;
  margin: auto;
  padding: 30px;
  font-family: 'Tajawal', sans-serif;
}
.event-banner {
  width: 100%;
  height: 400px;
  object-fit: cover;
  border-radius: 12px;
  margin-bottom: 20px;
}
.event-info h1 {
  font-size: 32px;
  margin-bottom: 10px;
}
.description {
  font-size: 18px;
  margin-bottom: 20px;
}
.extra-details p {
  font-size: 16px;
  margin: 6px 0;
}
.rating .star {
  font-size: 22px;
  color: #ccc;
}
.rating .star.filled {
  color: #FFD700;
}
.book-btn {
  background: #8b5e3c;
  color: white;
  border: none;
  padding: 12px 24px;
  font-size: 16px;
  border-radius: 8px;
  cursor: pointer;
  margin: 20px 0;
  transition: background 0.3s;
}
.book-btn:hover {
  background: #744b2f;
}
.reviews h3 {
  margin-top: 20px;
}
.reviews ul {
  list-style: none;
  padding: 0;
}
.reviews li {
  background: #f7f7f7;
  padding: 10px;
  border-radius: 6px;
  margin: 10px 0;
}
.back-arrow {
  position: absolute;
  top: 20px;
  left: 20px;
  font-size: 28px;
  color: #8b5e3c;
  cursor: pointer;
  transition: transform 0.3s ease;
}

.back-arrow:hover {
  transform: scale(1.2);
}
.favorite-icon {
  font-size: 26px;
  color: #ccc;
  margin-left: 12px;
  cursor: pointer;
  transition: color 0.3s ease, transform 0.2s ease;
}
.favorite-icon:hover {
  transform: scale(1.2);
}
.favorite-icon.active {
  color: #e63946;
}
.add-to-favorites {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-top: 10px;
  cursor: pointer;
  transition: transform 0.2s ease;
}
.add-to-favorites:hover {
  transform: scale(1.02);
}
.heart {
  font-size: 24px;
  color: #ccc;
  transition: color 0.3s ease;
}
.heart.active {
  color: #e63946;
}
.fav-text {
  font-size: 16px;
  color: #333;
}

</style>
 