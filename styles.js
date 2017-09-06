import { StyleSheet, Dimensions } from 'react-native';
const { height, width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  field: {
    width: width - 30,
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  bg: {
    zIndex:0,
    height: height,
    resizeMode: 'contain',
    position:'absolute'
  },
  logo: {
    width: width - 10,
    height: width - 10,
    alignItems: 'center',
    justifyContent: 'center'
  },
  logoText: {
    textAlign: 'center',
    fontSize: 60,
    fontFamily: 'serif',
    fontWeight: 'bold',
    color: 'cyan',
    textShadowColor: 'black',
    textShadowOffset: {width: 2, height: 2},
    textShadowRadius: 10
  },
  button: {
    height: 60,
    width: width - 30,
    backgroundColor: 'lemonchiffon',
    borderStyle: 'solid',
    borderColor: 'black',
    borderWidth: 3,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center'
  },
  tapArea: {
    flex: 1,
    width: width - 30,
    backgroundColor: 'lightskyblue',
    borderStyle: 'dotted',
    borderColor: 'aqua',
    borderWidth: 5,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonText: {
    fontSize: 30,
    fontFamily: 'serif'
  },
  shadow: {
    textShadowColor: 'black',
    textShadowOffset: {width: 2, height: 2},
    textShadowRadius: 10
  },
  statusText: {
    position: 'absolute',
    marginTop: 20,
    width: width,
    textAlign: 'center',
    fontSize: 40,
    fontFamily: 'serif',
    fontStyle: 'italic',
    textShadowColor: 'black',
    textShadowOffset: {width: 1, height: 1},
    textShadowRadius: 10
  },
  tutorialText: {
    fontSize: 24,
    fontFamily: 'serif',
    padding: 30,
    width: width - 30,
    margin: 15,
    backgroundColor: 'lemonchiffon',
    borderStyle: 'solid',
    borderColor: 'black',
    borderWidth: 3,
    borderRadius: 10,
    justifyContent: 'center',
    textAlign: 'center'
  },
  modal: {
    backgroundColor: 'lemonchiffon',
    justifyContent: 'center',
    alignItems: 'center',
    borderStyle: 'solid',
    borderColor: 'black',
    borderWidth: 3,
    borderRadius: 10,
    marginLeft: 15,
    marginTop: height/2 - 70,
    width: width - 30,
    height: height/2 - 50
  }
});

module.exports = styles;
