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

import { returnAbs } from '../components/accelDataHelper';

import math from 'mathjs';

export default class HomeScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };

  state = {
    accelData: {},
    totalX: 0,
    totalY: 0,
    totalZ: 0,
  }

  setAccelDataScore = (accelObj) => {
    this.setState({
      accelData: accelObj,
    })
  }

  setTotals = (gForce) => {
    this.setState((previousState) => {
      return {
        totalX: math.eval(previousState.totalX + returnAbs(gForce.x)),
        totalY: math.eval(previousState.totalY + returnAbs(gForce.y)),
        totalZ: math.eval(previousState.totalZ + returnAbs(gForce.z)),
      }
    });
  }

  clearValues = () => {
    this.setState({
      totalX: 0,
      totalY: 0,
      totalZ: 0,
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

        < Text > parent x: {x} y: {y} z: {z}</Text>

        <Text> high value for x: {this.state.totalX} </Text>
        <Text>High value for y: {this.state.totalY}</Text>
        <Text>High value for z: {this.state.totalZ}</Text>
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
