import React, { Component } from 'react';
import { Form } from 'reactstrap';

class CustomForm extends Component {
  componentDidUpdate() {
    if (this.props.errormessage && this.props.errormessage.length > 1) {
      this.err.scrollIntoView({ behavior: 'smooth' });
    }
    if (this.props.successmessage && this.props.successmessage.length > 1) {
      this.success.scrollIntoView({ behavior: 'smooth' });
    }
  }

  render() {
    const {
      className,
      errormessage,
      successmessage,
      children,
      ...rest
    } = this.props;

    return (
      <Form {...rest}>
        {
          errormessage &&
          <div
            className="alert alert-danger" role="alert"
            ref={(c) => { this.err = c; }}
          >
            {errormessage}
          </div>
        }
        {
          successmessage &&
          <div
            className="alert alert-success" role="alert"
            ref={(c) => { this.success = c; }}
          >
            {successmessage}
          </div>
        }
        {children}
      </Form>
    );
  }
}

export default CustomForm;
