# ExchangeCR
Nodejs utility to consult the rate exchange (Us Dollar, Colon) from The Central Bank of Costa Rica

#### How to install
`$ npm install exchangecr --save`

#### How to use
```
import { dollarExchange } from 'exchangecr'

dollarExchange() // { date: '00/00/0000', buyRate: '000.00000000', sellRate: '000.00000000' }

```

#### Disclaimer
* Working progress version, please don't use for production
* The information is from [web service](http://www.bccr.fi.cr/indicadores_economicos_/ServicioWeb.html) of The Central Bank of Costa Rica, so check the availability of the service before opening an issue

Feel free to dive in! [Open an issue](https://github.com/pablohgm/ExchangeCR/issues/new) or submit PRs. 


