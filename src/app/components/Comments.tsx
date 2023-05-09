"use client"

import { useEffect, useRef } from 'react';

export default function Comments() {
  const commentsRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const scriptEl = document.createElement('script');
    scriptEl.src = 'https://utteranc.es/client.js';
    scriptEl.async = true;
    scriptEl.crossOrigin = 'anonymous';
    scriptEl.setAttribute('repo', 'JeonH503/dev-blog');
    scriptEl.setAttribute('issue-term', 'pathname');
    scriptEl.setAttribute('theme', 'github-light');
    scriptEl.setAttribute('label', 'comment');

    commentsRef.current?.appendChild(scriptEl);
  }, []);

  return <section ref={commentsRef} />;
}