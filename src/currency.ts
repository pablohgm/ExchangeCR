import * as parseXml from '@rgrove/parse-xml'
import { format, isValid } from 'date-fns'
import fetch from 'node-fetch'
import { Rate } from './IRate'

/**
 * Currency Class
 */
export class Currency {

  /**
   * Base url used to build the request to Central Bank of CR
   */
  protected static BASE_URL: string = 'http://indicadoreseconomicos.bccr.fi.cr/indicadoreseconomicos/' +
    'WebServices/wsIndicadoresEconomicos.asmx/ObtenerIndicadoresEconomicosXML'

  /**
   * Build and return the url request to Central Bank of CR
   *
   * @param indicator Constant number provided by the bank to identified the currency
   * @param startDate Date in a valid string format to defined the start of the search
   * @param endDate Date in a valid string format to defined the end of the search
   * @return A valid url
   */
  public getUrl (indicator: number, startDate?: string, endDate?: string) {
    return `${Currency.BASE_URL}?tcIndicador=${ indicator }&tcFechaInicio=${ this.sanitizeDate(startDate) }` +
            `&tcFechaFinal=${ this.sanitizeDate(endDate) }&tcNombre=dmm&tnSubNiveles=N`
  }

  /**
   * Validate, clean and sanitize a string date
   *
   * @param date Date to sanitize
   * @return Valid and formatted date. If data param is empty return current date
   */
  public sanitizeDate (date?: string): string {
    if (!date) {
      return format(new Date(), 'DD/MM/YYYY')
    }
    if (!isValid(new Date(date))) {
      throw Error('Invalid date format')
    }

    return date
  }

  /**
   * Fetch the request to the bank service
   *
   * @param url Formatted url
   * @return A XML object
   */
  public async requestXML (url: string): Promise<string> {
    const response = await fetch(url)

    return await response.text()
  }

  /**
   * Get the children object of the xml tag
   *
   * @param element XML element
   * @return Array of XML elements
   */
  public getChildren (element: any): any[] {
    if (element.type === 'text' && element.parent.name === 'string') {
      return parseXml( element.text.replace(/\n/g, '').replace(/\s/g, '') ).children
    }
    if (!element.children) {
      return element
    }

    return element.children
  }

  /**
   * Take a XML element and set parent and children in the same hierarchy level
   *
   * @param elements XML elements
   * @return Array of XML elements
   */
  public flatten (elements: any): any[] {
    if (Array.isArray(elements)) {
      return elements.reduce((done, item) => {
        return done.concat( this.flatten( this.getChildren(item) ) )
      }, [])
    } else {
      return elements
    }
  }

  /**
   * Get current value from bank service
   * @param url Formatted url
   * @return The value of the currency
   */
  public async getInformation (url: string): Promise<Rate[]>  {
    const xml = await this.requestXML(url)
    const document = parseXml(xml)
    const elements = this.flatten(document.children)
    const values: number[] = []
    const dates: string[] = []

    for (const item of elements) {
      if (item.parent && item.parent.name === 'NUM_VALOR') {
        values.push(Number.parseFloat(item.text))
      }
      if (item.parent && item.parent.name === 'DES_FECHA') {
        dates.push(format(new Date(item.text), 'DD/MM/YYYY'))
      }
    }

    return values.map((item, index) => {
      return {date: dates[index], rate: item}
    })
  }

}
