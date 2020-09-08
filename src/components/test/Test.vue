

<template>
  <div class="hello-world-component">
    https://riptutorial.com/
    <p>{{message}}</p>
    <input @keyup.enter="changeName($event)"/>
    <button @click="btnClick" >Click Me</button>
  </div>
</template>

<script>
export default{
  props:{},
  events:{ /* event listeners go here */},
  data: function(){
      return{
        name:'Mart',
        lastName:'Truji'
      }
  },
  computed:{
      message: function (){
        return "Hello from " + this.name;
      },
      reversedMsg: function (){
        return this.name.split('').reverse().join('');
      },
      fullname : {
        get: function (){
          return this.name+' '+this.lastName;
        },

        set: function (newFullname){
          var names= newFullname.split(' ');
          this.name = names[0];
          this.lastName = names[names.length-1];
        }
      }
  },
  methods:{
      // this could be easily achieved by using v-model on the <input> field, but just
      //to show a method doing it this way.
      changeName(e){
        this.fullname = e.target.value;
        //this.name = e.target.value;
      },
      btnClick(e) {
        console.log(e.toString())
        this.name = this.reversedMsg;
      }
  }
}
</script>

<style>
  [v-cloak] { display: none; }
</style>