// src/App.jsx
import Navbar from './components/Navbar';
import { TableList } from './components/TableList';

function App() {
  return (
    <>
      <Navbar />
      <div className="pt-16"> 
        <TableList />
      </div>
    </>
  );
}

export default App;