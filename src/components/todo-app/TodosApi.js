import axios from 'axios'

const SERVER_URL ='http://localhost:8082'

const instance = axios.create({
    baseURL : SERVER_URL,
    timeout : 2000
})

export default {
    //create
    createNew : (text,completed)=> {
        return instance.post('todos',{title:text, completed :completed})
    },
    //Read
    getAll : ()=> {
        return instance.get('todos')
        /*instance.get('todos', {
            transformResponse: [function (data) {
                return data ? JSON.parse(data).todos : data;
            }]
        })*/
    },
    //Update
    updateForId : (id, text , completed) =>{
        return instance.put('todos/'+id,{title:text, completed: completed})
    },
    //Delete
    removeForId : (id) =>{
        return instance.delete('todos/'+id);
    }
}