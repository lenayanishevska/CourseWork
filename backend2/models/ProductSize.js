module.exports = (sequelize, Sequelize) => {

  const ProductSize = sequelize.define('ProductSize', {
    id: {
      field: 'id',
      type: Sequelize.INTEGER(),
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    quantity: {
      field: 'quantity',
      type: Sequelize.INTEGER(),
      allowNull: false,
    },
    sizeId: {
      field: 'size_id',
      type: Sequelize.INTEGER(),
      allowNull: false,
    },
    productId: {
      field: 'product_id',
      type: Sequelize.INTEGER(),
      allowNull: false,
    },
  }, {
    timestamps: false,
    tableName: 'product_sizes',
  });

  ProductSize.associate = (models) => {
    ProductSize.belongsTo(models.Product, {
      as: 'product',
      constraints: false,
      targetKey: 'id',
      foreignKey: 'productId',
    });
    ProductSize.belongsTo(models.Size, {
      as: 'size',
      constraints: false,
      targetKey: 'id',
      foreignKey: 'sizeId',
    });
  };

  return ProductSize;
};
