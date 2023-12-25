const chai = require('chai');
const expect = chai.expect;
const sinon = require('sinon');
const mathUtils = require('../utils/mathUtils');

// spy常用來監視
// 1.fucntion執行了幾次:calledOnce、calledTwice...
// 2.帶了什麼參數給函式:calledWith、calledWithExactly
describe('Test mathUtil by spy', () => {
  context('# test add method', () => {
    it ('should called with 2 and 3', () => {
      const mathUtilsSpy = sinon.spy(mathUtils, 'add')
      mathUtils.add(2, 3)
      expect(mathUtilsSpy.calledOnce).to.be.true 
      expect(mathUtilsSpy.calledWith(2, 3)).to.be.true
      mathUtilsSpy.restore()
    })
    it('should return a + b', () => {
      // const mathUtilsSpy = sinon.spy(mathUtils, 'add')
      const result = mathUtils.add(2, 3)
      // expect(mathUtilsSpy.calledOnce).to.be.true
      expect(result).to.equal(5)
      // mathUtilsSpy.restore()
    })
  })

  context('# test multiply method', () => {
    it ('sould return a * b', () => {
      const mathUtilsSpy = sinon.spy(mathUtils, 'multiply')
      const result = mathUtils.multiply(2, 3)
      expect(mathUtilsSpy.calledOnce).to.be.true
      mathUtilsSpy.restore()
      expect(result).to.equal(6)
    })
  })
})

// describe('Test mathUtil', () => {
//   context('# test add method', () => {
//     let mathUtilsSpy;
//     beforeEach(() => {
//       // console.log('Spy created.');
//       mathUtilsSpy = sinon.spy(mathUtils, 'add');
//     });
//     afterEach(() => {
//       // console.log('Spy restored.');
//       mathUtilsSpy.restore();
//     });
//     it('should called with 2 and 3', () => {
//       mathUtils.add(2, 3);
//       expect(mathUtilsSpy.calledWith(2, 3)).to.be.true;
//     });
//     it('should return a + b', () => {
//       const result = mathUtils.add(2, 3);
//       expect(mathUtilsSpy.calledOnce).to.be.true;
//       expect(result).to.equal(5);
//     });
//   });

//   context('# test multiply method', () => {
//     let mathUtilsSpy;
//     beforeEach(() => {
//       // console.log('Spy created.');
//       mathUtilsSpy = sinon.spy(mathUtils, 'multiply');
//     });
//     afterEach(() => {
//       // console.log('Spy restored.');
//       mathUtilsSpy.restore();
//     });
//     it('sould return a * b', () => {
//       const result = mathUtils.multiply(2, 3);
//       expect(mathUtilsSpy.calledOnce).to.be.true;
//       expect(result).to.equal(6);
//     });
//   });
// });
