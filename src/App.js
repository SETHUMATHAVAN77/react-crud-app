import React, { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import List from "./components/List";
import Alert from "./components/Alert";

// const getLocalStorage = () => {
// let list = localStorage.getItem("items");
// if (list) {
//   return (List = JSON.parse(localStorage.getItem("list")));
// } else {
//   return [];
// }

// };

let items = localStorage.getItem("items")
  ? JSON.parse(localStorage.getItem("items"))
  : [];

const App = () => {
  const [itemName, setItemName] = useState("");
  const [list, setList] = useState(items);
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState("");
  const [alert, SetAlert] = useState({ show: false, msg: "", type: "" });

  useEffect(() => {
    localStorage.setItem("item", JSON.stringify(list));
  }, [list]);

  const deleteItem = (id) => {
    const filteredItems = list.filter((item) => item.id !== id);
    setList(filteredItems);
  };

  const editItem = (id) => {
    const itemToEdit = list.find((item) => item.id === id);
    setIsEditing(true);
    setEditId(id);
    setItemName(itemToEdit.title);
  };

  const clearItems = () => {
    setList([]);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    if (!itemName) {
      alert("Enter A value");
    } else if (itemName && isEditing) {
      setList(
        list.map((item) => {
          if (item.id === editId) {
            return { ...item, title: itemName };
          } else {
            return item;
          }
        })
      );
      setItemName("");
      setIsEditing(false);
      setEditId("");
    } else {
      const newItem = { id: uuidv4(), title: itemName };
      setList([...list, newItem]);
      setItemName("");
      SetAlert({ show: true, msg: "Item Added SUCCESSFULLY", type: "success" });
    }
  };
  return (
    <div>
      <section className="card">
        <h3>CRUD Application</h3>
        <div className="underline"></div>
        {alert.show && <Alert {...alert} showAlert={SetAlert} />}
        <form className="grocery-form" onSubmit={submitHandler}>
          <div className="form-control">
            <input
              type="text"
              className="grocery"
              placeholder="Bananas..."
              value={itemName}
              onChange={(e) => {
                setItemName(e.target.value);
              }}
            />
            <button type="submit" className="btn">
              Submit
            </button>
          </div>
        </form>
        {list.length > 0 && (
          <div className="grocery-container">
            <List items={list} deleteItem={deleteItem} editItem={editItem} />
            <button type="button" className="clear-btn" onClick={clearItems}>
              Clear Items
            </button>
          </div>
        )}
      </section>
    </div>
  );
};

export default App;

// first get the data from the database
// validate weather data is available or not
// update database on every change in data setList
