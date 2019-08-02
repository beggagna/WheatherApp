import React from "react";
import { connect } from "react-redux";
import { View, ActivityIndicator, Image, StyleSheet } from "react-native";

class WeatherIcon extends React.Component {
  renderIcon = () => {
    const { weather, index } = this.props;
    let weatherDescription = weather[index].forecast[0].W.toLowerCase();
    if (weatherDescription.includes("rain")) {
      return (
        <Image
          style={styles.iconSize}
          source={require("../images/ModRain.png")}
        />
      );
    } else if (weatherDescription.includes("clear")) {
      return (
        <Image
          style={styles.iconSize}
          source={require("../images/Sunny.png")}
        />
      );
    } else if (
      weatherDescription.includes("overcast") ||
      weatherDescription === "cloudy"
    ) {
      return (
        <Image
          style={styles.iconSize}
          source={require("../images/Cloudy.png")}
        />
      );
    } else if (weatherDescription.includes("partly cloudy")) {
      return (
        <Image
          style={styles.iconSize}
          source={require("../images/PartlyCloudyDay.png")}
        />
      );
    } else if (weatherDescription.includes("snow")) {
      return (
        <Image
          style={styles.iconSize}
          source={require("../images/HeavySnow.png")}
        />
      );
    }
  };

  render() {
    const { weather, isFetching } = this.props;

    if (isFetching) {
      <View>
        <ActivityIndicator size="large" />
      </View>;
    }
    if (weather.length) {
      return <View>{this.renderIcon()}</View>;
    }
    return <View />;
  }
}
const mapStateToProps = ({ weather }) => {
  return {
    weather: weather.results,
    isFetching: weather.isFetching,
    index: weather.index
  };
};

const styles = StyleSheet.create({
  iconSize: {
    width: 100,
    height: 100
  }
});

export default connect(mapStateToProps)(WeatherIcon);
