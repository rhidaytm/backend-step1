const Sequelize = require('sequelize');

const sequelize = require('../config/database');

const Posts = sequelize.define("posts", {
  id: {
    type: Sequelize.INTEGER.UNSIGNED,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  content_title: Sequelize.STRING,
  content_text: Sequelize.TEXT,
  content_image: Sequelize.BLOB
});

module.exports = Posts;