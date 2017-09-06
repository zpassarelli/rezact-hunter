import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';

export default class Progress extends React.Component {
  render(){
    return (
      <View style={styles.border}>
        <View style={[styles.fill,{width: 140 *(this.props.hp/this.props.maxhp)}]}></View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  border: {
    width: 144,
    height: 16,
    zIndex: 5,
    borderStyle: 'solid',
    borderColor: 'black',
    borderWidth: 2,
    borderRadius: 2,
    flexDirection: 'row'
  },
  fill: {
    height: 12,
    backgroundColor: 'lime'
  }
});
