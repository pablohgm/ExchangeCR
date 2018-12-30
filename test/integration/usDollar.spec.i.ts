import { UsDollar } from '../../src/usDollar'
import { expect } from 'chai'
import 'mocha'

describe('US Dollar', () => {

  const usDollar = new UsDollar()

  describe('Exchange', () => {

    it('Verify multiple exchange', async () => {
      const result = await usDollar.exchange('01/12/2018', '02/12/2018')
      expect(result).to.be.an('array')
    })

    it('Verify single exchange', async () => {
      let result = await usDollar.exchange('01/12/2018', '01/12/2018')
      expect(result).to.be.an('object')

      result = await usDollar.exchange()
      expect(result).to.be.an('object')
    })
  })

})