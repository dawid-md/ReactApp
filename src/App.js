import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home/Home';
import MyTasks from './pages/MyTasks/MyTasks';
import { CosmosClient } from '@azure/cosmos';
import { useEffect, useState, useCallback } from 'react';
import Panel from './components/Panel/Panel';
import { v4 as uuidv4 } from 'uuid';

const newItem = {
  project: 'MMK',
  stream: 'R2R',
  assignee: 'David Madrzyk',
  taskName: 'Do the laundry 2',
  priority: 'High',
  start: '2022-10-01',
  due: '2022-10-01',
  status: 'Not Started',
  category: 'Home',
  validator: 'John Doe',
  description: 'Do the laundry one more time 2'
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
  const [projects, setProjects] = useState([])

  const database = client.database("cctasks")
  const container = database.container("ccdb2024")

  const queryItems = useCallback(async () => {  //useCallback just for testing, doesn't need actually
    const { resources: items } = await container.items
      .query("SELECT * from c")
      .fetchAll();
      setItems(items)
      setAllProjects(items)
  }, [container.items])

  async function createItem() {
    try {
        newItem.id = uuidv4();
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
  }, [])

  const setAllProjects = (items) => {
    const allProjects = []
    console.log(items);
    items.map((item) => {
      if(allProjects.includes(item.project) === false) {
        allProjects.push(item.project)
      }
    })
    setProjects(allProjects)
  }

  return (
      <div className='App'>
      <Panel />
      <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home projects={projects} items={items} createItem={createItem} deleteItem={deleteItem} />} />
            <Route path="/mytasks" element={<MyTasks />} />
          </Routes>
      </BrowserRouter>
      {/* <button onClick={() => createItem(newItem)}>Create Item</button> */}
      </div>
  );
}

export default App;

          {/* <button onClick={queryItems}>Query Items</button>
          <button onClick={() => createItem(newItem)}>Create Item</button>
          <button onClick={() => deleteItem('')}>Delete Item</button>
          <button onClick={() => updateItem('1c62ccea-2d7a-4b91-819f-ee930a6beca3', updatedFields)}>Update Item</button> */}