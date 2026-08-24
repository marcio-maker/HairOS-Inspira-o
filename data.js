// data.js
// Base de dados completa do HairOS - 60 estilos
// ============================================================
// ESTRUTURA ORGANIZADA PARA IMAGENS
// ============================================================

// ============================================================
// VARIAÇÕES DE ALTURA PARA CARDS
// ============================================================
var alturasHome = ['h-md', 'h-lg'];

function getAlturaHome() {
    return Math.random() < 0.5 ? 'h-md' : 'h-lg';
}

// ============================================================
// FUNÇÃO PARA EMBARALHAR ARRAY
// ============================================================
function shuffleArray(arr) {
    for (var i = arr.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = arr[i];
        arr[i] = arr[j];
        arr[j] = temp;
    }
    return arr;
}

// ============================================================
// FUNÇÃO PARA BUSCAR PRODUTOS COMPLETOS (imagem + dados)
// ============================================================
function getOtherProductsData(currentId, categoria, count) {
    var allProducts = [];
    var sourceData = (categoria === 'kit') ? kitsData : produtosData;

    sourceData.forEach(function(item) {
        var id = item[0];
        var cat = item[1];
        var badge = item[2];
        var corte = item[3];
        var title = item[4];
        var desc = item[5];
        var img = item[6];
        var variants = item[7];

        if (id !== currentId) {
            allProducts.push({
                id: id,
                categoria: cat,
                badge: badge,
                corte: corte,
                title: title,
                desc: desc,
                img: img,
                variants: variants ? variants.slice(0, 3) : [img]
            });
        }
    });

    shuffleArray(allProducts);

    var unique = [];
    var seen = {};
    allProducts.forEach(function(item) {
        if (!seen[item.id]) {
            seen[item.id] = true;
            unique.push(item);
        }
    });

    return unique.slice(0, count);
}

// ============================================================
// FUNÇÃO PARA CRIAR UM CARD
// ============================================================
function createCard(id, categoria, badge, corte, title, desc, img, variants) {
    var finalVariants = [];
    var otherProductsData = [];

    if (categoria === 'produto' || categoria === 'kit') {
        var ownImages = Array.isArray(variants) ? variants.slice(0, 3) : [img];
        if (ownImages.length === 0) ownImages = [img];
        finalVariants = ownImages.slice();

        otherProductsData = getOtherProductsData(id, categoria, 7);

        otherProductsData.forEach(function(product) {
            var otherImg = (product.variants && product.variants.length > 0)
                ? product.variants[0]
                : product.img;
            finalVariants.push(otherImg);
        });

        while (finalVariants.length < 10) {
            finalVariants.push(ownImages[Math.floor(Math.random() * ownImages.length)]);
        }
    } else if (categoria === 'corte' || categoria === 'coloracao') {
        finalVariants = Array.isArray(variants) ? variants.slice(0, 10) : [img];
        while (finalVariants.length < 10 && finalVariants.length > 0) {
            finalVariants.push(finalVariants[finalVariants.length - 1]);
        }
        if (finalVariants.length === 0) finalVariants = [img];
    }

    return {
        id: id,
        categoria: categoria,
        badge: badge,
        corte: corte,
        title: title,
        desc: desc,
        img: img,
        variants: finalVariants,
        otherProductsData: otherProductsData,
        coloracao: coloracaoKits,
        cuidados: cuidadosKits,
        altura: getAlturaHome(),
        isUserPhoto: id && id.startsWith('user_')
    };
}

// ============================================================
// DADOS DOS KITS DE COLORAÇÃO E CUIDADOS
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
        link: 'https://meli.la/1MwSY7v',
        produtos: 'Shampoo Nutritive + Condicionador Resistance + Máscara Genesis + Leave-In Elixir Ultime'
    }, {
        nome: 'Kit L\'Oréal Expert',
        badge: 'Profissional',
        link: 'https://meli.la/2nmeunk',
        produtos: 'Shampoo Vitamino Color + Condicionador Absolut Repair + Máscara Nutrioil + Sérum Pro Longer'
    }, {
        nome: 'Kit Joico',
        badge: 'Hidratação',
        link: 'https://meli.la/2x9xqBe',
        produtos: 'Shampoo Moisture Recovery + Condicionador + Máscara Intensa + Leave-In K-PAK'
    }]
};

// ============================================================
// DADOS: CORTES (15 itens)
// Estrutura: [id, categoria, badge, título, subtítulo, descrição, img_principal, [img1, img2, ...]]
// ============================================================
var cortesData = [
    ['velvet-bob', 'corte', 'Corte', 'Velvet Bob', 'Bob Texturizado', 
     'Bob com camadas internas que criam volume sem peso. Ideal para cabelos finos que precisam de movimento.',
     'https://i.pinimg.com/736x/d7/a8/8c/d7a88c60e5f7ce217264486e3fc506f4.jpg',
     [
       'https://i.pinimg.com/736x/4a/d9/5b/4ad95bf7e6b141aadff33031fd09e9c5.jpg',
       'https://i.pinimg.com/736x/8d/9d/d7/8d9dd736af07495c8cd74672e0c88476.jpg',
       'https://i.pinimg.com/736x/bf/d5/70/bfd57032bcaddc8df549a25c2f5ee43e.jpg',
       'https://i.pinimg.com/736x/83/7b/6a/837b6aca26c733bd41c28c0153942a49.jpg',
       'https://i.pinimg.com/736x/46/34/e4/4634e474c43b6a8aa6f7459023b5ab94.jpg',
       'https://i.pinimg.com/736x/37/7a/d5/377ad5273df5fe2cf671d873d31d6393.jpg',
       'https://i.pinimg.com/736x/c4/06/57/c40657b0890088f4007ab9cc047c548e.jpg',
       'https://i.pinimg.com/736x/57/00/8b/57008bbead8ee5cbd7259af613e74690.jpg',
       'https://i.pinimg.com/736x/50/40/cb/5040cb20ff9f1936cda703a116cc6800.jpg',
       'https://i.pinimg.com/736x/12/97/7a/12977a09186ad656e31bd1820ebca998.jpg'
     ]
    ],
    ['pixie-cut', 'corte', 'Corte', 'Pixie Cut', 'Loira Fria Platinada',
     'Corte curto e prático com volume no topo. Perfeito para quem busca um visual moderno e de fácil manutenção.',
     'https://i.pinimg.com/736x/34/27/f8/3427f83ed4451e1e17aa9822e4201d96.jpg',
     [
       'https://i.pinimg.com/736x/c7/96/f6/c796f647e8e72985856e0032ffba1bd1.jpg',
       'https://i.pinimg.com/736x/86/95/8b/86958b5ee0a8cbf5e0082666ef203ed7.jpg',
       'https://i.pinimg.com/736x/25/f3/7a/25f37a9f5dd2740755ba53f3f3f4f313.jpg',
       'https://i.pinimg.com/736x/86/7d/73/867d730483c8d6db0a09f2c8e8f93427.jpg',
       'https://i.pinimg.com/736x/88/1e/dc/881edc6b830ca7fd49a95d551425b0c6.jpg',
       'https://i.pinimg.com/736x/21/13/90/211390e156a9c58109c38eb79b7fc2f2.jpg',
       'https://i.pinimg.com/736x/c8/ed/d8/c8edd8088204b8fd6f08beb57300c820.jpg',
       'https://i.pinimg.com/736x/3b/40/e6/3b40e60333fe00cec1b0a56cd5892dc8.jpg',
       'https://i.pinimg.com/736x/c3/56/54/c35654251423eb9a44ea088a3bf17c90.jpg',
       'https://i.pinimg.com/236x/ad/e7/ab/ade7ab449fad2d5f26c782b0aea4988f.jpg'
     ]
    ],
    ['butterfly-cut', 'corte', 'Corte', 'Butterfly Cut', 'Bege Natural',
     'Camadas em formato de asas que emolduram o rosto e mantêm o comprimento. Ótimo para dar leveza aos fios.',
     'https://i.pinimg.com/736x/08/ab/69/08ab69db905060f2e62a6bed57d3e74e.jpg',
     [
       'https://i.pinimg.com/736x/5d/03/57/5d03576e6204c75b1bcd95d3f60c0e49.jpg',
       'https://i.pinimg.com/736x/35/83/99/358399b0b37e83d864a58c0237875a9d.jpg',
       'https://i.pinimg.com/736x/31/19/fb/3119fb4703a12cd9867c83cc38be904e.jpg',
       'https://i.pinimg.com/736x/1e/79/0e/1e790e7d03357af0bb59fae1aaae5985.jpg',
       'https://i.pinimg.com/1200x/ec/97/85/ec9785ae609edd9958245167b09b776a.jpg',
       'https://i.pinimg.com/736x/66/bb/26/66bb266d7934a62d3f30132a9f8e7bc6.jpg',
       'https://i.pinimg.com/1200x/e0/78/98/e078985c0a53eb4cab512bc560332e25.jpg',
       'https://i.pinimg.com/1200x/cb/85/d2/cb85d255cd035178f3f3270ab9943769.jpg',
       'https://i.pinimg.com/1200x/55/93/b2/5593b2539cc1c588ed90f7070a3cda0b.jpg',
       'https://i.pinimg.com/736x/3e/08/65/3e0865833599c47473882c25165ecbfc.jpg'
     ]
    ],
    ['blunt-cut', 'corte', 'Corte', 'Blunt Cut', 'Morena Fria',
     'Corte reto e preciso, sem camadas. Realça a densidade e o peso dos fios, com acabamento marcante.',
     'https://i.pinimg.com/736x/06/15/ff/0615ff8b4ad4d40cf86d8f738b91eb44.jpg',
     [
       'https://i.pinimg.com/736x/87/1e/58/871e58b257c2ea53fbf7d71e76ffac3d.jpg',
       'https://i.pinimg.com/736x/37/06/de/3706de631afd06d34889c7957cea2ac1.jpg',
       'https://i.pinimg.com/736x/d6/ad/6e/d6ad6ed52b34ec8c0864345b5a79f80b.jpg',
       'https://i.pinimg.com/736x/4c/81/ed/4c81edd88a8f0fd8864e8b62fe0ed142.jpg',
       'https://i.pinimg.com/736x/4e/56/aa/4e56aa5be62fef617d4f6b5859aa8877.jpg',
       'https://i.pinimg.com/736x/f5/b8/5a/f5b85a3a195abe2e8fc1a475877a3e59.jpg',
       'https://i.pinimg.com/736x/9f/ff/28/9fff284e6d32430e4e8c7528c5db8b2a.jpg',
       'https://i.pinimg.com/736x/8d/90/4a/8d904a812c89f78d6a6580479c5639ac.jpg',
       'https://i.pinimg.com/236x/da/86/9a/da869a53567960e3ec375761ad87282e.jpg',
       'https://i.pinimg.com/236x/09/99/a2/0999a2392476e22f3e1540928e506741.jpg'
     ]
    ],
    ['shaggy-hair', 'corte', 'Corte', 'Shaggy Hair', 'Loira Despojada',
     'Camadas desconectadas e franja despretensiosa. Estilo despojado com textura e movimento natural.',
     'https://i.pinimg.com/736x/e7/6a/22/e76a22e038cba1d1daad41e6f2238004.jpg',
     [
       'https://i.pinimg.com/736x/6b/2f/c2/6b2fc2069e0ab8ba141565ea5e582d58.jpg',
       'https://i.pinimg.com/736x/c9/2d/a3/c92da3565d7caf7b75db3fdceb30533f.jpg',
       'https://i.pinimg.com/236x/99/7b/f9/997bf983affdcdec08562f8a02c374b6.jpg',
       'https://i.pinimg.com/736x/57/72/22/5772226643794074a0c51185ea867c17.jpg',
       'https://i.pinimg.com/736x/d7/f2/2b/d7f22bca30309f62004694c1f7dafa73.jpg',
       'https://i.pinimg.com/736x/df/5b/db/df5bdb685898292a9ca41b8bbb43ab31.jpg',
       'https://i.pinimg.com/736x/e2/ab/f8/e2abf8b4b139df7b29c8551f40d4d338.jpg',
       'https://i.pinimg.com/736x/2a/eb/88/2aeb88213907101e1792b014a75fb4b3.jpg',
       'https://i.pinimg.com/736x/e0/ab/81/e0ab810bc60a2b40ec842c78a01f2de0.jpg',
       'https://i.pinimg.com/736x/46/bb/b8/46bbb8d4c1c4a748cb6cd717378d2e1a.jpg'
     ]
    ],
    ['long-bob', 'corte', 'Corte', 'Long Bob', 'Loira Dourada',
     'Base na altura dos ombros com leve inclinação frontal. Versátil e fácil de modelar.',
     'https://i.pinimg.com/736x/63/fc/05/63fc05a4610ab0214e2e74e3d6a0014f.jpg',
     [
       'https://i.pinimg.com/736x/96/ed/ba/96edbad796f6419dde511218d30b4a89.jpg',
       'https://i.pinimg.com/736x/97/12/55/971255981aaef5c19d234cbe7bb15b5b.jpg',
       'https://i.pinimg.com/736x/20/e5/0e/20e50e3d7d91ea1c77739beef358253e.jpg',
       'https://i.pinimg.com/736x/d2/3f/6c/d23f6cb6d4eba707e8af9dbd0365d7b3.jpg',
       'https://i.pinimg.com/236x/5b/d6/67/5bd6678622f65f802a790f27193d2b43.jpg',
       'https://i.pinimg.com/736x/b3/23/38/b323381530d017a718dfd57ebb70f280.jpg',
       'https://i.pinimg.com/736x/f2/f4/09/f2f4094f58a52962676524bcc79dc511.jpg',
       'https://i.pinimg.com/736x/a3/c2/a8/a3c2a82d52cb1f590ebbb7b6ba386229.jpg',
       'https://i.pinimg.com/736x/03/38/48/033848a08f6285b6473392e31710c7b5.jpg',
       'https://i.pinimg.com/736x/62/56/a8/6256a87f0bc5ce4ad04e5008e3e75c3c.jpg'
     ]
    ],
    ['french-bob', 'corte', 'Corte', 'French Bob', 'Castanho Elegante',
     'Chanel curto na altura do maxilar com franja reta. Clássico, sofisticado e atemporal.',
     'https://i.pinimg.com/1200x/fa/83/3a/fa833a9f5008d52cbf0f86a0665bbe15.jpg',
     [
       'https://i.pinimg.com/736x/dd/80/09/dd80099cba2352f7f65c919016a5dbe1.jpg',
       'https://i.pinimg.com/736x/e0/df/ae/e0dfaebb413bd160699c30d24725a3fe.jpg',
       'https://i.pinimg.com/736x/55/45/71/5545719a22d414ab9294aa7baa9e4fff.jpg',
       'https://i.pinimg.com/736x/35/17/da/3517da17cfe29e89c2d7eb754df86ac9.jpg',
       'https://i.pinimg.com/736x/db/f7/9e/dbf79ed817e0b975c55cb26dbd34e429.jpg',
       'https://i.pinimg.com/736x/4a/3e/83/4a3e831657711fc4dc97a197a4f1a999.jpg',
       'https://i.pinimg.com/736x/66/64/19/666419699950d29fb4e1d8c7f5856acf.jpg',
       'https://i.pinimg.com/736x/47/44/7a/47447a0b919613631d537b2b80e8f319.jpg',
       'https://i.pinimg.com/736x/98/6f/3b/986f3b7f6ece364be7d82c4748a47d19.jpg',
       'https://i.pinimg.com/736x/19/1d/6c/191d6c53cbf97ef7288ede40819b29df.jpg'
     ]
    ],
    ['italian-bob', 'corte', 'Corte', 'Italian Bob', 'Morena Iluminada',
     'Bob na altura do pescoço com repicados internos. Dá corpo e movimento sem perder a estrutura.',
     'https://i.pinimg.com/736x/f5/fe/29/f5fe294a026ca252b16fdfb6eab958e5.jpg',
     [
       'https://i.pinimg.com/1200x/8e/f9/30/8ef93086d8b7f7754433ce6ca6e9d011.jpg',
       'https://i.pinimg.com/1200x/ed/80/40/ed8040ed4f0bcdb6c8ada69f3503f9c6.jpg',
       'https://i.pinimg.com/736x/84/57/ef/8457ef1450b5557e181cad27cd6f06a7.jpg',
       'https://i.pinimg.com/736x/af/3f/ab/af3fab13144b7ef5b5e77c8230b4f235.jpg',
       'https://i.pinimg.com/736x/4f/63/b4/4f63b42a1dbcf29bf0dad0590d5a6548.jpg',
       'https://i.pinimg.com/1200x/28/04/a4/2804a4eed55aff1f0a0ce1c3dbd4ef6f.jpg',
       'https://i.pinimg.com/1200x/0a/74/fe/0a74fee1be0245c8407f89a63a533019.jpg',
       'https://i.pinimg.com/1200x/90/27/0a/90270a5f82b31b3111e0be5a97be214b.jpg',
       'https://i.pinimg.com/1200x/b3/b2/3a/b3b23ae2980ee50d6a1d4ba922897237.jpg',
       'https://i.pinimg.com/1200x/8e/d8/bc/8ed8bcdab25ed919ae05c43dcd2113e0.jpg'
     ]
    ],
    ['wolf-cut', 'corte', 'Corte', 'Wolf Cut', 'Bege Perolado',
     'Topo volumoso e curto que afina em camadas até a nuca. Visual selvagem e cheio de atitude.',
     'https://i.pinimg.com/736x/2a/eb/88/2aeb88213907101e1792b014a75fb4b3.jpg',
     [
       'https://i.pinimg.com/736x/e2/ab/f8/e2abf8b4b139df7b29c8551f40d4d338.jpg',
       'https://i.pinimg.com/736x/57/2d/3c/572d3c6920502f1be25599787049d8bb.jpg',
       'https://i.pinimg.com/236x/b0/e3/9a/b0e39ade429a2a9d8ccf5f031a254593.jpg',
       'https://i.pinimg.com/1200x/cd/d1/bc/cdd1bcedcf0c93e1b364951f1efe09c5.jpg',
       'https://i.pinimg.com/736x/1f/b4/8c/1fb48c1b6555ada907b50003ff1050b2.jpg',
       'https://i.pinimg.com/736x/5e/22/ea/5e22eaf62afedf7f86fb211ad5256732.jpg',
       'https://i.pinimg.com/1200x/4c/a5/fd/4ca5fdda0604d77487df8e9705a70ca9.jpg',
       'https://i.pinimg.com/736x/f7/0d/22/f70d22c7d042764647b586154d752271.jpg',
       'https://i.pinimg.com/1200x/73/5f/f2/735ff2faf255057979d4b640c0dc451b.jpg',
       'https://i.pinimg.com/1200x/4b/19/93/4b19933dfa61235577390ad03438181a.jpg'
     ]
    ],
    ['bixie-cut', 'corte', 'Corte', 'Bixie Cut', 'Loira Mel',
     'Híbrido de pixie e bob: prático, desfiado e com movimento. Ideal para transição de cortes.',
     'https://i.pinimg.com/736x/4e/66/83/4e66838f18fe2212fa8ac412d9985447.jpg',
     [
       'https://i.pinimg.com/736x/ff/cb/e9/ffcbe9b68c10a9bf44b1610bbc6c3c0f.jpg',
       'https://i.pinimg.com/736x/24/39/90/243990bf81ae8af3e11281d755177fba.jpg',
       'https://i.pinimg.com/1200x/12/48/cb/1248cb0903da34be6111206cb6cf9468.jpg',
       'https://i.pinimg.com/736x/01/a2/3b/01a23b43d228aa31af028939a2ec9b06.jpg',
       'https://i.pinimg.com/736x/63/c7/3d/63c73d3104192776cc9ce37688722ef3.jpg',
       'https://i.pinimg.com/1200x/1d/20/2b/1d202bea3ca61a70ced6f540cb67ce5a.jpg',
       'https://i.pinimg.com/1200x/5a/5d/94/5a5d9491dd6cd02df00008a6344dd101.jpg',
       'https://i.pinimg.com/1200x/4d/c2/f8/4dc2f8b901e2a62ea2ae55d2f69d24a3.jpg',
       'https://i.pinimg.com/1200x/39/a5/6e/39a56e796c74efa0c601a48b8349e414.jpg',
       'https://i.pinimg.com/1200x/2d/1f/46/2d1f4608b8bfb22fddf1d34d834e436c.jpg'
     ]
    ],
    ['soft-layers', 'corte', 'Corte', 'Soft Layers', 'Cobre Natural',
     'Camadas longas e contínuas que dão movimento sem marcar divisões. Efeito natural e fluido.',
     'https://i.pinimg.com/1200x/e9/12/96/e91296a700072a42b4d9cfaafeb48ac7.jpg',
     [
       'https://i.pinimg.com/736x/96/31/54/96315450669e7b501f2c3a3df3d22c64.jpg',
       'https://i.pinimg.com/736x/3f/8a/56/3f8a567393a8ec2e33a032171cc9da1e.jpg',
       'https://i.pinimg.com/736x/53/a9/a9/53a9a9f6cae1b2cfbc439e44cba9b312.jpg',
       'https://i.pinimg.com/736x/28/08/b2/2808b20872bdf2f4d592937b832e5ebe.jpg',
       'https://i.pinimg.com/736x/e4/33/c6/e433c67d4a72a7e0db4c09264b1db14f.jpg',
       'https://i.pinimg.com/1200x/6e/4c/c7/6e4cc792bb849c411c7c45d4ade6a5ba.jpg',
       'https://i.pinimg.com/1200x/34/30/d8/3430d8b60e48812a8e1f15426af803f9.jpg',
       'https://i.pinimg.com/736x/43/c4/93/43c493fa3eff0cc7588e361d3df8af14.jpg',
       'https://i.pinimg.com/736x/9b/15/b9/9b15b9e256a6114b5148bee2650c1364.jpg',
       'https://i.pinimg.com/736x/23/ed/1a/23ed1a0d684e9c188c09ae26b62ff6cb.jpg'
     ]
    ],
    ['modern-mullet', 'corte', 'Corte', 'Modern Mullet', 'Platinado Radical',
     'Laterais e topo curtos contrastando com comprimento alongado na nuca. Estilo ousado e moderno.',
     'https://i.pinimg.com/736x/20/58/ac/2058ac84b233324378f9e26d578ef819.jpg',
     [
       'https://i.pinimg.com/236x/e6/a1/82/e6a1828757f3ecd53a78bdd550faaba6.jpg',
       'https://i.pinimg.com/1200x/19/ed/cf/19edcf705faee3021dca36773177f62a.jpg',
       'https://i.pinimg.com/1200x/16/64/f9/1664f9eaac25d965bc1c2d6741fda93b.jpg',
       'https://i.pinimg.com/1200x/27/d6/74/27d674710090918e0690581ebc8ef94e.jpg',
       'https://i.pinimg.com/1200x/cb/f4/f1/cbf4f1161d464c832dbb5293dd8de964.jpg',
       'https://i.pinimg.com/1200x/f8/70/24/f87024c447ec39609515b2290aff08bc.jpg',
       'https://i.pinimg.com/1200x/60/66/10/60661058bc83960f7d1f317c12ad2431.jpg',
       'https://i.pinimg.com/1200x/b1/80/77/b180775bb03e74077fe9d8c43f680032.jpg',
       'https://i.pinimg.com/736x/ff/53/32/ff5332897dac5127e398a301e47784b3.jpg',
       'https://i.pinimg.com/1200x/2f/92/d0/2f92d0c3dcfaaaaaab163894bd4a611d.jpg'
     ]
    ],
    ['clavicut', 'corte', 'Corte', 'Clavicut', 'Caramelo Glow',
     'Corte reto na altura da clavícula. Um médio versátil que combina com qualquer textura.',
     'https://i.pinimg.com/1200x/11/d9/e1/11d9e1a01d57ed8d1ea57700a636fa74.jpg',
     [
       'https://i.pinimg.com/736x/f6/fd/10/f6fd109767ac8c5eecc8eff4627a29b4.jpg',
       'https://i.pinimg.com/1200x/15/70/d8/1570d81bf27679068906d1bbec402541.jpg',
       'https://i.pinimg.com/736x/80/64/7b/80647beb8342644f1b0495329ae5dc5b.jpg',
       'https://i.pinimg.com/736x/a2/0c/66/a20c660ee91fd4fff2e840bcce525cc2.jpg',
       'https://i.pinimg.com/1200x/c8/33/f1/c833f10c4eecb915aca10301cf52eb4c.jpg',
       'https://i.pinimg.com/736x/b6/ba/71/b6ba71ea65fb533b1844d0049d7ac88c.jpg',
       'https://i.pinimg.com/736x/60/aa/9e/60aa9e7c143839c1649eff734c960da5.jpg',
       'https://i.pinimg.com/736x/f0/6f/91/f06f91f9f0acf8d1535fcac16cca7748.jpg',
       'https://i.pinimg.com/736x/b1/9a/be/b19abe36509b85262bb0ef929323b10f.jpg',
       'https://i.pinimg.com/736x/38/6b/70/386b70f42ee9c113ebd832de0b3d7af0.jpg'
     ]
    ],
    ['octopus-cut', 'corte', 'Corte', 'Octopus Cut', 'Loira Mel',
     'Topo arredondado e volumoso com camadas inferiores mais finas. Visual leve e cheio de personalidade.',
     'https://i.pinimg.com/1200x/99/a7/7c/99a77c4f583bad5a0d1c9319f44ade9b.jpg',
     [
       'https://i.pinimg.com/1200x/fe/b3/81/feb381a2026228724751dcf1770a61b8.jpg',
       'https://i.pinimg.com/736x/4e/ad/cc/4eadcc3c07ced2c32c6093d75c1667ff.jpg',
       'https://i.pinimg.com/736x/0c/9c/67/0c9c6782b990579ddbbe6fc28d341d75.jpg',
       'https://i.pinimg.com/1200x/3d/93/f6/3d93f6733e2577b5e83f98cbbdacfe9f.jpg',
       'https://i.pinimg.com/1200x/5d/48/92/5d489219e20ed97dabc8cfe59d1c0dcf.jpg',
       'https://i.pinimg.com/736x/00/71/f6/0071f65ebd3e8a6181c4c895462c9ba9.jpg',
       'https://i.pinimg.com/736x/c4/27/f5/c427f51e5840551ca2d5a42e38186485.jpg',
       'https://i.pinimg.com/1200x/30/9e/cb/309ecbbff1f7dff8b7fa402be710c0b1.jpg',
       'https://i.pinimg.com/736x/f6/fa/f4/f6faf40de98db74e25d1355ef012510c.jpg',
       'https://i.pinimg.com/736x/3c/f7/25/3cf7255b744af3c6fad16b48929493b7.jpg'
     ]
    ],
    ['hush-cut', 'corte', 'Corte', 'Hush Cut', 'Preto Natural',
     'Camadas profundas e leves com franja transparente. Corte suave e de acabamento natural.',
     'https://i.pinimg.com/736x/7c/1b/0b/7c1b0bae28ed1074ae441064c1d40b0b.jpg',
     [
       'https://i.pinimg.com/236x/27/65/7d/27657de35a3184d3bb88750265351f1e.jpg',
       'https://i.pinimg.com/736x/b0/2f/4f/b02f4f74b719d47b218c06dc1f19c224.jpg',
       'https://i.pinimg.com/736x/f0/8c/0e/f08c0e6a8009f431e0cee00ade8e28bb.jpg',
       'https://i.pinimg.com/736x/f5/db/b9/f5dbb925a567194db137be17148fb9af.jpg',
       'https://i.pinimg.com/736x/49/f2/5a/49f25a25d31fd2f7b8dca3f219559d9f.jpg',
       'https://i.pinimg.com/736x/2c/ff/3e/2cff3e43ed7e8559602509e135fc826b.jpg',
       'https://i.pinimg.com/736x/72/5f/a5/725fa532477651a17bcc070cd6d63c43.jpg',
       'https://i.pinimg.com/1200x/24/53/f0/2453f0e489e216491e4374d646bff696.jpg',
       'https://i.pinimg.com/1200x/d2/59/a6/d259a609279b2ede2980f3ee128d733f.jpg',
       'https://i.pinimg.com/1200x/87/7c/dd/877cddceab43b6a2b126e00b1f5c1ccf.jpg'
     ]
    ]
];

// ============================================================
// DADOS: COLORAÇÕES (15 itens)
// ============================================================
var coloracoesData = [
    ['ombre-tiger-eye', 'coloracao', 'Coloração', 'Ombré Tiger Eye', 'Transição Dourada',
     'Transição suave do escuro para o dourado. Efeito olho de tigre.',
     'https://i.pinimg.com/1200x/fc/77/96/fc7796a5b8212a0fd41f43792ede5351.jpg',
     [
       'https://i.pinimg.com/1200x/fc/77/96/fc7796a5b8212a0fd41f43792ede5351.jpg',
       'https://i.pinimg.com/736x/45/26/d3/4526d3bd85f723c62b5d376a21575ae5.jpg',
       'https://i.pinimg.com/736x/80/f3/bb/80f3bbce1fb5bb37fd8c921cd8ada7d2.jpg',
       'https://i.pinimg.com/736x/45/9c/a1/459ca1eba3cc70bc50f8414b1490a0b0.jpg',
       'https://i.pinimg.com/736x/cd/3c/0e/cd3c0ef3f5b2a4ec9c4e8b1e110b46ba.jpg',
       'https://i.pinimg.com/736x/81/b3/e3/81b3e38fcd2c99d11e48657daad65c74.jpg',
       'https://i.pinimg.com/236x/3c/ef/b5/3cefb5c8bcf36f31e91ccad6f55c79f5.jpg',
       'https://i.pinimg.com/736x/2b/93/62/2b936201040763501177f1cc4c1106c3.jpg',
       'https://i.pinimg.com/736x/ca/96/e9/ca96e93dd930794dfc51755adcc831bf.jpg',
       'https://i.pinimg.com/736x/41/c0/6d/41c06d6ed54a7b4605c5aa131a7b14b7.jpg'
     ]
    ],
    ['babylights-morena', 'coloracao', 'Coloração', 'Babylights Morena', 'Luzes Finíssimas',
     'Luzes finíssimas que imitam o efeito natural do sol.',
     'https://i.pinimg.com/1200x/37/c9/1c/37c91cbb94c03b8a37157bf367a3dfbc.jpg',
     [
       'https://i.pinimg.com/736x/69/c8/3b/69c83bfd72fd3022f6a6dc49b2b3f232.jpg',
       'https://i.pinimg.com/1200x/66/33/b3/6633b3d5f27363ed895a7cb870e20c78.jpg',
       'https://i.pinimg.com/736x/dd/7d/8e/dd7d8e39cea64d3f335fe067c8dd14b2.jpg',
       'https://i.pinimg.com/736x/f6/17/b5/f617b5b262544bb7a6f482f18d362487.jpg',
       'https://i.pinimg.com/1200x/e4/4b/da/e44bdac8a5105bfec972ba9a543bfeec.jpg',
       'https://i.pinimg.com/736x/0e/dc/3a/0edc3a3d742bbce816f8a7b9948c3422.jpg',
       'https://i.pinimg.com/736x/6e/08/7f/6e087fe54324ae27e3179a1f51db537c.jpg',
       'https://i.pinimg.com/736x/62/56/a8/6256a87f0bc5ce4ad04e5008e3e75c3c.jpg',
       'https://i.pinimg.com/736x/04/72/2d/04722d69e14755a8c25950f0da9adff3.jpg',
       'https://i.pinimg.com/1200x/b3/4a/0b/b34a0be19ad5436bcfd2dea58da00f6e.jpg'
     ]
    ],
    ['contour-highlights', 'coloracao', 'Coloração', 'Contour Highlights', 'Luzes Estratégicas',
     'Luzes estratégicas que valorizam o formato do rosto.',
     'https://i.pinimg.com/736x/a2/8b/0d/a28b0d206e5cc72f3ba38aafa9ad8031.jpg',
     [
       'https://i.pinimg.com/736x/81/cf/e1/81cfe196df3e580425a842f6af8f12e3.jpg',
       'https://i.pinimg.com/736x/30/0a/83/300a83dfb89f41edbeb57061216538f4.jpg',
       'https://i.pinimg.com/1200x/41/4f/e3/414fe3a069ba01def6a66d44ac222636.jpg',
       'https://i.pinimg.com/1200x/7f/35/f9/7f35f9d6ed44ca283c69bb674019aa2d.jpg',
       'https://i.pinimg.com/736x/56/3a/da/563ada1310e02123d3c9d1c64f102693.jpg',
       'https://i.pinimg.com/736x/4c/e8/9f/4ce89fee713b38688226ea540639b201.jpg',
       'https://i.pinimg.com/736x/7c/e6/f9/7ce6f9523c7282634f3a2adcb4e2cdd8.jpg',
       'https://i.pinimg.com/1200x/0e/bb/1f/0ebb1f1251107bde521cc59d5fc1b116.jpg',
       'https://i.pinimg.com/736x/ad/b1/ff/adb1ffeb0f07b5696705dae265aaff22.jpg',
       'https://i.pinimg.com/1200x/aa/cb/cf/aacbcffaf13927ee047eabcbda8cc1aa.jpg'
     ]
    ],
    ['balayage-loira', 'coloracao', 'Coloração', 'Balayage Loira', 'Luzes Naturais',
     'Técnica de luzes naturais com efeito degradê e movimento.',
     'https://i.pinimg.com/736x/67/53/d4/6753d4546e18a5b6e121879b4e45a5f5.jpg',
     [
       'https://i.pinimg.com/736x/67/53/d4/6753d4546e18a5b6e121879b4e45a5f5.jpg',
       'https://i.pinimg.com/1200x/9c/38/2e/9c382e31a4eaafd69ce5d685d82f238b.jpg',
       'https://i.pinimg.com/1200x/85/03/4b/85034b9e76143badec90e47cdac4ae36.jpg',
       'https://i.pinimg.com/1200x/bf/f2/4b/bff24b95458ec3242c742d7c7014996b.jpg',
       'https://i.pinimg.com/736x/b2/70/53/b27053d5918d3a819f9e48f0b864cb56.jpg',
       'https://i.pinimg.com/736x/69/81/cb/6981cbf1d971c00a4a4268120a2199be.jpg',
       'https://i.pinimg.com/1200x/a6/2c/4e/a62c4e52baecfd4e5a0cb7203b7c6dd9.jpg',
       'https://i.pinimg.com/736x/92/b3/fa/92b3fad62db6657d1d34725075a9cc0d.jpg',
       'https://i.pinimg.com/1200x/71/91/a0/7191a072c196f845426a91c111b5757b.jpg',
       'https://i.pinimg.com/736x/4f/4c/c3/4f4cc384ba311066a815ec3ba62db5af.jpg'
     ]
    ],
    ['californianas', 'coloracao', 'Coloração', 'Californianas', 'Efeito Sol',
     'Luzes que criam um efeito de sol californiano.',
     'https://i.pinimg.com/736x/c7/92/25/c7922574476f525938331938daf277f7.jpg',
     [
       'https://i.pinimg.com/736x/c7/92/25/c7922574476f525938331938daf277f7.jpg',
       'https://i.pinimg.com/736x/9b/30/3c/9b303c2040de9482f8391090b7cf8cfa.jpg',
       'https://i.pinimg.com/1200x/80/f3/bb/80f3bbce1fb5bb37fd8c921cd8ada7d2.jpg',
       'https://i.pinimg.com/736x/99/a0/1b/99a01b1ffd110e8e7fcadf5876a06dc7.jpg',
       'https://i.pinimg.com/1200x/9d/f8/60/9df860fa26577c0589865d7e85eaded1.jpg',
       'https://i.pinimg.com/736x/68/75/32/68753259a972205ad340a4a45186bce7.jpg',
       'https://i.pinimg.com/236x/0a/1e/b2/0a1eb224c389443cbcba956be1b3afc9.jpg',
       'https://i.pinimg.com/736x/67/55/9b/67559bf4b3891156ca4ea79c89f1a538.jpg',
       'https://i.pinimg.com/736x/6f/eb/38/6feb38fbbd82b0f67ed85dc10da2012f.jpg',
       'https://i.pinimg.com/736x/ce/af/83/ceaf83e5c53995750f53dacccb66f162.jpg'
     ]
    ],
    ['mechas-contour', 'coloracao', 'Coloração', 'Mechas Contour', 'Contorno Facial',
     'Luzes que contornam o rosto, iluminando e valorizando.',
     'https://i.pinimg.com/1200x/05/42/66/05426622b672a5271cdfcd4813595269.jpg',
     [
       'https://i.pinimg.com/1200x/05/42/66/05426622b672a5271cdfcd4813595269.jpg',
       'https://i.pinimg.com/1200x/ba/ea/88/baea88db56d4ee70ac25ef7ebe6b4bfa.jpg',
       'https://i.pinimg.com/1200x/48/ee/44/48ee440c6712e07c385f64752e866ae9.jpg',
       'https://i.pinimg.com/736x/c5/3f/f1/c53ff17f28ae54cb3611dcdcd1fd7c62.jpg',
       'https://i.pinimg.com/736x/02/a5/7e/02a57ec15ea09b843e1444f3a34ec8c1.jpg',
       'https://i.pinimg.com/736x/bb/23/81/bb23816992f43e93f579043582a057a6.jpg',
       'https://i.pinimg.com/736x/67/53/d4/6753d4546e18a5b6e121879b4e45a5f5.jpg',
       'https://i.pinimg.com/736x/c7/92/25/c7922574476f525938331938daf277f7.jpg',
       'https://i.pinimg.com/736x/6f/04/f7/6f04f7f22120c572e80a8d903f0f2baf.jpg',
       'https://i.pinimg.com/736x/72/3a/68/723a6849cd6b74d8aa9b1282cfceb7c9.jpg'
     ]
    ],
    ['highlights-loira', 'coloracao', 'Coloração', 'Highlights Loira', 'Luzes Loiras',
     'Luzes suaves que adicionam dimensão e brilho ao cabelo loiro.',
     'https://i.pinimg.com/1200x/6f/04/f7/6f04f7f22120c572e80a8d903f0f2baf.jpg',
     [
       'https://i.pinimg.com/1200x/6f/04/f7/6f04f7f22120c572e80a8d903f0f2baf.jpg',
       'https://i.pinimg.com/736x/23/ed/1a/23ed1a0d684e9c188c09ae26b62ff6cb.jpg',
       'https://i.pinimg.com/736x/c8/68/95/c8689579f77d930f3cb347d695ef9cdf.jpg',
       'https://i.pinimg.com/736x/6a/2b/a3/6a2ba31616da32c52a78bc7f6c681134.jpg',
       'https://i.pinimg.com/736x/74/ca/f2/74caf212d7e5e710ae77a6c18428470f.jpg',
       'https://i.pinimg.com/736x/8d/1b/47/8d1b47a13974241ddf3fc22f2517f62b.jpg',
       'https://i.pinimg.com/736x/67/53/d4/6753d4546e18a5b6e121879b4e45a5f5.jpg',
       'https://i.pinimg.com/736x/c7/92/25/c7922574476f525938331938daf277f7.jpg',
       'https://i.pinimg.com/736x/72/3a/68/723a6849cd6b74d8aa9b1282cfceb7c9.jpg',
       'https://i.pinimg.com/736x/7a/d4/f4/7ad4f49a2f9604293e2bc16d65a6d30f.jpg'
     ]
    ],
    ['cherry-cola', 'coloracao', 'Coloração', 'Cherry Cola', 'Vermelho Cereja',
     'Tom ruivo intenso com nuances de cereja e cola. Vibrante.',
     'https://i.pinimg.com/736x/72/3a/68/723a6849cd6b74d8aa9b1282cfceb7c9.jpg',
     [
       'https://i.pinimg.com/736x/72/3a/68/723a6849cd6b74d8aa9b1282cfceb7c9.jpg',
       'https://i.pinimg.com/1200x/82/47/a6/8247a6d404fefa0a7455646bb3ff74a7.jpg',
       'https://i.pinimg.com/1200x/33/57/b2/3357b2fd2041dd93adda096095757b2b.jpg',
       'https://i.pinimg.com/736x/45/2e/30/452e3073887ea0cf5d3542e4b729db2a.jpg',
       'https://i.pinimg.com/736x/1a/03/8f/1a038f70b77cfcf2a00d890716f28db1.jpg',
       'https://i.pinimg.com/736x/03/86/2f/03862f6e7221eebda5e3572e8ff31ab0.jpg',
       'https://i.pinimg.com/736x/67/53/d4/6753d4546e18a5b6e121879b4e45a5f5.jpg',
       'https://i.pinimg.com/736x/c7/92/25/c7922574476f525938331938daf277f7.jpg',
       'https://i.pinimg.com/736x/6f/04/f7/6f04f7f22120c572e80a8d903f0f2baf.jpg',
       'https://i.pinimg.com/736x/7a/d4/f4/7ad4f49a2f9604293e2bc16d65a6d30f.jpg'
     ]
    ],
    ['cowgirl-copper', 'coloracao', 'Coloração', 'Cowgirl Copper', 'Cobre Western',
     'Tom cobre intenso com inspiração western. Moderno e ousado.',
     'https://i.pinimg.com/1200x/7a/d4/f4/7ad4f49a2f9604293e2bc16d65a6d30f.jpg',
     [
       'https://i.pinimg.com/1200x/7a/d4/f4/7ad4f49a2f9604293e2bc16d65a6d30f.jpg',
       'https://i.pinimg.com/1200x/02/ba/8e/02ba8e2d674cab825f832834658f7416.jpg',
       'https://i.pinimg.com/736x/3e/08/65/3e0865833599c47473882c25165ecbfc.jpg',
       'https://i.pinimg.com/736x/4b/1b/1f/4b1b1f9af40c9cddd3a8920be95d6a4f.jpg',
       'https://i.pinimg.com/736x/3b/76/13/3b761394a95a6d05a99a357871e33345.jpg',
       'https://i.pinimg.com/736x/0b/77/70/0b7770ab19c1224a95c7091ea1c9b2f1.jpg',
       'https://i.pinimg.com/736x/67/53/d4/6753d4546e18a5b6e121879b4e45a5f5.jpg',
       'https://i.pinimg.com/736x/c7/92/25/c7922574476f525938331938daf277f7.jpg',
       'https://i.pinimg.com/736x/6f/04/f7/6f04f7f22120c572e80a8d903f0f2baf.jpg',
       'https://i.pinimg.com/736x/72/3a/68/723a6849cd6b74d8aa9b1282cfceb7c9.jpg'
     ]
    ],
    ['ruivo-doce-leite', 'coloracao', 'Coloração', 'Ruivo Doce de Leite', 'Ruivo Caramelo',
     'Tom ruivo com nuances carameladas e suaves. Sofisticado.',
     'https://i.pinimg.com/736x/8a/7c/d4/8a7cd4c0523d1384c8ac71d6b97b1541.jpg',
     [
       'https://i.pinimg.com/736x/8a/7c/d4/8a7cd4c0523d1384c8ac71d6b97b1541.jpg',
       'https://i.pinimg.com/1200x/18/9b/bd/189bbd0413031b38fafb74f1061a0213.jpg',
       'https://i.pinimg.com/736x/23/30/46/233046bbedfc1312e61ba72b32ac6c12.jpg',
       'https://i.pinimg.com/736x/89/3d/99/893d998853e05a1524b597da5fb24e66.jpg',
       'https://i.pinimg.com/736x/13/1f/17/131f17189e9a91a25163aa0874f14c49.jpg',
       'https://i.pinimg.com/736x/77/ba/9d/77ba9da6f62f2f3b3679a386d726e3c3.jpg',
       'https://i.pinimg.com/736x/67/53/d4/6753d4546e18a5b6e121879b4e45a5f5.jpg',
       'https://i.pinimg.com/736x/c7/92/25/c7922574476f525938331938daf277f7.jpg',
       'https://i.pinimg.com/736x/6f/04/f7/6f04f7f22120c572e80a8d903f0f2baf.jpg',
       'https://i.pinimg.com/736x/72/3a/68/723a6849cd6b74d8aa9b1282cfceb7c9.jpg'
     ]
    ],
    ['grisalhos-frios', 'coloracao', 'Coloração', 'Grisalhos Frios', 'Cinza Prateado',
     'Transição natural com tons de cinza prateado. Sofisticação.',
     'https://i.pinimg.com/1200x/0f/8b/f7/0f8bf776c83fa00d99150792aac564fd.jpg',
     [
       'https://i.pinimg.com/1200x/0f/8b/f7/0f8bf776c83fa00d99150792aac564fd.jpg',
       'https://i.pinimg.com/736x/15/08/58/150858c430b1700f450781e3c093375c.jpg',
       'https://i.pinimg.com/736x/b0/f1/d6/b0f1d6fdfc4df443e6409aeea819567d.jpg',
       'https://i.pinimg.com/736x/92/04/5a/92045afc6f9a4040d62e57c9f3238625.jpg',
       'https://i.pinimg.com/736x/db/b4/da/dbb4da6f46551f47c2bc1027186a947b.jpg',
       'https://i.pinimg.com/736x/15/f8/1e/15f81ed8db7341a6f943447f19b2a31f.jpg',
       'https://i.pinimg.com/736x/67/53/d4/6753d4546e18a5b6e121879b4e45a5f5.jpg',
       'https://i.pinimg.com/736x/c7/92/25/c7922574476f525938331938daf277f7.jpg',
       'https://i.pinimg.com/736x/6f/04/f7/6f04f7f22120c572e80a8d903f0f2baf.jpg',
       'https://i.pinimg.com/736x/72/3a/68/723a6849cd6b74d8aa9b1282cfceb7c9.jpg'
     ]
    ],
    ['grisalhos-quentes', 'coloracao', 'Coloração', 'Grisalhos Quentes', 'Cinza Avermelhado',
     'Transição com tons de cinza mais quentes e acinzentados.',
     'https://i.pinimg.com/736x/1e/aa/75/1eaa7549f9babe98cf52aee19771aa68.jpg',
     [
       'https://i.pinimg.com/736x/1e/aa/75/1eaa7549f9babe98cf52aee19771aa68.jpg',
       'https://i.pinimg.com/736x/d0/37/7e/d0377e6a0cd7f33fd4e69ac9d36c5c16.jpg',
       'https://i.pinimg.com/736x/58/1f/87/581f87188095c4a9b5e6d81c4b14a77c.jpg',
       'https://i.pinimg.com/736x/97/e6/67/97e667c6a8d2988cc13f492feec8eaf2.jpg',
       'https://i.pinimg.com/736x/0b/ed/3b/0bed3b231362bcf1427185b4d7133a7f.jpg',
       'https://i.pinimg.com/736x/33/99/dc/3399dcee4c2cd19a3e8445bb01958bde.jpg',
       'https://i.pinimg.com/736x/67/53/d4/6753d4546e18a5b6e121879b4e45a5f5.jpg',
       'https://i.pinimg.com/736x/c7/92/25/c7922574476f525938331938daf277f7.jpg',
       'https://i.pinimg.com/736x/6f/04/f7/6f04f7f22120c572e80a8d903f0f2baf.jpg',
       'https://i.pinimg.com/736x/72/3a/68/723a6849cd6b74d8aa9b1282cfceb7c9.jpg'
     ]
    ],
    ['mocha-mousse', 'coloracao', 'Coloração', 'Mocha Mousse', 'Marrom Café',
     'Marrom intenso com nuances suaves que lembram o café com leite.',
     'https://i.pinimg.com/736x/9b/15/b9/9b15b9e256a6114b5148bee2650c1364.jpg',
     [
       'https://i.pinimg.com/736x/9b/15/b9/9b15b9e256a6114b5148bee2650c1364.jpg',
       'https://i.pinimg.com/736x/67/53/d4/6753d4546e18a5b6e121879b4e45a5f5.jpg',
       'https://i.pinimg.com/736x/c7/92/25/c7922574476f525938331938daf277f7.jpg',
       'https://i.pinimg.com/736x/6f/04/f7/6f04f7f22120c572e80a8d903f0f2baf.jpg',
       'https://i.pinimg.com/736x/72/3a/68/723a6849cd6b74d8aa9b1282cfceb7c9.jpg',
       'https://i.pinimg.com/736x/7a/d4/f4/7ad4f49a2f9604293e2bc16d65a6d30f.jpg',
       'https://i.pinimg.com/736x/a2/8b/0d/a28b0d206e5cc72f3ba38aafa9ad8031.jpg',
       'https://i.pinimg.com/736x/0f/8b/f7/0f8bf776c83fa00d99150792aac564fd.jpg',
       'https://i.pinimg.com/736x/94/c2/3a/94c23a31d28d3291e80bf575516aa45c.jpg',
       'https://i.pinimg.com/736x/ed/4e/7e/ed4e7e466ab2d763d9fb47b14a69ee00.jpg'
     ]
    ],
    ['expensive-brunette', 'coloracao', 'Coloração', 'Expensive Brunette', 'Morena Premium',
     'Morena com reflexos estratégicos que criam um visual caro e sofisticado.',
     'https://i.pinimg.com/736x/a2/8b/0d/a28b0d206e5cc72f3ba38aafa9ad8031.jpg',
     [
       'https://i.pinimg.com/736x/a2/8b/0d/a28b0d206e5cc72f3ba38aafa9ad8031.jpg',
       'https://i.pinimg.com/736x/67/53/d4/6753d4546e18a5b6e121879b4e45a5f5.jpg',
       'https://i.pinimg.com/736x/c7/92/25/c7922574476f525938331938daf277f7.jpg',
       'https://i.pinimg.com/736x/6f/04/f7/6f04f7f22120c572e80a8d903f0f2baf.jpg',
       'https://i.pinimg.com/736x/72/3a/68/723a6849cd6b74d8aa9b1282cfceb7c9.jpg',
       'https://i.pinimg.com/736x/7a/d4/f4/7ad4f49a2f9604293e2bc16d65a6d30f.jpg',
       'https://i.pinimg.com/736x/9b/15/b9/9b15b9e256a6114b5148bee2650c1364.jpg',
       'https://i.pinimg.com/736x/0f/8b/f7/0f8bf776c83fa00d99150792aac564fd.jpg',
       'https://i.pinimg.com/736x/94/c2/3a/94c23a31d28d3291e80bf575516aa45c.jpg',
       'https://i.pinimg.com/736x/ed/4e/7e/ed4e7e466ab2d763d9fb47b14a69ee00.jpg'
     ]
    ],
    ['vanilla-blonde', 'coloracao', 'Coloração', 'Vanilla Blonde', 'Loira Baunilha',
     'Loira suave e cremosa com tons de baunilha e caramelo.',
     'https://i.pinimg.com/736x/94/c2/3a/94c23a31d28d3291e80bf575516aa45c.jpg',
     [
       'https://i.pinimg.com/736x/94/c2/3a/94c23a31d28d3291e80bf575516aa45c.jpg',
       'https://i.pinimg.com/736x/67/53/d4/6753d4546e18a5b6e121879b4e45a5f5.jpg',
       'https://i.pinimg.com/736x/c7/92/25/c7922574476f525938331938daf277f7.jpg',
       'https://i.pinimg.com/736x/6f/04/f7/6f04f7f22120c572e80a8d903f0f2baf.jpg',
       'https://i.pinimg.com/736x/72/3a/68/723a6849cd6b74d8aa9b1282cfceb7c9.jpg',
       'https://i.pinimg.com/736x/7a/d4/f4/7ad4f49a2f9604293e2bc16d65a6d30f.jpg',
       'https://i.pinimg.com/736x/9b/15/b9/9b15b9e256a6114b5148bee2650c1364.jpg',
       'https://i.pinimg.com/736x/a2/8b/0d/a28b0d206e5cc72f3ba38aafa9ad8031.jpg',
       'https://i.pinimg.com/736x/0f/8b/f7/0f8bf776c83fa00d99150792aac564fd.jpg',
       'https://i.pinimg.com/736x/ed/4e/7e/ed4e7e466ab2d763d9fb47b14a69ee00.jpg'
     ]
    ]
];

// ============================================================
// DADOS: PRODUTOS (15 itens)
// ============================================================
var produtosData = [
    ['kerastase-resistance-shampoo', 'produto', 'Produto', 'Kérastase Resistance Shampoo',
     'Força e Reconstrução',
     'Shampoo fortalecedor da linha Resistance, com Tecnologia Fibra-Kératine. Reconstrói a fibra capilar danificada, reduzindo a quebra e devolvendo resistência e elasticidade aos fios.',
     'https://i.pinimg.com/1200x/9b/db/44/9bdb44dcb9f6af8926a6298b5394ca2a.jpg',
     [
       'https://i.pinimg.com/736x/78/c0/a0/78c0a0db1783a7951c45cf16793df640.jpg',
       'https://i.pinimg.com/1200x/82/3a/72/823a7254a510ec701bcee0e480ba8315.jpg',
       'https://i.pinimg.com/1200x/88/0c/ad/880cadbbbe402961bb3bc96bb3b5ca54.jpg'
     ]
    ],
    ['kerastase-resistance-conditioner', 'produto', 'Produto', 'Kérastase Resistance Conditioner',
     'Reconstrução Diária',
     'Condicionador da linha Resistance que nutre e reconstrói a fibra capilar. Deixa os fios mais fortes, macios e com brilho intenso, ideal para cabelos danificados.',
     'https://i.pinimg.com/736x/fa/45/3b/fa453bcb817656633d0c07edf6aa8050.jpg',
     [
       'https://i.pinimg.com/736x/cb/3a/6a/cb3a6a212e772729875a40bf24d531f8.jpg',
       'https://i.pinimg.com/736x/24/0e/b1/240eb125b9e37fe19a69d67fe456df27.jpg',
       'https://i.pinimg.com/736x/ab/d4/6f/abd46fc8a83389a59dd9b55eb16037f9.jpg'
     ]
    ],
    ['kerastase-resistance-mask', 'produto', 'Produto', 'Kérastase Resistance Mask',
     'Reconstrução Profunda',
     'Máscara de tratamento intensivo da linha Resistance. Com ação profunda, reconstrói a fibra capilar danificada por processos químicos e térmicos, devolvendo força e vitalidade.',
     'https://i.pinimg.com/736x/8d/eb/c3/8debc3b7fb7a7e165e3870776c00c7e6.jpg',
     [
       'https://i.pinimg.com/1200x/13/c3/75/13c37585028872dc32a4297eee127e6e.jpg',
       'https://i.pinimg.com/736x/a0/2e/cf/a02ecf93acaae6f8bf0aa5d91d0ffa71.jpg',
       'https://i.pinimg.com/736x/3a/64/48/3a6448de3f6a44a84b7cab17c7a11071.jpg'
     ]
    ],
    ['kerastase-chronologiste-oil', 'produto', 'Produto', 'Kérastase Chronologiste Oil',
     'Óleo Regenerador',
     'Óleo capilar regenerador com tecnologia Quantum. Nutre, repara e protege os fios, proporcionando brilho extremo e maciez. Ideal para cabelos danificados e ressecados.',
     'https://i.pinimg.com/1200x/59/d8/dd/59d8dd9ea4a78fdeb7e0b420ffcdda0a.jpg',
     [
       'https://i.pinimg.com/736x/59/c0/57/59c0570e163d499dc010ccd33581ce6d.jpg',
       'https://i.pinimg.com/736x/51/d7/7d/51d77d1ba30e0bd6e67cb598001aadbd.jpg',
       'https://i.pinimg.com/736x/e5/63/30/e56330b7327b151f6085b8daa5aa6a8e.jpg'
     ]
    ],
    ['kerastase-thermique', 'produto', 'Produto', 'Kérastase Resistance Thermique',
     'Protetor Térmico',
     'Protetor térmico da linha Resistance que prepara os fios para secagem e modelagem. Protege até 230°C, evitando danos causados pelo calor e preservando a saúde capilar.',
     'https://i.pinimg.com/736x/f6/62/3d/f6623df560fe941b4fce33574488031c.jpg',
     [
       'https://i.pinimg.com/736x/a4/3d/4e/a43d4e01816a1ac5f01f449c1e4ddf5e.jpg',
       'https://i.pinimg.com/736x/b4/8d/97/b48d9783d0ab18919321f36e1386c0bc.jpg',
       'https://i.pinimg.com/1200x/5f/fd/db/5ffddb136e62711a585f1c040fe847ad.jpg'
     ]
    ],
    ['joico-moisture-shampoo', 'produto', 'Produto', 'Joico Moisture Shampoo',
     'Hidratação Intensa',
     'Shampoo hidratante da linha Moisture Recovery com tecnologia Bio-Advanced Peptide Complex. Restaura a umidade dos cabelos secos e danificados, devolvendo maciez e brilho.',
     'https://i.pinimg.com/736x/76/24/51/7624516be549ec68f4b74a9d481fe8c2.jpg',
     [
       'https://thekit.ca/wp-content/uploads/2023/07/Sized-Inline-2-Metal-Detox.jpg',
       'https://i.pinimg.com/736x/aa/91/ef/aa91ef7f58d2efed392dea3444690a5d.jpg',
       'https://i.pinimg.com/1200x/e3/93/4c/e3934c0c465aa33ef0c295d9fb6e5e65.jpg'
     ]
    ],
    ['joico-moisture-conditioner', 'produto', 'Produto', 'Joico Moisture Conditioner',
     'Nutrição e Maciez',
     'Condicionador da linha Moisture Recovery que nutre e desembaraça os fios. Proporciona hidratação profunda, maciez e proteção contra agressores externos.',
     'https://i.pinimg.com/736x/85/7f/03/857f03cf652b457605f277aee25ac6e1.jpg',
     [
       'https://i.pinimg.com/736x/21/23/3f/21233f6f00420dfd920ff5deda8f32f1.jpg',
       'https://i.pinimg.com/736x/ec/b3/8b/ecb38bd4b30677f9ec9b63fb3b274c6e.jpg',
       'https://i.pinimg.com/736x/7b/f8/b2/7bf8b2cb9df40798577467ce0953004f.jpg'
     ]
    ],
    ['joico-moisture-mask', 'produto', 'Produto', 'Joico Moisture Mask',
     'Hidratação Profunda',
     'Máscara de hidratação intensiva da linha Moisture Recovery. Repõe a umidade perdida, recupera a elasticidade e devolve o brilho a cabelos secos e danificados.',
     'https://i.pinimg.com/736x/36/31/20/36312033517c43f7f4b8adbf1b1178ad.jpg',
     [
       'https://i.pinimg.com/1200x/45/cc/98/45cc98b8de46cd2c214dde346fd16ed1.jpg',
       'https://i.pinimg.com/736x/2b/b8/31/2bb831c5fd89a70851841665fae8b96b.jpg',
       'https://i.pinimg.com/1200x/ff/d2/b9/ffd2b9808ccc298af28afb560b59c9ad.jpg'
     ]
    ],
    ['joico-color-endure', 'produto', 'Produto', 'Joico Color Endure Shampoo',
     'Proteção de Cor',
     'Shampoo da linha Color Endure que protege a cor e intensifica o brilho. Com Tecnologia Peptide Complex, prolonga a durabilidade da coloração e mantém os fios saudáveis.',
     'https://i.pinimg.com/736x/18/6e/5a/186e5aab3bba985de96fe34acca5d2ea.jpg',
     [
       'https://i.pinimg.com/1200x/0c/26/86/0c26865afb8790fd2e02a2714cb5e683.jpg',
       'https://i.pinimg.com/1200x/c8/01/3f/c8013fa8af539f27af838956ccd3effe.jpg',
       'https://i.pinimg.com/1200x/98/a2/a8/98a2a89c05b6de3c663624892d027e93.jpg'
     ]
    ],
    ['joico-defy-damage', 'produto', 'Produto', 'Joico Defy Damage Shampoo',
     'Defesa Antidano',
     'Shampoo da linha Defy Damage com Tecnologia Smart Release. Protege contra danos diários, poluição e calor, fortalecendo a fibra capilar e prevenindo a quebra e o ressecamento.',
     'https://i.pinimg.com/1200x/47/dd/21/47dd2172feacdaee8088c8119187edf3.jpg',
     [
       'https://i.pinimg.com/736x/7f/b9/b8/7fb9b8eae64870529b3c85c71e352f42.jpg',
       'https://i.pinimg.com/1200x/22/10/a0/2210a03151a42c9cb2b1623d4feef886.jpg',
       'https://i.pinimg.com/736x/24/35/1d/24351d93b8f043103eac576654cb5344.jpg'
     ]
    ],
    ['expert-absolut-repair-shampoo', 'produto', 'Produto', 'Expert Absolut Repair Shampoo',
     'Reconstrução',
     'Shampoo da linha Absolut Repair com Tecnologia Lipid-Repair. Reconstrói cabelos quimicamente danificados, devolvendo força, maciez e brilho intenso.',
     'https://i.pinimg.com/1200x/b2/69/d0/b269d04d3de7148082db4c45c179f2e6.jpg',
     [
       'https://i.pinimg.com/736x/be/1f/d5/be1fd51303ae794b19534394da3a861a.jpg',
       'https://i.pinimg.com/736x/89/6b/1c/896b1c1390819bb687feee9ad8ae7297.jpg',
       'https://i.pinimg.com/736x/82/a2/c8/82a2c82c0b93bf4eebacac702dfb3b6e.jpg'
     ]
    ],
    ['expert-absolut-repair-conditioner', 'produto', 'Produto', 'Expert Absolut Repair Conditioner',
     'Reconstrução Diária',
     'Condicionador da linha Absolut Repair que reconstrói a fibra capilar profundamente. Desembaraça, nutre e fortalece os fios danificados por processos químicos.',
     'https://i.pinimg.com/1200x/f7/0d/00/f70d00dddda6b8019e9fb55d0d92c63d.jpg',
     [
       'https://i.pinimg.com/736x/ac/e6/94/ace69459b5f955c0fefd0b873fe43f14.jpg',
       'https://i.pinimg.com/736x/e3/e0/b4/e3e0b4b434ac8a7e816fedd74348297b.jpg',
       'https://i.pinimg.com/1200x/9b/ab/34/9bab345fd309c4febc1aa00491b5fd71.jpg'
     ]
    ],
    ['expert-absolut-repair-mask', 'produto', 'Produto', 'Expert Absolut Repair Mask',
     'Reconstrução Profunda',
     'Máscara de reconstrução intensiva da linha Absolut Repair. Recupera a integridade da fibra capilar, devolvendo força, elasticidade e brilho a cabelos severamente danificados.',
     'https://i.pinimg.com/736x/34/59/ce/3459cebc3044e956410bb887d8a53457.jpg',
     [
       'https://i.pinimg.com/736x/34/59/ce/3459cebc3044e956410bb887d8a53457.jpg',
       'https://tse4.mm.bing.net/th/id/OIP.4CYgPmI6kHvfZB8Iw_jRWwHaHa?r=0&rs=1&pid=ImgDetMain&o=7&rm=3',
       'https://i.pinimg.com/736x/f7/c2/e3/f7c2e3d49a4f6e4af307529e5cc5932f.jpg'
     ]
    ],
    ['expert-vitamino-color', 'produto', 'Produto', 'Expert Vitamino Color Shampoo',
     'Proteção de Cor Diária',
     'Shampoo da linha Vitamino Color com Tecnologia Neo-Pigment. Protege a cor, intensifica o brilho e mantém a vitalidade dos fios coloridos por mais tempo.',
     'https://i.pinimg.com/736x/8c/4a/25/8c4a254ff5b4a4541a900bad2089b9c2.jpg',
     [
       'https://i.pinimg.com/1200x/3c/6a/9c/3c6a9cbababc27152504ca4953e738ff.jpg',
       'https://i.pinimg.com/736x/c7/df/b2/c7dfb25b28a11dcd98eb8ec001fb95c6.jpg',
       'https://i.pinimg.com/1200x/49/13/db/4913db0aeb90eaa39af627682e595518.jpg'
     ]
    ],
    ['expert-metal-detox', 'produto', 'Produto', 'Expert Metal Detox',
     'Desintoxicação Capilar',
     'Tratamento pré-coloração da linha Metal Detox que remove partículas metálicas da fibra capilar. Garante coloração mais uniforme, brilhante e duradoura.',
     'https://i.pinimg.com/736x/e0/ba/ab/e0baab11c582e2fa72c84d6eb9019386.jpg',
     [
       'https://i.pinimg.com/736x/dd/fa/e3/ddfae3b1f8f559f1843aea2610ac3176.jpg',
       'https://i.pinimg.com/1200x/b8/6e/fe/b86efec2e8686d63a0ab7149e0ff6f54.jpg',
       'https://i.pinimg.com/1200x/dd/fd/86/ddfd86b022f90fb7491aea4eb55b76d3.jpg'
     ]
    ]
];

// ============================================================
// DADOS: KITS (15 itens)
// ============================================================
var kitsData = [
    ['kit-kerastase-resistance', 'kit', 'Kit', 'Kérastase Resistance Kit', 'Reconstrução Completa',
     'Kit completo com Shampoo, Condicionador e Máscara da linha Resistance. Reconstrução intensiva para cabelos danificados, devolvendo força, elasticidade e brilho.',
     'https://i.pinimg.com/1200x/0c/dd/f1/0cddf1a088784488cc73ffbedfa53ebf.jpg',
     [
       'https://i.pinimg.com/736x/ed/d3/f2/edd3f267f2d995ca3ddd2f4316a2ea66.jpg',
       'https://i.pinimg.com/736x/26/59/83/26598308d3e280c3e5c12172fd30e8bc.jpg',
       'https://i.pinimg.com/736x/c4/19/c5/c419c52357f3293954cb12235bb8a567.jpg'
     ]
    ],
    ['kit-kerastase-chronologiste', 'kit', 'Kit', 'Kérastase Chronologiste Kit', 'Regeneração e Brilho',
     'Kit com Óleo Regenerador e Protetor Térmico Chronologiste. Nutrição profunda, reparação e proteção térmica para cabelos danificados e ressecados.',
     'https://i.pinimg.com/736x/c1/4a/bb/c14abbd5fb1d4528ab1371784cd4503b.jpg',
     [
       'https://i.pinimg.com/1200x/0d/39/ae/0d39aeeb056fd43fc060a56555480565.jpg',
       'https://i.pinimg.com/736x/85/2f/4d/852f4d0951ce8b754038f12f99c8b4ed.jpg',
       'https://i.pinimg.com/1200x/81/a8/bf/81a8bf33b07433341cb8f58c305bf429.jpg'
     ]
    ],
    ['kit-kerastase-thermique', 'kit', 'Kit', 'Kérastase Thermique Kit', 'Proteção Térmica',
     'Kit com Protetor Térmico e Óleo Finalizador. Protege os fios contra o calor de ferramentas até 230°C e devolve brilho e maciez intensos.',
     'https://i.pinimg.com/1200x/40/7e/87/407e877f2325ceded92fd59cee423193.jpg',
     [
       'https://i.pinimg.com/1200x/c1/3e/5d/c13e5d4ba01867b5a2de1a677d09302d.jpg',
       'https://i.pinimg.com/736x/a8/b6/fd/a8b6fddb483f3e94c5fd303b373af19c.jpg',
       'https://i.pinimg.com/736x/c5/31/c6/c531c62a3624f7dde4cdc2ee8ef6d8b6.jpg'
     ]
    ],
    ['kit-kerastase-resistance-mask', 'kit', 'Kit', 'Kérastase Resistance Mask Kit', 'Reconstrução Profunda',
     'Kit com 2 unidades da Máscara Resistance. Tratamento intensivo que reconstrói a fibra capilar danificada por processos químicos e térmicos.',
     'https://i.pinimg.com/736x/f7/c2/e3/f7c2e3d49a4f6e4af307529e5cc5932f.jpg',
     [
       'https://i.pinimg.com/736x/f7/c2/e3/f7c2e3d49a4f6e4af307529e5cc5932f.jpg',
       'https://br.lorealpartnershop.com/on/demandware.static/-/Sites-master-PPD-BR/default/dwd0e6bb9d/products/30163478_EN_1.jpg',
       'https://thekit.ca/wp-content/uploads/2023/07/Sized-Inline-2-Metal-Detox.jpg'
     ]
    ],
    ['kit-kerastase-hydration', 'kit', 'Kit', 'Kérastase Hydration Kit', 'Hidratação Essencial',
     'Kit com Shampoo, Condicionador e Máscara da linha Nutritive. Hidratação intensa para cabelos secos e ressecados, devolvendo maciez e brilho.',
     'https://i.pinimg.com/1200x/5e/59/9d/5e599d616ffdb609f55cc48a92832340.jpg',
     [
       'https://i.pinimg.com/736x/4a/a3/f4/4aa3f4b472556d5aa8e6ad2f66bd0595.jpg',
       'https://i.pinimg.com/1200x/ae/a4/60/aea460c2d74ca14511976aab025a01cf.jpg',
       'https://i.pinimg.com/236x/8f/46/30/8f463046ad92a0bc308d9c9a68e30d52.jpg'
     ]
    ],
    ['kit-joico-moisture', 'kit', 'Kit', 'Joico Moisture Recovery Kit', 'Hidratação Profunda',
     'Kit completo com Shampoo, Condicionador e Máscara Moisture Recovery. Hidratação intensiva com tecnologia Bio-Advanced Peptide Complex para cabelos secos e danificados.',
     'https://i.pinimg.com/1200x/55/d6/10/55d610f599b3c10b5fe4cafceb5104fc.jpg',
     [
       'https://i.pinimg.com/1200x/37/eb/38/37eb38f29a15f9f2b571ef4c72e9ae73.jpg',
       'https://i.pinimg.com/736x/67/be/08/67be084978b5c1f0fdf7170ccb071d9e.jpg',
       'https://i.pinimg.com/1200x/f0/39/f9/f039f9d99452b6304575864a8695a88b.jpg'
     ]
    ],
    ['kit-joico-color-endure', 'kit', 'Kit', 'Joico Color Endure Kit', 'Proteção de Cor',
     'Kit com Shampoo e Condicionador Color Endure. Protege a cor, intensifica o brilho e prolonga a durabilidade da coloração com Tecnologia Peptide Complex.',
     'https://i.pinimg.com/736x/ed/92/df/ed92dfe26b5bf8d567ffc982ec8335a9.jpg',
     [
       'https://i.pinimg.com/736x/55/f6/fb/55f6fbc94440f61acd2b29ce3a0ec87f.jpg',
       'https://i.pinimg.com/736x/81/5d/a5/815da5dd12b7f501add1182400694ef1.jpg',
       'https://i.pinimg.com/1200x/c8/45/45/c8454574dc124e61c5ff54b0fa7b4e87.jpg'
     ]
    ],
    ['kit-joico-defy-damage', 'kit', 'Kit', 'Joico Defy Damage Kit', 'Defesa Antidano',
     'Kit com Shampoo, Condicionador e Leave-in Defy Damage. Protege contra danos diários, poluição e calor com Tecnologia Smart Release.',
     'https://i.pinimg.com/236x/0b/92/13/0b9213aaedddaf68940bb3a89fb62dc8.jpg',
     [
       'https://i.pinimg.com/736x/36/a4/ec/36a4ec1861b63319fe1e9cdd71b533b6.jpg',
       'https://i.pinimg.com/1200x/d4/7b/cb/d47bcb80c0e571e40b7fc11b454f5059.jpg',
       'https://i.pinimg.com/736x/a5/87/83/a5878313d7f90c8a328fddb978de7d34.jpg'
     ]
    ],
    ['kit-joico-moisture-mask', 'kit', 'Kit', 'Joico Moisture Mask Kit', 'Hidratação Intensiva',
     'Kit com 2 unidades da Máscara Moisture Recovery. Repõe a umidade perdida, recupera a elasticidade e devolve o brilho a cabelos secos e danificados.',
     'https://th.bing.com/th/id/R.092399c54f14c855e2149acc7924af60?rik=JzIwXFcQei6vAQ&riu=http%3a%2f%2fconceptcshop.com%2fcdn%2fshop%2ffiles%2fkerastase-nutritive-nectar-thermique-150-ml-582017.png%3fv%3d1750310904%26width%3d2048&ehk=dtp43%2fbNlCZmYdcz1BaoB5hJqL2AlOGbFfCj3FcM3fw%3d&risl=&pid=ImgRaw&r=0',
     [
       'https://th.bing.com/th/id/R.092399c54f14c855e2149acc7924af60?rik=JzIwXFcQei6vAQ&riu=http%3a%2f%2fconceptcshop.com%2fcdn%2fshop%2ffiles%2fkerastase-nutritive-nectar-thermique-150-ml-582017.png%3fv%3d1750310904%26width%3d2048&ehk=dtp43%2fbNlCZmYdcz1BaoB5hJqL2AlOGbFfCj3FcM3fw%3d&risl=&pid=ImgRaw&r=0',
       'https://tse4.mm.bing.net/th/id/OIP.nLWo8PK2y7dcWIlb7-Nq3QHaHa?r=0&rs=1&pid=ImgDetMain&o=7&rm=3',
       'https://tse1.mm.bing.net/th/id/OIP.TxO0qEbQMc0PYD3JTacZ7wHaHa?r=0&rs=1&pid=ImgDetMain&o=7&rm=3'
     ]
    ],
    ['kit-joico-smoothing', 'kit', 'Kit', 'Joico Smoothing Kit', 'Antifrizz',
     'Kit com Shampoo e Condicionador Smoothing. Controle de frizz por 72h, com ação anti-humidade e brilho intenso para fios disciplinados e sedosos.',
     'https://tse4.mm.bing.net/th/id/OIP.nLWo8PK2y7dcWIlb7-Nq3QHaHa?r=0&rs=1&pid=ImgDetMain&o=7&rm=3',
     [
       'https://tse4.mm.bing.net/th/id/OIP.nLWo8PK2y7dcWIlb7-Nq3QHaHa?r=0&rs=1&pid=ImgDetMain&o=7&rm=3',
       'https://tse1.mm.bing.net/th/id/OIP.TxO0qEbQMc0PYD3JTacZ7wHaHa?r=0&rs=1&pid=ImgDetMain&o=7&rm=3',
       'https://i.pinimg.com/1200x/49/13/db/4913db0aeb90eaa39af627682e595518.jpg'
     ]
    ],
    ['kit-expert-absolut-repair', 'kit', 'Kit', 'Expert Absolut Repair Kit', 'Reconstrução Completa',
     'Kit completo com Shampoo, Condicionador e Máscara Absolut Repair. Reconstrução intensiva com Tecnologia Lipid-Repair para cabelos quimicamente danificados.',
     'https://i.pinimg.com/736x/9a/aa/9d/9aaa9db9764ac6550439b1d9f9fd8368.jpg',
     [
       'https://i.pinimg.com/736x/9a/aa/9d/9aaa9db9764ac6550439b1d9f9fd8368.jpg',
       'https://tse4.mm.bing.net/th/id/OIP.VVzZ4UhEwk8SXWoJKdxCQAHaHa?r=0&rs=1&pid=ImgDetMain&o=7&rm=3',
       'https://i.pinimg.com/736x/34/59/ce/3459cebc3044e956410bb887d8a53457.jpg'
     ]
    ],
    ['kit-expert-vitamino-color', 'kit', 'Kit', 'Expert Vitamino Color Kit', 'Proteção de Cor Diária',
     'Kit com Shampoo e Condicionador Vitamino Color. Protege a cor, intensifica o brilho e mantém a vitalidade dos fios coloridos com Tecnologia Neo-Pigment.',
     'https://tse4.mm.bing.net/th/id/OIP.VVzZ4UhEwk8SXWoJKdxCQAHaHa?r=0&rs=1&pid=ImgDetMain&o=7&rm=3',
     [
       'https://tse4.mm.bing.net/th/id/OIP.VVzZ4UhEwk8SXWoJKdxCQAHaHa?r=0&rs=1&pid=ImgDetMain&o=7&rm=3',
       'https://i.pinimg.com/736x/34/59/ce/3459cebc3044e956410bb887d8a53457.jpg',
       'https://tse4.mm.bing.net/th/id/OIP.4CYgPmI6kHvfZB8Iw_jRWwHaHa?r=0&rs=1&pid=ImgDetMain&o=7&rm=3'
     ]
    ],
    ['kit-expert-metal-detox', 'kit', 'Kit', 'Expert Metal Detox Kit', 'Desintoxicação Capilar',
     'Kit com Tratamento Metal Detox e Shampoo. Remove partículas metálicas da fibra capilar, garantindo coloração mais uniforme, brilhante e duradoura.',
     'https://i.pinimg.com/736x/34/59/ce/3459cebc3044e956410bb887d8a53457.jpg',
     [
       'https://i.pinimg.com/736x/34/59/ce/3459cebc3044e956410bb887d8a53457.jpg',
       'https://tse4.mm.bing.net/th/id/OIP.4CYgPmI6kHvfZB8Iw_jRWwHaHa?r=0&rs=1&pid=ImgDetMain&o=7&rm=3',
       'https://i.pinimg.com/736x/f7/c2/e3/f7c2e3d49a4f6e4af307529e5cc5932f.jpg'
     ]
    ],
    ['kit-expert-absolut-repair-mask', 'kit', 'Kit', 'Expert Absolut Repair Mask Kit', 'Reconstrução Profunda',
     'Kit com 2 unidades da Máscara Absolut Repair. Recupera a integridade da fibra capilar, devolvendo força, elasticidade e brilho a cabelos severamente danificados.',
     'https://tse4.mm.bing.net/th/id/OIP.4CYgPmI6kHvfZB8Iw_jRWwHaHa?r=0&rs=1&pid=ImgDetMain&o=7&rm=3',
     [
       'https://tse4.mm.bing.net/th/id/OIP.4CYgPmI6kHvfZB8Iw_jRWwHaHa?r=0&rs=1&pid=ImgDetMain&o=7&rm=3',
       'https://i.pinimg.com/736x/f7/c2/e3/f7c2e3d49a4f6e4af307529e5cc5932f.jpg',
       'https://br.lorealpartnershop.com/on/demandware.static/-/Sites-master-PPD-BR/default/dwd0e6bb9d/products/30163478_EN_1.jpg'
     ]
    ],
    ['kit-expert-serum', 'kit', 'Kit', 'Expert Serum Kit', 'Brilho e Maciez',
     'Kit com Sérum Finalizador e Óleo Capilar. Brilho intenso, maciez e nutrição para os fios, com proteção contra agressores externos e finalização profissional.',
     'https://i.pinimg.com/736x/f7/c2/e3/f7c2e3d49a4f6e4af307529e5cc5932f.jpg',
     [
       'https://i.pinimg.com/736x/f7/c2/e3/f7c2e3d49a4f6e4af307529e5cc5932f.jpg',
       'https://br.lorealpartnershop.com/on/demandware.static/-/Sites-master-PPD-BR/default/dwd0e6bb9d/products/30163478_EN_1.jpg',
       'https://thekit.ca/wp-content/uploads/2023/07/Sized-Inline-2-Metal-Detox.jpg'
     ]
    ]
];

// ============================================================
// CONSTRUINDO O OBJETO styleData GLOBAL
// ============================================================
var styleData = {};

function addItemsToStyleData(dataArray) {
    dataArray.forEach(function(item) {
        var id = item[0],
            cat = item[1],
            badge = item[2],
            corte = item[3],
            title = item[4],
            desc = item[5],
            img = item[6],
            variants = item[7];
        styleData[id] = createCard(id, cat, badge, corte, title, desc, img, variants);
    });
}

addItemsToStyleData(cortesData);
addItemsToStyleData(coloracoesData);
addItemsToStyleData(produtosData);
addItemsToStyleData(kitsData);s