<template>
  <div class="login-wrapper" :class="mood">
   <video v-if="mood" autoplay muted loop playsinline class="bg-video">
      <source :src="videoSrc" type="video/mp4" />
      Your browser does not support the video tag.
    </video>
    <div class="decor-widget top-left"></div>
    <div class="decor-widget bottom-right"></div>
    <div class="login-card">
      <div class="logo-container">
<img :src="logoSrc" alt="Logo" class="logo" />      </div>
      <form @submit.prevent="handleSubmit">
        <h2 style="margin-bottom: 20px;">Forgot Password</h2>
        <div class="form-group">
          <label for="email">Enter your email</label>
          <input id="email" type="email" v-model="email" required placeholder="you@example.com" />
        </div>
        <button :disabled="loading" type="submit">
          {{ loading ? "Sending..." : "Send Reset Link" }}
        </button>
        <p v-if="message" class="info-message">{{ message }}</p>
        <div class="footer-links">
          <router-link to="/login">Back to login</router-link>
        </div>
      </form>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      email: '',
      loading: false,
      message: '',
      mood: '',
      moodMessage: ''
    };
  },computed: {
  videoSrc() {
    return new URL('@/assets/alulaa.mp4', import.meta.url).href;
  },logoSrc() {
  if (this.mood === 'Light') return new URL('@/assets/logo-light.png', import.meta.url).href;
  if (this.mood === 'Dark') return new URL('@/assets/logo-dark.png', import.meta.url).href;
  if (this.mood === 'neutral') return new URL('@/assets/logo-natural.png', import.meta.url).href;
  return new URL('@/assets/logo.png', import.meta.url).href;
}


}
,
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
    async handleSubmit() {
      this.loading = true;
      setTimeout(() => {
        this.message = 'If the email is registered, a reset link has been sent.';
        this.loading = false;
      }, 1500);
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
  background: linear-gradient(to right, #74ebd5, #ACB6E5);
}
.login-wrapper.sad {
  background: linear-gradient(to right, #bdc3c7, #2c3e50);
}
.login-wrapper.stressed {
  background: linear-gradient(to right, #5f4c67, #8e9eab);
}
.login-wrapper.neutral {
  background: #0e1a28;
}
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
.info-message {
  color: #666;
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
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(25px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
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
.login-wrapper.Light {
  background: transparent;
  color: #4e433f;
}
.login-wrapper.Dark {
  background: transparent;
  color: white;
}
.login-wrapper.neutral {
  background: transparent;
  color: white;
}
.login-wrapper.Light button {
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
  background: linear-gradient(135deg, #1f3548, #2a3b4f);
}

</style>