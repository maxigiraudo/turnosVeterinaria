import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Pressable,
  FlatList,
  Alert,
  Modal,
} from "react-native";
import Formulario from "./src/components/Formulario";
import InformacionPaciente from "./src/components/InformacionPaciente";
import Paciente from "./src/components/Paciente";

const App = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [turnos, setTurnos] = useState([]);
  const [turno, setTurno] = useState({});
  const [modalPaciente, setModalPaciente] = useState(false);

  const pacienteEditar = (id) => {
    const pacienteEditar = turnos.filter((turno) => turno.id === id);
    setTurno(pacienteEditar[0]);
  };

  const pacienteEliminar = (id) => {
    Alert.alert(
      "¿Deseas eliminar este turno?",
      "Un turno eliminado no se puede recuperar",
      [
        { text: "Cancelar" },
        {
          text: "Si, eliminar",
          onPress: () => {
            const pacientesActualizados = turnos.filter(
              (pacientesState) => pacientesState.id !== id
            );
            setTurnos(pacientesActualizados);
          },
        },
      ]
    );
  };

  const cerrarModal = () => {
    setModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Central de Turnos</Text>
      <Text style={styles.tituloBold}>Veterinaria</Text>
      <Pressable
        style={styles.btnNuevaCita}
        onPress={() => {
          setModalVisible(true);
        }}
      >
        <Text style={styles.btnTextoNuevaCita}>Nuevo Turno</Text>
      </Pressable>

      {turnos.length === 0 ? (
        <Text style={styles.noTurnos}>No hay turnos pendientes</Text>
      ) : (
        <FlatList
          style={styles.listado}
          data={turnos}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => {
            return (
              <Paciente
                item={item}
                pacienteEditar={pacienteEditar}
                pacienteEliminar={pacienteEliminar}
                setModalVisible={setModalVisible}
                setModalPaciente={setModalPaciente}
                setTurno={setTurno}
              />
            );
          }}
        />
      )}
      {modalVisible && (
        <Formulario
          cerrarModal={cerrarModal}
          setTurnos={setTurnos}
          turnos={turnos}
          turno={turno}
          setTurno={setTurno}
        />
      )}

      <Modal visible={modalPaciente} animationType="fade">
        <InformacionPaciente
          setModalPaciente={setModalPaciente}
          turno={turno}
          setTurno={setTurno}
        />
      </Modal>
      <StatusBar style="auto" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 40,
    flex: 1,
    backgroundColor: "#E9F8F9",
  },
  titulo: {
    textAlign: "center",
    fontSize: 20,
    color: "#181823",
    fontWeight: "600",
    textTransform: "uppercase",
  },

  tituloBold: {
    fontSize: 20,
    fontWeight: "900",
    color: "#537FE7",
    textAlign: "center",
  },

  btnNuevaCita: {
    backgroundColor: "#537FE7",
    padding: 15,
    marginTop: 30,
    marginHorizontal: 20,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,

    elevation: 10,
  },
  btnTextoNuevaCita: {
    textAlign: "center",
    color: "#fff",
    fontSize: 18,
    fontWeight: "900",
    textTransform: "uppercase",
    fontSize: 16,
  },
  noTurnos: {
    marginTop: 40,
    textAlign: "center",
    fontSize: 20,
    fontWeight: "600",
  },
  listado: {
    marginTop: 50,
    marginHorizontal: 30,
  },
});

export default App;
