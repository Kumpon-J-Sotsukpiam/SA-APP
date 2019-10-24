import React from 'react';
import { StyleSheet, View, Text, Button, Platform, TouchableOpacity} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Header } from 'react-native-elements';

export default class CameraScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      test:this.props.navigation.state.params.test,
    };
  }

  render() {

  return (
    <View style = {styles.container}>

    <Header
        leftComponent={(<TouchableOpacity onPress={()=>{this.props.navigation.navigate('Check')}}>
                        <Text style={styles.textCancel}>Camera</Text>
                        </TouchableOpacity>
                      )}
        centerComponent={({ text: 'Camera', style:{color: '#fff', fontSize:24, fontWeight:'bold'} })}
        rightComponent={(<View style={styles.containerRightHeader}>
                         <Ionicons name={Platform.OS === 'ios' ? 'ios-add' : 'md-add'}
                          size={60}
                          color={'#fff'}
                          onPress={()=>{this.props.navigation.navigate('CheckScreen')}}
                        />
                        </View>
                        )}
        containerStyle={{
          backgroundColor: '#fd4176',
          height:80,
          justifyContent: 'space-around',
          borderBottomColor: '#be5f7a',
          borderBottomWidth: 1,
        }}
    />

        <View style = {styles.containerCamera}>
        </View>

        <View style = {styles.containerMessage}>
            <Text>{this.state.test}</Text>
        </View>
    </View>
  );
}
}

CameraScreen.navigationOptions = {
  header:null
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    flexDirection: 'column'
  },
  containerCamera: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#000000',
  },
  containerMessage: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#fff',
  },
  containerRightHeader: {
    flex:1,
  },
  textCancel: {
    fontSize:18,
    color:'#fff'
  },
});