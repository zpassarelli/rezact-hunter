import React from 'react';
import { Image, Animated } from 'react-native';

import styles from '../../styles';

const PLA_IMG = {
    Knight: require('../../media/pc/1.png'),
    Archer: require('../../media/pc/2.png'),
    Mage: require('../../media/pc/3.png'),
    Spearman: require('../../media/pc/4.png')
  };
const PLATK_IMG = {
  Knight: require('../../media/pc/1a.png'),
  Archer: require('../../media/pc/2a.png'),
  Mage: require('../../media/pc/3a.png'),
  Spearman: require('../../media/pc/4a.png')
  };

export default class Player extends React.Component {
  constructor(props) {
    super(props);
    this.moveValue = new Animated.Value(0);
    this.scaleValue = new Animated.Value(1);
    this.targetValue = 130;
    if(props.playerInd == 2 || props.playerInd == 3){
      this.targetValue = 60;
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
    ]).start(()=>{
      this.props.requestAnim('player','',this.props.playerInd);
      this.attk = true;
    });
  }

  unattack = () => {
    this.attk = false;
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
        source={this.attk? PLATK_IMG[this.props.playerType] : PLA_IMG[this.props.playerType] }
        style={{transform:[{translateX:this.moveValue},{scale:this.scaleValue}]}}
      >
      </Animated.Image>
    )
  }
}
