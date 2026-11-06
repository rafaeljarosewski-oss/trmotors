/* ============================================================
   TR MOTORS · dados da loja e camada de gravação
   ------------------------------------------------------------
   Dois modos, decididos por TR.supabase abaixo:

   1) LOCAL (padrão) - o estoque mora no IndexedDB do navegador.
      Sem servidor, sem conta, sem custo. Vale por aparelho.

   2) SUPABASE - preencha url + anonKey e o mesmo painel passa a
      gravar na nuvem, e aí o que a loja publica pelo celular
      aparece para todo mundo. Passo a passo no README.md.
   ============================================================ */

const TR = {
  nome: 'TR Motors',
  whatsapp: '5555996887057',
  whatsappExibicao: '(55) 99688-7057',
  instagram: 'https://www.instagram.com/trmotors__',
  instagramUser: '@trmotors__',
  endereco: 'Rua Dez de Novembro, 262',
  bairro: 'Centro · Panambi/RS',
  cep: '98280-000',
  maps: 'https://www.google.com/maps/search/?api=1&query=TR+Motors+R.+Dez+de+Novembro+262+Centro+Panambi+RS+98280-000',

  // CONFIRMAR COM A LOJA antes de publicar. Estes horários não vieram
  // do Instagram nem do link da bio: são um palpite.
  horario: [
    ['Segunda a sexta', '08h30 às 18h30'],
    ['Sábado', '08h30 às 12h00'],
    ['Domingo', 'Plantão pelo WhatsApp'],
  ],

  // --- nuvem (opcional) ---
  supabase: {
    url: '',      // ex.: https://xxxxxxxx.supabase.co
    anonKey: '',  // chave pública anon
  },

  // Senha do painel em modo local. É uma tranca de porta, não um cofre:
  // segura o curioso, não segura quem abre o código da página. No modo
  // Supabase quem manda é o login de verdade, com e-mail e senha.
  senhaPainel: 'trmotors',
};

/* ------------------------------------------------------------
   Estoque inicial
   Montado a partir dos anúncios publicados no @trmotors__.
   Foto = a capa do próprio anúncio, em assets/fotos/.
   Só entrou aqui o que o anúncio diz de fato: onde a loja não
   informou câmbio, ano ou quilometragem, o campo ficou vazio e
   simplesmente não aparece no site.

   A LOJA PRECISA REVISAR: os anúncios são de datas diferentes, então
   parte deste estoque já pode ter sido vendida. Marcar no painel.
   ------------------------------------------------------------ */
// Suba este número toda vez que mexer na lista abaixo. É o que faz o
// catálogo novo chegar em quem já abriu o site alguma vez.
const SEED_VERSAO = 6;

const SEED = [
  { id: 'DZ-TEoWOlwx', faixa: 4, marca: 'Volkswagen', modelo: 'Jetta', versao: 'Highline 2.0 TSI',
    anoMod: 2013, cor: 'Branco', carroceria: 'Sedã', cambio: 'Automático', combustivel: 'Gasolina', destaque: true,
    // álbum enviado pela loja: frente, perfil, traseira, detalhes e interior
    fotos: ['DZ-TEoWOlwx-1', 'DZ-TEoWOlwx-2', 'DZ-TEoWOlwx-3', 'DZ-TEoWOlwx-4',
            'DZ-TEoWOlwx-5', 'DZ-TEoWOlwx-6', 'DZ-TEoWOlwx-7', 'DZ-TEoWOlwx-8'],
    opcionais: ['Pacote GLI', 'Bancos em couro caramelo', 'Paddle shift com extensor', 'Câmbio DSG', 'Molas Eibach', 'Stage 2 Servitec', 'Downpipe', 'Catback', 'Filtro esportivo', 'Ar-condicionado digital', 'Central multimídia'],
    obs: 'Sedã esportivo para quem busca desempenho e uma condução diferenciada.' },

  { id: 'DbMPH0BNFVm', faixa: 4, marca: 'Volkswagen', modelo: 'Golf', versao: 'Highline 1.4 TSI',
    anoMod: 2014, carroceria: 'Hatch', cambio: 'Automático', combustivel: 'Gasolina', destaque: true,
    opcionais: ['Motor 1.4 TSI turbo', 'Câmbio automático DSG', 'Bancos em couro', 'Central multimídia', 'Rodas de liga leve'],
    obs: 'Esportivo, elegante e com desempenho de sobra. Excelente estado de conservação.' },

  { id: 'DdCWBbjtnvp', faixa: 3, marca: 'Chevrolet', modelo: 'Onix', versao: '1.0',
    anoMod: 2025, km: 37000, carroceria: 'Hatch', combustivel: 'Flex', opcionais: [], obs: '' },

  { id: 'Dc4QHDKtKiQ', faixa: 3, marca: 'Hyundai', modelo: 'HB20', versao: '1.0',
    anoMod: 2021, km: 88000, carroceria: 'Hatch', cambio: 'Manual', combustivel: 'Flex',
    opcionais: ['Motor 1.0', 'Câmbio manual', 'Ar-condicionado', 'Direção elétrica', 'Vidros elétricos', 'Travas elétricas', 'Computador de bordo'],
    obs: 'Veículo completo.' },

  { id: 'DdXXMVUtUC5', faixa: 4, marca: 'Volkswagen', modelo: 'up!', versao: 'take 1.0',
    anoMod: 2020, carroceria: 'Hatch', cambio: 'Manual', combustivel: 'Flex',
    opcionais: ['Motor 1.0', 'Câmbio manual', 'Ar-condicionado', 'Direção elétrica', 'Vidros elétricos', 'Travas elétricas'],
    obs: 'Compacto, econômico e perfeito para o dia a dia.' },

  { id: 'DdUhBtiN6YI', faixa: 3, marca: 'Ford', modelo: 'EcoSport', versao: 'Freestyle 1.6',
    anoMod: 2015, km: 138000, carroceria: 'SUV', cambio: 'Manual', combustivel: 'Flex',
    opcionais: [], obs: 'Veículo completo.' },

  { id: 'DdM-yi6Nq3E', faixa: 3, marca: 'Hyundai', modelo: 'HB20S', versao: 'Premium 1.6',
    anoMod: 2015, carroceria: 'Sedã', combustivel: 'Flex', opcionais: [], obs: '' },

  { id: 'DdCMpe9NJVl', faixa: 3, marca: 'Ford', modelo: 'New Fiesta', versao: '1.5 Flex Manual',
    anoMod: 2015, carroceria: 'Hatch', cambio: 'Manual', combustivel: 'Flex',
    opcionais: ['Ar-condicionado', 'Direção elétrica', 'Vidros e travas elétricas', 'Central multimídia', 'Rodas de liga leve', 'Controle de estabilidade', 'Airbags'],
    obs: 'Hatch moderno, econômico e confortável.' },

  { id: 'Dc4WwB_N1fq', faixa: 3, marca: 'Fiat', modelo: 'Strada', versao: '1.4 Cabine Dupla',
    anoMod: 2012, km: 112000, carroceria: 'Picape', cambio: 'Manual', combustivel: 'Flex',
    opcionais: ['Motor 1.4', 'Cabine dupla', 'Câmbio manual', 'Ar-condicionado', 'Direção hidráulica', 'Vidros elétricos', 'Travas elétricas', 'Faróis de neblina'],
    obs: '' },

  { id: 'DdR6lXqtc_w', faixa: 3, marca: 'Hyundai', modelo: 'i30', versao: '2.0',
    anoMod: 2010, carroceria: 'Hatch', combustivel: 'Gasolina', opcionais: [], obs: '' },

];

/* ============================================================
   Utilitários
   ============================================================ */

const CARROCERIAS = ['Hatch', 'Sedã', 'SUV', 'Picape', 'Perua', 'Minivan', 'Outro'];

/* Faixa de valor. O site filtra por ela mas nunca mostra preço: guardamos só
   a faixa, nunca o número, então nem quem abrir o código da página vê quanto
   custa cada carro. A conversa continua começando no WhatsApp. */
const FAIXAS = [
  { n: 1, rot: 'Até R$ 25 mil' },
  { n: 2, rot: 'R$ 25 a 40 mil' },
  { n: 3, rot: 'R$ 40 a 60 mil' },
  { n: 4, rot: 'R$ 60 a 90 mil' },
  { n: 5, rot: 'Acima de R$ 90 mil' },
];
const CAMBIOS = ['', 'Manual', 'Automático', 'Automatizado', 'CVT'];
const COMBUSTIVEIS = ['', 'Flex', 'Gasolina', 'Diesel', 'Etanol', 'Híbrido', 'Elétrico'];
const STATUS = { disponivel: 'Disponível', reservado: 'Reservado', vendido: 'Vendido' };

/** Enquadramento vertical padrão da foto (%).
    As capas dos anúncios trazem o preço numa tarja no topo e a marca
    d'água no rodapé. Mostrando a faixa do meio, sobra só o carro. */
const FOCO_PADRAO = 50;

const uid = () => 'c' + Date.now().toString(36) + Math.random().toString(36).slice(2, 6);

const fmtKm = n => (Number(n) || 0).toLocaleString('pt-BR') + ' km';

const fmtAno = c => (c.anoFab && c.anoMod && c.anoFab !== c.anoMod)
  ? `${c.anoFab}/${c.anoMod}`
  : String(c.anoMod || c.anoFab || '');

const lote = n => String(n ?? 0).padStart(3, '0');

const nomeCarro = c => [c.marca, c.modelo].filter(Boolean).join(' ');

const nomeCompleto = c => [c.marca, c.modelo, c.versao].filter(Boolean).join(' ');

/** Linha de especificação, pulando o que a loja não informou. */
const specs = c => [fmtAno(c), c.km ? fmtKm(c.km) : '', c.cambio, c.combustivel].filter(Boolean);

function waLink(texto) {
  return `https://wa.me/${TR.whatsapp}?text=${encodeURIComponent(texto)}`;
}

function waCarro(c, prefixo) {
  const base = prefixo || 'Olá! Vi este carro no site e quero mais informações:';
  const ficha = [nomeCompleto(c), specs(c).join(' · ')].filter(Boolean);
  return waLink(`${base}\n\n${ficha.join('\n')}`);
}

const esc = s => String(s ?? '').replace(/[&<>"']/g, m => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[m]));

/* ============================================================
   Estoque: IndexedDB local ou Supabase
   ============================================================ */

const Estoque = (() => {
  const DB_NAME = 'trmotors';
  const STORE = 'carros';
  const usaNuvem = !!(TR.supabase?.url && TR.supabase?.anonKey);
  let db = null;
  let sb = null;

  function abrir() {
    if (db) return Promise.resolve(db);
    return new Promise((ok, err) => {
      const req = indexedDB.open(DB_NAME, 1);
      req.onupgradeneeded = () => {
        const d = req.result;
        if (!d.objectStoreNames.contains(STORE)) d.createObjectStore(STORE, { keyPath: 'id' });
      };
      req.onsuccess = () => { db = req.result; ok(db); };
      req.onerror = () => err(req.error);
    });
  }

  function tx(modo, fn) {
    return abrir().then(d => new Promise((ok, err) => {
      const t = d.transaction(STORE, modo);
      const req = fn(t.objectStore(STORE));
      t.oncomplete = () => ok(req && req.result);
      t.onerror = () => err(t.error);
    }));
  }

  async function cliente() {
    if (sb) return sb;
    if (!window.supabase) {
      await new Promise((ok, err) => {
        const s = document.createElement('script');
        s.src = 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/dist/umd/supabase.js';
        s.onload = ok; s.onerror = err;
        document.head.appendChild(s);
      });
    }
    sb = window.supabase.createClient(TR.supabase.url, TR.supabase.anonKey);
    return sb;
  }

  const daLinha = l => ({ ...l.dados, id: l.id, lote: l.lote, status: l.status, ordem: l.ordem });
  const praLinha = c => {
    const { id, lote, status, ordem, ...dados } = c;
    return { id, lote, status: status || 'disponivel', ordem: ordem ?? 0, dados };
  };

  /* Quem já abriu uma versão anterior do site tem o estoque velho salvo no
     navegador, e semear só quando o banco está vazio deixaria essa pessoa
     presa no catálogo antigo para sempre. Por isso a semente é versionada:
     quando SEED_VERSAO muda, os carros que vieram da semente são trocados e
     tudo que a loja cadastrou ou editou fica de pé. */
  const META = '__meta';

  function montarSeed() {
    const agora = Date.now();
    return SEED.map((c, i) => {
      // Por padrão o carro usa uma foto só, com o nome do próprio id. Quando a
      // loja manda o álbum dele, é só listar os arquivos em `fotos`.
      const { fotos, ...resto } = c;
      return {
        status: 'disponivel',
        opcionais: [],
        foco: FOCO_PADRAO,
        ...resto,
        origem: 'seed',
        lote: i + 1,
        ordem: i,
        criadoEm: agora - i * 864e5,
        fotos: (fotos || [c.id]).map(f => `assets/fotos/${f}.jpg`),
      };
    });
  }

  async function init() {
    if (usaNuvem) return;
    const tudo = (await tx('readonly', s => s.getAll())) || [];
    const meta = tudo.find(r => r.id === META);
    const carros = tudo.filter(r => r.id !== META);

    if (!carros.length) return semear();

    // Banco anterior ao versionamento: não dá para saber o que é semente e o
    // que é da loja, então recomeça do zero com o catálogo novo.
    if (!meta) {
      await tx('readwrite', s => s.clear());
      return semear();
    }

    if (meta.seedVersao === SEED_VERSAO) return;

    const daLoja = new Set(carros.filter(c => c.origem !== 'seed').map(c => c.id));
    const velhos = carros.filter(c => c.origem === 'seed').map(c => c.id);
    const novos = montarSeed().filter(c => !daLoja.has(c.id));
    await tx('readwrite', s => {
      velhos.forEach(id => s.delete(id));
      novos.forEach(r => s.put(r));
      s.put({ id: META, seedVersao: SEED_VERSAO });
    });
  }

  async function semear() {
    const registros = montarSeed();
    await tx('readwrite', s => {
      registros.forEach(r => s.put(r));
      s.put({ id: META, seedVersao: SEED_VERSAO });
    });
    return registros;
  }

  async function list() {
    let itens;
    if (usaNuvem) {
      const c = await cliente();
      const { data, error } = await c.from('carros').select('*').order('ordem', { ascending: true });
      if (error) throw error;
      itens = (data || []).map(daLinha);
    } else {
      itens = ((await tx('readonly', s => s.getAll())) || []).filter(r => r.id !== META);
    }
    return itens.sort((a, b) => (a.ordem ?? 0) - (b.ordem ?? 0));
  }

  async function save(carro) {
    const c = { ...carro };
    if (!c.id) c.id = uid();
    if (!c.criadoEm) c.criadoEm = Date.now();
    if (c.ordem == null) c.ordem = 0;
    // A partir do momento em que a loja mexe, o carro deixa de ser semente e
    // não é mais substituído quando o catálogo inicial for atualizado.
    delete c.origem;
    if (usaNuvem) {
      const cli = await cliente();
      const { error } = await cli.from('carros').upsert(praLinha(c));
      if (error) throw error;
    } else {
      await tx('readwrite', s => s.put(c));
    }
    return c;
  }

  async function remove(id) {
    if (usaNuvem) {
      const c = await cliente();
      const { error } = await c.from('carros').delete().eq('id', id);
      if (error) throw error;
    } else {
      await tx('readwrite', s => s.delete(id));
    }
  }

  async function replaceAll(lista) {
    if (usaNuvem) {
      const c = await cliente();
      await c.from('carros').delete().not('id', 'is', null);
      if (lista.length) {
        const { error } = await c.from('carros').insert(lista.map(praLinha));
        if (error) throw error;
      }
    } else {
      await tx('readwrite', s => s.clear());
      await tx('readwrite', s => {
        lista.forEach(c => s.put(c));
        s.put({ id: META, seedVersao: SEED_VERSAO });
      });
    }
  }

  /** Apaga tudo e recoloca o estoque que veio dos anúncios. */
  async function restaurarSeed() {
    await replaceAll([]);
    await semear();
  }

  const Sessao = {
    async entrar(usuario, senha) {
      if (usaNuvem) {
        const c = await cliente();
        const { error } = await c.auth.signInWithPassword({ email: usuario, password: senha });
        if (error) return { ok: false, erro: 'E-mail ou senha incorretos.' };
        return { ok: true };
      }
      if (senha === TR.senhaPainel) {
        sessionStorage.setItem('tr.painel', '1');
        return { ok: true };
      }
      return { ok: false, erro: 'Senha incorreta.' };
    },
    async ativa() {
      if (usaNuvem) {
        const c = await cliente();
        const { data } = await c.auth.getSession();
        return !!data.session;
      }
      return sessionStorage.getItem('tr.painel') === '1';
    },
    async sair() {
      if (usaNuvem) { const c = await cliente(); await c.auth.signOut(); }
      sessionStorage.removeItem('tr.painel');
    },
  };

  async function subirFoto(dataUri, nomeArquivo) {
    if (!usaNuvem) return dataUri;
    const c = await cliente();
    const blob = await (await fetch(dataUri)).blob();
    const caminho = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}-${(nomeArquivo || 'foto').replace(/[^\w.-]/g, '')}`;
    const { error } = await c.storage.from('fotos').upload(caminho, blob, { contentType: blob.type, upsert: false });
    if (error) throw error;
    return c.storage.from('fotos').getPublicUrl(caminho).data.publicUrl;
  }

  return { init, list, save, remove, replaceAll, semear, restaurarSeed, Sessao, subirFoto,
           get modo() { return usaNuvem ? 'nuvem' : 'local'; } };
})();

/* ------------------------------------------------------------
   Reduz a foto antes de guardar. Foto de celular tem 5 MB; aqui
   ela vira uns 200 KB e o site continua abrindo rápido no 4G.
   ------------------------------------------------------------ */
function comprimirImagem(file, maxLado = 1600, qualidade = 0.82) {
  return new Promise((ok, err) => {
    const leitor = new FileReader();
    leitor.onerror = () => err(new Error('Não consegui ler o arquivo.'));
    leitor.onload = () => {
      const img = new Image();
      img.onerror = () => err(new Error('Arquivo de imagem inválido.'));
      img.onload = () => {
        let { width: w, height: h } = img;
        const escala = Math.min(1, maxLado / Math.max(w, h));
        w = Math.round(w * escala); h = Math.round(h * escala);
        const cv = document.createElement('canvas');
        cv.width = w; cv.height = h;
        const ctx = cv.getContext('2d');
        ctx.imageSmoothingQuality = 'high';
        ctx.drawImage(img, 0, 0, w, h);
        const webp = cv.toDataURL('image/webp', qualidade);
        ok(webp.startsWith('data:image/webp') ? webp : cv.toDataURL('image/jpeg', qualidade));
      };
      img.src = leitor.result;
    };
    leitor.readAsDataURL(file);
  });
}
