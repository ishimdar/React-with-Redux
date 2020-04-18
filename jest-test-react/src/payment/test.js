import React, { Component } from "react";
import ReactDOM from "react-dom";
import axios from 'axios';
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

// fake data generator
// const getItems = count =>
//   Array.from({ length: count }, (v, k) => k).map(k => ({
//     id: `item-${k}`,
//     content: `item ${k}`
//   }));

// a little function to help us with reordering the result
const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

// const grid = 8;

// const getItemStyle = (isDragging, draggableStyle) => ({
//   // some basic styles to make the items look a bit nicer
//   userSelect: "none",
//   padding: grid * 2,
//   margin: `0 0 ${grid}px 0`,

//   // change background colour if dragging
//   background: isDragging ? "lightgreen" : "grey",

//   // styles we need to apply on draggables
//   ...draggableStyle
// });

// const getListStyle = isDraggingOver => ({
//   background: isDraggingOver ? "lightblue" : "lightgrey",
//   padding: grid,
//   width: 250
// });

class Test extends Component {
  constructor(props) {
    super(props);
    this.state = {
    //   items: getItems(10)
    payementList: []
    };
    this.onDragEnd = this.onDragEnd.bind(this);
  }

  onDragEnd(result) {
    // dropped outside the list
    if (!result.destination) {
      return;
    }

    const payementList = reorder(
      this.state.payementList,
      result.source.index,
      result.destination.index
    );

    this.setState({
        payementList
    });
  }

  componentWillMount() {
    axios.get(`http://localhost:3004/payment_methods`)
        .then((res) => {
            console.log('res.data[0].options', res.data[0].options);
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

  // Normally you would want to split things out into separate components.
  // But in this example everything is just done in one place for simplicity
  render() {
    //   console.log('this.state.items', this.state.items);
    return (
      <DragDropContext onDragEnd={this.onDragEnd}>
        <Droppable droppableId="droppable">
          {(provided, snapshot) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
            //   style={getListStyle(snapshot.isDraggingOver)}
            >
              {this.state.payementList.map((item, index) => (
                <Draggable key={item.id} draggableId={item.id} index={index}>
                  {(provided, snapshot) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    //   style={getItemStyle(
                    //     snapshot.isDragging,
                    //     provided.draggableProps.style
                    //   )}
                    >
                      {item.label}
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    );
  }
}

export default Test;