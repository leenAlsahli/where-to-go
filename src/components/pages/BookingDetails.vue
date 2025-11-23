<template>
<div class="back-icon" @click="goBack">
  ←
</div>


  <div class="booking-details">
    <h1>My Bookings</h1>

    <section class="booking-section">
      <h2>Current Bookings</h2>
      <div v-if="currentBookings.length" class="card-list">
        <div class="booking-card current" v-for="booking in currentBookings" :key="booking.id">
          <div class="card-left">
            <i class="fas fa-calendar-check icon"></i>
            <div>
              <h3>{{ booking.event }}</h3>
              <p>{{ booking.date }}</p>
            </div>
          </div>
          <span class="status active">Upcoming</span>
        </div>
      </div>
      <p v-else class="empty">No current bookings.</p>
    </section>
<section class="booking-section">
  <h2>Missed Bookings</h2>
  <div v-if="missedBookings.length" class="card-list">
    <div class="booking-card missed" v-for="booking in missedBookings" :key="booking.id">
      <div class="card-left">
        <i class="fas fa-exclamation-triangle icon"></i>
        <div>
          <h3>{{ booking.event }}</h3>
          <p>{{ booking.date }}</p>
        </div>
      </div>
      <span class="status missed">Missed</span>
    </div>
  </div>
  <p v-else class="empty">No missed bookings.</p>
</section>

    <section class="booking-section">
      <h2>Past Bookings</h2>
      <div v-if="pastBookings.length" class="card-list">
        <div class="booking-card past" v-for="booking in pastBookings" :key="booking.id">
          <div class="card-left">
            <i class="fas fa-history icon"></i>
            <div>
              <h3>{{ booking.event }}</h3>
              <p>{{ booking.date }}</p>
            </div>
          </div>
          <span class="status past">Attended</span>
        </div>
      </div>
      <p v-else class="empty">No past bookings.</p>
    </section>
  </div>

</template>

<script>
export default {
  name: 'BookingDetails',
  data() {
    return {
      currentBookings: [
        { id: 1, event: 'Summer Food Festival', date: '2025-06-01' },
        { id: 2, event: 'National Day Parade', date: '2025-06-05' }
      ],
      pastBookings: [
        { id: 3, event: 'Ramadan Night Market', date: '2025-04-20' },
        { id: 4, event: 'Cultural Music Show', date: '2025-03-15' }
      ],
    missedBookings: [
      { id: 5, event: 'Outdoor Cinema Night', date: '2025-04-10' }
    ]
    };
},methods: {
  goBack() {
    this.$router.push('/home');
  }
}



  };
</script>
<style scoped>
.booking-details {
  padding: 30px;
  font-family: 'Tajawal', sans-serif;
  color: #2d2d2d;
  max-width: 800px;
  margin: auto;
}

h1 {
  font-size: 30px;
  margin-bottom: 30px;
  text-align: center;
  color: #333;
}

.booking-section {
  margin-bottom: 40px;
}

h2 {
  font-size: 24px;
  margin-bottom: 20px;
  color: #444;
}

.card-list {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.booking-card {
  background: #fff;
  border-left: 6px solid #4caf50;
  padding: 15px 20px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.08);
  border-radius: 8px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.booking-card.past {
  border-left-color: #aaa;
  opacity: 0.85;
}

.card-left {
  display: flex;
  align-items: center;
  gap: 15px;
}

.icon {
  font-size: 24px;
  color: #4caf50;
}

.booking-card.past .icon {
  color: #888;
}

h3 {
  margin: 0;
  font-size: 18px;
  color: #222;
}

p {
  margin: 4px 0 0;
  color: #666;
  font-size: 14px;
}

.status {
  font-size: 14px;
  font-weight: bold;
  padding: 4px 10px;
  border-radius: 5px;
}

.status.active {
  background-color: #e0f7e9;
  color: #2e7d32;
}

.status.past {
  background-color: #f0f0f0;
  color: #555;
}

.empty {
  font-size: 15px;
  color: #999;
  font-style: italic;
}
.booking-card.missed {
  border-left-color: #f44336;
  background-color: #fff3f3;
}

.booking-card.missed .icon {
  color: #f44336;
}

.status.missed {
  background-color: #fdecea;
  color: #c62828;
}
.back-icon {
  position: absolute;
  top: 20px;
  left: 20px;
  font-size: 24px;
  color: black;
  cursor: pointer;
  z-index: 10;
  transition: transform 0.2s ease;
}

.back-icon:hover {
  transform: translateX(-5px);
}


</style>