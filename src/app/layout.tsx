import type { Metadata } from 'next';
import Script from 'next/script';
import MetaViewContent from '@/components/MetaViewContent';
import './globals.css';

export const metadata: Metadata = {
  title: 'Bottons Pro 5K | +5.000 Artes, Curso e Ferramentas',
  description: 'Biblioteca com +5.000 artes para bottons e ímãs, editáveis no Canva, com curso Bottons do Zero, calculadora de precificação, guia de vendas e bônus no plano completo.',
  icons: { icon: '/icon.svg' },
};

export default function RootLayout({children}:Readonly<{children:React.ReactNode}>){
  const metaPixelId = process.env.META_PIXEL_ID ?? '';

  return (
    <html lang="pt-BR">
      <head>
        <link rel="preload" href="/fonts/montserrat-variable.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
        <link rel="preload" href="/fonts/inter-variable.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
      </head>
      <body>
        {children}

        {/* UTMify — adiado até a janela ficar ociosa para não competir com o LCP */}
        <Script
          id="utmify-utms"
          src="https://cdn.utmify.com.br/scripts/utms/latest.js"
          strategy="lazyOnload"
          data-utmify-prevent-xcod-sck=""
          data-utmify-prevent-subids=""
        />

        {/* Meta: envia SOMENTE ViewContent no browser + CAPI */}
        <MetaViewContent pixelId={metaPixelId} />
      </body>
    </html>
  );
}
