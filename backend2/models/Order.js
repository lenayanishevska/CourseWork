module.exports = (sequelize, Sequelize) => {
  const Order = sequelize.define(
    "Order",
    {
      id: {
        field: "id",
        type: Sequelize.INTEGER(),
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      date: {
        field: "date",
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW,
      },
      total_amount: {
        field: "total_amount",
        type: Sequelize.FLOAT,
        allowNull: false,
      },
      status: {
        field: "status",
        type: Sequelize.ENUM("Processing", "Completed"),
        allowNull: false,
        defaultValue: "Processing",
      },
    },
    {
      timestamps: false,
      tableName: "orders",
    }
  );

  Order.associate = (models) => {
    Order.belongsTo(models.User);
    Order.hasMany(models.OrderProduct,  { onDelete: 'CASCADE' });
    Order.hasOne(models.Income);
  };

  return Order;
};
