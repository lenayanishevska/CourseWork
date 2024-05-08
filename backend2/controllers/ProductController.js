const Joi = require("joi");
const uuid = require("uuid");
const path = require("path");
const { Op } = require("sequelize");
const moment = require('moment');

const {
  Product,
  OrderProduct,
  Order,
  Attribute,
  Category,
  Manufacturer,
  ProductAttribute,
  Size,
  ProductSize,
} = require("../models");

class ProductController {
  async list(req, res, next) {
    const querySchema = Joi.object({
      parentCategoryId: Joi.number(),
      sort: Joi.string().optional(),
      filter: Joi.string().optional(),
      itemPerPage: Joi.number().default(10),
      page: Joi.number().default(0),
      name: Joi.string().optional(), 
    });
    
    const { parentCategoryId, sort, filter, itemPerPage, page, name } = await querySchema.validateAsync(req.query);
    
    const where = {};
    
    if (parentCategoryId) {
      const categories = await Category.findAll({
        where: { parentCategoryId },
      });
      const categoryIds = categories.map((category) => category.id);
      where.CategoryId = categoryIds;
    }
    
    if (filter) {
      const { CategoryId, manufacturer, fromPrice, toPrice } = JSON.parse(filter);
    
      if (CategoryId) {
        where.CategoryId = CategoryId;
      }
      if (manufacturer) {
        where.ManufacturerId = manufacturer;
      }
      if (fromPrice && toPrice) {
        where.price = { [Op.between]: [fromPrice, toPrice] };
      }
    }
    
    if (name) {
      where.name = { [Op.iLike]: `%${name}%` }; // Пошук за ім'ям (name)
    }
    
    let order = [];
    if (sort) {
      const { sortField, sortOrder } = JSON.parse(sort);
      order = [[sortField, sortOrder]];
    }
    
    const list = await Product.findAll({
      where,
      order,
      limit: itemPerPage,
      offset: page * itemPerPage,
    });
    
    const totalCount = await Product.count({ where });
    
    const pageCount = Math.ceil(totalCount / itemPerPage);
    
    return {
      list,
      totalCount,
      itemPerPage,
      pageCount,
    };    
  }

  async create(req, res, next) {
    const bodySchema = Joi.object({
      name: Joi.string().required(),
      description: Joi.string().required(),
      price: Joi.number().required(),
      SKU: Joi.string().required(),
      CategoryId: Joi.number().required(),
      ManufacturerId: Joi.number().required(),
    });

    const { name, description, price, SKU, CategoryId, ManufacturerId } =
      await bodySchema.validateAsync(req.body);

    const { image_url } = req.files;
    let fileName = uuid.v4() + ".jpg";
    image_url.mv(path.resolve(__dirname, "..", "static", fileName));

    const product = await Product.create({
      name,
      description,
      price,
      SKU,
      image_url: fileName,
      CategoryId,
      ManufacturerId,
    });

    return product;
  }

  async createProduct(req, res, next) {

    const { productName, productDescription, price, sku, category, manufacturer, productSizes, productAttributes} = req.body;

    const { file } = req.files;
    const fileName = `${uuid.v4()}.jpg`;
    file.mv(path.resolve(__dirname, '..', 'static', fileName));

    const product = await Product.create({
      name: productName,
      description: productDescription,
      price,
      SKU: sku,
      image_url: fileName,
      CategoryId: category,
      ManufacturerId: manufacturer,
      quantity: 0
    });

    if(productSizes) {
      const sizes = JSON.parse(productSizes);

      for (const size of sizes) {
        console.log(size.size);
        console.log(size.quantity);
        console.log(product.id);
        await ProductSize.create({
          sizeId: size.size,
          quantity: size.quantity,
          productId: product.id
        });
      }
    }

    if(productAttributes) {
      const attributes = JSON.parse(productAttributes);

      for (const attribute of attributes) {
        console.log(attribute.attribute);
        console.log(attribute.value);
        await ProductAttribute.create({
          attributeId: attribute.attribute,
          value: attribute.value,
          productId: product.id
        });
      }
    }

    return product;
  }

  async getById(req, res, next) {
    const querySchema = Joi.object({
      productId: Joi.number(),
    });

    const { productId } = await querySchema.validateAsync(req.query);

    const product = await Product.findOne({
      where: {
        id: productId,
      },
      include: [
        {
          model: Category,
        },
        {
          model: Manufacturer,
        },
      ],
    });

    if (!product) {
      throw new Error("Product not found");
    }

    const attributes = await ProductAttribute.findAll({
      where: {
        productId,
      },
      include: [
        {
          model: Attribute,
          as: 'attribute',
        },
      ],
    });

    const options = await ProductSize.findAll({
      where: {
          productId,
          quantity: {
              [Op.gt]: 0, 
          },
      },
      include: [
          {
              model: Size,
              as: 'size',
          },
      ],
    });

    return {
      product,
      attributes: attributes.map(attribute => ({
        name: attribute.attribute.name,
        value: attribute.value,
      })),
      options: options.map(option => ({
        id: option.id,
        name: option.size.name,
      })),
    };
  }

  async addToCart(req, res, next) {
    const bodySchema = Joi.object({
      productId: Joi.number().required(),
      quantity: Joi.number().required(),
      sizeId: Joi.number().required(),
    });

    const { productId, quantity, sizeId } = await bodySchema.validateAsync(
      req.body
    );

    const userId = req.user.id;

    const product = await Product.findOne({
      where: {
        id: productId,
      },
    });

    if (!product) {
      throw new Error("Product not found");
    }

    const productSize = await ProductSize.findOne({
      where: {
        id: sizeId
      },
    });

    if (!productSize || productSize.quantity < quantity) {
      throw new Error("Insufficient quantity of product in selected size");
    }

    const orderProduct = await OrderProduct.findOne({
      where: {
        ProductId: productId,
        UserId: userId,
        size: sizeId,
        OrderId: null,
      },
    });

    if (orderProduct) {
      const new_quantity = orderProduct.quantity + quantity;

      if (productSize.quantity < new_quantity) {
        throw new Error("Insufficient quantity of product in selected size");
      }
  
      await OrderProduct.update(
        {
          quantity: new_quantity,
          amount: product.price * (new_quantity),
        },
        {
          where: {
            id: orderProduct.id,
          },
        }
      );
    } else {
      await OrderProduct.create({
        ProductId: productId,
        UserId: userId,
        amount: product.price * quantity,
        quantity: quantity,
        size: sizeId,
        OrderId: null,
      });
    }

    return true;
  }

  async deleteFromCart(req, res, next) {
    const querySchema = Joi.object({
      orderProductId: Joi.number().required(),
    });

    const { orderProductId } = await querySchema.validateAsync(req.query);

    const item = await OrderProduct.destroy({
      where: {
        id: orderProductId,
        OrderId: null,
      },
    });

    return item;
  }

  async cartList(req, res, next) {
    const querySchema = Joi.object({
      userId: Joi.number().required(),
    });

    const { userId } = await querySchema.validateAsync(req.query); 

    const list = await OrderProduct.findAll({
      where: {
        UserId: userId,
        OrderId: null,
      },
      include: { model: Product },
    });

    return list;
  }

  async deleteFromOrders(req, res, next) {
    const querySchema = Joi.object({
      orderId: Joi.number().required(),
    });

    const { orderId } = await querySchema.validateAsync(req.query);

    const order = await Order.findOne({
      where: {
        id: orderId
      },
    });

    const orderProductList = await OrderProduct.findAll({
      where: {
        OrderId: orderId,
      },
      include: [{ model: Product }],
    });

    for (let orderProduct of orderProductList) {
      const { ProductId, size, quantity } = orderProduct;

      await ProductSize.increment('quantity', {
        by: quantity,
        where: {
          id: size,
        }
      });

      const product = await Product.findByPk(ProductId);
      if (product) {
        await product.increment('quantity', { by: quantity });
      }
    }


    let item;

    if(order.status === 'Processing') {
      item = await Order.destroy({
        where: {
          id: orderId,
        },
      });
    }
    else{
      throw new Error("Order already completed");
    }

    return item;
  }

  async ordersList(req, res, next) {
    const querySchema = Joi.object({
      userId: Joi.number().required(),
    });

    const { userId } = await querySchema.validateAsync(req.query); 

    const list = await Order.findAll({
      where: {
        UserId: userId,
      },
    });

    return list;
}

  async createOrder(req, res, next) {
    const userId = req.user.id;

    const orderProductList = await OrderProduct.findAll({
      where: {
        UserId: userId,
        OrderId: null,
      },
      include: [{ model: Product }],
    });

    if (!orderProductList) {
      throw new Error("No products in cart");
    }

    for (let orderProduct of orderProductList) {
      const { ProductId, size, quantity } = orderProduct;

      const productSize = await ProductSize.findOne({
          where: {
              id: size,
          }
      });

      if (!productSize || productSize.quantity < quantity) {
          throw new Error(`Not enough quantity available for product with id ${ProductId}`);
      }
    }

    let totalAmount = 0;
    for (let index = 0; index < orderProductList.length; index++) {
      totalAmount += orderProductList[index].amount; 
    }

    const currentDate = moment().format('YYYY-MM-DD HH:mm:ss');

    const order = await Order.create({
      total_amount: totalAmount,
      status: "Processing",
      UserId: userId,
      date: currentDate,
    });

    for (let orderProduct of orderProductList) {
      const { ProductId, size, quantity } = orderProduct;

      await ProductSize.decrement('quantity', {
        by: quantity,
        where: {
          id: size,
        }
      });

      const product = await Product.findByPk(ProductId);
      if (product) {
        await product.decrement('quantity', { by: quantity });
      }
    }

    for (let index = 0; index < orderProductList.length; index++) {
      await OrderProduct.update(
        {
          OrderId: order.id,
        },
        {
          where: {
            id: orderProductList[index].id,
          },
        }
      );
    }

    return {
      order,
      orderProductList
    };
  }

  async createAttribute(req, res, next) {
    const bodySchema = Joi.object({
      name: Joi.string().required(),
    });

    const { name } = await bodySchema.validateAsync(req.body);

    const attribute = await Attribute.create({
      name,
    });

    return attribute;
  }

  async createSize(req, res, next) {
    const bodySchema = Joi.object({
      name: Joi.string().required(),
    });

    const { name } = await bodySchema.validateAsync(req.body);

    const size = await Size.create({
      name,
    });

    return size;
  }

  async createManufacturer(req, res, next) {
    const bodySchema = Joi.object({
      name: Joi.string().required(),
    });

    const { name } = await bodySchema.validateAsync(req.body);

    const manufacturer = await Manufacturer.create({
      name,
    });

    return manufacturer;
  }

  async createProductSize(req, res, next) {
    const bodySchema = Joi.object({
      productId: Joi.number().required(),
      sizeId: Joi.number().required(),
      quantity: Joi.number().required()
    });

    const { productId, sizeId, quantity } = await bodySchema.validateAsync(req.body);

    const productSize = await ProductSize.create({
      productId: productId,
      sizeId: sizeId,
      quantity: quantity
    });

    return productSize;
  }

  async manufacturerlist(req, res, next) {
    const list = await Manufacturer.findAll();
    return list;
  }

  async updateManufacturer(req, res, next) {
    console.log(req.body);
    const bodySchema = Joi.object({
      id: Joi.number().required(),
      name: Joi.string().required(),
    });

    const { id, name } = await bodySchema.validateAsync(req.body);

    const manufacturer = await Manufacturer.findOne({
      where: {
        id,
      },
    });

    if (!manufacturer) {
      throw new Error('Manufacturer not found');
    }

    await Manufacturer.update({
      name,
    }, {
      where: {
        id,
      },
    });

    return true;
  }

  async sizelist(req, res, next) {
    const list = await Size.findAll();
    return list;
  }

  async updateSize(req, res, next) {
    console.log(req.body);
    const bodySchema = Joi.object({
      id: Joi.number().required(),
      name: Joi.string().required(),
    });

    const { id, name } = await bodySchema.validateAsync(req.body);

    const size = await Size.findOne({
      where: {
        id,
      },
    });

    if (!size) {
      throw new Error('Size not found');
    }

    await Size.update({
      name,
    }, {
      where: {
        id,
      },
    });

    return true;
  }

  async attributelist(req, res, next) {
    const list = await Attribute.findAll();
    return list;
  }

  async updateAttribute(req, res, next) {
    const bodySchema = Joi.object({
      id: Joi.number().required(),
      name: Joi.string().required(),
    });

    const { id, name } = await bodySchema.validateAsync(req.body);

    const size = await Attribute.findOne({
      where: {
        id,
      },
    });

    if (!size) {
      throw new Error('Attribute not found');
    }

    await Attribute.update({
      name,
    }, {
      where: {
        id,
      },
    });

    return true;
  }


  async updateCategory(req, res, next) {
    const bodySchema = Joi.object({
      id: Joi.number().required(),
      name: Joi.string().required(),
    });

    const { id, name } = await bodySchema.validateAsync(req.body);

    const size = await Category.findOne({
      where: {
        id,
      },
    });

    if (!size) {
      throw new Error('Category not found');
    }

    await Category.update({
      name,
    }, {
      where: {
        id,
      },
    });

    return true;
  }
}


module.exports = new ProductController();
