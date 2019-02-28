import React from "react";
import { connect } from "react-redux";
import { Footer, FooterTab, Button, Text, Icon } from "native-base";

class DisplayFooter extends React.Component {
  constructor(props) {
    super(props);
  }
  handleOnPressSettings = () => {
    this.props.dispatch({
      type: "CURRENT_PAGE",
      page: "Settings",
      title: "Setting"
    });
  };
  handleOnPressStats = () => {
    this.props.dispatch({
      type: "CURRENT_PAGE",
      page: "Stats",
      title: "Statistics"
    });
  };
  handleOnPressInventory = () => {
    this.props.dispatch({
      type: "CURRENT_PAGE",
      page: "Inventory",
      title: "Inventory"
    });
  };
  render() {
    return (
      <Footer>
        <FooterTab>
          <Button onPress={this.handleOnPressSettings}>
            <Icon type="Octicons" name="gear" />
            <Text>Settings</Text>
          </Button>
          <Button onPress={this.handleOnPressStats}>
            <Icon type="Ionicons" name="ios-stats" />
            <Text>Stats</Text>
          </Button>
          <Button onPress={this.handleOnPressInventory}>
            <Icon type="Octicons" name="package" />
            <Text>Inventory</Text>
          </Button>
        </FooterTab>
      </Footer>
    );
  }
}

const mapStateToProps = state => {
  return {};
};

export default connect(mapStateToProps)(DisplayFooter);
