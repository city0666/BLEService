import { Image, StyleSheet, Platform, View, TouchableOpacity, Text, FlatList, } from 'react-native';

import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { BLEService } from './BLEService';
import { Device } from 'react-native-ble-plx'
import { useState } from 'react';

export default function HomeScreen() {
  const [devices, setDevices] = useState<Device[]>([]);

  const addFoundDevice = (device: Device) => {
    console.log("Found Device:", device);
    setDevices((prevDevices) => {
      const exists = prevDevices.some((d) => d.id === device.id);
      return exists ? prevDevices : [...prevDevices, device];
    });
  };

  return (
    <View style={{ flex: 1, backgroundColor: 'white', alignItems: 'center', }}>
      <View style={{ height: 100 }}></View>

      {/* Request Bluetooth Permission */}
      <TouchableOpacity onPress={() => BLEService.requestBluetoothPermission()}>
        <Text>Request Bluetooth Permission</Text>
      </TouchableOpacity>

      {/* Start BLE Scan */}
      <TouchableOpacity onPress={() => BLEService.initializeBLE().then(() =>
        BLEService.scanDevices(addFoundDevice, null, true)
      )}>
        <Text>Start Scan</Text>
      </TouchableOpacity>

      {/* Display Found Devices */}
      <FlatList
        data={devices}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={{ padding: 10, borderBottomWidth: 1 }}>
            <Text>ID: {item.id}</Text>
            <Text>Name: {item.name ?? 'Unknown'}</Text>
            <Text>RSSI: {item.rssi}</Text>
          </View>
        )}
      />

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
