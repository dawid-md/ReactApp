import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home/Home';
import MyTasks from './pages/MyTasks/MyTasks';
import { CosmosClient } from '@azure/cosmos';
import { useEffect, useState, useCallback } from 'react';

const newItem = {
  name: 'Do the laundry',
  assignedTo: 'John Doe',
}

const updatedFields = {
  id: '232',
  name: 'Do the bjork',
  assignedTo: 'Jane'
}

function App() {
  const endpoint = process.env.REACT_APP_COSMOS_ENDPOINT
  const key = process.env.REACT_APP_COSMOS_KEY
  const client = new CosmosClient({ endpoint, key })
  const [items, setItems] = useState([])

  const database = client.database("cctasks")
  const container = database.container("ccdb2024")

  const queryItems = useCallback(async () => {
    const { resources: items } = await container.items
      .query("SELECT * from c")
      .fetchAll();
      setItems(items)
      console.log(items)
  }, [container.items])

  async function createItem(newItem) {
    try {
        const { resource: createdItem } = await container.items.create(newItem);
        setItems(prevItems => [...prevItems, createdItem]);
    } catch (error) {
        console.error('Error adding new item:', error);
    }
  }

  async function updateItem(itemId, updatedFields) {
    try {
        const { resource: updatedItem } = await container.item(itemId).replace(updatedFields);
        setItems(prevItems => prevItems.map(item => item.id === itemId ? updatedItem : item));
    } catch (error) {
        console.error('Error updating item:', error);
    }
  } 

  async function deleteItem(itemId) {
    try {
        await container.item(itemId).delete();
        setItems(prevItems => prevItems.filter(item => item.id !== itemId));
    } catch (error) {
        console.error('Error deleting item:', error);
    }
  }

  useEffect(() => {
    queryItems()
  }, [queryItems])

  return (
      <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home items={items} />} />
            <Route path="/mytasks" element={<MyTasks />} />
          </Routes>
          <button onClick={queryItems}>Query Items</button>
          <button onClick={() => createItem(newItem)}>Create Item</button>
          <button onClick={() => deleteItem('01')}>Delete Item</button>
          <button onClick={() => updateItem('1c62ccea-2d7a-4b91-819f-ee930a6beca3', updatedFields)}>Update Item</button>
      </BrowserRouter>
  );
}

export default App;
