import React from 'react';
import { Link } from 'react-router-dom';
import {
  Home,
  Package,
  TrendingUp,
  DollarSign,
  MessageCircle,
} from 'lucide-react';
import { cn } from "@/lib/utils";

interface SidebarItemProps {
  icon: React.ReactNode;
  label: string;
  href: string;
  isActive?: boolean;
  target?: string;
}

const SidebarItem = ({ icon, label, href, isActive, target = "_self" }: SidebarItemProps) => (
  <Link
    to={href}
    className={cn(
      "flex items-center gap-3 px-3 py-2 text-sm transition-colors",
      "hover:bg-slate-800 rounded-md",
      isActive ? "bg-slate-800 text-white" : "text-slate-300"
    )}
    target={target}
  >
    {icon}
    <span>{label}</span>
  </Link>
);

const Sidebar = () => {
  const currentPath = window.location.pathname;

  return (
    <aside className="top-0 left-0 w-64 h-screen bg-slate-900 text-white flex flex-col sticky">
      {/* Logo */}
      <div className="p-4">
        <h1 className="text-2xl font-bold">DistribuX</h1>
      </div>

      {/* Navigation Items */}
      <nav className="flex-1 px-3 py-2 space-y-1 overflow-y-auto">
        <SidebarItem
          icon={<Home />}
          label="Dashboard"
          href="/"
          isActive={currentPath === '/'}
        />
        <SidebarItem
          icon={<Package />}
          label="Gestión de lotes"
          href="/lotes"
          isActive={currentPath === '/lotes'}
        />
        <SidebarItem
          icon={<TrendingUp />}
          label="Predicciones de ventas"
          href="/ventas"
          isActive={currentPath === '/ventas'}
        />
        <SidebarItem
          icon={<DollarSign />}
          label="Fijación de precios"
          href="/precios"
          isActive={currentPath === '/precios'}
        />
        <SidebarItem
          icon={<MessageCircle />}
          label="WhatsApp Bot"
          href="https://chatgpt.com/g/g-v8mJvBlJU-distribux"
          target="_blank"
          isActive={currentPath === '/whatsapp'}
        />
      </nav>
    </aside>
  );
};

export default Sidebar;
