'use client';

interface GroupBank {
  id: string;
  name: string;
  members: number;
  questionsCount: number;
  color: string;
}

const mockGroupBanks: GroupBank[] = [
  {
    id: '1',
    name: '3º Ano A',
    members: 28,
    questionsCount: 45,
    color: 'bg-emerald-50 border-emerald-200',
  },
  {
    id: '2',
    name: 'Cursinho Noturno',
    members: 15,
    questionsCount: 82,
    color: 'bg-blue-50 border-blue-200',
  },
  {
    id: '3',
    name: '2º Ano B',
    members: 32,
    questionsCount: 56,
    color: 'bg-amber-50 border-amber-200',
  },
  {
    id: '4',
    name: 'Reforço ENEM',
    members: 22,
    questionsCount: 120,
    color: 'bg-purple-50 border-purple-200',
  },
];

export function GroupBanksGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {mockGroupBanks.map((group) => (
        <div
          key={group.id}
          className={`${group.color} border-2 rounded-lg p-6 cursor-pointer transition-all hover:shadow-md hover:scale-105`}
        >
          <h3 className="text-lg font-bold text-slate-900 mb-2">{group.name}</h3>
          <p className="text-sm text-slate-600 mb-4">
            {group.members} membros • {group.questionsCount} questões
          </p>
          <button className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-medium py-2 rounded-md transition-colors text-sm">
            Ver Banco
          </button>
        </div>
      ))}
    </div>
  );
}
