import React from "react";
import { Text, View, StyleSheet, Pressable } from "react-native";

const Paciente = ({
  item,
  setModalVisible,
  pacienteEditar,
  pacienteEliminar,
  setModalPaciente,
  setTurno,
}) => {
  const { paciente, date, id } = item;
  return (
    <Pressable
      onPress={() => {
        setModalPaciente(true);
        setTurno(item);
      }}
    >
      <View style={styles.contenedor}>
        <Text style={styles.label}>Turno</Text>
        <Text style={styles.texto}>{paciente}</Text>
        <Text style={styles.fecha}>{date.toString().slice(3, 16)}</Text>

        <View style={styles.contenedorBotones}>
          <Pressable
            onPress={() => {
              setModalVisible(true);
              pacienteEditar(id);
            }}
            style={[styles.btn, styles.btnEditar]}
          >
            <Text style={styles.btnTexto}>Editar</Text>
          </Pressable>
          <Pressable
            onPress={() => pacienteEliminar(id)}
            style={[styles.btn, styles.btnEliminar]}
          >
            <Text style={styles.btnTexto}>Eliminar</Text>
          </Pressable>
        </View>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  contenedor: {
    backgroundColor: "#fff",
    padding: 20,
    borderBottomColor: "#94a3b8",
    borderBottomWidth: 1,
  },
  label: {
    color: "#181823",
    textTransform: "uppercase",
    fontWeight: "700",
    marginBottom: 10,
  },
  texto: {
    color: "#537FE7",
    fontSize: 24,
    fontWeight: "700",
    marginBottom: 10,
  },
  fecha: {
    color: "#537FE7",
  },
  contenedorBotones: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
  btn: {
    paddingVertical: 5,
    paddingHorizontal: 20,
    borderRadius: 5,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,

    elevation: 10,
  },
  btnEditar: {
    backgroundColor: "#14C38E",
  },
  btnEliminar: {
    backgroundColor: "#DC0000",
  },
  btnTexto: {
    textTransform: "uppercase",
    fontWeight: "700",
    fontSize: 12,
    color: "#fff",
  },
});

export default Paciente;
