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

export function sort(arr, value='name'){
  if(arr.length < 2) return arr;

  return arr.slice().sort((a, b) => valueCompare(a,b,value));
}

function valueCompare(a,b,value){
  a = value ? a[value] : a;
  b = value ? b[value] : b;
  if (a > b) return 1
  if (a == b) return 0
  if (a < b) return -1
}

export function getBranchPath (obj, name, count=0) {
  let inName = name ? ' / ' + name : '';

  if (obj.parent && !count) {
    let currName = obj.name + inName;
    return getBranchPath(obj.parent, currName, ++count)
  } else {
    return obj.name + inName
  }
}

export function getRootBranch (branch, level=0) {
  if (branch.parent) {
    return getRootBranch(branch.parent, ++level)
  } else if(level){
    return {
      id: branch.id,
      name: branch.name,
    }
  } else {
    return {
      id: 0,
      name: '',
    }
  }
}

/**
 * Find insertion point for a value val, as specified by the comparator
 * (a function)
 * @param sortedArr The sorted array
 * @param val The value for which to find an insertion point (index) in the array
 * @param comparator The comparator function to compare two values
 */
export function findInsertionPoint(arr, val, name) {
  let low = 0;
  let mid = -1;
  let high = arr.length;
  let compare = 0;

  while(low < high)   {
     mid = parseInt((low + high)/2);
     compare = valueCompare(arr[mid], val, name);

     if(compare < 0)   {
        low = mid + 1;
     }else if(compare > 0) {
        high = mid;
     }else {
        return mid;
     }
  }

  return low;
}

/**
 * Find insertion point for a value val, as specified by the comparator
 * (a function)
 * @param arr The target array
 * @param item The item for insert
 * @param name Item will past ordered by the value, 'name' by default
 */

export function orderSplice(arr, item, name='name') {
  let insertionPoint = findInsertionPoint(arr, item, name);
  arr.splice(insertionPoint, 0, item)
};


/**
 * Склонение числовых подписей
 * @param number число на основе которого склоняется подпись
 * @param sign массив подписей, пример: ['год', 'года', 'лет']
 */
export function numDeclension(
  number,
  sign = ['год', 'года', 'лет']) {
  let cases = [2, 0, 1, 1, 1, 2];
  return sign[
    ( number % 100 > 4 && number % 100 < 20 )
      ? 2
      : cases [ ( number % 10 < 5 )
        ? number % 10
        : 5 ]
  ];
}
