import { Currency } from './currency'
import { Rate } from './IRate'

/**
 * UsDollar Class
 */
export class UsDollar extends Currency {

  /**
   * Us Dollar purchase indicator provided by Central Bank of Costa Rica
   */
  public static PURCHASE_INDICATOR: number = 317

  /**
   * Us Dollar Sell indicator provided by Central Bank of Costa Rica
   */
  public static SALE_INDICATOR: number = 318

  /**
   * Constructor
   */
  constructor () {
    super ()
  }

  /**
   * Get the exchange information
   *
   * @param startDate Date in a valid string format to defined the start of the search
   * @param endDate Date in a valid string format to defined the end of the search
   * @return A rate or array of rates for US Dollar
   */
  public async exchange (startDate?: string, endDate?: string): Promise<Rate|Rate[]> {
    if (startDate && !endDate) {
      endDate = startDate
    }
    const file = new Map()
      .set('buy', this.getUrl(UsDollar.PURCHASE_INDICATOR, startDate, endDate))
      .set('sell', this.getUrl(UsDollar.SALE_INDICATOR, startDate, endDate))

    const rates = this.transformRates(
      await this.getInformation(file.get('buy')),
      await this.getInformation(file.get('sell'))
    )
    if (rates.length === 1) {
      return rates[0]
    }

    return rates
  }

  /**
   * Transform and merge the rates in a single array
   *
   * @param buyRates Array of buy rates
   * @param sellRates Array of sell rates
   * @return Array of rates
   */
  public transformRates (buyRates: Rate[], sellRates: Rate[]): Rate[] {
    return buyRates.map((item, index) => {
      return { date: item.date, purchaseRate: item.rate, saleRate: sellRates[index].rate }
    })
  }

}
