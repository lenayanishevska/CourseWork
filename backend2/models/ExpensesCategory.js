module.exports = (sequelize, Sequelize) => {
    const ExpensesCategory = sequelize.define('ExpensesCategory', {
      id: {
        field: 'id',
        type: Sequelize.INTEGER(),
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      category: {
        field: 'category',
        type: Sequelize.STRING(255),
        allowNull: false,
      },
    }, {
      timestamps: false,
      tableName: 'expenses_categories',
    });
  
    ExpensesCategory.associate = (models) => {
      ExpensesCategory.hasMany(models.Expense);
    };
  
    return ExpensesCategory;
};
  