<template>
  <div id="app">
    <!-- <input
      type="text"
      v-model="searchQuery"
      @input="search"
      placeholder="단어를 검색해보세요"
      style="
        padding-left: 1vw;
        width: 80vw;
        height: 1.5vw;
        border-radius: 0.5vw;
        border: 0;
        background-color: #f5f5f5;
      "
    />
    <ul>
      <li v-for="result in searchResults" :key="result.id">
        {{ result.name }}
      </li>
    </ul>
    <div
      style="
        width: 80vw;
        height: 20vw;
        background-color: aqua;
        margin: 3vw 0 3vw 0;
        border-radius: 2vw;
      "
    >
      <img />
    </div> -->
    <button v-if="isAdmin" @click="goToAdminComponent">admin</button>

    <div>오늘의 경제 단어</div>
    <div style="width: 80vw">
      <div
        class="today-word"
        style="width: 100%; display: flex; justify-content: space-around"
      >
        <div v-for="(row, rowIndex) in todayWords" :key="rowIndex">
          <div v-for="(cell, columnIndex) in row" :key="columnIndex">
            {{ todayWords[rowIndex][columnIndex] }}
          </div>
        </div>
      </div>
      <button @click="moveToCreateWordlist">만들러가자</button>
      <br>
      저장단어장
      <div class="save-wordlist">
        <div v-for="(word, index) in user_saved_wordlist" :key="index">
          {{ word[1] }}
          <div class="word-list-item">
            <button @click="goToStudy(word[0])">학습하기</button>
            <button @click="deleteWordlist(word[0])">삭제하기</button>
          </div>
        </div>
      </div>
      <button @click="refreshPage">새로고침</button>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import { mapState } from "vuex";

export default {
  name: "MainComponent",
  props: ["id", "words"],
  data() {
    return {
      searchQuery: "",
      todayWords: [],
      save_wordlist: [],
      user_saved_wordlist: [],
      localId: null,
    };
  },
  methods: {
    async goToAdminComponent() {
      // "admin" 버튼을 누를 때 AdminComponent로 이동
      this.$router.push({ name: "AdminComponent" });
    },
    async refreshPage() {
      try {
        await this.fetchTodayWords();
        this.user_saved_wordlist = [];
        await this.fetchSavedWordlist();
      } catch (error) {
        console.error("에러:", error);
      }
    },
    async goToStudy(listId) {
      this.$router.push({ name: "StudyComponent", params: { listId } });
    },
    async deleteWordlist(listId) {
      try {
        await axios.delete(`http://localhost:3000/delete_wordlist/${listId}`, {
          data: { userId: this.localId }, 
        });
        console.log(`테이블 ${listId} 삭제됨`);
      } catch (error) {
        console.error("에러:", error);
      }
    },
    async removeWordlistFromUser(listId) {
      try {
        await axios.post("http://localhost:3000/remove_wordlist_from_user", {
          listId,
          userId: this.localId,
        });
        console.log(`user 테이블의 saved_wordlist 업데이트 완료`);
        await this.fetchSavedWordlist(); 
      } catch (error) {
        console.error("에러:", error);
      }
    },
    moveToCreateWordlist() {
      this.$router.push("/create_wordlist");
    },
    async fetchTodayWords() {
      try {
        const response = await axios.get(
          "http://localhost:3000/today_words_data"
        );
        this.todayWords = response.data;
      } catch (error) {
        console.error("에러:", error);
      }
    },
    async fetchSavedWordlist() {
      try {
        const response = await axios.get(
          "http://localhost:3000/save_wordlist",
          {
            params: {
              words: this.words,
              id: this.id,
            },
            withCredentials: true,
          }
        );

        this.save_wordlist = response.data;

        await this.$store.dispatch("fetchUserSavedWordlist");

        const userSavedWordlist =
          this.$store.state.userSavedWordlist[0].split(", ");

        for (let i = 0; i < this.save_wordlist.length; i++) {
          for (let j = 0; j < userSavedWordlist.length; j++) {
            if (
              String(this.save_wordlist[i][0]) === String(userSavedWordlist[j])
            ) {
              this.user_saved_wordlist.push(this.save_wordlist[i]);
            }
          }
        }
      } catch (error) {
        console.error("에러:", error);
      }
    },
  },
  computed: {
    ...mapState(["userSavedWordlist"]),
    isAdmin() {
      return this.localId === "admin";
    },
  },
  async mounted() {
    this.localId = this.id;
    await this.fetchTodayWords();
    await this.fetchSavedWordlist();
  },
  beforeRouteUpdate(to, from, next) {
    this.localId = to.params.id;
    this.fetchTodayWords();
    this.fetchSavedWordlist();
    next();
  },
};
</script>

<style>
.today-word > div {
  width: 20vw;
  height: 8vw;
  background-color: bisque;
  border-radius: 1vw;
}

.save-wordlist {
  width: 100%;
  display: grid;
  justify-content: space-around;
  grid-template-columns: repeat(3, 3fr);
}

.word-list-item {
  width: 20vw;
  height: 6vw;
  background-color: blue;
  border-radius: 1vw;
  color: white;
  align-items: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.save-wordlist > div {
  align-items: center;
  display: flex;
  flex-direction: column;
}
</style>