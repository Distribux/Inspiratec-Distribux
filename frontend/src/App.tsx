import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from '@/components/Layout';
import Dashboard from '@/views/Dashboard';
import BatchManagement from '@/views/BatchManagement';
import SalesPredictions from '@/views/SalesPredictions';
import PriceManagement from '@/views/PriceManagement';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/lotes" element={<BatchManagement />} />
          <Route path="/ventas" element={<SalesPredictions />} />
          <Route path="/precios" element={<PriceManagement />} />
        </Routes>
      </Layout>
    </Router>
  );
}


export default App
