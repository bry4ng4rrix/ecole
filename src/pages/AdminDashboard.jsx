import { useState } from 'react'
import {
  LogOut, Users, BookOpen, DollarSign, Settings, BarChart3, Clock, FileText,
  MessageSquare, Menu, X, Download, Edit2, Trash2, Plus, TrendingUp, TrendingDown,
  Calendar, CheckCircle, AlertCircle, Home, Layers, Gauge, Database, Eye, Bell
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import {
  StudentModal, TeacherModal, GradeModal, AnnouncementModal, DetailModal
} from '@/components/AdminModals'
import {
  mockStudents, mockTeachers, mockGrades, mockAttendance, mockAnnouncements,
  mockStatistics, getStudentGrades, getStudentAttendance, getStudentPayments
} from '@/data/mockData'

function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('home')
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [students, setStudents] = useState(mockStudents)
  const [teachers, setTeachers] = useState(mockTeachers)
  const [grades, setGrades] = useState(mockGrades)
  const [announcements, setAnnouncements] = useState(mockAnnouncements)
  
  // Modal states
  const [studentModal, setStudentModal] = useState({ open: false, data: null })
  const [teacherModal, setTeacherModal] = useState({ open: false, data: null })
  const [gradeModal, setGradeModal] = useState({ open: false, data: null })
  const [announcementModal, setAnnouncementModal] = useState({ open: false, data: null })
  const [detailModal, setDetailModal] = useState({ open: false, title: '', data: {}, fields: [] })

  const menuItems = [
    { id: 'home', label: 'Tableau de bord', icon: Home },
    { id: 'etudiants', label: 'Gestion Étudiants', icon: Users },
    { id: 'enseignants', label: 'Gestion Enseignants', icon: BookOpen },
    { id: 'academique', label: 'Gestion Académique', icon: Layers },
    { id: 'notes', label: 'Notes & Évaluations', icon: Gauge },
    { id: 'presence', label: 'Présence & Absences', icon: Clock },
    { id: 'communication', label: 'Communication', icon: MessageSquare },
    { id: 'rapports', label: 'Rapports & Stats', icon: BarChart3 },
    { id: 'parametres', label: 'Paramètres', icon: Settings }
  ]

  const StatCard = ({ title, value, change, icon: Icon, trend }) => (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-muted-foreground">{title}</p>
            <p className="text-2xl font-bold">{value}</p>
            <div className="flex items-center mt-1">
              {trend === 'up' ? (
                <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
              ) : (
                <TrendingDown className="w-4 h-4 text-red-500 mr-1" />
              )}
              <span className={`text-sm ${trend === 'up' ? 'text-green-500' : 'text-red-500'}`}>
                {change}
              </span>
            </div>
          </div>
          <Icon className="w-8 h-8 text-muted-foreground" />
        </div>
      </CardContent>
    </Card>
  )

  const Communication = () => {
    const [commSubTab, setCommSubTab] = useState('annonces')
    const [mockSMSMessages, setMockSMSMessages] = useState(() => {
      // Import from mockData equivalent
      return [
        { id: 'SMS001', recipient: 'STU001', recipientPhone: '+261 32 12 34 567', message: 'Bulletin disponible: Votre fils a obtenu une moyenne de 15.5/20 ce trimestre.', sender: 'Admin', date: '2025-01-20', time: '14:30', status: 'sent', type: 'bulletin' },
        { id: 'SMS002', recipient: 'STU002', recipientPhone: '+261 32 98 76 543', message: 'Absent: Votre absence en cours de Français a été enregistrée.', sender: 'System', date: '2025-01-20', time: '10:15', status: 'sent', type: 'attendance' },
        { id: 'SMS003', recipient: 'STU003', recipientPhone: '+261 34 55 66 777', message: 'Paiement: Merci pour votre paiement des frais de janvier. Montant: 450,000 Ar', sender: 'Finance', date: '2025-01-19', time: '16:45', status: 'sent', type: 'payment' },
        { id: 'SMS004', recipient: 'STU004', recipientPhone: '+261 33 22 11 888', message: 'Réunion: Réunion parents-profs le 25 janvier à 18h. Veuillez confirmer votre présence.', sender: 'Direction', date: '2025-01-18', time: '09:00', status: 'sent', type: 'event' },
        { id: 'SMS005', recipient: 'STU005', recipientPhone: '+261 32 44 55 666', message: 'Annonce: Fermeture de l\'établissement le 25 janvier pour journée pédagogique.', sender: 'Admin', date: '2025-01-17', time: '11:20', status: 'sent', type: 'announcement' }
      ]
    })

    const handleAddAnnouncement = (data) => {
      const newAnnouncement = {
        id: `ANN${String(announcements.length + 1).padStart(3, '0')}`,
        ...data,
        author: 'Admin',
        date: new Date().toISOString().split('T')[0]
      }
      setAnnouncements([...announcements, newAnnouncement])
    }

    const handleEditAnnouncement = (data) => {
      setAnnouncements(announcements.map(a => a.id === data.id ? data : a))
    }

    const handleDeleteAnnouncement = (id) => {
      setAnnouncements(announcements.filter(a => a.id !== id))
    }

    const handleViewAnnouncement = (ann) => {
      setDetailModal({
        open: true,
        title: ann.title,
        data: ann,
        fields: [
          { label: 'Auteur', key: 'author' },
          { label: 'Date', key: 'date' },
          { label: 'Priorité', key: 'priority' },
          { label: 'Visibilité', key: 'visibility' },
          { label: 'Contenu', key: 'content' }
        ]
      })
    }

    return (
      <div className="space-y-1">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">Communication</h1>
            <p className="text-muted-foreground mt-1">Gestion des annonces, SMS et notifications</p>
          </div>
          {commSubTab === 'annonces' && (
            <Button
              onClick={() => setAnnouncementModal({ open: true, data: null })}
              variant="default"
            >
              <Plus className="w-4 h-4 mr-2" /> Nouvelle annonce
            </Button>
          )}
        </div>

        <div className="flex gap-2 border-b border-border">
          {[
            { id: 'annonces', label: 'Annonces' },
            { id: 'sms', label: 'SMS' }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setCommSubTab(tab.id)}
              className={`px-4 py-2 font-medium border-b-2 ${
                commSubTab === tab.id ? 'border-primary text-primary' : 'border-transparent text-muted-foreground'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {commSubTab === 'annonces' && (
          <>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <Card>
                <CardContent className="p-6">
                  <p className="text-sm text-muted-foreground">Total annonces</p>
                  <p className="text-3xl font-bold mt-2">{announcements.length}</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <p className="text-sm text-muted-foreground">Priorité haute</p>
                  <p className="text-3xl font-bold mt-2">{announcements.filter(a => a.priority === 'high').length}</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <p className="text-sm text-muted-foreground">Visibilité globale</p>
                  <p className="text-3xl font-bold mt-2">{announcements.filter(a => a.visibility === 'all').length}</p>
                </CardContent>
              </Card>
            </div>

        <Card>
          <CardHeader>
            <CardTitle>Annonces</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {announcements.map(ann => (
              <div key={ann.id} className="border border-border rounded-lg p-4 hover:bg-muted/50 transition">
                <div className="flex justify-between items-start mb-2">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-semibold">{ann.title}</h3>
                      <Badge variant={ann.priority === 'high' ? 'destructive' : ann.priority === 'medium' ? 'secondary' : 'outline'}>
                        {ann.priority}
                      </Badge>
                      <Badge variant="outline">{ann.visibility}</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">{ann.content.substring(0, 100)}...</p>
                    <p className="text-xs text-muted-foreground mt-2">Par {ann.author} • {ann.date}</p>
                  </div>
                  <div className="flex gap-1 ml-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleViewAnnouncement(ann)}
                    >
                      <Eye className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setAnnouncementModal({ open: true, data: ann })}
                    >
                      <Edit2 className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-destructive hover:text-destructive"
                      onClick={() => handleDeleteAnnouncement(ann.id)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <AnnouncementModal
          isOpen={announcementModal.open}
          onClose={() => setAnnouncementModal({ open: false, data: null })}
          onSave={announcementModal.data ? handleEditAnnouncement : handleAddAnnouncement}
          announcement={announcementModal.data}
        />

        <DetailModal
          isOpen={detailModal.open}
          onClose={() => setDetailModal({ ...detailModal, open: false })}
          title={detailModal.title}
          data={detailModal.data}
          fields={detailModal.fields}
        />
          </>
        )}

        {commSubTab === 'sms' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
              <Card>
                <CardContent className="p-6">
                  <p className="text-sm text-muted-foreground">Total SMS</p>
                  <p className="text-3xl font-bold mt-2">{mockSMSMessages.length}</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <p className="text-sm text-muted-foreground">Envoyés</p>
                  <p className="text-3xl font-bold mt-2 text-green-600">{mockSMSMessages.filter(m => m.status === 'sent').length}</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <p className="text-sm text-muted-foreground">En erreur</p>
                  <p className="text-3xl font-bold mt-2 text-destructive">{mockSMSMessages.filter(m => m.status === 'failed').length}</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <p className="text-sm text-muted-foreground">Paiements</p>
                  <p className="text-3xl font-bold mt-2">{mockSMSMessages.filter(m => m.type === 'payment').length}</p>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0">
                <CardTitle>Messages SMS récents</CardTitle>
                <Button size="sm" variant="outline">
                  <Plus className="w-4 h-4 mr-2" /> Envoyer SMS
                </Button>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {mockSMSMessages.slice(0, 10).map(sms => (
                    <div key={sms.id} className="border border-border rounded-lg p-4 hover:bg-muted/30 transition">
                      <div className="flex justify-between items-start gap-4 mb-3">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <p className="font-semibold text-sm">{students.find(s => s.id === sms.recipient)?.firstName || 'Contact'}</p>
                            <span className="text-xs px-2 py-0.5 rounded-full bg-blue-100 text-blue-700">
                              {sms.type === 'bulletin' && 'Bulletin'}
                              {sms.type === 'attendance' && 'Absence'}
                              {sms.type === 'payment' && 'Paiement'}
                              {sms.type === 'grades' && 'Notes'}
                              {sms.type === 'event' && 'Événement'}
                              {sms.type === 'announcement' && 'Annonce'}
                            </span>
                            <Badge className={sms.status === 'sent' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}>
                              {sms.status === 'sent' ? 'Envoyé' : 'Erreur'}
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground mb-2">{sms.recipientPhone}</p>
                          <p className="text-sm text-foreground">{sms.message}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-xs text-muted-foreground">{sms.date}</p>
                          <p className="text-xs text-muted-foreground">{sms.time}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    )
  }

  const AttendanceAbsence = () => (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Présence & Absences</h1>
        <p className="text-muted-foreground mt-1">Suivi et justification des absences</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card>
          <CardContent className="p-6">
            <p className="text-sm text-muted-foreground">Taux présence général</p>
            <p className="text-3xl font-bold mt-2">94.5%</p>
            <Badge className="mt-2 bg-green-500/20 text-green-600">Excellent</Badge>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <p className="text-sm text-muted-foreground">Absences cette semaine</p>
            <p className="text-3xl font-bold mt-2">{mockAttendance.filter(a => a.status === 'absent').length}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <p className="text-sm text-muted-foreground">Retards</p>
            <p className="text-3xl font-bold mt-2">{mockAttendance.filter(a => a.status === 'late').length}</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Présences récentes</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Étudiant</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Matière</TableHead>
                <TableHead>Statut</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockAttendance.slice(0, 10).map(att => (
                <TableRow key={att.id}>
                  <TableCell className="font-medium">{students.find(s => s.id === att.studentId)?.firstName || 'N/A'}</TableCell>
                  <TableCell>{att.date}</TableCell>
                  <TableCell>{att.subject}</TableCell>
                  <TableCell>
                    <Badge variant={att.status === 'present' ? 'default' : att.status === 'late' ? 'secondary' : 'destructive'}>
                      {att.status === 'present' ? 'Présent' : att.status === 'late' ? 'Retard' : 'Absent'}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )

  const AdministrativeManagement = () => (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Gestion Administrative</h1>
        <p className="text-muted-foreground mt-1">Paiements, documents et administratifs</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <p className="text-sm text-muted-foreground">Total paiements</p>
            <p className="text-3xl font-bold mt-2">{mockStatistics.totalStudents * 450000 / 1000000}M Ar</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <p className="text-sm text-muted-foreground">Taux collecte</p>
            <p className="text-3xl font-bold mt-2">{mockStatistics.paymentCollectionRate}%</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <p className="text-sm text-muted-foreground">Étudiants actifs</p>
            <p className="text-3xl font-bold mt-2">{mockStatistics.totalStudents}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <p className="text-sm text-muted-foreground">Classes ouvertes</p>
            <p className="text-3xl font-bold mt-2">{mockStatistics.totalClasses}</p>
          </CardContent>
        </Card>
      </div>
    </div>
  )

  const Reports = () => (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Rapports & Statistiques</h1>
        <p className="text-muted-foreground mt-1">Analyses et rapports détaillés</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Statistiques globales</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Élèves inscrits</span>
              <span className="font-semibold">{mockStatistics.totalStudents}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Professeurs</span>
              <span className="font-semibold">{mockStatistics.totalTeachers}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Classes</span>
              <span className="font-semibold">{mockStatistics.totalClasses}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Moyenne générale</span>
              <span className="font-semibold">{mockStatistics.averageGrade}</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Performance</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Taux présence</span>
              <span className="font-semibold">{mockStatistics.attendanceRate}%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Taux de paiement</span>
              <span className="font-semibold">{mockStatistics.paymentCollectionRate}%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Utilisateurs actifs</span>
              <span className="font-semibold">{mockStatistics.activeUsers}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Inscriptions mois</span>
              <span className="font-semibold">+{mockStatistics.monthlyEnrollments}</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )

  const SystemSettings = () => (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Paramètres système</h1>
        <p className="text-muted-foreground mt-1">Configuration et gestion du système</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Paramètres généraux</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="school-name">Nom de l'établissement</Label>
            <Input id="school-name" defaultValue="Collège-Lycée Madagascar" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="school-code">Code établissement</Label>
            <Input id="school-code" defaultValue="CLM-2025" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="academic-year">Année académique</Label>
            <Input id="academic-year" defaultValue="2024-2025" />
          </div>
          <Button variant="default">Enregistrer paramètres</Button>
        </CardContent>
      </Card>
    </div>
  )

  const handleLogout = () => {
    alert('Déconnexion effectuée')
  }

  const DashboardOverview = () => (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Tableau de bord</h1>
        <p className="text-muted-foreground mt-1">Bienvenue sur la plateforme SIG-Lycée</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Élèves inscrits" value={students.length} change="+5%" icon={Users} trend="up" />
        <StatCard title="Professeurs" value={teachers.length} change="+2%" icon={BookOpen} trend="up" />
        <StatCard title="Classes" value={mockStatistics.totalClasses} change="+1%" icon={Layers} trend="up" />
        <StatCard title="Moyenne générale" value={mockStatistics.averageGrade} change="-0.5%" icon={Gauge} trend="down" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Classes Overview */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Distribution par classe</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {['6ème A', '6ème B', '2nde C', '1ère S', 'Term C', 'Term D'].map((cls, i) => (
                <Card key={i} className="text-center">
                  <CardContent className="p-4">
                    <p className="font-semibold text-primary">{cls}</p>
                    <p className="text-2xl font-bold mt-2">{45 + i * 2}</p>
                    <p className="text-xs text-muted-foreground mt-1">élèves</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Actions rapides</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <Button className="w-full" variant="default">
              <Plus className="w-4 h-4 mr-2" /> Nouvel étudiant
            </Button>
            <Button className="w-full" variant="secondary">
              <FileText className="w-4 h-4 mr-2" /> Générer bulletins
            </Button>
            <Button className="w-full" variant="outline">
              <Download className="w-4 h-4 mr-2" /> Exporter rapports
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activities */}
      <Card>
        <CardHeader>
          <CardTitle>Activités récentes</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[
              { action: '5 bulletins validés', time: 'Il y a 2h', icon: CheckCircle },
              { action: 'Paiement de 500k Ar enregistré', time: 'Il y a 4h', icon: DollarSign },
              { action: '3 nouveaux élèves inscrits', time: 'Il y a 1j', icon: Users },
              { action: 'Rapport mensuel généré', time: 'Il y a 2j', icon: FileText }
            ].map((item, i) => {
              const Icon = item.icon
              return (
                <div key={i} className="flex items-center gap-3 p-3 border rounded-lg">
                  <Icon className="w-4 h-4 text-primary flex-shrink-0" />
                  <div className="flex-1">
                    <p className="font-medium text-sm">{item.action}</p>
                    <p className="text-xs text-muted-foreground">{item.time}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  )

  const StudentsManagement = () => {
    const handleAddStudent = (data) => {
      const newStudent = {
        id: `STU${String(students.length + 1).padStart(3, '0')}`,
        ...data,
        status: 'active',
        averageGrade: 0,
        absences: 0,
        tardiness: 0,
      }
      setStudents([...students, newStudent])
    }

    const handleEditStudent = (data) => {
      setStudents(students.map(s => s.id === data.id ? data : s))
    }

    const handleDeleteStudent = (id) => {
      setStudents(students.filter(s => s.id !== id))
    }

    const handleViewStudent = (student) => {
      setDetailModal({
        open: true,
        title: `${student.firstName} ${student.lastName}`,
        data: student,
        fields: [
          { label: 'Email', key: 'email' },
          { label: 'Téléphone', key: 'phone' },
          { label: 'Classe', key: 'class' },
          { label: 'Date de naissance', key: 'dateOfBirth' },
          { label: 'Adresse', key: 'address' },
          { label: 'Email parent', key: 'parentEmail' },
          { label: 'Moyenne générale', key: 'averageGrade' },
          { label: 'Absences', key: 'absences' },
          { label: 'Retards', key: 'tardiness' }
        ]
      })
    }

    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">Gestion des étudiants</h1>
            <p className="text-muted-foreground mt-1">Inscription, modification et suivi des profils ({students.length} élèves)</p>
          </div>
          <Button
            onClick={() => setStudentModal({ open: true, data: null })}
            variant="default"
          >
            <Plus className="w-4 h-4 mr-2" /> Nouvel étudiant
          </Button>
        </div>

        <Card>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Nom</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Classe</TableHead>
                  <TableHead>Moyenne</TableHead>
                  <TableHead>Absences</TableHead>
                  <TableHead className="text-center">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {students.map(s => (
                  <TableRow key={s.id}>
                    <TableCell className="font-mono text-sm">{s.id}</TableCell>
                    <TableCell className="font-medium">{s.firstName} {s.lastName}</TableCell>
                    <TableCell className="text-sm">{s.email}</TableCell>
                    <TableCell>{s.class}</TableCell>
                    <TableCell>{s.averageGrade.toFixed(1)}</TableCell>
                    <TableCell>
                      <Badge variant="outline">{s.absences}</Badge>
                    </TableCell>
                    <TableCell className="text-center">
                      <div className="flex gap-1 justify-center">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleViewStudent(s)}
                        >
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setStudentModal({ open: true, data: s })}
                        >
                          <Edit2 className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-destructive hover:text-destructive"
                          onClick={() => handleDeleteStudent(s.id)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <StudentModal
          isOpen={studentModal.open}
          onClose={() => setStudentModal({ open: false, data: null })}
          onSave={studentModal.data ? handleEditStudent : handleAddStudent}
          student={studentModal.data}
        />

        <DetailModal
          isOpen={detailModal.open}
          onClose={() => setDetailModal({ ...detailModal, open: false })}
          title={detailModal.title}
          data={detailModal.data}
          fields={detailModal.fields}
        />
      </div>
    )
  }

  const TeachersManagement = () => {
    const handleAddTeacher = (data) => {
      const newTeacher = {
        id: `TEACH${String(teachers.length + 1).padStart(3, '0')}`,
        ...data,
        status: 'active',
        classes: [],
        hireDate: new Date().toISOString().split('T')[0],
        qualifications: []
      }
      setTeachers([...teachers, newTeacher])
    }

    const handleEditTeacher = (data) => {
      setTeachers(teachers.map(t => t.id === data.id ? data : t))
    }

    const handleDeleteTeacher = (id) => {
      setTeachers(teachers.filter(t => t.id !== id))
    }

    const handleViewTeacher = (teacher) => {
      setDetailModal({
        open: true,
        title: `${teacher.firstName} ${teacher.lastName}`,
        data: teacher,
        fields: [
          { label: 'Email', key: 'email' },
          { label: 'Téléphone', key: 'phone' },
          { label: 'Matière', key: 'subject' },
          { label: 'Classes', key: 'classes' },
          { label: 'Date d\'embauche', key: 'hireDate' },
          { label: 'Qualifications', key: 'qualifications' }
        ]
      })
    }

    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">Gestion des enseignants</h1>
            <p className="text-muted-foreground mt-1">Gestion du personnel enseignant ({teachers.length} professeurs)</p>
          </div>
          <Button
            onClick={() => setTeacherModal({ open: true, data: null })}
            variant="default"
          >
            <Plus className="w-4 h-4 mr-2" /> Nouvel enseignant
          </Button>
        </div>

        <Card>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Nom</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Matière</TableHead>
                  <TableHead>Téléphone</TableHead>
                  <TableHead className="text-center">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {teachers.map(t => (
                  <TableRow key={t.id}>
                    <TableCell className="font-mono text-sm">{t.id}</TableCell>
                    <TableCell className="font-medium">{t.firstName} {t.lastName}</TableCell>
                    <TableCell className="text-sm">{t.email}</TableCell>
                    <TableCell>{t.subject}</TableCell>
                    <TableCell className="text-sm">{t.phone}</TableCell>
                    <TableCell className="text-center">
                      <div className="flex gap-1 justify-center">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleViewTeacher(t)}
                        >
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setTeacherModal({ open: true, data: t })}
                        >
                          <Edit2 className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-destructive hover:text-destructive"
                          onClick={() => handleDeleteTeacher(t.id)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <TeacherModal
          isOpen={teacherModal.open}
          onClose={() => setTeacherModal({ open: false, data: null })}
          onSave={teacherModal.data ? handleEditTeacher : handleAddTeacher}
          teacher={teacherModal.data}
        />

        <DetailModal
          isOpen={detailModal.open}
          onClose={() => setDetailModal({ ...detailModal, open: false })}
          title={detailModal.title}
          data={detailModal.data}
          fields={detailModal.fields}
        />
      </div>
    )
  }

  const AcademicManagement = () => {
    const [activeSubTab, setActiveSubTab] = useState('classes')

    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Gestion Académique</h1>
          <p className="text-muted-foreground mt-1">Classes, filières, matières et emplois du temps</p>
        </div>

        <div className="flex gap-2 border-b border-border">
          {['classes', 'matieres', 'emplois', 'programmes'].map(tab => (
            <button
              key={tab}
              onClick={() => setActiveSubTab(tab)}
              className={`px-4 py-2 font-medium border-b-2 ${
                activeSubTab === tab ? 'border-primary text-primary' : 'border-transparent text-muted-foreground'
              }`}
            >
              {tab === 'classes' && 'Classes'}
              {tab === 'matieres' && 'Matières'}
              {tab === 'emplois' && 'Emplois du temps'}
              {tab === 'programmes' && 'Programmes'}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {['6ème A', '2nde C', '1ère S', 'Terminale C'].map((cls, i) => (
            <div key={i} className="bg-card rounded-lg border border-border p-6">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-lg font-bold">{cls}</h3>
                <span className="text-sm font-medium bg-primary/10 text-primary px-3 py-1 rounded-full">45 élèves</span>
              </div>
              <div className="space-y-2 text-sm text-muted-foreground mb-4">
                <p>Prof principal: <span className="font-semibold text-foreground">À assigner</span></p>
                <p>Matières: 7</p>
                <p>Emploi du temps: Configuré</p>
              </div>
              <div className="flex gap-2">
                <button className="flex-1 px-3 py-2 bg-primary/10 text-primary rounded-lg hover:bg-primary/20 text-sm font-medium">Éditer</button>
                <button className="flex-1 px-3 py-2 bg-muted text-foreground rounded-lg hover:bg-muted/80 text-sm font-medium">Voir</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  const GradesEvaluation = () => {
    const handleAddGrade = (data) => {
      const newGrade = {
        id: `GRADE${String(grades.length + 1).padStart(3, '0')}`,
        ...data,
        studentId: students[0]?.id,
        date: new Date().toISOString().split('T')[0],
        weight: 1
      }
      setGrades([...grades, newGrade])
    }

    const handleEditGrade = (data) => {
      setGrades(grades.map(g => g.id === data.id ? data : g))
    }

    const handleDeleteGrade = (id) => {
      setGrades(grades.filter(g => g.id !== id))
    }

    const avgGrade = grades.length > 0
      ? (grades.reduce((sum, g) => sum + g.grade, 0) / grades.length).toFixed(1)
      : 0

    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">Notes & Évaluations</h1>
            <p className="text-muted-foreground mt-1">Consultation et validation des notes, bulletins et relevés</p>
          </div>
          <Button
            onClick={() => setGradeModal({ open: true, data: null })}
            variant="default"
          >
            <Plus className="w-4 h-4 mr-2" /> Ajouter note
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card>
            <CardContent className="p-6">
              <p className="text-sm text-muted-foreground">Nombre de notes</p>
              <p className="text-3xl font-bold mt-2">{grades.length}</p>
              <p className="text-xs text-green-600 mt-2">↑ {grades.filter(g => g.grade >= 15).length} excellentes</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <p className="text-sm text-muted-foreground">Moyenne générale</p>
              <p className="text-3xl font-bold mt-2">{avgGrade}</p>
              <p className="text-xs text-blue-600 mt-2">Sur 20</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <p className="text-sm text-muted-foreground">Matières évaluées</p>
              <p className="text-3xl font-bold mt-2">{new Set(grades.map(g => g.subject)).size}</p>
              <p className="text-xs text-muted-foreground mt-2">Différentes matières</p>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Évaluations récentes</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Matière</TableHead>
                  <TableHead>Évaluation</TableHead>
                  <TableHead>Note</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Commentaires</TableHead>
                  <TableHead className="text-center">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {grades.slice(0, 10).map(g => (
                  <TableRow key={g.id}>
                    <TableCell className="font-medium">{g.subject}</TableCell>
                    <TableCell>{g.assignment}</TableCell>
                    <TableCell>
                      <Badge variant={g.grade >= 15 ? 'default' : g.grade >= 10 ? 'secondary' : 'destructive'}>
                        {g.grade}/{g.outOf}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-sm">{g.date}</TableCell>
                    <TableCell className="text-sm text-muted-foreground">{g.comments}</TableCell>
                    <TableCell className="text-center">
                      <div className="flex gap-1 justify-center">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setGradeModal({ open: true, data: g })}
                        >
                          <Edit2 className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-destructive hover:text-destructive"
                          onClick={() => handleDeleteGrade(g.id)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <GradeModal
          isOpen={gradeModal.open}
          onClose={() => setGradeModal({ open: false, data: null })}
          onSave={gradeModal.data ? handleEditGrade : handleAddGrade}
          grade={gradeModal.data}
        />
      </div>
    )
  }


  
  
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="bg-gradient-to-r from-primary to-accent border-b border-border sticky top-0 z-20 shadow-md">
        <div className="flex justify-between items-center px-6 py-4">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="md:hidden p-2 hover:bg-white/20 rounded-lg text-primary-foreground transition-colors"
            >
              {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
            <div>
              <h1 className="text-2xl font-bold text-primary-foreground">SIG-Lycée</h1>
              <p className="text-xs text-primary-foreground/80">Système Informatisé de Gestion</p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-4 py-2 text-primary-foreground hover:bg-white/20 rounded-lg transition-colors"
          >
            <LogOut className="w-5 h-5" />
            <span className="hidden sm:inline">Déconnexion</span>
          </button>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside className={`${
          sidebarOpen ? 'w-64' : 'w-0'
        } bg-sidebar border-r border-sidebar-border overflow-y-auto transition-all duration-300 hidden md:block fixed md:relative h-[calc(100vh-73px)] shadow-lg`}>
          <nav className="p-4 space-y-1">
            {menuItems.map(item => {
              const Icon = item.icon
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all text-sm font-medium ${
                    activeTab === item.id
                      ? 'bg-sidebar-primary text-sidebar-primary-foreground shadow-md'
                      : 'text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-foreground'
                  }`}
                >
                  <Icon className="w-4 h-4 flex-shrink-0" />
                  <span>{item.label}</span>
                </button>
              )
            })}
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto md:ml-0">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {activeTab === 'home' && <DashboardOverview />}
            {activeTab === 'etudiants' && <StudentsManagement />}
            {activeTab === 'enseignants' && <TeachersManagement />}
            {activeTab === 'academique' && <AcademicManagement />}
            {activeTab === 'notes' && <GradesEvaluation />}
            {activeTab === 'presence' && <AttendanceAbsence />}
            {activeTab === 'communication' && <Communication />}
            {activeTab === 'rapports' && <Reports />}
            {activeTab === 'parametres' && <SystemSettings />}
          </div>
        </main>
      </div>
    </div>
  )
}

function StatCard({ title, value, change, icon: Icon, trend }) {
  return (
    <div className="bg-card rounded-lg border border-border p-6">
      <div className="flex justify-between items-start">
        <div>
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          <p className="text-3xl font-bold mt-2">{value}</p>
          <div className="flex items-center gap-1 mt-2">
            {trend === 'up' ? <TrendingUp className="w-4 h-4 text-green-500" /> : <TrendingDown className="w-4 h-4 text-red-500" />}
            <p className={`text-xs font-medium ${trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>{change}</p>
          </div>
        </div>
        <div className="bg-primary/10 rounded-lg p-3">
          <Icon className="w-6 h-6 text-primary" />
        </div>
      </div>
    </div>
  )
}

export default AdminDashboard
