// BOTTONS PRO 5K — produto digital de artes para bottons e ímãs.
// Checkouts preservados do projeto original fornecido pelo usuário.
export const offer = {
  brand: 'Bottons Pro 5K',
  guaranteeDays: 30,
  basic: { price: 10, checkout: 'https://ggcheckout.app/checkout/v5/hP4KHlfuZ0PReMGM5Ets' },
  complete: { price: 27, checkout: 'https://ggcheckout.app/checkout/v5/vSVfQvQfDpfeQlIKSmf0' },
  upgrade: { price: 19.9, checkout: 'https://ggcheckout.app/checkout/v5/NbBS5H7FyEpG2X7D9t2v' },
};
export const money = (v: number) => v.toLocaleString('pt-BR',{style:'currency',currency:'BRL'});
export function checkoutUrl(base: string) {
  if(typeof window==='undefined')return base;
  const url=new URL(base);const params=new URLSearchParams(window.location.search);
  ['utm_source','utm_medium','utm_campaign','utm_content','utm_term','src','sck','fbclid'].forEach(key=>{const v=params.get(key);if(v)url.searchParams.set(key,v);});
  return url.toString();
}
