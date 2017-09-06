import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';

export default class Progress extends React.Component {
  constructor(props){
    super(props);
    this.timer = null;
    this.state = {
      dmg: 0
    }
  }

  componentWillReceiveProps(nextProps){
    this.setState({dmg: 140 * ( (this.props.hp - nextProps.hp) / this.props.maxhp)});
  }

  render(){
    return (
      <View style={styles.border}>
        <View style={[styles.fill,{width: 140 *(this.props.hp/this.props.maxhp)}]}></View>
        <View style={[styles.dmg,{width: this.state.dmg}]}></View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  border: {
    width: 144,
    height: 16,
    backgroundColor: 'rgba(0,0,0,0.5)',
    borderStyle: 'solid',
    borderColor: 'black',
    borderWidth: 2,
    borderRadius: 2,
    flexDirection: 'row'
  },
  fill: {
    height: 12,
    backgroundColor: 'lime'
  },
  dmg: {
    height: 12,
    backgroundColor: 'red'
  }
});
