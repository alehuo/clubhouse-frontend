import React, { Component } from "react";
import { Alert, Button, PageHeader } from "react-bootstrap";
import FontAwesome from "react-fontawesome";
import { connect } from "react-redux";
import StudentUnionsList from "./../components/StudentUnionsList";
import {
  addFormModalOpen,
  fetchStudentUnions,
} from "./../reducers/studentUnionReducer";
import PermissionUtils from "./../utils/PermissionUtils";
import AddStudentUnion from "./subpages/AddStudentUnion";

import { Permissions } from "@alehuo/clubhouse-shared";

export class StudentUnionsPage extends React.Component<any> {
  public componentDidMount() {
    this.props.fetchStudentUnions(this.props.token);
  }
  public render() {
    return (
      <React.Fragment>
        <PageHeader>
          Student unions
          <p>
            {PermissionUtils.hasPermission(
              this.props.perms,
              Permissions.ALLOW_ADD_EDIT_REMOVE_STUDENT_UNIONS.value,
            ) && (
              <Button
                bsStyle="success"
                onClick={() => this.props.addFormModalOpen(true)}
              >
                <FontAwesome name="plus" /> Add a student union
              </Button>
            )}
          </p>
        </PageHeader>
        {PermissionUtils.hasPermission(
          this.props.perms,
          Permissions.ALLOW_VIEW_STUDENT_UNIONS.value,
        ) ? (
          <StudentUnionsList stdus={this.props.studentUnions} />
        ) : (
          <Alert bsStyle="warning">
            <h4>No permission to view student unions</h4>
            <p>You don't have correct permissions to view student unions.</p>
          </Alert>
        )}
        <AddStudentUnion
          show={this.props.modalOpen}
          onHide={() => this.props.addFormModalOpen(false)}
        />
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state: any) => ({
  studentUnions: state.studentUnion.studentUnions,
  modalOpen: state.studentUnion.modalOpen,
  perms: state.permission.userPerms,
  token: state.user.token,
});

const mapDispatchToProps = { addFormModalOpen, fetchStudentUnions };

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(StudentUnionsPage);