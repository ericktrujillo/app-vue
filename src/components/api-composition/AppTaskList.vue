<template>
  <div>
    <h1>Tasks</h1>
    <hr/>
    <h6>Todas las tareas</h6>
    <ul>
      <li v-for="(item, index) in tasks" :key="index">{{item.title}}</li>
    </ul>
  </div>
</template>

<script>


export default {
  name: "AppTaskList",
  props:{
    tasks:{
      type : Array,
      required : true
    }
  },
  computed:{
    completedTasks(){
      return ""
    }
  }
}
</script>

<style scoped>

</style>