import React, { Component } from "react";
import { AppRegistry, TextInput, Alert, StyleSheet } from "react-native";
import { Constants } from "expo";

export default class NumberInput extends Component {
  constructor(props) {
    super(props);
    this.state = { number: this.props.default ? this.props.default : 0 };

    this.handleNumberChange = this.handleNumberChange.bind(this);
  }

  handleNumberChange(number) {
    const numberAsNumber = Number(number);
    if (isNaN(numberAsNumber)) {
      Alert.alert(
        "Please Enter a Number",
        "Times must be numeric only",
        [
          {
            text: "Ok"
          }
        ],
        { cancelable: false }
      );
    } else if (this.props.max && numberAsNumber > this.props.max) {
      Alert.alert(
        `Number can't be larger than ${this.props.max}`,
        "Please enter a smaller number",
        [
          {
            text: "Ok"
          }
        ],
        { cancelable: false }
      );
    } else {
      this.setState({ number: String(Math.floor(numberAsNumber)) });
      this.props.updateNumber(Math.floor(numberAsNumber));
    }
  }

  render() {
    return (
      <TextInput
        style={styles.input}
        keyboardType={"numeric"}
        onChangeText={this.handleNumberChange}
        value={String(this.state.number)}
      />
    );
  }
}

const styles = StyleSheet.create({
  input: {
    borderColor: "black",
    borderWidth: 1,
    borderRadius: 5,
    padding: 8,
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 20
  }
});
