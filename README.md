# TR Motors · catálogo virtual

Site de catálogo da TR Motors (Panambi/RS) com painel próprio para a loja
publicar os carros que entram no pátio e marcar os que saíram.

Preto e branco, sem gradiente e sem sombra: a única coisa colorida da página é
a foto do carro. Toda a régua empurra para o mesmo lugar, a conversa no
WhatsApp. **Nenhum preço aparece em tela.** Onde estaria o preço aparece
"valor sob consulta" com o motivo explicado (entrada, troca e prazo mudam a
conta) e um botão que abre o WhatsApp com a mensagem já escrita, citando o
carro.

---

## Arquivos

| Arquivo | O que é |
|---|---|
| `index.html` | O site que o cliente vê |
| `admin.html` | O painel da loja |
| `assets/theme.css` | Cores, fontes e componentes |
| `assets/store.js` | Dados de contato, estoque inicial e camada de gravação |
| `assets/fotos/` | Fotos dos carros, padronizadas em 4:3 |
| `assets/marcas/` | Logos monocromáticos das montadoras |
| `assets/marca.png` | Logo da loja |
| `supabase.sql` | Banco da nuvem, para sincronizar entre aparelhos |

Não tem build, não tem npm, não tem servidor. São arquivos estáticos.

---

## De onde vieram os carros

Os carros que já estão no site foram montados a partir dos **anúncios
publicados no @trmotors__**: modelo, versão, ano, quilometragem, opcionais e
observações saíram da legenda de cada post. A foto de cada carro é a **capa do
próprio anúncio**.

Duas coisas importantes:

1. **Onde o anúncio não informou, o campo ficou vazio.** Vários posts não dizem
   câmbio ou quilometragem, então esses carros simplesmente não mostram esse
   dado. Nada foi preenchido por chute. Quando a loja souber, é só completar
   pelo painel.

2. **Só entrou carro com foto no padrão.** O critério é a primeira foto do
   Jetta: três quartos dianteiro, carro nivelado, corpo inteiro no quadro, sem
   texto e sem pessoas. Quem não passava saiu do ar, e volta assim que a loja
   mandar uma foto nesse enquadramento. Prioridade para Renegade, Corolla,
   Amarok e Fusion, que são os carros mais fortes do estoque.

3. **A loja precisa revisar o que já foi vendido.** Os anúncios são de datas
   diferentes, então parte desse estoque provavelmente já saiu. Tudo entrou
   como "no pátio"; basta abrir o painel e clicar em *Marcar vendido* no que
   não estiver mais disponível. Leva uns dois minutos.

### Se você mexer na lista de carros do código

O estoque inicial fica salvo no navegador de quem visita. Só semear quando o
banco está vazio deixaria essas pessoas presas no catálogo antigo para sempre,
então a semente é versionada: ao editar `SEED` em `assets/store.js`, **suba
também o `SEED_VERSAO` logo acima**. Na próxima visita, os carros que vieram da
semente são trocados pelos novos, e tudo que a loja cadastrou ou editou pelo
painel continua de pé.

### As fotos

As artes do Instagram vêm em 9 por 16, com tarja preta em cima e embaixo
carregando a marca d'água e o preço. Cada uma foi recortada para **1200 por 900,
no padrão 4 por 3**, aproveitando só a faixa da foto, então o preço não aparece
nem dentro do arquivo. As cinco em que o texto ficava sobre a foto foram
enquadradas na mão. Para fotos novas que a loja subir, a ficha do painel tem o
controle **Enquadramento**, com prévia ao vivo.

### Faixa de valor

O site filtra por faixa de preço mas **nunca mostra valor**. Cada carro guarda
apenas a faixa (1 a 5), nunca o número, então nem quem abrir o código da página
descobre quanto custa. O filtro serve para qualificar quem chega, e a conversa
continua começando no WhatsApp. A faixa se define na ficha do painel.

### O banner da capa

A capa hoje reveza quatro fotos do próprio estoque. Para trocar por um banner
próprio, coloque o arquivo em `assets/` e substitua a lista `CAPA` no
`index.html` pelo caminho dele.

---

## Publicar

**Netlify** (é onde o link da bio já mora): arraste a pasta `trmotors` inteira
para o painel do Netlify.

**GitHub Pages**: suba a pasta para um repositório e ligue Pages na branch
`main`, raiz.

Depois de publicar, troque em `index.html` o `canonical` e o `og:image` pela
URL real. Sem `og:image` absoluto o preview do link não aparece no WhatsApp,
que é justamente por onde o site vai circular.

---

## Os dois modos de funcionamento

### Modo local (é como vem)

O estoque fica gravado no navegador do próprio aparelho (IndexedDB). O painel
funciona por inteiro: cadastra, edita, sobe foto, marca vendido.

O limite é esse: o que a loja cadastrar no computador da loja fica no
computador da loja. Quem abrir o site do celular vê o estoque que veio junto
com o arquivo, não as alterações. Para valer para todo mundo, ligue a nuvem.

Senha do painel em modo local: `trmotors`. Troque em `assets/store.js`, na
linha `senhaPainel`. Isso é uma tranca de porta, não um cofre: segura o
curioso, não segura quem abre o código da página.

### Modo nuvem (Supabase, plano gratuito)

O que a loja publicar pelo celular aparece no site na hora, para qualquer
visitante. Login de verdade, com e-mail e senha.

1. Crie uma conta em [supabase.com](https://supabase.com) e um projeto novo.
2. Abra **SQL Editor**, cole o conteúdo de `supabase.sql` e rode.
3. Em **Authentication > Users > Add user**, crie o usuário da loja
   (marque *Auto Confirm User*).
4. Em **Authentication > Providers > Email**, desligue *Enable sign ups*,
   para ninguém criar conta sozinho.
5. Em **Project Settings > API**, copie *Project URL* e a chave *anon public*.
6. Cole as duas em `assets/store.js`:

```js
supabase: {
  url: 'https://xxxxxxxx.supabase.co',
  anonKey: 'eyJhbGciOi...',
},
```

**Levando o estoque local para a nuvem:** antes de colar as chaves, abra o
painel e clique em **Backup**. Depois de ligar a nuvem, entre de novo e clique
em **Restaurar**, escolhendo o arquivo baixado.

---

## Usando o painel

Abra `admin.html` (ou clique em *Painel da loja* no rodapé do site).

- **Novo carro** abre a ficha. Só marca e modelo são obrigatórios; o resto
  aparece no site conforme for preenchido, e o que ficar em branco não aparece.
- **Fotos**: arraste várias de uma vez. A primeira é a capa, e as setas
  reordenam. Cada foto é reduzida para no máximo 1600px e convertida para
  WebP, então uma foto de 5 MB do celular vira uns 200 KB.
- **Enquadramento** escolhe que parte da foto aparece no corte 4 por 3.
- **Marcar vendido** não apaga o carro: ele sai da vitrine principal e passa a
  aparecer em preto e branco, com selo, para quem ligar o "mostrar vendidos".
  Prova social de graça, e o botão dele vira "ver parecidos", que também cai no
  WhatsApp.
- **Setas para cima e para baixo** mudam a ordem da vitrine.
- **Backup** baixa um `.json` com o estoque inteiro. Faça isso de vez em
  quando, principalmente antes de trocar de aparelho ou de navegador.

---

## Mexer nos dados da loja

Tudo que é informação fixa está no topo de `assets/store.js`, no objeto `TR`:
telefone do WhatsApp, Instagram, endereço, link do mapa e horários. Mudou o
horário? Edite ali e muda no site inteiro de uma vez.

**Falta confirmar com a loja:** os horários de atendimento em `TR.horario` são
um palpite, não vieram do Instagram nem do link da bio. Estão marcados com
`CONFIRMAR COM A LOJA` no código.

---

## Detalhes que valem saber

- **Link direto para um carro**: abrir a ficha muda o endereço para
  `...#carro=<id>`. Esse link leva o visitante direto na ficha, com foto e
  botão de WhatsApp. Serve para a loja responder no WhatsApp com o link do
  carro exato em vez de digitar a ficha toda.
- **Site e painel abertos ao mesmo tempo**: o site se atualiza sozinho quando o
  painel salva algo, sem apertar F5.
- **Teclado na ficha**: setas trocam a foto, Esc fecha. No celular, arrastar de
  lado troca a foto.
- O mapa é um iframe do Google, sem chave de API, em escala de cinza e
  carregado só quando chega perto na rolagem.
