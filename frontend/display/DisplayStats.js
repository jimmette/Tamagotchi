import React from "react";
import { connect } from "react-redux";
import { View, Text, Button, H1, List, ListItem } from "native-base";
import moment from "moment";
import CONSTANTS from "../Constants";
import { StyleSheet } from "react-native";

class DisplayStats extends React.Component {
  handleOnPressCloseStats = () => {
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
          <ListItem>
            <Text>
              {this.props.tammyName} was born on{" "}
              {moment(this.props.tammyWasBornOn).format("MMMM Do YYYY")}
            </Text>
          </ListItem>
          <ListItem>
            <Text>
              {this.props.tammyName} is{" "}
              {moment().diff(moment(this.props.tammyWasBornOn), "days")} day(s)
              old
            </Text>
          </ListItem>
          <ListItem>
            <Text>
              {this.props.tammyName} has taken{" "}
              {this.props.howMuchHasTammyWalked} steps
            </Text>
          </ListItem>
        </List>

        {/* <Text>
          {this.props.tammyName} has slept for{" "}
          {moment(this.props.howLongHasTammySlept).format("h:mm:ss")} minutes
        </Text> */}
        <Button
          full
          style={{
            backgroundColor: "#5067FF",
            marginTop: CONSTANTS.app_height - 600
          }}
          onPress={this.handleOnPressCloseStats}
        >
          <Text>Close stats</Text>
        </Button>
      </View>
    );
  };
}

const mapStateToProps = state => {
  return {
    tammyName: state.tammyName,
    tammyWasBornOn: state.tammyWasBornOn,
    howMuchHasTammyWalked: state.howMuchHasTammyWalked,
    howLongHasTammySlept: state.howLongHasTammySlept
  };
};

export default connect(mapStateToProps)(DisplayStats);
