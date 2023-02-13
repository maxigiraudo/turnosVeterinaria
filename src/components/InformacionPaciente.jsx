import React from "react";
import { Pressable, Text, View, StyleSheet } from "react-native";

const InformacionPaciente = ({ turno, setModalPaciente, setTurno }) => {
  console.log(turno);
  return (
    <View style={styles.contenedor}>
      <Text style={styles.titulo}>
        Información del <Text style={styles.tituloBold}>Turno</Text>
      </Text>
      <View>
        <Pressable
          style={styles.btnCancelar}
          onPress={() => {
            setModalPaciente(false);
            setTurno({});
          }}
        >
          <Text style={styles.btnCancelarTexto}>Cerrar</Text>
        </Pressable>
      </View>
      <View style={styles.contenedorPaciente}>
        <View style={styles.campo}>
          <Text style={styles.nombreBold}>Propietario:</Text>
          <Text style={styles.nombre}>{turno.propietario}</Text>
        </View>
        <View style={styles.campo}>
          <Text style={styles.nombreBold}>Paciente:</Text>
          <Text style={styles.nombre}>{turno.paciente}</Text>
        </View>
        <View style={styles.campo}>
          <Text style={styles.nombreBold}>Email:</Text>
          <Text style={styles.nombre}>{turno.email}</Text>
        </View>
        <View style={styles.campo}>
          <Text style={styles.nombreBold}>Teléfono:</Text>
          <Text style={styles.nombre}>{turno.telefono}</Text>
        </View>
        <View style={styles.campo}>
          <Text style={styles.nombreBold}>Fecha del turno: </Text>
          <Text style={styles.nombre}>
            {Object.values(turno.date.toString().slice(3, 16))}
          </Text>
        </View>
        <View style={styles.campo}>
          <Text style={styles.nombreBold}>Síntomas:</Text>
          <Text style={styles.nombre}>{turno.sintomas}</Text>
        </View>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  contenedor: {
    backgroundColor: "#E9F8F9",
    flex: 1,
  },
  titulo: {
    fontSize: 30,
    fontWeight: "600",
    textAlign: "center",
    marginTop: 30,
    color: "#000000",
  },
  tituloBold: {
    fontWeight: "900",
  },
  btnCancelar: {
    marginVertical: 30,
    backgroundColor: "#000",
    padding: 15,
    marginTop: 30,
    marginHorizontal: 20,
    borderRadius: 10,
    borderWidth: 1,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,

    elevation: 10,
  },
  btnCancelarTexto: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "900",
    fontSize: 14,
    textTransform: "uppercase",
  },
  contenedorPaciente: {
    backgroundColor: "#fff",
    marginHorizontal: 30,
    padding: 12,
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
  nombreBold: {
    textTransform: "uppercase",
    fontWeight: "600",
    color: "#537FE7",
    fontSize: 12,
  },
  nombre: {
    color: "#000",
    fontWeight: "700",
    fontSize: 15,
    color: "#334155",
  },
  contenedorContacto: {
    padding: 15,
  },
  contenido: {
    textAlign: "center",
  },
  campo: {
    marginBottom: 10,
  },
});

export default InformacionPaciente;
