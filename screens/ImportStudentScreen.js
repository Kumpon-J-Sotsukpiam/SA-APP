import React from 'react';
import { 
  ScrollView, 
  StyleSheet, 
  View, 
  Text, 
  TouchableOpacity,
  FlatList
  } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Header, Button, CheckBox, } from 'react-native-elements';
import * as DocumentPicker from 'expo-document-picker';

export default class ImportStudentScreen extends React.Component {
  constructor(props) {
    super(props);

      this.state = {

        testData : [{studentId:'5905100000',name:'moochamp'}]
        
    };
  }

  _pickDocument = async () => {
    let result = await DocumentPicker.getDocumentAsync({});
    alert(result.uri);
    console.log(result);
}


 render() {

  const {testData} = this.state

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

          <Button
          title="Select Document"
          onPress={this._pickDocument}
          buttonStyle={styles.button}
          icon={
            <Ionicons name='ios-download'
            size={30}
            color={'#fff'}
            style={{marginRight:10}}
              />
              }
          />


                <View style={{ flexDirection: 'row', padding: 2, backgroundColor: '#ffff', height: 60, marginVertical:3, marginHorizontal:5}}>
                    <View style={{ flex: 2, justifyContent: 'center', alignItems: 'center' }}>
                      <Text style={{ fontSize: 16,fontWeight:'bold'}}>Student ID</Text>
                    </View>
                     <View style={{ flex: 2.5, justifyContent: 'center', alignItem: 'center' }}>
                      <Text style={{ fontSize: 16, fontWeight:'bold'}}>Name</Text>
                    </View>
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                       <CheckBox
                          iconRight
                          title='Add' textStyle={{ fontSize: 16,color:'#000',marginLeft:-2}}
                          containerStyle={{backgroundColor:'#fff',borderColor:'#ffff',justifyContent:'center'}}
                        />
                  </View>
                </View>

        <FlatList
            data={testData}
            extraData={testData}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => {
              return (
                <View>

                  <View style={{ flexDirection: 'row', padding: 2, backgroundColor: '#f3f3f3', height: 60, marginVertical:3, marginHorizontal:5,borderRadius:10}}>
                    <View style={{ flex: 2, justifyContent: 'center', alignItems: 'center' }}>
                      <Text style={{ fontSize: 16}}>{item.studentId}</Text>
                    </View>
                     <View style={{ flex: 2.5, justifyContent: 'center', alignItem: 'center' }}>
                      <Text style={{ fontSize: 16}}>{item.name}</Text>
                    </View>
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                       <CheckBox
                          containerStyle={{backgroundColor:'#f3f3f3',borderColor:'#f3f3f3',justifyContent:'center'}}
                      />
                  </View>
                </View>

                </View>
              )
            }}
          />


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
  button: {
    height:60,
  },
});