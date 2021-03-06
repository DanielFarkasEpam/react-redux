const reducer = (state = {
    todos: [{
        text: 'git gud',
        id: Date.now(),
        done: false,
        description: 'here comes dat boi',
        category: '0'
    },
    {
        text: 'get slick',
        id: 3,
        done: false,
        description: 'must be slick, must be slippery, must be cool',
        category: '1'
    }],
    categories: [{
        name: 'chores',
        id: '0',
        parent: false
    },
    {
        name: 'extras',
        id: '1',
        parent: false
    }],
    progress: 0,
    editing: false,
    activeCategory: '0'
}, action) => {
    switch (action.type) {
        case 'ADD_CATEGORY':
            return Object.assign({}, state, {
                categories: [...state.categories, { name: action.text, id: action.id, parent: action.parent }],
                progress: state.todos.filter((todo) => todo.done).length
            });
        case 'REMOVE_CATEGORY':
            return Object.assign({}, state, {
                categories: state.categories.filter(category => category.id !== action.id),
                todos: state.todos.filter(todo => todo.category !== action.id),
                progress: state.todos.filter((todo) => todo.done).length
            });
        case 'SET_ACTIVE_CATEGORY':
            return Object.assign({}, state, {
                activeCategory: action.id
            });
        case 'ADD_TODO':
            return Object.assign({}, state, {
                todos: [...state.todos, { text: action.text, id: action.id, done: false, category: action.category }],
                progress: state.todos.filter((todo) => todo.done).length
            });
        case 'REMOVE_TODO':
            return Object.assign({}, state, {
                todos: state.todos.filter(todo => todo.id !== action.id),
                progress: state.todos.filter((todo) => todo.done).length
            });
        case 'TOGGLE_TODO':
            return Object.assign({}, state, {
                todos: state.todos.map((todo) => {
                    if (todo.id === action.id) {
                        return { ...todo, done: !todo.done }
                    } else {
                        return todo
                    }
                })
            });
        case 'UPDATE_PROGRESS':
            return Object.assign({}, state, {
                progress: state.todos.filter((todo) => todo.done).length
            });
        case 'EDIT_TODO_BY_ID':
            return Object.assign({}, state, {
                editing: state.todos.filter(todo => todo.id === action.id)[0]
            });
        case 'CLOSE_EDITFORM':
            return Object.assign({}, state, {
                editing: false
            });
        case 'SAVE_TODO':
            return Object.assign({}, state, {
                editing: false,
                todos: state.todos.map((todo) => {
                    if (todo.id === action.id) {
                        return { ...todo, text: action.newText, description: action.newDesc }
                    } else {
                        return todo
                    }
                })
            });

        default:
            return state
    }
}

export default reducer;