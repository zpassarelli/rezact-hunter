import React from 'react';
import { Alert, BackHandler, Modal, Text, View, TouchableOpacity } from 'react-native';
import { Link, Redirect } from 'react-router-native';

import styles from '../styles';

import Info from './game_components/info';

export default class Game extends React.Component {
  constructor(props){
    super(props);
    let difficulty = JSON.stringify(props.location.pathname).slice(7,-1);
    this.state = {
      difficulty: difficulty,
      info: true,
      redirect: ''
    };
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

  componentWillUnmount() {
    alert("Game unmount");
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
        <View style={{flex:4, paddingTop:30}}>
          <Modal
            animationType={"fade"}
            transparent={true}
            visible={this.state.info}
            onRequestClose={()=>this.setState({info:false})}
            >
            <TouchableOpacity onPress={()=>this.setState({info: false})}>
              <View style={styles.modal}>
                <Text>Hello?</Text>
              </View>
            </TouchableOpacity>
          </Modal>


        </View>

        <View style={{flex:1, justifyContent:'center'}}>

          <TouchableOpacity style={styles.button} onPress={(event)=> this.retreat(event)}>
              <Text style={styles.buttonText}>Retreat</Text>
          </TouchableOpacity>

        </View>
      </View>
      )
    }
  }
}
