const Joi = require('joi');
const { Page } = require("../models");

class PageController {
  async list(req, res, next) {
    const where = {};

    const list = await Page.findAll({ where });

    return list;
  }

  async item(req, res, next) {
    const querySchema = Joi.object({
      alias: Joi.string().required(),
    });

    const { alias } = await querySchema.validateAsync(req.query);

    const where = {
      alias,
    };

    const item = await Page.findOne({ where });

    return item;
  }

  async create(req, res, next) {
    const { alias, name, content } = req.body;

    if (!alias || !name || !content) {
      throw new Error('Invalid input');
    }

    const page = await Page.create({
      alias,
      name,
      content,
    });

    return page;
  }

  async update(req, res, next) {
    const bodySchema = Joi.object({
      id: Joi.number().required(),
      alias: Joi.string().required(),
      name: Joi.string().required(),
      content: Joi.string().required(),
    });

    const { id } = await bodySchema.validateAsync(req.body);

    let page = await Page.findOne({
      where: {
        id,
      },
    });

    if (!page) {
      throw new Error('Page not found');
    }

    page = await Page.update({
      alias,
      name,
      content,
    }, {
      where: {
        id,
      },
    });
    
    return page;
  }
}

module.exports = new PageController();
