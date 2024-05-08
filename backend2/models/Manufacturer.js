module.exports = (sequelize, Sequelize) => {
  const Manufacturer = sequelize.define('Manufacturer', {
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
    tableName: 'manufacturers',
  });

  Manufacturer.associate = (models) => {
    Manufacturer.hasMany(models.Product);
  };

  return Manufacturer;
};
