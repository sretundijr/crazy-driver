import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Accelerometer } from 'expo';

import { roundUp } from '../components/accelDataHelper';

export default class Accel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      accelerometerData: {},
    }
  }

  // componentDidMount() {
  //   this._toggle();
  // }

  // componentWillUnmount() {
  //   this._unsubscribe();
  // }

  _toggle = () => {
    if (this._subscription) {
      this._unsubscribe();
    } else {
      this._subscribe();
    }
  }

  _slow = () => {
    Accelerometer.setUpdateInterval(1000);
  }

  _fast = () => {
    Accelerometer.setUpdateInterval(500);
  }

  _subscribe = () => {
    Accelerometer.setUpdateInterval(500);
    this._subscription = Accelerometer.addListener(accelerometerData => {
      const roundedAccelData = {
        x: roundUp(accelerometerData.x),
        y: roundUp(accelerometerData.y),
        z: roundUp(accelerometerData.z),
      }
      this.props.accelData(roundedAccelData);
      this.props.totals();
    });
  }

  _unsubscribe = () => {
    this._subscription && this._subscription.remove();
    this._subscription = null;
  }

  render() {
    return (
      <View style={styles.sensor}>
        <View style={styles.buttonContainer}>
          <TouchableOpacity onPress={this._toggle} style={styles.button}>
            <Text>Toggle</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={this._slow} style={[styles.button, styles.middleButton]}>
            <Text>Slow</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={this._fast} style={styles.button}>
            <Text>Fast</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'stretch',
    marginTop: 15,
  },
  button: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#eee',
    padding: 10,
  },
  middleButton: {
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderColor: '#ccc',
  },
  sensor: {
    marginTop: 15,
    paddingHorizontal: 10,
  },
});
