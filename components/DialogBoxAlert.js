import React from 'react';
import Dialog, { DialogContent } from 'react-native-popup-dialog';
import {
  StyleSheet,
  Text,
  View,
} from 'react-native';

const DialogBoxAlert = props => {
  return (
    <View style={styles.container}>

<Dialog
        containerStyle={{
          borderColor: '#f3f3f3',
          borderWidth: 1
        }}
        overlayBackgroundColor={'pink'}
        overlayOpacity={0.8}
        visible={props.visible}
        onTouchOutside={props.onTouchOutside}
      >
        <DialogContent style={{
          backgroundColor: '#ffffff',
          height: 100,
          width: "100%",
          borderColor: '#f3f3f3',
          borderWidth: 3
        }}>

          <View style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }}>
            <Text style={{ fontSize: 20 }}>{props.message}</Text>
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

export default DialogBoxAlert;
