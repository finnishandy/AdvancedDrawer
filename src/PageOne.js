import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { Actions } from 'react-native-router-flux';
import Drawer from 'react-native-drawer';
import PageTwo from './PageTwo';
import Orientation from 'react-native-orientation';


class PageOne extends Component {

  constructor(props) {
    super(props);
    this.state = {panelOpen: true}
  }

  orientationDidChange() {
    Orientation.getOrientation((err,orientation)=> {
      console.log("Current Device Orientation: ", orientation);
      var {height, width} = Dimensions.get('window');
      console.log("Height and width:", height, width);
    });
  }

  closeControlPanel() {
    this.refs._drawer.close()
  }

  openControlPanel() {
    this.refs._drawer.open()
  }

  setStyles = () => {
    this.setState({panelOpen: !this.state.panelOpen})
  };

  componentDidMount(){
    Orientation.addOrientationListener(this.orientationDidChange);
  }

  render() {
    const goToPageTwo = () => Actions.pageTwo({text: 'Hello World!'});
    return (
      <Drawer
      type="displace"
      ref="_drawer"
      content={<PageTwo text="close me" close={this.closeControlPanel} flagger={this.props.flagger}/>}
      openDrawerOffset={0.4} // 20% gap on the right side of drawer
      panCloseMask={0}
      onOpen={this.setStyles}
      onClose={this.setStyles}
      negotiatePan={true}
      panThreshold={0}
      closedDrawerOffset={30}
      styles={{ drawer: { backgroundColor: this.state.panelOpen ? 'lime' : 'tomato' } }}
      tweenHandler={(ratio) => ({
        main: { opacity:(2-ratio)/2 }
      })}>
        <View style={{margin: 128, backgroundColor: 'green'}}>
          <Text onPress={this.openControlPanel}>This is { this.props.flagger ? 'bar' : 'foo'}</Text>
          <Text onPress={this.props.toggleBar}>OPEN DRAWER</Text>
        </View>
      </Drawer>
    )
  }
}

const styles = StyleSheet.create({
  closed: {
    shadowColor: '#000000',
    shadowOpacity: 0.8,
    shadowRadius: 3,
    backgroundColor: 'red'
  },
  open: {
    shadowColor: '#000000',
    shadowOpacity: 0.8,
    shadowRadius: 3,
    backgroundColor: 'orange'
  },
});



function addTodo(text) {
  return {
  	type: 'bar',
  	text: 'what'
  };
}

function mapStateToProps({previousRoute}) {
  return { flagger: previousRoute.bar }
}

function mapDispatchToProps(dispatch) {
  return {
    addTodo: function (text) {
      return dispatch(addTodo(text));
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(PageOne);
