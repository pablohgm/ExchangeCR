# ExchangeCR
Nodejs utility to consult the rate exchange (Us Dollar / Euro -> Colon) from The Central Bank of Costa Rica

[![NPM Version][npm-image]][npm-url]
[![Build Status][travis-url]][travis-url]

## Table of contents

  * [Installation](#installation)
 * [Common usage](#common-usage)
  * [Configuration Options](#configuration-options)
     * [Examples](#examples)
  * [Disclaimer](#disclaimer)
  * [License](#license)

#### Installation
`$ npm install exchangecr --save`

#### Common usage
```javascript
import { UsDollar, Euro } from 'exchangecr'

const dollar = new UsDollar()
await dollar.exchange() // { date: '00/00/0000', purchaseRate: 000.00, saleRate: 000.00 }

const euro = new Euro()
await euro.exchange() // { date: '00/00/0000', rate: 000.00 }
```

#### Configuration Options
The exchange methods support range of dates (should be in EU format DD/MM/YYYY), one date or even no date.
##### Examples
If there is no params `exchange` returns the exchange of today
```javascript
await dollar.exchange()
// { date: '00/00/0000', purchaseRate: 000.00, saleRate: 000.00 }
```
If there is one date `exchange` returns a exchange object
```javascript
await dollar.exchange('25/12/2018') 
// { date: '25/12/2018', purchaseRate: 000.00, saleRate: 000.00 }
```
If there is a range of dates `exchange` returns a exchange array
```javascript
await dollar.exchange('25/12/2018', '26/12/2018')
// [
//     { date: '25/12/2018', purchaseRate: 000.00, saleRate: 000.00 },
//     { date: '26/12/2018', purchaseRate: 000.00, saleRate: 000.00 }
//   ]
```
For euro there is only one rate (no purchase and sale rates). Usually with poor support from the bank for updates dates, works fine with 3 days of delay
```javascript
await euro.exchange('25/12/2018', '26/12/2018')
// [
//     { date: '25/12/2018', rate: 000.00 },
//     { date: '26/12/2018', rate: 000.00 }
//   ]
```


#### Disclaimer
* The information is from [web service](http://www.bccr.fi.cr/indicadores_economicos_/ServicioWeb.html) of The Central Bank of Costa Rica, so check the availability of the service before opening an issue

Feel free to dive in! [Open an issue](https://github.com/pablohgm/ExchangeCR/issues/new) or submit PRs.
#### License

[MIT](http://vjpr.mit-license.org)

[npm-image]: http://img.shields.io/npm/v/exchangecr.svg?style=flat
[npm-url]: https://www.npmjs.com/package/exchangecr
[travis-url]: https://travis-ci.org/pablohgm/ExchangeCR.svg?branch=master
