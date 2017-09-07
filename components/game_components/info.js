import React from 'react';
import { Modal, Text, TouchableOpacity, View } from 'react-native';

import styles from '../../styles';

const INFO = {
  defense5: 'There is no hope against this giant chicken.'
}

export default class Info extends React.Component {
  render() {
    return this.props.show ? (
      <Modal
        animationType={"slide"}
        transparent={true}
        visible={true}
        onRequestClose={()=>this.props.close()}
        >
        <TouchableOpacity onPress={()=>this.props.close()}>
          <View style={styles.modal}>
            <Text style={{fontSize:24}}>Info</Text>
            <Text style={{fontSize:20, textAlign:'center'}}>{INFO[this.props.type] || 'Do your best.'}</Text>
            <Text style={{fontSize:18}}>Tap this window to close it.</Text>
          </View>
        </TouchableOpacity>
      </Modal>
    ) : null;
  }
}
