import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Bottons Pro 5K | +5.000 Artes, Curso e Ferramentas',
  description: 'Biblioteca com +5.000 artes para bottons e ímãs, editáveis no Canva, com curso Bottons do Zero, calculadora de precificação, guia de vendas e bônus no plano completo.',
  icons: { icon: '/icon.svg' },
};

export default function RootLayout({children}:Readonly<{children:React.ReactNode}>){
  return <html lang="pt-BR"><body>{children}</body></html>;
}
