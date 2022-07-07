import sinon from 'sinon';
import { afterEach } from 'mocha';
import chai, { expect } from 'chai';
import makeNewCustomerService from '../services/newCustomer.service';
import newCustomerReponse, {
  INDENTITY_NUMBER_EXISTS,
  NEW_CUSTOMER_CREATED,
} from '../responses/newCustomer.response';
import logger from '../infraestructure/log/logger';

chai.expect();

// test #newCustomerService()
describe('#newCustomerService()', () => {
  afterEach(() => {
    // restore the default sandbox here
    sinon.restore();
  });

  it('It should pass insert a new customer into the database & return the customer id created', async () => {
    // mock customer request
    const customer = {
      name: 'Yapo',
      identityNumber: '1',
      email: 'yapo@example.cl',
      phone: '6666666',
      address: 'Mariano Sanchez Fontecilla 310',
    };

    // mock bulk response
    const customerId = 1;

    // fake models
    const customerModel = {
      checkIdentity: sinon.stub().resolves(null),
      new: sinon.stub().resolves({ customerId }),
    };

    // newCustomerService function
    const newCustomerService = makeNewCustomerService(
      customerModel,
      newCustomerReponse,
      logger,
    );

    // execute use case
    const result = await newCustomerService(customer);

    // sinon - assert stubs expectation
    sinon.assert.calledOnceWithExactly(
      customerModel.checkIdentity,
      customer.identityNumber,
    );
    sinon.assert.calledOnceWithExactly(customerModel.new, customer);

    // chai - assert usecase expectation
    expect(result).to.be.a('object');
    expect(result).to.have.property('error', NEW_CUSTOMER_CREATED.error);
    expect(result).to.have.property('code', NEW_CUSTOMER_CREATED.code);
    expect(result).to.have.property('message', NEW_CUSTOMER_CREATED.message);
    expect(result).to.have.property('data').to.be.a('object');
    expect(result.data)
      .to.have.property('customerId')
      .to.be.a('number')
      .to.be.eql(customerId);
  });

  it('It should fail because identity id already exists in the database', async () => {
    // mock customer request
    const customer = {
      name: 'Yapo',
      identityNumber: '1',
      email: 'yapo@example.cl',
      phone: '6666666',
      address: 'Mariano Sanchez Fontecilla 310',
    };

    // mock bulk response
    const customerId = 1;

    // fake models
    const customerModel = {
      checkIdentity: sinon.stub().resolves(customer),
      new: sinon.stub().resolves({ customerId }),
    };

    // newCustomerService function
    const newCustomerService = makeNewCustomerService(
      customerModel,
      newCustomerReponse,
      logger,
    );

    // execute use case
    const result = await newCustomerService(customer);

    // sinon - assert stubs expectation
    sinon.assert.calledOnceWithExactly(
      customerModel.checkIdentity,
      customer.identityNumber,
    );
    sinon.assert.notCalled(customerModel.new);

    // chai - assert usecase expectation
    expect(result).to.be.a('object');
    expect(result).to.have.property('error', INDENTITY_NUMBER_EXISTS.error);
    expect(result).to.have.property('code', INDENTITY_NUMBER_EXISTS.code);
    expect(result).to.have.property('message', INDENTITY_NUMBER_EXISTS.message);
  });
});
