<template>
  <div id="app">
    <font-awesome-icon icon="fa-regular fa-user" />
    <div class="Login" @click="goToLogin">Login</div>
    <div class="Login" @click="goToSignup">SignUp</div>
  </div>
</template>

<script>
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

export default {
  name: "LoginSignup",
  components: {
    FontAwesomeIcon,
  },
  methods: {
    goToLogin() {
      this.$router.push("/login");
    },
    goToSignup() {
      this.$router.push("/signup");
    },
  },
};
</script>
<style>
.Login, .SignUp{
  width:5vw;
  height:2vw;
  background-color: #2F4F4F;
  text-align: center;
  color: #FAEBD7;
  justify-content :center;
  display: flex;
  align-items : center;
  border-radius: 10vw;
  margin-top: 0.5vw;
  }

  #app{
    padding: 0 ;
    margin: 0 ;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;

  }
</style>