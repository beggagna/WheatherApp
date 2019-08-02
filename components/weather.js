import React from "react";
import { connect } from "react-redux";
import { getAllWeather, getIndexPayload } from "../actions/weatherActions";
import {
  View,
  Text,
  ActivityIndicator,
  Picker,
  Button,
  StyleSheet
} from "react-native";

class Weather extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // Use this as index of array
      pickerIndex: 0,
      pickerValue: ""
    };
  }

  componentDidMount() {
    const { getAllWeather } = this.props;
    getAllWeather();
  }

  toggleDetail = () => {
    const { showMoreDetail } = this.state;
    this.setState({
      showMoreDetail: !showMoreDetail
    });
  };

  updateIndex = (itemIndex, itemValue) => {
    const { getIndexPayload } = this.props;
    this.setState({
      pickerIndex: itemIndex,
      pickerValue: itemValue
    });

    // This functions sends the index to redux Store
    getIndexPayload(itemIndex);
  };
  render() {
    const { weather, isFetching } = this.props;
    const { pickerIndex, pickerValue } = this.state;

    /*
    * Check if we are still fetching data or not.
    * If still fetching make spinner appear
    */
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
            {/* use react native "Picker" to make "dropdown list" */}
            <Picker
              style={styles.pickerStyle}
              selectedValue={pickerValue}
              onValueChange={(itemValue, itemIndex) =>
                this.updateIndex(itemIndex, itemValue)
              }
            >
              {weather.map(item => (
                <Picker.Item
                  label={item.name}
                  value={item.name}
                  key={item.id}
                />
              ))}
            </Picker>
          </View>
          <View>
            <Text style={styles.fontSize}>
              {weather[pickerIndex].forecast[0].T}°
            </Text>
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
    error: weather.error,
    index: weather.index
  };
};

const styles = StyleSheet.create({
  fontSize: {
    fontSize: 60,
    marginLeft: 75
  },
  pickerStyle: {
    width: 200,
    height: 50,
    marginTop: 50,
    marginBottom: 150
  }
});

export default connect(
  mapStateToProps,
  { getAllWeather, getIndexPayload }
)(Weather);
