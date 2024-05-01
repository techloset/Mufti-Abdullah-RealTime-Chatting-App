import {Image, Text, View} from 'react-native';
import React, {Component} from 'react';
import {styles} from './Style';

type Props = {
  icon: JSX.Element;
  name: string;
  description?: string;
};
export default class SettingInfo extends Component<Props> {
  render() {
    const {name, icon, description} = this.props;
    return (
      <View style={styles.MainView}>
        <View style={styles.InnerView}>
          {icon}
          <View style={styles.TextView}>
            <Text style={styles.Name}>{name}</Text>
            <Text style={styles.Description}>{description}</Text>
          </View>
        </View>
      </View>
    );
  }
}
