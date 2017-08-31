import React from 'react';
import { Alert, Text, View, TouchableOpacity } from 'react-native';
import { Link, Redirect } from 'react-router-native';

import styles from '../styles';

import Info from './game_components/info';

export default class Game extends React.Component {
  constructor(props){
    super(props);
    let difficulty = Number(JSON.stringify(props.location.pathname).slice(7,-1));
    this.statusTimer = null;
    this.state = {
      difficulty: difficulty,
      info: {
        show: false,
        type: 'default'
      },
      status: {
        show: false,
        type: 'default',
        color: 'red'
      },
      damage: 0,

      playerType: 0,
      playerHp: 4,

      enemyType: (Math.floor(Math.random()*3) + 1) * difficulty,
      enemyHp: 100 * difficulty,

      redirect: ''
    };
  }

  showInfo = (type) => {
    let newInfo = {
      show: true,
      type: type
    };
    this.setState({info: newInfo});
  }

  closeInfo = () => {
    this.setState({info:{show: false}});
  }

  showStatus = (type, color) => {
    clearInterval(this.statusTimer);
    let newStatus = {
      show: true,
      type: type,
      color: color
    };
    this.setState({status: newStatus},this.closeStatus());
  }

  closeStatus = () => {
    this.statusTimer = window.setTimeout(()=>this.setState({status:{show:false}}),3000);
  }

  retreat = () => {
    Alert.alert(
      'Retreat',
      'Are you sure you want to quit?',
      [
        {text: 'Hold up', onPress: ()=>{} },
        {text: 'Yes!', onPress: ()=> this.setState({redirect: 'home'})}
      ]
    )
  }

  componentWillMount() {
    this.props.changeBg(this.state.difficulty);
  }

  componentWillUnmount() {
    clearInterval(this.statusTimer);
  }

  render() {
    if(this.state.redirect === 'home'){
      return <Redirect to='/' />
    } else if (this.state.redirect === 'win') {
      return <Redirect to='/result/win' />
    } else if (this.state.redirect === 'lose') {
      return <Redirect to='/result/lose' />
    } else {
      return (
      <View style={styles.container}>

        <Info show={this.state.info.show} type={this.state.info.type} close={this.closeInfo} />
        {this.state.status.show ? (
          <Text style={[styles.statusText,{textShadowColor: this.state.status.color}]}>{this.state.status.type}</Text>
        ) : null}


        <View style={{flex:2, paddingTop:30}}>

          <View style={styles.container}>
            <Text>Field</Text>
          </View>

        </View>

        <View style={{flex:2}}>

          <TouchableOpacity activeOpacity={0.7} style={styles.tapArea}>
            <Text>Tap area</Text>
          </TouchableOpacity>

        </View>

        <View style={{flex:1, justifyContent:'center'}}>

          <TouchableOpacity style={styles.button} onPress={()=>this.retreat()}>
              <Text style={styles.buttonText}>Retreat</Text>
          </TouchableOpacity>

        </View>
      </View>
      )
    }
  }
}
