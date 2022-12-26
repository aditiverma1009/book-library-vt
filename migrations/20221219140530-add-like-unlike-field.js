/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.sequelize.transaction((t) => queryInterface.addColumn('Books', 'likeUnlike', {
      type: Sequelize.DataTypes.BOOLEAN,
      defaultValue: false
    }, { transaction: t }));
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.sequelize.transaction((t) => queryInterface.removeColumn('Books', 'likeUnlike', {
      type: Sequelize.DataTypes.BOOLEAN
    }, { transaction: t }));
  }
};
