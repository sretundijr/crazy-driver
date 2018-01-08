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

import { returnAbs, accummulateScore, adjustScoreByTime } from '../components/accelDataHelper';

import math from 'mathjs';

export default class HomeScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };

  constructor(props) {
    super(props);
    this.state = {
      highScore: 0,
      adjustedScore: 0,
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

  setZeroPoint = () => {
    this.setState({
      zero: this.state.accelData,
      startTime: Date.now(),
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
      totalTime: '',
      totals: {
        x: 0,
        y: 0,
        z: 0,
      }
    });
  }

  stopTimer = () => {
    const delta = Date.now() - this.state.startTime;
    const totalTime = Math.floor(delta / 1000);
    const highScore = this.state.totals.x + this.state.totals.y + this.state.totals.z;
    this.setState({
      startTime: '',
      totalTime,
      highScore,
      adjustedScore: adjustScoreByTime(highScore, totalTime),
    });
  }

  render() {
    let { x, y, z } = this.state.accelData;
    return (
      <View style={styles.container}>
        <Accel
          accelData={this.setAccelDataScore}
          totals={this.setTotals}
        // highScore={this.setHighScore}
        />

        <Text>
          Set Phone in a secure place in your vehicle where it won't slide around or move, then press calibrate.
        </Text>
        <Button
          title='Calbrate and Start'
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
        <Button
          title='Stop'
          onPress={this.stopTimer}
        />
        <Text>Total score: {this.state.highScore}</Text>

        <Text>Total time: {this.state.totalTime}</Text>

        <Text>Total adjusted score with time factor: {this.state.adjustedScore}</Text>
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
