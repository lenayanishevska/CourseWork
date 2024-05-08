module.exports = (sequelize, Sequelize) => {

    const UserAddress = sequelize.define('UserAddress', {
      id: {
        field: 'id',
        type: Sequelize.INTEGER(),
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      address: {
        field: 'address',
        type: Sequelize.STRING(255),
        allowNull: false,
      },
      city: {
        field: 'city',
        type: Sequelize.STRING(255),
        allowNull: false,
      },
      country: {
        field: 'country',
        type: Sequelize.STRING(255),
        allowNull: false,
      },
      zipcode: {
        field: 'zipcode',
        type: Sequelize.STRING(255),
        allowNull: false,
      },
    }, {
      timestamps: false,
      tableName: 'user_addresses',
    });
  
    UserAddress.associate = (models) => {
        UserAddress.hasOne(models.User, {
          foreignKey: {
            allowNull: true   
          }
        });
    };
  
    return UserAddress;
  };