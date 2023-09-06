<template>
  <div>
    <h2>학습하기</h2>
    <div v-for="(word, index) in words" :key="index">
        <div style="display: flex;">단어 : {{ words[index][0] }} 의미 : {{ words[index][1] }}</div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "StudyComponent",
  props: ["listId"],
  data() {
    return {
      words: [],
    };
  },
  async mounted() {
    await this.fetchWordData();
  },
  methods: {
    async fetchWordData() {
      try {
        const response = await axios.get(
          `http://localhost:3000/study/${this.listId}`
        );
        this.words = response.data;
        console.log(response.data);
      } catch (error) {
        console.error("에러:", error);
      }
    },
  },
};
</script>
