import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { Link } from 'react-router-native';

import styles from '../styles';

export default class Result extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      victory: true
    };
  }

  componentDidMount(){
    let newResult = JSON.stringify(this.props.location.pathname).slice(9,-1);
    if(newResult === 'lose') this.setState({victory: false});
  }
  render() {
    return(
      <View style={styles.container}>
        <View style={{flex:4, paddingTop:30}}>

          <Text style={styles.tutorialText}>{this.state.victory ? 'Victory!' : 'Defeat.'}</Text>

        </View>

        <View style={{flex:1, justifyContent:'center'}}>

          <TouchableOpacity>
            <Link to="/" replace component={TouchableOpacity} style={styles.button}>
              <Text style={styles.buttonText}>Main Menu</Text>
            </Link>
          </TouchableOpacity>

        </View>
      </View>
    )
  }
}
