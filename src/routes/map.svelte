<script>
  import { branches } from '../components/stores/Store-branches.js';
</script>

<template lang="pug">
ul
  +each('$branches as branch, i')
    li {branch.name}
    +if('branch.children')
      ul
        +each('branch.children as branch, i')
          li {branch.name}
            +if('branch.pages')
              ul
                +each('branch.pages as page, i')
                  li
                    a(href!='/medical-pages/{page.id}') {page.name}

    +if('branch.pages')
      ul
        +each('branch.pages as page, i')
          li
            a(href!='/medical-pages/{page.id}') {page.name}
                  


</template>