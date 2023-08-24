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
            <div v-for="(row, rowIndex) in todayWords" :key="rowIndex">
              <div v-for="(cell, columnIndex) in row" :key = "columnIndex">
                {{ todayWords[rowIndex][columnIndex] }}
              </div>
            </div>
        </div>
        저장단어장
        <div class="save-wordlist" style="width:100%; display: flex; justify-content: space-evenly;">
          <div v-for="(row, rowIndex) in save_wordlist" :key = "rowIndex">
            {{ save_wordlist[rowIndex][1] }}
            <!-- <div v-for="(cell, columnIndex) in row" :key = "columnIndex">
            </div> -->
          </div>
        </div>
    </div>
  </div>
</template>
<script>
import axios from 'axios';
export default {
  name: 'MainComponent',
  data() {
    return {
      searchQuery: '',
      todayWords: [],
      save_wordlist : [],
    };
  },
created(){
  axios.get('http://localhost:3000/today_words_data').then(response => {
    this.todayWords = response.data;
  })
  axios.get('http://localhost:3000/save_wordlist').then(response => {
    this.save_wordlist = response.data;
  })

}

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