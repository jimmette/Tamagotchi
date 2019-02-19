import React from "react";
import { View, StyleSheet } from "react-native";
import CONSTANTES from "./Constantes";
import StatusBar from "./StatusBar";
import { connect } from "react-redux";
import { Container } from "native-base";

const styles = StyleSheet.create({
  statusbars: {
    marginBottom: 10,
    width: CONSTANTES.statusbar_width,
    borderWidth: CONSTANTES.statusbar_border_width,
    borderRadius: CONSTANTES.statusbar_border_radius
  }
});

class StatusBarContainer extends React.Component {
  render() {
    console.log(this.props.statusPointsEat);
    return (
      <>
        <View style={styles.statusbars}>
          <StatusBar
            title="Hunger"
            color="yellow"
            points={this.props.statusPointsEat}
          />
        </View>
        <View style={styles.statusbars}>
          <StatusBar
            title="Sleep"
            color="magenta"
            points={this.props.statusPointsSleep}
          />
        </View>
        <View style={styles.statusbars}>
          <StatusBar
            title="Happiness"
            color="orange"
            points={this.props.statusPointsHappiness}
          />
        </View>
      </>
    );
  }
}

const mapStateToProps = state => {
  return {
    statusPointsEat: state.statusPointsEat,
    statusPointsSleep: state.statusPointsSleep,
    statusPointsHappiness: state.statusPointsHappiness
  };
};

export default connect(mapStateToProps)(StatusBarContainer);
