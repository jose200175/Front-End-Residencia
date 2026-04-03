'use client';

import { useState, useMemo } from 'react';
import { Plus, Edit, MoreHorizontal } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';

interface Template {
  id: string;
  title: string;
  subject: string;
  discipline: string;
  recipe: {
    easy: number;
    medium: number;
    hard: number;
  };
  useTri: boolean;
  lastUsed: string;
}

const mockTemplates: Template[] = [
  {
    id: '1',
    title: 'Simulado Mensal - Matemática',
    subject: 'Cálculo',
    discipline: 'Matemática',
    recipe: { easy: 5, medium: 3, hard: 2 },
    useTri: true,
    lastUsed: '2024-03-28',
  },
  {
    id: '2',
    title: 'Avaliação Bimestral - Português',
    subject: 'Sintaxe',
    discipline: 'Português',
    recipe: { easy: 3, medium: 4, hard: 3 },
    useTri: false,
    lastUsed: '2024-03-25',
  },
  {
    id: '3',
    title: 'Teste de Biologia',
    subject: 'Genética',
    discipline: 'Biologia',
    recipe: { easy: 4, medium: 4, hard: 2 },
    useTri: true,
    lastUsed: '2024-03-20',
  },
  {
    id: '4',
    title: 'Prova de Física',
    subject: 'Mecânica',
    discipline: 'Física',
    recipe: { easy: 3, medium: 3, hard: 4 },
    useTri: false,
    lastUsed: '2024-03-15',
  },
  {
    id: '5',
    title: 'Quiz Rápido - Geografia',
    subject: 'Cartografia',
    discipline: 'Geografia',
    recipe: { easy: 6, medium: 2, hard: 2 },
    useTri: false,
    lastUsed: '2024-03-10',
  },
  {
    id: '6',
    title: 'Simulado ENEM - Química',
    subject: 'Estequiometria',
    discipline: 'Química',
    recipe: { easy: 4, medium: 4, hard: 2 },
    useTri: true,
    lastUsed: '2024-03-08',
  },
];

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('pt-BR', { day: '2-digit', month: 'short', year: 'numeric' });
}

export function TemplatesManager() {
  const [searchText, setSearchText] = useState('');
  const [disciplineFilter, setDisciplineFilter] = useState('');

  const filteredTemplates = useMemo(() => {
    return mockTemplates.filter((template) => {
      const matchesSearch = template.title.toLowerCase().includes(searchText.toLowerCase());
      const matchesDiscipline = !disciplineFilter || disciplineFilter === 'all-disciplines' || template.discipline === disciplineFilter;
      return matchesSearch && matchesDiscipline;
    });
  }, [searchText, disciplineFilter]);

  const disciplines = Array.from(new Set(mockTemplates.map((t) => t.discipline)));

  return (
    <main className="flex-1 overflow-y-auto bg-slate-50">
      <div className="p-8">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold text-blue-950 mb-2">Meus Modelos de Prova</h1>
            <p className="text-slate-600">Gerencie suas receitas de provas e configurações de sorteio dinâmico.</p>
          </div>
          <Button className="bg-emerald-600 hover:bg-emerald-700 text-white gap-2 h-11 px-6 text-base font-medium">
            <Plus className="w-5 h-5" />
            Novo Modelo
          </Button>
        </div>

        {/* Filter Bar */}
        <div className="bg-white border border-slate-200 rounded-lg p-6 mb-8 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* Search Input */}
            <div className="lg:col-span-2">
              <label className="text-sm font-medium text-slate-900 block mb-2">
                Buscar modelos...
              </label>
              <Input
                placeholder="Digite o nome do modelo..."
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                className="w-full bg-white border-slate-200"
              />
            </div>

            {/* Discipline Filter */}
            <div>
              <label className="text-sm font-medium text-slate-900 block mb-2">
                Filtrar por Disciplina
              </label>
              <Select value={disciplineFilter || 'all-disciplines'} onValueChange={(val) => setDisciplineFilter(val === 'all-disciplines' ? '' : val)}>
                <SelectTrigger className="bg-white border-slate-200">
                  <SelectValue placeholder="Todas as Disciplinas" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all-disciplines">Todas as Disciplinas</SelectItem>
                  {disciplines.map((discipline) => (
                    <SelectItem key={discipline} value={discipline}>
                      {discipline}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Templates Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTemplates.length > 0 ? (
            filteredTemplates.map((template) => (
              <div
                key={template.id}
                className="bg-white border border-slate-200 rounded-lg overflow-hidden hover:border-emerald-500 transition-colors duration-200 flex flex-col"
              >
                {/* Card Header */}
                <div className="border-b border-slate-200 p-4">
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-blue-950 line-clamp-2">{template.title}</h3>
                    </div>
                  </div>
                  <Badge className="bg-blue-100 text-blue-800 text-xs font-medium">
                    {template.subject}
                  </Badge>
                </div>

                {/* Card Body */}
                <div className="p-4 flex-1">
                  <div className="mb-4">
                    <p className="text-sm text-slate-700 font-medium mb-2">
                      {template.recipe.easy + template.recipe.medium + template.recipe.hard} Questões:
                    </p>
                    <p className="text-sm text-slate-600">
                      <span className="text-emerald-600 font-medium">{template.recipe.easy}x Fácil</span>,{' '}
                      <span className="text-amber-600 font-medium">{template.recipe.medium}x Média</span>,{' '}
                      <span className="text-red-600 font-medium">{template.recipe.hard}x Difícil</span>
                    </p>
                  </div>
                  {template.useTri && (
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-emerald-600 rounded-full"></div>
                      <span className="text-xs text-emerald-600 font-medium">Correção TRI ativa</span>
                    </div>
                  )}
                </div>

                {/* Card Footer */}
                <div className="border-t border-slate-200 bg-slate-50 p-4 space-y-3">
                  <div className="text-xs text-slate-600">
                    <span className="font-medium">Última vez usado:</span> {formatDate(template.lastUsed)}
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="flex-1 text-slate-700 hover:bg-slate-100 gap-2"
                    >
                      <Edit className="w-4 h-4" />
                      Editar
                    </Button>
                    <Button
                      size="sm"
                      className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-medium"
                    >
                      Criar Prova com este Modelo
                    </Button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full">
              <div className="bg-white border border-slate-200 rounded-lg p-12 text-center">
                <p className="text-slate-600 font-medium mb-2">Nenhum modelo encontrado</p>
                <p className="text-slate-500 text-sm">Tente ajustar seus filtros ou criar um novo modelo</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
