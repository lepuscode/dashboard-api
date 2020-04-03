import { WidgetModel, WidgetNewsInfoModel, WidgetRatesInfoModel } from "../general/models/widgets.model"

export const mockWidgets: WidgetModel[] = [
  {
    id: "news",
    title: "News"
  },
  {
    id: "rates",
    title: "Exchange Rates - Fiat"
  }
]

export const mockWidgetNewsInfo: WidgetNewsInfoModel = {
  info: [
    { id: "id0", url: "https://www.cnnbrasil.com.br/", css: "h2.news-item-header__title-above", type: 1, preserve: true, idx: 0 },
    { id: "id1", url: "https://brasil.elpais.com/", css: "h2.headline", type: 2, preserve: true, idx: 1 },
    { id: "id2", url: "https://www.infomoney.com.br/", css: "a.cover-link", type: 0, preserve: false },
    { id: "id3", url: "https://www.uol.com.br", css: "h1.titulo", type: 1, preserve: false },
    { id: "id4", url: "https://www.estadao.com.br", css: "h3.title", type: 1, preserve: false },
    { id: "id5", url: "https://jovempan.com.br/", css: "h3.title", type: 1, preserve: false },
    { id: "id6", url: "https://veja.abril.com.br/", css: "h2.title", type: 1, preserve: false },
    { id: "id7", url: "https://www.ig.com.br/", css: "a.titulo", type: 0, preserve: false }
  ]
}

export const mockWidgetRatesInfo: WidgetRatesInfoModel = {
  apiUrl: "https://api.exchangeratesapi.io/latest",
}
