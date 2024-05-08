const { Category } = require('../models');

class CategoryController {
  async list(req, res, next) {
    const { parentCategoryId } = req.query;

    const where = {};

    if (parentCategoryId) {
      where.parentCategoryId = parentCategoryId;
    }
    else {
      where.parentCategoryId = null;
    }

    const list = await Category.findAll({ where });

    return list;
  }

  async create(req, res, next) {
    const name = req.body.name;
    const parentCategoryId = req.body.parentCategoryId;

    if (!name) {
      throw new Error('Invalid data');
    }

    const category = await Category.create({
      name,
      parentCategoryId,
    });

    return category;
  }
}

module.exports = new CategoryController();
