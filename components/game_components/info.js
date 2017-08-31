import React from 'react';
import { Modal, Text, TouchableOpacity, View } from 'react-native';

import styles from '../../styles';

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
            <Text>{this.props.type}</Text>
          </View>
        </TouchableOpacity>
      </Modal>
    ) : null;
  }
}
