import moment from 'moment'
import fetch from 'node-fetch'
import parseXml from '@rgrove/parse-xml'

const requestXML = async (url) => {
  const response = await fetch(url)
  return await response.text()
}

const getChildren = (element) => {
  if(element.type === 'text' && element.parent.name === 'string') {
    return parseXml( element.text.replace(/\n/g, '').replace(/\s/g, '') ).children
  }
  if(!element.children) {
    return element
  }
  return element.children
}

const flatten = (elements) => {
  if(Array.isArray(elements)) {
    return elements.reduce((done,item) => {
      return done.concat( flatten( getChildren(item) ) )
    }, [])
  } else {
    return elements
  }
}

const getInformation = async (url) => {
  const xml = await requestXML(url)
  const document = parseXml(xml)
  const elements = flatten(document.children)

  for(let item of elements) {
      if(item.parent && item.parent.name === 'NUM_VALOR') {
        return item.text
      }
  }
}

const dolarExchange = async () => {
  const date = moment().format('DD/MM/YYYY')
  const file = new Map()
    .set('buy', `http://indicadoreseconomicos.bccr.fi.cr/indicadoreseconomicos/WebServices/wsIndicadoresEconomicos.asmx/ObtenerIndicadoresEconomicosXML?tcIndicador=317&tcFechaInicio=${date}&tcFechaFinal=${date}&tcNombre=dmm&tnSubNiveles=N`)
    .set('sell', `http://indicadoreseconomicos.bccr.fi.cr/indicadoreseconomicos/WebServices/wsIndicadoresEconomicos.asmx/ObtenerIndicadoresEconomicosXML?tcIndicador=318&tcFechaInicio=${date}&tcFechaFinal=${date}&tcNombre=dmm&tnSubNiveles=N`)

  const buyRate = await getInformation(file.get('buy'))
  const sellRate = await getInformation(file.get('sell'))

  return { date, buyRate, sellRate }
}

export {
  dolarExchange
}


