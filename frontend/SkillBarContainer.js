import React from "react";
import { View, StyleSheet, Text } from "react-native";
import CONSTANTES from "./Constantes";
import SkillBar from "./SkillBar";
import { connect } from "react-redux";

const styles = StyleSheet.create({
  skillbars: {
    marginBottom: 10,
    width: CONSTANTES.skillbar_width,
    borderWidth: CONSTANTES.skillbar_border_width,
    borderRadius: CONSTANTES.skillbar_border_radius
  }
});

class SkillBarContainer extends React.Component {
  render() {
    return (
      <>
        <View style={styles.skillbars}>
          <SkillBar
            title="Hunger"
            color="yellow"
            points={this.props.skillPointsEat}
          />
        </View>
        <View style={styles.skillbars}>
          <SkillBar
            title="Sleep"
            color="magenta"
            points={this.props.skillPointsSleep}
          />
        </View>
        <View style={styles.skillbars}>
          <SkillBar
            title="Play"
            color="orange"
            points={this.props.skillPointsPlay}
          />
        </View>
      </>
    );
  }
}

const mapStateToProps = state => {
  return {
    skillPointsEat: state.skillPointsEat,
    skillPointsSleep: state.skillPointsSleep,
    skillPointsPlay: state.skillPointsPlay
  };
};

const mapDispatchToProps = dispatch => {
  return {};
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SkillBarContainer);
