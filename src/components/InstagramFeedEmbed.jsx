import React, { useEffect, useRef } from 'react';

const APP_ID = '09955748-449b-400a-b403-d9c18968e354';
const SCRIPT_SELECTOR = 'script[data-elfsight-platform="true"]';

const InstagramFeedEmbed = () => {
  const hostRef = useRef(null);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return undefined;

    host.innerHTML = '';

    const widget = document.createElement('div');
    widget.className = `elfsight-app-${APP_ID}`;
    widget.setAttribute('data-elfsight-app-lazy', '');
    host.appendChild(widget);

    const existingScript = document.querySelector(SCRIPT_SELECTOR);
    if (!existingScript) {
      const script = document.createElement('script');
      script.src = 'https://static.elfsight.com/platform/platform.js';
      script.async = true;
      script.dataset.elfsightPlatform = 'true';
      document.head.appendChild(script);
    }

    return () => {
      host.innerHTML = '';
    };
  }, []);

  return <div ref={hostRef} className="min-h-[240px]" />;
};

export default InstagramFeedEmbed;
