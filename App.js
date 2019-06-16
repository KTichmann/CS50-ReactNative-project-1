import React, { Component } from "react";
import {
  AppRegistry,
  TextInput,
  View,
  Button,
  Text,
  KeyboardAvoidingView,
  StyleSheet
} from "react-native";
import { Constants } from "expo";
import { vibrate } from "./utils";
import NumberInput from "./components/NumberInput";
const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1
  },
  timerText: {
    fontSize: 60,
    paddingBottom: 20
  },
  mainFont: {
    fontSize: 30,
    paddingBottom: 20
  },
  inputText: {
    alignSelf: "center",
    marginLeft: 5
  },
  inputRow: {
    flexDirection: "row"
  },
  inputTitle: {
    marginBottom: 10,
    marginTop: 20,
    fontWeight: "bold"
  },
  buttonContainer: {
    marginTop: 25
  }
});
export default class UselessTextInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      workTime: {
        mins: 45,
        secs: 0
      },
      breakTime: {
        mins: 15,
        secs: 0
      },
      mins: 45,
      secs: 10,
      timerType: "work"
    };

    this.handleWorkTimeChange = this.handleWorkTimeChange.bind(this);
    this.handleBreakTimeChange = this.handleBreakTimeChange.bind(this);
    this.startTimer = this.startTimer.bind(this);
    this.pauseTimer = this.pauseTimer.bind(this);
    this.resetTimer = this.resetTimer.bind(this);
  }

  handleWorkTimeChange(number, type) {
    if (type === "mins") {
      this.setState(prevState => ({
        workTime: {
          secs: prevState.workTime.secs,
          mins: number
        }
      }));
    } else {
      this.setState(prevState => ({
        workTime: {
          mins: prevState.workTime.mins,
          secs: number
        }
      }));
    }
  }
  handleBreakTimeChange(number, type) {
    if (type === "mins") {
      this.setState(prevState => ({
        breakTime: {
          secs: prevState.breakTime.secs,
          mins: number
        }
      }));
    } else {
      this.setState(prevState => ({
        breakTime: {
          mins: prevState.breakTime.mins,
          secs: number
        }
      }));
    }
  }

  startTimer() {
    clearInterval(this.timer);
    this.timer = setInterval(() => {
      if (this.state.secs === 0 && this.state.mins === 0) {
        vibrate();
        if (this.state.timerType === "work") {
          this.setState(prevState => ({
            timerType: "break",
            mins: prevState.breakTime.mins,
            secs: prevState.breakTime.secs
          }));
        } else {
          this.setState(prevState => ({
            timerType: "work",
            mins: prevState.workTime.mins,
            secs: prevState.workTime.secs
          }));
        }
        //TODO: vibrate phone
      } else {
        if (this.state.secs === 0) {
          this.setState(prevState => ({
            mins: prevState.mins - 1,
            secs: 59
          }));
        } else {
          this.setState(prevState => ({
            secs: prevState.secs - 1
          }));
        }
      }
    }, 1000);
  }

  resetTimer() {
    this.setState(prevState => ({
      mins: prevState.workTime.mins,
      secs: prevState.workTime.secs
    }));
  }

  pauseTimer() {
    clearInterval(this.timer);
  }

  render() {
    return (
      <KeyboardAvoidingView behavior="padding" style={styles.container}>
        <Text style={styles.timerText}>
          {this.state.mins}:{this.state.secs}
        </Text>
        <Text style={styles.mainFont}>
          {this.state.timerType === "work"
            ? "Back To Work!"
            : "Time for a break!"}
        </Text>
        <Text style={styles.inputTitle}>Work Time:</Text>
        <View style={styles.inputRow}>
          <NumberInput
            default={45}
            max={90}
            updateNumber={number => this.handleWorkTimeChange(number, "mins")}
          />
          <Text style={styles.inputText}>mins</Text>
          <NumberInput
            default={45}
            max={60}
            updateNumber={number => this.handleWorkTimeChange(number, "secs")}
          />
          <Text style={styles.inputText}>secs</Text>
        </View>
        <Text style={styles.inputTitle}>Breaks:</Text>
        <View style={styles.inputRow}>
          <NumberInput
            default={5}
            max={90}
            updateNumber={number => this.handleBreakTimeChange(number, "mins")}
          />
          <Text style={styles.inputText}>mins</Text>
          <NumberInput
            default={5}
            max={60}
            updateNumber={number => this.handleBreakTimeChange(number, "secs")}
          />
          <Text style={styles.inputText}>secs</Text>
        </View>
        <View style={styles.buttonContainer}>
          <Button onPress={this.startTimer} title="Start!" />
        </View>
        <View style={styles.buttonContainer}>
          <Button onPress={this.pauseTimer} title="Stop!" />
        </View>
        <View style={styles.buttonContainer}>
          <Button onPress={this.resetTimer} title="Reset!" />
        </View>
      </KeyboardAvoidingView>
    );
  }
}

// skip this line if using Create React Native App
AppRegistry.registerComponent("AwesomeProject", () => UselessTextInput);
