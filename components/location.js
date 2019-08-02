import React from "react";
import { Text, View, StyleSheet } from "react-native";
import { Constants, Location, Permissions } from "expo";
import Coords from "../constants/locate.json";
import { MonoText } from "./StyledText.js";

class MyLocation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      location: null,
      errorMessage: null,
      currentLocation: 0
    };
  }

  componentDidMount() {
    this.getLocationAsync();
  }

  /* 
  * Got this function from here :https://docs.expo.io/versions/latest/sdk/location
  * Get permission from OS to use location off device
  */
  getLocationAsync = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== "granted") {
      this.setState({
        errorMessage: "Permission to access location was denied"
      });
    }

    let location = await Location.getCurrentPositionAsync({});
    this.setState({ location });
  };

  // Find the weather station closest to user
  calculateLocation = () => {
    const { location, errorMessage } = this.state;
    let lat;
    let long;
    let total;
    let currShortest = 0;
    let index;
    let text = "Finding your location...";

    if (errorMessage) {
      text = errorMessage;
    } else if (location) {
      // Set this default to 100 so that total will always be lower than currShortest in first iterate
      currShortest = 100;
      // Loop through locate.json file and find nearest location
      for (i = 0; i < Coords.length; i++) {
        lat = Coords[i].latitude - location.coords.latitude;
        long = Coords[i].longitude - location.coords.longitude;
        total = lat + long;
        if (total < currShortest) {
          shortestDistance = Coords[i].name;
          currShortest = total;
          index = i;
        }
      }
      text = "Your location is: " + Coords[index].name;
    }
    return <MonoText style={styles.textStyle}> {text} </MonoText>;
  };
  render() {
    return <View style={styles.container}>{this.calculateLocation()}</View>;
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center"
  },
  paragraph: {
    fontSize: 18,
    textAlign: "center"
  },
  textStyle: {
    fontSize: 20,
    color: "white"
  }
});
export default MyLocation;
