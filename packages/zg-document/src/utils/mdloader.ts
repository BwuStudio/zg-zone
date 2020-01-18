import showdown from 'showdown'
import 'github-markdown-css'

const converter = new showdown.Converter()

export default (url: string) => {
    return (fetch(url)
        .then(res => res.text())
        .then(text => converter.makeHtml(text)))
}

