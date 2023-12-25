const app = require('../app')
const request = require('supertest')
const chai = require('chai')
const expect = chai.expect


describe('Test index', () => {
  context('# GET /api', () => {
    it('should return a json message', () => {
      request(app)
      .get('/api')
      // .set('Accept', 'application/json') // 預設
      .expect(200)
      .end((err, res) => {
        if (err) return 
        // assert.equal(res.body.message, 'Welcom to Express') // node提供的assert的寫法
        expect(res.body.message).to.equal('Welcome to Express' ); // chai提供的expect風格寫法
      })
    })
  })

  context('# GET /', () => {
    it('should return a HTML', () => {
      request(app)
      .get('/')
      .expect(200)
      .end((err, res) => {
        if (err) return 
        // console.log(res.text)
        expect(res.text).to.includes('<title>Express</title>'); // chai提供的expect風格寫法
        expect(res.text).to.includes('<p>Welcome to Express</p>')
      })
    })
  })
})

