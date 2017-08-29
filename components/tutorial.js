import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, Dimensions } from 'react-native';
import { Link } from 'react-router-native';

import styles from '../styles';
const { width } = Dimensions.get('window');

export default class Tutorial extends React.Component {
  constructor(props){
    super(props);
    this.state = {

    };
  }

  render() {
    return(
        <View style={styles.container}>
          <View style={{flex:5}}>
            <ScrollView
              style={{flex:1}}
              horizontal={true}
              pagingEnabled={true}
              snapToAlignment={'center'}
              showsHorizontalScrollIndicator={false}>
              <Text style={[{width:width},{textAlign:'center'}]}>Page1</Text>
              <Text style={[{width:width},{textAlign:'center'}]}>Page2</Text>
            </ScrollView>
          </View>
          <View style={{flex:1}}>
            <TouchableOpacity>
              <Link to="/" replace component={TouchableOpacity} style={styles.button}>
                <Text style={styles.buttonText}>Back</Text>
              </Link>
            </TouchableOpacity>
          </View>
        </View>
    )
  }

}
