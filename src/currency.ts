import fetch from 'node-fetch'
import * as parseXml from '@rgrove/parse-xml'
import { format } from 'date-fns'

export class Currency {

  protected indicator: string

  protected startDate: string

  protected endDate: string

  protected static BASE_URL: string = 'http://indicadoreseconomicos.bccr.fi.cr/indicadoreseconomicos/WebServices/wsIndicadoresEconomicos.asmx/ObtenerIndicadoresEconomicosXML'

  constructor (indicator: string, startDate?: string, endDate?: string) {
    const date: string = format(new Date(), 'DD/MM/YYYY')

    this.indicator = indicator
    this.startDate = startDate || date
    this.endDate = endDate || date
  }

  public getIndicator () {
    return this.indicator
  }

  public getStartDate () {
    return this.startDate
  }

  public getEndDate () {
    return this.endDate
  }

  public getDate () {
    return `${this.getStartDate()} ${this.getEndDate()}`
  }

  public getUrl () {
    return `${Currency.BASE_URL}?
            tcIndicador=${ this.getIndicator() }&
            tcFechaInicio=${ this.getStartDate() }&
            tcFechaFinal=${ this.getEndDate() }&
            tcNombre=dmm&tnSubNiveles=N`
  }

  public async requestXML (url: string) {
    const response = await fetch(url)
    return await response.text()
  }

  public getChildren (element: any) {
    if(element.type === 'text' && element.parent.name === 'string') {
      return parseXml( element.text.replace(/\n/g, '').replace(/\s/g, '') ).children
    }
    if(!element.children) {
      return element
    }
    return element.children
  }

  public flatten (elements: any): any {
    if(Array.isArray(elements)) {
      return elements.reduce((done,item) => {
        return done.concat( this.flatten( this.getChildren(item) ) )
      }, [])
    } else {
      return elements
    }
  }

  public getInformation = async (url: string) => {
    const xml = await this.requestXML(url)
    const document = parseXml(xml)
    const elements = this.flatten(document.children)

    for(let item of elements) {
      if(item.parent && item.parent.name === 'NUM_VALOR') {
        return Number.parseFloat(item.text)
      }
    }
  }
}