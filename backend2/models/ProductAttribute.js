module.exports = (sequelize, Sequelize) => {
  const ProductAttribute = sequelize.define('ProductAttribute', {
    id: {
      field: 'id',
      type: Sequelize.INTEGER(),
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    attributeId: {
      field: 'attribute_id',
      type: Sequelize.INTEGER(),
      allowNull: false,
    },
    productId: {
      field: 'product_id',
      type: Sequelize.INTEGER(),
      allowNull: false,
    },
    value: {
      field: 'value',
      type: Sequelize.STRING(255),
      allowNull: false,
    },
  }, {
    timestamps: false,
    tableName: 'product_attributes',
  });

  ProductAttribute.associate = (models) => {
    ProductAttribute.belongsTo(models.Product, {
      as: 'product',
      constraints: false,
      targetKey: 'id',
      foreignKey: 'productId',
    });
    ProductAttribute.belongsTo(models.Attribute, {
      as: 'attribute',
      constraints: false,
      targetKey: 'id',
      foreignKey: 'attributeId',
    });
  };

  return ProductAttribute;
};
