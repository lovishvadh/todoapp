import * as types from "../constants/Action.Types";
import ApiHelper from "../services/ApiHelper";

export function updateTodosData(data) {
    return dispatch => {
        dispatch({
          type: types.TODO_DATA,
          data
        });
    }
  }

export async function getTodos(userid) {
    return  (await ApiHelper.get(`users/${userid}/tasks`)).data;
}

export async function completeTodo(userid, taskId) {
    return  (await ApiHelper.put(`users/${userid}/tasks/${taskId}/completed`)).data;
}

export async function uncompleteTodo(userid, taskId) {
    return  (await ApiHelper.put(`users/${userid}/tasks/${taskId}/uncompleted`)).data;
}

export async function deleteTodo(userid, taskId) {
    return  (await ApiHelper.delete(`users/${userid}/tasks/${taskId}`)).data;
}

export async function changeDescription(userid, taskId, description) {
    return  (await ApiHelper.put(`users/${userid}/tasks/${taskId}`, {description})).data;
}

export function createTodo(userid, description, todos) {
    return dispatch => {
       ApiHelper.post(`users/${userid}/tasks`, {
           description
       }).then((res) => dispatch(updateTodosData({
           todosData: todos.push(res.data),
           shouldUpdate: true
       }))
       ).catch((err) => {
           console.log(err);
           //Err handler
       });
    }
}

