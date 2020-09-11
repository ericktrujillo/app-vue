<template>
  <div class="div-book">
    <header class="center-text">{{ nameBook }}</header>
    <div class="center-text">ID:{{bookProp.id}} - Precio: {{bookProp.price}}</div>
    <input value="Click here" type="button" @click="myEventBtn(bookProp)"/>
  </div>
</template>

<script>
  export default {
    name: "TestCompBook",
    props: {bookProp : Object},
    data :function () {
      return { nameBook : this.bookProp.nombre}
    },
    methods : {
      myEventBtn:function (value){
        this.$emit("myEventBook",value)
      }
    }

  }
</script>

<style scoped>
  [v-cloak] { display: none; }
</style>