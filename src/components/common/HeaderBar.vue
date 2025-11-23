 <template>
  <header :class="['header-bar', mood]">
    <div class="logo">Where to go</div>
    <div class="nav-links">
<span class="nav-item" @click="goToBooking">Booking</span>
<span class="nav-item" @click="goToBrowsing">Browsing</span>
<span class="nav-item" @click="$emit('toggle-search')">Search</span>

    </div>
    <div class="spacer"></div>
    <div class="profile" @click="goToProfile">
      <img :src="userIcon" alt="User" class="profile-icon" />
    </div>
  </header>
</template>
<script>
import { useRouter } from 'vue-router';
import userIcon from '@/assets/profile-icon.png';

export default {
  props: ['mood'],
  setup() {
    const router = useRouter();

    const goToProfile = () => {
      router.push('/profile');
    };

    const goToBooking = () => {
      router.push('/booking-details');
    };

    const goToBrowsing = () => {
      router.push('/browsing');
    };

    return {
      userIcon,
      goToProfile,
      goToBooking,
      goToBrowsing
    };
  }
};
</script>


<style scoped>
.header-bar {
  display: flex;
  align-items: center;
  padding: 15px 30px;
  font-family: 'Tajawal', sans-serif;
  position: sticky;
  top: 0;
  z-index: 100;
  transition: background 0.3s ease, color 0.3s ease;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
  backdrop-filter: blur(8px);
}

.header-bar .logo {
  font-size: 24px;
  font-weight: bold;
}

.header-bar .nav-links {
  display: flex;
  gap: 20px;
  margin-left: 40px;
}

.nav-item {
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  transition: color 0.3s;
}

.nav-item:hover {
  text-decoration: underline;
}

.header-bar .spacer {
  flex: 1;
}

.header-bar .profile-icon {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: white;
  padding: 4px;
  filter: drop-shadow(0 0 2px rgba(0, 0, 0, 0.3));
  cursor: pointer;
}


</style>