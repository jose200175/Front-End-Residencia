'use client';

import { useState, useMemo } from 'react';
import { Plus, MoreHorizontal, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { GroupBanksGrid } from '@/components/group-banks-grid';

interface Question {
  id: string;
  enunciado: string;
  disciplina: string;
  topico: string;
  dificuldade: 'Fácil' | 'Média' | 'Difícil' | 'Indefinida';
  bncc: string | null;
  tipo: string;
}

const mockQuestions: Question[] = [
  {
    id: '1',
    enunciado: 'Qual é o resultado de 2 + 2 em operações matemáticas básicas?',
    disciplina: 'Matemática',
    topico: 'Operações Básicas',
    dificuldade: 'Fácil',
    bncc: 'EM13MAT101',
    tipo: 'Múltipla Escolha',
  },
  {
    id: '2',
    enunciado: 'Explique o processo de fotossíntese em plantas e sua importância para o ecossistema.',
    disciplina: 'Biologia',
    topico: 'Processos Celulares',
    dificuldade: 'Média',
    bncc: 'EM13CNT103',
    tipo: 'Dissertativa',
  },
  {
    id: '3',
    enunciado: 'Identifique e analise as principais características da literatura modernista brasileira.',
    disciplina: 'Português',
    topico: 'Literatura Brasileira',
    dificuldade: 'Difícil',
    bncc: 'EM13LP48',
    tipo: 'Análise Textual',
  },
  {
    id: '4',
    enunciado: 'Calcule a velocidade média de um objeto em movimento uniforme.',
    disciplina: 'Física',
    topico: 'Cinemática',
    dificuldade: 'Média',
    bncc: null,
    tipo: 'Problema',
  },
  {
    id: '5',
    enunciado: 'Qual é a capital da França?',
    disciplina: 'Geografia',
    topico: 'Europa',
    dificuldade: 'Fácil',
    bncc: 'EM13GEO101',
    tipo: 'Múltipla Escolha',
  },
];

const getDifficultyColor = (level: string) => {
  switch (level) {
    case 'Fácil':
      return 'bg-emerald-100 text-emerald-800';
    case 'Média':
      return 'bg-amber-100 text-amber-800';
    case 'Difícil':
      return 'bg-red-100 text-red-800';
    case 'Indefinida':
      return 'bg-slate-100 text-slate-600';
    default:
      return 'bg-slate-100 text-slate-600';
  }
};

export function QuestionBank() {
  const [activeTab, setActiveTab] = useState('personal');
  const [searchText, setSearchText] = useState('');
  const [serie, setSerie] = useState('');
  const [disciplina, setDisciplina] = useState('');
  const [topico, setTopico] = useState('');
  const [dificuldade, setDificuldade] = useState('');
  const [bnccFilter, setBnccFilter] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const filteredQuestions = useMemo(() => {
    return mockQuestions.filter((q) => {
      const matchesSearch = q.enunciado.toLowerCase().includes(searchText.toLowerCase());
      const matchesSerie = !serie || serie === 'all-series' || q.disciplina === serie;
      const matchesDisciplina = !disciplina || disciplina === 'all-disciplinas' || q.disciplina === disciplina;
      const matchesTopico = !topico || topico === 'all-topicos' || q.topico === topico;
      const matchesDificuldade = !dificuldade || dificuldade === 'all-dificuldades' || q.dificuldade === dificuldade;
      const matchesBncc =
        !bnccFilter ||
        bnccFilter === 'all-bncc' ||
        (bnccFilter === 'com' && q.bncc) ||
        (bnccFilter === 'indefinida' && !q.bncc);

      return matchesSearch && matchesSerie && matchesDisciplina && matchesTopico && matchesDificuldade && matchesBncc;
    });
  }, [searchText, serie, disciplina, topico, dificuldade, bnccFilter]);

  const totalPages = Math.ceil(filteredQuestions.length / itemsPerPage);
  const paginatedQuestions = filteredQuestions.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleClearFilters = () => {
    setSearchText('');
    setSerie('');
    setDisciplina('');
    setTopico('');
    setDificuldade('');
    setBnccFilter('');
    setCurrentPage(1);
  };

  const disciplines = ['Matemática', 'Biologia', 'Português', 'Física', 'Geografia'];
  const topics = ['Operações Básicas', 'Processos Celulares', 'Literatura Brasileira', 'Cinemática', 'Europa'];
  const difficulties = ['Fácil', 'Média', 'Difícil', 'Indefinida'];
  const series = ['1º Ano Ensino Médio', '2º Ano Ensino Médio', '3º Ano Ensino Médio', '9º Ano Fundamental'];

  return (
    <main className="flex-1 overflow-y-auto">
      <div className="p-8">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold text-slate-900 mb-2">Banco de Questões</h1>
            <p className="text-slate-600">Gerencie e organize seu acervo de questões</p>
          </div>
          <Button className="bg-emerald-600 hover:bg-emerald-700 text-white gap-2 h-11 px-6 text-base font-medium">
            <Plus className="w-5 h-5" />
            Nova Questão
          </Button>
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-8">
          <TabsList className="grid w-full grid-cols-2 max-w-md bg-slate-100">
            <TabsTrigger 
              value="personal"
              className="data-[state=active]:bg-white data-[state=active]:text-slate-900 data-[state=active]:border-b-2 data-[state=active]:border-emerald-600"
            >
              Meu Banco Pessoal
            </TabsTrigger>
            <TabsTrigger 
              value="group"
              className="data-[state=active]:bg-white data-[state=active]:text-slate-900 data-[state=active]:border-b-2 data-[state=active]:border-emerald-600"
            >
              Bancos de Grupos
            </TabsTrigger>
          </TabsList>
        </Tabs>

        {/* Content based on active tab */}
        {activeTab === 'personal' ? (
          <>
            {/* Filter Bar */}
            <div className="bg-white border border-slate-200 rounded-lg p-6 mb-8 space-y-5">
              <div>
                <label className="text-sm font-medium text-slate-900 block mb-2">
                  Buscar no enunciado...
                </label>
                <Input
                  placeholder="Digite para buscar..."
                  value={searchText}
                  onChange={(e) => {
                    setSearchText(e.target.value);
                    setCurrentPage(1);
                  }}
                  className="w-full bg-white border-slate-200"
                />
              </div>

              {/* Filter Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                {/* Grau/Série */}
                <div>
                  <label className="text-sm font-medium text-slate-900 block mb-2">
                    Grau/Série
                  </label>
                  <Select value={serie || 'all-series'} onValueChange={(val) => {
                    setSerie(val === 'all-series' ? '' : val);
                    setCurrentPage(1);
                  }}>
                    <SelectTrigger className="bg-white border-slate-200">
                      <SelectValue placeholder="Todos os Graus" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all-series">Todos os Graus</SelectItem>
                      {series.map((s) => (
                        <SelectItem key={s} value={s}>
                          {s}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Disciplina */}
                <div>
                  <label className="text-sm font-medium text-slate-900 block mb-2">
                    Disciplina
                  </label>
                  <Select value={disciplina || 'all-disciplinas'} onValueChange={(val) => {
                    setDisciplina(val === 'all-disciplinas' ? '' : val);
                    setCurrentPage(1);
                  }}>
                    <SelectTrigger className="bg-white border-slate-200">
                      <SelectValue placeholder="Todas as Disciplinas" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all-disciplinas">Todas as Disciplinas</SelectItem>
                      {disciplines.map((d) => (
                        <SelectItem key={d} value={d}>
                          {d}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Tópico */}
                <div>
                  <label className="text-sm font-medium text-slate-900 block mb-2">
                    Tópico
                  </label>
                  <Select value={topico || 'all-topicos'} onValueChange={(val) => {
                    setTopico(val === 'all-topicos' ? '' : val);
                    setCurrentPage(1);
                  }}>
                    <SelectTrigger className="bg-white border-slate-200">
                      <SelectValue placeholder="Qualquer Tópico" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all-topicos">Qualquer Tópico</SelectItem>
                      {topics.map((t) => (
                        <SelectItem key={t} value={t}>
                          {t}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Dificuldade */}
                <div>
                  <label className="text-sm font-medium text-slate-900 block mb-2">
                    Dificuldade
                  </label>
                  <Select value={dificuldade || 'all-dificuldades'} onValueChange={(val) => {
                    setDificuldade(val === 'all-dificuldades' ? '' : val);
                    setCurrentPage(1);
                  }}>
                    <SelectTrigger className="bg-white border-slate-200">
                      <SelectValue placeholder="Qualquer Dificuldade" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all-dificuldades">Qualquer Dificuldade</SelectItem>
                      {difficulties.map((d) => (
                        <SelectItem key={d} value={d}>
                          {d}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Habilidade BNCC */}
                <div>
                  <label className="text-sm font-medium text-slate-900 block mb-2">
                    Habilidade BNCC
                  </label>
                  <Select value={bnccFilter || 'all-bncc'} onValueChange={(val) => {
                    setBnccFilter(val === 'all-bncc' ? '' : val);
                    setCurrentPage(1);
                  }}>
                    <SelectTrigger className="bg-white border-slate-200">
                      <SelectValue placeholder="Qualquer Habilidade" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all-bncc">Qualquer Habilidade</SelectItem>
                      <SelectItem value="com">Possui BNCC</SelectItem>
                      <SelectItem value="indefinida">Indefinida</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Clear Filters Button */}
              <div className="flex justify-end pt-2">
                <Button
                  variant="ghost"
                  onClick={handleClearFilters}
                  className="text-slate-600 hover:bg-slate-100 gap-2"
                >
                  <X className="w-4 h-4" />
                  Limpar Filtros
                </Button>
              </div>
            </div>

            {/* Data Table */}
            <div className="bg-white border border-slate-200 rounded-lg overflow-hidden">
              <Table>
                <TableHeader className="bg-blue-50 border-b border-slate-200">
                  <TableRow className="hover:bg-blue-50">
                    <TableHead className="text-slate-900 font-bold text-sm">Enunciado</TableHead>
                    <TableHead className="text-slate-900 font-bold text-sm">Disciplina & Tópico</TableHead>
                    <TableHead className="text-slate-900 font-bold text-sm">Dificuldade</TableHead>
                    <TableHead className="text-slate-900 font-bold text-sm">BNCC</TableHead>
                    <TableHead className="text-slate-900 font-bold text-sm text-right pr-4">Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {paginatedQuestions.length > 0 ? (
                    paginatedQuestions.map((question) => (
                      <TableRow
                        key={question.id}
                        className="hover:bg-slate-50 border-b border-slate-200 transition-colors"
                      >
                        <TableCell className="font-medium text-slate-900 py-4">
                          <div className="line-clamp-2 max-w-md text-sm">{question.enunciado}</div>
                        </TableCell>
                        <TableCell className="py-4">
                          <div className="font-medium text-slate-900 text-sm">{question.disciplina}</div>
                          <div className="text-xs text-slate-600">{question.topico}</div>
                        </TableCell>
                        <TableCell className="py-4">
                          <Badge className={`${getDifficultyColor(question.dificuldade)} text-xs font-medium`}>
                            {question.dificuldade}
                          </Badge>
                        </TableCell>
                        <TableCell className="py-4">
                          {question.bncc ? (
                            <span className="font-medium text-slate-900 text-sm">{question.bncc}</span>
                          ) : (
                            <Badge className="bg-amber-100 text-amber-800 text-xs">Indefinida</Badge>
                          )}
                        </TableCell>
                        <TableCell className="py-4 text-right pr-4">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="text-slate-600 hover:bg-slate-100 h-9 w-9"
                              >
                                <MoreHorizontal className="w-4 h-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem className="cursor-pointer">Editar</DropdownMenuItem>
                              <DropdownMenuItem className="cursor-pointer">Compartilhar</DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem className="text-red-600 cursor-pointer">Deletar</DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={5} className="h-32 text-center text-slate-500">
                        Nenhuma questão encontrada
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>

              {/* Pagination */}
              <div className="border-t border-slate-200 bg-slate-50 px-6 py-4 flex items-center justify-between">
                <div className="text-sm text-slate-900 font-medium">
                  Página {currentPage} de {totalPages || 1}
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
            </div>
          </>
        ) : (
          <div className="bg-white border border-slate-200 rounded-lg p-8">
            <h2 className="text-2xl font-bold text-slate-900 mb-6">Bancos de Grupos</h2>
            <GroupBanksGrid />
          </div>
        )}
      </div>
    </main>
  );
}
