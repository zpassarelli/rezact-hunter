import React from 'react';
import { Image, Animated } from 'react-native';

import styles from '../../styles';

const PLA_IMG = require('../../media/pc/1.png');

export default class Player extends React.Component {
  constructor(props) {
    super(props);
    this.moveValue = new Animated.Value(0);
    this.scaleValue = new Animated.Value(1);
    this.targetValue = 120;
    if(props.playerInd == 2 || props.playerInd == 3){
      this.targetValue = 50;
    }

  }

  attack = () => {
    this.moveValue.setValue(0);
    this.scaleValue.setValue(1);
    Animated.parallel([
      Animated.timing(this.moveValue, {
        toValue: this.targetValue,
        useNativeDriver: true
      }),
      Animated.timing(this.scaleValue, {
        toValue: 1.5,
        useNativeDriver: true
      })
    ]).start(()=>this.props.requestAnim('player','',this.props.playerInd));
  }

  unattack = () => {
    this.moveValue.setValue(this.targetValue);
    this.scaleValue.setValue(1.5);
    Animated.parallel([
      Animated.timing(this.moveValue, {
        toValue: 0,
        useNativeDriver: true
      }),
      Animated.timing(this.scaleValue, {
        toValue: 1,
        useNativeDriver: true
      })
    ]).start(()=>this.props.requestAnim('player','',this.props.playerInd));
  }

  componentDidUpdate() {
    if(this.props.playerAnim === 'attack'){
      this.attack();
    }
    else if (this.props.playerAnim === 'unattack'){
      this.unattack();
    }
  }

  render() {
    return (
      <Animated.Image
        source={PLA_IMG}
        style={{transform:[{translateX:this.moveValue},{scale:this.scaleValue}]}}
      >
      </Animated.Image>
    )
  }
}
