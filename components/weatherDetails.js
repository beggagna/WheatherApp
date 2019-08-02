import React from "react";
import { connect } from "react-redux";
import {
  View,
  Text,
  Button,
  StyleSheet,
  ActivityIndicator
} from "react-native";

class WeatherDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showMoreDetail: false,
      buttonText: false
    };
  }

  toggleDetail = () => {
    const { showMoreDetail, buttonText } = this.state;
    this.setState({
      showMoreDetail: !showMoreDetail,
      buttonText: !buttonText
    });
  };

  weatherDetail = () => {
    const { showMoreDetail } = this.state;
    const { weather, index } = this.props;
    if (showMoreDetail) {
      return (
        <View>
          <Text style={styles.font}>
            Weather description: {weather[index].forecast[0].W}
          </Text>
          <Text style={styles.font}>
            Wind speed: {weather[index].forecast[0].F} m/s.
          </Text>
          <Text style={styles.font}>
            Wind direction: {weather[index].forecast[0].D}
          </Text>
          <Text style={styles.font}>
            Cloud cover: {weather[index].forecast[0].N}%
          </Text>
        </View>
      );
    }
  };

  render() {
    const { weather, isFetching } = this.props;
    const { buttonText } = this.state;
    let btext;
    if (buttonText) {
      btext = "Hide Weather Details";
    } else {
      btext = "Show More Weather Details";
    }
    // Check if we are still fetching data or not
    // If still fetching make spinner appear
    if (isFetching) {
      <View>
        <ActivityIndicator size="large" />
      </View>;
    }
    // If weather array not empty then start working with data
    if (weather.length) {
      return (
        <View>
          <View>
            <Button title={btext} onPress={this.toggleDetail} color={"white"} />
            {this.weatherDetail()}
          </View>
        </View>
      );
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
  font: {
    fontSize: 20
  }
});

export default connect(mapStateToProps)(WeatherDetails);
