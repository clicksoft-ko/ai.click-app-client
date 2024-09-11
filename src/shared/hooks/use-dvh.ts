import { useEffect } from 'react';

const useDvh = () => {
  useEffect(() => {
    function setScreenHeight() {
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty('--vh', `${vh}px`);
    }

    setScreenHeight();

    // resize 이벤트가 발생하면 다시 계산하도록 아래 코드 추가
    window.addEventListener('resize', setScreenHeight);
    return () => window.removeEventListener('resize', setScreenHeight);
  }, []);
}

export { useDvh }
