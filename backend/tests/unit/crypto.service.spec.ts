import {describe, it} from 'mocha';
import {expect} from 'chai';
import {
  getLocalCurrencies,
  setCurrency,
  saveCurrency,
} from '../../src/services/crypto';


describe('Unit - Crypto - Service - setCurrency function', () => {
  it('returns null when currencyCode is not BRL, EUR e CAD or the value ' +
  'is negative', () => {
    const received1 = setCurrency(
        'outro', 1000, {BRL: '1', CAD: '2', EUR: '3'});
    const received2 = setCurrency(
        'outro', -1000, {BRL: '1', CAD: '2', EUR: '3'});
    expect(received1).to.be.null;
    expect(received2).to.be.null;
  });

  it('set the value correctly', () => {
    const received1 = setCurrency(
        'CAD', 1000, {BRL: '1', CAD: '2', EUR: '3'});
    expect(received1).to.be.deep.eq({BRL: '1', CAD: '1000', EUR: '3'});
  });
});

describe('Unit - Crypto - Service - getLocalCurrencies function', () => {
  it('returns the currencies.json for a valid path',
      async () => {
        const received = await getLocalCurrencies('data/currencies.json');
        expect(received).to.have.keys('BRL', 'EUR', 'CAD');
      },
  );
  it('returns null for a invalid path',
      async () => {
        const received = await getLocalCurrencies('data/currencies.inexistent');
        expect(received).to.be.null;
      },
  );
});

describe('Unit - Crypto - Service - saveCurrency function', () => {
  const initialData = {
    'BRL': '1',
    'EUR': '2',
    'CAD': '3',
  };
  const newData = {
    'BRL': '1',
    'EUR': '1000',
    'CAD': '3',
  };

  it('saves correctly the currencies', async ()=> {
    const save1 = await saveCurrency('/tmp/test.json', initialData);
    expect(save1).to.be.true;

    const currencies = await getLocalCurrencies('/tmp/test.json');
    expect(currencies).to.be.deep.eq(initialData);

    const dataUpdated = setCurrency('EUR', 1000, currencies as any);
    const save2 = await saveCurrency('/tmp/test.json', dataUpdated as any);
    expect(save2).to.be.true;

    const currencies2 = await getLocalCurrencies('/tmp/test.json');
    expect(currencies2).to.be.deep.eq(newData);
  });
});
