import React from "react";
import { View } from "react-native";
import CONSTANTES from "./Constantes";
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
      <View style={{ width: CONSTANTES.app_width }}>
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
