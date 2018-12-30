import { Euro } from './euro'
import { UsDollar } from './usDollar'

/**
 * Get the exchange rates for Us Dollar
 * @deprecated since version 0.3.0. Will be deleted in version 1.0. Use `USDollar` instead.
 * @return An object with data, buy and sell rates
 */
const dollarExchange = async () => {
  const usDollar = new UsDollar()

  return await usDollar.exchange()
}

export {
  dollarExchange,
  UsDollar,
  Euro
}
