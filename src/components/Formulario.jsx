import React, { useState, useEffect } from "react";
import {
  Modal,
  Text,
  StyleSheet,
  View,
  TextInput,
  ScrollView,
  Pressable,
  Alert,
} from "react-native";
import { DateTimePickerAndroid } from "@react-native-community/datetimepicker";

const Formulario = ({
  modalVisible,
  setTurnos,
  turnos,
  turno,
  setTurno,
  cerrarModal,
}) => {
  const [paciente, setPaciente] = useState("");
  const [id, setId] = useState("");
  const [propietario, setPropietario] = useState("");
  const [email, setEmail] = useState("");
  const [telefono, setTelefono] = useState("");
  const [date, setDate] = useState(new Date());
  const [sintomas, setSintomas] = useState("");

  useEffect(() => {
    if (Object.keys(turno).length > 0) {
      setPaciente(turno.paciente);
      setPropietario(turno.propietario);
      setEmail(turno.email);
      setTelefono(turno.telefono);
      setDate(turno.date);
      setSintomas(turno.sintomas);
      setId(turno.id);
    }
  }, [turno]);
  console.log(turno);
  const handleCita = () => {
    if ([paciente, propietario, email, date, sintomas].includes("")) {
      Alert.alert("Error", "Todos los campos sonn obligarorios");
      return;
    }

    const nuevoTurno = {
      paciente,
      propietario,
      email,
      telefono,
      date,
      sintomas,
    };

    if (id) {
      nuevoTurno.id = id;
      const pacientesActualizados = turnos.map((pacienteState) =>
        pacienteState.id === nuevoTurno.id ? nuevoTurno : pacienteState
      );
      setTurnos(pacientesActualizados);
      setTurno({});
    } else {
      nuevoTurno.id = Date.now();
      setTurnos([...turnos, nuevoTurno]);
    }

    cerrarModal();
    setId("");
    setPaciente("");
    setPropietario("");
    setEmail("");
    setTelefono("");
    setDate(new Date());
    setSintomas("");
  };

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate;
    setDate(currentDate);
  };

  const showMode = (currentMode) => {
    DateTimePickerAndroid.open({
      value: date,
      onChange,
      mode: currentMode,
      locale: "es-ES",
      is24Hour: true,
    });
  };

  const showDatepicker = () => {
    showMode("date");
  };

  const showTimepicker = () => {
    showMode("time");
  };

  return (
    <Modal animationType="slide" visible={modalVisible}>
      <View style={styles.contenido}>
        <ScrollView>
          <Text style={styles.titulo}>
            {turno.id ? "Editar" : "Nuevo"}{" "}
            <Text style={styles.tituloBold}>Turno</Text>
          </Text>

          <Pressable
            onPress={() => {
              cerrarModal();
              setTurno({});
              setPaciente("");
              setId("");
              setPropietario("");
              setEmail("");
              setTelefono("");
              setDate(new Date());
              setSintomas("");
            }}
            style={styles.btnCancelar}
          >
            <Text style={styles.btnCancelarTexto}>Volver atras</Text>
          </Pressable>

          <View style={styles.campo}>
            <Text style={styles.label}>Nombre del paciente</Text>
            <TextInput
              style={styles.input}
              placeholder="Nombre del paciente"
              placeholderTextColor={"#666"}
              value={paciente}
              onChangeText={setPaciente}
            />
          </View>
          <View style={styles.campo}>
            <Text style={styles.label}>Nombre del propietario</Text>
            <TextInput
              style={styles.input}
              placeholder="Nombre del propietario"
              placeholderTextColor={"#666"}
              value={propietario}
              onChangeText={setPropietario}
            />
          </View>
          <View style={styles.campo}>
            <Text style={styles.label}>Email</Text>
            <TextInput
              keyboardType="email-address"
              style={styles.input}
              placeholder="Email"
              placeholderTextColor={"#666"}
              value={email}
              onChangeText={setEmail}
            />
          </View>
          <View style={styles.campo}>
            <Text style={styles.label}>Telefono</Text>
            <TextInput
              keyboardType="phone-pad"
              style={styles.input}
              placeholder="Telefono"
              placeholderTextColor={"#666"}
              value={telefono}
              onChangeText={setTelefono}
              maxLength={11}
            />
          </View>
          <View style={styles.campo}>
            <Text style={styles.label}>Fecha de la consulta</Text>
            <View>
              <Pressable
                style={[styles.input, styles.date]}
                onPress={showDatepicker}
              >
                <Text>
                  {date
                    ? Object.values(date.toString().slice(0, 16))
                    : "Fecha de la cita"}
                </Text>
              </Pressable>

              <Pressable
                style={[styles.input, styles.date]}
                onPress={showTimepicker}
              >
                <Text>
                  {" "}
                  {date
                    ? Object.values(date.toString().slice(15, 21))
                    : "Fecha de la cita"}
                </Text>
              </Pressable>

              <Text style={styles.fechayhora}>
                Fecha y hora seleccionada:{" "}
                {Object.values(date.toString().slice(0, 21))}
                {" hs"}
              </Text>
            </View>
          </View>
          <View style={styles.campo}>
            <Text style={styles.label}>Sintomas paciente</Text>
            <TextInput
              style={[styles.input, styles.sintomasInput]}
              placeholder="Sintomas paciente"
              placeholderTextColor={"#666"}
              value={sintomas}
              onChangeText={setSintomas}
              multiline={true}
              numberOfLines={4}
            />
          </View>
          <Pressable onPress={() => handleCita()} style={styles.btnNuevaCita}>
            <Text style={styles.btnNuevaCitaTexto}>
              {turno.id ? "Editar turno" : "Agregar turno"}
            </Text>
          </Pressable>
        </ScrollView>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  contenido: {
    backgroundColor: "#537FE7",
    flex: 1,
  },
  titulo: {
    fontSize: 30,
    fontWeight: "600",
    textAlign: "center",
    marginTop: 30,
    color: "#181823",
  },
  tituloBold: {
    fontWeight: "900",
  },
  btnCancelar: {
    marginVertical: 30,
    backgroundColor: "#E9F8F9",
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
  btnCancelarTexto: {
    color: "#181823",
    textAlign: "center",
    fontWeight: "900",
    fontSize: 14,
    textTransform: "uppercase",
  },
  campo: {
    marginTop: 10,
    marginHorizontal: 30,
  },
  label: {
    color: "#000000",
    marginBottom: 10,
    marginTop: 15,
    fontSize: 18,
    fontWeight: "600",
  },
  input: {
    backgroundColor: "#fff",
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
  sintomasInput: {
    textAlignVertical: "top",
    height: 100,
    marginBottom: 10,
  },
  date: {
    marginTop: 10,
  },
  fechayhora: {
    textAlign: "center",
    color: "#C0EEF2",
    marginTop: 10,
    fontSize: 15,
    backgroundColor: "#000000",
    borderRadius: 10,
    padding: 5,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,

    elevation: 10,
  },
  btnNuevaCita: {
    marginVertical: 50,
    backgroundColor: "#F8F988",
    paddingVertical: 15,
    marginHorizontal: 30,
    borderRadius: 10,
    borderColor: "#000",
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
  btnNuevaCitaTexto: {
    textAlign: "center",
    color: "#181823",
    textTransform: "uppercase",
    fontWeight: "700",
  },
});
export default Formulario;
