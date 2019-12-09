// We will user React portals to render modals
//They will be rendered as a sub element of body. Refer to firs ttwo videos for further assistance

import React from "react";
import ReactDOM from "react-dom";

const Modal = props => {
  //When we create protal
  //The return value of our functional component is change

  //This function takes two arguments
  //We will create a new element in the index.html file and then render the protal into that element directly as a subelement of the body
  return ReactDOM.createPortal(
    <div onClick={props.onDismiss} className="ui dimmer modals visible active">
      <div
        onClick={e => e.stopPropagation()}
        // e.stopPropagation() makes sure that event doesnot bubble up to the parent div and windows deosnot navigate to the other page
        className="ui standard modal visible active"
      >
        <div className="header">{props.title}</div>
        <div className="content">{props.content}</div>
        <div className="actions">{props.actions}</div>
      </div>
    </div>,
    document.querySelector("#modal")
  );
};

export default Modal;
