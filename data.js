// ============================================================
// DATA.JS - HAIROS COMPLETO (9 CATEGORIAS | 135 ITENS) - CORRIGIDO
// ============================================================

// ============================================================
// LISTA DE ITENS POR CATEGORIA (para exibir no sheet)
// ============================================================
var categoriaItensMap = {
  ferramentas: [
    'Secador Iônico Pro',
    'Chapinha de Titânio',
    'Modelador Automático',
    'Escova Rotativa',
    'Máquina de Corte',
    'Difusor Profissional',
    'Escova Alisadora',
    'Modelador Cônico',
    'Prancha Infravermelho',
    'Touca Térmica',
    'Escova Modeladora',
    'Prancha com Vapor',
    'Secador de Viagem',
    'Kit Pentes de Corte',
    'Difusor Universal'
  ],
  acessorios: [
    'Touca de Cetim',
    'Claw Clip Gigante',
    'Scrunchie de Seda',
    'Pente Desenrolador',
    'Faixa Acolchoada',
    'Escova Polvo',
    'Fronha de Cetim',
    'Bobes de Veludo',
    'Presilhas Minimalistas',
    'Massageador de Couro',
    'Tiara Esportiva',
    'Elásticos Invisíveis',
    'Rede Protetora',
    'Prendedor de Silicone',
    'Kit Pente e Escova'
  ],
  solucoes: [
    'Sérum Antiqueda',
    'Tônico de Crescimento',
    'Óleo Anti-Frizz',
    'Shampoo Antioleosidade',
    'Ampola Reconstrutora',
    'Protetor Térmico',
    'Leave-in Reparador',
    'Esfoliante Capilar',
    'Spray de Volume',
    'Máscara Matizadora',
    'Sérum Iluminador',
    'Condicionador Leave-in',
    'Máscara de Hidratação',
    'Spray Fixador',
    'Óleo Reparador Noturno'
  ],
  maquiagem: [
    'Base Líquida HD',
    'Corretivo Alta Cobertura',
    'Pó Compacto Translúcido',
    'Blush Líquido',
    'Delineador Líquido',
    'Máscara de Cílios',
    'Batom Matte',
    'Paleta de Sombras',
    'Primer Facial',
    'Spray Fixador',
    'Kit Pincéis',
    'Lápis de Sobrancelha',
    'Iluminador Líquido',
    'Delineador de Lábios',
    'Removedor Bifásico'
  ],
  penteados: [
    'Coque Baixo Elegante',
    'Trança Box Braids',
    'Ondas Hollywoodianas',
    'Rabo de Cavalo Alto',
    'Trança Embutida',
    'Cachos Definidos',
    'Half Up Half Down',
    'Trança Nagô',
    'Penteado Noiva',
    'Baby Hair Estilizado',
    'Trança Francesa',
    'Coque Bagunçado',
    'Rabo Trançado',
    'Ondas de Praia',
    'Penteado Updo'
  ]
};

// ============================================================
// KITS DE COLORAÇÃO E CUIDADOS
// ============================================================
var coloracaoKits = {
  kits: [{
    nome: 'Kit Keune',
    badge: 'Comercial',
    link: 'https://meli.la/1GbiW7M',
    produtos: 'Tinta Color + Semi Color + Oxidante 20 vol + Ativador de Cor'
  }, {
    nome: 'Kit L\'Oréal',
    badge: 'Técnico',
    link: 'https://meli.la/28LpPj2',
    produtos: 'Tinta INOA + Tonalizante Dia Color + Oxidante 20 vol + Revelador 9 vol'
  }]
};

var cuidadosKits = {
  kits: [{
    nome: 'Kit Kerastase',
    badge: 'Premium',
    marca: 'kerastase',
    link: 'https://meli.la/1MwSY7v',
    produtos: 'Shampoo Nutritive + Condicionador Resistance + Máscara Genesis + Leave-In Elixir Ultime'
  }, {
    nome: 'Kit L\'Oréal Expert',
    badge: 'Profissional',
    marca: 'loreal',
    link: 'https://meli.la/2nmeunk',
    produtos: 'Shampoo Vitamino Color + Condicionador Absolut Repair + Máscara Nutrioil + Sérum Pro Longer'
  }, {
    nome: 'Kit Joico',
    badge: 'Hidratação',
    marca: 'joico',
    link: 'https://meli.la/2x9xqBe',
    produtos: 'Shampoo Moisture Recovery + Condicionador + Máscara Intensa + Leave-In K-PAK'
  }]
};

// ============================================================
// FUNÇÃO CREATE CARD - CORRIGIDA PARA TODAS AS 9 CATEGORIAS
// ============================================================
var styleData = {};

function createCard(id, categoria, corte, title, desc, img, variants) {
  var finalVariants = [];
  
  // ============================================================
  // 1. SEMPRE usa as próprias imagens do item (variants) 
  //    ou fallback para a imagem principal
  // ============================================================
  var ownImages = Array.isArray(variants) && variants.length > 0 
    ? variants.slice(0, 3) 
    : [img];
  
  if (ownImages.length === 0) ownImages = [img];

  // Adiciona as imagens próprias como variações (marcadas como own: true)
  ownImages.forEach(function(imgUrl) {
    finalVariants.push({ 
      img: imgUrl, 
      corte: corte, 
      title: title, 
      desc: desc, 
      own: true 
    });
  });

  // ============================================================
  // 2. Busca outros itens da MESMA CATEGORIA para completar 10 variações
  //    - CORREÇÃO: TODAS as 9 categorias estão mapeadas aqui
  // ============================================================
  var allProducts = [];
  var sourceData = [];

  // MAPEAMENTO COMPLETO DAS 9 CATEGORIAS
  if (categoria === 'corte') sourceData = cortesData;
  else if (categoria === 'coloracao') sourceData = coloracoesData;
  else if (categoria === 'produto') sourceData = produtosData;
  else if (categoria === 'kit') sourceData = kitsData;
  else if (categoria === 'ferramentas') sourceData = ferramentasData;
  else if (categoria === 'acessorios') sourceData = acessoriosData;
  else if (categoria === 'solucoes') sourceData = solucoesData;
  else if (categoria === 'maquiagem') sourceData = maquiagemData;
  else if (categoria === 'penteados') sourceData = penteadosData;

  // Coleta todos os itens da mesma categoria, EXCETO o atual
  if (sourceData && sourceData.length > 0) {
    sourceData.forEach(function(item) {
      var idItem = item[0];
      if (idItem !== id) {
        var variantsItem = item[6] || [];
        allProducts.push({
          id: idItem,
          categoria: item[1],
          corte: item[2],
          title: item[3],
          desc: item[4],
          img: item[5],
          variants: variantsItem.slice(0, 3)
        });
      }
    });
  }

  // Embaralha para ter variedade
  for (var i = allProducts.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var temp = allProducts[i];
    allProducts[i] = allProducts[j];
    allProducts[j] = temp;
  }

  // Remove duplicatas (por id)
  var unique = [];
  var seen = {};
  allProducts.forEach(function(product) {
    if (!seen[product.id]) {
      seen[product.id] = true;
      unique.push(product);
    }
  });

  // ============================================================
  // 3. Pega 7 itens de outros produtos da mesma categoria
  //    (ou menos, se não houver suficientes)
  // ============================================================
  var needed = 10 - finalVariants.length; // 10 - 3 = 7
  var otherProducts = unique.slice(0, needed);
  
  // Se não houver 7 outros itens, repete alguns próprios para completar
  while (otherProducts.length < needed) {
    var fallbackImg = ownImages[Math.floor(Math.random() * ownImages.length)];
    otherProducts.push({
      id: 'fallback_' + Date.now() + '_' + Math.random(),
      corte: corte,
      title: title,
      desc: desc,
      img: fallbackImg,
      variants: [fallbackImg],
      isFallback: true
    });
  }

  // Adiciona os outros produtos como variações (marcadas como own: false)
  otherProducts.forEach(function(product) {
    var otherImg = (product.variants && product.variants.length > 0) 
      ? product.variants[0] 
      : product.img;
    finalVariants.push({ 
      img: otherImg, 
      corte: product.corte, 
      title: product.title, 
      desc: product.desc, 
      own: false,
      isFallback: product.isFallback || false
    });
  });

  // ============================================================
  // 4. GARANTE que temos exatamente 10 variações
  // ============================================================
  while (finalVariants.length < 10) {
    var fallbackImg = ownImages[Math.floor(Math.random() * ownImages.length)];
    finalVariants.push({ 
      img: fallbackImg, 
      corte: corte, 
      title: title, 
      desc: desc, 
      own: true,
      isFallback: true
    });
  }

  // ============================================================
  // 5. Retorna o objeto do card
  // ============================================================
  return {
    id: id,
    categoria: categoria,
    corte: corte,
    title: title,
    desc: desc,
    img: img,
    variants: finalVariants,
    otherProductsData: otherProducts,
    coloracao: coloracaoKits,
    cuidados: cuidadosKits,
    linkML: 'https://mercadolivre.com.br/' + id,
    altura: Math.random() < 0.5 ? 'h-md' : 'h-lg',
    isUserPhoto: id && id.startsWith('user_')
  };
}

function addItemsToStyleData(dataArray) {
  dataArray.forEach(function(item) {
    var id = item[0],
      cat = item[1],
      corte = item[2],
      title = item[3],
      desc = item[4],
      img = item[5],
      variants = item[6];
    styleData[id] = createCard(id, cat, corte, title, desc, img, variants);
  });
}

// ============================================================
// 1. CORTES (15 itens)
// ============================================================
var cortesData = [
  ['velvet-bob', 'corte', 'Velvet Bob', 'Bob Texturizado',
    'Bob com camadas internas que criam volume sem peso. Ideal para cabelos finos que precisam de movimento.',
    'https://i.pinimg.com/736x/d7/a8/8c/d7a88c60e5f7ce217264486e3fc506f4.jpg',
    ['https://i.pinimg.com/736x/4a/d9/5b/4ad95bf7e6b141aadff33031fd09e9c5.jpg',
     'https://i.pinimg.com/736x/8d/9d/d7/8d9dd736af07495c8cd74672e0c88476.jpg',
     'https://i.pinimg.com/736x/bf/d5/70/bfd57032bcaddc8df549a25c2f5ee43e.jpg']
  ],
  ['pixie-cut', 'corte', 'Pixie Cut', 'Corte Curto Texturizado',
    'Corte curto e prático com volume no topo. Perfeito para quem busca um visual moderno e de fácil manutenção.',
    'https://i.pinimg.com/736x/34/27/f8/3427f83ed4451e1e17aa9822e4201d96.jpg',
    ['https://i.pinimg.com/736x/c7/96/f6/c796f647e8e72985856e0032ffba1bd1.jpg',
     'https://i.pinimg.com/736x/86/95/8b/86958b5ee0a8cbf5e0082666ef203ed7.jpg',
     'https://i.pinimg.com/736x/25/f3/7a/25f37a9f5dd2740755ba53f3f3f4f313.jpg']
  ],
  ['butterfly-cut', 'corte', 'Butterfly Cut', 'Camadas em Asa',
    'Camadas em formato de asas que emolduram o rosto e mantêm o comprimento. Ótimo para dar leveza aos fios.',
    'https://i.pinimg.com/736x/08/ab/69/08ab69db905060f2e62a6bed57d3e74e.jpg',
    ['https://i.pinimg.com/736x/5d/03/57/5d03576e6204c75b1bcd95d3f60c0e49.jpg',
     'https://i.pinimg.com/736x/35/83/99/358399b0b37e83d864a58c0237875a9d.jpg',
     'https://i.pinimg.com/736x/31/19/fb/3119fb4703a12cd9867c83cc38be904e.jpg']
  ],
  ['blunt-cut', 'corte', 'Blunt Cut', 'Corte Reto Preciso',
    'Corte reto e preciso, sem camadas. Realça a densidade e o peso dos fios, com acabamento marcante.',
    'https://i.pinimg.com/736x/06/15/ff/0615ff8b4ad4d40cf86d8f738b91eb44.jpg',
    ['https://i.pinimg.com/736x/87/1e/58/871e58b257c2ea53fbf7d71e76ffac3d.jpg',
     'https://i.pinimg.com/736x/37/06/de/3706de631afd06d34889c7957cea2ac1.jpg',
     'https://i.pinimg.com/736x/d6/ad/6e/d6ad6ed52b34ec8c0864345b5a79f80b.jpg']
  ],
  ['shaggy-hair', 'corte', 'Shaggy Hair', 'Camadas Desconectadas',
    'Camadas desconectadas e franja despretensiosa. Estilo despojado com textura e movimento natural.',
    'https://i.pinimg.com/736x/e7/6a/22/e76a22e038cba1d1daad41e6f2238004.jpg',
    ['https://i.pinimg.com/736x/6b/2f/c2/6b2fc2069e0ab8ba141565ea5e582d58.jpg',
     'https://i.pinimg.com/736x/c9/2d/a3/c92da3565d7caf7b75db3fdceb30533f.jpg',
     'https://i.pinimg.com/236x/99/7b/f9/997bf983affdcdec08562f8a02c374b6.jpg']
  ],
  ['long-bob', 'corte', 'Long Bob', 'Bob Ombro Inclinado',
    'Base na altura dos ombros com leve inclinação frontal. Versátil e fácil de modelar.',
    'https://i.pinimg.com/736x/63/fc/05/63fc05a4610ab0214e2e74e3d6a0014f.jpg',
    ['https://i.pinimg.com/736x/96/ed/ba/96edbad796f6419dde511218d30b4a89.jpg',
     'https://i.pinimg.com/736x/97/12/55/971255981aaef5c19d234cbe7bb15b5b.jpg',
     'https://i.pinimg.com/736x/20/e5/0e/20e50e3d7d91ea1c77739beef358253e.jpg']
  ],
  ['french-bob', 'corte', 'French Bob', 'Chanel com Franja',
    'Chanel curto na altura do maxilar com franja reta. Clássico, sofisticado e atemporal.',
    'https://i.pinimg.com/1200x/fa/83/3a/fa833a9f5008d52cbf0f86a0665bbe15.jpg',
    ['https://i.pinimg.com/736x/dd/80/09/dd80099cba2352f7f65c919016a5dbe1.jpg',
     'https://i.pinimg.com/736x/e0/df/ae/e0dfaebb413bd160699c30d24725a3fe.jpg',
     'https://i.pinimg.com/736x/55/45/71/5545719a22d414ab9294aa7baa9e4fff.jpg']
  ],
  ['italian-bob', 'corte', 'Italian Bob', 'Bob com Repicados',
    'Bob na altura do pescoço com repicados internos. Dá corpo e movimento sem perder a estrutura.',
    'https://i.pinimg.com/736x/f5/fe/29/f5fe294a026ca252b16fdfb6eab958e5.jpg',
    ['https://i.pinimg.com/1200x/8e/f9/30/8ef93086d8b7f7754433ce6ca6e9d011.jpg',
     'https://i.pinimg.com/1200x/ed/80/40/ed8040ed4f0bcdb6c8ada69f3503f9c6.jpg',
     'https://i.pinimg.com/736x/84/57/ef/8457ef1450b5557e181cad27cd6f06a7.jpg']
  ],
  ['wolf-cut', 'corte', 'Wolf Cut', 'Topo Volumoso',
    'Topo volumoso e curto que afina em camadas até a nuca. Visual selvagem e cheio de atitude.',
    'https://i.pinimg.com/736x/2a/eb/88/2aeb88213907101e1792b014a75fb4b3.jpg',
    ['https://i.pinimg.com/736x/e2/ab/f8/e2abf8b4b139df7b29c8551f40d4d338.jpg',
     'https://i.pinimg.com/736x/57/2d/3c/572d3c6920502f1be25599787049d8bb.jpg',
     'https://i.pinimg.com/236x/b0/e3/9a/b0e39ade429a2a9d8ccf5f031a254593.jpg']
  ],
  ['bixie-cut', 'corte', 'Bixie Cut', 'Híbrido Pixie-Bob',
    'Híbrido de pixie e bob: prático, desfiado e com movimento. Ideal para transição de cortes.',
    'https://i.pinimg.com/736x/4e/66/83/4e66838f18fe2212fa8ac412d9985447.jpg',
    ['https://i.pinimg.com/736x/ff/cb/e9/ffcbe9b68c10a9bf44b1610bbc6c3c0f.jpg',
     'https://i.pinimg.com/736x/24/39/90/243990bf81ae8af3e11281d755177fba.jpg',
     'https://i.pinimg.com/1200x/12/48/cb/1248cb0903da34be6111206cb6cf9468.jpg']
  ],
  ['curtain-bang', 'corte', 'Curtain Bang', 'Franja Cortininha',
    'Franja dividida ao meio que abre como uma cortina, emoldurando o rosto suavemente.',
    'https://i.pinimg.com/736x/c7/83/c4/c783c422b3a1b9b4a980b2c3a472118f.jpg',
    ['https://i.pinimg.com/736x/ac/71/25/ac7125df02150a4f398ba23f8cb8e343.jpg',
     'https://i.pinimg.com/736x/00/36/fc/0036fc75d702f60260c763706898f947.jpg',
     'https://i.pinimg.com/736x/e1/69/0a/e1690a55e7cc557de8fc4d8d9a29b171.jpg']
  ],
  ['modern-mullet', 'corte', 'Modern Mullet', 'Laterais Curtas',
    'Laterais e topo curtos contrastando com comprimento alongado na nuca. Estilo ousado e moderno.',
    'https://i.pinimg.com/736x/20/58/ac/2058ac84b233324378f9e26d578ef819.jpg',
    ['https://i.pinimg.com/236x/e6/a1/82/e6a1828757f3ecd53a78bdd550faaba6.jpg',
     'https://i.pinimg.com/1200x/19/ed/cf/19edcf705faee3021dca36773177f62a.jpg',
     'https://i.pinimg.com/1200x/16/64/f9/1664f9eaac25d965bc1c2d6741fda93b.jpg']
  ],
  ['clavicut', 'corte', 'Clavicut', 'Altura da Clavícula',
    'Corte reto na altura da clavícula. Um médio versátil que combina com qualquer textura.',
    'https://i.pinimg.com/1200x/11/d9/e1/11d9e1a01d57ed8d1ea57700a636fa74.jpg',
    ['https://i.pinimg.com/736x/f6/fd/10/f6fd109767ac8c5eecc8eff4627a29b4.jpg',
     'https://i.pinimg.com/1200x/15/70/d8/1570d81bf27679068906d1bbec402541.jpg',
     'https://i.pinimg.com/736x/80/64/7b/80647beb8342644f1b0495329ae5dc5b.jpg']
  ],
  ['octopus-cut', 'corte', 'Octopus Cut', 'Topo Arredondado',
    'Topo arredondado e volumoso com camadas inferiores mais finas. Visual leve e cheio de personalidade.',
    'https://i.pinimg.com/1200x/99/a7/7c/99a77c4f583bad5a0d1c9319f44ade9b.jpg',
    ['https://i.pinimg.com/1200x/fe/b3/81/feb381a2026228724751dcf1770a61b8.jpg',
     'https://i.pinimg.com/736x/4e/ad/cc/4eadcc3c07ced2c32c6093d75c1667ff.jpg',
     'https://i.pinimg.com/736x/0c/9c/67/0c9c6782b990579ddbbe6fc28d341d75.jpg']
  ],
  ['hush-cut', 'corte', 'Hush Cut', 'Camadas Profundas',
    'Camadas profundas e leves com franja transparente. Corte suave e de acabamento natural.',
    'https://i.pinimg.com/736x/7c/1b/0b/7c1b0bae28ed1074ae441064c1d40b0b.jpg',
    ['https://i.pinimg.com/236x/27/65/7d/27657de35a3184d3bb88750265351f1e.jpg',
     'https://i.pinimg.com/736x/b0/2f/4f/b02f4f74b719d47b218c06dc1f19c224.jpg',
     'https://i.pinimg.com/736x/f0/8c/0e/f08c0e6a8009f431e0cee00ade8e28bb.jpg']
  ]
];

// ============================================================
// 2. COLORAÇÕES (15 itens)
// ============================================================
var coloracoesData = [
  ['ombre-tiger-eye', 'coloracao', 'Ombré Tiger Eye', 'Transição Dourada',
    'Transição suave do escuro para o dourado. Efeito olho de tigre.',
    'https://i.pinimg.com/1200x/fc/77/96/fc7796a5b8212a0fd41f43792ede5351.jpg',
    ['https://i.pinimg.com/1200x/fc/77/96/fc7796a5b8212a0fd41f43792ede5351.jpg',
     'https://i.pinimg.com/736x/45/26/d3/4526d3bd85f723c62b5d376a21575ae5.jpg',
     'https://i.pinimg.com/736x/80/f3/bb/80f3bbce1fb5bb37fd8c921cd8ada7d2.jpg']
  ],
  ['babylights-morena', 'coloracao', 'Babylights Morena', 'Luzes Finíssimas',
    'Luzes finíssimas que imitam o efeito natural do sol.',
    'https://i.pinimg.com/1200x/37/c9/1c/37c91cbb94c03b8a37157bf367a3dfbc.jpg',
    ['https://i.pinimg.com/736x/69/c8/3b/69c83bfd72fd3022f6a6dc49b2b3f232.jpg',
     'https://i.pinimg.com/1200x/66/33/b3/6633b3d5f27363ed895a7cb870e20c78.jpg',
     'https://i.pinimg.com/736x/dd/7d/8e/dd7d8e39cea64d3f335fe067c8dd14b2.jpg']
  ],
  ['contour-highlights', 'coloracao', 'Contour Highlights', 'Luzes Estratégicas',
    'Luzes estratégicas que valorizam o formato do rosto.',
    'https://i.pinimg.com/736x/a2/8b/0d/a28b0d206e5cc72f3ba38aafa9ad8031.jpg',
    ['https://i.pinimg.com/736x/81/cf/e1/81cfe196df3e580425a842f6af8f12e3.jpg',
     'https://i.pinimg.com/736x/30/0a/83/300a83dfb89f41edbeb57061216538f4.jpg',
     'https://i.pinimg.com/1200x/41/4f/e3/414fe3a069ba01def6a66d44ac222636.jpg']
  ],
  ['balayage-loira', 'coloracao', 'Balayage Loira', 'Luzes Naturais',
    'Técnica de luzes naturais com efeito degradê e movimento.',
    'https://i.pinimg.com/736x/67/53/d4/6753d4546e18a5b6e121879b4e45a5f5.jpg',
    ['https://i.pinimg.com/736x/67/53/d4/6753d4546e18a5b6e121879b4e45a5f5.jpg',
     'https://i.pinimg.com/1200x/9c/38/2e/9c382e31a4eaafd69ce5d685d82f238b.jpg',
     'https://i.pinimg.com/1200x/85/03/4b/85034b9e76143badec90e47cdac4ae36.jpg']
  ],
  ['californianas', 'coloracao', 'Californianas', 'Efeito Sol',
    'Luzes que criam um efeito de sol californiano.',
    'https://i.pinimg.com/736x/c7/92/25/c7922574476f525938331938daf277f7.jpg',
    ['https://i.pinimg.com/736x/c7/92/25/c7922574476f525938331938daf277f7.jpg',
     'https://i.pinimg.com/736x/9b/30/3c/9b303c2040de9482f8391090b7cf8cfa.jpg',
     'https://i.pinimg.com/1200x/80/f3/bb/80f3bbce1fb5bb37fd8c921cd8ada7d2.jpg']
  ],
  ['mechas-contour', 'coloracao', 'Mechas Contour', 'Contorno Facial',
    'Luzes que contornam o rosto, iluminando e valorizando.',
    'https://i.pinimg.com/1200x/05/42/66/05426622b672a5271cdfcd4813595269.jpg',
    ['https://i.pinimg.com/1200x/05/42/66/05426622b672a5271cdfcd4813595269.jpg',
     'https://i.pinimg.com/1200x/ba/ea/88/baea88db56d4ee70ac25ef7ebe6b4bfa.jpg',
     'https://i.pinimg.com/1200x/48/ee/44/48ee440c6712e07c385f64752e866ae9.jpg']
  ],
  ['highlights-loira', 'coloracao', 'Highlights Loira', 'Luzes Loiras',
    'Luzes suaves que adicionam dimensão e brilho ao cabelo loiro.',
    'https://i.pinimg.com/1200x/6f/04/f7/6f04f7f22120c572e80a8d903f0f2baf.jpg',
    ['https://i.pinimg.com/1200x/6f/04/f7/6f04f7f22120c572e80a8d903f0f2baf.jpg',
     'https://i.pinimg.com/736x/be/54/1b/be541bc6bb2d9f143c119d52059c66cf.jpg',
     'https://i.pinimg.com/736x/1c/47/4d/1c474dc342e307953abf1eccd45328b1.jpg']
  ],
  ['cherry-cola', 'coloracao', 'Cherry Cola', 'Vermelho Cereja',
    'Tom ruivo intenso com nuances de cereja e cola. Vibrante.',
    'https://i.pinimg.com/736x/72/3a/68/723a6849cd6b74d8aa9b1282cfceb7c9.jpg',
    ['https://i.pinimg.com/736x/d8/23/26/d823267f6084eb8dbea4746f9e460be2.jpg',
     'https://i.pinimg.com/736x/90/60/51/906051584632065dce1b7fca1ece5763.jpg',
     'https://i.pinimg.com/736x/42/23/86/422386d026423c26b09624fc191d1a43.jpg']
  ],
  ['cowgirl-copper', 'coloracao', 'Cowgirl Copper', 'Cobre Western',
    'Tom cobre intenso com inspiração western. Moderno e ousado.',
    'https://i.pinimg.com/1200x/7a/d4/f4/7ad4f49a2f9604293e2bc16d65a6d30f.jpg',
    ['https://i.pinimg.com/1200x/7a/d4/f4/7ad4f49a2f9604293e2bc16d65a6d30f.jpg',
     'https://i.pinimg.com/736x/39/11/3b/39113b115f5d033e0bd7a1e57a5edb74.jpg',
     'https://i.pinimg.com/736x/9c/aa/f0/9caaf070bac7c0b853e549a47cc288b5.jpg']
  ],
  ['ruivo-doce-leite', 'coloracao', 'Ruivo Doce de Leite', 'Ruivo Caramelo',
    'Tom ruivo com nuances carameladas e suaves. Sofisticado.',
    'https://i.pinimg.com/736x/8a/7c/d4/8a7cd4c0523d1384c8ac71d6b97b1541.jpg',
    ['https://i.pinimg.com/736x/8a/7c/d4/8a7cd4c0523d1384c8ac71d6b97b1541.jpg',
     'https://i.pinimg.com/736x/25/ed/9d/25ed9dab8e2bb53ac9a17b4085e16ab2.jpg',
     'https://i.pinimg.com/736x/a0/b7/97/a0b79786127d2d317058cfff431c0e8e.jpg']
  ],
  ['grisalhos-frios', 'coloracao', 'Grisalhos Frios', 'Cinza Prateado',
    'Transição natural com tons de cinza prateado. Sofisticação.',
    'https://i.pinimg.com/1200x/0f/8b/f7/0f8bf776c83fa00d99150792aac564fd.jpg',
    ['https://i.pinimg.com/1200x/50/4e/3e/504e3eb7e864269f264fab931c66029d.jpg',
     'https://i.pinimg.com/1200x/9f/b2/70/9fb270e7b385a9fc5ce8c3b449c8e125.jpg',
     'https://i.pinimg.com/1200x/90/22/62/9022623353025ec025251d0fca6ae41a.jpg']
  ],
  ['grisalhos-quentes', 'coloracao', 'Grisalhos Quentes', 'Cinza Avermelhado',
    'Transição com tons de cinza mais quentes e acinzentados.',
    'https://i.pinimg.com/736x/1e/aa/75/1eaa7549f9babe98cf52aee19771aa68.jpg',
    ['https://i.pinimg.com/736x/1e/aa/75/1eaa7549f9babe98cf52aee19771aa68.jpg',
     'https://i.pinimg.com/1200x/41/63/44/41634453f9941572a5af4e64a9c74792.jpg',
     'https://i.pinimg.com/1200x/4c/40/15/4c401595bc0d22513d8815de3769e552.jpg']
  ],
  ['mocha-mousse', 'coloracao', 'Mocha Mousse', 'Marrom Café',
    'Marrom intenso com nuances suaves que lembram o café com leite.',
    'https://i.pinimg.com/1200x/2b/aa/ea/2baaea4f4dc0674819552e1a00063c01.jpg',
    ['https://i.pinimg.com/736x/9b/15/b9/9b15b9e256a6114b5148bee2650c1364.jpg',
     'https://i.pinimg.com/1200x/d3/2d/74/d32d74825bfa044d8bb2251ccc5357a4.jpg',
     'https://i.pinimg.com/1200x/e9/c4/f9/e9c4f9b7f739f33ef4841e5e28aaed25.jpg']
  ],
  ['expensive-brunette', 'coloracao', 'Expensive Brunette', 'Morena Premium',
    'Morena com reflexos estratégicos que criam um visual caro e sofisticado.',
    'https://i.pinimg.com/736x/9b/15/b9/9b15b9e256a6114b5148bee2650c1364.jpg',
    ['https://i.pinimg.com/1200x/3e/b2/3d/3eb23d9fc16593ff95825fe42012d267.jpg',
     'https://i.pinimg.com/736x/8f/6b/78/8f6b789b5615427c79df5610a0049d89.jpg',
     'https://i.pinimg.com/1200x/be/c8/00/bec8003024f2f36eac5a7bbf2aa8eba1.jpg']
  ],
  ['vanilla-blonde', 'coloracao', 'Vanilla Blonde', 'Loira Baunilha',
    'Loira suave e cremosa com tons de baunilha e caramelo.',
    'https://i.pinimg.com/736x/0f/d3/d1/0fd3d1b4918ed11c72d2fca3e8c8a8a7.jpg',
    ['https://i.pinimg.com/736x/36/2e/76/362e768aeb7ed3f16afb82c85bf8bb7e.jpg',
     'https://i.pinimg.com/736x/e8/31/c4/e831c4a68d507a47952ab3ab3349209f.jpg',
     'https://i.pinimg.com/736x/b7/15/82/b71582e483db5ee57b2dee5002605dd5.jpg']
  ]
];

// ============================================================
// 3. PRODUTOS (15 itens)
// ============================================================
var produtosData = [
  ['kerastase-resistance-shampoo', 'produto', 'Kérastase Resistance Shampoo',
    'Força e Reconstrução',
    'Shampoo fortalecedor da linha Resistance, com Tecnologia Fibra-Kératine. Reconstrói a fibra capilar danificada, reduzindo a quebra e devolvendo resistência e elasticidade aos fios.',
    'https://i.pinimg.com/1200x/82/3a/72/823a7254a510ec701bcee0e480ba8315.jpg',
    ['https://i.pinimg.com/736x/78/c0/a0/78c0a0db1783a7951c45cf16793df640.jpg',
     'https://i.pinimg.com/1200x/82/3a/72/823a7254a510ec701bcee0e480ba8315.jpg',
     'https://i.pinimg.com/1200x/88/0c/ad/880cadbbbe402961bb3bc96bb3b5ca54.jpg']
  ],
  ['kerastase-resistance-conditioner', 'produto', 'Kérastase Resistance Conditioner',
    'Reconstrução Diária',
    'Condicionador da linha Resistance que nutre e reconstrói a fibra capilar. Deixa os fios mais fortes, macios e com brilho intenso, ideal para cabelos danificados.',
    'https://i.pinimg.com/736x/fa/45/3b/fa453bcb817656633d0c07edf6aa8050.jpg',
    ['https://i.pinimg.com/736x/cb/3a/6a/cb3a6a212e772729875a40bf24d531f8.jpg',
     'https://i.pinimg.com/736x/24/0e/b1/240eb125b9e37fe19a69d67fe456df27.jpg',
     'https://i.pinimg.com/736x/ab/d4/6f/abd46fc8a83389a59dd9b55eb16037f9.jpg']
  ],
  ['kerastase-resistance-mask', 'produto', 'Kérastase Resistance Mask',
    'Reconstrução Profunda',
    'Máscara de tratamento intensivo da linha Resistance. Com ação profunda, reconstrói a fibra capilar danificada por processos químicos e térmicos, devolvendo força e vitalidade.',
    'https://i.pinimg.com/736x/8d/eb/c3/8debc3b7fb7a7e165e3870776c00c7e6.jpg',
    ['https://i.pinimg.com/1200x/13/c3/75/13c37585028872dc32a4297eee127e6e.jpg',
     'https://i.pinimg.com/736x/a0/2e/cf/a02ecf93acaae6f8bf0aa5d91d0ffa71.jpg',
     'https://i.pinimg.com/736x/3a/64/48/3a6448de3f6a44a84b7cab17c7a11071.jpg']
  ],
  ['kerastase-chronologiste-oil', 'produto', 'Kérastase Chronologiste Oil',
    'Óleo Regenerador',
    'Óleo capilar regenerador com tecnologia Quantum. Nutre, repara e protege os fios, proporcionando brilho extremo e maciez. Ideal para cabelos danificados e ressecados.',
    'https://i.pinimg.com/1200x/59/d8/dd/59d8dd9ea4a78fdeb7e0b420ffcdda0a.jpg',
    ['https://i.pinimg.com/736x/59/c0/57/59c0570e163d499dc010ccd33581ce6d.jpg',
     'https://i.pinimg.com/736x/51/d7/7d/51d77d1ba30e0bd6e67cb598001aadbd.jpg',
     'https://i.pinimg.com/736x/e5/63/30/e56330b7327b151f6085b8daa5aa6a8e.jpg']
  ],
  ['kerastase-thermique', 'produto', 'Kérastase Resistance Thermique',
    'Protetor Térmico',
    'Protetor térmico da linha Resistance que prepara os fios para secagem e modelagem. Protege até 230°C, evitando danos causados pelo calor e preservando a saúde capilar.',
    'https://i.pinimg.com/736x/f6/62/3d/f6623df560fe941b4fce33574488031c.jpg',
    ['https://i.pinimg.com/736x/a4/3d/4e/a43d4e01816a1ac5f01f449c1e4ddf5e.jpg',
     'https://i.pinimg.com/736x/b4/8d/97/b48d9783d0ab18919321f36e1386c0bc.jpg',
     'https://i.pinimg.com/1200x/5f/fd/db/5ffddb136e62711a585f1c040fe847ad.jpg']
  ],
  ['joico-moisture-shampoo', 'produto', 'Joico Moisture Shampoo',
    'Hidratação Intensa',
    'Shampoo hidratante da linha Moisture Recovery com tecnologia Bio-Advanced Peptide Complex. Restaura a umidade dos cabelos secos e danificados, devolvendo maciez e brilho.',
    'https://i.pinimg.com/736x/76/24/51/7624516be549ec68f4b74a9d481fe8c2.jpg',
    ['https://thekit.ca/wp-content/uploads/2023/07/Sized-Inline-2-Metal-Detox.jpg',
     'https://i.pinimg.com/736x/aa/91/ef/aa91ef7f58d2efed392dea3444690a5d.jpg',
     'https://i.pinimg.com/1200x/e3/93/4c/e3934c0c465aa33ef0c295d9fb6e5e65.jpg']
  ],
  ['joico-moisture-conditioner', 'produto', 'Joico Moisture Conditioner',
    'Nutrição e Maciez',
    'Condicionador da linha Moisture Recovery que nutre e desembaraça os fios. Proporciona hidratação profunda, maciez e proteção contra agressores externos.',
    'https://i.pinimg.com/1200x/d6/b4/fc/d6b4fc118f3fdfa53cb3a9e842a4da52.jpg',
    ['https://i.pinimg.com/736x/21/23/3f/21233f6f00420dfd920ff5deda8f32f1.jpg',
     'https://i.pinimg.com/736x/ec/b3/8b/ecb38bd4b30677f9ec9b63fb3b274c6e.jpg',
     'https://i.pinimg.com/736x/7b/f8/b2/7bf8b2cb9df40798577467ce0953004f.jpg']
  ],
  ['joico-moisture-mask', 'produto', 'Joico Moisture Mask',
    'Hidratação Profunda',
    'Máscara de hidratação intensiva da linha Moisture Recovery. Repõe a umidade perdida, recupera a elasticidade e devolve o brilho a cabelos secos e danificados.',
    'https://i.pinimg.com/1200x/6d/38/3b/6d383b8f18eae583c30adb655611d86d.jpg',
    ['https://i.pinimg.com/1200x/45/cc/98/45cc98b8de46cd2c214dde346fd16ed1.jpg',
     'https://i.pinimg.com/736x/2b/b8/31/2bb831c5fd89a70851841665fae8b96b.jpg',
     'https://i.pinimg.com/1200x/ff/d2/b9/ffd2b9808ccc298af28afb560b59c9ad.jpg']
  ],
  ['joico-color-endure', 'produto', 'Joico Color Endure Shampoo',
    'Proteção de Cor',
    'Shampoo da linha Color Endure que protege a cor e intensifica o brilho. Com Tecnologia Peptide Complex, prolonga a durabilidade da coloração e mantém os fios saudáveis.',
    'https://i.pinimg.com/1200x/7b/72/ce/7b72ce51623ca5386e74a59598dc9de3.jpg',
    ['https://i.pinimg.com/1200x/0c/26/86/0c26865afb8790fd2e02a2714cb5e683.jpg',
     'https://i.pinimg.com/1200x/c8/01/3f/c8013fa8af539f27af838956ccd3effe.jpg',
     'https://i.pinimg.com/736x/18/6e/5a/186e5aab3bba985de96fe34acca5d2ea.jpg']
  ],
  ['joico-defy-damage', 'produto', 'Joico Defy Damage Shampoo',
    'Defesa Antidano',
    'Shampoo da linha Defy Damage com Tecnologia Smart Release. Protege contra danos diários, poluição e calor, fortalecendo a fibra capilar e prevenindo a quebra e o ressecamento.',
    'https://i.pinimg.com/1200x/47/dd/21/47dd2172feacdaee8088c8119187edf3.jpg',
    ['https://i.pinimg.com/736x/7f/b9/b8/7fb9b8eae64870529b3c85c71e352f42.jpg',
     'https://i.pinimg.com/1200x/22/10/a0/2210a03151a42c9cb2b1623d4feef886.jpg',
     'https://i.pinimg.com/736x/24/35/1d/24351d93b8f043103eac576654cb5344.jpg']
  ],
  ['expert-absolut-repair-shampoo', 'produto', 'Expert Absolut Repair Shampoo',
    'Reconstrução',
    'Shampoo da linha Absolut Repair com Tecnologia Lipid-Repair. Reconstrói cabelos quimicamente danificados, devolvendo força, maciez e brilho intenso.',
    'https://i.pinimg.com/1200x/b2/69/d0/b269d04d3de7148082db4c45c179f2e6.jpg',
    ['https://i.pinimg.com/736x/be/1f/d5/be1fd51303ae794b19534394da3a861a.jpg',
     'https://i.pinimg.com/736x/89/6b/1c/896b1c1390819bb687feee9ad8ae7297.jpg',
     'https://i.pinimg.com/736x/82/a2/c8/82a2c82c0b93bf4eebacac702dfb3b6e.jpg']
  ],
  ['expert-absolut-repair-conditioner', 'produto', 'Expert Absolut Repair Conditioner',
    'Reconstrução Diária',
    'Condicionador da linha Absolut Repair que reconstrói a fibra capilar profundamente. Desembaraça, nutre e fortalece os fios danificados por processos químicos.',
    'https://i.pinimg.com/1200x/f7/0d/00/f70d00dddda6b8019e9fb55d0d92c63d.jpg',
    ['https://i.pinimg.com/736x/ac/e6/94/ace69459b5f955c0fefd0b873fe43f14.jpg',
     'https://i.pinimg.com/736x/82/5f/da/825fda428e6be4547421a812c0dabdea.jpg',
     'https://i.pinimg.com/736x/f6/2e/e0/f62ee03b99af4d0b7576e2ae45ba7633.jpg']
  ],
  ['expert-absolut-repair-mask', 'produto', 'Expert Absolut Repair Mask',
    'Reconstrução Profunda',
    'Máscara de reconstrução intensiva da linha Absolut Repair. Recupera a integridade da fibra capilar, devolvendo força, elasticidade e brilho a cabelos severamente danificados.',
    'https://i.pinimg.com/736x/cf/a0/80/cfa0808650dee9524e0165d430e0098e.jpg',
    ['https://i.pinimg.com/736x/34/59/ce/3459cebc3044e956410bb887d8a53457.jpg',
     'https://tse4.mm.bing.net/th/id/OIP.4CYgPmI6kHvfZB8Iw_jRWwHaHa?r=0&rs=1&pid=ImgDetMain&o=7&rm=3',
     'https://i.pinimg.com/736x/f7/c2/e3/f7c2e3d49a4f6e4af307529e5cc5932f.jpg']
  ],
  ['expert-vitamino-color', 'produto', 'Expert Vitamino Color Shampoo',
    'Proteção de Cor Diária',
    'Shampoo da linha Vitamino Color com Tecnologia Neo-Pigment. Protege a cor, intensifica o brilho e mantém a vitalidade dos fios coloridos por mais tempo.',
    'https://i.pinimg.com/736x/8c/4a/25/8c4a254ff5b4a4541a900bad2089b9c2.jpg',
    ['https://i.pinimg.com/1200x/3c/6a/9c/3c6a9cbababc27152504ca4953e738ff.jpg',
     'https://i.pinimg.com/736x/c7/df/b2/c7dfb25b28a11dcd98eb8ec001fb95c6.jpg',
     'https://i.pinimg.com/1200x/49/13/db/4913db0aeb90eaa39af627682e595518.jpg']
  ],
  ['expert-metal-detox', 'produto', 'Expert Metal Detox',
    'Desintoxicação Capilar',
    'Tratamento pré-coloração da linha Metal Detox que remove partículas metálicas da fibra capilar. Garante coloração mais uniforme, brilhante e duradoura.',
    'https://i.pinimg.com/736x/3d/0f/ec/3d0fece6981e4f8fedac2225a2515c96.jpg',
    ['https://i.pinimg.com/736x/dd/fa/e3/ddfae3b1f8f559f1843aea2610ac3176.jpg',
     'https://i.pinimg.com/1200x/b8/6e/fe/b86efec2e8686d63a0ab7149e0ff6f54.jpg',
     'https://i.pinimg.com/1200x/dd/fd/86/ddfd86b022f90fb7491aea4eb55b76d3.jpg']
  ]
];

// ============================================================
// 4. KITS (15 itens)
// ============================================================
var kitsData = [
  ['kit-kerastase-resistance', 'kit', 'Kérastase Resistance Kit', 'Reconstrução Completa',
    'Kit completo com Shampoo, Condicionador e Máscara da linha Resistance. Reconstrução intensiva para cabelos danificados, devolvendo força, elasticidade e brilho.',
    'https://i.pinimg.com/1200x/0c/dd/f1/0cddf1a088784488cc73ffbedfa53ebf.jpg',
    ['https://i.pinimg.com/736x/ed/d3/f2/edd3f267f2d995ca3ddd2f4316a2ea66.jpg',
     'https://i.pinimg.com/736x/26/59/83/26598308d3e280c3e5c12172fd30e8bc.jpg',
     'https://i.pinimg.com/736x/c4/19/c5/c419c52357f3293954cb12235bb8a567.jpg']
  ],
  ['kit-kerastase-chronologiste', 'kit', 'Kérastase Chronologiste Kit', 'Regeneração e Brilho',
    'Kit com Óleo Regenerador e Protetor Térmico Chronologiste. Nutrição profunda, reparação e proteção térmica para cabelos danificados e ressecados.',
    'https://i.pinimg.com/736x/c1/4a/bb/c14abbd5fb1d4528ab1371784cd4503b.jpg',
    ['https://i.pinimg.com/1200x/0d/39/ae/0d39aeeb056fd43fc060a56555480565.jpg',
     'https://i.pinimg.com/736x/85/2f/4d/852f4d0951ce8b754038f12f99c8b4ed.jpg',
     'https://i.pinimg.com/1200x/81/a8/bf/81a8bf33b07433341cb8f58c305bf429.jpg']
  ],
  ['kit-kerastase-thermique', 'kit', 'Kérastase Thermique Kit', 'Proteção Térmica',
    'Kit com Protetor Térmico e Óleo Finalizador. Protege os fios contra o calor de ferramentas até 230°C e devolve brilho e maciez intensos.',
    'https://i.pinimg.com/1200x/40/7e/87/407e877f2325ceded92fd59cee423193.jpg',
    ['https://i.pinimg.com/1200x/c1/3e/5d/c13e5d4ba01867b5a2de1a677d09302d.jpg',
     'https://i.pinimg.com/736x/a8/b6/fd/a8b6fddb483f3e94c5fd303b373af19c.jpg',
     'https://i.pinimg.com/736x/c5/31/c6/c531c62a3624f7dde4cdc2ee8ef6d8b6.jpg']
  ],
  ['kit-kerastase-resistance-mask', 'kit', 'Kérastase Resistance Mask Kit', 'Reconstrução Profunda',
    'Kit com 2 unidades da Máscara Resistance. Tratamento intensivo que reconstrói a fibra capilar danificada por processos químicos e térmicos.',
    'https://i.pinimg.com/736x/40/b8/c2/40b8c22108d5712a18d9ecd02d5233d5.jpg',
    ['https://i.pinimg.com/736x/91/e6/86/91e6865f11d7e3d1d6a0677131597e2b.jpg',
     'https://i.pinimg.com/1200x/b1/9c/a6/b19ca6af05a7a9ac8fc0b1f93982c3ce.jpg',
     'https://i.pinimg.com/736x/f5/bc/0c/f5bc0c52fd5347eb388ad6a51cb6d010.jpg']
  ],
  ['kit-kerastase-hydration', 'kit', 'Kérastase Hydration Kit', 'Hidratação Essencial',
    'Kit com Shampoo, Condicionador e Máscara da linha Nutritive. Hidratação intensa para cabelos secos e ressecados, devolvendo maciez e brilho.',
    'https://i.pinimg.com/1200x/5e/59/9d/5e599d616ffdb609f55cc48a92832340.jpg',
    ['https://i.pinimg.com/736x/4a/a3/f4/4aa3f4b472556d5aa8e6ad2f66bd0595.jpg',
     'https://i.pinimg.com/1200x/ae/a4/60/aea460c2d74ca14511976aab025a01cf.jpg',
     'https://i.pinimg.com/236x/8f/46/30/8f463046ad92a0bc308d9c9a68e30d52.jpg']
  ],
  ['kit-joico-moisture', 'kit', 'Joico Moisture Recovery Kit', 'Hidratação Profunda',
    'Kit completo com Shampoo, Condicionador e Máscara Moisture Recovery. Hidratação intensiva com tecnologia Bio-Advanced Peptide Complex para cabelos secos e danificados.',
    'https://i.pinimg.com/1200x/55/d6/10/55d610f599b3c10b5fe4cafceb5104fc.jpg',
    ['https://i.pinimg.com/1200x/37/eb/38/37eb38f29a15f9f2b571ef4c72e9ae73.jpg',
     'https://i.pinimg.com/736x/67/be/08/67be084978b5c1f0fdf7170ccb071d9e.jpg',
     'https://i.pinimg.com/1200x/f0/39/f9/f039f9d99452b6304575864a8695a88b.jpg']
  ],
  ['kit-joico-color-endure', 'kit', 'Joico Color Endure Kit', 'Proteção de Cor',
    'Kit com Shampoo e Condicionador Color Endure. Protege a cor, intensifica o brilho e prolonga a durabilidade da coloração com Tecnologia Peptide Complex.',
    'https://i.pinimg.com/736x/ed/92/df/ed92dfe26b5bf8d567ffc982ec8335a9.jpg',
    ['https://i.pinimg.com/736x/55/f6/fb/55f6fbc94440f61acd2b29ce3a0ec87f.jpg',
     'https://i.pinimg.com/736x/81/5d/a5/815da5dd12b7f501add1182400694ef1.jpg',
     'https://i.pinimg.com/1200x/c8/45/45/c8454574dc124e61c5ff54b0fa7b4e87.jpg']
  ],
  ['kit-joico-defy-damage', 'kit', 'Joico Defy Damage Kit', 'Defesa Antidano',
    'Kit com Shampoo, Condicionador e Leave-in Defy Damage. Protege contra danos diários, poluição e calor com Tecnologia Smart Release.',
    'https://i.pinimg.com/236x/0b/92/13/0b9213aaedddaf68940bb3a89fb62dc8.jpg',
    ['https://i.pinimg.com/736x/36/a4/ec/36a4ec1861b63319fe1e9cdd71b533b6.jpg',
     'https://i.pinimg.com/1200x/d4/7b/cb/d47bcb80c0e571e40b7fc11b454f5059.jpg',
     'https://i.pinimg.com/736x/a5/87/83/a5878313d7f90c8a328fddb978de7d34.jpg']
  ],
  ['kit-joico-moisture-mask', 'kit', 'Joico Moisture Mask Kit', 'Hidratação Intensiva',
    'Kit com 2 unidades da Máscara Moisture Recovery. Repõe a umidade perdida, recupera a elasticidade e devolve o brilho a cabelos secos e danificados.',
    'https://i.pinimg.com/736x/ca/c4/15/cac415197ee2db5b5d7a12890b225b9a.jpg',
    ['https://i.pinimg.com/736x/23/cf/33/23cf33cee26dfb383d78663dfd23b864.jpg',
     'https://i.pinimg.com/736x/ec/b3/8b/ecb38bd4b30677f9ec9b63fb3b274c6e.jpg',
     'https://tse1.mm.bing.net/th/id/OIP.TxO0qEbQMc0PYD3JTacZ7wHaHa?r=0&rs=1&pid=ImgDetMain&o=7&rm=3']
  ],
  ['kit-joico-Volumizing', 'kit', 'Joico Volumizing Kit', 'Volume e Leveza',
    'Kit com Shampoo e Condicionador Volumizing. Proporciona volume, corpo e leveza aos fios, deixando o cabelo mais encorpado, solto e com movimento.',
    'https://i.pinimg.com/1200x/94/ff/44/94ff449ed215781b29fa5555920ea95a.jpg',
    ['https://i.pinimg.com/736x/b1/79/cd/b179cdd3c0691a77521b5246a61e4add.jpg',
     'https://i.pinimg.com/736x/1d/bc/24/1dbc2405985303d3d5456ea919dfd899.jpg',
     'https://i.pinimg.com/736x/cf/87/e8/cf87e8b258211b1ec6f288dc243adc80.jpg']
  ],
  ['kit-expert-absolut-repair', 'kit', 'Expert Absolut Repair Kit', 'Reconstrução Completa',
    'Kit completo com Shampoo, Condicionador e Máscara Absolut Repair. Reconstrução intensiva com Tecnologia Lipid-Repair para cabelos quimicamente danificados.',
    'https://i.pinimg.com/736x/5b/da/00/5bda009665f3eff9b6aa04f58e2c473f.jpg',
    ['https://i.pinimg.com/736x/e3/5e/2c/e35e2c9e9d5e31aac8793ea1cc1ebb19.jpg',
     'https://i.pinimg.com/736x/5c/82/2c/5c822c9dcd5ecae1bda1ee964bd8eeb1.jpg',
     'https://i.pinimg.com/736x/6d/55/05/6d55050a72f3a6e613c062c5f1a2a047.jpg']
  ],
  ['kit-expert-vitamino-color', 'kit', 'Expert Vitamino Color Kit', 'Proteção de Cor Diária',
    'Kit com Shampoo e Condicionador Vitamino Color. Protege a cor, intensifica o brilho e mantém a vitalidade dos fios coloridos com Tecnologia Neo-Pigment.',
    'https://i.pinimg.com/736x/f6/51/d6/f651d62a113c18ac4101aa31c2cec0d0.jpg',
    ['https://i.pinimg.com/1200x/85/4e/02/854e02ce74bf9af04d04cbf86830e14c.jpg',
     'https://i.pinimg.com/1200x/3e/ae/bb/3eaebbaa9f8e58142b50b6d713d9ce49.jpg',
     'https://i.pinimg.com/736x/38/43/23/384323902c28e3c7a44a03ae06db29b7.jpg']
  ],
  ['kit-expert-metal-detox', 'kit', 'Expert Metal Detox Kit', 'Desintoxicação Capilar',
    'Kit com Tratamento Metal Detox e Shampoo. Remove partículas metálicas da fibra capilar, garantindo coloração mais uniforme, brilhante e duradoura.',
    'https://i.pinimg.com/1200x/85/4e/02/854e02ce74bf9af04d04cbf86830e14c.jpg',
    ['https://i.pinimg.com/1200x/85/4e/02/854e02ce74bf9af04d04cbf86830e14c.jpg',
     'https://tse4.mm.bing.net/th/id/OIP.4CYgPmI6kHvfZB8Iw_jRWwHaHa?r=0&rs=1&pid=ImgDetMain&o=7&rm=3',
     'https://i.pinimg.com/736x/f7/c2/e3/f7c2e3d49a4f6e4af307529e5cc5932f.jpg']
  ],
  ['kit-expert-absolut-repair-mask', 'kit', 'Expert Absolut Repair Mask Kit', 'Reconstrução Profunda',
    'Kit com 2 unidades da Máscara Absolut Repair. Recupera a integridade da fibra capilar, devolvendo força, elasticidade e brilho a cabelos severamente danificados.',
    'https://i.pinimg.com/736x/11/51/da/1151da5401aa1ff0533a5a2e221488ab.jpg',
    ['https://i.pinimg.com/736x/e5/5f/83/e55f83ba1959fc476a7d340f488c3a1a.jpg ',
     'https://i.pinimg.com/736x/79/9b/c9/799bc972103f05b8e50a5e4d3337c14b.jpg',
     'https://i.pinimg.com/736x/3a/43/ef/3a43efa8384793d904ed8aee02c9d172.jpg']
  ],
  ['kit-expert-serum', 'kit', 'Expert Serum Kit', 'Brilho e Maciez',
    'Kit com Sérum Finalizador e Óleo Capilar. Brilho intenso, maciez e nutrição para os fios, com proteção contra agressores externos e finalização profissional.',
    'https://i.pinimg.com/736x/19/57/93/1957934cfe15752a65f5bd14dff91a7a.jpg',
    ['https://i.pinimg.com/1200x/d1/94/cf/d194cf9242db006d8c2340d16c656c18.jpg',
     'https://i.pinimg.com/736x/73/70/87/737087916e22525775a637957ab6962f.jpg',
     'https://i.pinimg.com/1200x/64/3d/8d/643d8de41d7c632d14be74923199d10a.jpg']
  ]
];

// ============================================================
// 5. FERRAMENTAS (15 itens) - NOVA CATEGORIA
// ============================================================
var ferramentasData = [
  ['secador-ionico-pro', 'ferramentas', 'Secador Iônico Pro', 'Potência e Brilho',
    'Secagem rápida com íons que selam a cutícula, reduzindo o frizz e proporcionando brilho intenso aos fios.',
    'https://i.pinimg.com/736x/82/3a/72/823a7254a510ec701bcee0e480ba8315.jpg',
    ['https://i.pinimg.com/736x/78/c0/a0/78c0a0db1783a7951c45cf16793df640.jpg',
     'https://i.pinimg.com/1200x/82/3a/72/823a7254a510ec701bcee0e480ba8315.jpg',
     'https://i.pinimg.com/1200x/88/0c/ad/880cadbbbe402961bb3bc96bb3b5ca54.jpg']
  ],
  ['chapinha-titanio', 'ferramentas', 'Chapinha de Titânio', 'Alisamento Perfeito',
    'Lâminas de titânio com aquecimento uniforme que desliza suavemente pelos fios, garantindo alisamento perfeito e brilho intenso.',
    'https://i.pinimg.com/736x/f6/62/3d/f6623df560fe941b4fce33574488031c.jpg',
    ['https://i.pinimg.com/736x/b4/8d/97/b48d9783d0ab18919321f36e1386c0bc.jpg',
     'https://i.pinimg.com/736x/a4/3d/4e/a43d4e01816a1ac5f01f449c1e4ddf5e.jpg',
     'https://i.pinimg.com/1200x/5f/fd/db/5ffddb136e62711a585f1c040fe847ad.jpg']
  ],
  ['modelador-automatico', 'ferramentas', 'Modelador Automático', 'Ondas de Salão',
    'Modelador giratório que cria ondas perfeitas de forma automática, com temperatura ajustável e tecnologia de cerâmica.',
    'https://i.pinimg.com/736x/4a/d9/5b/4ad95bf7e6b141aadff33031fd09e9c5.jpg',
    ['https://i.pinimg.com/736x/8d/9d/d7/8d9dd736af07495c8cd74672e0c88476.jpg',
     'https://i.pinimg.com/736x/bf/d5/70/bfd57032bcaddc8df549a25c2f5ee43e.jpg',
     'https://i.pinimg.com/736x/83/7b/6a/837b6aca26c733bd41c28c0153942a49.jpg']
  ],
  ['escova-rotativa', 'ferramentas', 'Escova Rotativa Secadora', 'Volume e Alisamento',
    'Escova que seca e modela ao mesmo tempo, com cerdas que desembaraçam e alisam os fios enquanto seca.',
    'https://i.pinimg.com/736x/c7/96/f6/c796f647e8e72985856e0032ffba1bd1.jpg',
    ['https://i.pinimg.com/736x/86/95/8b/86958b5ee0a8cbf5e0082666ef203ed7.jpg',
     'https://i.pinimg.com/736x/25/f3/7a/25f37a9f5dd2740755ba53f3f3f4f313.jpg',
     'https://i.pinimg.com/736x/86/7d/73/867d730483c8d6db0a09f2c8e8f93427.jpg']
  ],
  ['maquina-corte', 'ferramentas', 'Máquina de Corte e Barba', 'Precisão Profissional',
    'Máquina com lâminas de precisão e ajuste de comprimento, ideal para cortes profissionais e acabamentos perfeitos.',
    'https://i.pinimg.com/736x/86/7d/73/867d730483c8d6db0a09f2c8e8f93427.jpg',
    ['https://i.pinimg.com/736x/88/1e/dc/881edc6b830ca7fd49a95d551425b0c6.jpg',
     'https://i.pinimg.com/736x/21/13/90/211390e156a9c58109c38eb79b7fc2f2.jpg',
     'https://i.pinimg.com/736x/c8/ed/d8/c8edd8088204b8fd6f08beb57300c820.jpg']
  ],
  ['difusor-profissional', 'ferramentas', 'Difusor de Ar Profissional', 'Definição e Volume',
    'Difusor que distribui o ar uniformemente, definindo cachos e dando volume às raízes sem danificar os fios.',
    'https://i.pinimg.com/736x/c8/ed/d8/c8edd8088204b8fd6f08beb57300c820.jpg',
    ['https://i.pinimg.com/736x/3b/40/e6/3b40e60333fe00cec1b0a56cd5892dc8.jpg',
     'https://i.pinimg.com/736x/c3/56/54/c35654251423eb9a44ea088a3bf17c90.jpg',
     'https://i.pinimg.com/236x/ad/e7/ab/ade7ab449fad2d5f26c782b0aea4988f.jpg']
  ],
  ['escova-alisadora', 'ferramentas', 'Escova Alisadora Elétrica', 'Praticidade Rápida',
    'Escova que alisa os fios enquanto escova, com tecnologia de cerâmica que protege e dá brilho aos cabelos.',
    'https://i.pinimg.com/736x/34/27/f8/3427f83ed4451e1e17aa9822e4201d96.jpg',
    ['https://i.pinimg.com/736x/c7/96/f6/c796f647e8e72985856e0032ffba1bd1.jpg',
     'https://i.pinimg.com/736x/86/95/8b/86958b5ee0a8cbf5e0082666ef203ed7.jpg',
     'https://i.pinimg.com/736x/25/f3/7a/25f37a9f5dd2740755ba53f3f3f4f313.jpg']
  ],
  ['modelador-conico', 'ferramentas', 'Modelador Cônico', 'Ondas Definidas',
    'Modelador cônico que cria ondas definidas em diferentes tamanhos, com ponta resfriada para segurança.',
    'https://i.pinimg.com/736x/50/40/cb/5040cb20ff9f1936cda703a116cc6800.jpg',
    ['https://i.pinimg.com/736x/12/97/7a/12977a09186ad656e31bd1820ebca998.jpg',
     'https://i.pinimg.com/736x/3b/40/e6/3b40e60333fe00cec1b0a56cd5892dc8.jpg',
     'https://i.pinimg.com/736x/c3/56/54/c35654251423eb9a44ea088a3bf17c90.jpg']
  ],
  ['prancha-infravermelho', 'ferramentas', 'Prancha Infravermelho', 'Proteção Térmica Ativa',
    'Prancha com tecnologia infravermelho que alisa e protege os fios do calor excessivo, mantendo a hidratação.',
    'https://i.pinimg.com/736x/37/7a/d5/377ad5273df5fe2cf671d873d31d6393.jpg',
    ['https://i.pinimg.com/736x/c4/06/57/c40657b0890088f4007ab9cc047c548e.jpg',
     'https://i.pinimg.com/736x/57/00/8b/57008bbead8ee5cbd7259af613e74690.jpg',
     'https://i.pinimg.com/736x/50/40/cb/5040cb20ff9f1936cda703a116cc6800.jpg']
  ],
  ['touca-termica', 'ferramentas', 'Touca Térmica Elétrica', 'Potencializador de Hidratação',
    'Touca que potencializa tratamentos capilares com calor uniforme, abrindo as cutículas para melhor absorção.',
    'https://i.pinimg.com/736x/d7/a8/8c/d7a88c60e5f7ce217264486e3fc506f4.jpg',
    ['https://i.pinimg.com/736x/8d/9d/d7/8d9dd736af07495c8cd74672e0c88476.jpg',
     'https://i.pinimg.com/736x/4a/d9/5b/4ad95bf7e6b141aadff33031fd09e9c5.jpg',
     'https://i.pinimg.com/736x/bf/d5/70/bfd57032bcaddc8df549a25c2f5ee43e.jpg']
  ],
  ['escova-modeladora', 'ferramentas', 'Escova Modeladora de Ar Quente', 'Modelagem e Secagem',
    'Escova que modela com ar quente, criando volume e movimento enquanto seca os fios rapidamente.',
    'https://i.pinimg.com/736x/fa/45/3b/fa453bcb817656633d0c07edf6aa8050.jpg',
    ['https://i.pinimg.com/736x/cb/3a/6a/cb3a6a212e772729875a40bf24d531f8.jpg',
     'https://i.pinimg.com/736x/24/0e/b1/240eb125b9e37fe19a69d67fe456df27.jpg',
     'https://i.pinimg.com/736x/ab/d4/6f/abd46fc8a83389a59dd9b55eb16037f9.jpg']
  ],
  ['prancha-vapor', 'ferramentas', 'Prancha de Cabelo com Vapor', 'Alisamento com Hidratação',
    'Prancha que libera vapor durante o uso, alisando e hidratando os fios simultaneamente.',
    'https://i.pinimg.com/736x/8d/eb/c3/8debc3b7fb7a7e165e3870776c00c7e6.jpg',
    ['https://i.pinimg.com/1200x/13/c3/75/13c37585028872dc32a4297eee127e6e.jpg',
     'https://i.pinimg.com/736x/a0/2e/cf/a02ecf93acaae6f8bf0aa5d91d0ffa71.jpg',
     'https://i.pinimg.com/736x/3a/64/48/3a6448de3f6a44a84b7cab17c7a11071.jpg']
  ],
  ['secador-viagem', 'ferramentas', 'Secador de Viagem Compacto', 'Praticidade e Potência',
    'Secador compacto com alta potência, ideal para viagens e uso diário.',
    'https://i.pinimg.com/736x/59/d8/dd/59d8dd9ea4a78fdeb7e0b420ffcdda0a.jpg',
    ['https://i.pinimg.com/736x/59/c0/57/59c0570e163d499dc010ccd33581ce6d.jpg',
     'https://i.pinimg.com/736x/51/d7/7d/51d77d1ba30e0bd6e67cb598001aadbd.jpg',
     'https://i.pinimg.com/736x/e5/63/30/e56330b7327b151f6085b8daa5aa6a8e.jpg']
  ],
  ['kit-pentes-corte', 'ferramentas', 'Kit de Pentes de Corte Profissional', 'Precisão no Corte',
    'Kit completo com pentes para corte, com diferentes tamanhos e densidades para acabamento profissional.',
    'https://i.pinimg.com/736x/76/24/51/7624516be549ec68f4b74a9d481fe8c2.jpg',
    ['https://thekit.ca/wp-content/uploads/2023/07/Sized-Inline-2-Metal-Detox.jpg',
     'https://i.pinimg.com/736x/aa/91/ef/aa91ef7f58d2efed392dea3444690a5d.jpg',
     'https://i.pinimg.com/1200x/e3/93/4c/e3934c0c465aa33ef0c295d9fb6e5e65.jpg']
  ],
  ['difusor-universal', 'ferramentas', 'Difusor Universal Ajustável', 'Versatilidade e Definição',
    'Difusor ajustável para todos os tipos de cabelo, com hastes móveis para melhor definição dos cachos.',
    'https://i.pinimg.com/1200x/d6/b4/fc/d6b4fc118f3fdfa53cb3a9e842a4da52.jpg',
    ['https://i.pinimg.com/736x/21/23/3f/21233f6f00420dfd920ff5deda8f32f1.jpg',
     'https://i.pinimg.com/736x/ec/b3/8b/ecb38bd4b30677f9ec9b63fb3b274c6e.jpg',
     'https://i.pinimg.com/736x/7b/f8/b2/7bf8b2cb9df40798577467ce0953004f.jpg']
  ]
];

// ============================================================
// 6. ACESSÓRIOS (15 itens) - NOVA CATEGORIA
// ============================================================
var acessoriosData = [
  ['touca-cetim', 'acessorios', 'Touca de Cetim', 'Proteção Noturna',
    'Touca de cetim que protege os fios durante o sono, reduzindo o atrito e prevenindo o frizz e a quebra.',
    'https://i.pinimg.com/736x/08/ab/69/08ab69db905060f2e62a6bed57d3e74e.jpg',
    ['https://i.pinimg.com/736x/5d/03/57/5d03576e6204c75b1bcd95d3f60c0e49.jpg',
     'https://i.pinimg.com/736x/35/83/99/358399b0b37e83d864a58c0237875a9d.jpg',
     'https://i.pinimg.com/736x/31/19/fb/3119fb4703a12cd9867c83cc38be904e.jpg']
  ],
  ['claw-clip', 'acessorios', 'Claw Clip Gigante', 'Tendência e Estilo',
    'O acessório viral que prende os fios com estilo, disponível em diversas cores e tamanhos.',
    'https://i.pinimg.com/736x/31/19/fb/3119fb4703a12cd9867c83cc38be904e.jpg',
    ['https://i.pinimg.com/736x/1e/79/0e/1e790e7d03357af0bb59fae1aaae5985.jpg',
     'https://i.pinimg.com/1200x/ec/97/85/ec9785ae609edd9958245167b09b776a.jpg',
     'https://i.pinimg.com/736x/66/bb/26/66bb266d7934a62d3f30132a9f8e7bc6.jpg']
  ],
  ['scrunchie-seda', 'acessorios', 'Scrunchie de Seda', 'Anti-Quebra',
    'Elástico revestido em seda que não danifica os fios, ideal para prender o cabelo sem marcas.',
    'https://i.pinimg.com/736x/66/bb/26/66bb266d7934a62d3f30132a9f8e7bc6.jpg',
    ['https://i.pinimg.com/1200x/e0/78/98/e078985c0a53eb4cab512bc560332e25.jpg',
     'https://i.pinimg.com/1200x/cb/85/d2/cb85d255cd035178f3f3270ab9943769.jpg',
     'https://i.pinimg.com/1200x/55/93/b2/5593b2539cc1c588ed90f7070a3cda0b.jpg']
  ],
  ['pente-desenrolador', 'acessorios', 'Pente Desenrolador', 'Zero Dor',
    'Pente que desembaraça sem puxar, com cerdas flexíveis que deslizam suavemente pelos fios.',
    'https://i.pinimg.com/1200x/55/93/b2/5593b2539cc1c588ed90f7070a3cda0b.jpg',
    ['https://i.pinimg.com/736x/3e/08/65/3e0865833599c47473882c25165ecbfc.jpg',
     'https://i.pinimg.com/736x/6b/2f/c2/6b2fc2069e0ab8ba141565ea5e582d58.jpg',
     'https://i.pinimg.com/736x/c9/2d/a3/c92da3565d7caf7b75db3fdceb30533f.jpg']
  ],
  ['faixa-acolchoada', 'acessorios', 'Faixa Acolchoada', 'Conforto e Charme',
    'Faixa para prender os fios durante a maquiagem ou skincare, com acabamento acolchoado e confortável.',
    'https://i.pinimg.com/736x/6b/2f/c2/6b2fc2069e0ab8ba141565ea5e582d58.jpg',
    ['https://i.pinimg.com/736x/c9/2d/a3/c92da3565d7caf7b75db3fdceb30533f.jpg',
     'https://i.pinimg.com/236x/99/7b/f9/997bf983affdcdec08562f8a02c374b6.jpg',
     'https://i.pinimg.com/736x/57/72/22/5772226643794074a0c51185ea867c17.jpg']
  ],
  ['escova-polvo', 'acessorios', 'Escova Polvo', 'Flexibilidade Total',
    'Escova com cerdas flexíveis que se adaptam ao formato da cabeça, desembaraçando sem dor.',
    'https://i.pinimg.com/736x/57/72/22/5772226643794074a0c51185ea867c17.jpg',
    ['https://i.pinimg.com/736x/d7/f2/2b/d7f22bca30309f62004694c1f7dafa73.jpg',
     'https://i.pinimg.com/736x/df/5b/db/df5bdb685898292a9ca41b8bbb43ab31.jpg',
     'https://i.pinimg.com/736x/e2/ab/f8/e2abf8b4b139df7b29c8551f40d4d338.jpg']
  ],
  ['fronha-cetim', 'acessorios', 'Fronha de Cetim', 'Beleza Noturna',
    'Fronha de cetim que reduz o frizz e evita a quebra dos fios durante a noite.',
    'https://i.pinimg.com/736x/e2/ab/f8/e2abf8b4b139df7b29c8551f40d4d338.jpg',
    ['https://i.pinimg.com/736x/2a/eb/88/2aeb88213907101e1792b014a75fb4b3.jpg',
     'https://i.pinimg.com/736x/e0/ab/81/e0ab810bc60a2b40ec842c78a01f2de0.jpg',
     'https://i.pinimg.com/736x/46/bb/b8/46bbb8d4c1c4a748cb6cd717378d2e1a.jpg']
  ],
  ['bobes-veludo', 'acessorios', 'Kit Bobes de Veludo', 'Volume Retrô',
    'Bobes revestidos em veludo para criar cachos e volume sem danificar os fios.',
    'https://i.pinimg.com/736x/46/bb/b8/46bbb8d4c1c4a748cb6cd717378d2e1a.jpg',
    ['https://i.pinimg.com/736x/57/72/22/5772226643794074a0c51185ea867c17.jpg',
     'https://i.pinimg.com/736x/d7/f2/2b/d7f22bca30309f62004694c1f7dafa73.jpg',
     'https://i.pinimg.com/736x/20/e5/0e/20e50e3d7d91ea1c77739beef358253e.jpg']
  ],
  ['presilhas-minimalistas', 'acessorios', 'Kit Presilhas Minimalistas', 'Detalhe Sofisticado',
    'Presilhas discretas e elegantes para prender mechas e criar penteados sofisticados.',
    'https://i.pinimg.com/736x/20/e5/0e/20e50e3d7d91ea1c77739beef358253e.jpg',
    ['https://i.pinimg.com/736x/d2/3f/6c/d23f6cb6d4eba707e8af9dbd0365d7b3.jpg',
     'https://i.pinimg.com/236x/5b/d6/67/5bd6678622f65f802a790f27193d2b43.jpg',
     'https://i.pinimg.com/736x/b3/23/38/b323381530d017a718dfd57ebb70f280.jpg']
  ],
  ['massageador-couro', 'acessorios', 'Massageador de Couro Cabeludo', 'Estímulo e Limpeza',
    'Massageador que estimula a circulação sanguínea no couro cabeludo, promovendo crescimento saudável.',
    'https://i.pinimg.com/736x/b3/23/38/b323381530d017a718dfd57ebb70f280.jpg',
    ['https://i.pinimg.com/736x/f2/f4/09/f2f4094f58a52962676524bcc79dc511.jpg',
     'https://i.pinimg.com/736x/a3/c2/a8/a3c2a82d52cb1f590ebbb7b6ba386229.jpg',
     'https://i.pinimg.com/736x/03/38/48/033848a08f6285b6473392e31710c7b5.jpg']
  ],
  ['tiara-esportiva', 'acessorios', 'Tiara Esportiva Antiderrapante', 'Conforto e Estilo',
    'Tiara que não escorre durante atividades físicas, com absorção de suor e ajuste confortável.',
    'https://i.pinimg.com/736x/5d/03/57/5d03576e6204c75b1bcd95d3f60c0e49.jpg',
    ['https://i.pinimg.com/736x/35/83/99/358399b0b37e83d864a58c0237875a9d.jpg',
     'https://i.pinimg.com/736x/31/19/fb/3119fb4703a12cd9867c83cc38be904e.jpg',
     'https://i.pinimg.com/736x/1e/79/0e/1e790e7d03357af0bb59fae1aaae5985.jpg']
  ],
  ['elasticos-invisiveis', 'acessorios', 'Elásticos Invisíveis (Kit 50un)', 'Praticidade Diária',
    'Elásticos transparentes para todos os tipos de cabelo, ideais para prender sem marcar.',
    'https://i.pinimg.com/736x/35/83/99/358399b0b37e83d864a58c0237875a9d.jpg',
    ['https://i.pinimg.com/736x/1e/79/0e/1e790e7d03357af0bb59fae1aaae5985.jpg',
     'https://i.pinimg.com/1200x/e0/78/98/e078985c0a53eb4cab512bc560332e25.jpg',
     'https://i.pinimg.com/1200x/cb/85/d2/cb85d255cd035178f3f3270ab9943769.jpg']
  ],
  ['rede-protetora', 'acessorios', 'Rede Protetora para Cabelo', 'Proteção Total',
    'Rede que protege o cabelo durante o sono, mantendo o penteado e reduzindo o atrito.',
    'https://i.pinimg.com/736x/1e/79/0e/1e790e7d03357af0bb59fae1aaae5985.jpg',
    ['https://i.pinimg.com/1200x/ec/97/85/ec9785ae609edd9958245167b09b776a.jpg',
     'https://i.pinimg.com/1200x/e0/78/98/e078985c0a53eb4cab512bc560332e25.jpg',
     'https://i.pinimg.com/1200x/cb/85/d2/cb85d255cd035178f3f3270ab9943769.jpg']
  ],
  ['prendedor-silicone', 'acessorios', 'Prendedor de Silicone Hipoalergênico', 'Segurança e Conforto',
    'Prendedor que não agride os fios, com silicone macio que segura sem danificar.',
    'https://i.pinimg.com/1200x/ec/97/85/ec9785ae609edd9958245167b09b776a.jpg',
    ['https://i.pinimg.com/736x/3e/08/65/3e0865833599c47473882c25165ecbfc.jpg',
     'https://i.pinimg.com/1200x/55/93/b2/5593b2539cc1c588ed90f7070a3cda0b.jpg',
     'https://i.pinimg.com/736x/6b/2f/c2/6b2fc2069e0ab8ba141565ea5e582d58.jpg']
  ],
  ['kit-viagem-escova', 'acessorios', 'Kit Pente e Escova de Viagem', 'Praticidade para Viajar',
    'Kit compacto com pente e escova em estojo, ideal para levar na bolsa ou na mala.',
    'https://i.pinimg.com/736x/3e/08/65/3e0865833599c47473882c25165ecbfc.jpg',
    ['https://i.pinimg.com/1200x/55/93/b2/5593b2539cc1c588ed90f7070a3cda0b.jpg',
     'https://i.pinimg.com/736x/6b/2f/c2/6b2fc2069e0ab8ba141565ea5e582d58.jpg',
     'https://i.pinimg.com/736x/c9/2d/a3/c92da3565d7caf7b75db3fdceb30533f.jpg']
  ]
];

// ============================================================
// 7. SOLUÇÕES (15 itens) - NOVA CATEGORIA
// ============================================================
var solucoesData = [
  ['serum-antiqueda', 'solucoes', 'Sérum Antiqueda', 'Fortalecimento Intensivo',
    'Fórmula que fortalece a raiz e estimula o crescimento capilar, reduzindo a queda.',
    'https://i.pinimg.com/736x/67/53/d4/6753d4546e18a5b6e121879b4e45a5f5.jpg',
    ['https://i.pinimg.com/1200x/9c/38/2e/9c382e31a4eaafd69ce5d685d82f238b.jpg',
     'https://i.pinimg.com/1200x/85/03/4b/85034b9e76143badec90e47cdac4ae36.jpg',
     'https://i.pinimg.com/1200x/bf/f2/4b/bff24b95458ec3242c742d7c7014996b.jpg']
  ],
  ['tonico-crescimento', 'solucoes', 'Tônico de Crescimento', 'Aceleração dos Fios',
    'Estimula a circulação no couro cabeludo, acelerando o crescimento e fortalecendo os fios.',
    'https://i.pinimg.com/1200x/bf/f2/4b/bff24b95458ec3242c742d7c7014996b.jpg',
    ['https://i.pinimg.com/736x/b2/70/53/b27053d5918d3a819f9e48f0b864cb56.jpg',
     'https://i.pinimg.com/736x/69/81/cb/6981cbf1d971c00a4a4268120a2199be.jpg',
     'https://i.pinimg.com/1200x/a6/2c/4e/a62c4e52baecfd4e5a0cb7203b7c6dd9.jpg']
  ],
  ['oleo-antifrizz', 'solucoes', 'Óleo Anti-Frizz', 'Controle e Brilho',
    'Óleo leve que doma o frizz, controla o volume e proporciona brilho intenso sem pesar.',
    'https://i.pinimg.com/1200x/a6/2c/4e/a62c4e52baecfd4e5a0cb7203b7c6dd9.jpg',
    ['https://i.pinimg.com/736x/92/b3/fa/92b3fad62db6657d1d34725075a9cc0d.jpg',
     'https://i.pinimg.com/736x/4f/4c/c3/4f4cc384ba311066a815ec3ba62db5af.jpg',
     'https://i.pinimg.com/736x/67/53/d4/6753d4546e18a5b6e121879b4e45a5f5.jpg']
  ],
  ['shampoo-antioleosidade', 'solucoes', 'Shampoo Antioleosidade', 'Equilíbrio do Couro',
    'Shampoo que controla a oleosidade do couro cabeludo, limpando profundamente sem ressecar.',
    'https://i.pinimg.com/736x/4f/4c/c3/4f4cc384ba311066a815ec3ba62db5af.jpg',
    ['https://i.pinimg.com/736x/67/53/d4/6753d4546e18a5b6e121879b4e45a5f5.jpg',
     'https://i.pinimg.com/1200x/9c/38/2e/9c382e31a4eaafd69ce5d685d82f238b.jpg',
     'https://i.pinimg.com/1200x/85/03/4b/85034b9e76143badec90e47cdac4ae36.jpg']
  ],
  ['ampola-reconstrutora', 'solucoes', 'Ampola Reconstrutora', 'Resgate Pós-Química',
    'Tratamento intensivo que reconstrói a fibra capilar danificada por processos químicos.',
    'https://i.pinimg.com/736x/dd/7d/8e/dd7d8e39cea64d3f335fe067c8dd14b2.jpg',
    ['https://i.pinimg.com/736x/f6/17/b5/f617b5b262544bb7a6f482f18d362487.jpg',
     'https://i.pinimg.com/1200x/e4/4b/da/e44bdac8a5105bfec972ba9a543bfeec.jpg',
     'https://i.pinimg.com/736x/0e/dc/3a/0edc3a3d742bbce816f8a7b9948c3422.jpg']
  ],
  ['protetor-termico', 'solucoes', 'Protetor Térmico', 'Escudo Antidanos',
    'Protege os fios contra o calor de secadores, chapinhas e modeladores até 230°C.',
    'https://i.pinimg.com/736x/0e/dc/3a/0edc3a3d742bbce816f8a7b9948c3422.jpg',
    ['https://i.pinimg.com/736x/6e/08/7f/6e087fe54324ae27e3179a1f51db537c.jpg',
     'https://i.pinimg.com/736x/04/72/2d/04722d69e14755a8c25950f0da9adff3.jpg',
     'https://i.pinimg.com/1200x/b3/4a/0b/b34a0be19ad5436bcfd2dea58da00f6e.jpg']
  ],
  ['leave-in-reparador', 'solucoes', 'Leave-in Reparador', 'Fim das Pontas Duplas',
    'Tratamento leave-in que sela e repara as pontas duplas, deixando os fios mais saudáveis.',
    'https://i.pinimg.com/736x/04/72/2d/04722d69e14755a8c25950f0da9adff3.jpg',
    ['https://i.pinimg.com/1200x/b3/4a/0b/b34a0be19ad5436bcfd2dea58da00f6e.jpg',
     'https://i.pinimg.com/736x/30/0a/83/300a83dfb89f41edbeb57061216538f4.jpg',
     'https://i.pinimg.com/1200x/41/4f/e3/414fe3a069ba01def6a66d44ac222636.jpg']
  ],
  ['esfoliante-capilar', 'solucoes', 'Esfoliante Capilar', 'Limpeza Profunda',
    'Esfoliante que remove impurezas, resíduos e células mortas do couro cabeludo.',
    'https://i.pinimg.com/736x/30/0a/83/300a83dfb89f41edbeb57061216538f4.jpg',
    ['https://i.pinimg.com/1200x/41/4f/e3/414fe3a069ba01def6a66d44ac222636.jpg',
     'https://i.pinimg.com/1200x/7f/35/f9/7f35f9d6ed44ca283c69bb674019aa2d.jpg',
     'https://i.pinimg.com/736x/56/3a/da/563ada1310e02123d3c9d1c64f102693.jpg']
  ],
  ['spray-volume', 'solucoes', 'Spray de Volume', 'Efeito Lift Imediato',
    'Spray que levanta a raiz e dá volume aos fios finos, com fixação leve e natural.',
    'https://i.pinimg.com/736x/56/3a/da/563ada1310e02123d3c9d1c64f102693.jpg',
    ['https://i.pinimg.com/736x/4c/e8/9f/4ce89fee713b38688226ea540639b201.jpg',
     'https://i.pinimg.com/736x/7c/e6/f9/7ce6f9523c7282634f3a2adcb4e2cdd8.jpg',
     'https://i.pinimg.com/1200x/0e/bb/1f/0ebb1f1251107bde521cc59d5fc1b116.jpg']
  ],
  ['mascara-matizadora', 'solucoes', 'Máscara Matizadora', 'Neutralização de Amarelados',
    'Máscara que neutraliza tons amarelados e alaranjados, mantendo o loiro frio.',
    'https://i.pinimg.com/1200x/0e/bb/1f/0ebb1f1251107bde521cc59d5fc1b116.jpg',
    ['https://i.pinimg.com/736x/ad/b1/ff/adb1ffeb0f07b5696705dae265aaff22.jpg',
     'https://i.pinimg.com/1200x/aa/cb/cf/aacbcffaf13927ee047eabcbda8cc1aa.jpg',
     'https://i.pinimg.com/736x/9b/15/b9/9b15b9e256a6114b5148bee2650c1364.jpg']
  ],
  ['serum-iluminador', 'solucoes', 'Sérum Iluminador de Brilho', 'Reflexos Intensos',
    'Sérum que potencializa o brilho e os reflexos naturais do cabelo.',
    'https://i.pinimg.com/736x/9b/15/b9/9b15b9e256a6114b5148bee2650c1364.jpg',
    ['https://i.pinimg.com/1200x/d3/2d/74/d32d74825bfa044d8bb2251ccc5357a4.jpg',
     'https://i.pinimg.com/1200x/e9/c4/f9/e9c4f9b7f739f33ef4841e5e28aaed25.jpg',
     'https://i.pinimg.com/1200x/95/31/cf/9531cfe923ccfc3b4ec2bb62483a9a8c.jpg']
  ],
  ['condicionador-leavein', 'solucoes', 'Condicionador Leave-in Hidratante', 'Hidratação Diária',
    'Condicionador leave-in que hidrata e protege os fios ao longo do dia sem enxágue.',
    'https://i.pinimg.com/1200x/3e/b2/3d/3eb23d9fc16593ff95825fe42012d267.jpg',
    ['https://i.pinimg.com/736x/8f/6b/78/8f6b789b5615427c79df5610a0049d89.jpg',
     'https://i.pinimg.com/1200x/be/c8/00/bec8003024f2f36eac5a7bbf2aa8eba1.jpg',
     'https://i.pinimg.com/736x/9e/61/5e/9e615e0f0ea8a9c610df0d0e4873694f.jpg']
  ],
  ['mascara-hidratacao', 'solucoes', 'Máscara de Hidratação Profunda', 'Hidratação Extrema',
    'Máscara que hidrata profundamente os fios ressecados, devolvendo maciez e elasticidade.',
    'https://i.pinimg.com/736x/8f/6b/78/8f6b789b5615427c79df5610a0049d89.jpg',
    ['https://i.pinimg.com/736x/9e/61/5e/9e615e0f0ea8a9c610df0d0e4873694f.jpg',
     'https://i.pinimg.com/736x/b1/e0/71/b1e071fe7054b435341a25f422635d6f.jpg',
     'https://i.pinimg.com/736x/e9/2a/ba/e92abaeee99bbc8cfd8fe2820ccd5a57.jpg']
  ],
  ['spray-fixador', 'solucoes', 'Spray Fixador de Média Fixação', 'Fixaçâo Natural',
    'Spray que fixa o penteado sem pesar, com acabamento natural e durabilidade.',
    'https://i.pinimg.com/736x/b1/e0/71/b1e071fe7054b435341a25f422635d6f.jpg',
    ['https://i.pinimg.com/736x/e9/2a/ba/e92abaeee99bbc8cfd8fe2820ccd5a57.jpg',
     'https://i.pinimg.com/1200x/a9/1d/0e/a91d0e7df9dd09eca66a0ef976d70c5b.jpg',
     'https://i.pinimg.com/736x/08/02/64/080264d0c040d46b1481762780120b95.jpg']
  ],
  ['oleo-reparador', 'solucoes', 'Óleo Reparador Noturno', 'Reparação Enquanto Dorme',
    'Óleo que atua durante a noite, reparando os fios e devolvendo a vitalidade.',
    'https://i.pinimg.com/1200x/a9/1d/0e/a91d0e7df9dd09eca66a0ef976d70c5b.jpg',
    ['https://i.pinimg.com/736x/08/02/64/080264d0c040d46b1481762780120b95.jpg',
     'https://i.pinimg.com/736x/37/b6/c9/37b6c9c11eba90179150f789c458d5e3.jpg',
     'https://i.pinimg.com/1200x/67/11/fb/6711fba091577ed47ccefa55989e16b9.jpg']
  ]
];

// ============================================================
// 8. MAQUIAGEM (15 itens) - NOVA CATEGORIA
// ============================================================
var maquiagemData = [
  ['base-hd', 'maquiagem', 'Base Líquida HD', 'Cobertura Perfeita',
    'Base de alta definição com acabamento natural, cobertura média a alta e longa duração.',
    'https://i.pinimg.com/736x/67/53/d4/6753d4546e18a5b6e121879b4e45a5f5.jpg',
    ['https://i.pinimg.com/1200x/9c/38/2e/9c382e31a4eaafd69ce5d685d82f238b.jpg',
     'https://i.pinimg.com/1200x/85/03/4b/85034b9e76143badec90e47cdac4ae36.jpg',
     'https://i.pinimg.com/1200x/bf/f2/4b/bff24b95458ec3242c742d7c7014996b.jpg']
  ],
  ['corretivo-alta', 'maquiagem', 'Corretivo Alta Cobertura', 'Disfarce Imediato',
    'Corretivo de alta cobertura que disfarça olheiras, manchas e imperfeições.',
    'https://i.pinimg.com/736x/30/0a/83/300a83dfb89f41edbeb57061216538f4.jpg',
    ['https://i.pinimg.com/1200x/41/4f/e3/414fe3a069ba01def6a66d44ac222636.jpg',
     'https://i.pinimg.com/1200x/7f/35/f9/7f35f9d6ed44ca283c69bb674019aa2d.jpg',
     'https://i.pinimg.com/736x/56/3a/da/563ada1310e02123d3c9d1c64f102693.jpg']
  ],
  ['po-translucido', 'maquiagem', 'Pó Compacto Translúcido', 'Acabamento Aveludado',
    'Pó translúcido que fixa a maquiagem, controla a oleosidade e dá acabamento aveludado.',
    'https://i.pinimg.com/736x/56/3a/da/563ada1310e02123d3c9d1c64f102693.jpg',
    ['https://i.pinimg.com/736x/4c/e8/9f/4ce89fee713b38688226ea540639b201.jpg',
     'https://i.pinimg.com/736x/7c/e6/f9/7ce6f9523c7282634f3a2adcb4e2cdd8.jpg',
     'https://i.pinimg.com/1200x/0e/bb/1f/0ebb1f1251107bde521cc59d5fc1b116.jpg']
  ],
  ['blush-liquido', 'maquiagem', 'Blush Líquido', 'Cor Natural',
    'Blush líquido que derrete na pele, proporcionando cor natural e duradoura.',
    'https://i.pinimg.com/736x/92/87/98/928798a9e8f9a0b1c2d3e4f5a6b7c8d9.jpg',
    ['https://i.pinimg.com/1200x/0e/bb/1f/0ebb1f1251107bde521cc59d5fc1b116.jpg',
     'https://i.pinimg.com/736x/ad/b1/ff/adb1ffeb0f07b5696705dae265aaff22.jpg',
     'https://i.pinimg.com/1200x/aa/cb/cf/aacbcffaf13927ee047eabcbda8cc1aa.jpg']
  ],
  ['delineador-preto', 'maquiagem', 'Delineador Líquido Preto', 'Traço Preciso',
    'Delineador de ponta fina para traços precisos, com alta pigmentação e longa duração.',
    'https://i.pinimg.com/1200x/bf/f2/4b/bff24b95458ec3242c742d7c7014996b.jpg',
    ['https://i.pinimg.com/736x/b2/70/53/b27053d5918d3a819f9e48f0b864cb56.jpg',
     'https://i.pinimg.com/736x/69/81/cb/6981cbf1d971c00a4a4268120a2199be.jpg',
     'https://i.pinimg.com/1200x/a6/2c/4e/a62c4e52baecfd4e5a0cb7203b7c6dd9.jpg']
  ],
  ['mascara-volume', 'maquiagem', 'Máscara de Cílios Volume', 'Volume Extremo',
    'Máscara que dá volume e alongamento aos cílios, com acabamento intenso.',
    'https://i.pinimg.com/1200x/a6/2c/4e/a62c4e52baecfd4e5a0cb7203b7c6dd9.jpg',
    ['https://i.pinimg.com/736x/92/b3/fa/92b3fad62db6657d1d34725075a9cc0d.jpg',
     'https://i.pinimg.com/736x/4f/4c/c3/4f4cc384ba311066a815ec3ba62db5af.jpg',
     'https://i.pinimg.com/736x/67/53/d4/6753d4546e18a5b6e121879b4e45a5f5.jpg']
  ],
  ['batom-matte', 'maquiagem', 'Batom Matte Longa Duração', 'Cor Duradoura',
    'Batom de longa duração com acabamento mate, pigmentação intensa e conforto.',
    'https://i.pinimg.com/736x/4f/4c/c3/4f4cc384ba311066a815ec3ba62db5af.jpg',
    ['https://i.pinimg.com/736x/67/53/d4/6753d4546e18a5b6e121879b4e45a5f5.jpg',
     'https://i.pinimg.com/1200x/9c/38/2e/9c382e31a4eaafd69ce5d685d82f238b.jpg',
     'https://i.pinimg.com/1200x/85/03/4b/85034b9e76143badec90e47cdac4ae36.jpg']
  ],
  ['paleta-sombras', 'maquiagem', 'Paleta de Sombras Neutras', 'Cores Versáteis',
    'Paleta com cores neutras e vibrantes para criar looks do dia a dia e eventos.',
    'https://i.pinimg.com/736x/dd/7d/8e/dd7d8e39cea64d3f335fe067c8dd14b2.jpg',
    ['https://i.pinimg.com/736x/f6/17/b5/f617b5b262544bb7a6f482f18d362487.jpg',
     'https://i.pinimg.com/1200x/e4/4b/da/e44bdac8a5105bfec972ba9a543bfeec.jpg',
     'https://i.pinimg.com/736x/0e/dc/3a/0edc3a3d742bbce816f8a7b9948c3422.jpg']
  ],
  ['primer-facial', 'maquiagem', 'Primer Facial', 'Preparação da Pele',
    'Primer que prepara a pele para a maquiagem, minimizando poros e aumentando a duração.',
    'https://i.pinimg.com/736x/0e/dc/3a/0edc3a3d742bbce816f8a7b9948c3422.jpg',
    ['https://i.pinimg.com/736x/6e/08/7f/6e087fe54324ae27e3179a1f51db537c.jpg',
     'https://i.pinimg.com/736x/04/72/2d/04722d69e14755a8c25950f0da9adff3.jpg',
     'https://i.pinimg.com/1200x/b3/4a/0b/b34a0be19ad5436bcfd2dea58da00f6e.jpg']
  ],
  ['spray-fixador-make', 'maquiagem', 'Spray Fixador', 'Durabilidade Prolongada',
    'Spray que fixa a maquiagem por horas, mantendo a pele fresca e com acabamento natural.',
    'https://i.pinimg.com/736x/04/72/2d/04722d69e14755a8c25950f0da9adff3.jpg',
    ['https://i.pinimg.com/1200x/b3/4a/0b/b34a0be19ad5436bcfd2dea58da00f6e.jpg',
     'https://i.pinimg.com/736x/30/0a/83/300a83dfb89f41edbeb57061216538f4.jpg',
     'https://i.pinimg.com/1200x/41/4f/e3/414fe3a069ba01def6a66d44ac222636.jpg']
  ],
  ['kit-pinceis', 'maquiagem', 'Kit Pincéis Profissionais', 'Aplicação Perfeita',
    'Pincéis para aplicação profissional de base, corretivo, sombra e blush.',
    'https://i.pinimg.com/736x/9b/15/b9/9b15b9e256a6114b5148bee2650c1364.jpg',
    ['https://i.pinimg.com/1200x/d3/2d/74/d32d74825bfa044d8bb2251ccc5357a4.jpg',
     'https://i.pinimg.com/1200x/e9/c4/f9/e9c4f9b7f739f33ef4841e5e28aaed25.jpg',
     'https://i.pinimg.com/1200x/95/31/cf/9531cfe923ccfc3b4ec2bb62483a9a8c.jpg']
  ],
  ['lapis-sobrancelha', 'maquiagem', 'Lápis de Sobrancelha', 'Definição das Sobrancelhas',
    'Lápis que preenche e define as sobrancelhas com traços precisos e naturais.',
    'https://i.pinimg.com/1200x/3e/b2/3d/3eb23d9fc16593ff95825fe42012d267.jpg',
    ['https://i.pinimg.com/736x/8f/6b/78/8f6b789b5615427c79df5610a0049d89.jpg',
     'https://i.pinimg.com/1200x/be/c8/00/bec8003024f2f36eac5a7bbf2aa8eba1.jpg',
     'https://i.pinimg.com/736x/9e/61/5e/9e615e0f0ea8a9c610df0d0e4873694f.jpg']
  ],
  ['iluminador-liquido', 'maquiagem', 'Iluminador Líquido', 'Brilho Radiante',
    'Iluminador que dá efeito glow natural, destacando os pontos altos do rosto.',
    'https://i.pinimg.com/736x/8f/6b/78/8f6b789b5615427c79df5610a0049d89.jpg',
    ['https://i.pinimg.com/736x/9e/61/5e/9e615e0f0ea8a9c610df0d0e4873694f.jpg',
     'https://i.pinimg.com/736x/b1/e0/71/b1e071fe7054b435341a25f422635d6f.jpg',
     'https://i.pinimg.com/736x/e9/2a/ba/e92abaeee99bbc8cfd8fe2820ccd5a57.jpg']
  ],
  ['delineador-labios', 'maquiagem', 'Delineador de Lábios', 'Contorno Perfeito',
    'Delineador que define o contorno dos lábios, prevenindo o borrão do batom.',
    'https://i.pinimg.com/736x/b1/e0/71/b1e071fe7054b435341a25f422635d6f.jpg',
    ['https://i.pinimg.com/736x/e9/2a/ba/e92abaeee99bbc8cfd8fe2820ccd5a57.jpg',
     'https://i.pinimg.com/1200x/a9/1d/0e/a91d0e7df9dd09eca66a0ef976d70c5b.jpg',
     'https://i.pinimg.com/736x/08/02/64/080264d0c040d46b1481762780120b95.jpg']
  ],
  ['removedor-bifasico', 'maquiagem', 'Removedor de Maquiagem Bifásico', 'Limpeza Suave',
    'Removedor que remove maquiagem de forma suave, incluindo à prova d\'água.',
    'https://i.pinimg.com/1200x/a9/1d/0e/a91d0e7df9dd09eca66a0ef976d70c5b.jpg',
    ['https://i.pinimg.com/736x/08/02/64/080264d0c040d46b1481762780120b95.jpg',
     'https://i.pinimg.com/736x/37/b6/c9/37b6c9c11eba90179150f789c458d5e3.jpg',
     'https://i.pinimg.com/1200x/67/11/fb/6711fba091577ed47ccefa55989e16b9.jpg']
  ]
];

// ============================================================
// 9. PENTEADOS (15 itens) - NOVA CATEGORIA
// ============================================================
var penteadosData = [
  ['coque-baixo', 'penteados', 'Coque Baixo Elegante', 'Clássico e Sofisticado',
    'Coque baixo com acabamento impecável, perfeito para eventos e ocasiões especiais.',
    'https://i.pinimg.com/736x/d7/a8/8c/d7a88c60e5f7ce217264486e3fc506f4.jpg',
    ['https://i.pinimg.com/736x/4a/d9/5b/4ad95bf7e6b141aadff33031fd09e9c5.jpg',
     'https://i.pinimg.com/736x/8d/9d/d7/8d9dd736af07495c8cd74672e0c88476.jpg',
     'https://i.pinimg.com/736x/bf/d5/70/bfd57032bcaddc8df549a25c2f5ee43e.jpg']
  ],
  ['box-braids', 'penteados', 'Trança Box Braids', 'Estilo e Proteção',
    'Tranças box braids estilosas e protetoras, ideais para quem busca versatilidade.',
    'https://i.pinimg.com/736x/34/27/f8/3427f83ed4451e1e17aa9822e4201d96.jpg',
    ['https://i.pinimg.com/736x/c7/96/f6/c796f647e8e72985856e0032ffba1bd1.jpg',
     'https://i.pinimg.com/736x/86/95/8b/86958b5ee0a8cbf5e0082666ef203ed7.jpg',
     'https://i.pinimg.com/736x/25/f3/7a/25f37a9f5dd2740755ba53f3f3f4f313.jpg']
  ],
  ['ondas-hollywood', 'penteados', 'Ondas Hollywoodianas', 'Glow e Sofisticação',
    'Ondas clássicas de Hollywood, elegantes e cheias de brilho e movimento.',
    'https://i.pinimg.com/736x/08/ab/69/08ab69db905060f2e62a6bed57d3e74e.jpg',
    ['https://i.pinimg.com/736x/5d/03/57/5d03576e6204c75b1bcd95d3f60c0e49.jpg',
     'https://i.pinimg.com/736x/35/83/99/358399b0b37e83d864a58c0237875a9d.jpg',
     'https://i.pinimg.com/736x/31/19/fb/3119fb4703a12cd9867c83cc38be904e.jpg']
  ],
  ['rabo-cavalo-alto', 'penteados', 'Rabo de Cavalo Alto', 'Moderno e Versátil',
    'Rabo de cavalo elevado com volume, moderno e versátil para qualquer ocasião.',
    'https://i.pinimg.com/736x/31/19/fb/3119fb4703a12cd9867c83cc38be904e.jpg',
    ['https://i.pinimg.com/736x/1e/79/0e/1e790e7d03357af0bb59fae1aaae5985.jpg',
     'https://i.pinimg.com/1200x/ec/97/85/ec9785ae609edd9958245167b09b776a.jpg',
     'https://i.pinimg.com/736x/66/bb/26/66bb266d7934a62d3f30132a9f8e7bc6.jpg']
  ],
  ['tranca-embutida', 'penteados', 'Trança Embutida (Dutch)', 'Clássico e Estrutural',
    'Trança embutida holandesa com estrutura clássica e acabamento impecável.',
    'https://i.pinimg.com/736x/66/bb/26/66bb266d7934a62d3f30132a9f8e7bc6.jpg',
    ['https://i.pinimg.com/1200x/e0/78/98/e078985c0a53eb4cab512bc560332e25.jpg',
     'https://i.pinimg.com/1200x/cb/85/d2/cb85d255cd035178f3f3270ab9943769.jpg',
     'https://i.pinimg.com/1200x/55/93/b2/5593b2539cc1c588ed90f7070a3cda0b.jpg']
  ],
  ['cachos-definidos', 'penteados', 'Cachos Definidos', 'Volume e Personalidade',
    'Cachos bem definidos e hidratados, com volume e personalidade marcantes.',
    'https://i.pinimg.com/1200x/55/93/b2/5593b2539cc1c588ed90f7070a3cda0b.jpg',
    ['https://i.pinimg.com/736x/3e/08/65/3e0865833599c47473882c25165ecbfc.jpg',
     'https://i.pinimg.com/736x/6b/2f/c2/6b2fc2069e0ab8ba141565ea5e582d58.jpg',
     'https://i.pinimg.com/736x/c9/2d/a3/c92da3565d7caf7b75db3fdceb30533f.jpg']
  ],
  ['half-up-half-down', 'penteados', 'Half Up Half Down', 'Meio Preso Moderno',
    'Cabelo solto com parte superior presa, estilo moderno e versátil.',
    'https://i.pinimg.com/736x/6b/2f/c2/6b2fc2069e0ab8ba141565ea5e582d58.jpg',
    ['https://i.pinimg.com/736x/c9/2d/a3/c92da3565d7caf7b75db3fdceb30533f.jpg',
     'https://i.pinimg.com/236x/99/7b/f9/997bf983affdcdec08562f8a02c374b6.jpg',
     'https://i.pinimg.com/736x/57/72/22/5772226643794074a0c51185ea867c17.jpg']
  ],
  ['tranca-nago', 'penteados', 'Trança Nagô', 'Raiz e Tradição',
    'Trança nagô com estilo e personalidade, representando raiz e tradição.',
    'https://i.pinimg.com/736x/57/72/22/5772226643794074a0c51185ea867c17.jpg',
    ['https://i.pinimg.com/736x/d7/f2/2b/d7f22bca30309f62004694c1f7dafa73.jpg',
     'https://i.pinimg.com/736x/df/5b/db/df5bdb685898292a9ca41b8bbb43ab31.jpg',
     'https://i.pinimg.com/736x/e2/ab/f8/e2abf8b4b139df7b29c8551f40d4d338.jpg']
  ],
  ['penteado-noiva', 'penteados', 'Penteado Noiva', 'Elegância e Romance',
    'Penteado especial para noivas, com elegância, romance e acabamento impecável.',
    'https://i.pinimg.com/736x/e2/ab/f8/e2abf8b4b139df7b29c8551f40d4d338.jpg',
    ['https://i.pinimg.com/736x/2a/eb/88/2aeb88213907101e1792b014a75fb4b3.jpg',
     'https://i.pinimg.com/736x/e0/ab/81/e0ab810bc60a2b40ec842c78a01f2de0.jpg',
     'https://i.pinimg.com/736x/46/bb/b8/46bbb8d4c1c4a748cb6cd717378d2e1a.jpg']
  ],
  ['baby-hair', 'penteados', 'Baby Hair Estilizado', 'Detalhe Urbano',
    'Baby hair modelado com gel e estilo, detalhe urbano e cheio de personalidade.',
    'https://i.pinimg.com/736x/46/bb/b8/46bbb8d4c1c4a748cb6cd717378d2e1a.jpg',
    ['https://i.pinimg.com/736x/57/72/22/5772226643794074a0c51185ea867c17.jpg',
     'https://i.pinimg.com/736x/d7/f2/2b/d7f22bca30309f62004694c1f7dafa73.jpg',
     'https://i.pinimg.com/736x/20/e5/0e/20e50e3d7d91ea1c77739beef358253e.jpg']
  ],
  ['tranca-francesa', 'penteados', 'Trança Francesa', 'Clássica e Estrutural',
    'Trança francesa tradicional, clássica e com estrutura impecável.',
    'https://i.pinimg.com/736x/20/e5/0e/20e50e3d7d91ea1c77739beef358253e.jpg',
    ['https://i.pinimg.com/736x/d2/3f/6c/d23f6cb6d4eba707e8af9dbd0365d7b3.jpg',
     'https://i.pinimg.com/236x/5b/d6/67/5bd6678622f65f802a790f27193d2b43.jpg',
     'https://i.pinimg.com/736x/b3/23/38/b323381530d017a718dfd57ebb70f280.jpg']
  ],
  ['coque-baguncado', 'penteados', 'Coque Bagunçado', 'Descontraído e Estiloso',
    'Coque bagunçado com fios soltos, descontraído e cheio de estilo.',
    'https://i.pinimg.com/736x/b3/23/38/b323381530d017a718dfd57ebb70f280.jpg',
    ['https://i.pinimg.com/736x/f2/f4/09/f2f4094f58a52962676524bcc79dc511.jpg',
     'https://i.pinimg.com/736x/a3/c2/a8/a3c2a82d52cb1f590ebbb7b6ba386229.jpg',
     'https://i.pinimg.com/736x/03/38/48/033848a08f6285b6473392e31710c7b5.jpg']
  ],
  ['rabo-trancado', 'penteados', 'Rabo Trançado', 'Moderno e Criativo',
    'Rabo de cavalo trançado, moderno e criativo para diversas ocasiões.',
    'https://i.pinimg.com/736x/a3/c2/a8/a3c2a82d52cb1f590ebbb7b6ba386229.jpg',
    ['https://i.pinimg.com/736x/03/38/48/033848a08f6285b6473392e31710c7b5.jpg',
     'https://i.pinimg.com/736x/62/56/a8/6256a87f0bc5ce4ad04e5008e3e75c3c.jpg',
     'https://i.pinimg.com/736x/f0/6f/91/f06f91f9f0acf8d1535fcac16cca7748.jpg']
  ],
  ['ondas-praia', 'penteados', 'Ondas de Praia', 'Natural e Leve',
    'Ondas suaves com movimento natural, estilo praia e acabamento leve.',
    'https://i.pinimg.com/736x/62/56/a8/6256a87f0bc5ce4ad04e5008e3e75c3c.jpg',
    ['https://i.pinimg.com/736x/f0/6f/91/f06f91f9f0acf8d1535fcac16cca7748.jpg',
     'https://i.pinimg.com/736x/b1/9a/be/b19abe36509b85262bb0ef929323b10f.jpg',
     'https://i.pinimg.com/736x/38/6b/70/386b70f42ee9c113ebd832de0b3d7af0.jpg']
  ],
  ['penteado-updo', 'penteados', 'Penteado Updo', 'Elegância e Sofisticação',
    'Penteado updo elaborado, com elegância e sofisticação para ocasiões especiais.',
    'https://i.pinimg.com/736x/b1/9a/be/b19abe36509b85262bb0ef929323b10f.jpg',
    ['https://i.pinimg.com/736x/38/6b/70/386b70f42ee9c113ebd832de0b3d7af0.jpg',
     'https://i.pinimg.com/736x/5d/03/57/5d03576e6204c75b1bcd95d3f60c0e49.jpg',
     'https://i.pinimg.com/736x/35/83/99/358399b0b37e83d864a58c0237875a9d.jpg']
  ]
];

// ============================================================
// CONSTRUINDO O OBJETO styleData GLOBAL
// ============================================================

addItemsToStyleData(cortesData);
addItemsToStyleData(coloracoesData);
addItemsToStyleData(produtosData);
addItemsToStyleData(kitsData);
addItemsToStyleData(ferramentasData);
addItemsToStyleData(acessoriosData);
addItemsToStyleData(solucoesData);
addItemsToStyleData(maquiagemData);
addItemsToStyleData(penteadosData);

console.log('HairOS · 135 cards carregados (9 categorias)');
console.log('Categorias: corte, coloracao, produto, kit, ferramentas, acessorios, solucoes, maquiagem, penteados');
console.log('Total de estilos: ' + Object.keys(styleData).length);
