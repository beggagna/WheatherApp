import React from "react";
import Weather from "../components/weather";
import Details from "../components/weatherDetails";
import Icon from "../components/weatherIcon";
import Location from "../components/location";

import { StyleSheet, View, ImageBackground } from "react-native";

export default class HomeScreen extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <ImageBackground
          source={require("../images/weatherBackground.jpg")}
          style={{ width: "100%", height: "100%" }}
        >
          <View>
            <Location />
          </View>
          <View style={styles.weather}>
            <Weather />
            <View style={styles.icon}>
              <Icon />
            </View>
            <Details />
          </View>
        </ImageBackground>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },

  location: {
    alignItems: "center",
    justifyContent: "flex-start"
  },

  weather: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start"
  },
  icon: { marginRight: 20 }
});
