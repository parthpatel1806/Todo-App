import React, { useState } from "react";
import { View, Text, TextInput, FlatList, TouchableOpacity, StyleSheet } from "react-native";
import { Switch } from "react-native"; // Use Switch component instead of CheckBox
import MaterialIcons from "react-native-vector-icons/MaterialIcons";  // Correct icon import

// Define task structure
interface Task {
  id: string;
  title: string;
  status: "due" | "done";
}

const App: React.FC = () => {
  const [task, setTask] = useState<string>("");
  const [tasks, setTasks] = useState<Task[]>([]);

  // Function to add a new task
  const addTask = () => {
    if (task.trim() === "") return;
    const newTask: Task = { id: Date.now().toString(), title: task, status: "due" };
    setTasks((prevTasks) => [...prevTasks, newTask]);
    setTask(""); // Clear the input field
  };

  // Function to toggle task status
  const toggleStatus = (id: string) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id
          ? { ...task, status: task.status === "due" ? "done" : "due" }
          : task
      )
    );
  };

  // Function to delete a task
  const deleteTask = (id: string) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>To-Do App</Text>

      {/* Input and Add Button */}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Enter task title"
          value={task}
          onChangeText={setTask}
        />
        <TouchableOpacity
          style={[styles.addButton, task.trim() === "" && styles.disabled]}
          disabled={task.trim() === ""}
          onPress={addTask}
        >
          <Text style={styles.addButtonText}>ADD</Text>
        </TouchableOpacity>
      </View>

      {/* Task List */}
      <FlatList
        data={tasks}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.taskCard}>
            <Switch
              value={item.status === "done"} // Switch is ON if status is "done"
              onValueChange={() => toggleStatus(item.id)} // Toggle status when clicked
            />
            <Text style={[styles.taskText, item.status === "done" && styles.completed]}>
              {item.title}
            </Text>
            <TouchableOpacity onPress={() => deleteTask(item.id)}>
              <MaterialIcons name="delete" size={24} color="red" />
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
};

// Styles
const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#f5f5f5" },
  title: { fontSize: 24, fontWeight: "bold", textAlign: "center", marginBottom: 10 },
  inputContainer: { flexDirection: "row", marginBottom: 10 },
  input: { flex: 1, borderWidth: 1, borderColor: "#ddd", padding: 10, borderRadius: 5 },
  addButton: { backgroundColor: "#007BFF", padding: 10, borderRadius: 5, marginLeft: 5 },
  addButtonText: { color: "#fff", fontWeight: "bold" },
  disabled: { backgroundColor: "#ccc" },
  taskCard: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    backgroundColor: "#fff",
    marginVertical: 5,
    borderRadius: 5,
  },
  taskText: { flex: 1, fontSize: 16 },
  completed: { textDecorationLine: "line-through", color: "gray" },
});

export default App;
