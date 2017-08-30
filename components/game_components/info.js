import React from 'react';
import { Modal, Text, TouchableHighlight, View } from 'react-native';

import styles from '../../styles';

export default class Info extends React.Component {
  render() {
    return (
      <View style={styles.container}>

        <Modal
          animationType={"fade"}
          transparent={true}
          visible={this.props.vis}
          onRequestClose={()=>alert('Modal closed')}
          >
         <View style={styles.modal}>
          <View>
            <Text>Hello?</Text>
          </View>
         </View>
        </Modal>

      </View>
    );
  }
}
