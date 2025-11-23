<template>
  <div class="share-wrapper" :class="mood">
  
    <div class="back-arrow" @click="goBack">←</div>

    <div class="content">
      <div class="header">
        <h1> Share This Experience</h1>
        <p class="subtext">Invite your friends to join this amazing event!</p>
      </div>

      <div class="share-options">
        <button class="share-btn whatsapp" @click="shareWhatsApp">
          <span></span> WhatsApp
        </button>

        <button class="share-btn twitter" @click="shareTwitter">
          <span></span> Twitter
        </button>

        <button class="share-btn link" @click="copyLink">
          <span></span> Copy Link
        </button>

        <p v-if="copied" class="copied-msg"> Link copied!</p>
      </div>

      <div class="info-blocks">
        <div class="info">
          <h3>Why Share?</h3>
          <p>Help others discover fun, exciting, and cultural events across the kingdom.</p>
        </div>

        <div class="info">
          <h3>Need More?</h3>
          <p>You can view all your bookings anytime from the profile page.</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Share',
  data() {
    return {
      mood: sessionStorage.getItem('userMood') || 'Light',
      copied: false
    };
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    },
    shareWhatsApp() {
      const link = window.location.origin;
      window.open(`https://wa.me/?text=Check this event out! ${link}`, '_blank');
    },
    shareTwitter() {
      const text = encodeURIComponent("Check out this amazing event!");
      const link = window.location.origin;
      window.open(`https://twitter.com/intent/tweet?text=${text}&url=${link}`, '_blank');
    },
    copyLink() {
      navigator.clipboard.writeText(window.location.origin);
      this.copied = true;
      setTimeout(() => (this.copied = false), 2000);
    }
  }
};
</script>

<style scoped>
.share-wrapper {
  min-height: 100vh;
  padding: 30px 20px;
  font-family: 'Tajawal', sans-serif;
  transition: background 0.3s ease;
  position: relative;
}

/* Mood-based backgrounds */
.share-wrapper.Light {
  background: white;
  color: #4e433f;
}

.share-wrapper.Dark {
  background: #1e1e1e;
  color: white;
}

.share-wrapper.Natural {
  background: #e9f0ea;
  color: #1e2a22;
}

/* Back button top-left */
.back-arrow {
  position: absolute;
  top: 20px;
  left: 20px;
  font-size: 24px;
  cursor: pointer;
  font-weight: bold;
  transition: transform 0.2s ease;
}

.back-arrow:hover {
  transform: scale(1.2);
}

/* Main content layout */
.content {
  margin-top: 60px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

/* Title & description */
.header {
  text-align: center;
  margin-bottom: 30px;
}

.subtext {
  font-size: 16px;
  opacity: 0.8;
  margin-top: 6px;
}

/* Buttons */
.share-options {
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-bottom: 40px;
  width: 100%;
  max-width: 320px;
}

.share-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  background-color: #8b5e3c;
  color: white;
  padding: 14px 24px;
  border: none;
  border-radius: 12px;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  transition: background 0.3s, transform 0.2s;
}

.share-btn:hover {
  background-color: #6d3f26;
  transform: scale(1.03);
}

.copied-msg {
  font-size: 14px;
  color: green;
  text-align: center;
  margin-top: -8px;
}

/* Extra info blocks */
.info-blocks {
  display: flex;
  flex-direction: column;
  gap: 20px;
  max-width: 400px;
  width: 100%;
  margin-top: 20px;
}

.info {
  background: rgba(255,255,255,0.08);
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 4px 16px rgba(0,0,0,0.05);
  backdrop-filter: blur(4px);
}

.info h3 {
  margin-bottom: 8px;
  font-size: 18px;
  color: #8b5e3c;
}

.info p {
  font-size: 14px;
  opacity: 0.9;
}
</style>
