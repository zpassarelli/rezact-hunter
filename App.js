import React from 'react';
import { View, Image } from 'react-native';
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
      bg: 1
    };
  }

  changeBg = (bg) => {
    this.setState({bg: bg});
  }

  render() {
    return (
      <NativeRouter>
        <View style={styles.container}>

          { this.state.bg === 2 ? (
            <Image style={styles.bg} source={require('./media/bg2.png')}></Image>
          ) : this.state.bg === 3 ? (
            <Image style={styles.bg} source={require('./media/bg3.png')}></Image>
          ) : this.state.bg === 4 ? (
            <Image style={styles.bg} source={require('./media/bg4.png')}></Image>
          ) : (
            <Image style={styles.bg} source={require('./media/bg.png')}></Image>
          )}


            <AndroidBackButton />
            <Route exact path="/" component={Splash} />
            <Route path="/tutorial" component={Tutorial} />
            <Route path="/main" component={Main} />
            <Route path="/game" render={({location})=><Game changeBg={this.changeBg} location={location}/>} />
            <Route path="/result" render={({location})=><Result location={location}/>} />
        </View>
      </NativeRouter>
    );
  }
}
