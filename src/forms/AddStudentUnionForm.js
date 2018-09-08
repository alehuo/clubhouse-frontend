import React from "react";
import { connect } from "react-redux";

import {
  FormControl,
  FormGroup,
  ControlLabel,
  HelpBlock,
  Button,
  Well
} from "react-bootstrap";
import { Field, reduxForm } from "redux-form";

const FieldGroup = ({
  input,
  meta,
  id,
  label,
  help,
  meta: { touched, error, warning },
  ...props
}) => (
  <FormGroup controlId={id}>
    <ControlLabel>{label}</ControlLabel>
    <FormControl {...props} {...input} />
    {help && <HelpBlock>{help}</HelpBlock>}
    {touched &&
      ((error && <span>{error}</span>) || (warning && <span>{warning}</span>))}
  </FormGroup>
);

const checked = val =>
  val === true
    ? undefined
    : "You must have the permission from the student union";

// Todo: add field name to message
const notEmpty = val =>
  val && val.length > 0 ? undefined : "Input must not be empty";

const AddStudentUnionForm = props => {
  return (
    <form onSubmit={props.handleSubmit}>
      <Field
        name="studentUnionName"
        id="formControlsText"
        type="text"
        label="Name"
        placeholder="Name"
        component={FieldGroup}
        validate={[notEmpty]}
      />
      <Field
        name="studentUnionDescription"
        id="formControlsText"
        type="text"
        label="Description"
        placeholder="Description"
        component={FieldGroup}
        validate={[notEmpty]}
      />
      <Well>
        <FormGroup controlId="studentUnionPermission">
          <Field
            name="studentUnionPermission"
            component="input"
            type="checkbox"
            validate={[checked]}
          />{" "}
          <b>
            I have the permission from the student union to save their
            information to the service
          </b>
          <HelpBlock>
            Your answer will be saved in case a student union wants to do a data
            request, as required by the European Union General Data Protection
            Regulation.
          </HelpBlock>
        </FormGroup>
      </Well>
      <Button
        type="button"
        bsStyle="danger"
        onClick={props.handleClose}
        disabled={props.isAdding}
      >
        Cancel
      </Button>
      &nbsp;&nbsp;&nbsp;
      <Button type="submit" bsStyle="success" disabled={props.isAdding}>
        {props.isAdding ? "Adding student union.." : "Add"}
      </Button>
    </form>
  );
};

const mapStateToProps = state => ({
  isAdding: state.studentUnion.isAdding
});

export default reduxForm({
  // a unique name for the form
  form: "studentUnion"
})(connect(mapStateToProps)(AddStudentUnionForm));
