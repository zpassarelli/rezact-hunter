import React, { Component } from 'react';
import { StyleSheet, Animated, Easing, Text, View, PanResponder } from 'react-native';

import styles from '../../styles';

const SPELL = ['HORI','VERT','LYDIA','RADIA'];

export default class Mech extends React.Component {
  constructor(props){
    super(props);
    this.moveValue = new Animated.Value(0);
    this.touchValue = 0;
    this.slashValue = 0;
    this.capture = 0;
    this.state = {
      progress: 0
    }
  }

  assessment = () => {
    let result;
    switch(this.props.type){
      case 'Defense':
        if(this.capture + 10 <= this.shieldLoc + 19 && this.capture + 10 >= this.shieldLoc - 19){
          result = 'perfect';
        } else {
          result = 'fail';
        }
        break;
      case 'Knight':
        if(this.slashValue >= 200){
          result = 'great';
        }
        else if(this.slashValue >= 120){
          result = 'good';
        } else {
          result = 'miss';
        }
        break;
      case 'Archer':
        if(this.capture + 10 >= 150 && this.capture + 10 <= 180){
          result = 'great';
        }
        else if(this.capture + 10 >= 140){
          result = 'good';
        } else {
          result = 'miss';
        }
        break;
      case 'Mage':
        if(this.pattern.length === 0){
          result = 'great';
        }
        else if(this.pattern.length < this.props.difficulty + 1){
          result = 'good';
        } else {
          result = 'miss';
        }
        break;
      case 'Spearman':
        if(this.touchValue >= 200){
          result = 'great';
        }
        else if(this.touchValue >= 120){
          result = 'good';
        } else {
          result = 'miss';
        }
        break;
      default:
        result = ''
    }
    this.props.advance(result);
  }

  updateProgress(val){
    this.setState({progress: val });
  }

  componentWillMount(){
    if(this.props.type === 'Mage'){
      this.pattern = [];
      for(let i = 0; i < (1 + (2 * this.props.difficulty)); i++){
        this.pattern[i] = parseInt(Math.random()*4);
      }
    }
    if(this.props.type === 'Defense'){
      this.shieldLoc = parseInt(Math.random()*200) - 19;
    }

    this.panResponder = PanResponder.create({
      onStartShouldSetPanResponder: (evt, gestureState) => true,
      onMoveShouldSetPanResponder: (evt, gestureState) => true,

      onPanResponderGrant: (evt, gestureState) => {
        if(this.props.type === 'Spearman') {
          this.touchValue += 25 / this.props.difficulty;
          this.updateProgress(this.touchValue);
        }
        else if(this.props.type === 'Archer' || this.props.type === 'Defense') {
          this.moveValue.stopAnimation();
          this.assessment();
        }

      },
      onPanResponderRelease: (evt, gestureState) => {
        if(this.props.type === 'Mage' && this.pattern.length){
          let dx = gestureState.dx;
          let dy = gestureState.dy;
          if(Math.abs(dx) > 90 && Math.abs(dy) < 40){ //hori
            if(this.pattern[0] === 0){
              this.pattern.shift();
            }
          }
          else if(Math.abs(dy) > 90 && Math.abs(dx) < 40){ //vert
            if(this.pattern[0] === 1){
              this.pattern.shift();
            }
          }
          else if((dx/dy) > 0 && Math.abs(dx) > 50 && Math.abs(dy) > 50){ //lydia
            if(this.pattern[0] === 2){
              this.pattern.shift();
            }
          }
          else if((dx/dy) < 0 && Math.abs(dx) > 50 && Math.abs(dy) > 50){ //radia
            if(this.pattern[0] === 3){
              this.pattern.shift();
            }
          }
        }
        else if(this.props.type === 'Knight') {
          if(Math.abs(gestureState.dx) > 100){
            this.slashValue += 30 / this.props.difficulty;
            this.updateProgress(this.slashValue);
          }
        }
      },

      onPanResponderTerminationRequest: (evt, gestureState) => true
    });
  }

  componentDidMount(){
    switch (this.props.type) {
      case 'Defense':
        this.slider();
        break;
      case 'Knight':
        this.timer();
        break;
      case 'Archer':
        this.charge();
        break;
      case 'Mage':
        this.timer();
        break;
      case 'Spearman':
        this.timer();
        break;
      default:
    }
  }

  componentWillUnmount(){
    this.moveValue.stopAnimation();
    this.moveValue.removeAllListeners();
  }

  timer = () => {
    Animated.timing(this.moveValue, {
      toValue: 200,
      duration: 4000,
      easing: Easing.linear,
      useNativeDriver: true
    }).start(()=> this.assessment())
  }

  charge = () => {
    this.moveValueListener = this.moveValue.addListener(({value})=>this.capture = value);
    Animated.timing(this.moveValue, {
      toValue: 200,
      duration: 4000 / this.props.difficulty,
      easing: Easing.easeInExpo,
      useNativeDriver: true
    }).start((e)=>{
      if(e.finished) return this.props.advance('fail');
    });
  }

  slider = () => {
    this.moveValueListener = this.moveValue.addListener(({value})=>this.capture = value);
    Animated.sequence([
      Animated.timing(this.moveValue, {
        toValue: 200,
        duration: 3000 / this.props.difficulty,
        easing: Easing.linear,
        useNativeDriver: true
      }),
      Animated.timing(this.moveValue, {
        toValue: 0,
        duration: 3000 / this.props.difficulty,
        easing: Easing.linear,
        useNativeDriver: true
      })
    ]).start((e)=>{if(e.finished) return this.slider()});
  }

  render(){
    return(
      <View style={styles.container}>

        <View
          style={[styles.tapArea,{borderColor:'red'}]}
          {...this.panResponder.panHandlers} >
        </View>

        <View style={styles.mech}>
          { this.props.type === 'Defense' ? (

            <View>
              <View style={[mechStyles.shield,{left:this.shieldLoc}]}></View>
              <View style={mechStyles.track}></View>
              <Animated.View style={[mechStyles.baubel,{transform:[{translateX: this.moveValue}]}]}></Animated.View>
            </View>

          ) : this.props.type === 'Knight' ? (

            <View>
              <View style={mechStyles.track}></View>
              <Animated.View style={[mechStyles.baubel,{transform:[{translateX:this.moveValue}]}]}></Animated.View>
              <View style={[mechStyles.baubel,{top:20,backgroundColor:'lime',width: this.state.progress}]}></View>
            </View>

          ) : this.props.type === 'Archer' ? (

            <View>
              <View style={mechStyles.yellow}></View>
              <View style={mechStyles.green}></View>
              <View style={mechStyles.track}></View>
              <Animated.View style={[mechStyles.baubel,{transform:[{translateX:this.moveValue}]}]}></Animated.View>
            </View>

          ) : this.props.type === 'Mage' ? (

            <View>
              <View style={mechStyles.track}></View>
              <Animated.View style={[mechStyles.baubel,{transform:[{translateX:this.moveValue}]}]}></Animated.View>
              <Text style={{color:'white'}}>{this.pattern.map(val=> SPELL[val]+"  ")}</Text>
            </View>

          ) : this.props.type === 'Spearman' ? (

            <View>
              <View style={mechStyles.track}></View>
              <Animated.View style={[mechStyles.baubel,{transform:[{translateX:this.moveValue}]}]}></Animated.View>
              <View style={[mechStyles.baubel,{top:20,backgroundColor:'lime',width: this.state.progress}]}></View>
            </View>

          ) : null}
        </View>

      </View>
    )
  }
}

const mechStyles = StyleSheet.create({
  track: {
    width: 220,
    height: 16,
    borderStyle:'dashed',
    borderColor:'white',
    borderWidth:2,
  },
  green: {
    position:'absolute',
    left:150,
    width: 30,
    height: 16,
    backgroundColor:'lime'
  },
  yellow: {
    position:'absolute',
    left:140,
    width: 60,
    height: 16,
    backgroundColor:'yellow'
  },
  baubel: {
    position:'absolute',
    width: 20,
    height: 20,
    backgroundColor: 'red',
    borderRadius: 2
  },
  shield: {
    position:'absolute',
    width: 34,
    height: 40,
    top: -1,
    borderStyle:'solid',
    borderColor:'grey',
    borderWidth: 2,
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
    backgroundColor: 'white'
  }
});
