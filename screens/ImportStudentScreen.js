import React from 'react';
import { 
  ScrollView, 
  StyleSheet, 
  View, 
  Text, 
  Platform, 
  TouchableOpacity,
  TextInput,
  } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Header, Button } from 'react-native-elements';

export default class ImportStudentScreen extends React.Component {
  constructor(props) {
    super(props);

      this.state = {
    };
  }


 render() {

  return (
    <View style = {styles.container}>
          <View>
            <Header
              leftComponent={(
                <TouchableOpacity onPress={() => { this.props.navigation.navigate('Students') }}>
                  <Text style={styles.textCancel}>Cancel</Text>
                </TouchableOpacity>
              )}
              centerComponent={({ text: 'New Student', style: { color: '#fff', fontSize: 24, fontWeight: 'bold' } })}
              rightComponent={(
                <TouchableOpacity onPress={() => { this.props.navigation.navigate('Students') }}>
                  <Text style={styles.textSave}>Save</Text>
                </TouchableOpacity>
              )}
              containerStyle={styles.containerStyle}
            />
          </View>  
    </View>
  );
}
}

ImportStudentScreen.navigationOptions = {
  header:null
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  containerStyle: {
    backgroundColor: '#fd4176',
    height: 80,
    justifyContent: 'space-around',
    borderBottomColor: '#be5f7a',
    borderBottomWidth: 1,
  },
  textCancel: {
    fontSize: 18,
    color: '#fff'
  },
  textSave: {
    fontSize: 18,
    color: '#fff'
  },
});