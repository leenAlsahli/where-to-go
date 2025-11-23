
<template>
  <div class="login-wrapper" :class="mood">
  <video v-if="mood" autoplay muted loop playsinline class="bg-video">
  <source :src="videoSrc" type="video/mp4" />
  Your browser does not support the video tag.
</video>

    <!-- Decorative Widgets -->
    <div class="decor-widget top-left"></div>
    <div class="decor-widget bottom-right"></div>

    <!-- Side Widget Left -->
    <div class="side-widget left">
      <div class="blur-card">
        <h3>Join the experience!</h3>
        <p>Discover the best events tailored to you.</p>
      </div>
      <div class="blur-card">
        <h3>Your preferences matter</h3>
        <p>Concerts, art shows, or festivals—we got you.</p>
      </div>
    </div>

    <!-- Create Account Card -->
    <div class="login-card">
      <div class="logo-container">
<img :src="logoSrc" alt="Logo" class="logo" />
      </div>
      <form @submit.prevent="handleRegister">
        <h2 style="margin-bottom: 20px;">Create Your Account</h2>
        <div class="form-group">
          <label for="name">Full Name</label>
          <input id="name" type="text" v-model="name" required placeholder="Your full name" />
        </div>
        <div class="form-group">
          <label for="email">Email</label>
          <input id="email" type="email" v-model="email" required placeholder="you@example.com" />
        </div>
        <div class="form-group">
          <label for="password">Password</label>
          <input id="password" type="password" v-model="password" required placeholder="Create a password" />
        </div>
        <button :disabled="loading" type="submit">
          {{ loading ? "Creating account..." : "Sign up" }}
        </button>
        <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
        <div class="footer-links">
          <router-link to="/">Back to login</router-link>
        </div>
      </form>
    </div>

    <!-- Side Widget Right -->
    <div class="side-widget right">
      <div class="blur-card dark">
        <h3>Easy & Secure</h3>
        <p>One account for all events and experiences.</p>
      </div>
      <div class="blur-card dark">
        <h3>Let's get started!</h3>
        <p>You're one step away from great moments.</p>
      </div>
    </div>
  </div>
</template>

<script>


export default {
  data() {
    return {
      mood: '',
      moodMessage: '',
      name: '',
      email: '',
      password: '',
      loading: false,
      errorMessage: ''
    };
  },computed: {
  videoSrc() {
    return new URL('@/assets/alulaa.mp4', import.meta.url).href;
  },
  logoSrc() {
    if (this.mood === 'Light') return new URL('@/assets/logo-light.png', import.meta.url).href;
    if (this.mood === 'Dark') return new URL('@/assets/logo-dark.png', import.meta.url).href;
    if (this.mood === 'neutral') return new URL('@/assets/logo-natural.png', import.meta.url).href;
    return new URL('@/assets/logo.png', import.meta.url).href;
  }
},

  created() {
    const savedMood = sessionStorage.getItem('userMood');
    if (savedMood) {
      this.mood = savedMood;
      this.setMoodMessage(savedMood);
    }
  },
  methods: {
    setMoodMessage(m) {
      const messages = {
        happy: "Feeling good? Let’s make it great 💙",
        sad: "It's okay to feel down 🌧️",
        stressed: "Take a breath... you’ve got this 😮‍💨",
        neutral: "Just a regular day? Let’s make it smooth 👍"
      };
      this.moodMessage = messages[m];
    },
async handleRegister() {
  this.loading = true
  this.errorMessage = ''
  if (this.password.length < 8) {
    this.errorMessage = 'Password must be at least 8 characters for security reasons.';
    this.loading = false;
    return; 
  }
  const { data, error } = await supabase.auth.signUp({
    email: this.email,
    password: this.password,
    options: {
      data: {
        full_name: this.name
      }
    }
  })
  if (error) {
    this.errorMessage = error.message
  } else {
    this.$router.push('/home') 
  }
  this.loading = false
}




  }
};
</script>


<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Tajawal:wght@400;700&display=swap');

.login-wrapper {
  background: transparent;
    min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: 'Tajawal', sans-serif;
  padding: 60px;
  gap: 30px;
  position: relative;
  overflow: hidden;
  transition: background 0.3s ease;
}
.login-wrapper.happy {
  background: transparent;}
.login-wrapper.sad {
  background: transparent;}
.login-wrapper.stressed {
  background: transparent;}
.login-wrapper.neutral {
 background: transparent;}


.decor-widget {
  position: absolute;
  width: 120px;
  height: 120px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.06);
  filter: blur(40px);
  z-index: 0;
}
.decor-widget.top-left {
  top: 20px;
  left: 20px;
}
.decor-widget.bottom-right {
  bottom: 20px;
  right: 20px;
}
.login-card {
  background: #ffffff;
  color: #1c1c1c;
  border-radius: 22px;
  padding: 50px 40px;
  max-width: 460px;
  width: 100%;
  box-shadow: 0 40px 80px rgba(0, 0, 0, 0.15);
  animation: fadeIn 1s ease;
  text-align: center;
  z-index: 2;
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
  background: linear-gradient(135deg, #6c8ea3, #5c7c8f);
  color: white;
  border: none;
  border-radius: 14px;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.2);
}
button:hover {
  background: linear-gradient(135deg, #5c7c8f, #4b6b7a);
  transform: translateY(-2px);
}
button:disabled {
  background-color: #888;
  cursor: not-allowed;
}
.error-message {
  color: #ffd2d2;
  margin-top: 15px;
  font-size: 14px;
}
.footer-links {
  margin-top: 25px;
  font-size: 14px;
  color: #888;
}
.footer-links a {
  color: #6c8ea3;
  font-weight: bold;
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
.blur-card {
  backdrop-filter: blur(14px);
  background: rgba(255, 255, 255, 0.08);
  border-radius: 18px;
  padding: 25px 20px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
  color: #f1f1f1;
  text-align: center;
  font-weight: 500;
  border: 1px solid rgba(255, 255, 255, 0.2);
  width: 100%;
}
.blur-card.dark {
  background: rgba(255, 255, 255, 0.06);
  color: #ffffff;
}
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(25px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}.login-wrapper.Light button {
  background: linear-gradient(135deg, #e5d5c1, #d8c4aa);
  color: #1c1c1c;
}
.login-wrapper.Light button:hover {
  background: linear-gradient(135deg, #d8c4aa, #c4b6a6);
}

.login-wrapper.Dark button {
  background: linear-gradient(135deg, #444, #222);
  color: white;
}
.login-wrapper.Dark button:hover {
  background: linear-gradient(135deg, #555, #333);
}

.login-wrapper.neutral button {
  background: linear-gradient(135deg, #1b2e40, #223344);
  color: white;
}
.login-wrapper.neutral button:hover {
  background: transparent;}
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

</style> 