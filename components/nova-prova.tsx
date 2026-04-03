'use client';

import { useState } from 'react';
import { Plus, BookTemplate, Eye, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { X } from 'lucide-react';

interface Rule {
  id: string;
  quantity: number;
  discipline: string;
  topic: string;
  difficulty: string;
  bncc: string;
}

export function NovaProva({ onBack }: { onBack?: () => void }) {
  const [title, setTitle] = useState('');
  const [targetGroup, setTargetGroup] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [timeLimit, setTimeLimit] = useState('');
  const [rules, setRules] = useState<Rule[]>([
    {
      id: '1',
      quantity: 5,
      discipline: '',
      topic: '',
      difficulty: '',
      bncc: '',
    },
  ]);
  const [shuffleAnswers, setShuffleAnswers] = useState(false);
  const [focusMode, setFocusMode] = useState(false);
  const [triCorrection, setTriCorrection] = useState(false);

  const addRule = () => {
    const newRule: Rule = {
      id: Date.now().toString(),
      quantity: 5,
      discipline: '',
      topic: '',
      difficulty: '',
      bncc: '',
    };
    setRules([...rules, newRule]);
  };

  const removeRule = (id: string) => {
    setRules(rules.filter((rule) => rule.id !== id));
  };

  const updateRule = (id: string, field: keyof Rule, value: any) => {
    setRules(
      rules.map((rule) =>
        rule.id === id ? { ...rule, [field]: value } : rule
      )
    );
  };

  const disciplines = ['Matemática', 'Biologia', 'Português', 'Física', 'Geografia', 'Química'];
  const topics = ['Operações Básicas', 'Processos Celulares', 'Literatura', 'Cinemática', 'Europa'];
  const difficulties = ['Fácil', 'Média', 'Difícil'];
  const bnccOptions = ['EM13MAT101', 'EM13CNT103', 'EM13LP48', 'EM13GEO101'];
  const groups = ['Turma A - 1º Ano', 'Turma B - 2º Ano', 'Turma C - 3º Ano'];

  return (
    <main className="flex-1 overflow-y-auto">
      <div className="p-8 pb-32">
        {/* Back Button */}
        {onBack && (
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-blue-950 hover:text-blue-900 font-medium mb-6 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            Voltar
          </button>
        )}

        {/* Page Header */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold text-blue-950 mb-2">Configurar Nova Prova</h1>
            <p className="text-slate-600">Crie uma prova personalizada com regras automáticas</p>
          </div>
          <Button variant="ghost" className="text-blue-950 border border-blue-950 hover:bg-blue-50 gap-2">
            <BookTemplate className="w-5 h-5" />
            Carregar de um Modelo
          </Button>
        </div>

        {/* Card 1: Informações Básicas */}
        <Card className="mb-6 border-slate-200">
          <CardHeader className="bg-blue-50 border-b border-slate-200">
            <CardTitle className="text-blue-950">Informações Básicas</CardTitle>
            <CardDescription className="text-slate-600">Configure os detalhes principais da prova</CardDescription>
          </CardHeader>
          <CardContent className="pt-6 space-y-5">
            {/* Título da Prova */}
            <div>
              <Label htmlFor="title" className="text-sm font-medium text-slate-900 mb-2 block">
                Título da Prova
              </Label>
              <Input
                id="title"
                placeholder="Ex: Avaliação de Matemática - 1º Bimestre"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="border-slate-200"
              />
            </div>

            {/* Grupo Destino */}
            <div>
              <Label htmlFor="group" className="text-sm font-medium text-slate-900 mb-2 block">
                Grupo Destino
              </Label>
              <Select value={targetGroup} onValueChange={setTargetGroup}>
                <SelectTrigger className="border-slate-200">
                  <SelectValue placeholder="Selecione o grupo de alunos" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all-groups">Todos os Grupos</SelectItem>
                  {groups.map((group) => (
                    <SelectItem key={group} value={group}>
                      {group}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Date and Time */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="date" className="text-sm font-medium text-slate-900 mb-2 block">
                  Data
                </Label>
                <Input
                  id="date"
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="border-slate-200"
                />
              </div>
              <div>
                <Label htmlFor="time" className="text-sm font-medium text-slate-900 mb-2 block">
                  Horário
                </Label>
                <Input
                  id="time"
                  type="time"
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  className="border-slate-200"
                />
              </div>
            </div>

            {/* Time Limit */}
            <div>
              <Label htmlFor="timeLimit" className="text-sm font-medium text-slate-900 mb-2 block">
                Tempo Limite (minutos)
              </Label>
              <Input
                id="timeLimit"
                type="number"
                placeholder="Ex: 90"
                value={timeLimit}
                onChange={(e) => setTimeLimit(e.target.value)}
                className="border-slate-200"
              />
            </div>
          </CardContent>
        </Card>

        {/* Card 2: Receita da Prova */}
        <Card className="mb-6 border-slate-200">
          <CardHeader className="bg-blue-50 border-b border-slate-200">
            <CardTitle className="text-blue-950">Receita da Prova</CardTitle>
            <CardDescription className="text-slate-600">Configure as regras para seleção automática de questões</CardDescription>
          </CardHeader>
          <CardContent className="pt-6 space-y-4">
            {/* Rules List */}
            {rules.map((rule, index) => (
              <div key={rule.id} className="p-4 bg-slate-50 rounded-lg border border-slate-200 space-y-4">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm font-medium text-slate-900">Regra {index + 1}</span>
                  {rules.length > 1 && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeRule(rule.id)}
                      className="text-red-600 hover:bg-red-50"
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
                  {/* Quantidade */}
                  <div>
                    <Label className="text-xs font-medium text-slate-700 mb-1 block">Quantidade</Label>
                    <Input
                      type="number"
                      min="1"
                      value={rule.quantity}
                      onChange={(e) => updateRule(rule.id, 'quantity', parseInt(e.target.value))}
                      className="border-slate-200"
                    />
                  </div>

                  {/* Disciplina */}
                  <div>
                    <Label className="text-xs font-medium text-slate-700 mb-1 block">Disciplina</Label>
                    <Select value={rule.discipline || 'all-disciplines'} onValueChange={(val) => updateRule(rule.id, 'discipline', val === 'all-disciplines' ? '' : val)}>
                      <SelectTrigger className="border-slate-200 text-sm">
                        <SelectValue placeholder="Qualquer" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all-disciplines">Qualquer Disciplina</SelectItem>
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
                    <Label className="text-xs font-medium text-slate-700 mb-1 block">Tópico</Label>
                    <Select value={rule.topic || 'all-topics'} onValueChange={(val) => updateRule(rule.id, 'topic', val === 'all-topics' ? '' : val)}>
                      <SelectTrigger className="border-slate-200 text-sm">
                        <SelectValue placeholder="Qualquer" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all-topics">Qualquer Tópico</SelectItem>
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
                    <Label className="text-xs font-medium text-slate-700 mb-1 block">Dificuldade</Label>
                    <Select value={rule.difficulty || 'all-difficulties'} onValueChange={(val) => updateRule(rule.id, 'difficulty', val === 'all-difficulties' ? '' : val)}>
                      <SelectTrigger className="border-slate-200 text-sm">
                        <SelectValue placeholder="Qualquer" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all-difficulties">Qualquer Dificuldade</SelectItem>
                        {difficulties.map((d) => (
                          <SelectItem key={d} value={d}>
                            {d}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* BNCC */}
                  <div>
                    <Label className="text-xs font-medium text-slate-700 mb-1 block">BNCC</Label>
                    <Select value={rule.bncc || 'all-bncc'} onValueChange={(val) => updateRule(rule.id, 'bncc', val === 'all-bncc' ? '' : val)}>
                      <SelectTrigger className="border-slate-200 text-sm">
                        <SelectValue placeholder="Qualquer" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all-bncc">Qualquer Habilidade</SelectItem>
                        {bnccOptions.map((b) => (
                          <SelectItem key={b} value={b}>
                            {b}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
            ))}

            {/* Add Rule Button */}
            <Button
              variant="ghost"
              onClick={addRule}
              className="text-emerald-600 hover:bg-emerald-50 w-full gap-2 font-medium"
            >
              <Plus className="w-4 h-4" />
              Adicionar Regra
            </Button>
          </CardContent>
        </Card>

        {/* Card 3: Segurança e Opções */}
        <Card className="mb-6 border-slate-200">
          <CardHeader className="bg-blue-50 border-b border-slate-200">
            <CardTitle className="text-blue-950">Segurança e Opções</CardTitle>
            <CardDescription className="text-slate-600">Configure comportamentos especiais da prova</CardDescription>
          </CardHeader>
          <CardContent className="pt-6 space-y-5">
            {/* Toggle: Embaralhar Alternativas */}
            <div className="flex items-center justify-between p-4 bg-slate-50 rounded-lg border border-slate-200">
              <div>
                <Label className="text-sm font-medium text-slate-900">Embaralhar Alternativas</Label>
                <p className="text-xs text-slate-600 mt-1">Muda a ordem das opções de resposta para cada aluno</p>
              </div>
              <Switch checked={shuffleAnswers} onCheckedChange={setShuffleAnswers} />
            </div>

            {/* Toggle: Modo Foco */}
            <div className="flex items-center justify-between p-4 bg-slate-50 rounded-lg border border-slate-200">
              <div>
                <Label className="text-sm font-medium text-slate-900">Modo Foco (Anti-Cola)</Label>
                <p className="text-xs text-slate-600 mt-1">Impede cópia de texto e captura de tela durante a prova</p>
              </div>
              <Switch checked={focusMode} onCheckedChange={setFocusMode} />
            </div>

            {/* Toggle: Correção TRI */}
            <div className="flex items-center justify-between p-4 bg-slate-50 rounded-lg border border-slate-200">
              <div>
                <Label className="text-sm font-medium text-slate-900">Correção TRI</Label>
                <p className="text-xs text-slate-600 mt-1">Aplica a Teoria de Resposta ao Item para pontuação</p>
              </div>
              <Switch checked={triCorrection} onCheckedChange={setTriCorrection} />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Sticky Footer */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 shadow-lg">
        <div className="max-w-full px-8 py-4 flex items-center justify-end gap-4">
          <Button variant="ghost" className="text-slate-700 hover:bg-slate-100 gap-2">
            <Eye className="w-4 h-4" />
            Ver como Aluno
          </Button>
          <Button className="bg-emerald-600 hover:bg-emerald-700 text-white gap-2">
            Gerar e Publicar Prova
          </Button>
        </div>
      </div>
    </main>
  );
}
