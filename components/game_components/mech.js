import React, { Component } from 'react';
import { StyleSheet, Animated, View, Text, TouchableOpacity } from 'react-native';

import styles from '../../styles';

export default class Mech extends React.Component {
  constructor(props){
    super(props);

  }

  componentDidMount(){

  }

  doSomething = () => {
    if(this.props.type[0] === 'd'){
      this.props.advance('perfect');
    } else {
      this.props.advance('good');
    }
  }

  render(){
    return(
      <View style={styles.container}>

        <TouchableOpacity
          activeOpacity={0.7}
          style={styles.tapArea}
          onPress={()=>this.doSomething()}>
            <Text>{this.props.type}</Text>
        </TouchableOpacity>
      </View>
    )
  }
}

const mechStyles = StyleSheet.create({

});
