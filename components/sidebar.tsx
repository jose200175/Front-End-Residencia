'use client';

import {
  LayoutDashboard,
  Users,
  BookOpen,
  LayoutTemplate,
  FileText,
  Mail,
  Settings,
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface NavItem {
  id: string;
  name: string;
  icon: React.ReactNode;
}

const navItems: NavItem[] = [
  { id: 'dashboard', name: 'Dashboard', icon: <LayoutDashboard className="w-5 h-5" /> },
  { id: 'grupos', name: 'Grupos', icon: <Users className="w-5 h-5" /> },
  {
    id: 'banco-questoes',
    name: 'Banco de Questões',
    icon: <BookOpen className="w-5 h-5" />,
  },
  {
    id: 'modelos',
    name: 'Modelos',
    icon: <LayoutTemplate className="w-5 h-5" />,
  },
  { id: 'provas', name: 'Provas', icon: <FileText className="w-5 h-5" /> },
  { id: 'caixa-entrada', name: 'Caixa de Entrada', icon: <Mail className="w-5 h-5" /> },
];

interface SidebarProps {
  onNavigate?: (page: string) => void;
}

export function Sidebar({ onNavigate }: SidebarProps) {
  const handleNavClick = (pageId: string) => {
    if (['banco-questoes', 'modelos', 'provas', 'grupos', 'caixa-entrada'].includes(pageId)) {
      onNavigate?.(pageId);
    } else {
      onNavigate?.('dashboard');
    }
  };

  return (
    <aside className="w-64 bg-sidebar border-r border-sidebar-border min-h-screen flex flex-col">
      {/* Logo */}
      <div className="p-6 border-b border-sidebar-border">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">AS</span>
          </div>
          <h1 className="text-xl font-bold text-sidebar-foreground">AprovaSE</h1>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {navItems.map((item) => (
            <li key={item.id}>
              <button
                onClick={() => handleNavClick(item.id)}
                className={cn(
                  'w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors duration-200 text-left',
                  'text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground'
                )}
              >
                {item.icon}
                <span>{item.name}</span>
              </button>
            </li>
          ))}
        </ul>
      </nav>

      {/* Settings Button at Bottom */}
      <div className="p-4 border-t border-sidebar-border">
        <button className={cn(
          'w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors duration-200 text-left',
          'text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground'
        )}>
          <Settings className="w-5 h-5" />
          <span>Configurações</span>
        </button>
      </div>

      {/* Footer */}
      <div className="p-4 border-t border-sidebar-border text-xs text-sidebar-foreground/60">
        <p>v1.0.0</p>
      </div>
    </aside>
  );
}
