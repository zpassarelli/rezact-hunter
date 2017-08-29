import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  logo: {
    width: 250,
    height: 250,
    backgroundColor: 'grey',
    borderRadius: 200
  },
  button: {
    height: 80,
    width: 300,
    backgroundColor: 'lime',
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
  pager: {
    flex: 1,
    alignItems: 'center',
    padding: 20,
  }
});

module.exports = styles;
