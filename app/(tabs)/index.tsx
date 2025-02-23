import { Image, StyleSheet, Platform, View, TouchableOpacity, Text, FlatList, Alert } from 'react-native';

import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { BLEService } from './BLEService';
import { Device } from 'react-native-ble-plx'
import { useState } from 'react';

export default function HomeScreen() {
  const [devices, setDevices] = useState<Device[]>([]);
  const [connectedDevice, setConnectedDevice] = useState<Device | null>(null);

  const addFoundDevice = (device: Device) => {
    console.log("Found Device:", device);
    setDevices((prevDevices) => {
      const exists = prevDevices.some((d) => d.id === device.id);
      return exists ? prevDevices : [...prevDevices, device];
    });
  };


  const connectToDevice = async (device: Device) => {
    try {
      const connected = await BLEService.connectToDevice(device.id);
      setConnectedDevice(connected);
      Alert.alert("Connected", `Connected to ${device.name || "Unknown Device"}`);
    } catch (error) {
      Alert.alert("Connection Failed", "Unable to connect to the device.");
      console.error("Connection error:", error);
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: 'white', paddingHorizontal: 20 }}>
      <View style={{ height: 100 }}></View>

      {/* Request Bluetooth Permission */}
      <TouchableOpacity style={{ justifyContent: 'center', alignItems: 'center' }} onPress={() => BLEService.requestBluetoothPermission()}>
        <Text>Request Bluetooth Permission</Text>
      </TouchableOpacity>

      {/* Start BLE Scan */}
      <TouchableOpacity
        style={{ justifyContent: 'center', alignItems: 'center' }}
        onPress={() => BLEService.initializeBLE().then(() =>
          BLEService.scanDevices(addFoundDevice, null, true)
        )}>
        <Text>Start Scan</Text>
      </TouchableOpacity>

      {/* Display Found Devices */}
      <FlatList
        data={devices}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 200 }}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => connectToDevice(item)}
            style={{
              padding: 10,
              borderBottomWidth: 1,
              borderBottomColor: 'gray',
              backgroundColor: connectedDevice?.id === item.id ? 'lightgreen' : 'white'
            }}>
            <Text>{item.name || "Unknown Device"}</Text>
            <Text>{item.id}</Text>
          </TouchableOpacity>
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
