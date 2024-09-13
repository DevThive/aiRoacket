// i18n.ts
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import Backend from 'i18next-http-backend';

i18n
  .use(Backend)
  .use(initReactI18next)
  .init({
    lng: 'ko', // 기본 언어 설정
    fallbackLng: 'ko', // 언어가 없는 경우 기본 언어로 설정
    interpolation: {
      escapeValue: false,
    },
    resources: {
      ko: {
        translation: {
          chatService: "채팅 서비스",
          placeholder: "메시지를 입력하세요",
          send: "전송",
          english: "English",
          korean: "한국어",
        },
      },
      en: {
        translation: {
          chatService: "Chat Service",
          placeholder: "Enter your message",
          send: "Send",
          english: "English",
          korean: "Korean",
        },
      },
    },
  });

export default i18n;
