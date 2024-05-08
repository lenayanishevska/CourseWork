module.exports = (sequelize, Sequelize) => {
  const Attribute = sequelize.define('Attribute', {
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
    tableName: 'attributes',
  });

  Attribute.associate = (models) => {
  };

  return Attribute;
};
