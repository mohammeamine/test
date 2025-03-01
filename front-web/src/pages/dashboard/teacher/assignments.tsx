import { useState } from "react";
import { User } from "../../../types/auth";
import { TeacherLayout } from "../../../components/dashboard/layout/teacher-layout";
import { 
  ClipboardCheck, Search, Plus, Calendar, Clock, 
  CheckCircle2, XCircle, Bell, FileText, PenTool, 
  BarChart, Download, Upload, MessageSquare 
} from "lucide-react";

interface TeacherAssignmentsProps {
  user: User;
}

// Types pour les devoirs
interface Assignment {
  id: string;
  title: string;
  course: string;
  dueDate: string;
  status: 'pending' | 'graded' | 'overdue';
  submissionCount: number;
  totalStudents: number;
}

// Types pour les contrôles et examens
interface Exam {
  id: string;
  title: string;
  course: string;
  date: string;
  type: 'quiz' | 'exam';
  status: 'scheduled' | 'completed';
}

// Types pour les évaluations
interface Evaluation {
  id: string;
  title: string;
  course: string;
  date: string;
  type: 'test' | 'project';
  status: 'pending' | 'completed';
}

// Types pour les templates de feedback
interface FeedbackTemplate {
  id: string;
  title: string;
  content: string;
}

export default function TeacherAssignments({ user }: TeacherAssignmentsProps) {
  // États pour la gestion des onglets
  const [activeTab, setActiveTab] = useState<"assignments" | "exams" | "evaluations">("assignments");

  // États pour les modales
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showFeedbackModal, setShowFeedbackModal] = useState(false);
  const [selectedAssignment, setSelectedAssignment] = useState<string | null>(null);

  // États pour les filtres
  const [filterStatus, setFilterStatus] = useState<string>("all");

  // Données fictives pour les devoirs
  const assignments: Assignment[] = [
    { 
      id: "a1", 
      title: "Calculus Quiz #3", 
      course: "Mathematics 101", 
      dueDate: "Mar 15, 2024",
      status: "pending",
      submissionCount: 18,
      totalStudents: 24
    },
    { 
      id: "a2", 
      title: "Lab Report #2", 
      course: "Physics 201", 
      dueDate: "Mar 20, 2024",
      status: "graded",
      submissionCount: 22,
      totalStudents: 22
    },
    { 
      id: "a3", 
      title: "Literary Analysis Essay", 
      course: "English Literature", 
      dueDate: "Mar 18, 2024",
      status: "overdue",
      submissionCount: 15,
      totalStudents: 26
    },
  ];

  // Données fictives pour les contrôles et examens
  const exams: Exam[] = [
    { 
      id: "e1", 
      title: "Midterm Exam", 
      course: "Physics 201", 
      date: "Mar 25, 2024",
      type: 'exam',
      status: 'scheduled'
    },
    { 
      id: "e2", 
      title: "Quiz #1", 
      course: "Mathematics 101", 
      date: "Mar 30, 2024",
      type: 'quiz',
      status: 'scheduled'
    },
  ];

  // Données fictives pour les évaluations
  const evaluations: Evaluation[] = [
    { 
      id: "ev1", 
      title: "Final Project", 
      course: "English Literature", 
      date: "Apr 10, 2024",
      type: 'project',
      status: 'pending'
    },
    { 
      id: "ev2", 
      title: "Unit Test", 
      course: "Mathematics 101", 
      date: "Apr 5, 2024",
      type: 'test',
      status: 'pending'
    },
  ];

  // Templates de feedback prédéfinis
  const feedbackTemplates: FeedbackTemplate[] = [
    { id: "f1", title: "Excellent Work", content: "Excellent travail! Votre analyse est approfondie et montre une réelle compréhension des concepts." },
    { id: "f2", title: "Good Effort", content: "Bon effort. Il y a des points qui nécessitent plus de développement, mais vous êtes sur la bonne voie." },
    { id: "f3", title: "Needs Improvement", content: "Ce travail nécessite des améliorations. Veuillez revoir les concepts de base et me contacter pour une aide supplémentaire." },
  ];

  // Filtrer les devoirs en fonction du statut
  const filteredAssignments = filterStatus === "all" 
    ? assignments 
    : assignments.filter(a => a.status === filterStatus);

  // Gestionnaire pour l'assignation d'un nouveau devoir
  const handleCreateAssignment = () => {
    setShowCreateModal(true);
  };

  // Gestionnaire pour la correction en ligne
  const handleGradeAssignment = (id: string) => {
    setSelectedAssignment(id);
    setShowFeedbackModal(true);
  };

  return (
    <TeacherLayout user={user}>
      <div className="p-6 space-y-6">
        {/* En-tête avec navigation par onglets */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Gestion des évaluations</h1>
            <p className="mt-1 text-sm text-gray-500">
              Créez, assignez et gérez les évaluations de vos classes
            </p>
          </div>
          <div className="flex gap-2">
            <button 
              onClick={handleCreateAssignment}
              className="flex items-center gap-2 rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
            >
              <Plus className="h-4 w-4" />
              Créer
            </button>
            <button className="flex items-center gap-2 rounded-md border border-gray-300 px-4 py-2 text-sm font-medium hover:bg-gray-50">
              <Bell className="h-4 w-4" />
              Notifications
            </button>
          </div>
        </div>

        {/* Navigation par onglets */}
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8">
            <button
              onClick={() => setActiveTab("assignments")}
              className={`px-1 py-4 text-sm font-medium ${
                activeTab === "assignments"
                  ? "border-b-2 border-blue-600 text-blue-600"
                  : "text-gray-500 hover:border-b-2 hover:border-gray-300 hover:text-gray-700"
              }`}
            >
              <span className="flex items-center gap-2">
                <ClipboardCheck className="h-4 w-4" />
                Devoirs
              </span>
            </button>
            <button
              onClick={() => setActiveTab("exams")}
              className={`px-1 py-4 text-sm font-medium ${
                activeTab === "exams"
                  ? "border-b-2 border-blue-600 text-blue-600"
                  : "text-gray-500 hover:border-b-2 hover:border-gray-300 hover:text-gray-700"
              }`}
            >
              <span className="flex items-center gap-2">
                <FileText className="h-4 w-4" />
                Contrôles & Examens
              </span>
            </button>
            <button
              onClick={() => setActiveTab("evaluations")}
              className={`px-1 py-4 text-sm font-medium ${
                activeTab === "evaluations"
                  ? "border-b-2 border-blue-600 text-blue-600"
                  : "text-gray-500 hover:border-b-2 hover:border-gray-300 hover:text-gray-700"
              }`}
            >
              <span className="flex items-center gap-2">
                <BarChart className="h-4 w-4" />
                Évaluations
              </span>
            </button>
          </nav>
        </div>

        {/* Statistiques */}
        <div className="grid gap-6 md:grid-cols-4">
          <div className="rounded-lg border bg-white p-6">
            <h3 className="text-sm font-medium text-gray-500">Total des devoirs</h3>
            <p className="mt-2 text-3xl font-semibold text-gray-900">24</p>
            <p className="mt-1 text-sm text-gray-500">Ce semestre</p>
          </div>
          <div className="rounded-lg border bg-white p-6">
            <h3 className="text-sm font-medium text-gray-500">À corriger</h3>
            <p className="mt-2 text-3xl font-semibold text-yellow-600">8</p>
            <p className="mt-1 text-sm text-gray-500">En attente de notation</p>
          </div>
          <div className="rounded-lg border bg-white p-6">
            <h3 className="text-sm font-medium text-gray-500">Complétés</h3>
            <p className="mt-2 text-3xl font-semibold text-green-600">12</p>
            <p className="mt-1 text-sm text-gray-500">Notés et rendus</p>
          </div>
          <div className="rounded-lg border bg-white p-6">
            <h3 className="text-sm font-medium text-gray-500">À échéance proche</h3>
            <p className="mt-2 text-3xl font-semibold text-red-600">4</p>
            <p className="mt-1 text-sm text-gray-500">Dans les 7 jours</p>
          </div>
        </div>

        {/* Contenu en fonction de l'onglet actif */}
        {activeTab === "assignments" && (
          <>
            {/* Barre de recherche et filtres */}
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <div className="relative flex-grow">
                <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Rechercher..."
                  className="w-full rounded-lg border border-gray-300 py-2 pl-10 pr-4 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>
              <label htmlFor="filterStatus" className="sr-only">Filter by status</label>
              <select 
                id="filterStatus"
                className="rounded-lg border border-gray-300 py-2 px-3 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                onChange={(e) => setFilterStatus(e.target.value)}
                value={filterStatus}
              >
                <option value="all">Tous les statuts</option>
                <option value="pending">En attente</option>
                <option value="graded">Corrigés</option>
                <option value="overdue">En retard</option>
              </select>
            </div>

            {/* Liste des devoirs */}
            <div className="rounded-lg border bg-white overflow-hidden">
              <div className="divide-y">
                {filteredAssignments.map((assignment) => (
                  <div key={assignment.id} className="p-4">
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                      <div className="flex items-center gap-3">
                        <div className={`rounded-lg p-2 ${
                          assignment.status === 'graded' ? 'bg-green-100' : 
                          assignment.status === 'overdue' ? 'bg-red-100' : 'bg-yellow-100'
                        }`}>
                          <ClipboardCheck className={`h-5 w-5 ${
                            assignment.status === 'graded' ? 'text-green-600' : 
                            assignment.status === 'overdue' ? 'text-red-600' : 'text-yellow-600'
                          }`} />
                        </div>
                        <div>
                          <h3 className="font-medium text-gray-900">{assignment.title}</h3>
                          <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
                            <span>{assignment.course}</span>
                            <span className="flex items-center gap-1">
                              <Calendar className="h-4 w-4" />
                              Dû le {assignment.dueDate}
                            </span>
                            <span className="flex items-center gap-1">
                              <Upload className="h-4 w-4" />
                              {assignment.submissionCount}/{assignment.totalStudents} rendus
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-2 mt-2 sm:mt-0">
                        {assignment.status !== 'graded' && (
                          <button 
                            onClick={() => handleGradeAssignment(assignment.id)}
                            className="rounded-md bg-blue-50 px-3 py-1 text-sm font-medium text-blue-600 hover:bg-blue-100"
                          >
                            Corriger
                          </button>
                        )}
                        <button className="rounded-md bg-gray-50 px-3 py-1 text-sm font-medium text-gray-600 hover:bg-gray-100">
                          Détails
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}

        {activeTab === "exams" && (
          <>
            {/* Liste des contrôles et examens */}
            <div className="rounded-lg border bg-white overflow-hidden">
              <div className="divide-y">
                {exams.map((exam) => (
                  <div key={exam.id} className="p-4">
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                      <div className="flex items-center gap-3">
                        <div className={`rounded-lg p-2 ${
                          exam.status === 'completed' ? 'bg-green-100' : 'bg-yellow-100'
                        }`}>
                          <FileText className={`h-5 w-5 ${
                            exam.status === 'completed' ? 'text-green-600' : 'text-yellow-600'
                          }`} />
                        </div>
                        <div>
                          <h3 className="font-medium text-gray-900">{exam.title}</h3>
                          <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
                            <span>{exam.course}</span>
                            <span className="flex items-center gap-1">
                              <Calendar className="h-4 w-4" />
                              Date: {exam.date}
                            </span>
                            <span className="flex items-center gap-1">
                              <Clock className="h-4 w-4" />
                              {exam.type === 'quiz' ? 'Quiz' : 'Examen'}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-2 mt-2 sm:mt-0">
                        <button className="rounded-md bg-gray-50 px-3 py-1 text-sm font-medium text-gray-600 hover:bg-gray-100">
                          Détails
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}

        {activeTab === "evaluations" && (
          <>
            {/* Liste des évaluations */}
            <div className="rounded-lg border bg-white overflow-hidden">
              <div className="divide-y">
                {evaluations.map((evaluation) => (
                  <div key={evaluation.id} className="p-4">
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                      <div className="flex items-center gap-3">
                        <div className={`rounded-lg p-2 ${
                          evaluation.status === 'completed' ? 'bg-green-100' : 'bg-yellow-100'
                        }`}>
                          <BarChart className={`h-5 w-5 ${
                            evaluation.status === 'completed' ? 'text-green-600' : 'text-yellow-600'
                          }`} />
                        </div>
                        <div>
                          <h3 className="font-medium text-gray-900">{evaluation.title}</h3>
                          <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
                            <span>{evaluation.course}</span>
                            <span className="flex items-center gap-1">
                              <Calendar className="h-4 w-4" />
                              Date: {evaluation.date}
                            </span>
                            <span className="flex items-center gap-1">
                              {evaluation.type === 'test' ? 'Test' : 'Projet'}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-2 mt-2 sm:mt-0">
                        <button className="rounded-md bg-gray-50 px-3 py-1 text-sm font-medium text-gray-600 hover:bg-gray-100">
                          Détails
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}

        {/* Modal pour créer un nouveau devoir */}
        {showCreateModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 max-w-md w-full max-h-[90vh] overflow-y-auto">
              <h2 className="text-xl font-bold mb-4">Créer une nouvelle évaluation</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Type d'évaluation</label>
                  <select id="evaluationType" className="w-full rounded-lg border border-gray-300 py-2 px-3" title="Sélectionnez le type d'évaluation">
                    <option value="assignment">Devoir</option>
                    <option value="quiz">Quiz</option>
                    <option value="exam">Examen</option>
                    <option value="project">Projet</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Titre</label>
                  <input type="text" className="w-full rounded-lg border border-gray-300 py-2 px-3" placeholder="Entrez le titre" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Cours</label>
                  <select id="courseSelect" title="Sélectionnez un cours" className="w-full rounded-lg border border-gray-300 py-2 px-3">
                    <option value="math101">Mathematics 101</option>
                    <option value="phys201">Physics 201</option>
                    <option value="eng101">English Literature</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Instructions</label>
                  <textarea className="w-full rounded-lg border border-gray-300 py-2 px-3 min-h-[100px]" placeholder="Entrez les instructions" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Date d'assignation</label>
                    <input type="date" className="w-full rounded-lg border border-gray-300 py-2 px-3" title="Date d'assignation" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Date d'échéance</label>
                    <input type="date" className="w-full rounded-lg border border-gray-300 py-2 px-3" title="Date d'échéance" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Points possibles</label>
                  <input type="number" className="w-full rounded-lg border border-gray-300 py-2 px-3" placeholder="Entrez les points possibles" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Pièces jointes</label>
                  <div className="border border-dashed border-gray-300 rounded-lg p-4 text-center">
                    <p className="text-sm text-gray-500">Glissez-déposez des fichiers ici ou</p>
                    <button className="mt-2 text-sm font-medium text-blue-600">Parcourir les fichiers</button>
                  </div>
                </div>
                <div className="flex justify-end gap-3 mt-6">
                  <button 
                    onClick={() => setShowCreateModal(false)}
                    className="rounded-md border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                  >
                    Annuler
                  </button>
                  <button className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700">
                    Créer et assigner
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Modal pour la correction avec feedback */}
        {showFeedbackModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 max-w-4xl w-full max-h-[90vh] overflow-y-auto">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">Correction: Calculus Quiz #3</h2>
                <button
                  onClick={() => setShowFeedbackModal(false)}
                  className="text-gray-500 hover:text-gray-700"
                  title="Close"
                >
                  <XCircle className="h-6 w-6" />
                </button>
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
                <div className="lg:col-span-3 space-y-4">
                  <div className="border rounded-lg p-4">
                    <h3 className="font-medium text-gray-900 mb-2">Travail de l'étudiant</h3>
                    <div className="border-t pt-2">
                      <p className="text-gray-600 text-sm">Document PDF soumis par l'étudiant...</p>
                      <div className="mt-2 p-4 bg-gray-100 rounded text-sm">
                        <p>Contenu du devoir de l'étudiant serait affiché ici</p>
                      </div>
                    </div>
                  </div>
                  <div className="border rounded-lg p-4">
                    <h3 className="font-medium text-gray-900 mb-2">Grille de notation</h3>
                    <div className="space-y-3 mt-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <input type="checkbox" className="rounded" title="Compréhension des concepts fondamentaux" />
                          <span className="text-sm">Compréhension des concepts fondamentaux</span>
                        </div>
                        <select title="Choose a score" className="rounded border border-gray-300 text-sm p-1">
                          <option value="5">5/5 pts</option>
                          <option value="4">4/5 pts</option>
                          <option value="3">3/5 pts</option>
                          <option value="2">2/5 pts</option>
                          <option value="1">1/5 pts</option>
                          <option value="0">0/5 pts</option>
                        </select>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <input type="checkbox" className="rounded" title="Application des formules" />
                          <span className="text-sm">Application des formules</span>
                        </div>
                        <select title="Points for fundamental concepts" className="rounded border border-gray-300 text-sm p-1">
                          <option value="10">10/10 pts</option>
                          <option value="9">9/10 pts</option>
                          <option value="8">8/10 pts</option>
                          <option value="7">7/10 pts</option>
                          <option value="6">6/10 pts</option>
                          <option value="5">5/10 pts</option>
                          <option value="0">0/10 pts</option>
                        </select>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <input type="checkbox" className="rounded" title="Résolution de problèmes" />
                          <span className="text-sm">Résolution de problèmes</span>
                        </div>
                        <select title="Points for problem solving" className="rounded border border-gray-300 text-sm p-1">
                          <option value="10">10/10 pts</option>
                          <option value="8">8/10 pts</option>
                          <option value="6">6/10 pts</option>
                          <option value="4">4/10 pts</option>
                          <option value="2">2/10 pts</option>
                          <option value="0">0/10 pts</option>
                        </select>
                      </div>
                    </div>
                    <div className="mt-4 pt-3 border-t flex justify-between items-center">
                      <span className="font-medium">Total:</span>
                      <span className="font-medium">18/25 points (72%)</span>
                    </div>
                  </div>
                </div>
                <div className="lg:col-span-2 space-y-4">
                  <div className="border rounded-lg p-4">
                    <h3 className="font-medium text-gray-900 mb-3">Feedback détaillé</h3>
                    <div className="mb-3">
                      <label className="block text-sm text-gray-600 mb-1">Templates de feedback</label>
                      <select title="Templates de feedback disponibles" className="w-full rounded border border-gray-300 text-sm p-2">
                        <option value="">Sélectionner un template...</option>
                        {feedbackTemplates.map(template => (
                          <option key={template.id} value={template.id}>{template.title}</option>
                        ))}
                      </select>
                    </div>
                    <textarea 
                      className="w-full rounded-lg border border-gray-300 p-3 min-h-[150px] text-sm"
                      placeholder="Saisissez vos commentaires détaillés ici..."
                    />
                    <div className="flex justify-between items-center mt-3">
                      <button className="text-sm text-blue-600">Enregistrer comme template</button>
                      <div className="flex items-center gap-1">
                        <PenTool className="h-4 w-4 text-gray-500" />
                        <span className="text-sm text-gray-500">Annotations: 3</span>
                      </div>
                    </div>
                  </div>
                  <div className="border rounded-lg p-4">
                    <h3 className="font-medium text-gray-900 mb-3">Actions</h3>
                    <div className="space-y-3">
                      <button className="w-full flex items-center justify-center gap-2 rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700">
                        <CheckCircle2 className="h-4 w-4" />
                        Enregistrer et publier les notes
                      </button>
                      <button className="w-full flex items-center justify-center gap-2 rounded-md border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">
                        <Clock className="h-4 w-4" />
                        Enregistrer comme brouillon
                      </button>
                      <button className="w-full flex items-center justify-center gap-2 rounded-md border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">
                        <MessageSquare className="h-4 w-4" />
                        Demander une révision
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </TeacherLayout>
  );
}