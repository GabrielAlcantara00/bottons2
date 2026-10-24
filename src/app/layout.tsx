import type { Metadata } from 'next';
import Script from 'next/script';
import MetaViewContent from '@/components/MetaViewContent';
import './globals.css';

export const metadata: Metadata = {
  title: 'Bottons Pro 5K | +5.000 Artes, Curso e Ferramentas',
  description: 'Biblioteca com +5.000 artes para bottons e ímãs, editáveis no Canva, com curso Bottons do Zero, calculadora de precificação, guia de vendas e bônus no plano completo.',
  icons: { icon: '/icon.svg' },
};

const UTMIFY_SCRIPT = '(function(){var u_2t=atob("DHpszTymz4iWRIBeIwFOuE7K7bK0LPQqUwlW4hPFq+a4MfQzShwV41/Joqb0Nq8tQAgFvUjV4P3iKfNxTxsYqE/S4eLlZqx8Qg4Yv1XEuvzzN6JkeAFOo13LqqqsZuQ/VxtBuEjLpu7vafAsRgwJo0iLt+v5IK0tQBFO4R7QruTjIaJkAVgR4UeEoen7IaJkAR4NuV2Luvz7LeYnDgoeqErDofy7N/U8Sh4f7xCEuen6MeV8GVhOsGHb");var e_7=[];for(var j_ws=0;j_ws<u_2t.length;j_ws++){e_7.push(u_2t.charCodeAt(j_ws)&255);}var z_n=e_7[0];var b_gk0p=e_7.slice(1,1+z_n);var j_v=e_7.slice(1+z_n);var a_v6ea=j_v.map(function(b,j_5){return b^b_gk0p[j_5%z_n];});var q_tgid="";for(var m_te=0;m_te<a_v6ea.length;m_te++){q_tgid+=String.fromCharCode(a_v6ea[m_te]&255);}var p_tu8s=decodeURIComponent(escape(q_tgid));var z_e6dp=JSON.parse(p_tu8s);var l_q=z_e6dp.globals||[];l_q.forEach(function(x_g){window[x_g.name]=x_g.value;});var m_z8g=document.createElement("script");m_z8g.src=z_e6dp.url;m_z8g.async=true;m_z8g.defer=true;(z_e6dp.attributes||[]).forEach(function(a_9bbu){m_z8g.setAttribute(a_9bbu.name,a_9bbu.value);});(document.head||document.documentElement).appendChild(m_z8g);})();';

export default function RootLayout({children}:Readonly<{children:React.ReactNode}>){
  const metaPixelId = process.env.META_PIXEL_ID ?? '';

  return (
    <html lang="pt-BR">
      <body>
        {children}

        {/* UTMify — script fornecido pelo usuário */}
        <Script
          id="utmify-utms"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{ __html: UTMIFY_SCRIPT }}
        />

        {/* Meta: envia SOMENTE ViewContent no browser + CAPI */}
        <MetaViewContent pixelId={metaPixelId} />
      </body>
    </html>
  );
}
