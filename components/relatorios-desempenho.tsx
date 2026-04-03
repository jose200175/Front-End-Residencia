'use client';

import { useState } from 'react';
import { Download, BarChart3, LineChart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

interface AuditStudent {
  id: string;
  name: string;
  triScore: number;
  timeSpent: string;
  auditStatus: 'clean' | 'flagged';
  auditDetail: string;
}

const mockStudents: AuditStudent[] = [
  {
    id: '1',
    name: 'Ana Silva Santos',
    triScore: 745,
    timeSpent: '45 min 32 seg',
    auditStatus: 'clean',
    auditDetail: 'Sem Ocorrências',
  },
  {
    id: '2',
    name: 'Bruno Costa Oliveira',
    triScore: 688,
    timeSpent: '42 min 15 seg',
    auditStatus: 'flagged',
    auditDetail: 'Saiu da Aba (2x)',
  },
  {
    id: '3',
    name: 'Carla Ferreira Mendes',
    triScore: 812,
    timeSpent: '38 min 47 seg',
    auditStatus: 'clean',
    auditDetail: 'Sem Ocorrências',
  },
  {
    id: '4',
    name: 'Diego Alves Rocha',
    triScore: 625,
    timeSpent: '55 min 20 seg',
    auditStatus: 'flagged',
    auditDetail: 'Tempo Excessivo',
  },
  {
    id: '5',
    name: 'Eduarda Gomes Pereira',
    triScore: 759,
    timeSpent: '41 min 03 seg',
    auditStatus: 'clean',
    auditDetail: 'Sem Ocorrências',
  },
  {
    id: '6',
    name: 'Felipe Rodrigues Lima',
    triScore: 701,
    timeSpent: '47 min 18 seg',
    auditStatus: 'clean',
    auditDetail: 'Sem Ocorrências',
  },
];

export function RelatoriosDesempenho() {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const totalPages = Math.ceil(mockStudents.length / itemsPerPage);
  const paginatedStudents = mockStudents.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const avgTRI = Math.round(
    mockStudents.reduce((sum, s) => sum + s.triScore, 0) / mockStudents.length
  );
  const avgTime = '44 min 20 seg';
  const auditAlerts = mockStudents.filter((s) => s.auditStatus === 'flagged').length;

  return (
    <main className="flex-1 overflow-y-auto">
      <div className="p-8 bg-slate-50 min-h-screen">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold text-blue-950 mb-2">
              Resultados: Simulado de Matemática - 3º Ano
            </h1>
            <p className="text-slate-600">Análise completa de desempenho e auditoria</p>
          </div>
          <Button className="bg-emerald-600 hover:bg-emerald-700 text-white gap-2 h-11 px-6">
            <Download className="w-5 h-5" />
            Exportar CSV
          </Button>
        </div>

        {/* Metrics Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {/* Total de Alunos */}
          <Card className="bg-white border-slate-200">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-slate-600">Total de Alunos</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-blue-950">{mockStudents.length}</div>
              <p className="text-xs text-slate-500 mt-2">Participantes da avaliação</p>
            </CardContent>
          </Card>

          {/* Média Geral (TRI) */}
          <Card className="bg-white border-slate-200">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-slate-600">Média Geral (TRI)</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-emerald-600">{avgTRI}</div>
              <p className="text-xs text-slate-500 mt-2">Escala 0-1000</p>
            </CardContent>
          </Card>

          {/* Tempo Médio */}
          <Card className="bg-white border-slate-200">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-slate-600">Tempo Médio</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-blue-950">{avgTime}</div>
              <p className="text-xs text-slate-500 mt-2">Duração média da prova</p>
            </CardContent>
          </Card>

          {/* Alertas de Auditoria */}
          <Card className="bg-white border-slate-200">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-slate-600">Alertas de Auditoria</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-red-600">{auditAlerts} Ocorrências</div>
              <p className="text-xs text-slate-500 mt-2">Comportamentos anormais detectados</p>
            </CardContent>
          </Card>
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Acertos por Assunto */}
          <Card className="bg-white border-slate-200">
            <CardHeader>
              <CardTitle className="text-blue-950 flex items-center gap-2">
                <BarChart3 className="w-5 h-5 text-emerald-600" />
                Acertos por Assunto
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64 flex items-center justify-center bg-slate-50 rounded-lg border border-dashed border-slate-300">
                <div className="text-center text-slate-500">
                  <BarChart3 className="w-12 h-12 mx-auto mb-2 opacity-50" />
                  <p className="text-sm">Gráfico de barras será renderizado aqui</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Desempenho vs. Tempo gasto */}
          <Card className="bg-white border-slate-200">
            <CardHeader>
              <CardTitle className="text-blue-950 flex items-center gap-2">
                <LineChart className="w-5 h-5 text-emerald-600" />
                Desempenho vs. Tempo Gasto
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64 flex items-center justify-center bg-slate-50 rounded-lg border border-dashed border-slate-300">
                <div className="text-center text-slate-500">
                  <LineChart className="w-12 h-12 mx-auto mb-2 opacity-50" />
                  <p className="text-sm">Gráfico de linhas será renderizado aqui</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Audit Table */}
        <Card className="bg-white border-slate-200">
          <CardHeader>
            <CardTitle className="text-blue-950">Log de Aplicação dos Alunos</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader className="bg-slate-50 border-b border-slate-200">
                <TableRow className="hover:bg-slate-50">
                  <TableHead className="text-slate-900 font-bold text-sm">Nome do Aluno</TableHead>
                  <TableHead className="text-slate-900 font-bold text-sm">Nota Final (TRI)</TableHead>
                  <TableHead className="text-slate-900 font-bold text-sm">Tempo Gasto</TableHead>
                  <TableHead className="text-slate-900 font-bold text-sm text-right">Status de Auditoria</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paginatedStudents.map((student) => (
                  <TableRow
                    key={student.id}
                    className="hover:bg-slate-50 border-b border-slate-200 transition-colors"
                  >
                    <TableCell className="font-medium text-blue-950 py-4">
                      {student.name}
                    </TableCell>
                    <TableCell className="py-4">
                      <span className="font-semibold text-emerald-600">{student.triScore}</span>
                    </TableCell>
                    <TableCell className="py-4 text-slate-700">{student.timeSpent}</TableCell>
                    <TableCell className="py-4 text-right">
                      {student.auditStatus === 'clean' ? (
                        <Badge className="bg-emerald-100 text-emerald-800 border-emerald-200">
                          Sem Ocorrências
                        </Badge>
                      ) : (
                        <Badge className="bg-red-100 text-red-800 border-red-200">
                          {student.auditDetail}
                        </Badge>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>

            {/* Pagination */}
            <div className="border-t border-slate-200 mt-6 pt-6 flex items-center justify-between">
              <div className="text-sm text-slate-600 font-medium">
                Página {currentPage} de {totalPages}
              </div>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                  disabled={currentPage === 1}
                  className="border-slate-200 text-slate-700 hover:bg-slate-100 disabled:opacity-50"
                >
                  Anterior
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                  disabled={currentPage === totalPages}
                  className="border-slate-200 text-slate-700 hover:bg-slate-100 disabled:opacity-50"
                >
                  Próxima
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
