import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from '@/components/Layout';
import Dashboard from '@/views/Dashboard';
import BatchManagement from '@/views/BatchManagement';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/lotes" element={<BatchManagement />} />
        </Routes>
      </Layout>
    </Router>
  );
}


export default App
