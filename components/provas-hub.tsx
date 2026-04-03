'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Plus, Eye, Play, BarChart3 } from 'lucide-react';

interface ProvaData {
  id: string;
  titulo: string;
  grupo: string;
  status: 'active' | 'scheduled' | 'completed';
  date: string;
  role: 'admin' | 'student';
}

const mockProvas: ProvaData[] = [
  {
    id: '1',
    titulo: 'Simulado de Matemática',
    grupo: '3º Ano A',
    status: 'active',
    date: '2025-04-08',
    role: 'admin',
  },
  {
    id: '2',
    titulo: 'Avaliação de Português',
    grupo: '3º Ano B',
    status: 'scheduled',
    date: '2025-04-10',
    role: 'admin',
  },
  {
    id: '3',
    titulo: 'Quiz de História',
    grupo: '2º Ano A',
    status: 'completed',
    date: '2025-04-05',
    role: 'admin',
  },
  {
    id: '4',
    titulo: 'Prova de Ciências',
    grupo: 'Professora: Ana Silva',
    status: 'pending',
    date: '2025-04-15',
    role: 'student',
  },
  {
    id: '5',
    titulo: 'Simulado de Matemática',
    grupo: 'Professora: Carlos',
    status: 'completed',
    date: '2025-04-01',
    role: 'student',
  },
];

interface ProvasHubProps {
  onViewReport?: (testData: ProvaData) => void;
}

export function ProvasHub({ onViewReport }: ProvasHubProps) {
  const [activeTab, setActiveTab] = useState<'admin' | 'student'>('admin');
  const [grau, setGrau] = useState('todos');
  const [disciplina, setDisciplina] = useState('todos');
  const [status, setStatus] = useState('todos');

  const filteredProvas = mockProvas.filter(
    (prova) =>
      prova.role === activeTab &&
      (grau === 'todos' || prova.grupo === grau) &&
      (disciplina === 'todos' || prova.titulo.includes(disciplina)) &&
      (status === 'todos' || prova.status === status)
  );

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <Badge className="bg-emerald-100 text-emerald-800 font-medium">Em Andamento</Badge>;
      case 'scheduled':
        return <Badge className="bg-blue-100 text-blue-800 font-medium">Agendada</Badge>;
      case 'completed':
        return <Badge className="bg-slate-100 text-slate-800 font-medium">Concluída</Badge>;
      case 'pending':
        return <Badge className="bg-yellow-100 text-yellow-800 font-medium">Pendente</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  return (
    <main className="flex-1 overflow-y-auto bg-slate-50">
      <div className="p-8 max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold text-blue-950">Minhas Provas</h1>
            <p className="text-slate-600 mt-2">Gerencie e acompanhe suas provas</p>
          </div>
          <Button className="bg-emerald-600 hover:bg-emerald-700 text-white gap-2 font-semibold px-6 py-6 text-base rounded-lg">
            <Plus className="w-5 h-5" />
            Nova Prova
          </Button>
        </div>

        {/* Filter Bar */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          <Select value={grau} onValueChange={setGrau}>
            <SelectTrigger className="bg-white border border-slate-200">
              <SelectValue placeholder="Grau/Série" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="todos">Todos</SelectItem>
              <SelectItem value="3º Ano A">3º Ano A</SelectItem>
              <SelectItem value="3º Ano B">3º Ano B</SelectItem>
              <SelectItem value="2º Ano A">2º Ano A</SelectItem>
            </SelectContent>
          </Select>

          <Select value={disciplina} onValueChange={setDisciplina}>
            <SelectTrigger className="bg-white border border-slate-200">
              <SelectValue placeholder="Disciplina" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="todos">Todos</SelectItem>
              <SelectItem value="Matemática">Matemática</SelectItem>
              <SelectItem value="Português">Português</SelectItem>
              <SelectItem value="História">História</SelectItem>
              <SelectItem value="Ciências">Ciências</SelectItem>
            </SelectContent>
          </Select>

          <Select value={status} onValueChange={setStatus}>
            <SelectTrigger className="bg-white border border-slate-200">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="todos">Todos</SelectItem>
              <SelectItem value="active">Em Andamento</SelectItem>
              <SelectItem value="scheduled">Agendada</SelectItem>
              <SelectItem value="completed">Concluída</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Tabs */}
        <div className="flex gap-4 mb-8 border-b border-slate-200">
          <button
            onClick={() => setActiveTab('admin')}
            className={`pb-4 px-2 font-semibold transition-colors ${
              activeTab === 'admin'
                ? 'text-blue-950 border-b-2 border-blue-950'
                : 'text-slate-600 hover:text-blue-950'
            }`}
          >
            Provas que Administro
          </button>
          <button
            onClick={() => setActiveTab('student')}
            className={`pb-4 px-2 font-semibold transition-colors ${
              activeTab === 'student'
                ? 'text-blue-950 border-b-2 border-blue-950'
                : 'text-slate-600 hover:text-blue-950'
            }`}
          >
            Minhas Avaliações
          </button>
        </div>

        {/* Content */}
        {activeTab === 'admin' ? (
          /* Admin Table View */
          <Card className="border-slate-200 bg-white">
            <CardContent className="p-6">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-slate-200">
                      <th className="text-left py-4 px-4 font-semibold text-blue-950">Título</th>
                      <th className="text-left py-4 px-4 font-semibold text-blue-950">Grupo</th>
                      <th className="text-left py-4 px-4 font-semibold text-blue-950">Status</th>
                      <th className="text-left py-4 px-4 font-semibold text-blue-950">Ações</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredProvas.map((prova) => (
                      <tr key={prova.id} className="border-b border-slate-200 hover:bg-slate-50">
                        <td className="py-4 px-4 text-blue-950 font-medium">{prova.titulo}</td>
                        <td className="py-4 px-4 text-slate-600">{prova.grupo}</td>
                        <td className="py-4 px-4">{getStatusBadge(prova.status)}</td>
                        <td className="py-4 px-4">
                          <div className="flex gap-2">
                            {prova.status === 'completed' ? (
                              <Button
                                size="sm"
                                className="bg-emerald-600 hover:bg-emerald-700 text-white gap-2"
                                onClick={() => onViewReport?.(prova)}
                              >
                                <BarChart3 className="w-4 h-4" />
                                Ver Relatório
                              </Button>
                            ) : (
                              <Button
                                size="sm"
                                variant="outline"
                                className="border-slate-300 text-blue-950 hover:bg-slate-50"
                              >
                                <Eye className="w-4 h-4" />
                                Acompanhar
                              </Button>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        ) : (
          /* Student Grid View */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProvas.map((prova) => (
              <Card key={prova.id} className="border-slate-200 bg-white hover:shadow-md transition-shadow">
                <CardHeader className="pb-3">
                  <CardTitle className="text-base font-semibold text-blue-950">{prova.titulo}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <p className="text-xs text-slate-600 font-medium">Professor</p>
                    <p className="text-sm text-blue-950">{prova.grupo}</p>
                  </div>
                  <div className="flex items-center justify-between">
                    {getStatusBadge(prova.status)}
                    <Button
                      size="sm"
                      className="bg-emerald-600 hover:bg-emerald-700 text-white gap-2"
                    >
                      {prova.status === 'completed' ? (
                        <>
                          <BarChart3 className="w-4 h-4" />
                          Ver Resultado
                        </>
                      ) : (
                        <>
                          <Play className="w-4 h-4" />
                          Iniciar
                        </>
                      )}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
