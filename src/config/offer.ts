// BOTTONS PRO 5K — produto digital de artes para bottons e ímãs.
// Checkouts preservados do projeto original fornecido pelo usuário.
export const offer = {
  brand: 'Bottons Pro 5K',
  guaranteeDays: 30,

  basic: {
    price: 10,
    checkout: 'https://vopax.com.br/c/6fb0159f-8966-4088-b347-b48e8450e548'
  },

  complete: {
    price: 27.0,
    checkout: 'https://vopax.com.br/c/cd24dd4a-bf33-4d38-b940-b4ff5016a1b9'
  },

  upgrade: {
    price: 19.9,
    checkout: 'https://vopax.com.br/c/887fada2-33e1-4ff8-8901-d7b7898e6b11'
  },
};

export const money = (v: number) =>
  v.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  });

export function checkoutUrl(base: string) {
  if (typeof window === 'undefined') return base;

  const url = new URL(base);
  const params = new URLSearchParams(window.location.search);

  [
    'utm_source',
    'utm_medium',
    'utm_campaign',
    'utm_content',
    'utm_term',
    'src',
    'sck',
    'fbclid'
  ].forEach((key) => {
    const v = params.get(key);
    if (v) url.searchParams.set(key, v);
  });

  return url.toString();
}
