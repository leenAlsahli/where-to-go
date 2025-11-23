<template>
  <div class="login-wrapper" :class="mood">
 <video v-if="mood" autoplay muted loop playsinline class="bg-video">
      <source :src="videoSrc" type="video/mp4" />
      Your browser does not support the video tag.
    </video>

    <!-- Mood Overlay -->
    <div v-if="!mood" class="mood-overlay">
      <div class="mood-dialog">
                <p v-if="!moodMessage" class="mood-hint">How do you feel like browsing today</p>
        <p v-else class="mood-hint">{{ moodMessage }}</p>
        <div class="mood-options">
          <button @click="selectMood('Light')"> Light Mood</button>
          <button @click="selectMood('Dark')"> Dark Mood</button>
          <button @click="selectMood('neutral')"> Neutral Mood</button>

        </div>
      </div>
    </div>

    <!-- Decorative Widgets -->
    <div class="decor-widget top-left"></div>
    <div class="decor-widget bottom-right"></div>

    <!-- Side Widget Left -->
    <div class="side-widget left">
      <div class="blur-card">
        <h3>We found the event!</h3>
        <p>We used to get lost until we found "Where to go?"</p>
      </div>
      <div class="blur-card">
        <h3>Tailored experiences</h3>
        <p>Concert or exhibition? We’ve got what you like.</p>
      </div>
    </div>

    <!-- Login Card -->
    <div class="login-card">
      <div class="logo-container">
<img :src="logoSrc" alt="Logo" class="logo" />
      </div>
      <form @submit.prevent="handleLogin">
        <div class="form-group">
          <label for="email">Email</label>
          <input id="email" type="email" v-model="email" required placeholder="you@example.com" />
        </div>
        <div class="form-group">
          <label for="password">Password</label>
          <input id="password" type="password" v-model="password" required placeholder="Enter your password" />
        </div>
        <button :disabled="loading" type="submit">
          {{ loading ? "Logging in..." : "Sign in" }}
        </button>
        <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
<div class="footer-links">
<router-link to="/forgot-password">Forgot password?</router-link>
  <span>•</span>
  <router-link to="/create-account">Create account</router-link>
</div>
      </form>
    </div>

    <!-- Side Widget Right -->
    <div class="side-widget right">
      <div class="blur-card dark">
        <h3>Fast & Secure Access</h3>
        <p>Sign up once, and everything is in your hands.</p>
      </div>
      <div class="blur-card dark">
        <h3>Ready to explore?</h3>
        <p>All the cool events are now close to you!</p>
      </div>
    </div>
  </div>
<section class="contact-section" :class="mood">
  <div class="contact-container">
    <h2>Let's Connect</h2>
    <p class="subheading">Have questions or suggestions? We're just a message away.</p>

    <div class="contact-info-grid">
      <div class="contact-box">
        <i class="fas fa-envelope"></i>
        <h4>Email</h4>
        <p>support@wheretogo.com</p>
      </div>
      <div class="contact-box">
        <i class="fas fa-phone-alt"></i>
        <h4>Phone</h4>
        <p>+966-555-123456</p>
      </div>
      <div class="contact-box">
        <i class="fas fa-map-marker-alt"></i>
        <h4>Address</h4>
        <p>Riyadh, Saudi Arabia</p>
      </div>
    </div>
  </div>
</section>
<swiper
  class="hero-carousel"
  :loop="true"
  :autoplay="{ delay: 4000 }"
  :pagination="{ clickable: true }"
>
  <swiper-slide v-for="(slide, index) in slides" :key="index">
    <img :src="slide" alt="Event banner" class="hero-image" />
  </swiper-slide>
</swiper>


</template>

<script>
export default {
  data() {
    return {
      mood: '',
      moodMessage: '',
      email: '',
      password: '',
      loading: false,
      errorMessage: ''
    };
  },
  computed: {
    logoSrc() {
      if (this.mood === 'Light') return new URL('@/assets/logo-light.png', import.meta.url).href;
      if (this.mood === 'Dark') return new URL('@/assets/logo-dark.png', import.meta.url).href;
      if (this.mood === 'neutral') return new URL('@/assets/logo.png', import.meta.url).href;
      return new URL('@/assets/logo.png', import.meta.url).href;
    },
    videoSrc() {
      return new URL('@/assets/alulaa.mp4', import.meta.url).href;
    }
  },
  created() {
    const savedMood = sessionStorage.getItem('userMood');
    const savedTime = sessionStorage.getItem('moodTimestamp');
    const now = Date.now();

    if (!savedMood || !savedTime || now - parseInt(savedTime) > 60000) {
      sessionStorage.removeItem('userMood');
      sessionStorage.removeItem('moodTimestamp');
      this.mood = '';
    } else {
      this.mood = savedMood;
      this.setMoodMessage(savedMood);
    }
  },
  methods: {
    selectMood(m) {
      this.mood = m;
      sessionStorage.setItem('userMood', m);
      sessionStorage.setItem('moodTimestamp', Date.now().toString());
      this.setMoodMessage(m);
    },

    setMoodMessage(m) {
      const messages = {
        Light: "Bright and breezy — for when you want your screen to feel like daylight.",
        Dark: "Less glare, more focus. Dark mode wraps your experience in calm and clarity.",
        neutral: "Soft tones and earthy vibes. Natural mode feels like a breath of fresh air."
      };
      this.moodMessage = messages[m];
    },

    handleLogin() {
      this.loading = true;
      this.errorMessage = '';
      const validEmails = ['drnouf@gmail.com','saraAlaid@gmail.com', 'user@example.com', 'aljuri@gmail.com' , 'deema@gmail.com','ghada@gmail.com', 'danah@gmail.com','yamam@gmail.com','noor@gmail.com'];
      if (validEmails.includes(this.email) && this.password === '12345678') {
        sessionStorage.setItem('userId', 'fake-id-001');
        sessionStorage.setItem('userName', 'Someone');
        this.$router.push('/home');
      } else {
        this.errorMessage = 'Invalid email or password.';
      }
      this.loading = false;
    }
  }
};
</script>
<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Tajawal:wght@400;700&display=swap');

body {
  margin: 0;
  padding: 0;
  background: transparent;
}

.login-wrapper {
  min-height: 100vh;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: 'Tajawal', sans-serif;
  padding: 60px;
  gap: 30px;
  position: relative;
  overflow: hidden;
}

/* Light Mode */
.login-wrapper.Light {
  background: transparent; /* <<< شفاف */
  color: #4e433f;
}
.login-wrapper.Light .blur-card,
.login-wrapper.Light .blur-card.dark,
.login-wrapper.Light button,
.login-wrapper.Light .footer-links a {
  color: #4e433f !important;
}
.login-wrapper.Light button {
  background: linear-gradient(135deg, #e5d5c1, #d8c4aa);
  color: #1c1c1c;
}
.login-wrapper.Light button:hover {
  background: linear-gradient(135deg, #d8c4aa, #c4b6a6);
}
.login-wrapper.Light .footer-links a {
  color: #bfae9c;
}

/* Dark Mode */
.login-wrapper.Dark {
  background: transparent;
  color: white;
}
.login-wrapper.Dark input {
  background-color: white;
  color: black;
}
.login-wrapper.Dark .blur-card,
.login-wrapper.Dark .footer-links a,
.login-wrapper.Dark button,
.login-wrapper.Dark label,
.login-wrapper.Dark input,
.login-wrapper.Dark .contact-box {
  color: white !important;
}

/* Neutral Mode */
.login-wrapper.neutral {
  background: transparent;
  color: white;
}

/* Mood overlay */
.mood-overlay {
  position: absolute;
  inset: 0;
  z-index: 10;
  backdrop-filter: blur(18px);
  background-color: rgba(0, 0, 0, 0.4);
  display: flex;
  justify-content: center;
  align-items: center;
}

.mood-dialog {
  text-align: center;
  color: white;
  max-width: 320px;
}

.mood-hint {
  margin-top: 10px;
  font-size: 30px;
  color: #f1f1f1;
}

.mood-options {
  margin-top: 20px;
  display: flex;
  gap: 15px;
  flex-wrap: wrap;
  justify-content: center;
}

.mood-options button {
  padding: 12px 20px;
  border-radius: 12px;
  border: none;
  background-color: rgba(255,255,255,0.2);
  color: white;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  transition: background 0.3s ease;
}

.mood-options button:hover {
  background-color: rgba(255,255,255,0.4);
}

/* Video background */
.bg-video {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  object-fit: cover;
  z-index: -1;
  opacity: 0.3;
  pointer-events: none;
}

/* Blur cards and login card */
.blur-card {
  background: rgba(255, 255, 255, 0.08);
  backdrop-filter: blur(12px);
  border-radius: 18px;
  padding: 25px 20px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
  color: #1c1c1c;
  text-align: center;
  font-weight: 500;
  border: 1px solid rgba(255, 255, 255, 0.2);
  width: 100%;
}

.blur-card.dark {
  background: rgba(255, 255, 255, 0.06);
  color: #2e2e2e;
}
.blur-card.natural {
  background: rgba(255, 255, 255, 0.06);
  color: white;
}

.login-card {
  background: rgba(255, 255, 255, 0.88);
  backdrop-filter: blur(14px);
  color: #1c1c1c;
  border-radius: 22px;
  padding: 50px 40px;
  max-width: 460px;
  width: 100%;
  box-shadow: 0 40px 80px rgba(0, 0, 0, 0.25);
  animation: fadeIn 1s ease;
  text-align: center;
  z-index: 2;
}

.login-content {
  position: relative;
  z-index: 1;
}

.logo-container {
  display: flex;
  justify-content: center;
  margin-bottom: 30px;
}

.logo {
  width: 220px;
  filter: brightness(1.1);
}

.form-group {
  text-align: left;
  margin-bottom: 22px;
  z-index: 2;
}

label {
  display: block;
  margin-bottom: 8px;
  font-weight: 600;
  color: #333333;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
}

input {
  width: 100%;
  padding: 14px;
  border-radius: 12px;
  border: none;
  background-color: #f9f9f9;
  font-size: 15px;
  color: #2c3e50;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.05);
  transition: box-shadow 0.3s ease;
}

input:focus {
  outline: none;
  box-shadow: 0 0 0 3px rgba(108, 142, 163, 0.3), 0 2px 6px rgba(0, 0, 0, 0.1);
}

button {
  width: 100%;
  padding: 14px;
  border: none;
  border-radius: 14px;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.2);
}

button:disabled {
  background-color: #888;
  cursor: not-allowed;
}

.error-message {
 color: #8B1E3F;  margin-top: 15px;
  font-size: 14px;
}

.footer-links {
  margin-top: 25px;
  font-size: 14px;
}

.footer-links a {
  font-weight: bold;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
}

.footer-links a:hover {
  text-decoration: underline;
}

.side-widget {
  flex: 1;
  max-width: 240px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 20px;
  z-index: 1;
}

/* Contact Section */
.contact-section {
  padding: 80px 20px 60px;
  text-align: center;
  transition: background 0.4s ease;
}

.contact-section.Light {
  background: transparent;
  color: rgb(147, 119, 96);
}
.contact-section.Dark {
  background: transparent;
  color: white;
}
.contact-section.neutral {
  background: transparent;
  color: white;
}

.contact-container {
  max-width: 1000px;
  margin: 0 auto;
}

.contact-container h2 {
  font-size: 32px;
  margin-bottom: 10px;
}

.contact-container .subheading {
  font-size: 16px;
  opacity: 0.7;
  margin-bottom: 40px;
}

.contact-info-grid {
  display: flex;
  justify-content: center;
  gap: 40px;
  flex-wrap: wrap;
}

.contact-box {
  background: rgba(255, 255, 255, 0.05);
  padding: 30px 25px;
  border-radius: 16px;
  width: 260px;
  backdrop-filter: blur(10px);
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
  color: inherit;
}

.contact-box:hover {
  transform: translateY(-5px);
}

.contact-box i {
  font-size: 28px;
  margin-bottom: 10px;
}

.contact-box h4 {
  font-size: 18px;}
  margin-bottom: 6px;


.contact-box p {
  font-size: 14px;
  opacity: 0.85;
}.login-card {
  border-radius: 22px;
  padding: 50px 40px;
  max-width: 460px;
  width: 100%;
  backdrop-filter: blur(14px);
  animation: fadeIn 1s ease;
  text-align: center;
  z-index: 2;
  box-shadow: 0 40px 80px rgba(0, 0, 0, 0.25);
}

/* Light Mood */
.login-wrapper.Light .login-card {
  background: rgba(255, 255, 255, 0.88);
  color: #1c1c1c;
}

/* Dark Mood */
.login-wrapper.Dark .login-card {
  background: rgba(0, 0, 0, 0.75);
  color: white;
}

/* Neutral Mood */
.login-wrapper.neutral .login-card {
  background: rgba(5, 20, 40, 0.75); /* كحلي */
  color: white;
}

/* Blur cards default */
.blur-card {
  border-radius: 18px;
  padding: 25px 20px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
  text-align: center;
  font-weight: 500;
  border: 1px solid rgba(255, 255, 255, 0.2);
  width: 100%;
  backdrop-filter: blur(12px);
}

/* Light Mood blur-card */
.login-wrapper.Light .blur-card {
  background: rgba(255, 255, 255, 0.08);
  color: #1c1c1c;
}

/* Dark Mood blur-card */
.login-wrapper.Dark .blur-card {
  background: rgba(0, 0, 0, 0.6);
  color: white;
}

/* Neutral Mood blur-card */
.login-wrapper.neutral .blur-card {
  background: rgba(5, 20, 40, 0.6); /* كحلي */
  color: white;
}

</style> 