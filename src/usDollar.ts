import { Currency } from './currency'

export class UsDollar extends Currency{

  constructor(indicator: string, date: string) {
    super(indicator, date)
  }

  public async exchange () {
    const file = new Map()
      .set('buy', this.getUrl())
      .set('sell', this.getUrl())

    const buyRate = await this.getInformation(file.get('buy'))
    const sellRate = await this.getInformation(file.get('sell'))
    const date = this.getDate()

    return { date, buyRate, sellRate }
  }
}