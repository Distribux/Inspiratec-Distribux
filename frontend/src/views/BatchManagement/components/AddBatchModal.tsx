import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useBatchStore } from '@/store/batchStore';
import { 
  Select, 
  SelectContent, 
  SelectGroup, 
  SelectItem, 
  SelectLabel, 
  SelectTrigger, 
  SelectValue
} from '@/components/ui/select';
import { DigemidProduct } from '@/types/entities';
import { AddBatchModalProps, CreateBatchFormData } from '../interfaces';

const emptyBatch = {
  batchNumber: '',
  digemidProductId: '',
  productName: '',
  manufacterName: '',
  expirationDate: '',
  healthRegistration: '',
  quantity: 0,
  category: '',
  class: '',
  protocolUrl: '',
};

const AddBatchModal = ({ open, onClose }: AddBatchModalProps) => {
  const { products, loading, addBatch, findProduct, clearFindProductResults } = useBatchStore();
  const [formData, setFormData] = React.useState<CreateBatchFormData>(emptyBatch);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addBatch({
      ...formData,
    });
    onClose();
    setFormData(emptyBatch);
  };

  const handleProductChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setFormData({ ...formData, healthRegistration: value });
    clearFindProductResults();
    if (value.length !== 7) return;
    findProduct(value);
  }

  const handleSelectProduct = (product: DigemidProduct) => {
    setFormData({
      ...formData,
      healthRegistration: product.healthRegistration,
      manufacterName: product.manufacterName,
      digemidProductId: product.id,
      productName: product.name,
      quantity: formData.quantity,
    });
    clearFindProductResults();
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Agregar Nuevo Lote</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="healthRegistration">Registro sanitario</Label>
            <Input
              id="healthRegistration"
              value={formData.healthRegistration}
              onChange={handleProductChange}
              required
            />

            {loading && (
              <p className="text-sm text-gray-500">Buscando productos...</p>
            )}

            {!loading && products.length > 0 && (
              <div className="absolute z-10 w-full bg-white rounded-md shadow-lg border mt-1 max-h-60 overflow-y-auto">
                {products.map((product) => (
                  <div
                    key={product._id}
                    className="p-2 hover:bg-gray-100 cursor-pointer"
                    onClick={() => handleSelectProduct(product)}
                  >
                    <div className="font-medium">{product.name}</div>
                    <div className="text-sm text-gray-600">
                      {product.id} - {product.manufacterName}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="name">Nombre de producto</Label>
            <Input
              id="name"
              value={formData.productName}
              onChange={(e) => setFormData({ ...formData, productName: e.target.value })}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="manufacterName">Laboratorio</Label>
            <Input
              id="manufacterName"
              value={formData.manufacterName}
              onChange={(e) => setFormData({ ...formData, manufacterName: e.target.value })}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="batchNumber">Número de Lote</Label>
            <Input
              id="batchNumber"
              value={formData.batchNumber}
              onChange={(e) => setFormData({ ...formData, batchNumber: e.target.value })}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="expirationDate">Fecha de Vencimiento</Label>
            <Input
              id="expirationDate"
              type="date"
              value={formData.expirationDate}
              onChange={(e) => setFormData({ ...formData, expirationDate: e.target.value })}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="quantity">Cantidad</Label>
            <Input
              id="quantity"
              type="number"
              value={formData.quantity}
              onChange={(e) => setFormData({ ...formData, quantity: Number(e.target.value) })}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="protocolUrl">Protocolo</Label>
            <Input
              id="protocolUrl"
              value={formData.protocolUrl}
              onChange={(e) => setFormData({ ...formData, protocolUrl: e.target.value })}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="category">Categoria</Label>
            <Select onValueChange={(e) => setFormData({ ...formData, category: e })}>
              <SelectTrigger>
                <SelectValue placeholder="Selecciona una categoria" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Categoria</SelectLabel>
                  <SelectItem value="GENERICO">Genérico</SelectItem>
                  <SelectItem value="COMERCIAL">Comercial</SelectItem>
                  <SelectItem value="CONTROLADO">Controlado</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <div className="flex justify-end space-x-2">
            <Button variant="outline" onClick={onClose}>
              Cancelar
            </Button>
            <Button type="submit">
              Guardar
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddBatchModal;
