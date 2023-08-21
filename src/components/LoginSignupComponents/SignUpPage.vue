<template>

    <div id="app">
      <h4 style = "margin:-5vw 0 1vw 0">SignUp</h4>
      <form @submit.prevent="signup" >
        <div style="margin-bottom: 10px;  display: flex;">
          <label for="username" style = "width:1.5vw; text-align: left;">ID</label>
          <input type="text" id="username" v-model="username" required />
        </div>
        <div style="margin-bottom: 10px;  display: flex;">
          <label for="password" style = "width:1.5vw; text-align: left;">PW</label>
          <input type="password" id="password" v-model="password" required />
        </div>
        <button type="submit" style = "width : 3vw; height:1.5vw;" >SignUp</button>
        <!-- 성공하면 alert 으로 success 출력/-->
      </form>
    </div>
  
  </template>
  
  <script>
      export default {
          name: "SignUpPage",
      };
  </script>
  <style>
  
  
  </style>
  