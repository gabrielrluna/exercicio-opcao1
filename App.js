import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  Button,
  TextInput,
  SafeAreaView,
} from "react-native";

export default function App() {
  return (
    <SafeAreaView>
      <StatusBar>
        <TextInput
          style={estilos.nomeLocal}
          // value={value}
          placeholder="Digite o nome do local"
        />

        <Button style={estilos.botaoFoto} />

        <Button style={estilos.botaoMapa} />
      </StatusBar>
    </SafeAreaView>
  );
}

const estilos = StyleSheet.create({
  campo: {
    flex: 1,
  },
});
