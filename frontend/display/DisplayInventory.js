import React from "react";
import { connect } from "react-redux";
import {
  View,
  Text,
  Button,
  H1,
  ListItem,
  Left,
  Body,
  Right,
  Icon,
  List
} from "native-base";
import CONSTANTS from "../Constants";

class DisplayInventory extends React.Component {
  handleOnPressCloseInventory = () => {
    this.props.dispatch({
      type: "CURRENT_PAGE",
      page: CONSTANTS.homepage,
      title: this.props.tammyName
    });
  };
  render = () => {
    return (
      <View>
        <List>
          <ListItem
            style={{
              flex: 1,
              flexDirection: "row",
              justifyContent: "flex-start",
              alignItems: "center"
            }}
          >
            <Left>
              <Icon active type="MaterialCommunityIcons" name="carrot" />
              <Text>Carrot</Text>
            </Left>
            <Right />
          </ListItem>
          <ListItem
            style={{
              flex: 1,
              flexDirection: "row",
              justifyContent: "flex-start",
              alignItems: "center"
            }}
          >
            <Left>
              <Icon active type="MaterialCommunityIcons" name="food-apple" />
              <Text>Apples</Text>
            </Left>
            <Right />
          </ListItem>
        </List>
        <Button
          full
          style={{
            marginTop: CONSTANTS.app_height - 600,
            backgroundColor: "#5067FF"
          }}
          onPress={this.handleOnPressCloseInventory}
        >
          <Text>Close inventory</Text>
        </Button>
      </View>
    );
  };
}

const mapStateToProps = state => {
  return { tammyName: state.tammyName };
};

export default connect(mapStateToProps)(DisplayInventory);
