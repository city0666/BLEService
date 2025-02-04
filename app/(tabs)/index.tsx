import { Image, StyleSheet, Platform, View, Button, TouchableOpacity, Text } from 'react-native';

import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { BLEService } from './BLEService';
import { Device } from 'react-native-ble-plx'

export default function HomeScreen() {


  const addFoundDevice = (device: Device) => {
    console.log("device", device)

  }

  return (
    <View style={{ flex: 1, backgroundColor: 'white', justifyContent: 'center', alignItems: 'center' }}>


      <TouchableOpacity onPress={() => BLEService.requestBluetoothPermission} >
        <Text>requestBluetoothPermission</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => BLEService.initializeBLE().then(() => BLEService.scanDevices(addFoundDevice, null, true))
      } >
        <Text>addFoundDevice</Text>
      </TouchableOpacity>


    </View>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
});
