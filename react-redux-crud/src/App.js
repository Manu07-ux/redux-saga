import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchItems, addItem, updateItem, deleteItem, setItems } from './actions';
import './App.css';

const App = () => {
  const dispatch = useDispatch();
  const items = useSelector((state) => state.items);
  const [newItem, setNewItem] = useState("");
  const [editItem, setEditItem] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const data = dispatch(fetchItems());
      dispatch(setItems(data));
    };
    fetchData();
  }, [dispatch]);

  const handleAddItem = async () => {
    dispatch(addItem({ text: newItem }));
    const newData = dispatch(fetchItems());
    dispatch(setItems(newData));
    setNewItem('');
  };

  const handleEdit = (id, text) => {
    setEditItem(id);
    setNewItem(text);
  };

  const handleUpdateItem = async () => {
    dispatch(updateItem({ id: editItem, text: newItem }));
    const newData = dispatch(fetchItems());
    dispatch(setItems(newData));
    setNewItem('');
    setEditItem(null);
  };

  const handleDelete = async (id) => {
    dispatch(deleteItem(id));
    const newData = items.filter(item => item.id !== id);
    dispatch(setItems(newData));
  };

  console.log(items);

  return (
    <div className="container">
      <h1>Manav</h1>
      <div className="input-container">
        <input
          type="text"
          value={newItem}
          onChange={(e) => setNewItem(e.target.value)}
          placeholder="Enter a new item"
        />
        {editItem ? (
          <button onClick={handleUpdateItem}>Update Item</button>
        ) : (
          <button onClick={handleAddItem}>Add Item</button>
        )}
      </div>
      <ul className="item-list">
        {items.map((item) => (
          <li key={item.id} className="list-item">
            <span>{item.text}</span>
            <div className="button-container">
              <button onClick={() => handleEdit(item.id, item.text)}>
                Edit
              </button>
              <button onClick={() => handleDelete(item.id)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
