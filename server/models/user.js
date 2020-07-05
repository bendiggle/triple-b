'use strict';
module.exports = (sequelize, DataTypes) => {
  const Users = sequelize.define('Users', {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    nickName: {
      type: DataTypes.STRING,
      allowNull: true
    }
  }, {});
  Users.associate = function(models) {
    Users.hasMany(models.Selections)
  };
  return Users;
};
