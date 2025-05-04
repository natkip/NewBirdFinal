import { io } from 'socket.io-client';
const socket = io('http://localhost:5000'); //Replace with render link in .env
export default socket;