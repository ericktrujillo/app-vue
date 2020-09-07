<template>
  <div>
    <h2>Add Tasks</h2>
    <hr/>
    <form @submit.prevent = "addTask">
      <input type="text" v-model="task"  placeholder="Insert Task"/>
      <input type="submit" value="Add Task"/>
    </form>
  </div>
</template>

<script>
import { ref }  from '@vue/composition-api'

export default {
  name: "AppAddTask",
  setup(props,context){
    //modelo local
    const task = ref("")

    //metodo local
    function addTask(){
      context.emit("eventAddTask",task.value);
      task.value = "";
    }

    return{task,addTask}
  }
}
</script>

<style scoped>

</style>