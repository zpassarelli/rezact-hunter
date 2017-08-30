import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { Link } from 'react-router-native';

import styles from '../styles';

export default class Splash extends React.Component {
  render() {
    return(
      <View style={styles.container}>
        <View style={{flex:4, paddingTop:30, alignItems:'center'}}>

          <View style={styles.logo}>
            <Text>Logo here</Text>
          </View>

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
