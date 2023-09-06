<template>
  <div id="app">
    <form @submit.prevent="create_wordlist">
      <h5>단어장을 만들어보세요!</h5>
      <div class="title" style="display: flex">
        <h6>제목</h6>
        <input type="text" v-model="title" />
      </div>

      <h6>단어를 입력하세요!</h6>

      <div
        class="word"
        v-for="(wordItem, index) in wordlist"
        :key="index"
        style="display: flex"
      >
        <div class="word-title" style="display: flex">
          <h6>단어</h6>
          <input type="text" style="width: 5vw" v-model="wordItem.word" />
        </div>
        <div class="word-mean" style="display: flex">
          <h6>의미</h6>
          <input type="text" v-model="wordItem.mean " />
        </div>
      </div>
      <button @click="addWordList">추가</button>
      <button @click="removeWordList">삭제</button>
      <button type="submit">단어장 만들기</button>
      <button @click = "goToHome">홈으로</button>
    </form>
  </div>
</template>
sdf
<script>
import axios from "axios";
import { mapMutations } from "vuex";

export default {
  name: "CreateWordlist",
  data: () => {
    return {
      title: "",
      wordlist: [{ word: "", mean : "" }],
    };
  },
  methods: {
    addWordList() {
      this.wordlist.push({ word: "", mean : "" });
    },
    removeWordList() {
      if (this.wordlist.length > 0) {
        this.wordlist.pop();
      }
    },
    goToHome() {
  this.$router.push(`/`);
},

    async create_wordlist() {
  try {
    const response = await axios.post(
      "http://localhost:3000/create_wordlist",
      {
        title: this.title,
        wordlist: this.wordlist,
        userId: this.$store.state.userId,
        savedWordlist: this.$store.state.userSavedWordlist,
      }
    );

    if (response.data.success) {
      console.log("단어장 생성 및 저장 성공");
      alert("성공");
      this.$store.commit('setUserSavedWordlist', response.data.listId);
    } else {
      console.log("단어장 생성 및 저장 실패");
    }
  } catch (error) {
    console.error("에러 발생:", error);
  }
},
    ...mapMutations(["setUserSavedWordlist"]),
  },
};
</script>
<style></style>
