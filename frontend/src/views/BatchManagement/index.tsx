import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { 
  Card, 
  CardContent, 
  CardHeader, 
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';
import { Batch } from './interfaces';

const batches: Batch[] = [
  {
    _id: '1',
    productName: 'Paracetamol',
    manufacterName: 'Bayer',
    batchNumber: '123456',
    expirationDate: '12/12/2022',
    healthRegistration: '123456',
    quantity: 1000,
    category: 'medicamento',
    protocolUrl: 'https://www.google.com'
  },
  {
    _id: '2',
    productName: 'Ibuprofeno',
    manufacterName: 'Bayer',
    batchNumber: '123456',
    expirationDate: '12/12/2022',
    healthRegistration: '123456',
    quantity: 1000,
    category: 'medicamento',
    protocolUrl: 'https://www.google.com'
  }
];

const BatchManagement = () => {
  return (
    <div className="p-6 space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center space-x-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Buscar por producto o lote"
                className="pl-9"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>PRODUCTO</TableHead>
                <TableHead>LABORATORIO</TableHead>
                <TableHead>LOTE</TableHead>
                <TableHead>FECHA DE VENCIMIENTO</TableHead>
                <TableHead>RSN</TableHead>
                <TableHead>CANTIDAD</TableHead>
                <TableHead>CATEGORIA</TableHead>
                <TableHead>PROTOCOLO</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {batches.map((batch) => (
                <TableRow key={batch._id}>
                  <TableCell className="font-medium">{batch.productName}</TableCell>
                  <TableCell>{batch.manufacterName}</TableCell>
                  <TableCell>{batch.batchNumber}</TableCell>
                  <TableCell>{batch.expirationDate}</TableCell>
                  <TableCell>{batch.healthRegistration}</TableCell>
                  <TableCell>{batch.quantity.toLocaleString()}</TableCell>
                  <TableCell>{batch.category.toUpperCase()}</TableCell>
                  <TableCell>
                    <a href={batch.protocolUrl} target="_blank" rel="noreferrer" className='text-blue-500 hover:underline'>
                      Ver protocolo
                    </a>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default BatchManagement;
