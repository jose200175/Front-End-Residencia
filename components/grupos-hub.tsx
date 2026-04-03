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
import { Plus, Users, BookOpen } from 'lucide-react';

interface GrupoData {
  id: string;
  nome: string;
  role: 'admin' | 'student';
  activeTests: number;
  membersCount: number;
  grau: string;
  disciplina: string;
}

const mockGrupos: GrupoData[] = [
  {
    id: '1',
    nome: '3º Ano A - Colégio Estadual',
    role: 'admin',
    activeTests: 3,
    membersCount: 28,
    grau: '3º Ano',
    disciplina: 'Geral',
  },
  {
    id: '2',
    nome: '3º Ano B - Colégio Estadual',
    role: 'admin',
    activeTests: 2,
    membersCount: 30,
    grau: '3º Ano',
    disciplina: 'Geral',
  },
  {
    id: '3',
    nome: '2º Ano A - Turma Matutino',
    role: 'admin',
    activeTests: 1,
    membersCount: 25,
    grau: '2º Ano',
    disciplina: 'Geral',
  },
  {
    id: '4',
    nome: 'Turma de Reforço Matemática',
    role: 'student',
    activeTests: 2,
    membersCount: 15,
    grau: '3º Ano',
    disciplina: 'Matemática',
  },
  {
    id: '5',
    nome: 'Grupo Preparatório ENEM',
    role: 'student',
    activeTests: 5,
    membersCount: 50,
    grau: 'ENEM',
    disciplina: 'Geral',
  },
];

export function GruposHub() {
  const [grau, setGrau] = useState('todos');
  const [disciplina, setDisciplina] = useState('todos');
  const [status, setStatus] = useState('todos');

  const filteredGrupos = mockGrupos.filter(
    (grupo) =>
      (grau === 'todos' || grupo.grau === grau) &&
      (disciplina === 'todos' || grupo.disciplina === disciplina)
  );

  return (
    <main className="flex-1 overflow-y-auto bg-slate-50">
      <div className="p-8 max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold text-blue-950">Meus Grupos</h1>
            <p className="text-slate-600 mt-2">Gerencie e participe de grupos de avaliação</p>
          </div>
          <Button className="bg-emerald-600 hover:bg-emerald-700 text-white gap-2 font-semibold px-6 py-6 text-base rounded-lg">
            <Plus className="w-5 h-5" />
            Novo Grupo
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
              <SelectItem value="2º Ano">2º Ano</SelectItem>
              <SelectItem value="3º Ano">3º Ano</SelectItem>
              <SelectItem value="ENEM">ENEM</SelectItem>
            </SelectContent>
          </Select>

          <Select value={disciplina} onValueChange={setDisciplina}>
            <SelectTrigger className="bg-white border border-slate-200">
              <SelectValue placeholder="Disciplina" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="todos">Todos</SelectItem>
              <SelectItem value="Geral">Geral</SelectItem>
              <SelectItem value="Matemática">Matemática</SelectItem>
              <SelectItem value="Português">Português</SelectItem>
              <SelectItem value="História">História</SelectItem>
            </SelectContent>
          </Select>

          <Select value={status} onValueChange={setStatus}>
            <SelectTrigger className="bg-white border border-slate-200">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="todos">Todos</SelectItem>
              <SelectItem value="active">Ativo</SelectItem>
              <SelectItem value="archived">Arquivado</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Groups Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredGrupos.map((grupo) => (
            <Card key={grupo.id} className="border-slate-200 bg-white hover:shadow-lg transition-shadow group">
              <CardHeader className="pb-3 relative">
                <div className="flex items-start justify-between">
                  <CardTitle className="text-lg font-bold text-blue-950 flex-1 group-hover:text-blue-900">
                    {grupo.nome}
                  </CardTitle>
                  <Badge
                    className={`ml-2 flex-shrink-0 font-semibold ${
                      grupo.role === 'admin'
                        ? 'bg-emerald-100 text-emerald-800'
                        : 'bg-blue-100 text-blue-800'
                    }`}
                  >
                    {grupo.role === 'admin' ? 'Administrador' : 'Avaliado'}
                  </Badge>
                </div>
              </CardHeader>

              <CardContent className="space-y-4">
                {/* Stats */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-3 bg-slate-50 rounded-lg">
                    <div className="flex items-center gap-2 mb-1">
                      <BookOpen className="w-4 h-4 text-emerald-600" />
                      <span className="text-xs font-medium text-slate-600">Provas Ativas</span>
                    </div>
                    <p className="text-2xl font-bold text-blue-950">{grupo.activeTests}</p>
                  </div>

                  <div className="p-3 bg-slate-50 rounded-lg">
                    <div className="flex items-center gap-2 mb-1">
                      <Users className="w-4 h-4 text-blue-600" />
                      <span className="text-xs font-medium text-slate-600">Membros</span>
                    </div>
                    <p className="text-2xl font-bold text-blue-950">{grupo.membersCount}</p>
                  </div>
                </div>

                {/* Action Button */}
                <Button className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-5 rounded-lg transition-colors">
                  Ver Grupo
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Empty State */}
        {filteredGrupos.length === 0 && (
          <div className="text-center py-12">
            <Users className="w-12 h-12 text-slate-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-slate-700 mb-2">Nenhum grupo encontrado</h3>
            <p className="text-slate-600">Crie ou entre em um grupo para começar</p>
          </div>
        )}
      </div>
    </main>
  );
}
