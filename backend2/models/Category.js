const Sequelize = require('sequelize');
module.exports = (sequelize) => {
  const Category = sequelize.define('Category', {
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
    parentCategoryId: {
      field: 'parent_category_id',
      type: Sequelize.INTEGER(),
      allowNull: true,
    }
  }, {
    timestamps: false,
    tableName: 'categories',
  });

  Category.associate = (models) => {
    Category.hasMany(models.Product);
  };

  return Category;
};
