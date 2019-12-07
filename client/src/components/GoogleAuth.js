import React, { Component } from "react";
import { connect } from "react-redux";
import { signIn, signOut } from "../actions";

class GoogleAuth extends Component {
  componentDidMount() {
    window.gapi.load("client:auth2", () => {
      window.gapi.client
        .init({
          clientId:
            "23665415571-apneeqjk3186fd7pn8kt2k24cauht728.apps.googleusercontent.com",
          scope: "email"
        })
        .then(() => {
          this.auth = window.gapi.auth2.getAuthInstance();
          this.onAuthChange(this.auth.isSignedIn.get());
          this.auth.isSignedIn.listen(this.onAuthChange);
        });
    });
  }

  //Passing the current value of isSignedIn(not state value) to this function
  onAuthChange = isSignedIn => {
    if (isSignedIn) {
      //this.props.signIn() will provoke an action of type: 'SIGN_IN'
      this.props.signIn(this.auth.currentUser.get().getId());
    } else {
      //this.props.signOut() will provoke an action of type: 'SIGN_OUT'
      this.props.signOut();
    }
  };

  //Arrow function so that this refers to class
  onSignOutClick = () => {
    //signIn and signOut are methods of gapi.client--------(window.gapi.auth2.getAuthInstance())
    this.auth.signOut();
  };

  onSignInClick = () => {
    this.auth.signIn();
  };

  renderAuthButton() {
    if (this.props.isSignedIn === null) {
      return null;
    } else if (this.props.isSignedIn === true) {
      return (
        //We are not using this.onSignOut()
        //Because we dont want the function to be called when
        //the component is rendered on the screen
        <button onClick={this.onSignOutClick} className="ui red google button">
          <i className="google icon" />
          Sign Out
        </button>
      );
    } else {
      return (
        <button onClick={this.onSignInClick} className="ui red google button">
          <i className="google icon" />
          Sign In With Google
        </button>
      );
    }
  }

  render() {
    return <div>{this.renderAuthButton()}</div>;
  }
}

const mapStateToProps = state => {
  return {
    isSignedIn: state.auth.isSignedIn
  };
};

export default connect(mapStateToProps, { signIn, signOut })(GoogleAuth);
