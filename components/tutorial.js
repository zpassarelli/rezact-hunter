import React from 'react';
import { Text, View, TouchableOpacity, ScrollView } from 'react-native';
import { Link } from 'react-router-native';

import styles from '../styles';

export default class Tutorial extends React.Component {
  render() {
    return(
        <View style={styles.container}>
          <View style={{flex:4, paddingTop:30}}>

            <ScrollView
              style={{flex:1}}
              horizontal={true}
              pagingEnabled={true}
              snapToAlignment={'center'}
              showsHorizontalScrollIndicator={false}>

              <Text style={styles.tutorialText}>Do or do not, there is no try. -Yoda</Text>
              <Text style={styles.tutorialText}>Such clear. Much simple. Wow. -Doge</Text>

            </ScrollView>

          </View>

          <View style={{flex:1, justifyContent:'center'}}>

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
