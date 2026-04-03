'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { AlertCircle, CheckCircle, TrendingUp, FileText, Calendar, Clock, Plus } from 'lucide-react';

interface AdminTest {
  id: string;
  title: string;
  targetGroup: string;
  status: 'active' | 'scheduled' | 'completed';
  date: string;
}

interface StudentTest {
  id: string;
  title: string;
  deadline: string;
  timeLimit: number;
  urgent: boolean;
}

interface StudentResult {
  id: string;
  testName: string;
  score: number;
  date: string;
}

const adminTests: AdminTest[] = [
  { id: '1', title: 'Simulado de Matemática', targetGroup: '3º Ano A', status: 'active', date: '2025-04-08' },
  { id: '2', title: 'Avaliação de Português', targetGroup: '3º Ano B', status: 'scheduled', date: '2025-04-10' },
  { id: '3', title: 'Quiz de História', targetGroup: '2º Ano A', status: 'completed', date: '2025-04-05' },
];

const studentTests: StudentTest[] = [
  { id: '1', title: 'Simulado de Matemática', deadline: '2025-04-10', timeLimit: 120, urgent: true },
  { id: '2', title: 'Avaliação de Português', deadline: '2025-04-12', timeLimit: 90, urgent: false },
  { id: '3', title: 'Prova de Ciências', deadline: '2025-04-15', timeLimit: 100, urgent: false },
];

const studentResults: StudentResult[] = [
  { id: '1', testName: 'Simulado de Matemática', score: 8.5, date: '2025-04-01' },
  { id: '2', testName: 'Quiz de História', score: 7.2, date: '2025-03-28' },
  { id: '3', testName: 'Avaliação de Português', score: 9.0, date: '2025-03-25' },
];

export function DashboardView() {
  const [viewMode, setViewMode] = useState<'admin' | 'student'>('admin');

  return (
    <main className="flex-1 overflow-y-auto bg-slate-50">
      <div className="p-8 max-w-7xl mx-auto">

        {/* Admin View */}
        {viewMode === 'admin' && (
          <>
            {/* Admin Welcome Header with Modern Toggle */}
            <div className="mb-10 flex items-start justify-between">
              <div className="flex-1">
                <h1 className="text-4xl font-bold text-blue-950">Olá! Aqui está o seu resumo de administração.</h1>
                <p className="text-slate-600 mt-3 text-base">Gerencie suas provas, grupos e monitore o desempenho dos alunos</p>
              </div>
              {/* Modern Toggle */}
              <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-full ml-8 flex-shrink-0">
                <button
                  onClick={() => setViewMode('admin')}
                  className="px-4 py-2 rounded-full font-medium text-sm transition-all duration-200"
                  style={{
                    backgroundColor: viewMode === 'admin' ? '#001f3f' : 'transparent',
                    color: viewMode === 'admin' ? 'white' : '#475569',
                  }}
                >
                  Visão do Administrador
                </button>
                <button
                  onClick={() => setViewMode('student')}
                  className="px-4 py-2 rounded-full font-medium text-sm transition-all duration-200"
                  style={{
                    backgroundColor: viewMode === 'student' ? '#001f3f' : 'transparent',
                    color: viewMode === 'student' ? 'white' : '#475569',
                  }}
                >
                  Visão do Avaliado
                </button>
              </div>
            </div>

            {/* Admin Metric Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
              <Card className="border-slate-200 bg-white hover:shadow-md transition-shadow">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
                  <CardTitle className="text-sm font-semibold text-blue-950">Avaliações Ativas</CardTitle>
                  <div className="p-2 rounded-lg bg-emerald-50">
                    <FileText className="w-5 h-5 text-emerald-600" />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-blue-950">12</div>
                  <p className="text-xs text-slate-600 mt-2">5 em andamento agora</p>
                </CardContent>
              </Card>

              <Card className="border-slate-200 bg-white hover:shadow-md transition-shadow">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
                  <CardTitle className="text-sm font-semibold text-blue-950">Novas Respostas Hoje</CardTitle>
                  <div className="p-2 rounded-lg bg-blue-50">
                    <CheckCircle className="w-5 h-5 text-blue-600" />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-blue-950">48</div>
                  <p className="text-xs text-slate-600 mt-2">De 156 alunos</p>
                </CardContent>
              </Card>

              <Card className="border-yellow-200 bg-yellow-50 hover:shadow-md transition-shadow">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
                  <CardTitle className="text-sm font-semibold text-blue-950">Alertas de Auditoria</CardTitle>
                  <div className="p-2 rounded-lg bg-yellow-100">
                    <AlertCircle className="w-5 h-5 text-yellow-600" />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-yellow-700">3</div>
                  <p className="text-xs text-slate-600 mt-2">Requer atenção</p>
                </CardContent>
              </Card>
            </div>

            {/* Admin Two Column Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Left Column - Recent Tests */}
              <div className="lg:col-span-2">
                <Card className="border-slate-200 bg-white">
                  <CardHeader className="border-b border-slate-200 pb-4">
                    <CardTitle className="text-lg font-bold text-blue-950">Últimas Avaliações Criadas</CardTitle>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <div className="space-y-3">
                      {adminTests.map((test) => (
                        <div key={test.id} className="flex items-center justify-between p-4 bg-slate-50 rounded-lg border border-slate-200 hover:border-slate-300 hover:shadow-sm transition-all">
                          <div className="flex-1">
                            <h3 className="font-semibold text-blue-950">{test.title}</h3>
                            <p className="text-sm text-slate-600 mt-1">{test.targetGroup}</p>
                          </div>
                          <div className="flex items-center gap-3">
                            <Badge className={
                              test.status === 'active' ? 'bg-emerald-100 text-emerald-800 font-medium' :
                              test.status === 'scheduled' ? 'bg-blue-100 text-blue-800 font-medium' :
                              'bg-slate-100 text-slate-800 font-medium'
                            }>
                              {test.status === 'active' ? 'Em Andamento' : test.status === 'scheduled' ? 'Agendada' : 'Concluída'}
                            </Badge>
                            <Button variant="ghost" size="sm" className="text-blue-950 border border-slate-300 hover:bg-white hover:border-blue-950">
                              Acompanhar
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Right Column - Admin Actions */}
              <div className="lg:col-span-1">
                <Card className="border-slate-200 bg-white">
                  <CardHeader className="border-b border-slate-200 pb-4">
                    <CardTitle className="text-lg font-bold text-blue-950">Ações Rápidas</CardTitle>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <div className="space-y-3 flex flex-col">
                      <Button className="w-full bg-emerald-600 hover:bg-emerald-700 text-white gap-2 font-semibold py-6 text-base rounded-lg transition-colors">
                        <Plus className="w-5 h-5" />
                        Criar Nova Prova
                      </Button>
                      <Button className="w-full bg-emerald-600 hover:bg-emerald-700 text-white gap-2 font-semibold py-6 text-base rounded-lg transition-colors">
                        <Plus className="w-5 h-5" />
                        Novo Grupo
                      </Button>
                      <Button className="w-full bg-emerald-600 hover:bg-emerald-700 text-white gap-2 font-semibold py-6 text-base rounded-lg transition-colors">
                        <Plus className="w-5 h-5" />
                        Nova Questão
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </>
        )}

        {/* Student View */}
        {viewMode === 'student' && (
          <>
            {/* Student Welcome Header with Modern Toggle */}
            <div className="mb-10 flex items-start justify-between">
              <div className="flex-1">
                <h1 className="text-4xl font-bold text-blue-950">Olá! Preparado para as suas avaliações?</h1>
                <p className="text-slate-600 mt-3 text-base">Verifique suas provas pendentes e resultados recentes</p>
              </div>
              {/* Modern Toggle */}
              <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-full ml-8 flex-shrink-0">
                <button
                  onClick={() => setViewMode('admin')}
                  className="px-4 py-2 rounded-full font-medium text-sm transition-all duration-200"
                  style={{
                    backgroundColor: viewMode === 'admin' ? '#001f3f' : 'transparent',
                    color: viewMode === 'admin' ? 'white' : '#475569',
                  }}
                >
                  Visão do Administrador
                </button>
                <button
                  onClick={() => setViewMode('student')}
                  className="px-4 py-2 rounded-full font-medium text-sm transition-all duration-200"
                  style={{
                    backgroundColor: viewMode === 'student' ? '#001f3f' : 'transparent',
                    color: viewMode === 'student' ? 'white' : '#475569',
                  }}
                >
                  Visão do Avaliado
                </button>
              </div>
            </div>

            {/* Student Metric Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
              <Card className="border-red-200 bg-red-50 hover:shadow-md transition-shadow">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
                  <CardTitle className="text-sm font-semibold text-blue-950">Provas Pendentes</CardTitle>
                  <div className="p-2 rounded-lg bg-red-100">
                    <Calendar className="w-5 h-5 text-red-600" />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-red-700">3</div>
                  <p className="text-xs text-slate-600 mt-2">1 urgente</p>
                </CardContent>
              </Card>

              <Card className="border-slate-200 bg-white hover:shadow-md transition-shadow">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
                  <CardTitle className="text-sm font-semibold text-blue-950">Provas Concluídas</CardTitle>
                  <div className="p-2 rounded-lg bg-emerald-50">
                    <CheckCircle className="w-5 h-5 text-emerald-600" />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-blue-950">12</div>
                  <p className="text-xs text-slate-600 mt-2">Este mês</p>
                </CardContent>
              </Card>

              <Card className="border-slate-200 bg-white hover:shadow-md transition-shadow">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
                  <CardTitle className="text-sm font-semibold text-blue-950">Média de Desempenho</CardTitle>
                  <div className="p-2 rounded-lg bg-blue-50">
                    <TrendingUp className="w-5 h-5 text-blue-600" />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-blue-950">8.2</div>
                  <p className="text-xs text-slate-600 mt-2">Em 10</p>
                </CardContent>
              </Card>
            </div>

            {/* Student Two Column Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Left Column - Upcoming Tests */}
              <div className="lg:col-span-2">
                <div className="space-y-4">
                  <h3 className="text-lg font-bold text-blue-950 mb-4">Minhas Próximas Provas</h3>
                  {studentTests.map((test) => (
                    <Card key={test.id} className={`border-2 transition-all hover:shadow-md ${test.urgent ? 'border-red-300 bg-red-50' : 'border-slate-200 bg-white'}`}>
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between gap-6">
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-3">
                              <h3 className="font-bold text-blue-950 text-base">{test.title}</h3>
                              {test.urgent && <Badge className="bg-red-100 text-red-800 font-semibold">Urgente</Badge>}
                            </div>
                            <div className="flex items-center gap-6 text-sm text-slate-700">
                              <div className="flex items-center gap-2">
                                <Calendar className="w-4 h-4 text-slate-600" />
                                <span className="font-medium">{new Date(test.deadline).toLocaleDateString('pt-BR')}</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <Clock className="w-4 h-4 text-slate-600" />
                                <span className="font-medium">{test.timeLimit} min</span>
                              </div>
                            </div>
                          </div>
                          <Button className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold px-8 py-6 rounded-lg transition-colors flex-shrink-0">
                            Iniciar Prova
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>

              {/* Right Column - Recent Results */}
              <div className="lg:col-span-1">
                <Card className="border-slate-200 bg-white">
                  <CardHeader className="border-b border-slate-200 pb-4">
                    <CardTitle className="text-lg font-bold text-blue-950">Últimos Resultados</CardTitle>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <div className="space-y-3">
                      {studentResults.map((result) => (
                        <div key={result.id} className="p-4 bg-slate-50 rounded-lg border border-slate-200 hover:border-slate-300 hover:shadow-sm transition-all">
                          <h3 className="font-semibold text-blue-950 text-sm">{result.testName}</h3>
                          <div className="flex items-center justify-between mt-3">
                            <p className="text-xs text-slate-600">{new Date(result.date).toLocaleDateString('pt-BR')}</p>
                            <Badge className="bg-emerald-100 text-emerald-800 font-bold text-xs px-3 py-1">{result.score.toFixed(1)}</Badge>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </>
        )}
      </div>
    </main>
  );
}
