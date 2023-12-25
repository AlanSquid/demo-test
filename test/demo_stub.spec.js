const chai = require('chai');
const expect = chai.expect;
const sinon = require('sinon');
const mathUtils = require('../utils/mathUtils');

// stub(替身)常用的方法：
// 1. callsFake(fn) 使用自定義的函式fn來替代原函數
// 2. returns(value) 指定函式的回傳值
// 3. throws([exception]) 指定讓函式拋出exception
// 4. callsArg(index) 和 callsArgOn(index, context) 用來測試function中的callback function

describe('Test mathUtil by stub', () => {
  context('# test add method', () => {
    let mathUtilsStub;
    beforeEach(() => {
      // console.log('Stub created.')
      mathUtilsStub = sinon.stub(mathUtils, 'add')
      mathUtilsStub.returns(5)
      // mathUtilsStub = sinon.stub(mathUtils, 'add').returns(5)
    });
    afterEach(() => {
      // console.log('Stub restored.')
      mathUtilsStub.restore()
    });
    it('should return a + b', () => {
      const result = mathUtils.add(222, 3321133);
      expect(result).to.equal(5);
    });
  });

  context('# test multiply method', () => {
    let mathUtilsStub;
    beforeEach(() => {
      mathUtilsStub = sinon.stub(mathUtils, 'multiply').returns(6)
    });
    afterEach(() => {
      mathUtilsStub.restore()
    });
    it('sould return a * b', () => {
      const result = mathUtils.multiply(2, 3);
      expect(result).to.equal(6);
    });
  });
});

