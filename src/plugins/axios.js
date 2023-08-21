import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:3000', // 노드 서버의 주소
  withCredentials: true,
});

export default instance;
