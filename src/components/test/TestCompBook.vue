<template>
  <div class="div-book">
    <header class="center-text">{{book.nombre}}</header>
    <div class="center-text">ID:{{book.id}} - Precio: {{book.price}}</div>
  </div>
</template>

<script>
  export default {
    name: "TestCompBook",
    props:['book'],
    data : function (){
      return{

      }
    }

  }
</script>

<style scoped>
  [v-cloak] { display: none; }
</style>