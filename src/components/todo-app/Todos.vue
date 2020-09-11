<template>
  <div>
    <h1 class="title">Todos</h1>
    <h1 class="email">{{userEmail}}</h1>
    <section class="todoapp">
      <div v-if="loading">
        <h1 class="loading">Loading...</h1>
      </div>
      <div v-else>
        <header class="header">
          <input class="new-todo"
                 autofocus autocomplete="off"
                 :placeholder="this.inputPlaceholder"
                 v-model="newTodo"
                 @keyup.enter="addTodo">
        </header>
        <section class="main" v-show="todos.length" v-cloak>
          <input class="toggle-all" type="checkbox" v-model="allDone">
          <ul class="todo-list">
            <li v-for="todo in todosListReceived"
                class="todo"
                :key="todo.idTodo"
                :class="{ completed: todo.completed, editing: todo == editedTodo }">
              <div class="view">
                <input class="checkmark" type="checkbox" v-model="todo.completed" @change="completeTodo(todo)">
                <label @dblclick="editTodo(todo)">{{ todo.title }}</label>
                <button class="destroy" @click="removeTodo(todo)"></button>
              </div>
              <input class="edit" type="text"
                     v-model="todo.title"
                     v-todo-focus="todo == editedTodo"
                     @blur="doneEdit(todo)"
                     @keyup.enter="doneEdit(todo)"
                     @keyup.esc="cancelEdit(todo)">
            </li>
          </ul>
        </section>
        <footer class="footer" v-show="todos.length" >
          <FooterTodo :todos="todos" @myEventFooter="loadListTodo">

          </FooterTodo>
          <!--<span class="todo-count">
            <strong>{{ remaining }}</strong> {{ remaining | pluralize }} left
          </span>
          <ul class="filters">
            <li><a href="#/all" @click="setVisibility('all')" :class="{ selected: visibility == 'all' }">All</a></li>
            <li><a href="#/active" @click="setVisibility('active')" :class="{ selected: visibility == 'active' }">Active</a></li>
            <li><a href="#/completed" @click="setVisibility('completed')" :class="{ selected: visibility == 'completed' }">Completed</a></li>
          </ul>
          <button class="clear-completed" @click="removeCompleted" v-show="todos.length > remaining">
            Clear completed
          </button>-->
        </footer>
      </div>
    </section>
    <div v-if="error" class="error" @click="handleErrorClick">
      ERROR: {{this.error}}
    </div>
  </div>
</template>

<script>
import api from './TodosApi'
import FooterTodo from './Footer-Todo'


// app Vue instance
const Todos = {
  name: 'Todos',
  props: {
    activeUser: Object
  },

  // app initial state
  data: function() {
    return {
      todos: [],
      todosListReceived: [],
      newTodo: '',
      editedTodo: null,
      loading: true,
      error: null,
    }
  },
  mounted: function() {
    // inject some startup data
    api.getAll().then(response =>{
      this.$log.debug("Data loadad: ", response.data)
      this.todos = response.data;
      this.todosListReceived = this.todos;//cargar al iniciar
    }).catch(error =>{
      alert(error)
      this.$log.debug(error)
      this.error ="Failed to load Todos"
    }).finally(()=>{
      this.loading= false;
    })

  },

  // computed properties
  // http://vuejs.org/guide/computed.html
  computed: {
    //los que se van a mostrar
    todosToListed: function () {
      //return filters[this.visibility](this.todos)
    },

    allDone: {
      get: function () {
        return this.remaining === 0
      },
      set: function (value) {
        this.todos.forEach(function (todo) {
          todo.completed = value
        })
      }
    },
    userEmail: function () {
      return this.activeUser ? this.activeUser.email : ''
    },
    inputPlaceholder: function () {
      return this.activeUser ? this.activeUser.given_name + ', what needs to be done?' : 'What needs to be done?'
    }
  },

  // methods that implement data logic.
  // note there's no DOM manipulation here at all.
  methods: {
    loadListTodo: function (listTodo) {
      this.todosListReceived = listTodo;
    },

    addTodo: function () {
      var value = this.newTodo && this.newTodo.trim()
      if (!value) {
        return
      }
      api.createNew(value.toString(),false).then((response)=>{
        this.$log.debug("New Item is created: ",response);
        this.todos.push({
          idTodo: response.data.idTodo,
          title : value,
          completed:false
        })
      }).catch((error)=>{
        this.$log.debug(error)
      })

      this.newTodo = ''
    },

    completeTodo (todo) {
      api.updateForId(todo.idTodo, todo.title, todo.completed).then((response)=>{
        this.$log.info("Item updated ",response.data)
      }).catch((error)=>{
        this.$log.debug(error)
        todo.completed = !todo.completed
        this.error="Failed to updated todo"
      })
    },

    removeTodo: function (todo) { // notice NOT using "=>" syntax
      api.removeForId(todo.idTodo).then(()=>{
        this.$log.debug("Item removed:", todo);
        this.todos.splice(this.todos.indexOf(todo), 1)
      }).catch((error)=>{
        this.$log.debug(error);
        this.error = "Failed to remove todo"
      });
    },

    editTodo: function (todo) {
      this.beforeEditCache = todo.title
      this.editedTodo = todo
    },

    doneEdit: function (todo) {
      if (!this.editedTodo) {
        return
      }

      this.$log.info("Item updated",todo);

      api.updateForId(todo.idTodo,todo.title.trim(),todo.completed).then((response)=>{
        this.$log.info("Item updated:", response.data);
        this.editedTodo = null;
        todo.title = todo.title.trim();

      }).catch((error)=>{
        this.$log.debug(error)
        this.cancelEdit(todo)
        this.error = "Failed to update todo"
      })

      if (!todo.title) {
        this.removeTodo(todo)
      }
    },

    cancelEdit: function (todo) {
      this.editedTodo = null
      todo.title = this.beforeEditCache
    },

    /*removeCompleted: function () {
      this.todos = filters.active(this.todos)
    },*/

    handleErrorClick: function () {
      this.error = null;
    },
  },

  components:{
    FooterTodo
  },

  // a custom directive to wait for the DOM to be updated
  // before focusing on the input field.
  // http://vuejs.org/guide/custom-directive.html
  directives: {
    'todo-focus': function (el, binding) {
      if (binding.value) {
        el.focus()
      }
    }
  }
}

export default Todos
</script>

<style>
  [v-cloak] { display: none; }
</style>