import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchStreams } from "../../actions/index.js";

class StreamList extends Component {
  componentDidMount() {
    this.props.fetchStreams();
  }

  renderList() {
    return this.props.streams.map(stream => {
      return (
        <div className="item" key={stream.id}>
          <i className="large middle aligned camera icon" />
          <div className="content">
            <div className="header">{stream.title}</div>
            <div className="description">{stream.description}</div>
          </div>
        </div>
      );
    });
  }

  render() {
    // console.log(this.props.streams);
    // return <h1>Stream List</h1>;
    return (
      <div>
        <h2>Stream List</h2>
        <div className="ui relaxed divided list">{this.renderList()}</div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    //Object.values takes an object as an argument
    //It takes out all the values and then maps them to an array
    streams: Object.values(state.streams)
  };
};

export default connect(mapStateToProps, { fetchStreams })(StreamList);
