import React, { useState, useEffect } from "react";
import { RiCloseCircleLine } from "react-icons/ri";
import { TiEdit } from "react-icons/ti";

function Text() {
  const [list, setList] = useState(() => {
    const storedList = localStorage.getItem("todoList");
    return storedList ? JSON.parse(storedList) : [];
  });
  const [message, setMessage] = useState({
    text: "",
    id: "",
  });
  const [editingitem, setEditingItem] = useState({
    id: "",
    isEditing: false,
  });

  useEffect(() => {
    localStorage.setItem("todoList", JSON.stringify(list));
  }, [list]);

  const messageHandler = (e) => {
    setMessage({ ...message, text: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let newTodo = {
      text: message.text,
      id: new Date().getTime().toString(),
    };
    setList([...list, newTodo]);
    setMessage({
      text: "",
      id: "",
    });
  };

  const handleDelete = (id) => {
    let newTodos = list.filter((eachItem) => {
      return eachItem.id !== id;
    });
    setList(newTodos);
  };

  const changeEdit = (id) => {
    setEditingItem({
      ...editingitem,
      id: id,
      isEditing: true,
    });
    let editableItem = list.find((eachItem) => eachItem.id === id);
    setMessage({
      ...message,
      text: editableItem.text,
      id: editableItem.id,
    });
  };

  const handleEditItem = (e) => {
    e.preventDefault();
    let newTodos = list.map((eachItem) => {
      if (eachItem.id === editingitem.id) {
        return {
          text: message.text,
          id: editingitem.id,
        };
      } else {
        return eachItem;
      }
    });
    setList(newTodos);
    setMessage({
      text: "",
      id: "",
    });
    setEditingItem({
      id: "",
      isEditing: false,
    });
  };

  return (
    <div>
      <h1>Todo List</h1>
      <form>
        <input
          type="text"
          name="message"
          id="message"
          placeholder="Enter Some Text"
          value={message.text}
          onChange={messageHandler}
        />
        {editingitem.isEditing ? (
          <button type="submit" onClick={handleEditItem} className="add-btn">
            Save
          </button>
        ) : (
          <button type="submit" onClick={handleSubmit} className="add-btn">
            Add
          </button>
        )}
      </form>
      <hr />
      {list.length === 0 && <h4>There are no items in the list</h4>}
      <ul>
        {list.map((eachItem) => {
          const { text, id } = eachItem;
          return (
            <li key={id} className="lists">
              <div className="icons">
                <div className="icon-text">
                  <p>{text}</p>
                </div>
                <div className="icon-btn">
                  <button onClick={() => changeEdit(id)}>
                    <TiEdit className="edit-icon" />
                  </button>
                  <button
                    onClick={() => handleDelete(id)}
                    className="delete-icon"
                  >
                    <RiCloseCircleLine />
                  </button>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default Text;
