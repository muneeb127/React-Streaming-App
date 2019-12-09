import _ from "lodash";
import React from "react";
import { connect } from "react-redux";
// import streams from "../../apis/streams";
import { fetchStream, editStream } from "../../actions/index";
import StreamForm from "./StreamForm";

class StreamEdit extends React.Component {
  componentDidMount() {
    this.props.fetchStream(this.props.match.params.id);
  }

  //Passed in as a callback to streamForm
  // Will get submitted values from streamForm
  onSubmit = formValues => {
    this.props.editStream(this.props.match.params.id, formValues);
  };

  //This props are being sent to the components be React Router
  // console.log(props);
  render() {
    // console.log(this.props);
    if (!this.props.stream) {
      return <div>Loading...</div>;
    }
    return (
      <div>
        <h3>Edit a Stream</h3>
        {/* InitialValues is a special prop passed to a redux form */}
        {/* StreamForm is wrapped by a ReduxForm */}
        {/*  */}
        <StreamForm
          // One set of curly braces denotes we will write JS expression
          // Second set indicates we are creating a normal object
          //We will pass initial title and description which needs to be changes
          // initialValues={{ title: "Edit Me", description: "Change me too" }}
          // initialValues={this.props.stream}
          // We dont need to pass id and userId with stream so we will user lodash function to pick title and description
          initialValues={_.pick(this.props.stream, "title", "description")}
          onSubmit={this.onSubmit}
        />
      </div>
    );
  }
}

//props object has the id we need to edit the stream
//but it can not be accessed by mapStateToProps
//mapStateToProps is called with two arguments
//ownProps argument is a reference to the props object shown inside the StreamEdit component

const mapStateToProps = (state, ownProps) => {
  return {
    stream: state.streams[ownProps.match.params.id]
  };
};

export default connect(mapStateToProps, { fetchStream, editStream })(
  StreamEdit
);
