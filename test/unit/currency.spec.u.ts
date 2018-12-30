import { Currency } from '../../src/currency'
import { format } from 'date-fns'
import { expect } from 'chai'
import 'mocha'

describe('Currency', () => {

  const currency = new Currency()

  it('Verify sanitize date', () => {
    let result = currency.sanitizeDate('02/12/2018')
    expect(result).to.equal('02/12/2018')

    result = currency.sanitizeDate()
    expect(result).to.equal(format(new Date(), 'DD/MM/YYYY'))
  })

})