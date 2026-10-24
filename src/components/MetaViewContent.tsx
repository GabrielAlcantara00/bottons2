'use client';

import { useEffect } from 'react';

type Fbq = ((...args: unknown[]) => void) & {
  callMethod?: (...args: unknown[]) => void;
  queue?: unknown[][];
  loaded?: boolean;
  version?: string;
  push?: (...args: unknown[]) => void;
};

type MetaWindow = Window & {
  fbq?: Fbq;
  _fbq?: Fbq;
  __bottonsViewContentSent?: boolean;
};

function getCookie(name: string) {
  const prefix = `${name}=`;
  const item = document.cookie.split('; ').find((row) => row.startsWith(prefix));
  return item ? decodeURIComponent(item.slice(prefix.length)) : undefined;
}

function getFbc() {
  const existing = getCookie('_fbc');
  if (existing) return existing;

  const fbclid = new URLSearchParams(window.location.search).get('fbclid');
  if (!fbclid) return undefined;

  return `fb.1.${Date.now()}.${fbclid}`;
}

function createEventId() {
  if (typeof crypto !== 'undefined' && 'randomUUID' in crypto) {
    return crypto.randomUUID();
  }
  return `vc_${Date.now()}_${Math.random().toString(36).slice(2, 12)}`;
}

function initMetaPixel(pixelId: string) {
  const win = window as MetaWindow;

  if (!win.fbq) {
    const fbq = function (...args: unknown[]) {
      if (fbq.callMethod) fbq.callMethod(...args);
      else fbq.queue?.push(args);
    } as Fbq;

    if (!fbq) return;
    fbq.queue = [];
    fbq.loaded = true;
    fbq.version = '2.0';
    fbq.push = fbq;
    win.fbq = fbq;
    win._fbq = fbq;

    const script = document.createElement('script');
    script.async = true;
    script.src = 'https://connect.facebook.net/en_US/fbevents.js';
    document.head.appendChild(script);
  }

  win.fbq?.('init', pixelId);
}

export default function MetaViewContent({ pixelId }: { pixelId: string }) {
  useEffect(() => {
    if (!pixelId) {
      if (process.env.NODE_ENV !== 'production') {
        console.warn('[Meta] META_PIXEL_ID não configurado. ViewContent não enviado.');
      }
      return;
    }

    const win = window as MetaWindow;
    if (win.__bottonsViewContentSent) return;
    win.__bottonsViewContentSent = true;

    const eventId = createEventId();
    initMetaPixel(pixelId);

    // Browser Pixel: SOMENTE ViewContent. Não dispara PageView, Lead ou InitiateCheckout.
    win.fbq?.('track', 'ViewContent', {}, { eventID: eventId });

    // Server/CAPI: mesmo event_id para a Meta deduplicar browser + servidor.
    void fetch('/api/meta/view-content', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      keepalive: true,
      body: JSON.stringify({
        eventId,
        eventSourceUrl: window.location.href,
        fbp: getCookie('_fbp'),
        fbc: getFbc(),
      }),
    }).catch(() => {
      // Tracking não deve bloquear nem quebrar a experiência da página.
    });
  }, [pixelId]);

  return null;
}
