'use strict';
module.exports = {
  up(queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.addColumn(
        'Users',
        'nickName',
        {
          type: Sequelize.STRING,
          allowNull: true,
        },
      )
    ]);
  },

  down(queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.removeColumn('Users', 'nickName')
    ]);
  },
};