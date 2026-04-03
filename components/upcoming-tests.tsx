'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar, Clock } from 'lucide-react';

interface Test {
  id: string;
  name: string;
  subject: string;
  date: string;
  time: string;
  status: 'upcoming' | 'active' | 'completed';
}

const upcomingTests: Test[] = [
  {
    id: '1',
    name: 'Avaliação de Matemática',
    subject: 'Matemática',
    date: '2025-04-10',
    time: '14:00',
    status: 'upcoming',
  },
  {
    id: '2',
    name: 'Simulado de Português',
    subject: 'Português',
    date: '2025-04-08',
    time: '10:00',
    status: 'active',
  },
  {
    id: '3',
    name: 'Quiz de História',
    subject: 'História',
    date: '2025-04-05',
    time: '16:00',
    status: 'upcoming',
  },
  {
    id: '4',
    name: 'Prova de Ciências',
    subject: 'Ciências',
    date: '2025-04-15',
    time: '13:30',
    status: 'upcoming',
  },
];

function getStatusBadge(status: string) {
  switch (status) {
    case 'active':
      return (
        <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Em Andamento</Badge>
      );
    case 'completed':
      return (
        <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">Concluída</Badge>
      );
    default:
      return (
        <Badge className="bg-gray-100 text-gray-800 hover:bg-gray-100">Agendada</Badge>
      );
  }
}

function formatDate(dateString: string): string {
  const date = new Date(dateString + 'T00:00:00');
  return date.toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });
}

export function UpcomingTests() {
  return (
    <Card className="border-border h-full">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-foreground">
          Minhas Próximas Provas
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {upcomingTests.map((test) => (
            <div
              key={test.id}
              className="flex items-center justify-between p-4 bg-muted rounded-lg border border-border hover:bg-muted/80 transition-colors"
            >
              <div className="flex-1">
                <h3 className="font-medium text-foreground">{test.name}</h3>
                <div className="flex items-center gap-4 mt-2">
                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                    <Calendar className="w-4 h-4" />
                    {formatDate(test.date)}
                  </div>
                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                    <Clock className="w-4 h-4" />
                    {test.time}
                  </div>
                  <span className="text-xs px-2 py-1 bg-primary/10 text-primary rounded-md">
                    {test.subject}
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-3 ml-4">
                {getStatusBadge(test.status)}
                <Button
                  size="sm"
                  className={
                    test.status === 'active'
                      ? 'bg-primary text-primary-foreground hover:bg-primary/90'
                      : 'bg-secondary text-secondary-foreground hover:bg-secondary/90'
                  }
                >
                  {test.status === 'active' ? 'Realizar' : 'Ver'}
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
