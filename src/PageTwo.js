import React, { Component } from 'react';
import { View, Text } from 'react-native';

export default class PageTwo extends Component {

  render() {
    const { close } = this.props;
    let foo = function() {
       console.log('foo');
    };

    return (
      <View style={{ margin: 10, padding: 10, flex: 1, backgroundColor: 'blue', flexDirection:'column'}}>
        <Text style={{flex: 0.5, marginTop: 70, backgroundColor: 'yellow', textAlign: 'center'}}>This is PageTwo!</Text>
        <Text onPress={close} style={{flex: 0.5, textAlign: 'center', backgroundColor: 'pink'}}>This is { this.props.flagger ? 'bar' : 'foo'}</Text>
      </View>
    )
  }
}
