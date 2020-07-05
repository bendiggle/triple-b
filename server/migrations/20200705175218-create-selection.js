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
        allowNull: false,
        type: Sequelize.INTEGER.UNSIGNED,
        references: {
          model: 'Users',
          key: 'id'
        },
      },
      selectionDate: {
        allowNull: false,
        type: Sequelize.STRING
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
        type: Sequelize.BOOLEAN
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