const { Expense, ExpensesCategory} = require('../models');
const Joi = require("joi");

class ExpensesController {
  async categoriesList(req, res, next) {
    const list = await ExpensesCategory.findAll();

    return list;
  }

  async createCategory(req, res, next) {
    const bodySchema = Joi.object({
      category: Joi.string().required(),
    });

    const { category } = await bodySchema.validateAsync(req.body);

    if (!category) {
      throw new Error('Invalid data');
    }

    const expenseCategory = await ExpensesCategory.create({
      category,
    });

    return expenseCategory;
  }

  async create(req, res, next) {
    console.log("Body:", req.body);
    const bodySchema = Joi.object({
      categoryId: Joi.number().required(),
      amount: Joi.number().required(),
    });

    const { amount, categoryId  } = await bodySchema.validateAsync(req.body);

    if (!amount || !categoryId) {
      throw new Error('Invalid data'); // Перевірка наявності обов'язкових полів
    }

    const currentDate = new Date();

    const newExpense = await Expense.create({
      date: currentDate,
      amount,
      ExpensesCategoryId: categoryId,
    });

    return newExpense;
  }


}

module.exports = new ExpensesController();
