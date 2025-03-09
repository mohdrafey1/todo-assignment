import { createSlice } from '@reduxjs/toolkit';

const initialState = [];

const todoSlice = createSlice({
    name: 'todos',
    initialState,
    reducers: {
        setTodos: (state, action) => action.payload,
        addTodo: (state, action) => {
            state.push(action.payload);
        },
        updateTodo: (state, action) => {
            const index = state.findIndex(
                (todo) => todo.id === action.payload.id
            );
            if (index !== -1) {
                state[index] = { ...state[index], ...action.payload };
            }
        },
        deleteTodo: (state, action) =>
            state.filter((todo) => todo.id !== action.payload),
    },
});

export const { setTodos, addTodo, updateTodo, deleteTodo } = todoSlice.actions;
export default todoSlice.reducer;
