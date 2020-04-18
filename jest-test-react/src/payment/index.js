import React, { Component } from 'react';
import axios from 'axios';
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";




const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
};

const getItemStyle = (isDragging, draggableStyle) => ({    
    background: isDragging ? "#808080" : "#f8f8f8",

    // styles we need to apply on draggables
    ...draggableStyle
});



const getListStyle = (isDraggingOver) => {
    console.log('isDraggingOver', isDraggingOver);
    return isDraggingOver ? "list-group lightblue" : "list-group lightgrey";
};

class Payment extends Component {

    constructor(props) {
        super(props);

        this.state = {
            payementList: []
        };
        this.onDragEnd = this.onDragEnd.bind(this);
    }


    componentWillMount() {
        axios.get(`http://localhost:3004/payment_methods`)
            .then((res) => {
                console.log('res', res);
                for (var key in res.data[0].options) {
                    res.data[0].options[key]['id'] = Number(key) + 1;
                }

                this.setState({
                    payementList: res.data[0].options
                })
            })
            .catch((error) => {
                console.log(error);
            });
    }

    onDragEnd(result) {
        console.log('result', result);
        if (!result.destination) {
            return;
        }

        const items = reorder(
            this.state.payementList,
            result.source.index,
            result.destination.index
        );

        this.setState({
            payementList: items
        });
    }

    render() {
        console.log('payementList', this.state.payementList)
        let listDOM = '';
        if (this.state.payementList !== undefined) {
            listDOM = this.state.payementList.map((item, index) => {
                return (                    
                    <Draggable key={item.id} draggableId={item.id} index={index}>
                        {(provided, snapshot) => (
                            <li className="list-group-item text-left"
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}                                
                                style={getItemStyle(
                                    snapshot.isDragging,
                                    provided.draggableProps.style
                                )}                            
                            >
                                {item.label}
                            </li>
                        )}
                    </Draggable>
                );
            })
        }

        return (            
            <DragDropContext onDragEnd={this.onDragEnd}>
                <Droppable droppableId="droppable">
                    {(provided, snapshot) => (
                        <ul
                            {...provided.droppableProps}
                            ref={provided.innerRef}                            
                            className={getListStyle(snapshot.isDraggingOver)}
                        >
                            {listDOM}
                            {provided.placeholder}
                        </ul>
                    )}
                </Droppable>
            </DragDropContext>
        )
    }
}

export default Payment;