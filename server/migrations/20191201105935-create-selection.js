'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Selections', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      userId: {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: false
      },
      selectionDate: {
        allowNull: false,
        type: Sequelize.DATE
      },
      totalSelections: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      winningSelections: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      totalBets: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      winningBets: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      selectionCostWin: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Selections');
  }
};