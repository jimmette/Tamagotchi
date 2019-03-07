import React from "react";
import { connect } from "react-redux";
import { Container } from "native-base";

class AppController extends React.Component {
  render() {
    return <Container />;
  }
}

const mapStateToProps = state => {
  return { currentPage: state.currentPage };
};

export default connect(mapStateToProps)(AppController);
