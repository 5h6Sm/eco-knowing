<template>
<div id="app">
    <input type="text" v-model="searchQuery" @input="search" placeholder="단어를 검색해보세요" style = "padding-left:1vw; width:80vw; height:1.5vw; border-radius: 0.5vw; border: 0; background-color: #F5F5F5;">
    <ul>
      <li v-for="result in searchResults" :key="result.id">{{ result.name }}</li>
    </ul>
    <div style="width: 80vw; height: 20vw; background-color: aqua; margin:3vw 0 3vw 0; border-radius: 2vw;">
        <img>
    </div>
    <div> 오늘의 경제 단어</div>
    <div  style="width:80vw;">
        <div class = "today-word" style="width:100%; display: flex; justify-content: space-evenly;">
            <div id = "today_word_01"></div>
            <div id = "today_word_02"></div>
            <div id = "today_word_03"></div>
        </div>
        저장단어장
        <div class="save-wordlist">
            
        </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'MainComponent',
  data() {
    return {
      searchQuery: '',
      data: [
        // { id: 1, name: 'Apple' },
        // { id: 2, name: 'Banana' },
        // { id: 3, name: 'Cherry' },
        // { id: 4, name: 'Date' },
        // DB 연결해서 데이터 삽입
      ],
    };
  },
  computed: {
    searchResults() {
      if (this.searchQuery === '') {
        return [];
      }

      return this.data.filter(item =>
        item.name.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    },
  },

};
</script>
<style>
.today-word>div {
    width: 20vw;
    height:8vw;
    background-color: bisque;
    border-radius: 1vw;
}
    
</style>