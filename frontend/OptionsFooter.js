import React from "react";
import { View } from "react-native";
import CONSTANTS from "./Constants";
import {
  Container,
  Header,
  Content,
  Footer,
  FooterTab,
  Button,
  Text
} from "native-base";
class OptionsFooter extends React.Component {
  render() {
    return (
      <View style={{ width: CONSTANTS.app_width }}>
        <Footer>
          <FooterTab>
            <Button>
              <Text>Settings</Text>
            </Button>
            <Button>
              <Text>Stats</Text>
            </Button>
            <Button active>
              <Text>Inventory</Text>
            </Button>
          </FooterTab>
        </Footer>
      </View>
    );
  }
}

export default OptionsFooter;
