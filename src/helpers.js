import escapeHtml from 'escape-html'

export function serialize (data) {
  // prefixClass = prefix ? `class="${prefix}"` : '';

  const serialize = (data, length) => {
    // import { Text } from 'slate'
    // if (Text.isText(data)) {
    //     return escapeHtml(data.text)
    //   }

    if (data.object === 'text' ) {
      let markArr = data.marks ? data.marks.map(item => item.type) : '';

      let markedText = data.marks.reduce((prev, item) => {
          switch (item.type) {
            case 'underline':
              return `<u>${prev}</u>`
            case 'bold':
              return `<b>${prev}</b>`
            case 'italic':
              return `<i>${prev}</i>`
            case 'strikethrough':
              return `<strike>${prev}</strike>`
            default:
              return `${prev}`
          }
        }, escapeHtml(data.text) /* ← sets to prev */ );

      return markedText
    }


    const children = data.nodes.map(n => serialize(n)).join('');

    switch (data.type) {
      case 'heading':
        return `<h2 class="h4">${children}</h2>`
      case 'paragraph':
        return `<p class='p'>${children}</p>`
      case 'list-item':
        return `<li class='p'>${children}</li>`
      case 'unordered-list':
        return `<ul>${children}</ul>`
      case 'blockquote':
        return `<blockquote>${children}</blockquote>`
      case 'link':
        return `<a href="${data.data.href}">${children}</a>`
      default:
        return `${children}`
    }
  }

  return serialize(data);
}

export function sort(arr){
  if(arr.length < 2) return arr;

  return arr.slice().sort((a, b) => {
    a = a.name
    b = b.name
    if (a > b) return 1
    if (a == b) return 0
    if (a < b) return -1
  });
}