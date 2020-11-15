import escapeHtml from 'escape-html'

export function serialize (data, {
  p = 'p',
  h2 = 'h4'
}={}) {

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
        return `<h2 class='${h2}'>${children}</h2>`
      case 'paragraph':
        return `<p class='${p}'>${children}</p>`
      case 'list-item':
        return `<li class='${p}'>${children}</li>`
      case 'unordered-list':
        return `<ul>${children}</ul>`
      case 'blockquote':
        return `<blockquote class='${p}' >${children}</blockquote>`
      case 'link':
        return `<a class='${p}' href="${data.data.href}">${children}</a>`
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

export function getRootBranch (branch, level=0, name='', id='') {
  if (branch.parent) {
    name = name ? branch.name + ' / ' + name : branch.name;
    return getRootBranch(branch.parent, ++level, name, branch.id)
  } else if(level){
    name = name ? branch.name + ' / ' + name : branch.name;
    return {
      id: id ? id : branch.id,
      name: name ? name : branch.name,
    }
  } else {
    return {
      id: 0,
      name: '',
    }
  }
}

export function getRootBranch_old (branch, level=0) {
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

/**
 * Разметка колонок
 * @param L Количество элементов
 * @param C количество колонок
 */
export function columnMark(
  {
    L, // ← arr length
    C = 3, // ← column count
    f = 'first',
    l = 'last',
    m = 'middle',
    o = 'only',
    sep = '--',
  }) {
  // if(L == 0) return [o];

  let map = [];
  let col = {};

  function mark(i, name){
    map[i] = map[i] ? map[i]+' '+name : name;
  }

  for (let colCount = 1; colCount <= C; colCount++) {

    // Actual
    let rowsInCol = Math.ceil( L / colCount );
    let currCol = 1;

    // Store rows count in cur column conf
    col[colCount] = rowsInCol;

    // class names
    let _f = colCount < 1 ? f : f+sep+colCount;
    let _l = colCount < 1 ? l : l+sep+colCount;
    let _o = colCount < 1 ? o : o+sep+colCount;

    for (let i = 1; i <= L; i++) {
      let x = i-1;
      let colItemsSum = rowsInCol * currCol;
      let isOnlyChild = L == i && L < colItemsSum;

      // First column child
      if(
        i == colItemsSum - rowsInCol + 1 &&   // first in cur column
        rowsInCol > 1 &&                      // ony if more than one row
        !isOnlyChild                          // only if not only
        ) mark(x, _f)


      // last column child
      if(
        colItemsSum == i &&                   // last in curr col
        rowsInCol > 1 ) mark(x, _l)           // ony if more than one row

      if( i == L &&                           // last child
        rowsInCol > 1 &&                      // ony if more than ome row
        L != rowsInCol * (colCount - 1) + 1   // ony if not only one in col
        ) mark(x, _l)

      // only column child
      if(
        rowsInCol == 1 || isOnlyChild
       ) mark(x, _o)

      // Fill empty
      if(!map[x]) map[x] = '';

      // Define next column
      if(i === rowsInCol * currCol) currCol++
    }
  }

  return {map, col, L}
}