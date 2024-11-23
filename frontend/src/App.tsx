import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from '@/components/Layout';
import Dashboard from '@/views/Dashboard';
import BatchManagement from '@/views/BatchManagement';
import SalesPredictions from './views/SalesPredictions';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/lotes" element={<BatchManagement />} />
          <Route path="/ventas" element={<SalesPredictions />} />
        </Routes>
      </Layout>
    </Router>
  );
}


export default App
