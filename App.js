import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, TextInput, SafeAreaView } from "react-native";

export default function App() {
  return (
    <SafeAreaView>
      <StatusBar>
        <TextInput
          style={estilos.campo}
          // value={value}
          placeholder="Digite o nome do local"
        />
      </StatusBar>
    </SafeAreaView>
  );
}

const estilos = StyleSheet.create({
  campo: {
    flex: 1,
  },
});
