module.exports = (sequelize, Sequelize) => {

  const User = sequelize.define('User', {
    id: {
      field: 'id',
      type: Sequelize.INTEGER(),
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    first_name: {
      field: 'first_name',
      type: Sequelize.STRING(255),
      allowNull: false,
    },
    last_name: {
      field: 'last_name',
      type: Sequelize.STRING(255),
      allowNull: false,
    },
    email: {
      field: 'email',
      type: Sequelize.STRING(255),
      allowNull: false,
      unique: true,
    },
    password: {
      field: 'password',
      type: Sequelize.STRING(255),
      allowNull: false,
    },
    is_admin: {
      field: 'is_admin',
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    }
  }, {
    timestamps: false,
    tableName: 'users',
  });

  User.associate = (models) => {
    User.belongsTo(models.UserAddress, {
      foreignKey: {
        allowNull: true,
        onDelete: 'SET NULL'
      }
    });
    User.hasMany(models.Order, { onDelete: 'SET NULL' });
    User.hasMany(models.OrderProduct, { onDelete: 'SET NULL' });
  };

  return User;
};
