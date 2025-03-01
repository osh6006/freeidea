'use client';

import { useEffect } from 'react';

export default function useChannelTalk() {
  useEffect(() => {
    const initializeChannelTalk = () => {
      if (typeof window === 'undefined') return;

      // 중복 실행 방지
      if (window.ChannelIO) {
        console.error('ChannelIO script included twice.');
        return;
      }

      // ChannelIO 초기화
      const ch: IChannelIO = function (...args) {
        ch.c?.(args);
      };

      ch.q = [];
      ch.c = function (args) {
        ch.q!.push(args);
      };

      window.ChannelIO = ch;

      // 스크립트 로드 함수
      const loadScript = () => {
        if (window.ChannelIOInitialized) return;
        window.ChannelIOInitialized = true;

        const script = document.createElement('script');
        script.type = 'text/javascript';
        script.async = true;
        script.src = 'https://cdn.channel.io/plugin/ch-plugin-web.js';

        const firstScript = document.getElementsByTagName('script')[0];
        firstScript.parentNode?.insertBefore(script, firstScript);
      };

      // 로드 상태에 따라 스크립트 로드
      if (document.readyState === 'complete') {
        loadScript();
      } else {
        window.addEventListener('load', loadScript, { once: true });
      }
    };

    // 초기화 실행
    initializeChannelTalk();

    // ChannelIO 부트
    window.ChannelIO?.('boot', {
      pluginKey: process.env.NEXT_PUBLIC_CHANNEL_IO_KEY || '',
    });

    // 정리 함수
    return () => {
      window.ChannelIO?.('shutdown');
    };
  }, []);
}
