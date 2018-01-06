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
      highScore: 0,
      accelData: {},
      zero: {},
      totals: {
        x: 0,
        y: 0,
        z: 0,
      },
      startTime: '',
      totalTime: '',
    }
  }

  setHighScore = () => {
    this.setState({
      highScore: this.state.totals.x + this.state.totals.y + this.state.totals.z,
    })
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
      highScore: 0,
      totals: {
        x: 0,
        y: 0,
        z: 0,
      }
    });
  }

  startTimer = () => {
    this.setState({
      startTime: Date.now(),
    });
  }

  stopTimer = () => {
    const delta = Date.now() - this.state.startTime;
    this.setState({
      startTime: '',
      totalTime: Math.floor(delta / 1000),
    });
  }

  render() {
    let { x, y, z } = this.state.accelData;
    return (
      <View style={styles.container}>
        <Accel
          accelData={this.setAccelDataScore}
          totals={this.setTotals}
          highScore={this.setHighScore}
        />

        <Text>
          Set Phone in a secure place in your vehicle where it won't slide around or move, then press calibrate.
        </Text>
        <Button
          title='Calbrate'
          onPress={this.setZeroPoint}
        />
        <Text> Calbrated zero points X: {this.state.zero.x} Y: {this.state.zero.y} Z: {this.state.zero.z}</Text>

        <Button
          title='Start'
          onPress={this.startTimer}
        />

        < Text > parent x: {x} y: {y} z: {z}</Text>

        <Text> high value for x: {this.state.totals.x} </Text>
        <Text>High value for y: {this.state.totals.y}</Text>
        <Text>High value for z: {this.state.totals.z}</Text>
        <Button
          title='Clear'
          onPress={this.clearValues}
        />

        <Text>Total score: {this.state.highScore}</Text>
        <Button
          title='Stop'
          onPress={this.stopTimer}
        />
        <Text>Total time: {this.state.totalTime}</Text>
      </View >
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginTop: 30,
    marginLeft: 20,
    marginRight: 20,
  }
});
