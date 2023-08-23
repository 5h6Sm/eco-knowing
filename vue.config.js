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
        arget: 'http://localhost:3000',
        changeOrigin: false, 
        withCredentials: true, 
      }
    }
  }
})
