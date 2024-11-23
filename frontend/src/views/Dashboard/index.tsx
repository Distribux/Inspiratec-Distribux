import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, ChevronDown } from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ComposedChart,
  Line,
  Treemap,
  ResponsiveContainer
} from 'recharts';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { ProductData, StockData } from "./interfaces";

const monthlyData: StockData[] = [
  { month: 'Diciembre', year: 2022, value: 125.64 },
  { month: 'Enero', year: 2023, value: 109.78 },
  { month: 'Febrero', year: 2023, value: 87.09 },
  { month: 'Marzo', year: 2023, value: 73.79 },
  { month: 'Abril', year: 2023, value: 56.81 },
  { month: 'Mayo', year: 2023, value: 42.01 },
  { month: 'Junio', year: 2023, value: 27.99 },
  { month: 'Julio', year: 2023, value: 21.34 },
  { month: 'Agosto', year: 2023, value: 8.80 }
];

const topProducts: ProductData[] = [
  { name: 'EPINEFRINA 1 MG/ML...', value: 187.33, subClass: 'VERDE' },
  { name: 'SULFAMETOXAZOL + TRI...', value: 174.70, subClass: 'AMARILLO' },
  { name: 'HEPAXODAN X 48 TABLET...', value: 172.17, subClass: 'VERDE' },
  { name: 'FUROSEMIDA 20MG/2ML...', value: 169.50, subClass: 'DIPERU' },
  { name: 'BISMUTOL CAJA X 160 TA...', value: 165.90, subClass: 'NARANJA' }
];

const bottomProducts: ProductData[] = [
  { name: 'ALPRAZOLAM 0.5 MG T...', value: 1.50, subClass: 'AMARILLO' },
  { name: 'AMBROXOL + AMOXICI...', value: 1.50, subClass: 'AMARILLO' },
  { name: 'AMOXICILINA + ACIDO...', value: 1.50, subClass: 'DIPERU' },
  { name: 'DEFLAZACORT 30MG C...', value: 1.50, subClass: 'VERDE' },
  { name: 'DEXAMETASONA 4MG...', value: 1.50, subClass: 'VERDE' }
];

const stockByClass = [
  { name: 'MEDICINAS', count: 25000, average: 100 },
  { name: 'GENERAL', count: 5000, average: 95 },
  { name: 'PERFUMERIA', count: 2000, average: 80 },
  { name: 'ALIMENTOS', count: 1000, average: 70 }
];

const subClassData = [
  { name: 'VERDE', value: 104.35 },
  { name: 'NARANJA', value: 103.65 },
  { name: 'ESTERIL', value: 100.32 },
  { name: 'DIPERU', value: 99.64 },
  { name: 'AMARILLO', value: 91.19 },
  { name: 'ROJO', value: 72.22 }
];

const InventoryDashboard = () => {
  const [dateRange, setDateRange] = React.useState<[Date | undefined, Date | undefined]>([
    new Date(2023, 0, 2),
    new Date(2023, 2, 23),
  ]);
  const [isCalendarOpen, setIsCalendarOpen] = React.useState(false);

  return (
    <div className="p-6 space-y-6 bg-gray-50">
      {/* Header with main metric */}
      <div className="flex items-center gap-4">
        <Card className="w-48">
          <CardContent className="pt-6">
            <div className="text-3xl font-bold text-center">97.42</div>
            <div className="text-sm text-center text-gray-500">Promedio de Días en stock</div>
          </CardContent>
        </Card>
        <div className="flex flex-col w-full gap-4">
          {/* Date Range Filter */}
          <Popover open={isCalendarOpen} onOpenChange={setIsCalendarOpen}>
            <PopoverTrigger asChild>
              <Button variant="outline" className="w-full justify-between">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  <span>
                    {dateRange[0] ? format(dateRange[0], 'dd/MM/yyyy') : 'Desde'} -{' '}
                    {dateRange[1] ? format(dateRange[1], 'dd/MM/yyyy') : 'Hasta'}
                  </span>
                </div>
                <ChevronDown className="h-4 w-4 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <CalendarComponent
                locale={es}
                mode="range"
                defaultMonth={dateRange[0]}
                selected={{ from: dateRange[0], to: dateRange[1] }}
                onSelect={(range) => {
                  setDateRange([range?.from, range?.to]);
                  setIsCalendarOpen(false);
                }}
                numberOfMonths={2}
              />
            </PopoverContent>
          </Popover>

          {/* Days Range Filter */}
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Rangos días" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todas</SelectItem>
              <SelectItem value="0-30">0-30 días</SelectItem>
              <SelectItem value="31-60">31-60 días</SelectItem>
              <SelectItem value="61-90">61-90 días</SelectItem>
              <SelectItem value="90+">Más de 90 días</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>


      {/* Monthly trend chart */}
      <Card>
        <CardHeader>
          <CardTitle>Promedio de Días en stock por Año y Mes</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" fill="#2563eb" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <div className="grid grid-cols-2 gap-6">
        {/* Stock by class */}
        <Card>
          <CardHeader>
            <CardTitle>Días de stock por clase</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <ComposedChart data={stockByClass}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis yAxisId="left" />
                <YAxis yAxisId="right" orientation="right" />
                <Tooltip />
                <Bar yAxisId="left" dataKey="count" fill="#2563eb" />
                <Line yAxisId="right" dataKey="average" stroke="#ef4444" />
              </ComposedChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Stock by subclass */}
        <Card>
          <CardHeader>
            <CardTitle>Días de stock por sub-clase</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <Treemap
                data={subClassData}
                dataKey="value"
                nameKey="name"
                stroke="#fff"
                fill="#2563eb"
              />
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Products with highest stock days */}
        <Card>
          <CardHeader>
            <CardTitle>Productos con mayor días de Stock</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart layout="vertical" data={topProducts}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" />
                <YAxis type="category" dataKey="name" width={150} />
                <Tooltip />
                <Bar dataKey="value" fill="#2563eb" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Products with lowest stock days */}
        <Card>
          <CardHeader>
            <CardTitle>Productos con menor días de Stock</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart layout="vertical" data={bottomProducts}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" />
                <YAxis type="category" dataKey="name" width={150} />
                <Tooltip />
                <Bar dataKey="value" fill="#ef4444" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default InventoryDashboard;