// pages/index.tsx
import { useEffect, useState } from "react";
import io, { Socket } from "socket.io-client";
import { useTranslation } from 'react-i18next';

let socket: Socket;

export default function Home() {
  const { t, i18n } = useTranslation(); // useTranslation 훅을 사용하여 번역 함수와 언어 설정 함수를 가져옵니다.
  const [messages, setMessages] = useState<string[]>([]);
  const [input, setInput] = useState<string>("");

  useEffect(() => {
    socket = io();

    socket.on("message", (msg: string) => {
      setMessages((prev) => [...prev, msg]);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  const sendMessage = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (input) {
      socket.emit("message", input);
      setInput("");
    }
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <header style={{ display: "flex", alignItems: "center", marginBottom: "20px" }}>
        <h1 style={{ marginRight: "20px" }}>{t('chatService')}</h1>
        <button onClick={() => i18n.changeLanguage('ko')}>{t('korean')}</button>
        <button onClick={() => i18n.changeLanguage('en')} style={{ marginLeft: "10px" }}>{t('english')}</button>
      </header>
      <div style={{
        border: "1px solid #ccc",
        borderRadius: "8px",
        padding: "10px",
        height: "300px",
        overflowY: "scroll",
        backgroundColor: "#f9f9f9",
      }}>
        {messages.map((msg, index) => (
          <div key={index} style={{ padding: "5px", borderBottom: "1px solid #eee" }}>{msg}</div>
        ))}
      </div>
      <form onSubmit={sendMessage} style={{ marginTop: "20px" }}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={t('placeholder')}
          style={{ width: "80%", padding: "10px", borderRadius: "4px", border: "1px solid #ccc" }}
        />
        <button type="submit" style={{ padding: "10px", borderRadius: "4px", marginLeft: "10px" }}>{t('send')}</button>
      </form>
    </div>
  );
}
