import {describe, it} from 'mocha';
import {expect} from 'chai';
import {generateToken, login} from '../../src/services/login';

describe('Unit - Auth - Service - generateToken function', () => {
  it('returns a 16 characters and number token by default', async () => {
    const received = generateToken();
    expect(received).to.have.length(16);
  });
  it('returns a custom characters token', async () => {
    const received1 = generateToken(5);
    const received2 = generateToken(10);
    const received3 = generateToken(15);
    expect(received1).to.have.length(5);
    expect(received2).to.have.length(10);
    expect(received3).to.have.length(15);
  });
  it('It returns a random 16 letters and numbers token', () => {
    const received = generateToken();
    expect(received).to.has.length(16);
    expect(received).to.match(/[A-Za-z0-9]*([a-zA-Z]+[0-9]+|[0-9]+[a-zA-Z]+)/);
  });
});

describe('Unit - Auth - Service - login function', () => {
  it('returns null when email is invalid', async () => {
    const mockData = {email: 'email@emailcom', password: '123456'};
    const received = await login(mockData);
    expect(received).to.be.eq(null);
  });

  it('returns null when email is invalid', async () => {
    const mockData1 = {email: 'email@email.com', password: '13'};
    const mockData2 = {email: 'email@email.com', password: 'dddd'};
    const mockData3 = {email: 'email@email.com', password: '21312312313d21'};
    const received1 = await login(mockData1);
    const received2 = await login(mockData2);
    const received3 = await login(mockData3);
    expect(received1).to.be.eq(null);
    expect(received2).to.be.eq(null);
    expect(received3).to.be.eq(null);
  });

  it('returns a 16 characters token when the input is valid', async () => {
    const mockData1 = {email: 'email@email.com.br', password: '123456'};
    const mockData2 = {email: 'emai2l@google.com', password: 'abcdef'};
    const mockData3 = {email: 'emailcc@apple.uk', password: '1a2b3c'};
    const received1 = await login(mockData1);
    const received2 = await login(mockData2);
    const received3 = await login(mockData3);
    expect(received1).to.have.length(16);
    expect(received2).to.have.length(16);
    expect(received3).to.have.length(16);
  });
});
