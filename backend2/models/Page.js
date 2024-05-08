module.exports = (sequelize, Sequelize) => {
  const Page = sequelize.define('Page', {
    id: {
      field: 'id',
      type: Sequelize.INTEGER(),
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    alias: {
      field: 'alias',
      type: Sequelize.STRING(255),
      allowNull: false,
    },
    name: {
      field: 'name',
      type: Sequelize.STRING(255),
      allowNull: false,
    },
    content: {
      field: 'content',
      type: Sequelize.TEXT(),
      allowNull: false,
    },
  }, {
    timestamps: false,
    tableName: 'pages',
  });

  Page.associate = () => {
  };

  return Page;
};
