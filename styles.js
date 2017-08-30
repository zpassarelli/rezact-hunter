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
  buttonText: {
    fontSize: 30,
    fontFamily: 'serif'
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
    width: width - 30,
    height: width
  }
});

module.exports = styles;
