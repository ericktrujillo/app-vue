<template>
  <div>
    <h2>Search Tasks</h2>
    <hr/>
    <input @input="insertText($event.target.value)" placeholder="Start searching..." />
  </div>
</template>

<script>
export default {
  name: "AppTaskSearch",
  props :{},
  setup(props, context){

    function insertText(value){
      context.emit("eventInput",value);
    }

    return{insertText}
  }
}
</script>

<style scoped>

</style>