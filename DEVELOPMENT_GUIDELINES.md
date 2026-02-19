# Directives de Développement - SIG-Lycée

## 1. CONFIGURATION DE L'ENVIRONNEMENT DE DÉVELOPPEMENT

### 1.1 Stack Technologique Officiel

**Frontend:**
```
- React 18.3+
- Next.js 16+ (App Router)
- TypeScript 5+
- Tailwind CSS 3.4+
- Shadcn UI Components
- SWR pour data fetching
- React Hook Form pour formulaires
- Zod pour validation
```

**Backend:**
```
- Node.js 18+ LTS ou Django 4.2+
- PostgreSQL 14+
- Prisma ORM (Node) ou Django ORM
- JWT pour authentification
- Redis (optionnel mais recommandé)
```

### 1.2 Installation Initiale

```bash
# Clone du repository
git clone https://github.com/bry4ng4rrix/ecole.git
cd ecole

# Installation des dépendances
npm install  # ou yarn install / pnpm install

# Configuration de l'environnement
cp .env.example .env.local
# Éditer .env.local avec les variables appropriées

# Démarrage du serveur de développement
npm run dev
```

### 1.3 Variables d'Environnement Requises

```env
# Database
DATABASE_URL=postgresql://user:password@localhost:5432/sig_lycee

# Authentication
JWT_SECRET=your_secret_key_here
JWT_EXPIRATION=24h
REFRESH_TOKEN_EXPIRATION=7d

# API
NEXT_PUBLIC_API_URL=http://localhost:3000/api

# Email (SendGrid ou autre)
SENDGRID_API_KEY=your_key_here

# Storage (Vercel Blob ou S3)
BLOB_READ_WRITE_TOKEN=your_token_here
# OU
AWS_ACCESS_KEY_ID=your_key
AWS_SECRET_ACCESS_KEY=your_secret

# External APIs (futur)
SMS_API_KEY=your_key
```

---

## 2. CONVENTIONS DE CODE

### 2.1 Structure des Dossiers

```
src/
├── app/                      # Next.js app directory
│   ├── (auth)/              # Routes d'authentification
│   │   ├── login/
│   │   ├── register/
│   │   └── forgot-password/
│   ├── (authenticated)/     # Routes protégées
│   │   ├── dashboard/
│   │   ├── students/
│   │   ├── grades/
│   │   ├── attendance/
│   │   ├── admin/
│   │   └── settings/
│   ├── api/                 # API routes
│   │   ├── auth/
│   │   ├── students/
│   │   ├── grades/
│   │   ├── attendance/
│   │   └── [...]
│   └── layout.tsx
├── components/
│   ├── ui/                  # Shadcn/ui components
│   ├── layout/             # Composants de layout
│   ├── forms/              # Formulaires réutilisables
│   ├── tables/             # Tables réutilisables
│   ├── dashboard/          # Composants dashboard spécifiques
│   └── [...]
├── lib/
│   ├── api-client.ts       # Fetch wrapper with auth
│   ├── auth.ts             # Auth utilities
│   ├── db.ts               # Database connection
│   ├── utils.ts            # Helper functions
│   └── schemas.ts          # Zod validation schemas
├── types/
│   ├── api.ts              # Type définitions API
│   ├── database.ts         # Types base de données
│   └── common.ts           # Types communs
├── hooks/
│   ├── useAuth.ts          # Hook authentification
│   ├── useUser.ts          # Hook utilisateur actuel
│   ├── useFetch.ts         # Hook fetch avec cache
│   └── [...]
├── utils/
│   ├── auth.ts             # Utilitaires auth
│   ├── formatters.ts       # Formatage de données
│   ├── calculations.ts     # Calculs (moyennes, etc.)
│   └── permissions.ts      # Vérification des permissions
├── middleware.ts           # Next.js middleware pour auth
└── env.ts                  # Validation des variables d'env
```

### 2.2 Conventions de Nommage

**Fichiers:**
- Composants React: `PascalCase.tsx` (ex: `StudentCard.tsx`)
- Hooks: `camelCase.ts` avec préfixe `use` (ex: `useStudents.ts`)
- Utilitaires: `camelCase.ts` (ex: `formatters.ts`)
- Types: `camelCase.ts` (ex: `student.ts`)
- API routes: `lowercase` (ex: `/api/students`)

**Variables et Fonctions:**
```typescript
// Variables et fonctions
const userName = "Jean";
const getStudentGrade = () => {};

// Constantes
const MAX_FILE_SIZE = 5242880;
const DEFAULT_PAGE_SIZE = 20;

// Classes et Interfaces
interface StudentData {
  id: string;
  name: string;
}

class StudentService {
  // ...
}
```

**CSS Classes:**
- Utiliser Tailwind CSS
- Pas de classes CSS custom sauf nécessité absolue
- Préférer les utility classes

### 2.3 Imports

```typescript
// Order: external, internal, types, assets
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { studentService } from '@/lib/services'
import type { Student } from '@/types/student'
import { cn } from '@/lib/utils'
```

### 2.4 Formatage du Code

- **Indentation:** 2 espaces
- **Longueur max ligne:** 100 caractères (soft limit 120)
- **Guillemets:** Double quotes `"`
- **Point-virgules:** Toujours inclure `;`
- **Trailing commas:** Dans les objets/arrays multi-ligne

```typescript
const config = {
  name: "SIG-Lycée",
  version: "2.0",
  features: [
    "authentication",
    "grades",
    "attendance",
  ],
};
```

---

## 3. PATTERNS DE DÉVELOPPEMENT

### 3.1 Composants React

**Structure d'un composant:**
```typescript
// Imports
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import type { Student } from '@/types/student'

// Props interface
interface StudentCardProps {
  student: Student
  onEdit?: (student: Student) => void
}

// Composant
export function StudentCard({ student, onEdit }: StudentCardProps) {
  const [isLoading, setIsLoading] = useState(false)

  const handleClick = async () => {
    setIsLoading(true)
    try {
      // Logic here
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex gap-4 p-4 border rounded-lg">
      <h3 className="font-semibold">{student.name}</h3>
      <Button onClick={handleClick} disabled={isLoading}>
        Éditer
      </Button>
    </div>
  )
}
```

**Bonnes pratiques:**
- Utiliser des hooks pour les states et effects
- Extraire les composants quand c'est complexe
- Preuver les props avec TypeScript
- Documenter avec JSDoc quand complexe
- Éviter le prop drilling (utiliser Context si besoin)

### 3.2 API Routes

**Structure d'une API route:**
```typescript
// app/api/students/[id]/route.ts

import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { authenticate } from '@/lib/auth'
import { StudentSchema } from '@/lib/schemas'
import type { Student } from '@/types/student'

// GET /api/students/[id]
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const user = await authenticate(request)
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const student = await prisma.student.findUnique({
      where: { id: params.id },
    })

    if (!student) {
      return NextResponse.json({ error: "Not found" }, { status: 404 })
    }

    return NextResponse.json(student)
  } catch (error) {
    console.error("[GET /api/students]", error)
    return NextResponse.json({ error: "Internal error" }, { status: 500 })
  }
}

// PUT /api/students/[id]
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const user = await authenticate(request)
    if (!user || user.role !== "ADMIN") {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 })
    }

    const body = await request.json()
    const validated = StudentSchema.parse(body)

    const student = await prisma.student.update({
      where: { id: params.id },
      data: validated,
    })

    return NextResponse.json(student)
  } catch (error) {
    console.error("[PUT /api/students]", error)
    return NextResponse.json({ error: "Internal error" }, { status: 500 })
  }
}
```

**Conventions API:**
- Toujours authentifier sauf endpoints publics
- Valider les inputs avec Zod
- Retourner codes HTTP appropriés
- Loger les erreurs côté serveur
- Pas de données sensibles dans les logs

### 3.3 Data Fetching avec SWR

```typescript
import useSWR from 'swr'
import { apiClient } from '@/lib/api-client'
import type { Student } from '@/types/student'

export function useStudents() {
  const { data, error, isLoading, mutate } = useSWR<Student[]>(
    '/api/students',
    apiClient.get
  )

  return {
    students: data || [],
    isLoading,
    error,
    mutate,
  }
}

// Usage dans composant
export function StudentList() {
  const { students, isLoading, error } = useStudents()

  if (isLoading) return <div>Chargement...</div>
  if (error) return <div>Erreur: {error.message}</div>

  return (
    <div>
      {students.map(student => (
        <StudentCard key={student.id} student={student} />
      ))}
    </div>
  )
}
```

### 3.4 Validation avec Zod

```typescript
import { z } from 'zod'

export const StudentSchema = z.object({
  firstName: z.string().min(2).max(50),
  lastName: z.string().min(2).max(50),
  email: z.string().email(),
  matricule: z.string().regex(/^\d{4}-\d{3}-\d{4}$/),
  classId: z.string().uuid(),
  filiere: z.enum(['SCIENTIFIQUE', 'LITTERAIRE', 'TECHNIQUE']),
})

export type Student = z.infer<typeof StudentSchema>

// Usage
const result = StudentSchema.safeParse(data)
if (!result.success) {
  console.error(result.error)
}
```

### 3.5 Gestion des Permissions

```typescript
// lib/permissions.ts

export type UserRole = 'ADMIN' | 'BUREAU' | 'PROFESSEUR' | 'PARENT' | 'ETUDIANT' | 'COORDINATEUR'

export const permissions: Record<UserRole, Set<string>> = {
  ADMIN: new Set([
    'view_all_students',
    'edit_all_students',
    'view_all_grades',
    'edit_all_grades',
    'manage_users',
    'view_finances',
    'edit_finances',
    // ... toutes les permissions
  ]),
  BUREAU: new Set([
    'view_all_students',
    'edit_all_students',
    'accept_registrations',
    'view_finances',
    'edit_finances',
    // ...
  ]),
  PROFESSEUR: new Set([
    'view_my_students',
    'view_my_grades',
    'edit_my_grades',
    'send_remarks',
    'view_attendance',
    // ...
  ]),
  // ...
}

export function hasPermission(role: UserRole, action: string): boolean {
  return permissions[role]?.has(action) ?? false
}

// Usage dans composants
if (!hasPermission(user.role, 'edit_all_students')) {
  return <div>Accès refusé</div>
}
```

---

## 4. TESTS

### 4.1 Structure des Tests

```
__tests__/
├── unit/
│   ├── lib/
│   │   ├── auth.test.ts
│   │   ├── formatters.test.ts
│   │   └── permissions.test.ts
│   └── utils/
│       └── calculations.test.ts
├── integration/
│   ├── api/
│   │   ├── students.test.ts
│   │   └── grades.test.ts
│   └── components/
│       └── StudentForm.test.tsx
└── e2e/
    ├── login.spec.ts
    ├── create-student.spec.ts
    └── submit-grades.spec.ts
```

### 4.2 Exemple de Test

```typescript
// __tests__/unit/lib/permissions.test.ts

import { hasPermission } from '@/lib/permissions'

describe('Permissions', () => {
  it('should allow admin to view all students', () => {
    const result = hasPermission('ADMIN', 'view_all_students')
    expect(result).toBe(true)
  })

  it('should deny student from editing grades', () => {
    const result = hasPermission('ETUDIANT', 'edit_my_grades')
    expect(result).toBe(false)
  })

  it('should allow professor to edit their grades', () => {
    const result = hasPermission('PROFESSEUR', 'edit_my_grades')
    expect(result).toBe(true)
  })
})
```

### 4.3 Commandes de Test

```bash
# Tous les tests
npm test

# Tests unitaires seulement
npm run test:unit

# Tests avec coverage
npm run test:coverage

# Tests watch mode
npm run test:watch

# E2E tests
npm run test:e2e
```

---

## 5. BASE DE DONNÉES

### 5.1 Schéma Prisma (Exemple)

```prisma
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

generator client {
  provider = "prisma-client-js"
}

model User {
  id        String   @id @default(cuid())
  email     String   @unique
  password  String   // Hashed avec bcrypt
  firstName String
  lastName  String
  role      Role     @default(ETUDIANT)
  status    Status   @default(ACTIF)
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  // Relations
  student    Student?
  professor  Professor?
  parent     Parent?
  messages   Message[]
  logins     Login[]

  @@index([email])
}

model Student {
  id          String   @id @default(cuid())
  userId      String   @unique
  user        User     @relation(fields: [userId], references: [id], onDelete: Cascade)
  matricule   String   @unique
  classId     String
  class       Class    @relation(fields: [classId], references: [id])
  filiere     Filiere
  enrolledAt  DateTime @default(now())
  status      String   @default("INSCRIT")

  grades      Grade[]
  attendance  Attendance[]
  payments    Payment[]

  @@index([classId])
  @@index([matricule])
}

model Grade {
  id          String   @id @default(cuid())
  studentId   String
  student     Student  @relation(fields: [studentId], references: [id], onDelete: Cascade)
  subjectId   String
  subject     Subject  @relation(fields: [subjectId], references: [id])
  professorId String
  professor   Professor @relation(fields: [professorId], references: [id])
  
  value       Float
  type        GradeType   // CONTROLE, DEVOIR, PARTICIPATION, BONUS
  term        Int         // 1, 2, 3
  academicYear String
  createdAt   DateTime    @default(now())
  updatedAt   DateTime    @updatedAt

  @@unique([studentId, subjectId, type, academicYear, term])
  @@index([studentId])
  @@index([professorId])
}

// ... autres modèles
```

### 5.2 Migrations

```bash
# Créer une nouvelle migration
npx prisma migrate dev --name add_student_table

# Appliquer les migrations en production
npx prisma migrate deploy

# Voir l'état des migrations
npx prisma migrate status

# Réinitialiser la base (dev seulement)
npx prisma migrate reset
```

---

## 6. DÉPLOIEMENT

### 6.1 Environnements

**Développement:**
- Branche: `dev`
- URL: `http://localhost:3000`
- Base de données: PostgreSQL locale
- Variables: `.env.local`

**Staging:**
- Branche: `staging`
- URL: `https://staging.sig-lycee.com`
- Base de données: PostgreSQL staging
- Déploiement: Automatique via GitHub Actions

**Production:**
- Branche: `main`
- URL: `https://sig-lycee.com`
- Base de données: PostgreSQL production (backup quotidien)
- Déploiement: Manuel après tests

### 6.2 Checklist de Déploiement

- [ ] Tous les tests passent
- [ ] Code review approuvé
- [ ] Pas de console.log en production
- [ ] Pas de données de test
- [ ] Migrations appliquées
- [ ] Variables d'environnement configurées
- [ ] Backup de la base de données
- [ ] Plan de rollback préparé

---

## 7. DOCUMENTATION

### 7.1 Commenter le Code

```typescript
/**
 * Calcule la moyenne générale d'un élève pour l'année académique
 * @param studentId - UUID de l'élève
 * @param academicYear - Année scolaire (ex: "2025-2026")
 * @returns Moyenne arrondie à 2 décimales
 * @throws Error si l'élève n'existe pas
 */
export async function calculateStudentAverage(
  studentId: string,
  academicYear: string
): Promise<number> {
  // ...
}
```

### 7.2 README par Module

Chaque module majeur doit avoir un README:
- Objectif
- Structure des fichiers
- Exemples d'utilisation
- Dépendances

---

## 8. GIT WORKFLOW

### 8.1 Branches

```
main              # Production stable
├── staging        # Pre-production
├── dev            # Développement
└── feature/*      # Features (ex: feature/add-grades)
    ├── bugfix/*   # Bugfixes (ex: bugfix/fix-auth)
    └── docs/*     # Documentation
```

### 8.2 Commits

Format: `type(scope): message`

```
feat(grades): ajouter calcul automatique des moyennes
fix(auth): corriger expiration du token
docs(api): documenter les endpoints
refactor(db): optimiser les requêtes
test(students): ajouter tests de validation
```

### 8.3 Pull Requests

1. Créer une branche depuis `dev`
2. Commiter avec messages clairs
3. Ouvrir une PR avec description
4. Passer la CI/CD (tests, linting)
5. Demander une review
6. Merger après approbation
7. Supprimer la branche

---

## 9. PERFORMANCE

### 9.1 Optimisations Frontend

- Utiliser `React.memo` pour composants complexes
- Lazy loading des routes avec `dynamic()`
- Image optimization avec `next/image`
- Code splitting automatique (Next.js)
- Caching avec SWR

### 9.2 Optimisations Backend

- Index les colonnes fréquemment queryées
- Utiliser les relations Prisma efficacement
- Cache les résultats avec Redis
- Pagination pour les listes longues
- Compression GZIP

---

## 10. MONITORING ET LOGGING

### 10.1 Logs

```typescript
// Utiliser un système cohérent
console.log("[ACTION_IMPORTANTE]", "User logged in", { userId, timestamp })
console.error("[ERROR_DATABASE]", error.message)
```

### 10.2 Erreurs

- Capturer les erreurs globales
- Envoyer à un service de monitoring (Sentry, etc.)
- Conserver l'historique pour audit

---

## Ressources Utiles

- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://react.dev)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [Shadcn/ui Components](https://ui.shadcn.com)
- [Prisma Documentation](https://www.prisma.io/docs)

---

**Dernière mise à jour:** Février 2026  
**Responsable:** Lead Developer
