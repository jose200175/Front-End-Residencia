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

export function AppLayout() {
  const [currentPage, setCurrentPage] = useState<'dashboard' | 'banco-questoes' | 'modelos' | 'provas' | 'resolucao' | 'relatorios'>('dashboard');

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
          <RelatoriosDesempenho />
        ) : currentPage === 'dashboard' ? (
          <DashboardView />
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
