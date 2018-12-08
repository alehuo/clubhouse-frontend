import React from "react";
import { Modal } from "react-bootstrap";
import { connect } from "react-redux";
import AddKeyHolderForm from "../../forms/AddKeyHolderForm";
import { RootState } from "../../reduxStore";

interface Props {
  show: boolean;
  onHide: any;
  keyTypes: any[];
  users: any[];
}

export class AddKeyHolder extends React.Component<Props> {
  public handleSubmit = (values: any) => {
    console.log("Submitted");
  }
  public render() {
    return (
      <Modal show={this.props.show} onHide={this.props.onHide}>
        <Modal.Header closeButton>
          <Modal.Title>Add a keyholder</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <AddKeyHolderForm
            handleClose={this.props.onHide}
            onSubmit={this.handleSubmit}
            keyTypes={this.props.keyTypes}
            users={this.props.users}
          />
        </Modal.Body>
      </Modal>
    );
  }
}

const mapStateToProps = (state: RootState) => ({
  token: state.user.token,
});

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AddKeyHolder);
