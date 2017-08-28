import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Link } from 'react-router-native';

export default class Splash extends React.Component {
  constructor(props){
    super(props);
    this.state = {

    };
  }

  render() {
    return(
      <View style={styles.container}>
        <View style={styles.logo}>
          <Text>Logo here</Text>
        </View>
        <TouchableOpacity >
          <Link to="/main" component={TouchableOpacity} style={styles.button}>
            <Text style={{fontSize: 30, fontFamily: 'serif'}}>Start</Text>
          </Link>
        </TouchableOpacity>
        <TouchableOpacity>
          <Link to="/tutorial" component={TouchableOpacity} style={styles.button}>
            <Text style={{fontSize: 30, fontFamily: 'serif'}}>Tutorial</Text>
          </Link>
        </TouchableOpacity>
      </View>
    )
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 5,
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  logo: {
    width: 300,
    height: 300,
    backgroundColor: 'grey'
  },
  button: {
    height: 100,
    width: 300,
    backgroundColor: 'lime',
    borderStyle: 'solid',
    borderColor: 'black',
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});
