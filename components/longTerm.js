import React from "react";
import { connect } from "react-redux";
import {
  View,
  Text,
  ActivityIndicator,
  StyleSheet,
  FlatList
} from "react-native";
import { MonoText } from "./StyledText";

class LongTerm extends React.Component {
  render() {
    const { weather, isFetching, index } = this.props;

    /*
     Check if we are still fetching data or not
     If still fetching make spinner appear
    */
    if (isFetching) {
      <View>
        <ActivityIndicator size="large" />
      </View>;
    }
    // If weather data not empty then start working with data
    if (weather.length) {
      return (
        <View>
          <View style={styles.headerView}>
            <MonoText style={styles.header}>{weather[index].name}</MonoText>
          </View>
          <FlatList
            data={weather[index].forecast}
            keyExtractor={(item, key) => key.toString()}
            renderItem={({ item, key }) => (
              <MonoText style={styles.font}>
                {item.ftime} | {item.F}° | {item.W} | {item.F} m/s
              </MonoText>
            )}
          />
        </View>
      );
    }
    return <View />;
  }
}

/*
Get data from store
*/
const mapStateToProps = ({ weather }) => {
  return {
    weather: weather.results,
    isFetching: weather.isFetching,
    error: weather.error,
    index: weather.index
  };
};

const styles = StyleSheet.create({
  header: {
    fontSize: 20
  },
  font: {
    fontSize: 12.1
  },
  headerView: {
    alignItems: "center",
    marginBottom: 20
  }
});

export default connect(mapStateToProps)(LongTerm);
