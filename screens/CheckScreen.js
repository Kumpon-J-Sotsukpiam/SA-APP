import React from 'react';
import {
  ScrollView,
  StyleSheet,
  View,
  FlatList
} from 'react-native';
import ContainerClass from '../components/ContainerClass';
import { Header } from 'react-native-elements';
import { getDayOfWeek, formatTime } from "../src/actions/date"

export default class CheckScreen extends React.Component {
  constructor(props) {
    super(props);

      this.state = {
       class:[{course:'Course',group:'Group',location:'Location',day:'Day',startTime:'Start',endTime:'End',studentList:null}],
    }
  }

  ListViewItemSeparator = () => {
    return (
      <View style={{ backgroundColor: '#000' }} />
    );
  };

  render() {
  return (
    <View style = {styles.container}>
      <View>
      <Header
        centerComponent={({ text: 'Check-in', style:{color: '#fff', fontSize:36, fontWeight:'bold'} })}
        containerStyle={styles.containerStyle}
      />
      </View>
    
      <ScrollView>
      <FlatList
            ItemSeparatorComponent={this.ListViewItemSeparator}
            data={this.state.class}
            refreshing={true}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <View>
                <ContainerClass
                  course={item.course}
                  group={item.group}
                  location={item.location}
                  day={getDayOfWeek(item.day)}
                  timeStart={formatTime(item.startTime)}
                  timeEnd={formatTime(item.endTime)}
                  students={item.studentList.length}
                  navigateCamera={() => this.props.navigation.navigate('Camera')}
                  navigateClassDetails={() => this.props.navigation.navigate('ClassDetails',{ classId: item._id, courseId: item.courseId, semesterId: item.semesterId })}
                />
              </View>
            )}
          />
        </ScrollView>

    </View>
  );
}
}


CheckScreen.navigationOptions = {
  header:null
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f3f3f3',
  },
  containerStyle: {
    backgroundColor: '#fd4176',
    height:120,
    justifyContent: 'space-around',
    borderBottomColor: '#be5f7a',
    borderBottomWidth: 1,
  },

});