import React from 'react';
import { Modal, Text, TouchableOpacity, View } from 'react-native';

import styles from '../../styles';

const INFO = {
  'Defense': 'Tap when the orb is over the shield icon to protect yourself.',
  'Chicken Defense': 'There is no hope against this giant chicken.',
  'Knight': 'Swipe across the tap area in slashing motions to fill the meter before the timer expires.',
  'Spearman': 'Tap the tap area quickly to fill the meter before the timer expires.',
  'Mage': 'Draw lines in the tap area in order of the shown pattern. HORI means horizontal line. VERT means vertical line. LYDIA means left diagonal line. RADIA means right diagonal line.',
  'Archer': 'Tap when the orb is in the green zone, but you only get one shot!'
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
            <Text style={{fontSize:24}}>{this.props.type} Info</Text>
            <Text style={{fontSize:20, textAlign:'center'}}>{INFO[this.props.type] || 'Do your best.'}</Text>
            <Text style={{fontSize:18}}>Tap this window to close it.</Text>
          </View>
        </TouchableOpacity>
      </Modal>
    ) : null;
  }
}
