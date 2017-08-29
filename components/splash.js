import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Link } from 'react-router-native';

import styles from '../styles';

export default class Splash extends React.Component {
  constructor(props){
    super(props);
    this.state = {

    };
  }

  render() {
    return(
      <View style={styles.container}>
        <View style={{height:2}}></View>
        <View style={styles.logo}>
          <Text>Logo here</Text>
        </View>
        <TouchableOpacity>
          <Link to="/main" component={TouchableOpacity} style={styles.button}>
            <Text style={styles.buttonText}>Start</Text>
          </Link>
        </TouchableOpacity>
        <TouchableOpacity>
          <Link to="/tutorial" component={TouchableOpacity} style={styles.button}>
            <Text style={styles.buttonText}>How to Play</Text>
          </Link>
        </TouchableOpacity>
      </View>
    )
  }

}
