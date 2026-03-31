import React, { useState, useCallback } from 'react';
import {
  StyleSheet,
  View,
  FlatList,
  SafeAreaView,
  Platform,
  StatusBar,
} from 'react-native';
import { CheckBox, Input, Button, Text } from '@rneui/themed';

const defaultTasks = [
  { id: '1', description: 'Buy groceries', completed: false },
  { id: '2', description: 'Walk the dog', completed: true },
  { id: '3', description: 'Read a book', completed: false },
  { id: '4', description: 'Do laundry', completed: false },
];

export default function App() {
  const [tasks, setTasks] = useState(defaultTasks);
  const [inputText, setInputText] = useState('');

  const toggleTask = useCallback((id) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  }, []);

  const addTask = () => {
    const trimmed = inputText.trim();
    if (!trimmed) return;
    const newTask = {
      id: Date.now().toString(),
      description: trimmed,
      completed: false,
    };
    setTasks((prev) => [...prev, newTask]);
    setInputText('');
  };

  const renderItem = useCallback(({ item }) => (
    <View style={styles.taskRow}>
      <CheckBox
        checked={item.completed}
        onPress={() => toggleTask(item.id)}
        containerStyle={styles.checkbox}
      />
      <Text
        style={[
          styles.taskText,
          item.completed && styles.completedText,
        ]}
      >
        {item.description}
      </Text>
    </View>
  ), [toggleTask]);

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>
        <Text h3 style={styles.title}>
          My TODO List
        </Text>

        <View style={styles.inputRow}>
          <Input
            placeholder="Add a new task..."
            value={inputText}
            onChangeText={setInputText}
            onSubmitEditing={addTask}
            containerStyle={styles.inputContainer}
            inputStyle={styles.input}
          />
          <Button
            title="Add"
            onPress={addTask}
            buttonStyle={styles.addButton}
          />
        </View>

        <FlatList
          data={tasks}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          style={styles.list}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: '#f0f4f8',
    paddingTop: Platform.OS === 'android' ? (StatusBar.currentHeight ?? 0) : 0,
  },
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  title: {
    textAlign: 'center',
    marginBottom: 16,
    color: '#1a1a2e',
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  inputContainer: {
    flex: 1,
    paddingHorizontal: 0,
  },
  input: {
    fontSize: 16,
  },
  addButton: {
    backgroundColor: '#4a90e2',
    borderRadius: 8,
    paddingHorizontal: 20,
    marginBottom: 22,
  },
  list: {
    flex: 1,
  },
  taskRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 10,
    marginBottom: 8,
    paddingRight: 12,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  checkbox: {
    backgroundColor: 'transparent',
    borderWidth: 0,
    padding: 8,
  },
  taskText: {
    fontSize: 16,
    flex: 1,
    color: '#333',
  },
  completedText: {
    textDecorationLine: 'line-through',
    textDecorationStyle: 'solid',
    color: '#aaa',
  },
});
