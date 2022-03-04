import {describe, it} from 'mocha';
import chaiHttp from 'chai-http';
import chai, {expect} from 'chai';
import sinon from 'sinon';
chai.use(chaiHttp);

import api from '../../src/api';
import * as cryptoService from '../../src/services/crypto';
import * as cryptoModel from '../../src/models/crypto';

const validToken = '1122aaaa3344bbbb';
const mockDataCryptoService = {
  'time': {
    'updated': 'Mar 4, 2022 08:19:00 UTC',
    'updatedISO': '2022-03-04T08:19:00+00:00',
    'updateduk': 'Mar 4, 2022 at 08:19 GMT',
  },
  'disclaimer': 'This data was produced from the CoinDesk Bitcoin'+
  ' Price Index (USD). Non-USD currency data converted using hourly'+
  ' conversion rate from openexchangerates.org',
  'bpi': {
    'USD': {
      'code': 'USD',
      'rate': '2',
      'description': 'United States Dollar',
      'rate_float': 2,
    },
    'BTC': {
      'code': 'BTC',
      'rate': '1.0000',
      'description': 'Bitcoin',
      'rate_float': 1,
    },
  },
};

const mockExpectedResponse = {
  'time': {
    'updated': 'Mar 4, 2022 08:19:00 UTC',
    'updatedISO': '2022-03-04T08:19:00+00:00',
    'updateduk': 'Mar 4, 2022 at 08:19 GMT',
  },
  'disclaimer': 'This data was produced from the CoinDesk Bitcoin'+
  ' Price Index (USD). Non-USD currency data converted using hourly'+
  ' conversion rate from openexchangerates.org',
  'bpi': {
    'USD': {
      'code': 'USD',
      'rate': '2',
      'description': 'United States Dollar',
      'rate_float': 2,
    },
    'BTC': {
      'code': 'BTC',
      'rate': '1.0000',
      'description': 'Bitcoin',
      'rate_float': 1,
    },
    'BRL': {
      'code': 'BRL',
      'rate': '4',
      'description': 'Brazilian Real',
      'rate_float': 4,
    },
    'EUR': {
      'code': 'EUR',
      'rate': '8',
      'description': 'Euro',
      'rate_float': 8,
    },
    'CAD': {
      'code': 'CAD',
      'rate': '12',
      'description': 'Canadian Dollar',
      'rate_float': 12,
    },
  },
};
const mockLocalCurrencies = {
  'BRL': '2',
  'EUR': '4',
  'CAD': '6',
};

before(async () => {
  process.env.CURRENCIES_PATH = '/tmp/currencies.json';

  sinon.mock(cryptoModel)
      .expects('fetchCurrencyPrices')
      .resolves(mockDataCryptoService);
});
after(() => {
  process.env.CURRENCIES_PATH = undefined;
  sinon.restore();
});

describe('Integration - GET /api/crypto/btc', () => {
  beforeEach(async ()=> {
    await cryptoService
        .saveCurrency(
          process.env.CURRENCIES_PATH as string,
          mockLocalCurrencies,
        );
  });

  it('must be autheticated to acess this route', async () => {
    const {status, body} = await chai.request(api).get('/api/crypto/btc');
    expect(status).to.be.eq(401);
    expect(body).to.be.deep.eq({message: 'Token inválido'});
  });

  it('must be autheticated to acesss this route', async () => {
    const {status, body} = await chai.request(api)
        .get('/api/crypto/btc')
        .set({Authentication: validToken});

    expect(status).to.be.eq(200);
    expect(body).to.be.deep.eq(mockExpectedResponse);
  });
});

describe('Integration - POST /api/crypto/btc', () => {
  let response: any;

  beforeEach(async ()=> {
    await cryptoService
        .saveCurrency(
          process.env.CURRENCIES_PATH as string,
          mockLocalCurrencies,
        );
  });

  it('returns 400 and errors messages when body request is wrong', async () => {
    response = await chai.request(api)
        .post('/api/crypto/btc')
        .set({Authentication: validToken})
        .send({});
    expect(response.status).to.be.eq(400);
    expect(response.body).to.be.deep.eq({message: 'Moeda inválida'});

    response = await chai.request(api)
        .post('/api/crypto/btc')
        .set({Authentication: validToken})
        .send({currency: 'BsRL'});
    expect(response.status).to.be.eq(400);
    expect(response.body).to.be.deep.eq({message: 'Moeda inválida'});

    response = await chai.request(api)
        .post('/api/crypto/btc')
        .set({Authentication: validToken})
        .send({currency: 'BRL'});
    expect(response.status).to.be.eq(400);
    expect(response.body).to.be.deep.eq({message: 'Valor inválido'});

    response = await chai.request(api)
        .post('/api/crypto/btc')
        .set({Authentication: validToken})
        .send({currency: 'BRL', value: 0});
    expect(response.status).to.be.eq(400);
    expect(response.body).to.be.deep.eq({message: 'Valor inválido'});

    response = await chai.request(api)
        .post('/api/crypto/btc')
        .set({Authentication: validToken})
        .send({currency: 'BRL', value: -10});
    expect(response.status).to.be.eq(400);
    expect(response.body).to.be.deep.eq({message: 'Valor inválido'});
  });

  it('returns 200 and message "Valor alterado com sucesso!" when the '+
  'request is correct', async () => {
    response = await chai.request(api)
        .post('/api/crypto/btc')
        .set({Authentication: validToken})
        .send({currency: 'BRL', value: 200});

    expect(response.status).to.be.eq(200);
    expect(response.body).to.be.deep.eq(
        {message: 'Valor alterado com sucesso!'},
    );

    // const res2 = await chai.request(api)
    //     .get('/api/crypto/btc')
    //     .set({Authentication: validToken});
    // const copyMockedReturn = {...mockExpectedResponse};

    // copyMockedReturn.bpi.BRL.rate = '400';
    // copyMockedReturn.bpi.BRL.rate_float = 400;

    // expect(res2.status).to.be.eq(200);
    // expect(res2.body).to.be.deep.eq(copyMockedReturn);
  });
});

describe('Integration - POST /api/crypto/btc', () => {
  it('test fallback return', async () => {
    const res1 = await chai.request(api)
        .post('/api/crypto/btc2')
        .set({Authentication: validToken});
    expect(res1.body).to.be.deep.eq({message: 'Endpoint não encontrado'});

    const res2 = await chai.request(api)
        .get('/api/crypto/btc2')
        .set({Authentication: validToken});
    expect(res2.status).to.be.eq(404);
    expect(res2.body).to.be.deep.eq({message: 'Endpoint não encontrado'});

    const res3 = await chai.request(api)
        .delete('/api/crypto/btc2')
        .set({Authentication: validToken});
    expect(res3.status).to.be.eq(404);
    expect(res3.body).to.be.deep.eq({message: 'Endpoint não encontrado'});
  });
});
