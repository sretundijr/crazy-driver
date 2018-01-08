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

import { MonoText } from '../components/StyledText';

import Accel from '../components/accel';

import { returnAbs, accummulateScore, adjustScoreByTime } from '../components/accelDataHelper';

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
      adjustedScore: 0,
      totalTime: 0,
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
      <ScrollView>
        <View style={styles.container}>
          <Accel
            accelData={this.setAccelDataScore}
            totals={this.setTotals}
          />

          <Text style={styles.textValues}>
            Set Phone in a secure place in your vehicle where it won't slide around or move, then press calibrate.
        </Text>
          <Button
            title='Calbrate and Start'
            onPress={this.setZeroPoint}
          />
          <Text style={styles.textValues}>Calbrated zero points:</Text>
          <Text style={styles.rawValues}>X: {this.state.zero.x}</Text>
          <Text style={styles.rawValues}>Y: {this.state.zero.y}</Text>
          <Text style={styles.rawValues}>Z: {this.state.zero.z}</Text>

          <Text style={styles.textValues}>Instant Values:</Text>
          <Text style={styles.rawValues}>X: {x}</Text>
          <Text style={styles.rawValues}>Y: {y}</Text>
          <Text style={styles.rawValues}>Z: {z}</Text>

          <Text style={styles.textValues}>Current Highs for each coordinate:</Text>
          <Text style={styles.rawValues}>X: {this.state.totals.x} </Text>
          <Text style={styles.rawValues}>Y: {this.state.totals.y}</Text>
          <Text style={styles.rawValues}>Z: {this.state.totals.z}</Text>
          <Button
            title='Clear'
            onPress={this.clearValues}
          />
          <Button
            title='Stop'
            onPress={this.stopTimer}
          />
          <Text style={styles.textValues}>Total score: {this.state.highScore}</Text>

          <Text style={styles.textValues}>Total time: {this.state.totalTime}</Text>

          <Text style={styles.textValues}>Total adjusted score with time factor: {this.state.adjustedScore}</Text>
        </View >
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    marginLeft: 20,
    marginRight: 20,
  },
  rawValues: {
    fontSize: 25,
  },
  textValues: {
    fontSize: 15,
  }
});
