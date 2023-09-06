import { createStore } from 'vuex';

const store = createStore({
  state: {
    userSavedWordlist: [], 
  },
  mutations: {
    setUserSavedWordlist(state, wordlist) {
      state.userSavedWordlist = wordlist;
    },
    addListId(state, listId) {
      if (!Array.isArray(state.userSavedWordlist)) {
        state.userSavedWordlist = [];
      }
      state.userSavedWordlist.push(listId);
    },
    setUserId(state, userId) {
      state.userId = userId;
    },
    SET_USER_SAVED_WORDLIST(state, userSavedWordlist) {
        state.userSavedWordlist = userSavedWordlist;
      },
      initUserSavedWordlist(state) {
        state.userSavedWordlist = [];
      },
  },
//   actions: {
//     async fetchUserSavedWordlist({ commit }) {
//         try {
//           commit('initUserSavedWordlist'); 
//           const response = await axios.get('http://localhost:3000/save_wordlist');
//           commit('SET_USER_SAVED_WORDLIST', response.data);
//         } catch (error) {
//           console.error('에러:', error);
//         }
//       },
//   },
});

export default store;
