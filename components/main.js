import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Link } from 'react-router-native';

import styles from '../styles';

export default class Main extends React.Component {
  constructor(props){
    super(props);
    this.state = {

    };
  }

  render() {
    return(
      <View style={styles.container}>
        <View>
          <Text style={styles.buttonText}>Select a difficulty</Text>
        </View>
        <TouchableOpacity>
          <Link to="/main" component={TouchableOpacity} style={[styles.button,{backgroundColor:'crimson'}]}>
            <Text style={[styles.buttonText,{color:'white'}]}>Extreme</Text>
          </Link>
        </TouchableOpacity>
        <TouchableOpacity>
          <Link to="/main" component={TouchableOpacity} style={[styles.button,{backgroundColor:'orange'}]}>
            <Text style={styles.buttonText}>Hard</Text>
          </Link>
        </TouchableOpacity>
        <TouchableOpacity>
          <Link to="/main" component={TouchableOpacity} style={styles.button}>
            <Text style={styles.buttonText}>Normal</Text>
          </Link>
        </TouchableOpacity>
        <TouchableOpacity>
          <Link to="/main" component={TouchableOpacity} style={styles.button}>
            <Text style={styles.buttonText}>Easy</Text>
          </Link>
        </TouchableOpacity>
        <TouchableOpacity>
          <Link to="/" replace component={TouchableOpacity} style={styles.button}>
            <Text style={styles.buttonText}>Back</Text>
          </Link>
        </TouchableOpacity>
      </View>
    )
  }

}
