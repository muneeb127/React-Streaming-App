import React from "react";
import { connect } from "react-redux";
import { createStream } from "../../actions/index";
import StreamForm from "./StreamForm";

class StreamCreate extends React.Component {
  //formValues are the values submitted by the form
  //Passing it as a prop to the StreamForm Component
  onSubmit = formValues => {
    this.props.createStream(formValues);
  };

  render() {
    return (
      <div>
        <h3>Create a Stream</h3>
        {/* Passing a callback any time the form is submitted */}
        <StreamForm onSubmit={this.onSubmit}></StreamForm>
      </div>
    );
  }
}

export default connect(null, { createStream })(StreamCreate);
