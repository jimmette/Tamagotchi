import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { connect } from "react-redux";

//                    0           1         2          3          4
const gradient = [
  "#e13026",
  "#ffba00",
  "#ffff00",
  "#bfff00",
  "#49E20E",
  "#49E20E"
];

// const gradient = ['57bb8a', '63b682', '73b87e', '84bb7b', '94bd77', 'a4c073', 'b0be6e', 'c4c56d', 'd4c86a', 'e2c965', 'f5ce62', 'f3c563', 'e9b861', 'e6ad61', 'ecac67', 'e9a268', 'e79a69', 'e5926b', 'e2886c', 'e0816d', 'dd776e']

class DisplayStatus extends React.Component {
  constructor() {
    super();
  }
  render() {
    const { satietyLevel, energyLevel, joyLevel } = this.props;

    const styles = StyleSheet.create({
      status: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "flex-start",
        marginTop: 25,
        marginLeft: 10,
        marginRight: 10,
        marginBottom: 0
        // margin: "24 10 0"
      },
      statusBar: {
        //   flex: "0 0 32%",
        flex: 1,
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        marginLeft: 2,
        marginRight: 4
      },
      statusBarText: {
        fontSize: 12,
        fontWeight: "bold",
        marginTop: 0,
        marginLeft: 0,
        marginRight: 4,
        marginBottom: 0
        //   margin: "0 0 4 0"
      },
      statusBarIndicator: {
        borderWidth: 1,
        borderStyle: "solid",
        borderColor: "#707070",
        //   border: "1 solid #707070",
        borderRadius: 5,
        // display: "block",
        height: 20,
        overflow: "hidden",
        width: "100%"
      },
      hungerFill: {
        // display: "block",
        height: 20,
        backgroundColor: `${gradient[Math.floor(satietyLevel / 20)]}`,
        width: `${satietyLevel}%`
        // transition: "all ease 280ms"
      },
      energyFill: {
        // display: "block",
        height: 20,
        backgroundColor: `${gradient[Math.floor(energyLevel / 20)]}`,
        width: `${energyLevel}%`
        // transition: "all ease 280ms"
      },
      joyFill: {
        // display: "block",
        height: 20,
        backgroundColor: `${gradient[Math.floor(joyLevel / 20)]}`,
        width: `${joyLevel}%`
        // transition: "all ease 280ms"
      }
    });

    return (
      <View style={styles.status}>
        <View style={styles.statusBar}>
          <Text style={styles.statusBarText}>Hunger</Text>
          <View style={styles.statusBarIndicator}>
            <View style={styles.hungerFill} />
          </View>
        </View>
        <View style={styles.statusBar}>
          <Text style={styles.statusBarText}>Energy</Text>
          <View style={styles.statusBarIndicator}>
            <View style={styles.energyFill} />
          </View>
        </View>
        <View style={styles.statusBar}>
          <Text style={styles.statusBarText}>Joy</Text>
          <View style={styles.statusBarIndicator}>
            <View style={styles.joyFill} />
          </View>
        </View>
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    satietyLevel: state.statusPointsEat,
    energyLevel: state.statusPointsSleep,
    joyLevel: state.statusPointsHappiness
  };
};

export default connect(mapStateToProps)(DisplayStatus);
