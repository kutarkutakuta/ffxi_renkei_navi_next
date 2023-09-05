import { create, useStore } from "zustand";

type TodoStore = {
    todos: string[];
    addTodo: (todo: string) => void;
    removeTodo: (todo: string) => void;
};

export const useTodoStore = create<TodoStore>((set) => ({
    todos: [],
    addTodo: (todo) => set((state) => ({ todos: [...state.todos, todo] })),
    removeTodo: (todo) => set((state) => ({ todos: state.todos.filter((t) => t !== todo) })),
}));