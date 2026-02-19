import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Lock, Mail, BookOpen, User, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

function Login() {
  const [role, setRole] = useState('student')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const navigate = useNavigate()

  const handleLogin = async (e) => {
    e.preventDefault()
    setError('')
    
    if (!email || !password) {
      setError('Veuillez remplir tous les champs')
      return
    }

    setLoading(true)

    try {
      const response = await fetch('http://127.0.0.1:8000/api/auth/token/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email.trim(),
          password: password,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(
          data.detail || 
          data.non_field_errors?.[0] || 
          'Identifiants incorrects ou compte inactif'
        )
      }

      // Sauvegarde des tokens (simple exemple – à sécuriser en production)
      localStorage.setItem('access_token', data.access)
      localStorage.setItem('refresh_token', data.refresh)
      
      // Tu peux aussi stocker le rôle ou décoder le token pour récupérer le rôle
      // Exemple : const decoded = jwtDecode(data.access)
      // localStorage.setItem('role', decoded.role)

      // Redirection selon le rôle choisi (à affiner avec le vrai rôle du token)
      if (role === 'student') {
        navigate('/student/dashboard')
      } else if (role === 'parent') {
        navigate('/parent/dashboard')
      } else if (role === 'teacher') {
        navigate('/teacher/dashboard')
      } else if (role === 'admin') {
        navigate('/admin/dashboard')
      }

    } catch (err) {
      setError(err.message || 'Une erreur est survenue. Veuillez réessayer.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-slate-100 dark:from-slate-950 dark:to-blue-950 flex items-center justify-center p-4 sm:p-6">
      <div className="w-full max-w-md md:max-w-lg">
        {/* Header / Logo */}
        <div className="text-center mb-8 md:mb-10">
          <div className="inline-flex items-center justify-center gap-3 mb-4">
            <div className="bg-gradient-to-br from-blue-500 to-blue-600 p-3 rounded-2xl shadow-lg">
              <BookOpen className="w-10 h-10 md:w-12 md:h-12 text-white" />
            </div>
            <h1 className="text-3xl md:text-4xl font-extrabold text-foreground tracking-tight">
              SIG-Lycée
            </h1>
          </div>
          <p className="text-muted-foreground text-base md:text-lg font-medium">
            Système de Gestion Scolaire
          </p>
        </div>

        {/* Card principale */}
        <Card className="shadow-xl border-border/50">
          <CardHeader className="pb-4">
            <CardTitle className="text-center text-2xl">Connexion</CardTitle>
            <CardDescription className="text-center">
              Accédez à votre espace personnel
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Sélection rôle */}
            <div className="space-y-3">
              <Label className="text-base font-semibold">Je suis :</Label>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { value: 'student', label: 'Élève', icon: User },
                  { value: 'parent',  label: 'Parent',  icon: User },
                  { value: 'teacher', label: 'Professeur', icon: BookOpen },
                  { value: 'admin',   label: 'Admin',   icon: Lock },
                ].map(opt => (
                  <Button
                    key={opt.value}
                    type="button"
                    variant={role === opt.value ? "default" : "outline"}
                    className={`h-auto py-3 transition-all ${
                      role === opt.value
                        ? 'bg-primary text-primary-foreground shadow-md'
                        : 'border-border hover:bg-secondary'
                    }`}
                    onClick={() => setRole(opt.value)}
                  >
                    <opt.icon className="w-4 h-4 mr-2" />
                    <span className="font-medium">{opt.label}</span>
                  </Button>
                ))}
              </div>
            </div>

            {/* Message d'erreur */}
            {error && (
              <div className="p-4 bg-destructive/10 border border-destructive/20 rounded-lg text-destructive text-sm font-medium">
                {error}
              </div>
            )}

            {/* Formulaire */}
            <form onSubmit={handleLogin} className="space-y-5">
              <div className="space-y-2">
                <Label htmlFor="email" className="font-medium">Email / Identifiant</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value)
                      setError('')
                    }}
                    placeholder="exemple@lycee.mg"
                    autoComplete="email"
                    required
                    className="pl-10 h-10"
                  />
                </div>
              </div>

              {/* Mot de passe */}
              <div className="space-y-2">
                <Label htmlFor="password" className="font-medium">Mot de passe</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value)
                      setError('')
                    }}
                    placeholder="••••••••"
                    autoComplete="current-password"
                    required
                    className="pl-10 h-10"
                  />
                </div>
              </div>

              {/* Options */}
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="remember"
                    className="rounded border-border cursor-pointer"
                  />
                  <Label htmlFor="remember" className="text-muted-foreground cursor-pointer">Se souvenir de moi</Label>
                </div>
                <a href="#" className="text-primary hover:text-primary/90 font-medium transition-colors">
                  Mot de passe oublié ?
                </a>
              </div>

              {/* Bouton connexion */}
              <Button
                type="submit"
                disabled={loading}
                className="w-full h-11 text-base font-semibold shadow-md hover:shadow-lg transition-shadow"
              >
                {loading && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
                {loading ? 'Connexion en cours...' : 'Se connecter'}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Footer */}
        <p className="text-center text-muted-foreground text-sm mt-8">
          © {new Date().getFullYear()} SIG-Lycée • Tous droits réservés
        </p>
      </div>
    </div>
  )
}

export default Login
