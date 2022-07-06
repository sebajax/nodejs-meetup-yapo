// module imports
import { DataTypes } from 'sequelize';

async function up({ context: queryInterface }) {
  /*
  --- independent tables ---
  these ones should be created first
  */

  await queryInterface.createTable('customer', {
    customerId: {
      field: 'customer_id',
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
      notEmpty: true,
    },
    identityNumber: {
      field: 'identity_number',
      type: DataTypes.STRING(45),
      allowNull: false,
      notEmpty: true,
    },
    email: {
      type: DataTypes.STRING(100),
      allowNull: false,
      notEmpty: true,
    },
    phone: {
      type: DataTypes.STRING(15),
      allowNull: false,
      notEmpty: true,
    },
    address: {
      type: DataTypes.TEXT,
      allowNull: false,
      notEmpty: true,
    },
    active: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
    createdAt: {
      field: 'created_at',
      type: DataTypes.DATE,
    },
    updatedAt: {
      field: 'updated_at',
      type: DataTypes.DATE,
    },
  });

  /*
  --- add constraints to tables ---
  */

  /*
  --- add indexes to tables ---
  */
  await queryInterface.addIndex('customer', ['identity_number'], {
    name: 'idx_customer_identity_number',
  });

  /*
  --- seed tables ---
  */
}

async function down({ context: queryInterface }) {
  /*
  --- remove constraints to tables ---
  */

  /*
  --- remove indexes to tables ---
  */
  await queryInterface.removeIndex('customer', 'idx_customer_identity_number');
  /*
  --- remove tables ---
  */
  await queryInterface.dropTable('customer');
}

export { up, down };
