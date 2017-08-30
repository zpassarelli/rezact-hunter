import React from 'react';
import { View } from 'react-native';
import { NativeRouter, Route, AndroidBackButton } from 'react-router-native';

import styles from './styles';

import Splash from './components/splash';
import Tutorial from './components/tutorial';
import Main from './components/main';
import Game from './components/game';
import Result from './components/result';

export default class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {

    };
  }

  render() {
    return (
      <NativeRouter>
        <View style={styles.container}>
          <AndroidBackButton />
          <Route exact path="/" component={Splash} />
          <Route path="/tutorial" component={Tutorial} />
          <Route path="/main" component={Main} />
          <Route path="/game" render={({location})=><Game location={location}/>} />
          <Route path="/result" render={({location})=><Result location={location}/>} />
        </View>
      </NativeRouter>
    );
  }
}
