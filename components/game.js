import React from 'react';
import { Alert, Text, View, TouchableOpacity } from 'react-native';
import { Link, Redirect } from 'react-router-native';

import styles from '../styles';

import Info from './game_components/info';
import Progress from './game_components/progress';
import Mech from './game_components/mech';
import Player from './game_components/player';
import Enemy from './game_components/enemy';

const MAX_DMG = 25;
const PART_DMG = 15;

const CHARS = ['Knight', 'Archer', 'Mage', 'Spearman'];

export default class Game extends React.Component {
  constructor(props){
    super(props);

    this.phase = 0;
    this.currentPlayer = 0;

    this.difficulty = Number(JSON.stringify(props.location.pathname).slice(7,-1));

    let type = [0,1,2,3];
    for(let swap, temp, i = type.length - 1; i; i--){
      swap = parseInt(Math.random()*i);
      temp = type[i];
      type[i] = type[swap];
      type[swap] = temp;
    }

    this.enemyType = (parseInt(Math.random()*3) + 1) + (3 * (this.difficulty - 1));
    if(this.difficulty === 5) this.enemyType = 13;
    this.enemyHp = 100 * this.difficulty;

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

      action: '',

      playerHp: 4,
      enemyHp: this.enemyHp,

      playerType: [CHARS[type[0]],CHARS[type[1]],CHARS[type[2]],CHARS[type[3]]],

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
    let newStatus = {
      show: true,
      type: type,
      color: color
    };
    this.setState({status: newStatus});
  }

  closeStatus = () => {
    this.setState({status:{show:false}});
  }

  toggleMech = (mech) => {
    this.setState({action: mech})
  }

  dealDamage = (grade) => {
    let damage = 0;
    if(grade === 'great'){
      damage = MAX_DMG;
    }
    else if(grade === 'good'){
      damage = PART_DMG;
    }

    if(damage > this.state.enemyHp){
      damage = this.state.enemyHp;
    }

    this.setState({enemyHp: this.state.enemyHp - damage});
  }

  takeDamage = (grade) => {
    let damage = 0;
    let playerArr = this.state.playerType;
    if(grade === 'fail'){
      damage = 1;
      playerArr = playerArr.slice(0,-1);
    }
    if(this.difficulty === 5){
      damage = 4;
      playerArr = [];
    }

    this.setState({
        playerHp: this.state.playerHp - damage,
        playerType: playerArr
      });
  }

  advance = (detail) => {
    if(this.phase === 0) return; //no action
    this.closeStatus();
    if(this.state.playerHp === 0){ //player defeat condition
      this.phase = 0;

      this.playerWin(false);
      return;
    }
    if(this.state.enemyHp <= 0){ //player win condition
      this.phase = 0;

      this.playerWin(true);
      return;
    }

    if(this.phase === 1) { //player mechanic intro
      this.phase = 0;

      this.requestAnim('player','attack',this.currentPlayer);
      this.showInfo(this.state.playerType[this.currentPlayer]);
      this.showStatus('go, '+ this.state.playerType[this.currentPlayer], 'white');

      this.phase = 2;
      return;
    }
    if(this.phase === 2) { //player action begins
      this.phase = 0;

      this.toggleMech(this.state.playerType[this.currentPlayer]);

      this.phase = 3;
      return;
    }
    if(this.phase === 3) { //player action resolution
      this.phase = 0;

      this.toggleMech('');
      this.dealDamage(detail);
      this.requestAnim('enemy','dmg');
      this.requestAnim('player','unattack',this.currentPlayer);
      if(detail === 'good'){
        this.showStatus('good!','skyblue');
      }
      else if (detail === 'great'){
        this.showStatus('great!!','lime');
      }
      else if (detail === 'miss'){
        this.showStatus('miss', 'grey');
      }

      this.currentPlayer++;
      if(this.currentPlayer + 1 > this.state.playerHp){
        this.phase = 4;
      } else {
        this.phase = 1;
      }
      return;
    }
    if(this.phase === 4) { //player defense intro
      this.phase = 0;

      this.showStatus('incoming..','red');
      if(this.difficulty === 5){
        this.showInfo('Chicken Defense');
      } else {
        this.showInfo('Defense');
      }

      this.phase = 5;
      return;
    }
    if(this.phase === 5) { //player defense begins
      this.phase = 0;

      this.toggleMech('Defense');

      this.phase = 6;
      return;
    }
    if(this.phase === 6) { //player defense resolution
      this.phase = 0;

      this.toggleMech('');
      this.takeDamage(detail);
      this.requestAnim('enemy','attack');
      if(this.difficulty === 5){
        this.showStatus('braawwk!!','red');
      }
      else if (detail === 'perfect'){
        this.showStatus('perfect defense!','gold');
      }
      else if (detail === 'fail'){
        this.showStatus('oh no', 'red');
      }

      this.currentPlayer = 0;
      this.phase = 1;
      return;
    }
  }

  requestAnim = (who, type, playerNum) => {
    if(who === 'player'){
      let newAnim = ['','','',''];
      newAnim[playerNum] = type;
      return this.setState({playerAnim: newAnim});
    }
    else if(who === 'enemy'){
      return this.setState({enemyAnim: type});
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
    this.showStatus('dangerous!','red');
    this.phase = 1;
  }

  componentWillUnmount() {

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
              <Enemy enemyType={this.enemyType} enemyAnim={this.state.enemyAnim} playerInd={this.currentPlayer - 1} requestAnim={this.requestAnim} />
            </View>

        </View>

        <View style={{flex:4}}>

          <Info show={this.state.info.show} type={this.state.info.type} close={this.closeInfo} />

          { this.state.action != '' ? (

            <Mech type={this.state.action} difficulty={this.difficulty} advance={this.advance} />

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
