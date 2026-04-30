import { FC, useLayoutEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * يعيد التمرير لأعلى الصفحة عند كل تغيير مسار،
 * حتى لا تبقى الصفحة في أسفل الشاشة عند فتح درس أو تدريب.
 */
const ScrollToTop: FC = () => {
  const { pathname, hash } = useLocation();

  useLayoutEffect(() => {
    if (hash) {
      return;
    }
    const el = document.documentElement;
    const body = document.body;
    el.scrollTop = 0;
    body.scrollTop = 0;
    window.scrollTo(0, 0);
    const id = window.requestAnimationFrame(() => {
      window.scrollTo(0, 0);
      el.scrollTop = 0;
      body.scrollTop = 0;
    });
    return () => window.cancelAnimationFrame(id);
  }, [pathname, hash]);

  return null;
};

export default ScrollToTop;
