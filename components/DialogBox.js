import React from 'react';
import Dialog, { DialogContent, DialogFooter, DialogButton } from 'react-native-popup-dialog';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

const DialogBox = props => {
  return (
    <View style={styles.container}>

    <Dialog
    containerStyle={{
      borderColor:'#f3f3f3',
      borderWidth:1
                   }}
    overlayBackgroundColor={'pink'}
    overlayOpacity={0.8}
    visible={props.visible}
    onTouchOutside={props.onTouchOutside} 
    footer={
      <DialogFooter>
        <DialogButton
          style={{borderBottomColor:'#f3f3f3',borderLeftColor:'#f3f3f3',borderBottomWidth:3,borderLeftWidth:3}}
          text="CANCEL"
          onPress={props.cancelBtn}
        />
        <DialogButton
          style={{borderBottomColor:'#f3f3f3',borderRightColor:'#f3f3f3',borderBottomWidth:3,borderRightWidth:3}}
          textStyle={{color:'red'}}
          text="CONFIRM"
          onPress={props.confirmBtn}
        />
      </DialogFooter>
    }
    >
    <DialogContent style={{
      backgroundColor:'#fff',
      height:100,
      width:300,
      borderColor:'#f3f3f3',
      borderWidth:3}}>
      <View style={{justifyContent:'center',alignItems:'center',flex:1}}>
      <Text style={{fontSize:20}}>{/*Confirm to Reset ?*/}{props.message}</Text>
      </View>
    </DialogContent>
</Dialog>

    </View>
  );

  }

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',

  },

});

export default DialogBox;
