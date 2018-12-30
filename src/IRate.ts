/**
 * Rate Interface
 */
export interface Rate {
  /**
   * Date in string format
   */
  date: string,

  /**
   * The amount of the rate
   */
  rate?: number,

  /**
   * Buy Rate, used only for US Dollar
   */
  buyRate?: number,

  /**
   * Sell Rate, used only for US Dollar
   */
  sellRate?: number
}
