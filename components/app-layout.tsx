'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';
import { Sidebar } from '@/components/sidebar';
import { Navbar } from '@/components/navbar';
import { DashboardView } from '@/components/dashboard-view';
import { QuestionBank } from '@/components/question-bank';
import { TemplatesManager } from '@/components/templates-manager';
import { NovaProva } from '@/components/nova-prova';
import { AmbienteResolucao } from '@/components/ambiente-resolucao';
import { RelatoriosDesempenho } from '@/components/relatorios-desempenho';
import { CaixaDeEntrada } from '@/components/caixa-entrada';

const ProvasHub = dynamic(() => import('@/components/provas-hub').then(mod => ({ default: mod.ProvasHub })));
const GruposHub = dynamic(() => import('@/components/grupos-hub').then(mod => ({ default: mod.GruposHub })));

export function AppLayout() {
  const [currentPage, setCurrentPage] = useState<'dashboard' | 'banco-questoes' | 'modelos' | 'provas' | 'grupos' | 'caixa-entrada' | 'resolucao' | 'relatorios' | 'criar-prova'>('dashboard');
  const [selectedTestForReport, setSelectedTestForReport] = useState<any>(null);

  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar - Hidden in resolucao mode */}
      {currentPage !== 'resolucao' && <Sidebar onNavigate={setCurrentPage} />}

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Navbar - Hidden in resolucao mode */}
        {currentPage !== 'resolucao' && <Navbar currentPage={currentPage} />}

        {/* Page Content */}
        {currentPage === 'resolucao' ? (
          <AmbienteResolucao />
        ) : currentPage === 'relatorios' ? (
          <RelatoriosDesempenho testData={selectedTestForReport} onBack={() => setCurrentPage('provas')} />
        ) : currentPage === 'criar-prova' ? (
          <NovaProva onBack={() => setCurrentPage('dashboard')} />
        ) : currentPage === 'dashboard' ? (
          <DashboardView onCreateTest={() => setCurrentPage('criar-prova')} />
        ) : currentPage === 'provas' ? (
          <ProvasHub onViewReport={(testData) => {
            setSelectedTestForReport(testData);
            setCurrentPage('relatorios');
          }} onCreateTest={() => setCurrentPage('criar-prova')} />
        ) : currentPage === 'grupos' ? (
          <GruposHub />
        ) : currentPage === 'caixa-entrada' ? (
          <CaixaDeEntrada />
        ) : currentPage === 'banco-questoes' ? (
          <QuestionBank />
        ) : currentPage === 'modelos' ? (
          <TemplatesManager />
        ) : (
          <NovaProva onBack={() => setCurrentPage('dashboard')} />
        )}
      </div>
    </div>
  );
}
