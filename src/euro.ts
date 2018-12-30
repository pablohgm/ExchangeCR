import { Currency } from './currency'
import { Rate } from './IRate'

/**
 * Euro Class
 */
export class Euro extends Currency {

  /**
   * Indicator provided by Central Bank of Costa Rica
   */
  public static INDICATOR: number = 333

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
   * @return A rate or array of rates for Euro
   */
  public async exchange (startDate?: string, endDate?: string): Promise<Rate|Rate[]> {
    if (startDate && !endDate) {
      endDate = startDate
    }
    const rates = await this.getInformation(
      this.getUrl(Euro.INDICATOR, startDate, endDate)
    )
    if (rates.length <= 1) {
      return { ...rates[0] }
    }

    return rates
  }

}
