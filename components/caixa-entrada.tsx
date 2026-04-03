'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { User, Bell, Mail, Check, X } from 'lucide-react';

interface Message {
  id: string;
  senderName: string;
  type: 'invite' | 'system' | 'notification';
  subject: string;
  preview: string;
  dateTime: string;
  isRead: boolean;
  isInvite?: boolean;
}

const messages: Message[] = [
  {
    id: '1',
    senderName: 'Prof. Carlos',
    type: 'invite',
    subject: 'Convite para Administrador',
    preview: 'Carlos convidou você para administrar o grupo 3º Ano A',
    dateTime: 'Hoje, 14:30',
    isRead: false,
    isInvite: true,
  },
  {
    id: '2',
    senderName: 'Sistema',
    type: 'system',
    subject: 'Resultado Disponível',
    preview: 'Sua nota do Simulado de Matemática já está disponível',
    dateTime: 'Hoje, 12:15',
    isRead: false,
  },
  {
    id: '3',
    senderName: 'Prof. Marina',
    type: 'invite',
    subject: 'Novo Grupo - 2º Ano B',
    preview: 'Marina convidou você para administrar o grupo 2º Ano B',
    dateTime: 'Ontem, 16:45',
    isRead: true,
    isInvite: true,
  },
  {
    id: '4',
    senderName: 'Sistema',
    type: 'notification',
    subject: 'Nova Avaliação',
    preview: 'Uma nova avaliação foi criada para seu grupo',
    dateTime: 'Ontem, 10:30',
    isRead: true,
  },
];

export function CaixaDeEntrada() {
  const [filter, setFilter] = useState<'todas' | 'nao-lidas' | 'convites'>('todas');
  const [messageList, setMessageList] = useState<Message[]>(messages);

  const filteredMessages = messageList.filter((msg) => {
    if (filter === 'nao-lidas') return !msg.isRead;
    if (filter === 'convites') return msg.isInvite;
    return true;
  });

  const handleAccept = (id: string) => {
    setMessageList(messageList.filter((msg) => msg.id !== id));
  };

  const handleReject = (id: string) => {
    setMessageList(messageList.filter((msg) => msg.id !== id));
  };

  const getIcon = (type: string) => {
    if (type === 'invite') return <User className="w-5 h-5 text-blue-950" />;
    return <Bell className="w-5 h-5 text-blue-950" />;
  };

  return (
    <main className="flex-1 overflow-y-auto bg-slate-50">
      <div className="p-8 max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-blue-950">Caixa de Entrada</h1>
          <p className="text-slate-600 mt-2">Gerenciar mensagens e convites</p>
        </div>

        {/* Filter Tabs */}
        <div className="flex gap-3 mb-8 border-b border-slate-200">
          <button
            onClick={() => setFilter('todas')}
            className={`px-4 py-3 text-sm font-medium transition-colors border-b-2 ${
              filter === 'todas'
                ? 'border-blue-950 text-blue-950'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            Todas
          </button>
          <button
            onClick={() => setFilter('nao-lidas')}
            className={`px-4 py-3 text-sm font-medium transition-colors border-b-2 ${
              filter === 'nao-lidas'
                ? 'border-blue-950 text-blue-950'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            Não Lidas
          </button>
          <button
            onClick={() => setFilter('convites')}
            className={`px-4 py-3 text-sm font-medium transition-colors border-b-2 ${
              filter === 'convites'
                ? 'border-blue-950 text-blue-950'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            Convites
          </button>
        </div>

        {/* Messages List */}
        {filteredMessages.length > 0 ? (
          <div className="space-y-2">
            {filteredMessages.map((msg) => (
              <div
                key={msg.id}
                className={`flex items-center gap-4 p-5 rounded-lg border transition-all ${
                  msg.isRead
                    ? 'bg-white border-slate-200 hover:border-slate-300'
                    : 'bg-blue-50 border-blue-200 hover:border-blue-300'
                }`}
              >
                {/* Unread Indicator */}
                <div className="flex-shrink-0">
                  {!msg.isRead && (
                    <div className="w-3 h-3 rounded-full bg-emerald-600"></div>
                  )}
                </div>

                {/* Icon */}
                <div className="flex-shrink-0">{getIcon(msg.type)}</div>

                {/* Message Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-slate-900">{msg.senderName}</span>
                  </div>
                  <p className="text-sm font-medium text-slate-900 mt-1">{msg.subject}</p>
                  <p className="text-sm text-slate-600 mt-1 line-clamp-1">{msg.preview}</p>
                </div>

                {/* Date/Time */}
                <div className="flex-shrink-0 text-xs text-slate-600 whitespace-nowrap">
                  {msg.dateTime}
                </div>

                {/* Inline Actions for Invites */}
                {msg.isInvite && (
                  <div className="flex-shrink-0 flex gap-2">
                    <Button
                      size="sm"
                      className="bg-emerald-600 hover:bg-emerald-700 text-white gap-1 font-medium"
                      onClick={() => handleAccept(msg.id)}
                    >
                      <Check className="w-4 h-4" />
                      Aceitar
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      className="text-red-600 hover:bg-red-50 border border-red-200 gap-1 font-medium"
                      onClick={() => handleReject(msg.id)}
                    >
                      <X className="w-4 h-4" />
                      Recusar
                    </Button>
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <Card className="border-slate-200">
            <CardContent className="pt-12 pb-12 text-center">
              <Mail className="w-12 h-12 text-slate-400 mx-auto mb-4" />
              <p className="text-slate-600 font-medium">Nenhuma mensagem</p>
              <p className="text-slate-500 text-sm mt-2">Sua caixa de entrada está vazia</p>
            </CardContent>
          </Card>
        )}
      </div>
    </main>
  );
}
