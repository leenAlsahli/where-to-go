<template>
  <div class="organizer-wrapper" :class="mood">
    <div class="back-arrow" @click="goBack">←</div>

    <div class="organizer-card">
      <h1>Join as an Organizer</h1>
      <p class="subtext">Fill out the form below to start creating amazing events.</p>

      <form @submit.prevent="submitForm">
        <label>
          Organization Name
          <input type="text" v-model="orgName" required />
        </label>

        <label>
          Contact Email
          <input type="email" v-model="email" required />
        </label>

        <label>
          City
          <input type="text" v-model="city" required />
        </label>

        <label>
          Description
          <textarea v-model="description" rows="4" placeholder="Tell us about your organization..."></textarea>
        </label>

        <button type="submit" class="submit-btn" :disabled="submitted">
          {{ submitted ? 'Submitted ✓' : 'Submit Application' }}
        </button>
      </form>

      <p v-if="submitted" class="success-message">Your application has been submitted successfully.</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'JoinAsOrganizer',
  data() {
    return {
      orgName: '',
      email: '',
      city: '',
      description: '',
      submitted: false,
      mood: sessionStorage.getItem('userMood') || 'Light'
    };
  },
  methods: {
    submitForm() {
      this.submitted = true;
      setTimeout(() => {
        this.$router.push('/profile');
      }, 2000);
    },
    goBack() {
      this.$router.go(-1);
    }
  }
};
</script>

<style scoped>
.organizer-wrapper {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 60px 20px;
  font-family: 'Tajawal', sans-serif;
  transition: background 0.3s ease;
}

/* Mood background colors */
.organizer-wrapper.Light {
  background: white;
  color: #4e433f;
}
.organizer-wrapper.Dark {
  background: #1e1e1e;
  color: white;
}
.organizer-wrapper.Natural {
  background: #e9f0ea;
  color: #1e2a22;
}

.organizer-card {
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border-radius: 18px;
  padding: 40px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  max-width: 500px;
  width: 100%;
  color: inherit;
}

h1 {
  font-size: 28px;
  text-align: center;
  margin-bottom: 10px;
  color: #8b5e3c;
}

.subtext {
  font-size: 14px;
  text-align: center;
  color: #777;
  margin-bottom: 30px;
}

form {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

label {
  font-weight: 600;
  font-size: 14px;
  text-align: left;
}

input,
textarea {
  margin-top: 6px;
  padding: 12px;
  border-radius: 10px;
  border: 1px solid #ccc;
  font-size: 14px;
  width: 100%;
}

.submit-btn {
  background-color: #8b5e3c;
  color: white;
  font-weight: bold;
  padding: 12px;
  border-radius: 10px;
  border: none;
  cursor: pointer;
  transition: background 0.3s ease;
  margin-top: 10px;
}

.submit-btn:hover {
  background-color: #744b2f;
}

.submit-btn:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}

.success-message {
  margin-top: 20px;
  text-align: center;
  color: #3d7a3d;
  background: #e8f5e9;
  padding: 12px;
  border-radius: 10px;
  border: 1px solid #c2e4c2;
  animation: fadeIn 0.5s ease-in-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
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
