import React from "react";
import { Banner, Image, View, StyleSheet } from "react-native";

class imageBanner extends React.Component {
  render() {
    return (
      <View>
        <Image
          style={styles.image}
          source={{
            uri:
              "https://birchtree.me/wp-content/uploads/2017/08/Twitter-Card.png"
          }}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  image: {
    width: 300,
    height: 80,
    borderRadius: 32,
    opacity: 0.6
  }
});

export default imageBanner;
