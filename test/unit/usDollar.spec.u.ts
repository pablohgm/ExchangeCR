import { UsDollar } from '../../src/usDollar'
import { expect } from 'chai'
import 'mocha'

describe('US Dollar', () => {

  const usDollar = new UsDollar()

  describe('Exchange', () => {

    it('Verify transform rates', async () => {
      const result = await usDollar.transformRates(
        [{date: '02/12/2018', rate: 1}],
        [{date: '02/12/2018', rate: 2}]
      )
      expect(result).to.deep.equal([{date: '02/12/2018', buyRate: 1, sellRate: 2}])
    })

  })

})