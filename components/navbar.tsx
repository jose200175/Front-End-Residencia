'use client';

import { Bell, User } from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Switch } from '@/components/ui/switch';

interface NavbarProps {
  currentPage?: 'dashboard' | 'banco-questoes';
}

export function Navbar({ currentPage = 'dashboard' }: NavbarProps) {
  const [mode, setMode] = useState<'admin' | 'student'>('student');

  return (
    <header className="h-16 bg-white border-b border-border sticky top-0 z-40 flex items-center">
      <div className="flex-1 px-8 flex items-center justify-between">
        {/* Mode Toggle with Labels - Only visible on dashboard */}
        {currentPage === 'dashboard' && (
          <div className="flex items-center gap-4 px-6 py-3 bg-muted rounded-lg">
            <span
              className={`text-sm transition-all ${
                mode === 'student'
                  ? 'font-bold text-foreground'
                  : 'font-normal text-muted-foreground'
              }`}
            >
              Visão do Avaliado
            </span>
            <Switch
              checked={mode === 'admin'}
              onCheckedChange={(checked) => setMode(checked ? 'admin' : 'student')}
            />
            <span
              className={`text-sm transition-all ${
                mode === 'admin'
                  ? 'font-bold text-foreground'
                  : 'font-normal text-muted-foreground'
              }`}
            >
              Visão do Administrador
            </span>
          </div>
        )}

        {/* Right Side Controls */}
        <div className="flex items-center gap-6 ml-auto">
          {/* Notification Bell */}
          <div className="relative">
            <Button
              variant="ghost"
              size="icon"
              className="relative text-foreground hover:bg-muted"
            >
              <Bell className="w-5 h-5" />
              <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-destructive rounded-full"></span>
            </Button>
          </div>

          {/* User Profile Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="text-foreground hover:bg-muted"
              >
                <User className="w-5 h-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuItem>Meu Perfil</DropdownMenuItem>
              <DropdownMenuItem>Configurações</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Sair</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
