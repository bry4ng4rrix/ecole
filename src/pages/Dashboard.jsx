import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  LogOut, Home, Users, BookOpen, Calendar, FileText, Bell, Settings,
  GraduationCap, UserCog, ClipboardList, DollarSign, BarChart3, Menu
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'

function Dashboard() {
  const navigate = useNavigate()
  
  // Simulation : à remplacer par un vrai contexte d'auth (useAuth, Redux, etc.)
  const user = {
    firstName: 'Manampisoa',
    lastName: 'Rakoto',
    role: 'RESPONSABLE', // ← change ici pour tester : ETUDIANT / ENSEIGNANT / RESPONSABLE / SECRETARIAT / ADMIN
    email: 'responsable@lycee.mg'
  }

  const [sidebarOpen, setSidebarOpen] = useState(false)

  const handleLogout = () => {
    // À remplacer par vraie déconnexion (clear token, etc.)
    localStorage.removeItem('access_token')
    localStorage.removeItem('refresh_token')
    navigate('/login')
  }

  // Navigation par rôle
  const getNavItems = () => {
    const commonItems = [
      { icon: Home, label: 'Tableau de bord', path: '/dashboard', visibleFor: ['ETUDIANT', 'ENSEIGNANT', 'RESPONSABLE', 'SECRETARIAT', 'ADMIN'] },
      { icon: Bell, label: 'Notifications', path: '/notifications', visibleFor: ['ETUDIANT', 'ENSEIGNANT', 'RESPONSABLE', 'SECRETARIAT', 'ADMIN'] },
      { icon: Settings, label: 'Paramètres', path: '/settings', visibleFor: ['ETUDIANT', 'ENSEIGNANT', 'RESPONSABLE', 'SECRETARIAT', 'ADMIN'] },
    ]

    const roleSpecific = {
      ETUDIANT: [
        { icon: BookOpen, label: 'Mes notes', path: '/student/notes' },
        { icon: Calendar, label: 'Emploi du temps', path: '/student/timetable' },
        { icon: FileText, label: 'Bulletins', path: '/student/bulletins' },
        { icon: DollarSign, label: 'Mes paiements', path: '/student/paiements' },
      ],
      ENSEIGNANT: [
        { icon: BookOpen, label: 'Mes classes', path: '/teacher/classes' },
        { icon: ClipboardList, label: 'Saisie notes', path: '/teacher/notes' },
        { icon: Calendar, label: 'Appel & présences', path: '/teacher/presences' },
      ],
      RESPONSABLE: [
        { icon: GraduationCap, label: 'Élèves & classes', path: '/responsable/eleves' },
        { icon: BarChart3, label: 'Statistiques', path: '/responsable/stats' },
        { icon: ClipboardList, label: 'Conseil de classe', path: '/responsable/conseil' },
        { icon: FileText, label: 'Bulletins globaux', path: '/responsable/bulletins' },
      ],
      SECRETARIAT: [
        { icon: Users, label: 'Gestion élèves', path: '/secretariat/eleves' },
        { icon: DollarSign, label: 'Frais & paiements', path: '/secretariat/paiements' },
        { icon: FileText, label: 'Documents', path: '/secretariat/documents' },
        { icon: Calendar, label: 'Absences globales', path: '/secretariat/absences' },
      ],
      ADMIN: [
        { icon: Users, label: 'Utilisateurs', path: '/admin/utilisateurs' },
        { icon: GraduationCap, label: 'Classes & matières', path: '/admin/classes' },
        { icon: DollarSign, label: 'Finances', path: '/admin/finances' },
        { icon: Settings, label: 'Configuration', path: '/admin/config' },
      ],
    }

    return [
      ...commonItems.filter(item => item.visibleFor.includes(user.role)),
      ...(roleSpecific[user.role] || []),
    ]
  }

  const navItems = getNavItems()

  const DashboardCard = ({ icon: Icon, title, value, color, status }) => (
    <Card>
      <CardContent className="p-1">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-muted-foreground">{title}</p>
            <p className="text-2xl font-bold">{value}</p>
            {status && (
              <Badge variant={status === 'good' ? 'default' : 'destructive'} className="mt-2">
                {status === 'good' ? 'À jour' : 'En retard'}
              </Badge>
            )}
          </div>
          <Icon className={`w-8 h-8 ${
            color === 'indigo' ? 'text-indigo-600' :
            color === 'blue' ? 'text-blue-600' :
            color === 'green' ? 'text-green-600' :
            color === 'purple' ? 'text-purple-600' :
            color === 'red' ? 'text-red-600' :
            color === 'amber' ? 'text-amber-600' :
            'text-gray-600'
          }`} />
        </div>
      </CardContent>
    </Card>
  )

  const SidebarContent = () => (
    <div className="h-full flex flex-col">
      <div className="p-6 border-b border-border">
        <div className="flex items-center gap-3">
          <GraduationCap className="w-8 h-8 text-primary" />
          <h1 className="text-xl font-bold text-primary">SIG-Lycée</h1>
        </div>
        <Badge variant="secondary" className="mt-2 w-fit">{user.role}</Badge>
      </div>

      <nav className="flex-1 p-4 space-y-1">
        {navItems.map((item, index) => (
          <Button
            key={index}
            variant="ghost"
            className="w-full justify-start"
            onClick={() => navigate(item.path)}
          >
            <item.icon className="w-5 h-5 mr-3" />
            {item.label}
          </Button>
        ))}
      </nav>

      <div className="p-4 border-t border-border">
        <div className="flex items-center gap-3 mb-4">
          <Avatar className="w-10 h-10">
            <AvatarFallback className="bg-primary text-primary-foreground">
              {user.firstName[0]}{user.lastName[0]}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <p className="font-medium text-sm truncate">{user.firstName} {user.lastName}</p>
            <p className="text-xs text-muted-foreground truncate">{user.email}</p>
          </div>
        </div>
        <Button
          variant="outline"
          className="w-full"
          onClick={handleLogout}
        >
          <LogOut className="w-4 h-4 mr-2" />
          Déconnexion
        </Button>
      </div>
    </div>
  )

  return (
    <div className="min-h-screen bg-background">
      {/* Header mobile */}
      <header className="bg-card border-b border-border lg:hidden sticky top-0 z-30">
        <div className="px-4 py-3 flex justify-between items-center">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="sm">
                <Menu className="w-5 h-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-64 p-0">
              <SidebarContent />
            </SheetContent>
          </Sheet>
          <h1 className="text-lg font-bold text-primary">SIG-Lycée</h1>
          <div className="w-9 h-9" /> {/* Espace vide */}
        </div>
      </header>

      <div className="flex">
        {/* Sidebar desktop */}
        <aside className="hidden lg:block w-64 bg-card border-r border-border">
          <SidebarContent />
        </aside>

        {/* Contenu principal */}
        <div className="flex-1">
          <main className="p-4 md:p-2">
            <div className="max-w-7xl mx-auto">
              <div className="mb-8">
                <h2 className="text-2xl md:text-3xl font-bold text-foreground">
                  Bienvenue, {user.firstName} {user.lastName}
                </h2>
                <p className="text-muted-foreground mt-1">Tableau de bord {user.role.toLowerCase()}</p>
              </div>

            {/* Cartes selon rôle */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {user.role === 'ETUDIANT' && (
                <>
                  <DashboardCard icon={BookOpen} title="Dernières notes" value="Moyenne : 14.2/20" color="indigo" />
                  <DashboardCard icon={Calendar} title="Prochain cours" value="Mathématiques - 14h00" color="blue" />
                  <DashboardCard icon={DollarSign} title="Solde à payer" value="150 000 Ar" color="red" />
                </>
              )}

              {user.role === 'ENSEIGNANT' && (
                <>
                  <DashboardCard icon={Users} title="Élèves suivis" value="28 élèves" color="green" />
                  <DashboardCard icon={ClipboardList} title="Notes à saisir" value="Classe 3ème A" color="purple" />
                  <DashboardCard icon={Calendar} title="Prochain appel" value="Aujourd'hui 8h" color="orange" />
                </>
              )}

              {user.role === 'RESPONSABLE' && (
                <>
                  <DashboardCard icon={BarChart3} title="Taux de réussite" value="78%" color="indigo" />
                  <DashboardCard icon={GraduationCap} title="Élèves en difficulté" value="12 élèves" color="red" />
                  <DashboardCard icon={FileText} title="Bulletins à valider" value="3 classes" color="blue" />
                </>
              )}

              {user.role === 'SECRETARIAT' && (
                <>
                  <DashboardCard icon={Users} title="Inscriptions en attente" value="8 dossiers" color="amber" />
                  <DashboardCard icon={DollarSign} title="Recettes du mois" value="2 450 000 Ar" color="green" />
                  <DashboardCard icon={FileText} title="Documents à délivrer" value="15 demandes" color="purple" />
                </>
              )}

              {user.role === 'ADMIN' && (
                <>
                  <DashboardCard icon={Users} title="Utilisateurs actifs" value="342" color="indigo" />
                  <DashboardCard icon={BarChart3} title="Statistiques globales" value="Voir rapport" color="blue" />
                  <DashboardCard icon={Settings} title="Configuration" value="Gérer paramètres" color="gray" />
                </>
              )}
            </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  )
}

export default Dashboard