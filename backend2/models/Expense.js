
module.exports = (sequelize, Sequelize) => {

    const Expense = sequelize.define('Expense', {
      id: {
        field: 'id',
        type: Sequelize.INTEGER(),
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      date: {
        field: 'date',
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW,
      },
      amount: {
        field: 'amount',
        type: Sequelize.FLOAT,
        allowNull: false,
      },
    }, {
      timestamps: false,
      tableName: 'expenses',
    });
  
    Expense.associate = (models) => {
      Expense.belongsTo(models.ExpensesCategory);
    };
  
    return Expense;
  };
  