// module imports
import has from 'has';
// model imports
import customerModel from './customer.model';

const Models = Object.freeze({
  customerModel,
});

/*
  ##################
  #  Associations  #
  ##################
*/
Object.values(Models).forEach((Model) => {
  // create model associations
  if (has(Model, 'associate')) {
    Model.associate(Models);
  }
});

export default customerModel;
export { customerModel };
