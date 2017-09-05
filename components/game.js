import React from 'react';
import { Alert, Text, View, TouchableOpacity } from 'react-native';
import { Link, Redirect } from 'react-router-native';

import styles from '../styles';

import Info from './game_components/info';
import Enemy from './game_components/enemy';

const MAX_DMG = 25;
const PART_DMG = 15;

export default class Game extends React.Component {
  constructor(props){
    super(props);
    this.phase = 0;
    this.difficulty = Number(JSON.stringify(props.location.pathname).slice(7,-1));
    this.enemyType = (Math.floor(Math.random()*3) + 1) + (3 * (this.difficulty - 1));
    let enemyHp = 100 * this.difficulty;
    this.statusTimer = null;
    this.state = {
      info: {
        show: false,
        type: 'default'
      },
      status: {
        show: false,
        type: 'default',
        color: 'red'
      },

      action: false,

      playerType: ['player A','player B','player C','player D'],
      playerHp: 4,

      enemyHp: enemyHp,

      redirect: ''
    };
    console.log(JSON.stringify(this.state));
  }

  showInfo = (type, act) => {
    let newInfo = {
      show: true,
      type: type
    };
    this.phase = act;
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
    this.statusTimer = window.setTimeout(()=>this.setState({status:{show:false}}),4000);
  }

  advance = () => {
    if(this.phase === 0) return; //no action

    if(this.state.playerHp === 0){ //player defeat condition
      this.phase = 0;
      this.playerWin(false);
      return;
    }
    if(this.state.enemyHp === 0){ //player win condition
      this.phase = 0;
      this.playerWin(true);
      return;
    }

    if(this.phase === 1) { //player mechanic intro
      this.phase = 0;
      this.showInfo(this.state.playerType[0], 2);
      this.showStatus(this.state.playerType[0], 'white');
      return;
    }
    if(this.phase === 2) { //player action begins
      this.phase = 0;
      this.setState({action: true});
      return;
    }
    if(this.phase === 3) { //player action resolution
      this.phase = 0;
      let prevHp = this.state.enemyHp;
      this.setState({enemyHp: prevHp - 15}, ()=>this.phase = 4);
      this.showStatus('good','lime');
      return;
    }
    if(this.phase === 4) { //player defense intro
      this.phase = 0;
      this.showInfo('defend this bro', 5);
      return;
    }
    if(this.phase === 5) { //player defense resolution
      this.phase = 0;
      let prevPhp = this.state.playerHp;
      this.setState({playerHp: 4}, ()=>this.phase = 1);
      this.showStatus('NICEU','blue');
    }
  }

  playerWin = (win) => {
    if(win) {
      this.setState({redirect: '/result/win'});
    } else {
      this.setState({redirect: '/result/lose'});
    }
  }

  retreat = () => {
    Alert.alert(
      'Retreat',
      'Are you sure you want to quit?',
      [
        {text: 'Hold up', onPress: ()=>{} },
        {text: 'Yes!', onPress: ()=> this.setState({redirect: '/'})}
      ]
    )
  }

  componentWillMount() {
    this.props.changeBg(this.difficulty);
  }

  componentDidMount() {
    this.showStatus('tap to go','white');
    this.phase = 1;
  }

  componentWillUnmount() {
    clearInterval(this.statusTimer);
  }

  render() {
    if(this.state.redirect !== ''){
      return <Redirect to={this.state.redirect} />
    // } else if (this.state.redirect === 'win') {
    //   return <Redirect to='/result/win' />
    // } else if (this.state.redirect === 'lose') {
    //   return <Redirect to='/result/lose' />
    } else {
      return (
      <View style={styles.container}>

        <Info show={this.state.info.show} type={this.state.info.type} close={this.closeInfo} />

        {this.state.status.show ? (
          <Text style={[styles.statusText,{color: this.state.status.color}]}>{this.state.status.type}</Text>
        ) : null}


        <View style={{flex:2, paddingTop:30}}>

          <View style={styles.container}>
            <Text>{this.state.enemyHp + ' and ' + this.phase}</Text>
            <Enemy enemyType={this.enemyType} />
          </View>

        </View>

        <View style={{flex:2}}>

          { this.state.action ? (
            <TouchableOpacity activeOpacity={0.7} style={styles.tapArea} onLongPress={()=>this.setState({action: false}, ()=>this.phase = 3)}>
              <Text style={[styles.buttonText,{color:'aqua'}]}>Action Area</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity activeOpacity={0.7} style={styles.tapArea} onPress={()=>this.advance()}>
              <Text style={[styles.buttonText,{color:'aqua'}]}>Tap Area</Text>
            </TouchableOpacity>
          )}

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
