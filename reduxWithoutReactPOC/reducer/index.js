function reducer(state, action){
    switch(action.type){
        case 'TODO_ADD':{
            return applyAddTodo(state, action);
        }
        
        case 'TODO_TOGGLE':{
            return applyToggleTodo(state, action);
        }

        default:{
            return state
        }
    }
}

function applyAddTodo(state, action) {
    return state.concat(action.todo);
  }

function applyToggleTodo (state, action){      
    return state.map( (todo) => {
        todo.id === action.todo.id ? Object.assign({}, todo, {completed : !todo.completed}) : todo
    })
}

// function applyToggleTodo (state, action){    
//     return state.map( (todo) => {
//         todo.id === action.todo.id ? Object.assign({}, todo, {completed : !todo.completed}) : todo
//     })
// }
