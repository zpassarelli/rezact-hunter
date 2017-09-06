import React from 'react';
import { Alert, Text, View, TouchableOpacity } from 'react-native';
import { Link, Redirect } from 'react-router-native';

import styles from '../styles';

import Info from './game_components/info';
import Progress from './game_components/progress';
import Player from './game_components/player';
import Enemy from './game_components/enemy';

const MAX_DMG = 25;
const PART_DMG = 15;

export default class Game extends React.Component {
  constructor(props){
    super(props);
    this.phase = 0;
    this.currentPlayer = 0;
    this.difficulty = Number(JSON.stringify(props.location.pathname).slice(7,-1));
    this.enemyType = (Math.floor(Math.random()*3) + 1) + (3 * (this.difficulty - 1));
    this.enemyHp = 100 * this.difficulty;
    // this.statusTimer = null;
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

      playerHp: 4,
      enemyHp: this.enemyHp,

      playerType: ['player A','player B','player C','player D'],

      playerAnim: ['','','',''],
      enemyAnim: '',

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
    this.setState({status: newStatus});
  }

  closeStatus = () => {
    // this.statusTimer = window.setTimeout(()=>this.setState({status:{show:false}}),4000);
    this.setState({status:{show:false}});
  }

  advance = () => {
    if(this.phase === 0) return; //no action
    this.closeStatus();
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
      this.showInfo(this.state.playerType[this.currentPlayer]);
      this.showStatus('go, '+ this.state.playerType[this.currentPlayer], 'white');
      this.requestAnim('player','attack',this.currentPlayer);
      this.phase = 2;
      return;
    }
    if(this.phase === 2) { //player action begins
      this.phase = 0;
      this.setState({action: true});
      this.phase = 3;
      return;
    }
    if(this.phase === 3) { //player action resolution
      this.phase = 0;
      this.requestAnim('enemy','dmg');
      //this.dealDamage();
      this.setState(prevState => {
        return {enemyHp: prevState.enemyHp - PART_DMG};
      });
      this.showStatus('dmg','white');
      this.requestAnim('player','unattack',this.currentPlayer);
      this.currentPlayer++;
      if(this.currentPlayer + 1 > this.state.playerHp){
        this.currentPlayer = 0;
        this.phase = 4;
      } else {
        this.phase = 1;
      }
      return;
    }
    if(this.phase === 4) { //player defense intro
      this.phase = 0;
      this.showStatus('incoming','red');
      this.showInfo('defend this bro');
      this.phase = 5;
      return;
    }
    if(this.phase === 5) { //player defense begins
      this.phase = 0;
      this.setState({action: true});
      this.phase = 6;
      return;
    }
    if(this.phase === 6) { //player defense resolution
      this.phase = 0;
      this.requestAnim('enemy','attack');
      //this.takeDamage();
      this.setState(prevState => {
        return {
          playerHp: prevState.playerHp - 1,
          playerType: prevState.playerType.slice(0,-1)
        };
      });

      this.showStatus('took dmg','white');
      this.phase = 1;
      return;
    }
  }

  requestAnim = (who, type, playerNum) => {
    if(who === 'player'){
      let newAnim = ['','','',''];
      newAnim[playerNum] = type;
      this.setState({playerAnim: newAnim});
    }
    else if(who === 'enemy'){
      this.setState({enemyAnim: type});
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
    this.showStatus('danger!','red');
    this.phase = 1;
  }

  componentWillUnmount() {
    // clearInterval(this.statusTimer);
  }

  render() {
    if(this.state.redirect !== ''){
      return <Redirect to={this.state.redirect} />
    } else {
      return (
      <View style={styles.container}>

        {this.state.status.show ? (
          <Text style={[styles.statusText,{color: this.state.status.color}]}>{this.state.status.type}</Text>
        ) : null}

        <View style={[styles.field,{flex:1, paddingTop: 80}]}>

            <Progress hp={this.state.playerHp} maxhp={4} />
            <Progress hp={this.state.enemyHp} maxhp={this.enemyHp} />

        </View>

        <View style={[styles.field,{flex:3}]}>

            <View style={{flex:1, flexWrap: 'wrap', alignSelf: 'flex-start', marginLeft: 10}}>
              {this.state.playerType.map((player, ind) => <Player key={ind} playerType={player} playerInd={ind} playerAnim={this.state.playerAnim[ind]} requestAnim={this.requestAnim} /> )}
            </View>

            <View style={{flex:1, alignItems: 'center', justifyContent: 'center'}}>
              <Enemy enemyType={this.enemyType} enemyAnim={this.state.enemyAnim} requestAnim={this.requestAnim} />
            </View>

        </View>

        <View style={{flex:4}}>

          <Info show={this.state.info.show} type={this.state.info.type} close={this.closeInfo} />

          { this.state.action ? (
            <TouchableOpacity
              activeOpacity={0.7}
              style={styles.tapArea}
              onPress={()=>this.setState({action: false})} >

            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              activeOpacity={0.7}
              style={styles.tapArea}
              onPress={()=>this.advance()} >
              <Text style={[styles.buttonText,{color:'aqua'}]}>tap to continue</Text>
            </TouchableOpacity>
          )}

        </View>

        <View style={{flex:2, justifyContent:'center'}}>

          <TouchableOpacity style={styles.button} onPress={()=>this.retreat()}>
              <Text style={styles.buttonText}>Retreat</Text>
          </TouchableOpacity>

        </View>
      </View>
      )
    }
  }
}
