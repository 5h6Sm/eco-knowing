<template>
    <div>
        <div v-if="users.length > 0">
      <h4>모든 사용자 ID:</h4>
      <p>{{ users.join(", ") }}</p>
      <h4>모든 사용자 이름:</h4>
      <p>{{ name.join(", ") }}</p>
    </div>
      <div v-else>
        <h4>사용자가 없습니다.</h4>
      </div>
      <div>
        <h4>사용자 수 :</h4>
        <p>{{ wordlistViewRowCount }}</p>
      </div>
      <div>
        <h4>age가 20 미만인 사람의 수</h4>
        <p>{{ ageUnderCount }}</p>
      </div>
    </div>
  </template>
  
  <script>
  import axios from "axios";
  
  export default {
    name: "AdminComponent",
    data() {
      return {
        users: [],
        name: [],
        wordlistViewResult: [],
        wordlistViewRowCount: 0,
        ageUnderCount: 0,
      };
    },
    async mounted() {
      try {
        const combinedQueryResponse = await axios.get(
          "http://localhost:3000/combined-queries-api-endpoint"
        );
        this.wordlistViewResult =
          combinedQueryResponse.data.wordlistViewResult;
        this.wordlistViewRowCount =
          combinedQueryResponse.data.wordlistViewRowCount;
        this.ageUnderCount = combinedQueryResponse.data.ageUnderCount;
  
        this.users = combinedQueryResponse.data.users.rows;
        this.name = combinedQueryResponse.data.name.rows;

        console.log(combinedQueryResponse.data.ageUnderCount);
      } catch (error) {
        console.error("에러:", error);
      }
    },
  };
  </script>
  
  <style>
  </style>
  