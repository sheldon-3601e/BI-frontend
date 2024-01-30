const socket = new WebSocket('ws://localhost:8101/websocket');

socket.addEventListener('open', (event) => {
  console.log('WebSocket连接已建立');
});

socket.addEventListener('message', (event) => {
  const message = event.data;
  console.log('收到消息：', message);
});

socket.addEventListener('close', (event) => {
  if (event.wasClean) {
    console.log('WebSocket连接已关闭');
  } else {
    console.error('WebSocket连接异常断开');
  }
});

socket.addEventListener('error', (error) => {
  console.error('WebSocket连接错误：', error);
});

