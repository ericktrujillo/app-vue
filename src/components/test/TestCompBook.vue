<template>
  <div class="div-book">
    <header class="center-text">{{nameBook }}</header>
    <div class="center-text">ID:{{book.id}} - Precio: {{book.price}}</div>
  </div>
</template>

<script>
  export default {
    name: "TestCompBook",
    props: {book : Object},
    data : function (){
      return{
        nameBook : this.book.nombre
      }
    }

  }
</script>

<style scoped>
  [v-cloak] { display: none; }
</style>