<template>
  <div id="watch-example"><!--this is the root DIV , in there put your COMPONENTS, DIRECTIVS etc-->
    <p>
      Haz una pregunta de si/no:
      <input v-bind:class="{'input-error' : errorInput}" v-model="question">
    </p>
    <p>{{answer}}</p>

    <hr/>
    <div>
      <Todos/>
    </div>
    <div>
      <Test/>
    </div>
    <hr/>
    <ul>
      <li v-for = "(item,index) in personas" :key="item.id">
        {{index}} :{{item.nombre}}
        <ul>
          <li v-for="(obj,key) in item.dni" :key="obj.nro">
            {{key}} : {{obj}}
          </li>
        </ul>
      </li>
    </ul>

    <hr/>
    <div class="div-full-width">
      <BookCmp
          v-for="itemBook in books"
          :key="itemBook.id"
          :book-prop="itemBook"
          @myEventBook="showMesg"/>
    </div>

    <hr/>
    <div v-if="tipoFooter === 'footer-1'">
      <H2>Esto es un footer tipo - 1</H2>
    </div>
    <div v-else>
      <H2>Esto es un footer tipo - 2</H2>
    </div>
  </div>
</template>

<script>
  import Todos from '../Todos'
  import BookCmp from './TestCompBook'
  import Test from './Test.vue'
  import _ from 'lodash'
  import axios from 'axios'

  export default {
    props :{ },
    data :function() {
      return {
        question : '',
        answer : 'No puedo darte una respuesta hasta q hagas una pregunta!',
        errorInput :false,
        tipoFooter: 'footer-1',
        personas :[
          {
            id : 1 , nombre: 'Erick', edad : 27, dni: {
              nro:'47159939',
              f_emision:'02/02/2018',
              f_venc:'02/02/2022'
            }
          },
          {
            id : 2 , nombre: 'Susan', edad : 28, dni: {
              nro:'47851422',
              f_emision:'08/011/2018',
              f_venc:'08/11/2022'
            }
          },
          {
            id : 3 , nombre: 'Clara', edad : 19, dni: {
              nro:'35251450',
              f_emision:'02/07/2018',
              f_venc:'02/07/2022'
            }
          }
        ],
        books : [
          {id : 1, nombre : 'Moonstone', price : 25.25},
          {id : 2, nombre : 'Cat Black', price : 22.75},
          {id : 3, nombre : 'Tom Sawyer', price : 25.00}
        ]
      }
    },
    watch : {
      // cada ves que 'question' cambie se ejecutara la sgt func
      // eslint-disable-next-line no-unused-vars
      question: function (newQuestion, oldQuestion) {
        this.answer = 'Esperando que deje de escribir ...'
        this.debouncedGetAnswer()
      }
    },
    created: function() {
      // _.debounce es una función proporcionada por lodash para limitar cuan
      // a menudo se puede ejecutar una operación particularmente costosa.
      // En este caso, queremos limitar la frecuencia con la que accedemos a
      // yesno.wtf/api, esperando hasta que el usuario haya terminado
      // de escribir antes de realizar la solicitud ajax.
      // Para aprender más sobre la función _.debounce (y su primo
      // _.throttle), visite: https://lodash.com/docs#debounce
      this.debouncedGetAnswer = _.debounce(this.getAnswer,500)
    },
    methods:{
      getAnswer: function () {
        if (this.question.indexOf('?') === -1){
          this.answer = 'las preguntas suelen contener el \'?\''
          this.errorInput = true
          return
        }
        this.errorInput = false
        this.answer = 'Pensando...'
        var comp = this
        axios.get('https://yesno.wtf/api')
          .then(function (response){
            comp.answer = _.capitalize(response.data.answer)
          })
          .catch(function (error){
            comp.answer = '¡Error! No se pudo alcanzar la API. ' + error
          })
      },
      showMesg :function (obj){
        alert(obj.id+"-"+obj.nombre)
      }
    },
    components :{
      Todos,
      BookCmp,
      Test
    }
  }
</script>