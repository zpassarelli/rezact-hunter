import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

export default class Game extends React.Component {
  constructor(props){
    super(props);
    this.state = {

    };
  }

  onComponentDidMount(){
    console.log('hi')
  }

  render() {
    return(
      <View>
        <Text>Game component</Text>
      </View>
    )
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
