'use strict';
module.exports = (sequelize, DataTypes) => {
  const Selections = sequelize.define('Selections', {
    selectionDate: {
      type: DataTypes.DATE,
      allowNull: false
    },
    totalSelections: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    winningSelections: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    totalBets: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    winningBets: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    selectionCostWin: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {});
  Selections.associate = function(models) {
    Selections.belongsTo(models.Users, { foreignKey: 'userId' })
  };
  return Selections;
};