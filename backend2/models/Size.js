module.exports = (sequelize, Sequelize) => {

  const Size = sequelize.define('Size', {
    id: {
      field: 'id',
      type: Sequelize.INTEGER(),
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    name: {
      field: 'name',
      type: Sequelize.STRING(255),
      allowNull: false,
    },
  }, {
    timestamps: false,
    tableName: 'sizes',
  });

  Size.associate = (models) => {
    // Size.belongsToMany(models.Product, { through: models.ProductSize });
  };

  return Size;
};
