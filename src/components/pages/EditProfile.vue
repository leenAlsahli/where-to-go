<template>
  <div class="edit-wrapper" :class="mood">
    <div class="back-arrow" @click="goBack">←</div>

    <div class="edit-card">
      <h1>Edit Your Profile</h1>

      <div v-if="showSuccess" class="alert-success">
        ✔ Changes saved successfully!
      </div>

      <form @submit.prevent="saveChanges">
        <div class="input-group">
          <label>Name</label>
          <input type="text" v-model="name" placeholder="Enter your name" />
        </div>

        <div class="input-group">
          <label>Email</label>
          <input type="email" v-model="email" placeholder="Enter your email" />
        </div>

        <div class="input-group">
          <label>City</label>
          <input type="text" v-model="city" placeholder="Enter your city" />
        </div>

        <button type="submit" class="save-btn">Save Changes</button>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'EditProfile',
  data() {
    return {
      name: '',
      email: '',
      city: '',
      showSuccess: false,
      mood: sessionStorage.getItem('userMood') || 'Light'
    };
  },
  created() {
    // تعبئة البيانات من sessionStorage فقط للعرض
    this.name = sessionStorage.getItem('userName') || '';
    this.email = sessionStorage.getItem('userEmail') || '';
    this.city = sessionStorage.getItem('userCity') || '';
  },
  methods: {
    saveChanges() {
      // تحفظ البيانات في sessionStorage بس كعرض
      sessionStorage.setItem('userName', this.name);
      sessionStorage.setItem('userEmail', this.email);
      sessionStorage.setItem('userCity', this.city);

      this.showSuccess = true;

      setTimeout(() => {
        this.showSuccess = false;
        this.$router.push('/profile'); // يرجع للصفحة السابقة
      }, 2000);
    },
    goBack() {
      this.$router.go(-1);
    }
  }
};
</script>


<style scoped>
.edit-wrapper {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 80px 20px;
  font-family: 'Tajawal', sans-serif;
  position: relative;
}
.edit-wrapper.Light {
  background: #f5f5f5;
  color: #4e433f;
}
.edit-wrapper.Dark {
  background: #1e1e1e;
  color: #f5f5f5;
}
.edit-wrapper.neutral {
  background: #e3eee9;
  color: #1e2a22;
}

.edit-card {
  background: white;
  padding: 50px;
  border-radius: 16px;
  box-shadow: 0 15px 40px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 600px;
}
h1 {
  text-align: center;
  font-size: 30px;
  margin-bottom: 40px;
  color: #8b5e3c;
}
form {
  display: flex;
  flex-direction: column;
  gap: 25px;
}
.input-group {
  display: flex;
  flex-direction: column;
}
label {
  font-weight: 600;
  margin-bottom: 8px;
}
input {
  padding: 14px;
  border-radius: 10px;
  border: 1px solid #ccc;
  font-size: 15px;
}
.save-btn {
  padding: 14px;
  font-size: 16px;
  font-weight: bold;
  background-color: #8b5e3c;
  color: white;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  transition: background 0.3s ease;
}
.save-btn:hover {
  background-color: #744b2f;
}
.alert-success {
  margin-bottom: 20px;
  background-color: #d4edda;
  color: #155724;
  border: 1px solid #c3e6cb;
  padding: 12px;
  border-radius: 8px;
  font-size: 15px;
  text-align: center;
  animation: fadeIn 0.3s ease;
}
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
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