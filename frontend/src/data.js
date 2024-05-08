const categories = [
    {
        name: 'Tops'
    },
    {
        name: 'Blouses'
    },
    {
        name: 'T-shirts'
    },
    {
        name: 'Pants'
    },
    {
        name: 'Jeans'
    },
    {
        name: 'Coats'
    },
    {
        name: 'Dresses'
    },
    {
        name: 'Jackets'
    },
];

const products = [
    {
        id: 1,
        name: 'Ribbed Tank Top',
        price: '$ 9.99',
        sizes: [
            {
                option: 'S'
            },
            {
                option: 'M',
            },
        ],
        description: 'Fitted tank top in ribbed cotton jersey with a round neckline.',
        material: 'Polyester',
        color: 'Beige',
        img: [
            "https://lp2.hm.com/hmgoepprod?set=quality%5B79%5D%2Csource%5B%2F57%2F43%2F5743239b6a1da1d6e34ac99e29d218b6b023e4c4.jpg%5D%2Corigin%5Bdam%5D%2Ccategory%5B%5D%2Ctype%5BLOOKBOOK%5D%2Cres%5Bm%5D%2Chmver%5B1%5D&call=url[file:/product/fullscreen]",
            "https://lp2.hm.com/hmgoepprod?set=quality%5B79%5D%2Csource%5B%2Fa8%2F58%2Fa858514ceede6db5c45cd9587382b107b23aa91f.jpg%5D%2Corigin%5Bdam%5D%2Ccategory%5B%5D%2Ctype%5BDESCRIPTIVESTILLLIFE%5D%2Cres%5Bm%5D%2Chmver%5B2%5D&call=url[file:/product/fullscreen]",
            "https://lp2.hm.com/hmgoepprod?set=format%5Bwebp%5D%2Cquality%5B79%5D%2Csource%5B%2Ffc%2F38%2Ffc38137b8bc05e158dd6d3e045f531ba029c3471.jpg%5D%2Corigin%5Bdam%5D%2Ccategory%5B%5D%2Ctype%5BLOOKBOOK%5D%2Cres%5Bm%5D%2Chmver%5B1%5D&call=url%5Bfile%3A%2Fproduct%2Fmain%5D",
        ],

    },
    {
        id: 2,
        name: 'Plissé Dress',
        price: '$ 34.99',
        sizes: [
            {
                option: 'S'
            },
            {
                option: 'M',
            },
            {
                option: 'L',
            },
        ],
        description: 'Short, A-line dress in plissé jersey. Low-cut V-neck, long balloon sleeves with narrow elastic at cuffs, and gathered seams below bust, at back of waist, and above hem for added volume. Partly lined.',
        material: 'Polyester',
        color: 'Pink',
        img: [
            "https://lp2.hm.com/hmgoepprod?set=quality%5B79%5D%2Csource%5B%2F83%2F91%2F8391fd649951ca3ad55ad1b5e399fc815338a8eb.jpg%5D%2Corigin%5Bdam%5D%2Ccategory%5B%5D%2Ctype%5BLOOKBOOK%5D%2Cres%5Bm%5D%2Chmver%5B1%5D&call=url[file:/product/main]",
            "https://lp2.hm.com/hmgoepprod?set=format%5Bwebp%5D%2Cquality%5B79%5D%2Csource%5B%2F9e%2Ff7%2F9ef7a6282fd37490ebd3ba3fec114711fde96b8f.jpg%5D%2Corigin%5Bdam%5D%2Ccategory%5B%5D%2Ctype%5BLOOKBOOK%5D%2Cres%5Bm%5D%2Chmver%5B1%5D&call=url%5Bfile%3A%2Fproduct%2Fmain%5D",
            "https://lp2.hm.com/hmgoepprod?set=format%5Bwebp%5D%2Cquality%5B79%5D%2Csource%5B%2F0e%2F2e%2F0e2e3d97cbfde59122c80a0eb360329d27e68897.jpg%5D%2Corigin%5Bdam%5D%2Ccategory%5B%5D%2Ctype%5BDESCRIPTIVESTILLLIFE%5D%2Cres%5Bm%5D%2Chmver%5B2%5D&call=url%5Bfile%3A%2Fproduct%2Fmain%5D",
        ],
    },
    {
        id: 3,
        name: 'Gathered Midi Dress',
        price: '$ 26.99',
        sizes: [
            {
                option: 'XS'
            },
            {
                option: 'S',
            },
        ],
        description: 'Fitted, calf-length dress in stretch jersey with an asymmetric neckline. Wide shoulder straps, including one twisted shoulder strap. Gathers at sides for a flattering, gently draped silhouette. Partly lined.',
        material: 'Polyester',
        color: 'Black',
        img: [
            "https://lp2.hm.com/hmgoepprod?set=quality%5B79%5D%2Csource%5B%2Fa8%2F3c%2Fa83c2356e552a4edf4889183608af6485a986885.jpg%5D%2Corigin%5Bdam%5D%2Ccategory%5B%5D%2Ctype%5BLOOKBOOK%5D%2Cres%5Bm%5D%2Chmver%5B1%5D&call=url[file:/product/main]",
            "https://lp2.hm.com/hmgoepprod?set=format%5Bwebp%5D%2Cquality%5B79%5D%2Csource%5B%2Fdc%2Ffc%2Fdcfc7b039335cea446fd51da0db234c58374ad69.jpg%5D%2Corigin%5Bdam%5D%2Ccategory%5B%5D%2Ctype%5BLOOKBOOK%5D%2Cres%5Bm%5D%2Chmver%5B1%5D&call=url%5Bfile%3A%2Fproduct%2Fmain%5D",
            "https://lp2.hm.com/hmgoepprod?set=format%5Bwebp%5D%2Cquality%5B79%5D%2Csource%5B%2Fe4%2F42%2Fe44246c76b6d4a09ebf7ce4c13f3e16b780f0331.jpg%5D%2Corigin%5Bdam%5D%2Ccategory%5Bladies_dresses_bodycon%5D%2Ctype%5BDESCRIPTIVESTILLLIFE%5D%2Cres%5Bm%5D%2Chmver%5B2%5D&call=url%5Bfile%3A%2Fproduct%2Fmain%5D",
        ],
    },
    {
        id: 4,
        name: 'Ribbed Tank Top',
        price: '$ 9.99',
        sizes: [
            {
                option: 'S'
            },
            {
                option: 'M',
            },
        ],
        description: 'Fitted tank top in ribbed cotton jersey with a round neckline.',
        material: 'Polyester',
        color: 'Cotton',
        img: [
            "https://lp2.hm.com/hmgoepprod?set=quality%5B79%5D%2Csource%5B%2F57%2F43%2F5743239b6a1da1d6e34ac99e29d218b6b023e4c4.jpg%5D%2Corigin%5Bdam%5D%2Ccategory%5B%5D%2Ctype%5BLOOKBOOK%5D%2Cres%5Bm%5D%2Chmver%5B1%5D&call=url[file:/product/fullscreen]",
            "https://lp2.hm.com/hmgoepprod?set=quality%5B79%5D%2Csource%5B%2Fa8%2F58%2Fa858514ceede6db5c45cd9587382b107b23aa91f.jpg%5D%2Corigin%5Bdam%5D%2Ccategory%5B%5D%2Ctype%5BDESCRIPTIVESTILLLIFE%5D%2Cres%5Bm%5D%2Chmver%5B2%5D&call=url[file:/product/fullscreen]",
            "https://lp2.hm.com/hmgoepprod?set=format%5Bwebp%5D%2Cquality%5B79%5D%2Csource%5B%2Ffc%2F38%2Ffc38137b8bc05e158dd6d3e045f531ba029c3471.jpg%5D%2Corigin%5Bdam%5D%2Ccategory%5B%5D%2Ctype%5BLOOKBOOK%5D%2Cres%5Bm%5D%2Chmver%5B1%5D&call=url%5Bfile%3A%2Fproduct%2Fmain%5D",
        ]
    },
    {
        id: 5,
        name: 'Ribbed Tank Top',
        price: '$ 9.99',
        sizes: [
            {
                option: 'S'
            },
            {
                option: 'M',
            },
        ],
        description: 'Fitted tank top in ribbed cotton jersey with a round neckline.',
        material: 'Polyester',
        color: 'Cotton',
        img: [
            "https://lp2.hm.com/hmgoepprod?set=quality%5B79%5D%2Csource%5B%2F57%2F43%2F5743239b6a1da1d6e34ac99e29d218b6b023e4c4.jpg%5D%2Corigin%5Bdam%5D%2Ccategory%5B%5D%2Ctype%5BLOOKBOOK%5D%2Cres%5Bm%5D%2Chmver%5B1%5D&call=url[file:/product/fullscreen]",
            "https://lp2.hm.com/hmgoepprod?set=quality%5B79%5D%2Csource%5B%2Fa8%2F58%2Fa858514ceede6db5c45cd9587382b107b23aa91f.jpg%5D%2Corigin%5Bdam%5D%2Ccategory%5B%5D%2Ctype%5BDESCRIPTIVESTILLLIFE%5D%2Cres%5Bm%5D%2Chmver%5B2%5D&call=url[file:/product/fullscreen]",
            "https://lp2.hm.com/hmgoepprod?set=format%5Bwebp%5D%2Cquality%5B79%5D%2Csource%5B%2Ffc%2F38%2Ffc38137b8bc05e158dd6d3e045f531ba029c3471.jpg%5D%2Corigin%5Bdam%5D%2Ccategory%5B%5D%2Ctype%5BLOOKBOOK%5D%2Cres%5Bm%5D%2Chmver%5B1%5D&call=url%5Bfile%3A%2Fproduct%2Fmain%5D",
        ]
    },
    {
        id: 6,
        name: 'Ribbed Tank Top',
        price: '$ 9.99',
        sizes: [
            {
                option: 'S'
            },
            {
                option: 'M',
            },
        ],
        description: 'Fitted tank top in ribbed cotton jersey with a round neckline.',
        material: 'Polyester',
        color: 'Cotton',
        img: [
            "https://lp2.hm.com/hmgoepprod?set=quality%5B79%5D%2Csource%5B%2F57%2F43%2F5743239b6a1da1d6e34ac99e29d218b6b023e4c4.jpg%5D%2Corigin%5Bdam%5D%2Ccategory%5B%5D%2Ctype%5BLOOKBOOK%5D%2Cres%5Bm%5D%2Chmver%5B1%5D&call=url[file:/product/fullscreen]",
            "https://lp2.hm.com/hmgoepprod?set=quality%5B79%5D%2Csource%5B%2Fa8%2F58%2Fa858514ceede6db5c45cd9587382b107b23aa91f.jpg%5D%2Corigin%5Bdam%5D%2Ccategory%5B%5D%2Ctype%5BDESCRIPTIVESTILLLIFE%5D%2Cres%5Bm%5D%2Chmver%5B2%5D&call=url[file:/product/fullscreen]",
            "https://lp2.hm.com/hmgoepprod?set=format%5Bwebp%5D%2Cquality%5B79%5D%2Csource%5B%2Ffc%2F38%2Ffc38137b8bc05e158dd6d3e045f531ba029c3471.jpg%5D%2Corigin%5Bdam%5D%2Ccategory%5B%5D%2Ctype%5BLOOKBOOK%5D%2Cres%5Bm%5D%2Chmver%5B1%5D&call=url%5Bfile%3A%2Fproduct%2Fmain%5D",
        ]
    },
    {
        id: 7,
        name: 'Ribbed Tank Top',
        price: '$ 9.99',
        sizes: [
            {
                option: 'S'
            },
            {
                option: 'M',
            },
        ],
        description: 'Fitted tank top in ribbed cotton jersey with a round neckline.',
        material: 'Polyester',
        color: 'Cotton',
        img: [
            "https://lp2.hm.com/hmgoepprod?set=quality%5B79%5D%2Csource%5B%2F57%2F43%2F5743239b6a1da1d6e34ac99e29d218b6b023e4c4.jpg%5D%2Corigin%5Bdam%5D%2Ccategory%5B%5D%2Ctype%5BLOOKBOOK%5D%2Cres%5Bm%5D%2Chmver%5B1%5D&call=url[file:/product/fullscreen]",
            "https://lp2.hm.com/hmgoepprod?set=quality%5B79%5D%2Csource%5B%2Fa8%2F58%2Fa858514ceede6db5c45cd9587382b107b23aa91f.jpg%5D%2Corigin%5Bdam%5D%2Ccategory%5B%5D%2Ctype%5BDESCRIPTIVESTILLLIFE%5D%2Cres%5Bm%5D%2Chmver%5B2%5D&call=url[file:/product/fullscreen]",
            "https://lp2.hm.com/hmgoepprod?set=format%5Bwebp%5D%2Cquality%5B79%5D%2Csource%5B%2Ffc%2F38%2Ffc38137b8bc05e158dd6d3e045f531ba029c3471.jpg%5D%2Corigin%5Bdam%5D%2Ccategory%5B%5D%2Ctype%5BLOOKBOOK%5D%2Cres%5Bm%5D%2Chmver%5B1%5D&call=url%5Bfile%3A%2Fproduct%2Fmain%5D",
        ]
    },
    {
        id: 8,
        name: 'Ribbed Tank Top',
        price: '$ 9.99',
        sizes: [
            {
                option: 'S'
            },
            {
                option: 'M',
            },
        ],
        description: 'Fitted tank top in ribbed cotton jersey with a round neckline.',
        material: 'Polyester',
        color: 'Cotton',
        img: [
            "https://lp2.hm.com/hmgoepprod?set=quality%5B79%5D%2Csource%5B%2F57%2F43%2F5743239b6a1da1d6e34ac99e29d218b6b023e4c4.jpg%5D%2Corigin%5Bdam%5D%2Ccategory%5B%5D%2Ctype%5BLOOKBOOK%5D%2Cres%5Bm%5D%2Chmver%5B1%5D&call=url[file:/product/fullscreen]",
            "https://lp2.hm.com/hmgoepprod?set=quality%5B79%5D%2Csource%5B%2Fa8%2F58%2Fa858514ceede6db5c45cd9587382b107b23aa91f.jpg%5D%2Corigin%5Bdam%5D%2Ccategory%5B%5D%2Ctype%5BDESCRIPTIVESTILLLIFE%5D%2Cres%5Bm%5D%2Chmver%5B2%5D&call=url[file:/product/fullscreen]",
            "https://lp2.hm.com/hmgoepprod?set=format%5Bwebp%5D%2Cquality%5B79%5D%2Csource%5B%2Ffc%2F38%2Ffc38137b8bc05e158dd6d3e045f531ba029c3471.jpg%5D%2Corigin%5Bdam%5D%2Ccategory%5B%5D%2Ctype%5BLOOKBOOK%5D%2Cres%5Bm%5D%2Chmver%5B1%5D&call=url%5Bfile%3A%2Fproduct%2Fmain%5D",
        ]
    },
    {
        id: 9,
        name: 'Ribbed Tank Top',
        price: '$ 9.99',
        sizes: [
            {
                option: 'S'
            },
            {
                option: 'M',
            },
        ],
        description: 'Fitted tank top in ribbed cotton jersey with a round neckline.',
        material: 'Polyester',
        color: 'Cotton',
        img: [
            "https://lp2.hm.com/hmgoepprod?set=quality%5B79%5D%2Csource%5B%2F57%2F43%2F5743239b6a1da1d6e34ac99e29d218b6b023e4c4.jpg%5D%2Corigin%5Bdam%5D%2Ccategory%5B%5D%2Ctype%5BLOOKBOOK%5D%2Cres%5Bm%5D%2Chmver%5B1%5D&call=url[file:/product/fullscreen]",
            "https://lp2.hm.com/hmgoepprod?set=quality%5B79%5D%2Csource%5B%2Fa8%2F58%2Fa858514ceede6db5c45cd9587382b107b23aa91f.jpg%5D%2Corigin%5Bdam%5D%2Ccategory%5B%5D%2Ctype%5BDESCRIPTIVESTILLLIFE%5D%2Cres%5Bm%5D%2Chmver%5B2%5D&call=url[file:/product/fullscreen]",
            "https://lp2.hm.com/hmgoepprod?set=format%5Bwebp%5D%2Cquality%5B79%5D%2Csource%5B%2Ffc%2F38%2Ffc38137b8bc05e158dd6d3e045f531ba029c3471.jpg%5D%2Corigin%5Bdam%5D%2Ccategory%5B%5D%2Ctype%5BLOOKBOOK%5D%2Cres%5Bm%5D%2Chmver%5B1%5D&call=url%5Bfile%3A%2Fproduct%2Fmain%5D",
        ]
    },
    {
        id: 10,
        name: 'Ribbed Tank Top',
        price: '$ 9.99',
        sizes: [
            {
                option: 'S'
            },
            {
                option: 'M',
            },
        ],
        description: 'Fitted tank top in ribbed cotton jersey with a round neckline.',
        material: 'Polyester',
        color: 'Cotton',
        img: [
            "https://lp2.hm.com/hmgoepprod?set=quality%5B79%5D%2Csource%5B%2F57%2F43%2F5743239b6a1da1d6e34ac99e29d218b6b023e4c4.jpg%5D%2Corigin%5Bdam%5D%2Ccategory%5B%5D%2Ctype%5BLOOKBOOK%5D%2Cres%5Bm%5D%2Chmver%5B1%5D&call=url[file:/product/fullscreen]",
            "https://lp2.hm.com/hmgoepprod?set=quality%5B79%5D%2Csource%5B%2Fa8%2F58%2Fa858514ceede6db5c45cd9587382b107b23aa91f.jpg%5D%2Corigin%5Bdam%5D%2Ccategory%5B%5D%2Ctype%5BDESCRIPTIVESTILLLIFE%5D%2Cres%5Bm%5D%2Chmver%5B2%5D&call=url[file:/product/fullscreen]",
            "https://lp2.hm.com/hmgoepprod?set=format%5Bwebp%5D%2Cquality%5B79%5D%2Csource%5B%2Ffc%2F38%2Ffc38137b8bc05e158dd6d3e045f531ba029c3471.jpg%5D%2Corigin%5Bdam%5D%2Ccategory%5B%5D%2Ctype%5BLOOKBOOK%5D%2Cres%5Bm%5D%2Chmver%5B1%5D&call=url%5Bfile%3A%2Fproduct%2Fmain%5D",
        ]
    },

]

const cartProducts = [
    {
        id: 1,
        name: 'Ribbed Tank Top',
        price: '9.99',
        quantity: 2,
        total: '19.98'
    },
    {
        id: 2,
        name: 'Plissé Dress',
        price: '34.99',
        quantity: 1,
        total: '34.99'
    },
    {
        id: 3,
        name: 'Gathered Midi Dress',
        price: '26.99',
        quantity: 1,
        total: '26.99'
    },
    

]

export { categories, products, cartProducts };