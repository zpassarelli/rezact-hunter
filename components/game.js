import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { Link } from 'react-router-native';

import styles from '../styles';

export default class Game extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      diff: 'default'
    };
  }

  componentDidMount(){
    let newDiff = JSON.stringify(this.props.location.pathname).slice(7,-1);
    this.setState({diff: newDiff});
  }

  render() {
    return(
      <View style={styles.container}>
        <View style={{flex:4, paddingTop:30}}>

          <Text>Game is {this.state.diff}</Text>
          <TouchableOpacity>
            <Link to="/result/lose" replace component={TouchableOpacity} style={styles.button}>
              <Text style={styles.buttonText}>Defeat</Text>
            </Link>
          </TouchableOpacity>

        </View>

        <View style={{flex:1, justifyContent:'center'}}>

          <TouchableOpacity>
            <Link to="/result/win" replace component={TouchableOpacity} style={styles.button}>
              <Text style={styles.buttonText}>Victory</Text>
            </Link>
          </TouchableOpacity>

        </View>
      </View>
    )
  }
}
