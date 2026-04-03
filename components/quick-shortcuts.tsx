'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';

interface Shortcut {
  id: string;
  label: string;
  description: string;
  color: 'blue' | 'purple' | 'orange';
}

const shortcuts: Shortcut[] = [
  {
    id: '1',
    label: 'Criar Grupo',
    description: 'Crie um novo grupo de estudos',
    color: 'blue',
  },
  {
    id: '2',
    label: 'Criar Questão',
    description: 'Adicione uma questão ao banco',
    color: 'purple',
  },
  {
    id: '3',
    label: 'Nova Prova',
    description: 'Crie uma nova prova ou simulado',
    color: 'orange',
  },
];

function getColorClasses(
  color: 'blue' | 'purple' | 'orange'
): { bg: string; border: string; text: string } {
  switch (color) {
    case 'blue':
      return {
        bg: 'bg-blue-50',
        border: 'border-blue-200',
        text: 'text-blue-600',
      };
    case 'purple':
      return {
        bg: 'bg-purple-50',
        border: 'border-purple-200',
        text: 'text-purple-600',
      };
    case 'orange':
      return {
        bg: 'bg-orange-50',
        border: 'border-orange-200',
        text: 'text-orange-600',
      };
  }
}

export function QuickShortcuts() {
  return (
    <Card className="border-border h-full">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-foreground">
          Atalhos Rápidos
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {shortcuts.map((shortcut) => {
            const colors = getColorClasses(shortcut.color);
            return (
              <Button
                key={shortcut.id}
                variant="outline"
                className={`w-full h-24 flex flex-col items-start justify-start p-4 ${colors.bg} border-2 ${colors.border} text-left hover:shadow-md transition-shadow`}
              >
                <div className="flex items-center gap-2 mb-2">
                  <Plus className={`w-5 h-5 ${colors.text}`} />
                  <span className={`font-medium ${colors.text}`}>{shortcut.label}</span>
                </div>
                <p className="text-sm text-muted-foreground">{shortcut.description}</p>
              </Button>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
