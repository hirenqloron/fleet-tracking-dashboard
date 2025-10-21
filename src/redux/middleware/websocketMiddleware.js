import { updateVehiclesFromWebSocket, setWebSocketConnected } from '../slices/vehicleSlice';
import { updateStatisticsFromWebSocket } from '../slices/statisticsSlice';

const websocketMiddleware = (store) => {
  let ws = null;

  return (next) => (action) => {
    switch (action.type) {
      case 'websocket/connect':
        if (ws !== null) {
          ws.close();
        }

        ws = new WebSocket('wss://case-study-26cf.onrender.com');

        ws.onopen = () => {
          console.log('WebSocket Connected');
          store.dispatch(setWebSocketConnected(true));
        };

        ws.onmessage = (event) => {
          const data = JSON.parse(event.data);
          
          if (data.vehicles) {
            store.dispatch(updateVehiclesFromWebSocket(data.vehicles));
          }
          if (data.statistics) {
            store.dispatch(updateStatisticsFromWebSocket(data.statistics));
          }
        };

        ws.onerror = (error) => {
          console.error('WebSocket Error:', error);
          store.dispatch(setWebSocketConnected(false));
        };

        ws.onclose = () => {
          console.log('WebSocket Disconnected');
          store.dispatch(setWebSocketConnected(false));
        };
        break;

      case 'websocket/disconnect':
        if (ws !== null) {
          ws.close();
          ws = null;
        }
        store.dispatch(setWebSocketConnected(false));
        break;

      default:
        break;
    }

    return next(action);
  };
};

export default websocketMiddleware;

export const connectWebSocket = () => ({ type: 'websocket/connect' });
export const disconnectWebSocket = () => ({ type: 'websocket/disconnect' });