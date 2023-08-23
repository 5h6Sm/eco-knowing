<template>
  <div id="app">
    <h4 style="margin: -5vw 0 1vw 0">Login</h4>
    <form @submit.prevent="login">
      <div style="margin-bottom: 10px; display: flex">
        <label for="id" style="width: 1.5vw; text-align: left">ID</label>
        <input type="text" id="id" v-model="id" required />
      </div>
      <div style="margin-bottom: 10px; display: flex">
        <label for="pw" style="width: 1.5vw; text-align: left">PW</label>
        <input type="password" id="pw" v-model="pw" required />
      </div>
      <button type="submit" style="width: 3vw; height: 1.5vw">Login</button>
    </form>
    <p v-if="error" style="color: red">{{ error }}</p>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: "LoginPage",
  data() {
    return {
      id: "",
      pw: "",
      error: "",
    };
  },
  methods: {
    async login() {
      try {
        const response = await axios.post("http://localhost:3000/login_data", {
          id: this.id,
          pw: this.pw,
        });
        if (response.data.success) {
          this.error = "";
          console.log("로그인 성공", response.data.user);
          this.$router.push("/home");
        } else {
          this.error = response.data.message;
          console.log("로그인 실패", this.error);
        }
      } catch (error) {
        console.error("로그인 실패:", error);
      }
    },
  },
};
</script>
<style></style>
