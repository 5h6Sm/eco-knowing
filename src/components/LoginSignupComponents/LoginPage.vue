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
    <!-- 성공하면 alert 으로 success 출력/-->
  </div>
</template>

<script>
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
        const response = await this.$axios.post("/api/data", {
          id: this.id,
          pw: this.pw,
        });
        if (response.data.success) {
          this.error = "";
          console.log("Login successful:", response.data.user);
          // 로그인 성공 시 다음 작업 수행
        } else {
          this.error = response.data.message;
        }
      } catch (error) {
        console.error("Error during login:", error);
      }
    },
  },
};
</script>
<style></style>
