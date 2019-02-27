import React from "react";
import { connect } from "react-redux";
import { View, Text, Button, H1 } from "native-base";
import moment from "moment";
import CONSTANTS from "../Constants";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  text_container: {
    marginTop: 10,
    marginLeft: 10,
    marginRight: 10
  }
});

class DisplayStats extends React.Component {
  handleOnPressCloseStats = () => {
    this.props.dispatch({ type: "CURRENT_PAGE", payload: CONSTANTS.homepage });
  };
  render = () => {
    return (
      <View>
        <H1 style={{ textAlign: "center", marginBottom: 50 }}>Statistics</H1>
        <Text style={styles.text_container}>
          {this.props.tammyName} was born on{" "}
          {moment(this.props.tammyWasBornOn).format("MMMM Do YYYY")}
        </Text>
        <Text style={styles.text_container}>
          {this.props.tammyName} is{" "}
          {moment().diff(moment(this.props.tammyWasBornOn), "days")} day(s) old
        </Text>
        <Text style={styles.text_container}>
          {this.props.tammyName} has taken {this.props.howMuchHasTammyWalked}{" "}
          steps
        </Text>
        {/* <Text>
          {this.props.tammyName} has slept for{" "}
          {moment(this.props.howLongHasTammySlept).format("h:mm:ss")} minutes
        </Text> */}
        <Button
          full
          style={{
            backgroundColor: "#5067FF",
            marginTop: CONSTANTS.app_height - 351
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
