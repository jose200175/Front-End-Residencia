'use client';

import { useState } from 'react';
import { Sidebar } from '@/components/sidebar';
import { Navbar } from '@/components/navbar';
import { DashboardView } from '@/components/dashboard-view';
import { QuestionBank } from '@/components/question-bank';
import { TemplatesManager } from '@/components/templates-manager';
import { NovaProva } from '@/components/nova-prova';
import { AmbienteResolucao } from '@/components/ambiente-resolucao';
import { RelatoriosDesempenho } from '@/components/relatorios-desempenho';
import { ProvasHub } from '@/components/provas-hub';
import { GruposHub } from '@/components/grupos-hub';

export function AppLayout() {
  const [currentPage, setCurrentPage] = useState<'dashboard' | 'banco-questoes' | 'modelos' | 'provas' | 'grupos' | 'caixa-entrada' | 'resolucao' | 'relatorios'>('dashboard');
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
        ) : currentPage === 'dashboard' ? (
          <DashboardView />
        ) : currentPage === 'provas' ? (
          <ProvasHub onViewReport={(testData) => {
            setSelectedTestForReport(testData);
            setCurrentPage('relatorios');
          }} />
        ) : currentPage === 'grupos' ? (
          <GruposHub />
        ) : currentPage === 'banco-questoes' ? (
          <QuestionBank />
        ) : currentPage === 'modelos' ? (
          <TemplatesManager />
        ) : (
          <NovaProva />
        )}
      </div>
    </div>
  );
}
