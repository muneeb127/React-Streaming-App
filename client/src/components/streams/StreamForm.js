import React from "react";
import { Field, reduxForm } from "redux-form";
//reduxForm is like connect

class StreamForm extends React.Component {
  //destructure error and touched from meta
  renderError({ error, touched }) {
    if (touched && error) {
      return (
        <div className="ui error message">
          <div className="header">{error}</div>
        </div>
      );
    }
  }

  // renderInput(formProps) {
  //All the props provided to your component by redux-form are divided into input and meta objects.
  renderInput = ({ input, label, meta }) => {
    //Destructure input
    // console.log(formProps);
    // return (
    //   <input
    //     value={formProps.input.value}
    //     onChange={formProps.input.onChange}
    //   />
    // );
    //Best syntax
    // Add all properties in formProps.input as attributes to <input />
    //console.log(meta)
    //It contains a field of errors coming from the function validate
    const className = `field ${meta.error && meta.touched ? "error" : ""}`;
    return (
      <div className={className}>
        <label>{label}</label>
        <input {...input} autoComplete="off" />
        {/* <div>{meta.error}</div> */}
        {this.renderError(meta)}
      </div>
    );
  };

  //formValues are the values submitted by the form
  //onSubmit calls a callback function from the parent component with the formValues
  onSubmit = formValues => {
    console.log(formValues);
    this.props.onSubmit(formValues);
  };

  render() {
    //this.props refers to all the props passed by redux-form library to this component
    // console.log(this.props);

    return (
      //handleSubmit is a built-in redux-form callback function used to submit forms and it executes the function passed into it after it submits the form

      <form
        onSubmit={this.props.handleSubmit(this.onSubmit)}
        className="ui form error"
      >
        <Field name="title" component={this.renderInput} label="Enter title" />
        <Field
          name="description"
          component={this.renderInput}
          label="Enter description"
        />
        <button className="ui button primary">Submit</button>
      </form>
    );
  }
}

//Function to validate inputs
//It must be wired up to our component using reduxForm
const validate = formValues => {
  const errors = {};

  if (!formValues.title) {
    errors.title = "You must enter a title";
  }

  if (!formValues.description) {
    errors.description = "You must enter a description";
  }

  return errors;
};

export default reduxForm({
  form: "streamForm",
  validate: validate
})(StreamForm);
