"use client"

import { useState } from "react"
import { Building2, GraduationCap, MapPin, Users, ChevronRight } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface School {
  id: string
  name: string
  address: string
  city: string
  studentsCount: number
  classesCount: number
}

interface SchoolSelectionPageProps {
  onSelectSchool: (schoolId: string) => void
}

const mockSchools: School[] = [
  {
    id: "1",
    name: "Escola Municipal João da Silva",
    address: "Rua das Flores, 123",
    city: "Aracaju - SE",
    studentsCount: 450,
    classesCount: 12,
  },
  {
    id: "2",
    name: "Escola Estadual Maria de Souza",
    address: "Av. Principal, 456",
    city: "Aracaju - SE",
    studentsCount: 680,
    classesCount: 18,
  },
  {
    id: "3",
    name: "Colégio São José",
    address: "Praça Central, 789",
    city: "Nossa Senhora do Socorro - SE",
    studentsCount: 320,
    classesCount: 10,
  },
]

export function SchoolSelectionPage({ onSelectSchool }: SchoolSelectionPageProps) {
  const [selectedSchool, setSelectedSchool] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const handleSelectSchool = async (schoolId: string) => {
    setSelectedSchool(schoolId)
    setIsLoading(true)
    
    // Simula um delay de carregamento
    await new Promise(resolve => setTimeout(resolve, 800))
    
    setIsLoading(false)
    onSelectSchool(schoolId)
  }

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="max-w-2xl mx-auto py-8">
        {/* Header */}
        <div className="flex flex-col items-center mb-8">
          <div className="flex items-center justify-center w-16 h-16 rounded-2xl bg-primary mb-4">
            <GraduationCap className="w-8 h-8 text-primary-foreground" />
          </div>
          <h1 className="text-2xl font-bold text-foreground">Bem-vindo, Professor!</h1>
          <p className="text-muted-foreground mt-1 text-center">
            Selecione a escola em que deseja trabalhar hoje
          </p>
        </div>

        {/* Info Badge */}
        <div className="flex justify-center mb-6">
          <Badge variant="secondary" className="px-4 py-2 text-sm">
            <Users className="w-4 h-4 mr-2" />
            Você está vinculado a {mockSchools.length} escolas
          </Badge>
        </div>

        {/* Lista de Escolas */}
        <div className="space-y-4">
          {mockSchools.map((school) => (
            <Card
              key={school.id}
              className={`cursor-pointer transition-all duration-200 hover:shadow-md hover:border-primary/50 ${
                selectedSchool === school.id ? "border-primary ring-2 ring-primary/20" : "border-border"
              } ${isLoading && selectedSchool === school.id ? "opacity-70" : ""}`}
              onClick={() => !isLoading && handleSelectSchool(school.id)}
            >
              <CardContent className="p-4">
                <div className="flex items-center gap-4">
                  {/* Ícone da Escola */}
                  <div className="flex items-center justify-center w-14 h-14 rounded-xl bg-secondary/10 shrink-0">
                    <Building2 className="w-7 h-7 text-secondary" />
                  </div>

                  {/* Informações da Escola */}
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-foreground truncate">
                      {school.name}
                    </h3>
                    <div className="flex items-center gap-1 text-sm text-muted-foreground mt-1">
                      <MapPin className="w-3.5 h-3.5 shrink-0" />
                      <span className="truncate">{school.address} - {school.city}</span>
                    </div>
                    <div className="flex items-center gap-4 mt-2">
                      <span className="text-xs text-muted-foreground">
                        <span className="font-medium text-foreground">{school.studentsCount}</span> alunos
                      </span>
                      <span className="text-xs text-muted-foreground">
                        <span className="font-medium text-foreground">{school.classesCount}</span> turmas
                      </span>
                    </div>
                  </div>

                  {/* Indicador de Seleção */}
                  <div className="shrink-0">
                    {isLoading && selectedSchool === school.id ? (
                      <div className="h-5 w-5 animate-spin rounded-full border-2 border-primary border-t-transparent" />
                    ) : (
                      <ChevronRight className="w-5 h-5 text-muted-foreground" />
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Footer Info */}
        <p className="text-center text-sm text-muted-foreground mt-8">
          Não encontrou sua escola?{" "}
          <button
            type="button"
            className="text-primary hover:text-primary/80 font-medium transition-colors"
          >
            Solicitar vinculação
          </button>
        </p>
      </div>
    </div>
  )
}
