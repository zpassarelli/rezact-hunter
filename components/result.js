import React from 'react';
import { Text, View, TouchableOpacity, Animated } from 'react-native';
import { Link } from 'react-router-native';

import styles from '../styles';

export default class Result extends React.Component {
  constructor(props){
    super(props);
    this.result = JSON.stringify(props.location.pathname).slice(9,-1);
    this.resultText = 'Victory!';
    if(this.result != 'win') this.resultText = 'Defeat.';
    this.resultColor = 'lime';
    if(this.result != 'win') this.resultColor = 'crimson';

    this.springValue = new Animated.Value(0.5);
  }

  spring = () => {
    this.springValue.setValue(0.5);
    Animated.spring(this.springValue, {
      toValue: 1,
      friction: 5,
      tension: 30,
      useNativeDriver: true
    }).start();
  }

  componentDidMount () {
    this.spring();
  }

  render() {
    return(
      <View style={styles.container}>
        <View style={{flex:4, paddingTop:30, alignItems:'center'}}>

          <Animated.View style={[styles.logo,{transform:[{scale: this.springValue}]}]}>
            <Text style={[styles.logoText,{color: this.resultColor}]}>
              {this.resultText}
            </Text>
          </Animated.View>

          <View style={[styles.button,{height:100}]}>
            {this.result != 'win' ? (
              <Text style={[styles.buttonText,{textAlign:'center'}]}>Your party was defeated.</Text>
            ) : (
              <Text style={[styles.buttonText,{textAlign:'center'}]}>The monster is defeated.</Text>
            )}
          </View>

        </View>

        <View style={{flex:1, justifyContent:'center'}}>

          <TouchableOpacity>
            <Link to="/" replace component={TouchableOpacity} style={styles.button}>
              <Text style={styles.buttonText}>Main Menu</Text>
            </Link>
          </TouchableOpacity>

        </View>
      </View>
    )
  }
}
