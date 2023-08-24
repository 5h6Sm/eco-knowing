const { defineConfig } = require('@vue/cli-service')

module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    proxy: {
      '/login_data': {
        target: 'http://localhost:3000',
        changeOrigin: false, 
        withCredentials: true, 
      },
      '/signup_data' : {
        target: 'http://localhost:3000',
        changeOrigin: false, 
        withCredentials: true, 
      },
      '/today_words_data' : {
        target: 'http://localhost:3000',
        changeOrigin: false, 
        withCredentials: true, 
      },
      '/save_wordlist' : {
        target: 'http://localhost:3000',
        changeOrigin: false, 
        withCredentials: true, 
      }
    }
  }
})
