import React from "react";
import { connect } from "react-redux";
import DisplaySettings from "./DisplaySettings";
import DisplayStatistics from "./DisplayStatistics";
import DisplayInventory from "./DisplayInventory";
import DisplayStore from "./DisplayStore";

class DisplayModal extends React.Component {
  render() {
    return (
      <>
        <DisplaySettings
          isVisible={this.props.displayFooterOption === "SETTINGS"}
        />
        <DisplayStatistics
          isVisible={this.props.displayFooterOption === "STATISTICS"}
        />
        <DisplayInventory
          isVisible={this.props.displayFooterOption === "INVENTORY"}
        />
        <DisplayStore isVisible={this.props.displayFooterOption === "STORE"} />
      </>
    );
  }
}

const mapStateToProps = state => {
  return { displayFooterOption: state.displayFooterOption };
};

export default connect(mapStateToProps)(DisplayModal);
