import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Link } from 'react-router-native';

import styles from '../styles';

export default class Game extends React.Component {
  constructor(props){
    super(props);
    this.state = {

    };
  }

  onComponentDidMount(){
    console.log('hi')
  }

  render() {
    return(
      <View>
        <Text>Game component</Text>
      </View>
    )
  }

}
