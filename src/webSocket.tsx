export const connectWebSocket = (userId: string, openNotification: () => void) => {
  const ws = new WebSocket(`ws://localhost:8101/api/websocket/${userId}`);
  ws.onopen = () => {
    console.log('WebSocket连接已建立');
  };
  ws.onclose = () => {
    console.log('WebSocket连接已关闭');
  };
  ws.onerror = (error) => {
    console.error('WebSocket连接错误：', error);
  };
  ws.onmessage = (message) => {
    console.log('Received message:', message.data);
    openNotification();
  };
};
