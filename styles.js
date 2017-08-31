import { StyleSheet, Dimensions } from 'react-native';
const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  logo: {
    width: width - 10,
    height: width - 10,
    backgroundColor: 'grey'
  },
  button: {
    height: 60,
    width: width - 30,
    backgroundColor: 'lemonchiffon',
    borderStyle: 'solid',
    borderColor: 'black',
    borderWidth: 1,
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
  statusText: {
    position: 'absolute',
    marginTop: 20,
    width: width,
    textAlign: 'center',
    fontSize: 40,
    fontFamily: 'serif',
    fontStyle: 'italic',
    textShadowOffset: {width: 1, height: 1},
    textShadowRadius: 10
  },
  tutorialText: {
    fontSize: 24,
    fontFamily: 'serif',
    padding: 30,
    width: width,
    textAlign: 'center'
  },
  modal: {
    backgroundColor: 'lemonchiffon',
    justifyContent: 'center',
    alignItems: 'center',
    borderStyle: 'solid',
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 10,
    marginLeft: 15,
    marginTop: 70,
    width: width - 30,
    height: width - 60
  }
});

module.exports = styles;
