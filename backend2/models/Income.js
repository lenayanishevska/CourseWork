module.exports = (sequelize, Sequelize) => {

    const Income = sequelize.define('Income', {
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
      },
      amount: {
        field: 'amount',
        type: Sequelize.FLOAT,
        allowNull: false,
      },
    }, {
      timestamps: false,
      tableName: 'incomes',
    });
  
    Income.associate = (models) => {
        Income.belongsTo(models.Order, { onDelete: 'SET NULL' });
    };
  
    return Income;
  };
  