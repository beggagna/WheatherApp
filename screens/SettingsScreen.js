import React from "react";
import { View } from "react-native";
import LongTerm from "../components/longTerm";

export default class SettingsScreen extends React.Component {
  static navigationOptions = {
    title: "Long Term Forecast"
  };

  render() {
    return (
      <View>
        <LongTerm />
      </View>
    );
  }
}
