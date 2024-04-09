import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home/Home';
import MyTasks from './pages/MyTasks/MyTasks';
import { CosmosClient } from '@azure/cosmos';

function App() {
  console.log("hello");
  const endpoint = process.env.REACT_APP_COSMOS_ENDPOINT;
  console.log(endpoint);
  const key = process.env.REACT_APP_COSMOS_KEY;
  console.log(key);
  const client = new CosmosClient({ endpoint, key });

  const database = client.database("cctasks");
  const container = database.container("ccdb2024");

  // Example function to query items
  async function queryItems() {
    const { resources: items } = await container.items
      .query("SELECT * from c")
      .fetchAll();
    console.log(items);
  }

  queryItems();

  return (
    <div className="App">
      <BrowserRouter>
        <div className="page-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/mytasks" element={<MyTasks />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
