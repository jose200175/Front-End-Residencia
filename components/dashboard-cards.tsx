'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FileText, BookOpen, Mail } from 'lucide-react';

interface SummaryCard {
  title: string;
  value: number;
  icon: React.ReactNode;
  color: 'blue' | 'purple' | 'orange';
}

const summaryCards: SummaryCard[] = [
  {
    title: 'Provas Ativas',
    value: 8,
    icon: <FileText className="w-6 h-6" />,
    color: 'blue',
  },
  {
    title: 'Questões no Banco',
    value: 142,
    icon: <BookOpen className="w-6 h-6" />,
    color: 'purple',
  },
  {
    title: 'Convites Pendentes',
    value: 3,
    icon: <Mail className="w-6 h-6" />,
    color: 'orange',
  },
];

function getColorClasses(
  color: 'blue' | 'purple' | 'orange'
): { bg: string; text: string } {
  switch (color) {
    case 'blue':
      return { bg: 'bg-blue-50', text: 'text-blue-600' };
    case 'purple':
      return { bg: 'bg-purple-50', text: 'text-purple-600' };
    case 'orange':
      return { bg: 'bg-orange-50', text: 'text-orange-600' };
  }
}

export function DashboardCards() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {summaryCards.map((card) => {
        const colors = getColorClasses(card.color);
        return (
          <Card key={card.title} className="border-border">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {card.title}
              </CardTitle>
              <div className={`p-2 rounded-lg ${colors.bg}`}>
                <div className={colors.text}>{card.icon}</div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-foreground">{card.value}</div>
              <p className="text-xs text-muted-foreground mt-1">
                {card.title === 'Provas Ativas' && '2 em andamento'}
                {card.title === 'Questões no Banco' && '18 novas essa semana'}
                {card.title === 'Convites Pendentes' && 'Verificar grupos'}
              </p>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
