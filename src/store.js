import { combineReducers, createStore } from 'redux';
import storage from 'redux-persist/lib/storage';
import {
    persistReducer,
    persistStore,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from 'redux-persist';
import { useSelector } from 'react-redux';



const todosReducer = (state = [], action) => {
    console.log(action.type);
    console.log(action.payload);
    switch (action.type) {
        case 'ADD_TODO':
            /**
             * We spread the existing todos, and add the new at the end
             */
            return [...state, action.payload];
        case 'DELETE_TODO':
            /**
             * The start by finding the todo matching with the id
             passed as action.payload.
             */
            const itemDelete = state.find((todo) => todo.id === action.payload);
            console.log(itemDelete);
            return [
                // { ...itemDelete, ended: true },
                ...state.filter((todo) => todo.id !== action.payload)
            ];
        case 'RESET_TODOS':
            /**
             * Resetting the todos array to it's original form: empty
             */
            return [];
        default:
            return state;
    };
};

const ErrorReducer = (state=[], action) => {
    console.log(action.type);
    console.log(action.payload);
    switch (action.type) {
    case 'SUCCESS':
        /**
         * We spread the existing state, and add the new at the end
         */
        return [...state, action.payload];
    case 'ERROR_ADD':
        /**
         * We spread the existing state, and add the new at the end
         */
         return [...state, action.payload];
         default:
            return state;


    };
};



const rootReducer = combineReducers({
    todosReducer,
    ErrorReducer
})

const store = createStore(rootReducer);

export default store;



