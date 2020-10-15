<template>
  <section class="todoapp">
    <!-- header -->
    <header class="header">
      <input class="new-todo" autocomplete="off" placeholder="待办事项" @keyup.enter="addTodo">
    </header>
    <!-- main section -->
    <section v-show="todos.length" class="main" style="height: 480px;">
      <!-- <input id="toggle-all" :checked="allChecked" class="toggle-all" type="checkbox" @change="toggleAll({ done: !allChecked })"> -->
      <!-- <label for="toggle-all" /> -->
      <ul class="todo-list">
       <!-- <todo
          v-for="(todo, index) in filteredTodos"
          :key="index"
          :todo="todo"
          @toggleTodo="toggleTodo"
          @editTodo="editTodo"
          @deleteTodo="deleteTodo"
        /> -->
        <todo
           v-for="(todo, index) in filteredTodos"
           :key="index"
           :todo="todo"


         />
      </ul>
    </section>
    <!-- footer -->
    <footer v-show="todos.length" class="footer">
      <span class="todo-count">
        <strong>{{ remaining }}</strong>
        {{ remaining | pluralize('待办') }}
      </span>
      <ul class="filters">
        <li v-for="(val, key) in filters" :key="key">
          <a :class="{ selected: visibility === key }" @click.prevent="visibility = key">{{ key | capitalize }}</a>
        </li>
      </ul>
      <!-- <button class="clear-completed" v-show="todos.length > remaining" @click="clearCompleted">
        Clear completed
      </button> -->
    </footer>
  </section>
</template>

<script>
import Todo from './Todo.vue'
import {getSelfTodoList} from '@/api/todo.js'

const STORAGE_KEY = 'todos'
const filters = {
  all: todos => todos,
  left: todos => todos.filter(todo => !todo.done),
  completed: todos => todos.filter(todo => todo.done)
}
var defalutList = [
  { text: '收款', done: false },
  { text: '签合同', done: true },
  { text: '拟合同', done: true },
  { text: '分发设备', done: true },
  { text: '收款', done: true }
]
export default {
  components: { Todo },
  filters: {
    pluralize: (n, w) => n === 1 ? w : w + 's',
    capitalize: s => s.charAt(0).toUpperCase() + s.slice(1)
  },
  data() {
    return {
      todo_list:[],
      visibility: 'all',
      filters,
      // todos: JSON.parse(window.localStorage.getItem(STORAGE_KEY)) || defalutList
      todos: []
    }
  },
  computed: {
    allChecked() {
      return this.todos.every(todo => todo.done)
    },
    filteredTodos() {
      return filters[this.visibility](this.todos)
    },
    remaining() {
      return this.todos.filter(todo => !todo.done).length
    }
  },
  methods: {
    setLocalStorage() {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(this.todos))
    },
    addTodo(e) {
      const text = e.target.value
      if (text.trim()) {
        this.todos.push({
          text,
          done: false
        })
        this.setLocalStorage()
      }
      e.target.value = ''
    },
    toggleTodo(val) {
      val.done = !val.done
      this.setLocalStorage()
    },
    deleteTodo(todo) {
      this.todos.splice(this.todos.indexOf(todo), 1)
      this.setLocalStorage()
    },
    editTodo({ todo, value }) {
      todo.text = value
      this.setLocalStorage()
    },
    clearCompleted() {
      this.todos = this.todos.filter(todo => !todo.done)
      this.setLocalStorage()
    },
    toggleAll({ done }) {
      this.todos.forEach(todo => {
        todo.done = done
        this.setLocalStorage()
      })
    },
    getSelfTodoList() {
      getSelfTodoList({}).then(respinse => {
        console.log('290ew8w98e9qw8e9',respinse)
        if(respinse.code == 0) {
          var data = respinse.data
          for(var p in data) {
            this.todos.push({
              text:data[p]['title'],
              done:false,
              content:data[p]['content'],
              do_time:data[p]['do_time']
            })
          }
        }
      console.log('todo',this.todo_list)
      }).catch( e => {
        alert(3)
      })

    }
  },
  mounted () {
	  this.getSelfTodoList()
  }

}
</script>

<style lang="scss">
  @import './index.scss';
</style>
