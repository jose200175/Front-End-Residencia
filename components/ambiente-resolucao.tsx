'use client';

import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, LogOut, Zap, Type, Contrast } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface Question {
  id: number;
  number: number;
  discipline: string;
  topic: string;
  text: string;
  image?: string;
  options: Array<{
    id: string;
    text: string;
  }>;
}

const mockQuestions: Question[] = [
  {
    id: 1,
    number: 4,
    discipline: 'Matemática',
    topic: 'Geometria Plana',
    text: 'Uma praça circular tem raio de 50 metros. Qual é a área aproximada dessa praça?',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=400',
    options: [
      { id: 'a', text: 'Aproximadamente 7.850 m²' },
      { id: 'b', text: 'Aproximadamente 8.200 m²' },
      { id: 'c', text: 'Aproximadamente 9.500 m²' },
      { id: 'd', text: 'Aproximadamente 10.000 m²' },
    ],
  },
  {
    id: 2,
    number: 5,
    discipline: 'Português',
    topic: 'Interpretação de Texto',
    text: 'Leia o texto e responda qual é a ideia principal do autor ao mencionar o fenômeno natural descrito.',
    options: [
      { id: 'a', text: 'Alertar sobre os perigos climáticos' },
      { id: 'b', text: 'Explicar a beleza da natureza' },
      { id: 'c', text: 'Descrever eventos históricos' },
      { id: 'd', text: 'Criticar a sociedade moderna' },
    ],
  },
];

export function AmbienteResolucao() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, string>>({});
  const [timeRemaining, setTimeRemaining] = useState(5400);
  const [autoSaving, setAutoSaving] = useState(false);

  const currentQuestion = mockQuestions[currentQuestionIndex];
  const totalQuestions = 20;
  const answeredCount = Object.keys(selectedAnswers).length;
  const progressPercentage = (currentQuestionIndex / totalQuestions) * 100;

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeRemaining((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const saveInterval = setInterval(() => {
      setAutoSaving(true);
      setTimeout(() => setAutoSaving(false), 1500);
    }, 5000);
    return () => clearInterval(saveInterval);
  }, []);

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  const handleSelectAnswer = (optionId: string) => {
    setSelectedAnswers((prev) => ({
      ...prev,
      [currentQuestion.number]: optionId,
    }));
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleNext = () => {
    if (currentQuestionIndex < mockQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Top Bar */}
      <div className="bg-white border-b border-slate-200 px-8 py-4 flex items-center justify-between">
        <div>
          <h1 className="text-lg font-bold text-blue-950">Prova de Seleção 2024</h1>
        </div>

        <div className="flex items-center gap-2 px-4 py-2 bg-yellow-50 border border-yellow-300 rounded-lg">
          <div className="w-2 h-2 bg-yellow-500 rounded-full animate-pulse"></div>
          <span className="text-sm font-medium text-yellow-900">Modo Foco Ativo - Não saia desta aba</span>
        </div>

        <div className="flex items-center gap-6">
          <div className="text-center">
            <div className="text-lg font-mono font-bold text-blue-950">{formatTime(timeRemaining)}</div>
          </div>

          {autoSaving && (
            <div className="flex items-center gap-1 text-emerald-600 text-sm font-medium">
              <Zap className="w-4 h-4" />
              Salvamento automático...
            </div>
          )}

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="text-blue-950 hover:bg-slate-100 h-10 w-10"
              >
                <Contrast className="w-5 h-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem className="gap-2 cursor-pointer">
                <Contrast className="w-4 h-4" />
                <span>Alto Contraste</span>
              </DropdownMenuItem>
              <DropdownMenuItem className="gap-2 cursor-pointer">
                <Type className="w-4 h-4" />
                <span>Aumentar Fonte</span>
              </DropdownMenuItem>
              <DropdownMenuItem className="gap-2 cursor-pointer">
                <Type className="w-4 h-4" />
                <span>Diminuir Fonte</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto flex justify-center items-start pt-8 pb-32 px-4">
        <div className="w-full max-w-3xl bg-white rounded-lg border border-slate-200 shadow-sm p-8">
          <div className="mb-8">
            <div className="flex items-baseline gap-2 mb-2">
              <h2 className="text-2xl font-bold text-blue-950">Questão {currentQuestion.number} de {totalQuestions}</h2>
            </div>
            <p className="text-sm text-slate-600">{currentQuestion.discipline} / {currentQuestion.topic}</p>
          </div>

          <div className="mb-8 space-y-6">
            <p className="text-lg text-blue-950 leading-relaxed">{currentQuestion.text}</p>

            {currentQuestion.image && (
              <div className="bg-slate-100 rounded-lg overflow-hidden h-64 flex items-center justify-center border border-slate-300">
                <img
                  src={currentQuestion.image}
                  alt="Question illustration"
                  className="w-full h-full object-cover"
                />
              </div>
            )}
          </div>

          <div className="space-y-3">
            {currentQuestion.options.map((option) => (
              <button
                key={option.id}
                onClick={() => handleSelectAnswer(option.id)}
                className={`w-full p-4 text-left rounded-lg border-2 transition-all ${
                  selectedAnswers[currentQuestion.number] === option.id
                    ? 'border-emerald-600 bg-emerald-50'
                    : 'border-slate-300 bg-white hover:border-slate-400'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                      selectedAnswers[currentQuestion.number] === option.id
                        ? 'border-emerald-600 bg-emerald-600'
                        : 'border-slate-400'
                    }`}
                  >
                    {selectedAnswers[currentQuestion.number] === option.id && (
                      <div className="w-2 h-2 bg-white rounded-full"></div>
                    )}
                  </div>
                  <span className="text-blue-950 font-medium">{option.text}</span>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 px-8 py-6">
        <div className="max-w-6xl mx-auto flex items-center justify-between gap-6">
          <Button
            onClick={handlePrevious}
            disabled={currentQuestionIndex === 0}
            className="gap-2 text-slate-700 border-slate-300 hover:bg-slate-50 disabled:opacity-50"
            variant="outline"
          >
            <ChevronLeft className="w-4 h-4" />
            Anterior
          </Button>

          <div className="flex-1 flex flex-col gap-2">
            <div className="w-full bg-slate-200 rounded-full h-2 overflow-hidden">
              <div
                className="bg-emerald-600 h-full transition-all duration-300"
                style={{ width: `${progressPercentage}%` }}
              />
            </div>
            <p className="text-xs text-slate-600 text-center">
              {answeredCount} de {totalQuestions} questões respondidas
            </p>
          </div>

          <Button
            onClick={handleNext}
            disabled={currentQuestionIndex === mockQuestions.length - 1}
            className="gap-2 text-slate-700 border-slate-300 hover:bg-slate-50 disabled:opacity-50"
            variant="outline"
          >
            Próxima
            <ChevronRight className="w-4 h-4" />
          </Button>

          <Button className="gap-2 bg-red-600 hover:bg-red-700 text-white ml-4">
            <LogOut className="w-4 h-4" />
            Finalizar Prova
          </Button>
        </div>
      </div>
    </div>
  );
}
