import React, { Component } from "react";
import { connect } from "react-redux";
import { Button, Table } from "react-bootstrap";
import { fetchUsers, deleteUser } from "./../reducers/userReducer";
import FontAwesome from "react-fontawesome";
import PermissionUtils from "./../utils/PermissionUtils";

import { Permissions } from "@alehuo/clubhouse-shared";

export class UsersList extends Component {
  componentDidMount() {
    this.props.fetchUsers(this.props.token);
  }
  render() {
    return (
      <Table striped bordered condensed hover responsive>
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Email</th>
            {(PermissionUtils.hasPermission(
              this.props.perms,
              Permissions.ALLOW_DELETE_USER.value
            ) ||
              PermissionUtils.hasPermission(
                this.props.perms,
                Permissions.ALLOW_EDIT_USER.value
              )) && <th>Actions</th>}
          </tr>
        </thead>
        <tbody>
          {this.props.users ? (
            this.props.users.map(user => (
              <tr key={user.userId}>
                <td>{user.userId}</td>
                <td>
                  {user.firstName} {user.lastName}
                </td>
                <td>{user.email}</td>
                {(PermissionUtils.hasPermission(
                  this.props.perms,
                  Permissions.ALLOW_DELETE_USER.value
                ) ||
                  PermissionUtils.hasPermission(
                    this.props.perms,
                    Permissions.ALLOW_EDIT_USER.value
                  )) && (
                  <td>
                    {PermissionUtils.hasPermission(
                      this.props.perms,
                      Permissions.ALLOW_DELETE_USER.value
                    ) && (
                      <Button
                        bsStyle="danger"
                        onClick={() =>
                          this.props.deleteUser(user.userId, this.props.token)
                        }
                      >
                        <FontAwesome name="trash" /> Delete
                      </Button>
                    )}{" "}
                    {PermissionUtils.hasPermission(
                      this.props.perms,
                      Permissions.ALLOW_EDIT_USER.value
                    ) && (
                      <Button
                        bsStyle="primary"
                        onClick={() =>
                          this.props.deleteUser(user.userId, this.props.token)
                        }
                      >
                        <FontAwesome name="edit" /> Edit
                      </Button>
                    )}
                  </td>
                )}
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={3}>No users.</td>
            </tr>
          )}
        </tbody>
      </Table>
    );
  }
}

const mapStateToProps = state => ({
  token: state.user.token,
  perms: state.permission.userPerms
});

const mapDispatchToProps = {
  fetchUsers,
  deleteUser
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UsersList);
