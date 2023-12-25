const chai = require('chai');
const expect = chai.expect;
const sinon = require('sinon');
const mathUtils = require('../utils/mathUtils');

describe('Test mathUtil by mock', () => {
  context('# test add method', () => {
    it('should called once', () => {
      const mathUtilsMock = sinon.mock(mathUtils);
      mathUtilsMock.expects('add').once();
      mathUtils.add(2, 3);
      // mock用verify()來驗證
      mathUtilsMock.verify();
    });
  });
});
