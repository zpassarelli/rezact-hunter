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
    height: 100,
    width: 300,
    backgroundColor: 'lime',
    borderStyle: 'solid',
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center'
  }
});

module.exports = styles;
