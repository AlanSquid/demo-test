const app = require('../app');
const request = require('supertest');
const chai = require('chai');
const expect = chai.expect;
const sinon = require('sinon');
const authHelper = require('../helpers/auth-helper');
const userController = require('../controllers/user-controller');
const userServices = require('../services/user-services');
const mathUtils = require('../utils/mathUtils');

// ===以下都是獨立示範===

// test/mathUtils.test.js
describe('mathUtils', () => {
  it('should correctly add two numbers', () => {
    const result = mathUtils.add(2, 3);
    expect(result).to.equal(5);
  });

  it('should correctly multiply two numbers', () => {
    const result = mathUtils.multiply(2, 3);
    expect(result).to.equal(6);
  });
});
// -------------------------------------------------------
// test/controllers/user-controller.spec.js
describe('userController', () => {
  describe('getUserPage', () => {
    it('should render user page with result', () => {
      const req = {};
      const res = { render: sinon.spy() };
      userController.getUserPage(req, res);
      expect(res.render.calledOnce).to.be.true;
      expect(res.render.calledWithExactly('user', { result: 0 })).to.be.true;
    });
  });

  describe('calculate', () => {
    it('should calculate and render result for addition', () => {
      const req = { body: { a: 2, b: 3, mathType: 'add' } };
      const res = { render: sinon.spy() };
      userController.calculate(req, res);
      expect(res.render.calledOnce).to.be.true;
      expect(res.render.calledWithExactly('user', { result: 5 })).to.be.true;
    });

    it('should calculate and render result for multiplication', () => {
      const req = { body: { a: 2, b: 3, mathType: 'multiply' } };
      const res = { render: sinon.spy() };
      userController.calculate(req, res);
      expect(res.render.calledOnce).to.be.true;
      expect(res.render.calledWithExactly('user', { result: 6 })).to.be.true;
    });
  });
});
// -------------------------------------------------------

// test/routes/users.spec.js
// describe('Users Routes', () => {
//   it('GET /users should return user page', async () => {
//     const response = await request(app).get('/users');
//     expect(response.status).to.equal(200);
//     // 假設使用了模板引擎，可進一步斷言頁面渲染的內容
//   });

//   it('POST /users/calculate should return calculated result', async () => {
//     const response = await request(app)
//       .post('/users/calculate')
//       .send({ a: 2, b: 3, mathType: 'add' });

//     expect(response.status).to.equal(200);
//     expect(response.body.result).to.equal(5); // 假設你的控制器返回 JSON
//   });
// });
// -------------------------------------------------------

// test/routes/users.test.js
describe('Users Routes', () => {
  const agent = request.agent(app); // 使用 agent 來保持會話狀態
  // 假設有一個登入用的測試
  it('should login and then access user page', async () => {
    // 使用 agent 發送登入請求
    await agent.post('/auth/login').send({ account: '123', password: '123' });

    // 然後發送訪問受保護的用戶頁面的請求
    const response = await agent.get('/users');
    expect(response.status).to.equal(200);
    // 斷言頁面渲染的內容或其他期望的結果
  });

  it('POST /users/calculate should return add result', async () => {
    // 這裡可以使用 agent，以確保登入狀態保持
    const response = await agent
      .post('/users/calculate')
      .send({ a: 2, b: 3, mathType: 'add' });

    expect(response.status).to.equal(200);
    expect(response.text).to.includes('<h1 id="reslult">5</h1>');
  });

  it('POST /users/calculate should return multiply result', async () => {
    // 這裡可以使用 agent，以確保登入狀態保持
    const response = await agent
      .post('/users/calculate')
      .send({ a: 2, b: 3, mathType: 'multiply' });

    expect(response.status).to.equal(200);
    expect(response.text).to.includes('<h1 id="reslult">6</h1>');
  });
});
// -------------------------------------------------------

// test/controllers/user-services.spec.js
describe('user-services', () => {
  it('should correctly add two numbers', () => {
    const req = { body: { a: 2, b: 3, mathType: 'add' } };
    const cb = sinon.spy();
    userServices.calculate(req, cb);
    expect(cb.calledOnce).to.be.true;
    // 在userService中有調用cb(null, locals)，裡面兩個參數，而locals也是兩個參數，分別是user模板跟模板用的變數{result}
    expect(cb.args[0][0]).to.be.null; // 檢查第一個回調引數是否為 null，表示沒有錯誤
    expect(cb.args[0][1].result).to.equal(5); // 檢查結果是否為預期的值
  });

  it('should correctly multiply two numbers', () => {
    const req = { body: { a: 2, b: 3, mathType: 'multiply' } };
    const cb = sinon.spy();
    userServices.calculate(req, cb);
    expect(cb.calledOnce).to.be.true;
    expect(cb.args[0][0]).to.be.null; // 檢查第一個回調引數是否為 null，表示沒有錯誤
    expect(cb.args[0][1].result).to.equal(6); // 檢查結果是否為預期的值
  });
});

