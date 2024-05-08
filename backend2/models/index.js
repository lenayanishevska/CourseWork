const path = require('path');
const fs = require('fs');
const _ = require('lodash');
const Sequelize = require('sequelize');

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    dialect: "postgres",
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
  },
);

function getModels() {
  const models = {};
  const baseName = path.basename(module.filename);
  const modelFiles = fs.readdirSync(__dirname).filter((file) => {
    if (file !== baseName) {
      if (file.indexOf('.') !== 0) {
        return true;
      }
    }
    return false;
  });
  const modelRegExp = /(^[A-Za-z0-9_]+)\.js/;
  modelFiles.forEach((modelFile) => {
    const modelMatch = modelRegExp.exec(modelFile);
    if (modelMatch) {
      const modelName = modelMatch[1];
      const model = require(path.join(__dirname, modelFile));
      models[modelName] = model(sequelize, Sequelize);
    }
  });
  Object.keys(models).forEach((modelName) => {
    if (_.isFunction(models[modelName].associate)) {
      models[modelName].associate(models);
    }
  });
  return models;
}

module.exports = getModels();
module.exports.sequelize = sequelize;
module.exports.Sequelize = Sequelize;