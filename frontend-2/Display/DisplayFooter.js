import React from "react";
import { Footer, FooterTab, Button, Text } from "native-base";
import { connect } from "react-redux";

class DisplayFooter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  onPressSettings = () => {
    this.props.displayFooterOption === "SETTINGS"
      ? this.props.dispatch({
          type: "SET_FOOTER_DISPLAY",
          payload: { option: "NONE" }
        })
      : this.props.dispatch({
          type: "SET_FOOTER_DISPLAY",
          payload: { option: "SETTINGS" }
        });
  };

  onPressStatistics = () => {
    this.props.displayFooterOption === "STATISTICS"
      ? this.props.dispatch({
          type: "SET_FOOTER_DISPLAY",
          payload: { option: "NONE" }
        })
      : this.props.dispatch({
          type: "SET_FOOTER_DISPLAY",
          payload: { option: "STATISTICS" }
        });
  };

  onPressInventory = () => {
    this.props.displayFooterOption === "INVENTORY"
      ? this.props.dispatch({
          type: "SET_FOOTER_DISPLAY",
          payload: { option: "NONE" }
        })
      : this.props.dispatch({
          type: "SET_FOOTER_DISPLAY",
          payload: { option: "INVENTORY" }
        });
  };

  onPressStore = () => {
    this.props.displayFooterOption === "STORE"
      ? this.props.dispatch({
          type: "SET_FOOTER_DISPLAY",
          payload: { option: "NONE" }
        })
      : this.props.dispatch({
          type: "SET_FOOTER_DISPLAY",
          payload: { option: "STORE" }
        });
  };

  render() {
    return (
      <Footer>
        <FooterTab>
          <Button
            active={
              this.props.displayFooterOption === "SETTINGS" ? true : false
            }
            onPress={this.onPressSettings}
          >
            <Text>Settings</Text>
          </Button>
          <Button
            active={
              this.props.displayFooterOption === "STATISTICS" ? true : false
            }
            onPress={this.onPressStatistics}
          >
            <Text>Statistics</Text>
          </Button>
          <Button
            active={
              this.props.displayFooterOption === "INVENTORY" ? true : false
            }
            onPress={this.onPressInventory}
          >
            <Text>Inventory</Text>
          </Button>
          <Button
            active={this.props.displayFooterOption === "STORE" ? true : false}
            onPress={this.onPressStore}
          >
            <Text>Store</Text>
          </Button>
        </FooterTab>
      </Footer>
    );
  }
}

const mapStateToProps = state => {
  return {
    displayFooterOption: state.displayFooterOption
  };
};

export default connect(mapStateToProps)(DisplayFooter);
