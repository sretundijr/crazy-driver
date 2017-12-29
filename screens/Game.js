import React from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Button,
} from 'react-native';
import { WebBrowser } from 'expo';

import { MonoText } from '../components/StyledText';

import Accel from '../components/accel';

import { returnAbs, accummulateScore } from '../components/accelDataHelper';

import math from 'mathjs';

export default class HomeScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };

  constructor(props) {
    super(props);
    this.state = {
      accelData: {},
      zero: {},
      totals: {
        x: 0,
        y: 0,
        z: 0,
      },
    }
  }

  setZeroPoint = () => {
    this.setState({
      zero: this.state.accelData,
    });
  }

  setAccelDataScore = (accelObj) => {
    this.setState({
      accelData: returnAbs(accelObj),
    });
  }

  setTotals = () => {
    this.setState((previousState) => {
      return {
        totals: accummulateScore(this.state.accelData, this.state.zero, previousState.totals),
      }
    });
  }

  clearValues = () => {
    this.setState({
      totals: {
        x: 0,
        y: 0,
        z: 0,
      }
    });
  }

  render() {
    let { x, y, z } = this.state.accelData;
    return (
      <View style={styles.container}>
        <Accel
          accelData={this.setAccelDataScore}
          totals={this.setTotals}
        />

        <Text>
          Set Phone down on a flat surface and press the set zero button to calibrate the phones accelerometer.
        </Text>
        <Button
          title='Calbrate'
          onPress={this.setZeroPoint}
        />
        <Text> Calbrated zero points X: {this.state.zero.x} Y: {this.state.zero.y} Z: {this.state.zero.z}</Text>

        < Text > parent x: {x} y: {y} z: {z}</Text>

        <Text> high value for x: {this.state.totals.x} </Text>
        <Text>High value for y: {this.state.totals.y}</Text>
        <Text>High value for z: {this.state.totals.z}</Text>
        <Button
          title='Clear'
          onPress={this.clearValues}
        />
      </View >
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginTop: 30,
  }
});