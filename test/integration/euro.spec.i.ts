import { Euro } from '../../src/euro'
import { expect } from 'chai'
import 'mocha'

describe('Euro', () => {

  const euro = new Euro()

  describe('Exchange', () => {

    it('Verify multiple exchange', async () => {
      const result = await euro.exchange('26/12/2018', '28/12/2018')
      expect(result).to.be.an('array')
    })

    it('Verify single exchange', async () => {
      let result = await euro.exchange('26/12/2018', '26/12/2018')
      expect(result).to.be.an('object')

      result = await euro.exchange('26/12/2018')
      expect(result).to.be.an('object')

      result = await euro.exchange()
      expect(result).to.be.an('object')
    })
  })

})