"use client";
import { useEffect, useRef, useState, type ReactNode } from 'react';
import Image from 'next/image';
import { ArrowRight, ArrowLeft, Check, X, ScanLine, FolderOpen, Layers, GraduationCap, Calculator, ShoppingBag, ShieldCheck, Download, ChevronDown, Palette, Gift, Clock3 } from 'lucide-react';
import PriceCalculator from './PriceCalculator';
import { offer, money, checkoutUrl } from '@/config/offer';

const bonuses = [
  { title: '50 Artes Cristãs', image: 'bonus-cristas.webp', text: 'Temas cristãos e inspiracionais para eventos, retiros e presentes.' },
  { title: '50 Artes Gamer', image: 'bonus-gamer.webp', text: 'Mais opções para o público gamer e suas personalizações.' },
  { title: '50 Artes Profissões', image: 'bonus-profissoes.webp', text: 'Ideias para profissões, lembranças corporativas e formaturas.' },
  { title: 'Crie artes com ChatGPT', image: 'bonus-chatgpt.webp', text: 'Aprenda a usar IA para desenvolver ideias e frases para suas artes.' },
];
const benefits = [
  { icon: FolderOpen, title: '+5.000 artes prontas', text: 'Uma biblioteca premium para bottons e ímãs, organizada por temas para você encontrar opções rápido.' },
  { icon: Palette, title: 'Edite no Canva Grátis', text: 'Personalize textos, cores e detalhes sem depender de designer ou começar cada pedido do zero.' },
  { icon: Download, title: 'Prepare para imprimir', text: 'Arquivos em alta qualidade. Confira a escala e faça um teste antes de produzir o lote.' },
  { icon: Clock3, title: 'Ganhe tempo na produção', text: 'Escolha a arte, personalize e concentre seu tempo no pedido, na produção e na divulgação.' },
  { icon: Layers, title: 'Diversos temas', text: 'Animes, filmes, séries, games, música, frases, profissões, pets e muito mais.' },
  { icon: ScanLine, title: 'Principais tamanhos', text: 'Artes organizadas em 3,2 cm, 3,8 cm, 4,4 cm e 5,8 cm. Confira o gabarito do seu equipamento.' },
];
const questions = [
  ['O produto são os bottons e ímãs físicos?', 'O produto é um pacote de artes digitais para você personalizar, imprimir e usar na produção de bottons e ímãs. Peças físicas, equipamentos e materiais não estão incluídos.'],
  ['Como recebo o acesso ao material?', 'Após a confirmação do pagamento, você recebe no e-mail informado na compra as instruções de acesso ao material e aos arquivos editáveis. Confira também a caixa de spam.'],
  ['Preciso pagar o Canva para editar?', 'Não. As artes da oferta são editáveis no Canva Grátis. Você pode personalizar textos, cores e elementos. Recursos pagos que você adicionar por conta própria seguem as regras do Canva.'],
  ['Quais tamanhos estão incluídos?', 'A oferta reúne artes nos tamanhos 3,2 cm, 3,8 cm, 4,4 cm e 5,8 cm. Confira a área de corte, a sangria e o gabarito do seu equipamento antes de imprimir e montar.'],
  ['Qual é a diferença entre os planos?', 'O Starter é um pack reduzido para conhecer o material. O Completo libera a biblioteca com +5.000 artes, curso Bottons do Zero, calculadora de precificação, guia de vendas e nichos, bônus e atualizações.'],
  ['O curso ensina o quê?', 'O Curso Bottons do Zero mostra o fluxo prático: escolha e edição da arte, preparação para impressão, corte e montagem, acabamento, organização da produção e os primeiros passos para apresentar e divulgar seus produtos.'],
  ['Tenho direito às atualizações?', 'As atualizações mensais estão incluídas no Plano Completo. O Starter não inclui curso, ferramentas, bônus ou atualizações.'],
  ['Posso vender o que produzir?', 'Confira as licenças dos elementos e os direitos envolvidos em cada arte, especialmente personagens e marcas. O acesso ao pacote não transfere direitos de terceiros nem autoriza a revenda dos arquivos digitais.'],
  ['Como funciona a garantia?', 'A oferta tem garantia de 30 dias. Se não ficar satisfeito, solicite o reembolso dentro desse prazo pelo canal indicado na compra.'],
];
function CTA({ children = 'QUERO MINHAS ARTES AGORA' }: { children?: ReactNode }) { return <a href="#planos" className="button button-primary">{children}<ArrowRight size={19} /></a>; }
function Checks({ items }: { items: string[] }) { return <ul className="checks">{items.map(item => <li key={item}><Check size={18} /><span>{item}</span></li>)}</ul>; }
function Buy({ plan, children, secondary = false }: { plan: 'basic' | 'complete' | 'upgrade'; children: ReactNode; secondary?: boolean }) {
  return <a className={secondary ? 'starter-continue' : 'button button-primary'} href={offer[plan].checkout} onClick={event => { event.currentTarget.href = checkoutUrl(offer[plan].checkout); }}>{children}<ArrowRight size={18} /></a>;
}
export default function BottonsLanding() {
  const [slide, setSlide] = useState(0);
  const [faq, setFaq] = useState<number | null>(0);
  const [sticky, setSticky] = useState(false);
  const modal = useRef<HTMLDialogElement>(null);
  const touchStart = useRef<number | null>(null);
  function changeSlide(direction: number) { setSlide(current => (current + direction + 8) % 8); }
  function closeModal() { modal.current?.close(); }

  useEffect(() => {
    const timer = window.setInterval(() => setSlide(current => (current + 1) % 8), 4200);
    const revealTargets = Array.from(document.querySelectorAll<HTMLElement>('section .container, .hero-copy, .hero-deliverable, .format-content, .plan, .guarantee > *, .final-section .container'));
    revealTargets.forEach(el => el.classList.add('reveal'));
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => { if (entry.isIntersecting) { entry.target.classList.add('is-visible'); observer.unobserve(entry.target); } });
    }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });
    revealTargets.forEach(el => observer.observe(el));
    const onScroll = () => setSticky(window.scrollY > 760);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => { window.clearInterval(timer); observer.disconnect(); window.removeEventListener('scroll', onScroll); };
  }, []);
  return <>
    <a href="#conteudo" className="skip-link">Pular para o conteúdo</a>
    <div className="announcement"><span>OPORTUNIDADE COM BOTTONS E ÍMÃS PERSONALIZADOS</span><span className="announcement-sep">/</span><span>PAGAMENTO ÚNICO · ACESSO IMEDIATO</span></div>
    <header className="header container">
      <a href="#" className="brand" aria-label="Bottons Pro 5K"><span className="brand-icon"><Palette /></span><span>BOTTONS<span className="brand-pro">PRO</span><small>BIBLIOTECA 5K</small></span></a>
      <nav aria-label="Menu principal"><a href="#acervo">As artes</a><a href="#curso">Curso e ferramentas</a><a href="#planos">Planos</a></nav>
      <a className="nav-cta" href="#planos">QUERO AS ARTES<ArrowRight size={16} /></a>
    </header>
    <main id="conteudo">
      <section className="hero container bottons-hero">
        <div className="hero-copy"><div className="eyebrow"><span className="short-line" /> +5.000 ARTES + CURSO + FERRAMENTAS</div>
          <h1>TRANSFORME SUA MÁQUINA DE BOTTONS EM UMA <span>FÁBRICA DE PERSONALIZADOS.</span></h1>
          <p className="hero-description">Você já tem a máquina. Agora tenha uma biblioteca com milhares de artes, treinamento e ferramentas para escolher o nicho, personalizar, precificar e colocar seus produtos para rodar. <strong>Sem começar cada pedido do zero.</strong></p>
          <div className="hero-chips"><span><Check size={15} /> +5.000 artes</span><span><Check size={15} /> Canva Grátis</span><span><Check size={15} /> Curso incluso no PRO</span></div>
          <CTA>QUERO COLOCAR MINHA MÁQUINA PARA PRODUZIR</CTA><p className="micro hero-price">Planos a partir de <strong>{money(offer.basic.price)}</strong><span>•</span>{offer.guaranteeDays} dias de garantia</p>
        </div>
        <div className="hero-deliverable" aria-roledescription="carrossel" aria-label="Prévias da biblioteca de artes">
          <div
            className="hero-deliverable-stage"
            onTouchStart={e => { touchStart.current = e.touches[0].clientX; }}
            onTouchEnd={e => {
              if (touchStart.current !== null) {
                const diff = e.changedTouches[0].clientX - touchStart.current;
                if (Math.abs(diff) > 40) changeSlide(diff < 0 ? 1 : -1);
                touchStart.current = null;
              }
            }}
          >
            <Image
              src={'/images/bottons/slide-' + (slide + 1) + '.webp'}
              width={700}
              height={900}
              alt={'Prévia ' + (slide + 1) + ' da biblioteca com artes para bottons e ímãs'}
              priority={slide === 0}
              sizes="(max-width: 800px) calc(100vw - 36px), 520px"
              className="hero-deliverable-image"
            />
            <button className="hero-deliverable-arrow hero-deliverable-prev" onClick={() => changeSlide(-1)} aria-label="Arte anterior"><ArrowLeft size={22} /></button>
            <button className="hero-deliverable-arrow hero-deliverable-next" onClick={() => changeSlide(1)} aria-label="Próxima arte"><ArrowRight size={22} /></button>
          </div>
          <div className="hero-deliverable-dots" aria-label="Selecionar prévia">
            {Array.from({length:8},(_,i) => <button key={i} aria-label={'Ver prévia ' + (i+1)} aria-current={slide === i ? 'true' : undefined} className={slide === i ? 'active' : ''} onClick={() => setSlide(i)} />)}
          </div>
        </div>
      </section>
      <div className="format-strip"><div className="container format-content"><span>+5.000 ARTES · QUATRO TAMANHOS</span><div>3,2<i />3,8<i />4,4<i />5,8 <small>cm</small></div><p>Escolha. Edite. Produza.</p></div></div>

      <section className="section factory-section"><div className="container"><div className="factory-grid"><div><p className="eyebrow">O PROBLEMA NÃO É A SUA MÁQUINA</p><h2>VOCÊ JÁ TEM A PRENSA.<br /><span>AGORA TENHA OS PRODUTOS.</span></h2><p className="factory-copy">Máquina parada, pouca variedade e horas criando arte do zero travam a produção. Com uma biblioteca organizada, você consegue abrir opções para novos pedidos muito mais rápido.</p><div className="factory-line">MESMA MÁQUINA. MESMO INSUMO. <strong>PRODUTO DIFERENTE.</strong></div></div><div className="factory-pains">{[['01','Máquina parada','Você investiu no equipamento. Falta ter opções prontas para colocar nele.'],['02','Criando tudo do zero','Cada novo pedido vira horas no Canva procurando inspiração.'],['03','Pouca variedade','Quando o cliente pede outro tema, você precisa recomeçar a busca.']].map(([n,t,d]) => <article key={n}><span>{n}</span><div><h3>{t}</h3><p>{d}</p></div></article>)}</div></div></div></section>

      <section className="section pale-section" id="acervo"><div className="container"><div className="center-title"><p className="eyebrow">A BIBLIOTECA BOTTONS PRO 5K COMEÇA AQUI</p><h2>ESCOLHA O TEMA.<br /><span>ENCONTRE UMA ARTE. PRODUZA.</span></h2><p>Não é um drive jogado com arquivos aleatórios. É uma biblioteca organizada para ampliar seu catálogo e acelerar a escolha do próximo produto.</p></div><div className="benefit-grid">{benefits.map(({icon:Icon,title,text}) => <article className="benefit" key={title}><span className="icon-box"><Icon size={25} /></span><h3>{title}</h3><p>{text}</p></article>)}</div></div></section>

      <section className="section container"><div className="section-top"><div><p className="eyebrow">ESCOLHA SEU NICHO E PRODUZA</p><h2>O CLIENTE TEM UMA IDEIA.<br /><span>VOCÊ TEM OPÇÕES.</span></h2></div><p>Explore as prévias da biblioteca. Uma arte pode ser o ponto de partida para um novo pedido.</p></div>
        <div className="preview-grid">{[2,3,5,8].map(i => <article className="product-card" key={i}><div className="product-image"><Image src={'/images/bottons/slide-'+i+'.webp'} width={600} height={900} alt={'Página de exemplo '+i+' do pacote de artes para bottons e ímãs'} sizes="(max-width: 540px) 45vw, 25vw" /><span className="product-index">0{i}</span></div><p className="category-label">ARTES DO PACOTE</p><h3>Mais ideias para seu catálogo</h3></article>)}</div>
        <div className="topic-tags">{['Animes e séries','Games','Música','Frases','Profissões','Pets','Datas especiais','Personalizados'].map(t => <span key={t}>{t}</span>)}</div><div className="section-action"><CTA>QUERO ACESSAR O ACERVO</CTA></div>
      </section>

      <section className="section mechanism"><div className="container"><div className="section-top"><div><p className="eyebrow">UM CAMINHO SIMPLES PARA SAIR DA IDEIA</p><h2>ESCOLHA. EDITE.<br /><span>PRECIFIQUE. PRODUZA.</span></h2></div><p>Biblioteca, treinamento e ferramentas no mesmo fluxo para você não travar no começo.</p></div><div className="steps">{[
        ['01','Escolha o nicho','Encontre o tema do pedido dentro da biblioteca 5K.'],
        ['02','Edite no Canva','Ajuste texto, cores e detalhes sem precisar criar tudo do zero.'],
        ['03','Precifique com clareza','Some impressão, componentes, tempo, embalagem, taxas e margem.'],
        ['04','Produza e apresente','Monte a peça, fotografe e mostre opções no WhatsApp e Instagram.'],
      ].map(([n,title,text]) => <article className="step" key={n}><div className="step-top"><span>{n}</span><ArrowRight size={23} /></div><h3>{title}</h3><p>{text}</p></article>)}</div></div></section>

      <section className="section container tools-section" id="curso"><div className="center-title"><p className="eyebrow">CURSO + FERRAMENTAS</p><h2>AS ARTES SÃO O COMEÇO.<br /><span>O PRO TE AJUDA A COLOCAR EM PRÁTICA.</span></h2><p>O mesmo mecanismo da biblioteca aplicado ao seu negócio: aprender o processo, entender o preço e saber como apresentar seus produtos.</p></div><div className="tools-grid">
        <article className="tool-card"><div className="tool-card-media"><Image src="/images/bottons/curso-card.webp" width={644} height={362} alt="Curso Bottons do Zero" /></div><div className="tool-card-copy"><span className="pill"><GraduationCap size={15} /> CURSO NO PLANO COMPLETO</span><h3>CURSO BOTTONS DO ZERO</h3><p>Do arquivo ao produto pronto, com uma sequência prática para quem está começando.</p><Checks items={['Arte e personalização no Canva','Impressão, corte e montagem','Acabamento e organização da produção','Fotos e primeiros anúncios']} /></div></article>
        <article className="tool-card"><div className="tool-card-media"><Image src="/images/bottons/calculadora-card.webp" width={644} height={362} alt="Calculadora de precificação para bottons e ímãs" /></div><div className="tool-card-copy"><span className="pill"><Calculator size={15} /> FERRAMENTA DE PRECIFICAÇÃO</span><h3>CALCULADORA DE PREÇO</h3><p>Organize seus custos por peça e simule taxas e margem antes de definir o preço.</p><Checks items={['Componentes e impressão','Tempo de trabalho e embalagem','Taxas sobre a venda','Margem desejada']} /><a href="#calculadora" className="text-link">TESTAR A CALCULADORA <ArrowRight size={17} /></a></div></article>
        <article className="tool-card"><div className="tool-card-media"><Image src="/images/bottons/guia-card.webp" width={644} height={362} alt="Guia de vendas e nichos para bottons e ímãs" /></div><div className="tool-card-copy"><span className="pill"><ShoppingBag size={15} /> GUIA DE VENDAS E NICHOS</span><h3>SAIBA O QUE MOSTRAR E PARA QUEM</h3><p>Um guia prático para escolher nichos e apresentar seus bottons e ímãs no WhatsApp e Instagram.</p><Checks items={['Niches para testar primeiro','Ideias de divulgação','Textos para anúncios e ofertas','Como organizar um catálogo simples']} /><a href="/guia-bottons-imas.html" target="_blank" rel="noopener noreferrer" className="text-link">ABRIR O GUIA <ArrowRight size={17} /></a></div></article>
      </div></section>

      <section className="section pale-section" id="calculadora"><div className="container"><div className="section-top"><div><p className="eyebrow">FERRAMENTA PRÁTICA</p><h2>DESCUBRA QUANTO CUSTA<br /><span>O SEU BOTTON OU ÍMÃ.</span></h2></div><p>Use uma simulação simples para visualizar custo, taxas e margem antes de decidir seu preço.</p></div><PriceCalculator /></div></section>

      <section className="section container"><div className="center-title"><p className="eyebrow">BÔNUS DO PLANO COMPLETO</p><h2>MAIS TEMAS PARA<br /><span>AMPLIAR SUA VITRINE.</span></h2><p>Coleções extras e material de criação para você testar novas ideias sem comprar pack separado.</p></div><div className="bonus-grid">{bonuses.map((b,i) => <article className="bonus-card" key={b.title}><div className="bonus-image"><Image src={'/images/bottons/'+b.image} width={600} height={600} alt={b.title+' — bônus do pacote de artes para bottons e ímãs'} sizes="(max-width:540px) 45vw, 25vw" /><span>BÔNUS 0{i+1}</span></div><div className="bonus-copy"><h3>{b.title}</h3><p>{b.text}</p><span className="included"><Check size={16} /> INCLUÍDO NO COMPLETO</span></div></article>)}</div><div className="bundle-summary"><div><Gift size={28} /><strong>TUDO NO MESMO ACESSO</strong></div><p>+5.000 artes + 150 artes temáticas bônus + curso, calculadora e guia de vendas.</p></div></section>

      <section className="section plans-section" id="planos"><div className="container"><div className="center-title"><p className="eyebrow">ESCOLHA O SEU PLANO</p><h2>COMECE PELO STARTER<br /><span>OU LEVE O SISTEMA COMPLETO.</span></h2><p>Pagamento único. Sem mensalidade. {offer.guaranteeDays} dias de garantia.</p></div><div className="plan-grid">
        <article className="plan starter"><p className="plan-kicker">STARTER</p><h3>PACK REDUZIDO</h3><p className="plan-description">Para conhecer uma parte do material e começar pelo essencial.</p><div className="plan-price"><strong>{money(offer.basic.price)}</strong></div><p className="micro">pagamento único</p><Checks items={['Pack reduzido de artes','Artes editáveis no Canva Grátis','Acesso digital','Garantia de 30 dias']} /><ul className="not-included"><li><X size={16} /> Sem biblioteca completa de +5.000 artes</li><li><X size={16} /> Sem Curso Bottons do Zero</li><li><X size={16} /> Sem Calculadora e Guia</li><li><X size={16} /> Sem bônus e atualizações</li></ul><button className="button button-outline" onClick={() => modal.current?.showModal()}>COMEÇAR PELO STARTER<ArrowRight size={18} /></button><span className="secure"><ShieldCheck size={14} /> Compra em checkout externo</span></article>
        <article className="plan premium"><div className="plan-banner"><Gift size={16} /> O MAIS COMPLETO</div><div className="premium-title"><div><p className="plan-kicker">BOTTONS PRO 5K</p><h3>PLANO COMPLETO</h3></div></div><p className="plan-description">Biblioteca, treinamento e ferramentas para colocar a máquina para produzir.</p><div className="plan-price"><strong>{money(offer.complete.price)}</strong></div><p className="micro">pagamento único • sem mensalidade</p><div className="price-difference">Por <strong>{money(offer.complete.price-offer.basic.price)} a mais</strong>, você libera o sistema completo.</div><Checks items={['Biblioteca com +5.000 artes para bottons e ímãs','Artes editáveis no Canva Grátis','Curso Bottons do Zero','Calculadora de Precificação','Guia de Vendas e Nichos','150 artes temáticas bônus','Material para criar novas artes com IA','Atualizações mensais','Suporte prioritário','Acesso digital e vitalício','Garantia de 30 dias']} /><Buy plan="complete">QUERO O BOTTONS PRO 5K COMPLETO</Buy><span className="secure"><ShieldCheck size={14} /> Compra em checkout externo</span></article>
      </div><div className="payment-notes"><span><ShieldCheck size={18} /> 30 dias de garantia</span><span><Download size={18} /> Produto digital</span><span><Clock3 size={18} /> Acesso após pagamento aprovado</span></div></div></section>

      <section className="guarantee container"><div className="guarantee-seal"><ShieldCheck size={37} /><strong>30</strong><span>DIAS DE GARANTIA</span></div><div><p className="eyebrow">TEMPO PARA CONHECER O MATERIAL</p><h2>ACESSE. EXPLORE.<br /><span>DECIDA COM TRANQUILIDADE.</span></h2><p>Conheça as artes e os materiais do seu plano. Se não ficar satisfeito, solicite o reembolso em até 30 dias pelo canal informado na compra.</p></div></section>

      <section className="section container faq-section" id="duvidas"><div className="faq-intro"><p className="eyebrow">VAMOS ESCLARECER</p><h2>AINDA TEM<br /><span>DÚVIDAS?</span></h2><p>Veja os detalhes das artes, do acesso e dos planos.</p></div><div className="faq-list">{questions.map(([q,a],i) => <article className={'faq-item '+(faq===i?'is-open':'')} key={q}><h3><button aria-expanded={faq===i} aria-controls={'faq-'+i} onClick={() => setFaq(faq===i?null:i)}>{q}<ChevronDown size={20} /></button></h3><div id={'faq-'+i} hidden={faq!==i}><p>{a}</p></div></article>)}</div></section>

      <section className="final-section"><div className="container"><p className="eyebrow">VOCÊ JÁ TEM A MÁQUINA</p><h2>AGORA TENHA<br /><span>OS PRODUTOS.</span></h2><p>+5.000 artes, curso, precificação e guia de vendas<br />em um único acesso.</p><CTA>QUERO ACESSAR O BOTTONS PRO 5K</CTA><p className="micro">A partir de {money(offer.basic.price)} • pagamento único • 30 dias de garantia</p></div></section>
    </main>
    <footer className="footer container"><div className="footer-top"><a className="brand" href="#"><span className="brand-icon"><Palette /></span><span>BOTTONS<span className="brand-pro">PRO</span><small>BIBLIOTECA 5K</small></span></a><nav aria-label="Informações"><a href="#duvidas">Dúvidas</a><a href="#planos">Planos</a><a href="/guia-bottons-imas.html">Guia prático</a></nav></div><p>Produto 100% digital. Bottons, ímãs físicos, equipamentos e insumos não incluídos. Confira direitos e licenças de cada arte antes da produção comercial. Resultados dependem do produto, do preço, da execução e da divulgação.</p><div className="footer-bottom"><span>© {new Date().getFullYear()} Bottons Pro 5K.</span><span>BOTTONS & ÍMÃS.</span></div></footer>
    <div className={'sticky-offer '+(sticky?'visible':'')}><div><span>BOTTONS PRO 5K</span><strong>{money(offer.complete.price)}<small>pagamento único</small></strong></div><a href="#planos">VER PLANOS<ArrowRight size={17} /></a></div>
    <dialog className="upgrade-dialog" ref={modal} aria-labelledby="upgrade-title" onClick={e => {if(e.target===e.currentTarget)closeModal();}}><div className="upgrade-inner"><button className="modal-close" aria-label="Fechar comparação" onClick={closeModal}><X size={22} /></button><span className="icon-box"><Gift size={28} /></span><p className="eyebrow">CONDIÇÃO DE UPGRADE</p><h2 id="upgrade-title">LEVE TAMBÉM<br /><span>TODOS OS BÔNUS.</span></h2><p>Por <strong>{money(offer.upgrade.price-offer.basic.price)} a mais</strong> que o Básico, escolha o Completo por <strong>{money(offer.upgrade.price)}</strong>.</p><Checks items={['Biblioteca completa com +5.000 artes','Curso Bottons do Zero + calculadora + guia','Bônus, atualizações e suporte prioritário']} /><Buy plan="upgrade">QUERO O COMPLETO POR {money(offer.upgrade.price)}</Buy><Buy plan="basic" secondary>Continuar com o Básico por {money(offer.basic.price)}</Buy><span className="secure"><ShieldCheck size={14} /> Os dois planos têm 30 dias de garantia.</span></div></dialog>
  </>;
}
