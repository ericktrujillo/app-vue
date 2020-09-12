<template>
  <div>
    <span class="todo-count">
      <strong>{{remaining}}</strong>{{ remaining | pluralize }}
    </span>
    <ul class="filters">
      <li><a href="#/all" @click="setVisibility('all')" :class="{ selected : visibility=='all'}"> All</a></li>
      <li><a href="#/active" @click="setVisibility('active')" :class="{ selected : visibility=='active'}"> Active</a></li>
      <li><a href="#/completed" @click="setVisibility('completed')" :class="{ selected : visibility=='completed'}"> Completed</a></li>
    </ul>
    <button class="clear-completed" @click="removeCompleted" v-show="todos.length > remaining">
      Clear completed
    </button>
  </div>
</template>

<script>

let filters={
  all: function (todos) {
    return todos;
  },
  active: function (todos) {
    return todos.filter(function (todo){
      return !todo.completed;
    })
  },
  completed: function (todos) {
    return todos.filter(function (todo) {
      return todo.completed;
    });
  }

}

export default {
  name: "Footer-Todo",
  props: {
    todos : Array // no alterar aqui directamente ya que pertenece al comp-padre
  },
  data : function (){
    return {
      visibility : 'all',
      todosActives : []
    }
  },
  computed:{
    remaining: function () {
      return filters.active(this.todos).length;
    },
    filteredTodos : function (){
      return filters[this.visibility](this.todos);
    }

  },
  methods:{
    setVisibility: function (visib){
      this.visibility = visib;
      this.$emit("myEventFooter", this.filteredTodos);
    },

    removeCompleted: function () {
      this.todosActives = filters.active(this.todos) ;
      this.$emit('myEventFooter2',this.todosActives);
    },
  },
  filters:{
    pluralize : function (n){
      return n === 1 ? ' Item':' Items';
    }
  }


}
</script>

<style scoped>
[v-cloak] { display: none; }
</style>