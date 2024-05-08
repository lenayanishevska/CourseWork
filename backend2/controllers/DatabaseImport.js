const { Category, Size, Manufacturer, Attribute, Expense, ExpensesCategory, User, UserAddress, Product, ProductSize, ProductAttribute, Order, OrderProduct, Income} = require('../models');
const csv = require('csv-parser')
const fs = require('fs')
const { faker } = require('@faker-js/faker');

class DatabaseImport {

    async importDatabase(req, res, next) {
        try {
            const productsIds = [];
            const  readExpensesCategoriesData = () => {
                return new Promise((resolve, reject) => {
                    const results = [];
                    fs.createReadStream('expenses_categories.csv')
                        .pipe(csv())
                        .on('data', async (data) => {
                            try {
                                await ExpensesCategory.create({
                                    category: data.category,
                                });
                                results.push(data);
                            } catch (error) {
                                reject(error);
                            }
                        })
                        .on('end', () => {
                            resolve(results);
                        })
                        .on('error', (error) => {
                            reject(error);
                        });
                });
            }

            const  readSizesData = () => {
                return new Promise((resolve, reject) => {
                    const results = [];
                    fs.createReadStream('sizes.csv')
                        .pipe(csv())
                        .on('data', async (data) => {
                            try {
                                await Size.create({
                                    name: data.name,
                                });
                                results.push(data);
                            } catch (error) {
                                reject(error);
                            }
                        })
                        .on('end', () => {
                            resolve(results);
                        })
                        .on('error', (error) => {
                            reject(error);
                        });
                });
            }


            const  readManufacturersData = () => {
                return new Promise((resolve, reject) => {
                    const results = [];
                    fs.createReadStream('manufacturers.csv')
                        .pipe(csv())
                        .on('data', async (data) => {
                            try {
                                await Manufacturer.create({
                                    name: data.name,
                                });
                                results.push(data);
                            } catch (error) {
                                reject(error);
                            }
                        })
                        .on('end', () => {
                            resolve(results);
                        })
                        .on('error', (error) => {
                            reject(error);
                        });
                });
            }

            const readAttributesData = () => {
                return new Promise((resolve, reject) => {
                    const results = [];
                    fs.createReadStream('attributes.csv')
                        .pipe(csv())
                        .on('data', async (data) => {
                            try {
                                await Attribute.create({
                                    name: data.name,
                                });
                                results.push(data);
                            } catch (error) {
                                reject(error);
                            }
                        })
                        .on('end', () => {
                            resolve(results);
                        })
                        .on('error', (error) => {
                            reject(error);
                        });
                });
            }

            const readProductsData = (fileName, category, image) => {
                return new Promise((resolve, reject) => {
                    const results = [];
                    fs.createReadStream(fileName)
                        .pipe(csv())
                        .on('data', async (data) => {
                            try {
                                const manufacturerList = await Manufacturer.findAll();
                                const sizesList = await Size.findAll(); 
                                const sizesCount = await Size.count();

                                const attributesList = await Attribute.findAll(); 
                                const attributesCount = await Attribute.count();
                                const materials = ['Cotton', 'Denim', 'Velvet', 'Linen', 'Polyestr', 'Leather', 'Silk', 'Wool'];

                                const product = await Product.create({
                                    name: data.Product_Name,
                                    description: data.Details,
                                    price: faker.commerce.price({ min: 5, max: 200, dec: 2 }),
                                    SKU: faker.commerce.isbn(10),
                                    image_url: image,
                                    CategoryId: category,
                                    ManufacturerId: manufacturerList[faker.number.int({min: 0, max: manufacturerList.length - 1})].id,
                                    quantity: 0,
                                });

                                productsIds.push(product.id);

                                for (let j = 0; j < sizesCount; ++j) {
                                    const productSize = await ProductSize.create({
                                        quantity: faker.number.int({min: 50, max: 100}),
                                        sizeId: sizesList[j].id,
                                        productId: product.id,
                                    })
                                }


                                for (let j = 0; j < attributesCount; ++j) {
                                    if(attributesList[j].name === 'Color') {
                                        const productAttribute = await ProductAttribute.create({
                                            value: faker.color.human(),
                                            attributeId: attributesList[j].id,
                                            productId: product.id,
                                        })
                                    }
                                    if(attributesList[j].name === 'Material') {
                                        const productAttribute = await ProductAttribute.create({
                                            value: materials[faker.number.int({min: 0, max: manufacturerList.length - 1})],
                                            attributeId: attributesList[j].id,
                                            productId: product.id,
                                        })
                                    }
                                }

                                results.push(data);
                            } catch (error) {
                                reject(error);
                            }
                        })
                        .on('end', () => {
                            resolve(results);
                        })
                        .on('error', (error) => {
                            reject(error);
                        });
                });
            }

            const readManProductsData = (fileName, category, image) => {
                return new Promise((resolve, reject) => {
                    const results = [];
                    fs.createReadStream(fileName)
                        .pipe(csv())
                        .on('data', async (data) => {
                            try {
                                const manufacturerList = await Manufacturer.findAll();
                                const sizesList = await Size.findAll(); 
                                const sizesCount = await Size.count();

                                const attributesList = await Attribute.findAll(); 
                                const attributesCount = await Attribute.count();
                                const materials = ['Cotton', 'Denim', 'Velvet', 'Linen', 'Polyestr', 'Leather', 'Silk', 'Wool'];

                                const product = await Product.create({
                                    name: data.product_name,
                                    description: data.details,
                                    price: faker.commerce.price({ min: 5, max: 200, dec: 2 }),
                                    SKU: faker.commerce.isbn(10),
                                    image_url: image,
                                    CategoryId: category,
                                    ManufacturerId: manufacturerList[faker.number.int({min: 0, max: manufacturerList.length - 1})].id,
                                    quantity: 0,
                                });

                                productsIds.push(product.id);

                                for (let j = 0; j < sizesCount; ++j) {
                                    const productSize = await ProductSize.create({
                                        quantity: faker.number.int({min: 50, max: 100}),
                                        sizeId: sizesList[j].id,
                                        productId: product.id,
                                    })
                                }


                                for (let j = 0; j < attributesCount; ++j) {
                                    if(attributesList[j].name === 'Color') {
                                        const productAttribute = await ProductAttribute.create({
                                            value: faker.color.human(),
                                            attributeId: attributesList[j].id,
                                            productId: product.id,
                                        })
                                    }
                                    if(attributesList[j].name === 'Material') {
                                        const productAttribute = await ProductAttribute.create({
                                            value: materials[faker.number.int({min: 0, max: manufacturerList.length - 1})],
                                            attributeId: attributesList[j].id,
                                            productId: product.id,
                                        })
                                    }
                                }

                                results.push(data);
                            } catch (error) {
                                reject(error);
                            }
                        })
                        .on('end', () => {
                            resolve(results);
                        })
                        .on('error', (error) => {
                            reject(error);
                        });
                });
            }

            const generateOrders = () => {
                return new Promise(async (resolve, reject) => {
                    try {
                        const userList = await User.findAll();
                        const sizeList = await Size.findAll();
        
                        const ordersCount = 3000;
        
                        for (let i = 0; i < ordersCount; ++i) {
                            const userId = userList[faker.number.int({min: 0, max: userList.length - 1})].id;
                            const date = faker.date.between({from: '2023-04-22T00:00:00', to: '2024-05-05T00:00:00'});
        
                            const order = await Order.create({
                                date: date,
                                total_amount: faker.commerce.price({ min: 20, max: 500, dec: 2 }),
                                status: 'Completed',
                                UserId: userId,
                            });


                            await Income.create({
                                date: date,
                                amount: order.total_amount,
                                OrderId: order.id,
                            });
        
                            const randomCount = faker.number.int({min: 1, max: 7});
        
                            for(let j = 0; j < randomCount; ++j) {
                                const product = productsIds[faker.number.int({min: 0, max: productsIds.length - 1})];
                                const quantity = faker.number.int({min: 1, max: 3});

                                const oneProduct = await Product.findOne(
                                    {
                                        where: {
                                            id: product,
                                        }
                                    }
                                )
        
                                const orderProduct = await OrderProduct.create({
                                    amount: oneProduct.price * quantity,
                                    quantity: quantity,
                                    OrderId: order.id,
                                    ProductId: product,
                                    UserId: userId,
                                    size: 1,
                                });
                            }
                        }
                        resolve();
                    } catch (error) {
                        reject(error);
                    }
                });
            }

            await readExpensesCategoriesData();
            await readSizesData();
            await readManufacturersData();
            await readAttributesData();

            // expenses
            const expensesCategoryList = await ExpensesCategory.findAll();
            const expensesCount = 2000;
            for (let i = 0; i < expensesCount; ++i) {
                await Expense.create({
                    date: faker.date.between({from: '2023-04-22T00:00:00', to: '2024-05-05T00:00:00'}),
                    amount: faker.finance.amount({ min: 5, max: 500, dec: 2 }),
                    ExpensesCategoryId: expensesCategoryList[faker.number.int({min: 0, max: expensesCategoryList.length - 1})].id, 
                });
            }

            //  users
            const userCount = 1000;
            for (let i = 0; i < userCount; ++i) {
                const userAddress = await UserAddress.create({
                    address: faker.location.streetAddress(),
                    city: faker.location.city(),
                    country: faker.location.country(),
                    zipcode: faker.location.zipCode(),
                })
                
                const first_name = faker.person.firstName();
                const last_name = faker.person.lastName();

                await User.create({
                    first_name: first_name,
                    last_name: last_name,
                    email: faker.internet.email({ firstName: first_name, lastName: last_name, provider: 'gmail.com' }),
                    password: faker.internet.password({ length: 8 }),
                    is_admin: false,
                    UserAddressId: userAddress.id,
                })
            }

            await readProductsData('women/BLAZERS.csv', 16, '7dd48f1b-6381-4c94-b2f6-82a1fa8b59ff.jpg');
            await readProductsData('women/DRESSES.csv', 13, 'b5279e7a-710c-4f40-911c-26f9ac012abf.jpg');
            // await readProductsData('JACKETS.csv', 17, '');
            await readProductsData('women/JEANS.csv', 12, 'c8e43bf1-8693-4361-8164-56328bcf92ef.jpg');
            // await readProductsData('women/KNITWEAR.csv', 18, 'b674132774c840f50e6e54158f61897f.jpg');
            await readProductsData('women/SHIRTS.csv', 15, 'cfb5b063-c239-40e6-9036-4048ffb32bdb.jpg');
            // await readProductsData('SHORTS.csv', 19, '');
            await readProductsData('women/SKIRTS.csv', 14, 'd547bf15-aea9-4fe8-81a8-dbd2f00a04ef.jpg');
            await readProductsData('women/T-SHIRTS.csv', 10, '9e7cf670-8d3d-4533-861a-f6c308987dd2.jpg');
            await readManProductsData('men/BLAZERS.csv', 7, '857fd44b-d286-4964-8e21-23b78c97aa0c.jpg');
            await readManProductsData('men/JACKETS.csv', 23, '95049da8-4024-46ee-9fd5-7e85b09e2b76.jpg');
            await readManProductsData('men/JEANS.csv', 3, '36f3f03a-9021-4f94-951e-092064263d8d.jpg');
            // await readManProductsData('men/POLO.csv', 5, 'c9c88f12-8e65-4d25-81cf-53bf03c6c875.jpg');
            await readProductsData('women/TOPS.csv', 11, '66c99606-3ef2-4366-ba24-32fa45958f2d.jpg');
            await readProductsData('women/TROUSERS.csv', 20, '5542abd7-20e3-4512-b3fd-22f2ee4bf565.jpg');
            // await readProductsData('women/WAISTCOATS.csv', 21, 'b674132774c840f50e6e54158f61897f.jpg');
            // await readProductsData('men/BLAZERS.csv', 7, '857fd44b-d286-4964-8e21-23b78c97aa0c.jpg');
            // await readProductsData('men/JACKETS.csv', 23, '95049da8-4024-46ee-9fd5-7e85b09e2b76.jpg');
            // await readProductsData('men/JEANS.csv', 3, '36f3f03a-9021-4f94-951e-092064263d8d.jpg');
            // await readProductsData('men/POLO.csv', 5, 'c9c88f12-8e65-4d25-81cf-53bf03c6c875.jpg');
            await readManProductsData('men/SHORTS.csv', 9, '48c259d0-69a9-4e8b-a703-ca5ad031855a.jpg');
            await readManProductsData('men/T-SHIRTS.csv', 4, 'c1f48240-aabe-4f2f-8820-4d5f8bccfa95.jpg');
            await readManProductsData('men/TROUSERS.csv', 26, 'e9e6acf7-e0e2-44ec-9ed9-303ab762194b.jpg');
            // await readProductsData('men/SWEATERS.csv', 22, '');
            await readManProductsData('men/SHIRTS.csv', 24, 'c6967c40-c38f-425a-9e1e-6931416d8d93.jpg');
                
            await generateOrders();

            res.status(200).json({ message: 'Data imported successfully' });
        } catch (error) {
            console.error('Error importing data:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    }

    
}

module.exports = new DatabaseImport();
