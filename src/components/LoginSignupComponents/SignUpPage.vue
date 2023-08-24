<template>
  <div id="app">
    <h4 style="margin: -5vw 0 1vw 0">SignUp</h4>
    <form @submit.prevent="signup">
      <div style="margin-bottom: 10px; display: flex;">
        <label for="name" style="width: 3vw; text-align: left;">NAME</label>
        <input type="text" id="name" v-model="user_name" required />
      </div>
      <div style="margin-bottom: 10px; display: flex;">
        <label for="id" style="width: 3vw; text-align: left;">ID</label>
        <input type="text" id="id" v-model="id" required />
      </div>
      <div style="margin-bottom: 10px; display: flex;">
        <label for="password" style="width: 3vw; text-align: left;">PW</label>
        <input type="password" id="password" v-model="pw" required />
      </div>
      <div style="margin-bottom: 10px; display: flex;">
        <label for="age" style="width: 3vw; text-align: left;">AGE</label>
        <input type="number" id="age" v-model="age" required />
      </div>
      <button type="submit" style="width: 3vw; height: 1.5vw;">SignUp</button>
    </form>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: "SignUpPage",
  data() {
    return {
      user_name: "",
      id: "",
      pw: "",
      age: "",
    };
  },
  methods: {
    async signup() {
      console.log(this.user_name, this.id, this.pw, this.age);
      try {
        const response = await axios.post("http://localhost:3000/signup_data", {
          user_name: this.user_name,
          id: this.id,
          pw: this.pw,
          age: this.age,
        });
        if (response.data.success) {
          console.log("회원가입 성공");
          alert("회원가입에 성공했습니다.");
          this.$router.push("/login");
        } else {
          console.log("회원가입 실패");
          alert("회원가입에 실패했습니다.");
        }
      } catch (error) {
        console.error("회원가입 실패:", error);
        alert("회원가입에 실패했습니다.");
      }
    },
  },
};
</script>

<style></style>
