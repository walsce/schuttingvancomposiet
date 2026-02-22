import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, BarChart, Bar, Legend,
} from "recharts";

const COLORS = ["#2563eb", "#16a34a", "#eab308", "#ef4444", "#8b5cf6", "#f97316"];

export const RevenueChart = ({ data }: { data: { date: string; revenue: number }[] }) => (
  <Card>
    <CardHeader><CardTitle className="text-sm">Omzet over tijd</CardTitle></CardHeader>
    <CardContent>
      <ResponsiveContainer width="100%" height={260}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" fontSize={12} />
          <YAxis fontSize={12} tickFormatter={(v) => `€${v}`} />
          <Tooltip formatter={(v: number) => `€${v.toFixed(2)}`} />
          <Line type="monotone" dataKey="revenue" stroke="#2563eb" strokeWidth={2} dot={false} />
        </LineChart>
      </ResponsiveContainer>
    </CardContent>
  </Card>
);

export const OrderStatusChart = ({ data }: { data: { name: string; value: number }[] }) => (
  <Card>
    <CardHeader><CardTitle className="text-sm">Bestellingen per status</CardTitle></CardHeader>
    <CardContent>
      <ResponsiveContainer width="100%" height={260}>
        <PieChart>
          <Pie data={data} cx="50%" cy="50%" innerRadius={50} outerRadius={90} dataKey="value" label={({ name, value }) => `${name}: ${value}`}>
            {data.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </CardContent>
  </Card>
);

export const LeadSourceChart = ({ data }: { data: { source: string; count: number }[] }) => (
  <Card>
    <CardHeader><CardTitle className="text-sm">Leads per bron</CardTitle></CardHeader>
    <CardContent>
      <ResponsiveContainer width="100%" height={260}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="source" fontSize={12} />
          <YAxis fontSize={12} />
          <Tooltip />
          <Bar dataKey="count" fill="#8b5cf6" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </CardContent>
  </Card>
);

export const PipelineFunnelChart = ({ data }: { data: { stage: string; count: number }[] }) => (
  <Card>
    <CardHeader><CardTitle className="text-sm">Pipeline funnel</CardTitle></CardHeader>
    <CardContent>
      <ResponsiveContainer width="100%" height={260}>
        <BarChart data={data} layout="vertical">
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis type="number" fontSize={12} />
          <YAxis dataKey="stage" type="category" fontSize={12} width={100} />
          <Tooltip />
          <Bar dataKey="count" fill="#2563eb" radius={[0, 4, 4, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </CardContent>
  </Card>
);

export const TopProductsChart = ({ data }: { data: { name: string; sold: number }[] }) => (
  <Card>
    <CardHeader><CardTitle className="text-sm">Populairste producten</CardTitle></CardHeader>
    <CardContent>
      <ResponsiveContainer width="100%" height={260}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" fontSize={10} angle={-20} textAnchor="end" height={60} />
          <YAxis fontSize={12} />
          <Tooltip />
          <Bar dataKey="sold" fill="#16a34a" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </CardContent>
  </Card>
);
