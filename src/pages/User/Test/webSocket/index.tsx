import React, { useState } from 'react';

const WebSocketTest: React.FC = () => {
  const [client, setClient] = useState<WebSocket | null>(null);

  const connectWebSocket = () => {
    const ws = new WebSocket('ws://localhost:8101/api/websocket/11');
    ws.onopen = () => {
      console.log('WebSocket连接已建立');
      setClient(ws);
    };
    ws.onclose = () => {
      console.log('WebSocket连接已关闭');
      setClient(null);
    };
    ws.onerror = (error) => {
      console.error('WebSocket连接错误：', error);
      setClient(null);
    };
    ws.onmessage = (message) => {
      console.log('test message')
      console.log('收到消息：', message.data);
      // 在这里处理收到的消息
    };
  };

  const sendMessage = () => {
    if (client) {
      const message = 'Hello, WebSocket!';
      client.send(message);
    }
  };

  return (
    <div>
      {client ? (
        <button type={'submit'} onClick={sendMessage}>发送消息</button>
      ) : (
        <button type={'submit'} onClick={connectWebSocket}>连接 WebSocket</button>
      )}
    </div>
  );
};

export default WebSocketTest;
