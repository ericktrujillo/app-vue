<template>
  <div id="app">
    <!--<AppTaskSearch v-model="search"></AppTaskSearch>-->
    <AppTaskSearch @eventInput="fSearch"></AppTaskSearch>
    <AppTaskList :tasks="filteredTask"></AppTaskList>
    <AppAddTask @eventAddTask="addTask"></AppAddTask>
  </div>
</template>

<script>
import tasksList from "./apiTasks";
import AppTaskList from "@/components/api-composition/AppTaskList";
import AppTaskSearch from "@/components/api-composition/AppTaskSearch";
import AppAddTask from "@/components/api-composition/AppAddTask";
import { ref , computed, watch} from "@vue/composition-api"

export default {
  name: "AppParent",
  setup(){
    const tasks = ref(tasksList);
    const search = ref("");

    // eslint-disable-next-line no-unused-vars
    watch(search, (oldSearch,newSearch)=>{
      console.log(search);
    });

    function fSearch(value){
      search.value = value;
    }

    function addTask(task){
      tasks.value.push({
        title : task ,
        completed : false
      });
    }

    const filteredTask = computed(() => {
      return tasks.value.filter(tsk => tsk.title.includes(search.value));
    });

    return{tasks,search,addTask,fSearch,filteredTask}
  },
  components:{
    AppAddTask,
    AppTaskSearch,
    AppTaskList,

  }
}
</script>

<style scoped>

</style>