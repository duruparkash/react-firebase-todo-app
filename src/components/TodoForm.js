import { useState, useEffect } from "react";
import { Form, Input, Button, Select, message } from "antd";
import {
  collection,
  addDoc,
  updateDoc,
  doc,
} from "firebase/firestore";
import { db } from "../firebase";


const { TextArea } = Input;

function TodoForm({ getTodos, editTodo, setEditTodo }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("Pending");

  const todoCollection = collection(db, "todos");

  useEffect(() => {
    if (editTodo) {
      setTitle(editTodo.title);
      setDescription(editTodo.description);
      setStatus(editTodo.status);
    }
  }, [editTodo]);

  const handleSubmit = async () => {
    if (!title || !description) {
      alert("Please fill all fields");
      return;
    }

    try {
      if (editTodo) {
        await updateDoc(doc(db, "todos", editTodo.id), {
          title,
          description,
          status,
        });

        message.success("Todo Updated Successfully!");

        setEditTodo(null);
      } else {
        await addDoc(todoCollection, {
          title,
          description,
          status,
        });

        message.success("Todo Added Successfully!");
      }

      setTitle("");
      setDescription("");
      setStatus("Pending");

      await getTodos();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Form layout="vertical">
      <Form.Item label="Title">
        <Input
          placeholder="Enter title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </Form.Item>

      <Form.Item label="Description">
        <TextArea
          rows={4}
          placeholder="Enter description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </Form.Item>

      <Form.Item label="Status">
        <Select
          value={status}
          onChange={(value) => setStatus(value)}
          options={[
            {
              value: "Pending",
              label: "Pending",
            },
            {
              value: "Completed",
              label: "Completed",
            },
          ]}
        />
      </Form.Item>

      <Button type="primary" onClick={handleSubmit}>
        {editTodo ? "Update Todo" : "Add Todo"}
      </Button>
    </Form>
  );
}

export default TodoForm;