import React from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { WebBrowser } from 'expo';

import { MonoText } from '../components/StyledText';

export default class HomeScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };

  render() {
    return (
      <View style={styles.container}>
        <Text>Crazy Driver</Text>
        <Text>
          Crazy Driver uses your phones accelerometer to measure g forces in all directions. The higher g forces achieved the higher the score.
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginTop: 30,
  }
});
