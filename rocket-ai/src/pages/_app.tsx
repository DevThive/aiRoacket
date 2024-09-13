// pages/_app.tsx
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { appWithTranslation } from 'next-i18next'; // next-i18next에서 가져오기

import i18n from '../../i18n'; // i18n 설정 파일을 가져옵니다.

function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

export default appWithTranslation(App); // appWithTranslation으로 래핑
