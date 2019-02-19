import React from "react";
import { StyleSheet } from "react-native";
import SpriteAnimation from "./SpriteAnimation";
import CONSTANTS from "./Constants";
import StatusBarContainer from "./StatusBarContainer";
import ActionIconContainer from "./ActionIconContainer";
import { Provider } from "react-redux";
import myStore from "./Store";
import {
  Container,
  Header,
  Left,
  Body,
  Right,
  Title,
  Subtitle,
  Footer,
  FooterTab,
  Button,
  Text,
  View,
  Fab,
  Icon
} from "native-base";
import gameEngine from "./GameEngine";
import OptionsFooter from "./OptionsFooter";

// const styles = StyleSheet.create({
//   container: {
//     width: CONSTANTS.app_width,
//     height: CONSTANTS.app_height,
//     display: "flex",
//     flexDirection: "column",
//     justifyContent: "flex-start",
//     alignItems: "center",
//     backgroundColor: "pink",
//     paddingTop: 75
//   },
//   actionIconsContainer: {
//     display: "flex",
//     flexDirection: "row",
//     justifyContent: "center",
//     alignItems: "center",
//     marginTop: 300
//   }
// });

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { activeEat: false, activeSleep: false, activePlay: false };
    // setInterval(gameEngine, 500);
  }
  render() {
    return (
      <Provider store={myStore}>
        <Container>
          <Header>
            <Left />
            <Body>
              <Title>Tammy</Title>
              <Subtitle>your Tamagotchi</Subtitle>
            </Body>
            <Right />
          </Header>
          <View style={{ flex: 1 }}>
            <Fab
              active={this.state.activeEat}
              direction="up"
              containerStyle={{}}
              style={{ backgroundColor: "#5067FF" }}
              position="bottomLeft"
              onPress={() =>
                this.setState({ activeEat: !this.state.activeEat })
              }
            >
              <Icon
                type="MaterialCommunityIcons"
                name="silverware-fork-knife"
              />
              <Button style={{ backgroundColor: "#34A34F" }}>
                <Icon type="MaterialCommunityIcons" name="food-apple" />
              </Button>
              <Button style={{ backgroundColor: "#3B5998" }}>
                <Icon name="logo-facebook" />
              </Button>
            </Fab>
            <Fab
              active={this.state.activeSleep}
              direction="up"
              containerStyle={{ marginLeft: 75 }}
              style={{ backgroundColor: "#5067FF" }}
              position="bottomLeft"
              onPress={() =>
                this.setState({ activeSleep: !this.state.activeSleep })
              }
            >
              <Icon type="MaterialCommunityIcons" name="sleep" />
              <Button style={{ backgroundColor: "#34A34F" }}>
                <Icon name="logo-whatsapp" />
              </Button>
              <Button style={{ backgroundColor: "#3B5998" }}>
                <Icon name="logo-facebook" />
              </Button>
            </Fab>
            <Fab
              active={this.state.activePlay}
              direction="up"
              containerStyle={{ marginLeft: 150 }}
              style={{ backgroundColor: "#5067FF" }}
              position="bottomLeft"
              onPress={() =>
                this.setState({ activePlay: !this.state.activePlay })
              }
            >
              <Icon type="" name="" />
              <Button style={{ backgroundColor: "#34A34F" }}>
                <Icon name="logo-whatsapp" />
              </Button>
              <Button style={{ backgroundColor: "#3B5998" }}>
                <Icon name="logo-facebook" />
              </Button>
              <Button disabled style={{ backgroundColor: "#DD5144" }}>
                <Icon name="mail" />
              </Button>
            </Fab>
          </View>
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
        </Container>
      </Provider>
    );
  }
}

export default App;

{
  /* <View style={styles.container}>
<View>
  <StatusBarContainer />
</View>
<View>
  <SpriteAnimation />
</View>
<View style={styles.actionIconsContainer}>
  <ActionIconContainer />
</View>
</View> */
}
