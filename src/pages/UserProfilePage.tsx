import { User } from "@alehuo/clubhouse-shared";
import React from "react";
import { Col, Nav, NavItem, Row } from "react-bootstrap";
import FontAwesome from "react-fontawesome";
import { connect } from "react-redux";
import { LinkContainer } from "react-router-bootstrap";
import { Redirect, Route } from "react-router-dom";
import { RootState } from "../reduxStore";
import UserHistory from "./subpages/UserHistory";
import UserInformation from "./subpages/UserInformation";
import UserKeys from "./subpages/UserKeys";

interface Props {
  userData?: User;
}

const UserProfilePage: React.SFC<Props> = (props) => {
  if (!props.userData) {
    return <div>Failed to display user data</div>;
  }
  return (
    <React.Fragment>
      <div>
        {(props.userData.firstName || "") +
          " " +
          (props.userData.lastName || "")}{" "}
        <small>{props.userData.email || ""}</small>
      </div>
      <Row className="clearfix">
        <Col xs={3}>
          <Nav variant="pills">
            <LinkContainer to="/user/info">
              <NavItem>
                <FontAwesome name="user" /> My information
              </NavItem>
            </LinkContainer>
            <LinkContainer to="/user/history">
              <NavItem>
                <FontAwesome name="clock" /> My history
              </NavItem>
            </LinkContainer>
            <LinkContainer to="/user/keys">
              <NavItem>
                <FontAwesome name="key" /> My keys
              </NavItem>
            </LinkContainer>
          </Nav>
        </Col>
        <Col xs={9}>
          <Route
            exact
            path="/user"
            component={() => <Redirect to="/user/info" />}
          />
          <Route
            exact
            path="/user/info"
            render={() => <UserInformation userData={props.userData} />}
          />
          <Route exact path="/user/history" component={UserHistory} />
          <Route exact path="/user/keys" component={UserKeys} />
        </Col>
      </Row>
    </React.Fragment>
  );
};

const mapStateToProps = (state: RootState) => ({
  perms: state.user.userPerms,
  userData: state.user.userData,
});

export default connect(mapStateToProps)(UserProfilePage);
