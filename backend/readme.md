# Crypto Index - BACKEND
## Installing, running, testing

Install command:
```bash
npm install
```

Run commands:
```bash
## production mode
npm start

## Dev with tsnode
npm run dev

## Dev with tsnode with nodemon
npm run dev:watch
```

test command:
```bash
npm test
```

## Env variables

```bash
PORT=4040
CURRENCIES_PATH=data/currencies.json

# For convenience, environment variables are declared in ".dotenv". Approach not recommended in production environment.
```

## Packages

### Project Depedencies
- express
- joi
- mocha
- rand-token
- dotenv
- axios

### Dev Depedencies
- eslint
- typescript
- ts-node
- sinon
- chai
- chai http
- nodemon


## Routes

### `POST` `/api/login`

#### Request

| Name               |  Type  |    In |                      Description |
| ------------------ | :----: | ----: | -------------------------------: |
| email          | string |  body | `Required` <br/> email |
| password   | string |  body |    `Required` <br/> password |\

#### Response
* Ok - 200
```json
{"token": "aa22fv14hfv34fas"}
```
* Invalid - 400
```json
{"message": "Campos inválidos"}
```

### `GET` `/api/login`

#### Request

| Name               |  Type  |    In |                      Description |
| ------------------ | :----: | ----: | -------------------------------: |
| Authorization      | string |  headers |  `Required` <br/> 16 characters token |


#### Response
* Ok - 200
```json
{
  "time": {
    "updated": "Mar 22, 2020 23:54:00 UTC",
    "updatedISO": "2020-03-22T23:54:00+00:00",
    "updateduk": "Mar 22, 2020 at 23:54 GMT"
  },
  "disclaimer": "This data was produced from the CoinDesk Bitcoin Price Index (USD). Non-USD currency data converted using hourly conversion rate from openexchangerates.org",
  "bpi": {
    "USD": {
      "code": "USD",
      "rate": "6,506.6717",
      "description": "United States Dollar",
      "rate_float": 6506.6717
    },
    "BRL": {
      "code": "BRL",
      "rate": "#Valor calculado a partir do arquivo currencies.json e API CoinDesk",
      "description": "Brazilian Real",
      "rate_float": "#Valor calculado a partir do arquivo currencies.json e API CoinDesk"
    },
    "EUR": {
      "code": "EUR",
      "rate": "#Valor calculado a partir do arquivo currencies.json e API CoinDesk",
      "description": "Euro",
      "rate_float": "#Valor calculado a partir do arquivo currencies.json e API CoinDesk"
    },
    "CAD": {
      "code": "CAD",
      "rate": "#Valor calculado a partir do arquivo currencies.json e API CoinDesk",
      "description": "Canadian Dollar",
      "rate_float": "#Valor calculado a partir do arquivo currencies.json e API CoinDesk"
    },
    "BTC": {
      "code": "BTC",
      "rate": "1.0000",
      "description": "Bitcoin",
      "rate_float": 1
    }
  }
}
```
* Unauthorized - 401
```json
{
  "message": "Token inválido"
}
```

### `POST` `/api/login`

#### Request
| Name               |  Type  |    In |                      Description |
| ------------------ | :----: | ----: | -------------------------------: |
| currency          | string |  body | `Required` <br/> Valid: 'BRL', 'EUR' or 'CAD' |
| value   | float |  body |    `Required` <br/> number greater than zero |

#### Response
* Ok - 200
```json
{
  "message": "Valor alterado com sucesso!"
}
```
* Unauthorized - 401
```json
{
  "message": "Token inválido"
}
```