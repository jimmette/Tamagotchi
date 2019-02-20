import React from "react";
import { Footer, FooterTab, Button, Text, Icon } from "native-base";

class DisplayFooter extends React.Component {
  constructor(props) {
    super(props);
    // setInterval(gameEngine, 500);
  }
  render() {
    return (
      <Footer>
        <FooterTab>
          <Button>
            <Icon type="Octicons" name="gear" />
            <Text>Settings</Text>
          </Button>
          <Button>
            <Icon type="Ionicons" name="ios-stats" />
            <Text>Stats</Text>
          </Button>
          <Button>
            <Icon type="Octicons" name="package" />
            <Text>Inventory</Text>
          </Button>
        </FooterTab>
      </Footer>
    );
  }
}

export default DisplayFooter;
