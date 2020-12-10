import React, { Component } from 'react';
import { connect } from "react-redux";
import './App.css';
import Todos from './components/Todos';
import TodoInputBar from './components/TodoInputBar';
import Footer from './components/Footer';
import { updateTodosData, getTodos, createTodo, completeTodo, uncompleteTodo, changeDescription, deleteTodo } from './actions/todoActions';
import Loading from './components/Loading';

class App extends Component {
  state = {
    todos: [
      // { id: 1, content: "This is my first todo", completed_at: false, createdAt:1607539188679 },
      // { id: 2, content: "This is my second todo", completed_at: false, createdAt:1607539176987 },
      // { id: 3, content: "This is my third todo", completed_at: false, createdAt: 1607539201607},
      // { id: 4, content: "This is my fourth todo", completed_at: false, createdAt: 1607539214497},
    ],
    completedTodos: [
      // { id: 5, content: "This is my fifth todo", completed_at: true, createdAt: 1607539176998},
      // { id: 6, content: "This is my sixth todo", completed_at: true, createdAt: 1607539188443},
      // { id: 7, content: "This is my seventh todo", completed_at: true, createdAt: 1607539208907},
      // { id: 8, content: "This is my eigth todo", completed_at: true, createdAt: 1607539215497},
    ],
  }

  async componentDidMount() {
   let res = await getTodos(6);
   this.props.dispatch(updateTodosData({
     todosData: res,
     shouldUpdate: true
   }))
    if((this.props.todosData || {}).shouldUpdate) {
      this.updateTodos(this.props.todosData);
    }
  }

  componentDidUpdate(newProps, oldProps) {
    if((newProps.todosData || {}).shouldUpdate) {
      this.updateTodos(newProps.todosData);
    }
  }

  updateTodos = (todosData) => {
    let { todos, completedTodos } = this.state;
    todosData.shouldUpdate = false;
    this.props.dispatch(updateTodosData(todosData))
    todosData.todosData.map((ele) => {
      ele.createdAt = new Date(ele.created_at).getTime();
      if(ele.completed_at) completedTodos.push(ele);
      else todos.push(ele);
    });
    todos = todos.sort((a , b) => b.createdAt - a.createdAt);
    completedTodos = completedTodos.sort((a , b) => new Date(a.completed_at).getTime() - new Date(b.completed_at).getTime());
    console.log(todos, completedTodos);
    this.setState({todos, completedTodos});
  }

  moveToDone = async (id) => {
    let {todos, completedTodos} = this.state;
    await completeTodo(6, todos[id].id);
    todos[id].completed_at = true;
    todos[id].isEditing = false;
    todos[id].isNew = true;
    completedTodos.push(todos[id]);
    todos = todos.filter((ele, index) => index !== id);
    this.setState({
      todos, completedTodos
    });
  }

  undoTask = async (id) => {
    let {todos, completedTodos} = this.state;
    await uncompleteTodo(6,completedTodos[id].id );
    completedTodos[id].completed_at = false
    todos.push(completedTodos[id]);
    completedTodos = completedTodos.filter((ele, index) => index !== id);
    todos = todos.sort((a,b) => b.createdAt - a.createdAt);
    console.log(todos);
    this.setState({
      todos, completedTodos
    });
  }

  startEditing = (id) => {
    console.log(id);
    const todos = this.state.todos;
    todos[id].isEditing = true; 
    this.setState({
      todos
    });
  }

  finishEditing = async (id, updatedTodo) => {
    const todos = this.state.todos;
    todos[id].isEditing = false; 
    todos[id].description = updatedTodo; 
    this.setState({
      todos
    });
    await changeDescription(6, todos[id].id, updatedTodo)
  }

  deleteTodo =  async (id) => {
    await deleteTodo(6, id);
    const todos =  this.state.todos.filter(todo => {
      return todo.id !== id
    });
    this.setState({
      todos
    });
  }

  deleteDone = async (id) => {
    await deleteTodo(6, id);
    const completedTodos = this.state.completedTodos.filter(todo => {
      return todo.id !== id
    });
    this.setState({
      completedTodos
    });
  }

  addNewTodo = async (event, todoText) => {
    event.preventDefault();
    if(todoText) {
      await createTodo(6, todoText);
      let todos = this.state.todos;
      todos.unshift({id: parseInt(Math.random() * 10000),  description: todoText , completed_at: false, createdAt:  Date.now()});
      this.setState({todos});
    }
  }

  render() {
    if(this.props.todosData) {
      return (
        <div className="App">
          <header className="App-header">
            <img src='/logo.png' className="App-logo" alt="logo" />
          </header>
          <div className="Container">
            <TodoInputBar addNewTodo={this.addNewTodo}/>
            <div className="List-container">
              <Todos listType={"todos"} startEditing={this.startEditing} finishEditing={this.finishEditing} todos={this.state.todos} deleteTodo={this.deleteTodo} moveToDone={this.moveToDone}/>
            </div>
            <div className="List-container">
              <Todos listType={"completedTodos"} startEditing={() => ""} todos={this.state.completedTodos} deleteTodo={this.deleteDone} moveToDone={this.undoTask}/>
            </div>
          </div>
          <Footer />
        </div>
      );
    } else {
      return (
        <Loading />
      );
    }
  }
}


const mapStateToProps = state => {
  const { Todos } = state;
  return {
    todosData: Todos
  };
};


const mapDispatchToProps = dispatch => {
  return { dispatch };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
