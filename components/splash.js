import React from 'react';
import { Text, View, TouchableOpacity, Animated } from 'react-native';
import { Link } from 'react-router-native';

import styles from '../styles';

export default class Splash extends React.Component {
  constructor(props) {
    super(props);
    this.springValue = new Animated.Value(0.5);
  }

  spring = () => {
    this.springValue.setValue(0.5);
    Animated.spring(this.springValue, {
      toValue: 1,
      friction: 1,
      tension: 30,
      useNativeDriver: true
    }).start();
  }

  componentDidMount(){
    this.spring();
  }

  render() {
    return(
      <View style={styles.container}>
        <View style={{flex:4, paddingTop:30, alignItems:'center'}}>

          <Animated.View style={[styles.logo,{transform:[{scale: this.springValue}]}]}>
            <Text style={styles.logoText}
              onPress={()=>this.spring()} >
              ReZact Hunter
            </Text>
          </Animated.View>

          <TouchableOpacity>
            <Link to="/main" component={TouchableOpacity} style={[styles.button,{height:80}]}>
              <Text style={[styles.buttonText,{fontSize:40}]}>Start</Text>
            </Link>
          </TouchableOpacity>

        </View>

        <View style={{flex:1, justifyContent:'center'}}>

          <TouchableOpacity>
            <Link to="/tutorial" component={TouchableOpacity} style={styles.button}>
              <Text style={styles.buttonText}>How to Play</Text>
            </Link>
          </TouchableOpacity>

        </View>
      </View>
    )
  }
}
