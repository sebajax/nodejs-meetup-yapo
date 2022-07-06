/* database configuration - import */
import db from '../infraestructure/database/db';

/* model - definition */
const customerModel = db.sequelize.define(
  'customer',
  {
    customerId: {
      field: 'customer_id',
      type: db.DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: db.DataTypes.STRING(100),
      allowNull: false,
      notEmpty: true,
    },
    identityNumber: {
      field: 'identity_number',
      type: db.DataTypes.STRING(45),
      allowNull: false,
      notEmpty: true,
    },
    email: {
      type: db.DataTypes.STRING(100),
      allowNull: false,
      notEmpty: true,
    },
    phone: {
      type: db.DataTypes.STRING(15),
      allowNull: false,
      notEmpty: true,
    },
    address: {
      type: db.DataTypes.TEXT,
      allowNull: false,
      notEmpty: true,
    },
    active: {
      type: db.DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
  },
  {
    timestamps: true,
    underscored: true,
    freezeTableName: true,
  },
);

/* model - functions */
/**
 * @param {object} customer
 * @return {object}
 */
customerModel.new = (customer) => {
  return customerModel.create(customer);
};

/**
 * @param {string} identityNumber
 * @return {object}
 */
customerModel.checkIdentity = (identityNumber) => {
  return customerModel.findOne({
    where: {
      identityNumber,
    },
  });
};

/**
 * @param {number} customerId
 * @return {object}
 */
customerModel.getCustomer = (customerId) => {
  return customerModel.findByPk(customerId);
};

export default customerModel;
