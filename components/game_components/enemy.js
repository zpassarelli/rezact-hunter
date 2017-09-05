import React from 'react';
import { Image, Animated } from 'react-native';

import styles from '../../styles';

const MON_IMG = [
  require('../../media/mon/1.png'),
  require('../../media/mon/2.png'),
  require('../../media/mon/3.png'),
  require('../../media/mon/4.png'),
  require('../../media/mon/5.png'),
  require('../../media/mon/6.png'),
  require('../../media/mon/7.png'),
  require('../../media/mon/8.png'),
  require('../../media/mon/9.png'),
  require('../../media/mon/10.png'),
  require('../../media/mon/11.png'),
  require('../../media/mon/12.png')
]

export default class Enemy extends React.Component {
  constructor(props) {
    super(props);
    this.springValue = new Animated.Value(0.2);
  }

  spring = () => {
    this.springValue.setValue(0.2);
    Animated.spring(this.springValue, {
      toValue: 1.2,
      friction: 1,
      tension: 40,
      useNativeDriver: true
    }).start();
  }

  componentDidMount(){
    this.spring();
  }

  render() {
    return (
      <Animated.Image source={MON_IMG[this.props.enemyType - 1]} style={{transform:[{scale:this.springValue}]}}>

      </Animated.Image>
    )
  }
}
