module.exports = (sequelize, Sequelize) => {
  const Product = sequelize.define(
    "Product",
    {
      id: {
        field: "id",
        type: Sequelize.INTEGER(),
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      name: {
        field: "name",
        type: Sequelize.STRING(255),
        allowNull: false,
      },
      description: {
        field: "description",
        type: Sequelize.TEXT,
        allowNull: true,
      },
      price: {
        field: "price",
        type: Sequelize.FLOAT,
        allowNull: false,
      },
      SKU: {
        field: "SKU",
        type: Sequelize.STRING(255),
        allowNull: false,
      },
      image_url: {
        field: "image_url",
        type: Sequelize.STRING(255),
        allowNull: true,
      },
      quantity: {
        field: "quantity",
        type: Sequelize.INTEGER(),
        allowNull: true,
      },
    },
    {
      timestamps: false,
      tableName: "products",
    }
  );

  Product.associate = (models) => {
    Product.belongsTo(models.Category);
    Product.belongsTo(models.Manufacturer);
    Product.hasOne(models.OrderProduct);
  };

  return Product;
};
