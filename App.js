import { StatusBar } from "expo-status-bar";
import {
  SafeAreaView,
  TextInput,
  StyleSheet,
  Image,
  View,
  Button,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { useState, useEffect } from "react";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function ImagePickerExample() {
  //UseState usado para a parte da localização
  const [minhaLocalizacao, setMinhaLocalizacao] = useState(null);
  const [statusLocation, requestPermissionLocation] =
    Location.useForegroundPermissions();

  //UseState usado para a parte da foto
  const [statusCamera, requestPermissionCamera] =
    ImagePicker.useCameraPermissions();
  const [foto, setFoto] = useState();

  useEffect(() => {
    async function verificaPermissoes() {
      const cameraStatus = await ImagePicker.requestCameraPermissionsAsync();
      requestPermissionCamera(cameraStatus === "granted");

      const { locationStatus } =
        await Location.requestForegroundPermissionsAsync();
      requestPermissionLocation(locationStatus === "granted");

      // let localizacaoAtual = await Location.getCurrentPositionAsync({});
      Location.getCurrentPositionAsync({}).then((localizacaoAtual) => {
        // console.log("Status: " + locationStatus);
        console.log(localizacaoAtual);
        setMinhaLocalizacao(localizacaoAtual);
      });
    }

    verificaPermissoes();
  }, []);

  const acessarCamera = async () => {
    const imagem = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [10, 10],
      quality: 0.5,
    });
    console.log(imagem);
    setFoto(imagem.assets[0].uri);
  };

  const regiaoInicial = {
    // Estado de SP
    latitude: -23.533773,
    longitude: -46.65529,
    latitudeDelta: 10,
    longitudeDelta: 10,
  };

  const [localizacao, setLocalizacao] = useState();

  const marcarLocal = (event) => {
    setLocalizacao({
      latitudeDelta: 0.0122,
      longitudeDelta: 0.021,
      latitude: minhaLocalizacao.coords.latitude,
      longitude: minhaLocalizacao.coords.longitude,
    });
  };

  const salvarInfos = async () => {
    try {
      await AsyncStorage.setItem(
        "minhaLocalizacao",
        JSON.stringify({ minhaLocalizacao, foto })
      );
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <SafeAreaView style={estilos.container}>
      <TextInput
        style={estilos.nomeLocal}
        // value={value}
        placeholder="Digite o nome do local"
      />
      <View style={estilos.viewFoto}>
        {foto && (
          <Image source={{ uri: foto }} style={{ width: 200, height: 200 }} />
        )}
      </View>
      <Button
        title="Tirar Foto"
        style={estilos.botaoFoto}
        onPress={acessarCamera}
      />
      <View style={estilos.viewMapa}>
        <MapView
          style={estilos.mapa}
          region={regiaoInicial}
          liteMode={false}
          mapType="standard"
        >
          {localizacao && (
            <Marker
              coordinate={localizacao}
              title="Aqui!!!"
              onPress={(e) => console.log(e.nativeEvent)}
            />
          )}
        </MapView>
      </View>
      <View>
        {minhaLocalizacao && (
          <Button
            onPress={marcarLocal}
            title="Achar minha localização"
            style={estilos.botaoMapa}
          />
        )}
      </View>

      <Button title="Salvar Informações" onPress={salvarInfos} />
      <Button title="Locais Visitados" />
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}

const estilos = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 5,
  },
  nomeLocal: { borderWidth: 1, width: "70%" },
  botaoFoto: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 5,
  },
  botaoLocal: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 5,
  },
  viewFoto: {
    height: 200,
    width: 200,
    alignItems: "center",
    borderColor: "black",
    borderWidth: 1,
  },
  mapa: {
    height: 200,
    width: 200,
    alignItems: "center",
    borderColor: "black",
    borderWidth: 1,
  },
});
