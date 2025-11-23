<template>
  <div class="back-arrow" @click="goBack">←</div>

  <div class="profile-wrapper">
    <div class="profile-card">
      <img :src="profileIcon" alt="Profile Picture" class="avatar" />
    <h2>{{ user?.name || 'Sara' }}</h2>
<p class="email">{{ user?.email }}</p>
<p class="city">{{ user?.city || 'Riyadh' }}</p>

      <div class="stats">
        <div class="stat-box">
          <h3>⭐ 42</h3>
          <p>Ratings Given</p>
        </div>
        <div class="stat-box">
          <h3>180</h3>
          <p>Reward Points</p>
        </div>
      </div>

      <div class="progress-section">
        <h4>Membership Level</h4>
        <div class="progress-bar">
          <div class="progress-fill" :style="{ width: '60%' }"></div>
        </div>
        <p class="level">Gold Member (180 pts)</p>
      </div>

      <div class="reviews">
        <h3>My Latest Reviews</h3>
        <div class="review" v-for="review in latestReviews" :key="review.id">
          <p><strong>{{ review.event }}</strong> — {{ review.comment }}</p>
        </div>
      </div>

      <button class="edit-btn" @click="goToSettings">Edit Profile</button>
      <button class="organizer-btn" @click="joinAsOrganizer">Join as Organizer</button>
    </div>
  </div>
</template>

<script>

import profileIcon from '@/assets/profile-icon.png';

export default {
  name: 'ProfilePage',
  data() {
    return {
      profileIcon,
      user: {}, // سيتم تعبئته من السيرفر
      latestReviews: [
        { id: 1, event: 'Camel Riding Adventures', comment: 'Amazing event!' },
        { id: 2, event: 'Poetry Night', comment: 'Very emotional and deep.' }
      ]
    };
  },
  methods: {
    async fetchUser() {
    const {
      data: { user }
    } = await supabase.auth.getUser();

    if (user) {
      this.user = user.user_metadata || {
        name: 'No Name',
        city: 'No City'
      };
    }
  },
    goToSettings() {
      this.$router.push('/settings');
    },
    joinAsOrganizer() {
      this.$router.push('/organizer-signup');
    },
    goBack() {
      this.$router.go(-1);
    }
  },

};
</script>

<style scoped>
.profile-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 60px 20px;
  font-family: 'Tajawal', sans-serif;
}

.profile-card {
  background: white;
  padding: 40px;
  border-radius: 16px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
  text-align: center;
  max-width: 450px;
  width: 100%;
}

.avatar {
  width: 100px;
  height: 100px;
  object-fit: cover;
  border-radius: 50%;
  margin-bottom: 15px;
}

h2 {
  margin: 0;
  font-size: 26px;
}

.email,
.city {
  margin: 5px 0;
  color: #666;
}

.stats {
  display: flex;
  justify-content: space-around;
  margin-top: 30px;
}

.stat-box {
  text-align: center;
}

.stat-box h3 {
  margin: 0;
  font-size: 24px;
  color: #8b5e3c;
}

.progress-section {
  margin-top: 30px;
}

.progress-bar {
  width: 100%;
  height: 10px;
  background: #eee;
  border-radius: 5px;
  overflow: hidden;
  margin: 10px 0;
}

.progress-fill {
  height: 100%;
  background: #8b5e3c;
  transition: width 0.5s ease;
}

.level {
  font-size: 14px;
  color: #888;
}

.reviews {
  margin-top: 30px;
  text-align: left;
}

.review {
  background: #f9f9f9;
  padding: 10px;
  border-radius: 8px;
  margin: 8px 0;
  font-size: 14px;
}

.edit-btn,
.organizer-btn {
  margin-top: 15px;
  padding: 10px 20px;
  background-color: #8b5e3c;
  color: white;
  border: none;
  border-radius: 6px;
  font-weight: bold;
  cursor: pointer;
  transition: background 0.3s;
  display: block;
  width: 100%;
  max-width: 250px;
  margin-left: auto;
  margin-right: auto;
}

.edit-btn:hover,
.organizer-btn:hover {
  background-color: #744b2f;
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