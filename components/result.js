import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Link } from 'react-router-native';

import styles from '../styles';

export default class Result extends React.Component {
  constructor(props){
    super(props);
    this.state = {

    };
  }

  render() {
    return(
      <View>
        <Text>Result component</Text>
      </View>
    )
  }

}
