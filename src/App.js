import { useEffect, useState } from "react";
import { Card, Table, Popconfirm } from "antd";
import {
  collection,
  getDocs,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { db } from "./firebase";
import TodoForm from "./components/TodoForm";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";

function App() {
  const [todos, setTodos] = useState([]);
  const [editTodo, setEditTodo] = useState(null);

  const getTodos = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "todos"));

      const todoList = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setTodos(todoList);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getTodos();
  }, []);

  const deleteTodo = async (id) => {
    try {
      await deleteDoc(doc(db, "todos", id));
      getTodos();
    } catch (error) {
      console.log(error);
    }
  };

  const columns = [
    {
      title: "Title",
      dataIndex: "title",
    },
    {
      title: "Description",
      dataIndex: "description",
    },
    {
      title: "Status",
      dataIndex: "status",
    },
    {
      title: "Actions",
      render: (_, record) => (
        <>
          <EditOutlined
            style={{
              color: "blue",
              cursor: "pointer",
              marginRight: 20,
              fontSize: 18,
            }}
            onClick={() => setEditTodo(record)}
          />

          <Popconfirm
            title="Delete Todo?"
            onConfirm={() => deleteTodo(record.id)}
          >
            <DeleteOutlined
              style={{
                color: "red",
                cursor: "pointer",
                fontSize: 18,
              }}
            />
          </Popconfirm>
        </>
      ),
    },
  ];

  return (
    <div style={{ width: "80%", margin: "20px auto" }}>
      <Card title="React Firebase Todo App">
        <TodoForm
          getTodos={getTodos}
          editTodo={editTodo}
          setEditTodo={setEditTodo}
        />
      </Card>

      <h2>Todos</h2>

      <Table
        columns={columns}
        dataSource={todos}
        rowKey="id"
        pagination={false}
      />
    </div>
  );
}

export default App;