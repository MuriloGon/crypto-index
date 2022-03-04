import {describe, it} from 'mocha';
import chaiHttp from 'chai-http';
import chai, {expect} from 'chai';
import api from '../../src/api';
chai.use(chaiHttp);

describe('Integration - /api/login', () => {
  it('returns status 200 and a token with 16 characters when the inputs' +
  ' are correct',
  async () => {
    const {status, body} = await chai.request(api)
        .post('/api/login')
        .send({email: 'email@email.com', password: '123123'});
    expect(status).to.be.eq(200);
    expect(body).to.have.keys('token');
    expect(body.token).to.have.length(16);
  },
  );

  it('returns status 400 and {"message": "Campos inválidos"} - wrong password',
      async () => {
        const {status, body} = await chai.request(api)
            .post('/api/login')
            .send({email: 'email@email.com', password: '12x'});
        expect(status).to.be.eq(400);
        expect(body).to.have.keys({message: 'Campos inválidos'});
      },
  );

  it('returns status 400 and {"message": "Campos inválidos"} - wrong email',
      async () => {
        const {status, body} = await chai.request(api)
            .post('/api/login')
            .send({email: 'email@emailom', password: 'abc123'});
        expect(status).to.be.eq(400);
        expect(body).to.have.keys({message: 'Campos inválidos'});
      },
  );
});
