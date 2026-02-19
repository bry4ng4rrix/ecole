// Mock data for testing - Static data for SIG-Lycée application

export const mockStudents = [
  {
    id: 'STU001',
    firstName: 'Jean',
    lastName: 'Dupont',
    email: 'jean.dupont@lycee.mg',
    phone: '+261 32 12 34 567',
    class: '2nde A',
    dateOfBirth: '2008-05-15',
    address: '123 Rue de la Paix, Antananarivo',
    parentEmail: 'parent.dupont@email.mg',
    enrollmentDate: '2023-09-01',
    status: 'active',
    averageGrade: 15.5,
    absences: 3,
    tardiness: 1,
  },
  {
    id: 'STU002',
    firstName: 'Marie',
    lastName: 'Martin',
    email: 'marie.martin@lycee.mg',
    phone: '+261 32 98 76 543',
    class: '2nde A',
    dateOfBirth: '2008-08-22',
    address: '456 Avenue Louise, Antananarivo',
    parentEmail: 'parent.martin@email.mg',
    enrollmentDate: '2023-09-01',
    status: 'active',
    averageGrade: 16.8,
    absences: 1,
    tardiness: 0,
  },
  {
    id: 'STU003',
    firstName: 'Pierre',
    lastName: 'Bernard',
    email: 'pierre.bernard@lycee.mg',
    phone: '+261 34 55 66 777',
    class: '1ère S',
    dateOfBirth: '2007-03-10',
    address: '789 Boulevard Verdun, Antananarivo',
    parentEmail: 'parent.bernard@email.mg',
    enrollmentDate: '2023-09-01',
    status: 'active',
    averageGrade: 14.2,
    absences: 5,
    tardiness: 2,
  },
  {
    id: 'STU004',
    firstName: 'Sophie',
    lastName: 'Leclerc',
    email: 'sophie.leclerc@lycee.mg',
    phone: '+261 33 22 11 888',
    class: 'Terminale ES',
    dateOfBirth: '2006-11-30',
    address: '321 Rue de la République, Antananarivo',
    parentEmail: 'parent.leclerc@email.mg',
    enrollmentDate: '2023-09-01',
    status: 'active',
    averageGrade: 17.4,
    absences: 0,
    tardiness: 0,
  },
  {
    id: 'STU005',
    firstName: 'Thomas',
    lastName: 'Renaud',
    email: 'thomas.renaud@lycee.mg',
    phone: '+261 32 44 55 666',
    class: '1ère S',
    dateOfBirth: '2007-07-18',
    address: '654 Rue de Lyon, Antananarivo',
    parentEmail: 'parent.renaud@email.mg',
    enrollmentDate: '2023-09-01',
    status: 'active',
    averageGrade: 13.8,
    absences: 8,
    tardiness: 3,
  },
];

export const mockTeachers = [
  {
    id: 'TEACH001',
    firstName: 'Michel',
    lastName: 'Gautier',
    email: 'michel.gautier@lycee.mg',
    phone: '+261 32 11 22 333',
    subject: 'Mathématiques',
    classes: ['2nde A', '1ère S', 'Terminale S'],
    hireDate: '2015-08-15',
    status: 'active',
    qualifications: ['Agrégation de Mathématiques', 'Master en Didactique'],
  },
  {
    id: 'TEACH002',
    firstName: 'Isabelle',
    lastName: 'Rousseau',
    email: 'isabelle.rousseau@lycee.mg',
    phone: '+261 33 44 55 666',
    subject: 'Français',
    classes: ['2nde A', '2nde B', '1ère ES'],
    hireDate: '2018-09-01',
    status: 'active',
    qualifications: ['Licence en Lettres Modernes', 'CAPES Français'],
  },
  {
    id: 'TEACH003',
    firstName: 'Denis',
    lastName: 'Fournier',
    email: 'denis.fournier@lycee.mg',
    phone: '+261 32 77 88 999',
    subject: 'Sciences Physiques',
    classes: ['1ère S', 'Terminale S'],
    hireDate: '2016-09-01',
    status: 'active',
    qualifications: ['Agrégation de Physique-Chimie', 'PhD en Physique'],
  },
  {
    id: 'TEACH004',
    firstName: 'Anne',
    lastName: 'Moreau',
    email: 'anne.moreau@lycee.mg',
    phone: '+261 33 99 00 111',
    subject: 'Anglais',
    classes: ['2nde A', '2nde B', '1ère ES', 'Terminale ES'],
    hireDate: '2019-08-15',
    status: 'active',
    qualifications: ['Master en Linguistique Anglaise', 'CAPES Anglais'],
  },
  {
    id: 'TEACH005',
    firstName: 'Philippe',
    lastName: 'Mercier',
    email: 'philippe.mercier@lycee.mg',
    phone: '+261 32 22 33 444',
    subject: 'Histoire-Géographie',
    classes: ['2nde A', '1ère ES', 'Terminale ES'],
    hireDate: '2014-09-01',
    status: 'active',
    qualifications: ['Agrégation d\'Histoire-Géographie', 'Master en Histoire'],
  },
];

export const mockGrades = [
  {
    id: 'GRADE001',
    studentId: 'STU001',
    subject: 'Mathématiques',
    assignment: 'Contrôle 1',
    grade: 16.5,
    outOf: 20,
    date: '2025-01-15',
    weight: 1,
    comments: 'Très bon travail',
  },
  {
    id: 'GRADE002',
    studentId: 'STU001',
    subject: 'Français',
    assignment: 'Dissertation',
    grade: 14.0,
    outOf: 20,
    date: '2025-01-10',
    weight: 1.5,
    comments: 'À améliorer la structure',
  },
  {
    id: 'GRADE003',
    studentId: 'STU001',
    subject: 'Anglais',
    assignment: 'Conversation',
    grade: 15.5,
    outOf: 20,
    date: '2025-01-18',
    weight: 1,
    comments: 'Prononciation correcte',
  },
  {
    id: 'GRADE004',
    studentId: 'STU002',
    subject: 'Mathématiques',
    assignment: 'Contrôle 1',
    grade: 18.0,
    outOf: 20,
    date: '2025-01-15',
    weight: 1,
    comments: 'Excellent',
  },
  {
    id: 'GRADE005',
    studentId: 'STU002',
    subject: 'Français',
    assignment: 'Dissertation',
    grade: 16.5,
    outOf: 20,
    date: '2025-01-10',
    weight: 1.5,
    comments: 'Bien argumenté',
  },
  {
    id: 'GRADE006',
    studentId: 'STU003',
    subject: 'Mathématiques',
    assignment: 'Contrôle 1',
    grade: 13.0,
    outOf: 20,
    date: '2025-01-15',
    weight: 1,
    comments: 'Besoin de réviser les bases',
  },
];

export const mockAttendance = [
  {
    id: 'ATT001',
    studentId: 'STU001',
    date: '2025-01-20',
    status: 'present',
    subject: 'Mathématiques',
    time: '08:00',
  },
  {
    id: 'ATT002',
    studentId: 'STU001',
    date: '2025-01-20',
    status: 'absent',
    subject: 'Français',
    time: '10:00',
  },
  {
    id: 'ATT003',
    studentId: 'STU001',
    date: '2025-01-19',
    status: 'late',
    subject: 'Anglais',
    time: '14:15',
  },
  {
    id: 'ATT004',
    studentId: 'STU002',
    date: '2025-01-20',
    status: 'present',
    subject: 'Mathématiques',
    time: '08:00',
  },
  {
    id: 'ATT005',
    studentId: 'STU002',
    date: '2025-01-20',
    status: 'present',
    subject: 'Français',
    time: '10:00',
  },
];

export const mockPayments = [
  {
    id: 'PAY001',
    studentId: 'STU001',
    description: 'Frais de scolarité - Janvier 2025',
    amount: 450000,
    currency: 'MGA',
    dueDate: '2025-01-31',
    paidDate: '2025-01-15',
    status: 'paid',
    method: 'Virement bancaire',
  },
  {
    id: 'PAY002',
    studentId: 'STU001',
    description: 'Frais de scolarité - Février 2025',
    amount: 450000,
    currency: 'MGA',
    dueDate: '2025-02-28',
    paidDate: null,
    status: 'pending',
    method: null,
  },
  {
    id: 'PAY003',
    studentId: 'STU002',
    description: 'Frais de scolarité - Janvier 2025',
    amount: 450000,
    currency: 'MGA',
    dueDate: '2025-01-31',
    paidDate: '2025-01-10',
    status: 'paid',
    method: 'Espèces',
  },
  {
    id: 'PAY004',
    studentId: 'STU002',
    description: 'Frais de scolarité - Février 2025',
    amount: 450000,
    currency: 'MGA',
    dueDate: '2025-02-28',
    paidDate: '2025-02-10',
    status: 'paid',
    method: 'Virement bancaire',
  },
];

export const mockParents = [
  {
    id: 'PARENT001',
    firstName: 'Paul',
    lastName: 'Dupont',
    email: 'parent.dupont@email.mg',
    phone: '+261 32 12 34 567',
    relationship: 'Père',
    children: ['STU001'],
    address: '123 Rue de la Paix, Antananarivo',
    status: 'active',
  },
  {
    id: 'PARENT002',
    firstName: 'Claire',
    lastName: 'Martin',
    email: 'parent.martin@email.mg',
    phone: '+261 32 98 76 543',
    relationship: 'Mère',
    children: ['STU002'],
    address: '456 Avenue Louise, Antananarivo',
    status: 'active',
  },
];

export const mockUsers = [
  {
    id: 'USER001',
    email: 'admin@lycee.mg',
    password: 'admin123',
    role: 'admin',
    firstName: 'Admin',
    lastName: 'Lycée',
    status: 'active',
  },
  {
    id: 'USER002',
    email: 'jean.dupont@lycee.mg',
    password: 'student123',
    role: 'student',
    firstName: 'Jean',
    lastName: 'Dupont',
    studentId: 'STU001',
    status: 'active',
  },
  {
    id: 'USER003',
    email: 'parent.dupont@email.mg',
    password: 'parent123',
    role: 'parent',
    firstName: 'Paul',
    lastName: 'Dupont',
    parentId: 'PARENT001',
    status: 'active',
  },
  {
    id: 'USER004',
    email: 'michel.gautier@lycee.mg',
    password: 'teacher123',
    role: 'teacher',
    firstName: 'Michel',
    lastName: 'Gautier',
    teacherId: 'TEACH001',
    status: 'active',
  },
];

export const mockAnnouncements = [
  {
    id: 'ANN001',
    title: 'Réunion Parents-Enseignants',
    content: 'La réunion parents-enseignants aura lieu le 25 janvier 2025 à 18h00',
    author: 'Direction',
    date: '2025-01-18',
    priority: 'high',
    visibility: 'all',
  },
  {
    id: 'ANN002',
    title: 'Absence professeur',
    content: 'Le cours de Mathématiques de 10h00 est annulé jeudi 23 janvier',
    author: 'Secrétariat',
    date: '2025-01-20',
    priority: 'medium',
    visibility: 'students',
  },
  {
    id: 'ANN003',
    title: 'Résultats du baccalauréat',
    content: 'Les résultats du baccalauréat blanc sont maintenant disponibles',
    author: 'Direction',
    date: '2025-01-19',
    priority: 'high',
    visibility: 'students',
  },
];

export const mockSchedule = [
  {
    id: 'SCHED001',
    class: '2nde A',
    dayOfWeek: 'Monday',
    startTime: '08:00',
    endTime: '09:00',
    subject: 'Mathématiques',
    teacher: 'Michel Gautier',
    room: 'Salle 201',
  },
  {
    id: 'SCHED002',
    class: '2nde A',
    dayOfWeek: 'Monday',
    startTime: '09:00',
    endTime: '10:00',
    subject: 'Français',
    teacher: 'Isabelle Rousseau',
    room: 'Salle 202',
  },
  {
    id: 'SCHED003',
    class: '2nde A',
    dayOfWeek: 'Monday',
    startTime: '10:15',
    endTime: '11:15',
    subject: 'Anglais',
    teacher: 'Anne Moreau',
    room: 'Salle 203',
  },
  {
    id: 'SCHED004',
    class: '2nde A',
    dayOfWeek: 'Tuesday',
    startTime: '08:00',
    endTime: '09:00',
    subject: 'Histoire-Géographie',
    teacher: 'Philippe Mercier',
    room: 'Salle 204',
  },
];

export const mockStatistics = {
  totalStudents: 450,
  totalTeachers: 35,
  totalClasses: 15,
  averageGrade: 14.8,
  attendanceRate: 94.2,
  paymentCollectionRate: 87.5,
  activeUsers: 142,
  monthlyEnrollments: 12,
};

export const mockBulletins = [
  {
    id: 'BULL001',
    studentId: 'STU001',
    period: '1er Trimestre 2024-2025',
    averageGrade: 15.3,
    ranking: '5ème sur 45',
    teacherComments: 'Bon élève, à maintenir son effort',
    disciplinary: 'Aucun incident signalé',
  },
  {
    id: 'BULL002',
    studentId: 'STU002',
    period: '1er Trimestre 2024-2025',
    averageGrade: 16.9,
    ranking: '2ème sur 45',
    teacherComments: 'Excellent travail, continue',
    disciplinary: 'Aucun incident signalé',
  },
];

export const mockSMSMessages = [
  {
    id: 'SMS001',
    recipient: 'STU001',
    recipientPhone: '+261 32 12 34 567',
    message: 'Bulletin disponible: Votre fils a obtenu une moyenne de 15.5/20 ce trimestre.',
    sender: 'Admin',
    date: '2025-01-20',
    time: '14:30',
    status: 'sent',
    type: 'bulletin'
  },
  {
    id: 'SMS002',
    recipient: 'STU002',
    recipientPhone: '+261 32 98 76 543',
    message: 'Absent: Votre absence en cours de Français a été enregistrée.',
    sender: 'System',
    date: '2025-01-20',
    time: '10:15',
    status: 'sent',
    type: 'attendance'
  },
  {
    id: 'SMS003',
    recipient: 'STU003',
    recipientPhone: '+261 34 55 66 777',
    message: 'Paiement: Merci pour votre paiement des frais de janvier. Montant: 450,000 Ar',
    sender: 'Finance',
    date: '2025-01-19',
    time: '16:45',
    status: 'sent',
    type: 'payment'
  },
  {
    id: 'SMS004',
    recipient: 'STU004',
    recipientPhone: '+261 33 22 11 888',
    message: 'Réunion: Réunion parents-profs le 25 janvier à 18h. Veuillez confirmer votre présence.',
    sender: 'Direction',
    date: '2025-01-18',
    time: '09:00',
    status: 'sent',
    type: 'event'
  },
  {
    id: 'SMS005',
    recipient: 'STU005',
    recipientPhone: '+261 32 44 55 666',
    message: 'Annonce: Fermeture de l\'établissement le 25 janvier pour journée pédagogique.',
    sender: 'Admin',
    date: '2025-01-17',
    time: '11:20',
    status: 'sent',
    type: 'announcement'
  },
  {
    id: 'SMS006',
    recipient: 'PARENT001',
    recipientPhone: '+261 32 12 34 567',
    message: 'Grades: Nouvelle note enregistrée - Mathématiques 16.5/20. Très bon travail!',
    sender: 'System',
    date: '2025-01-20',
    time: '15:30',
    status: 'sent',
    type: 'grades'
  }
];

export const mockSMSTemplates = [
  {
    id: 'TEMPLATE001',
    name: 'Bulletin disponible',
    message: 'Bulletin disponible: Votre enfant a obtenu une moyenne de {average}/20 ce trimestre.',
    type: 'bulletin'
  },
  {
    id: 'TEMPLATE002',
    name: 'Absence enregistrée',
    message: 'Absence: Votre enfant a été absent du cours de {subject} le {date}.',
    type: 'attendance'
  },
  {
    id: 'TEMPLATE003',
    name: 'Paiement reçu',
    message: 'Paiement reçu: Merci pour le paiement de {amount} Ar. Date: {date}',
    type: 'payment'
  },
  {
    id: 'TEMPLATE004',
    name: 'Nouvelle note',
    message: 'Nouvelle note: {subject} - {grade}/20 ({comment})',
    type: 'grades'
  },
  {
    id: 'TEMPLATE005',
    name: 'Événement important',
    message: 'Événement: {event_name} le {date} à {time}. Veuillez confirmer.',
    type: 'event'
  }
];

// Utility functions
export const getStudentById = (id) => mockStudents.find(s => s.id === id);
export const getTeacherById = (id) => mockTeachers.find(t => t.id === id);
export const getStudentGrades = (studentId) => mockGrades.filter(g => g.studentId === studentId);
export const getStudentAttendance = (studentId) => mockAttendance.filter(a => a.studentId === studentId);
export const getStudentPayments = (studentId) => mockPayments.filter(p => p.studentId === studentId);
export const getTeacherClasses = (teacherId) => {
  const teacher = getTeacherById(teacherId);
  return teacher ? teacher.classes : [];
};
export const getSMSMessages = (recipientId) => mockSMSMessages.filter(m => m.recipient === recipientId);
export const getSMSStats = () => ({
  total: mockSMSMessages.length,
  sent: mockSMSMessages.filter(m => m.status === 'sent').length,
  failed: mockSMSMessages.filter(m => m.status === 'failed').length,
  byType: {
    bulletin: mockSMSMessages.filter(m => m.type === 'bulletin').length,
    attendance: mockSMSMessages.filter(m => m.type === 'attendance').length,
    payment: mockSMSMessages.filter(m => m.type === 'payment').length,
    grades: mockSMSMessages.filter(m => m.type === 'grades').length,
    event: mockSMSMessages.filter(m => m.type === 'event').length,
    announcement: mockSMSMessages.filter(m => m.type === 'announcement').length
  }
});
