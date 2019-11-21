import React from 'react';
import Dialog, { DialogContent, DialogFooter, DialogButton, DialogTitle } from 'react-native-popup-dialog';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import { SearchBar } from 'react-native-elements';

const AddCheckinDialogBox = props => {
  const data = props.data != undefined ? props.data : []
  console.log('====================================');
  console.log(data);
  console.log('====================================');
  return (
    <View style={styles.container}>

      <Dialog
        overlayBackgroundColor={'#fff'}
        overlayOpacity={0.8}
        visible={props.visible}
        onTouchOutside={props.onTouchOutside}

        dialogTitle={
          <DialogTitle
            title='Add Check-in'
            textStyle={{ fontSize: 18 }}
          />}

        footer={
          <DialogFooter>
            <DialogButton
              textStyle={{ color: 'red' }}
              text="CANCEL"
              onPress={props.cancelBtn}
            />
            <DialogButton
              text="CONFIRM"
              onPress={props.confirmBtn}
            />
          </DialogFooter>
        }
      >
        <DialogContent style={{ width: 320 }}>
          <View style={{ justifyContent: 'center', alignItems: 'center' }}>
            <SearchBar
              containerStyle={{ backgroundColor: '#fff', marginBottom: 3, width: 320 }}
              placeholder="Search"
              lightTheme
              onChangeText={props.onChangeText}
              autoCorrect={false}
              value={props.search}
            />
          </View>
          <View>
            <Text>ID : {data.stuId || ''}</Text>
            <Text>Name : {data.name || ''}</Text>
            <Text>Faculty : {data.faculty || ''}</Text>
            <Text>Major : {data.major || ''}</Text>
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
export default AddCheckinDialogBox;
