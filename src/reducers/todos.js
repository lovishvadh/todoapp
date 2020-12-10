import * as types from "../constants/Action.Types";

const INITIAL_STATE = null;

const Todos = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case types.TODO_DATA:
            return { ...action.data };
        default:
            return state;
    }
};

export default Todos;
  