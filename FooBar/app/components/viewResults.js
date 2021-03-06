import React, { Component } from 'react';
import { View, Text, StyleSheet, Platform, TouchableOpacity, Button, TouchableHighlight, FlatList } from 'react-native';
import { StackNavigator } from 'react-navigation';
import RestuarantScreen from './restuarant';

export default class ResultsScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      results: []
    };
  }
  componentDidMount() {
    this.loadResults();
  }
  loadResults() {
    fetch('http://52.170.251.39:3000/getRestaurants')
      .then((response) => {
        console.log(response);
        response.json().then((responseJson) => {
          console.log(responseJson);
          this.setState({
            results: responseJson.sort((a, b) => {
              if (a.score > b.score)
                return -1;
              if (a.score < b.score)
                return 1;
              return 0;
            })
          })
          return responseJson;
        })
          .catch((error) => {
            console.error(error);
          })
          .catch((err) => {
            console.log(err)
          });
      });
  }

  render() {
    return (
      <View style={{ flexGrow: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text style={styles.welcome}>
          FooBar Results
        </Text>
        <FlatList
          style={{ flex: 1 }}
          data={this.state.results}
          renderItem={({ item }) => <RestuarantScreen key={item.id} score={item.score} id={item.id} />}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
