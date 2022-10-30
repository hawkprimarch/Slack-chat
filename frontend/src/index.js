import ReactDOM from 'react-dom/client';
import { io } from 'socket.io-client';
import init from './init.jsx';

const runApp = () => {
  const socket = io();
  const app = init(socket);
  ReactDOM.createRoot(document.getElementById('root')).render(app);
};

runApp();
