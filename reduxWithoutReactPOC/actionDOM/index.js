

$(document).ready( function(){

    const myTodoList = [
        {
            type: 'TODO_ADD',
            todo: { id: '0', name: 'ishimdar ahamad', count:1, completed: false },
        },
        {
            type: 'TODO_ADD',
            todo: { id: '1', name: 'Arif Khan', count:1, completed: false },
        },
        {
            type: 'TODO_ADD',
            todo: { id: '2', name: 'Amit Sharma', count:1, completed: false },
        },        
        {
            type: 'TODO_ADD',
            todo: { id: '3', name: 'Durgesh Rao', count:1, completed: false },
        },
        
    ];

    
    function showUserList(myTodoList){
        var $ulList = $("#list");
        let userList = myTodoList.map( (item) => {
            let $li = '<li>'
            +item.todo.name+':' +item.todo.count +
            '<span>Edit<span>'+
            '</li>';

            return $ulList.append($li);
        });
        return userList;
    }
    
    showUserList(myTodoList);
    

    const store = Redux.createStore(reducer, []);
    var i = 0;
    $("#addTodoBtn").click(function(){        
        console.log('i', i);        
        store.dispatch({            
            type: myTodoList[i].type,
            todo: myTodoList[i].todo,
        });
        console.log('store.getState()', store.getState());
        i++;
    });    
});
