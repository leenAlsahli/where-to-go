<template>
<div class="back-arrow" @click="goBack">
  ←
</div>

  <div class="booked-wrapper" :class="mood">
    <h1 class="headline"> Booking Confirmed!</h1>
    <p class="subtext">Your reservation has been placed successfully!</p>

    <div class="details-box">
      <h2 class="event-name">{{ title }}</h2>
      <p><strong>Time:</strong> {{ time }}</p>
      <p><strong> Location:</strong> {{ city }}</p>
    </div>

    <div class="widgets">
      <div class="widget">
        <h3>What's Next?</h3>
        <p>You’ll receive an email with your ticket and event reminders.</p>
      </div>

      <div class="widget">
        <h3> Share With Friends</h3>
        <p>Let your friends know about this event on social media!</p>
        <button class="share-btn" @click="goToShare">Share Now</button>
      </div>

      <div class="widget">
        <h3>Rate the Experience</h3>
        <p>After attending, come back and share your thoughts with others.</p>
      </div>
    </div>

    <button class="home-btn" @click="goHome">Return to Home</button>
  </div>
</template>

<script>
export default {
  name: 'Booked',
  data() {
    return {
      title: this.$route.query.title,
      time: this.$route.query.time,
      city: this.$route.query.city,
      mood: sessionStorage.getItem('userMood') || 'Light'
    };
  },
  methods: {
    goHome() {
      this.$router.push('/home');
    }, goBack() {
      this.$router.go(-1); 
    },
    goToShare() {
  this.$router.push('/share');
}


  }
};
</script>

<style scoped>
.booked-wrapper {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 50px 20px;
  font-family: 'Tajawal', sans-serif;
  text-align: center;
  transition: background 0.4s ease, color 0.4s ease;
}


.booked-wrapper.Light {
  background: white;
  color: #4e433f;
}
.booked-wrapper.Light .details-box,
.booked-wrapper.Light .widget {
  background: #fff8f1;
  color: #4e433f;
}
.booked-wrapper.Light .headline {
  color: #8b5e3c;
}


.booked-wrapper.Dark {
  background: #1e1e1e;
  color: #f5f5f5;
}
.booked-wrapper.Dark .details-box,
.booked-wrapper.Dark .widget {
  background: #2e2e2e;
  color: #f5f5f5;
}
.booked-wrapper.Dark .headline {
  color: #ffc77a;
}

/* NATURAL MODE */
.booked-wrapper.Natural {
  background: #e9f0ea;
  color: #1e2a22;
}
.booked-wrapper.Natural .details-box,
.booked-wrapper.Natural .widget {
  background: #f6faf7;
  color: #1e2a22;
}
.booked-wrapper.Natural .headline {
  color: #608060;
}

/* Common Components */
.headline {
  font-size: 36px;
  margin-bottom: 10px;
}

.subtext {
  font-size: 17px;
  margin-bottom: 30px;
}

.details-box {
  border: 1px solid #e4d4be;
  border-radius: 16px;
  padding: 25px;
  width: 100%;
  max-width: 420px;
  margin-bottom: 30px;
  box-shadow: 0 8px 20px rgba(0,0,0,0.05);
}

.event-name {
  font-size: 22px;
  margin-bottom: 18px;
}

.details-box p {
  font-size: 15px;
  margin: 10px 0;
}

.widgets {
  display: grid;
  gap: 20px;
  grid-template-columns: 1fr;
  max-width: 600px;
  width: 100%;
  margin-bottom: 40px;
}

.widget {
  padding: 20px;
  border-radius: 14px;
  box-shadow: 0 4px 14px rgba(0,0,0,0.05);
  text-align: left;
  border-left: 5px solid #8b5e3c;
}

.widget h3 {
  font-size: 18px;
  margin-bottom: 10px;
}

.widget p {
  font-size: 14px;
}

.share-btn {
  margin-top: 10px;
  background-color: #8b5e3c;
  color: white;
  padding: 8px 18px;
  border: none;
  border-radius: 8px;
  font-size: 14px;
  font-weight: bold;
  cursor: pointer;
  transition: background 0.3s ease;
}

.share-btn:hover {
  background-color: #6d3f26;
}

.home-btn {
  background-color: #8b5e3c;
  color: white;
  padding: 12px 30px;
  font-weight: bold;
  font-size: 15px;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  transition: background 0.3s ease;
}

.home-btn:hover {
  background-color: #6d3f26;
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

</style>
