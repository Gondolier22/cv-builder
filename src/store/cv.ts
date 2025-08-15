import { create } from "zustand";

export type FormStep =
  | "basics"
  | "work"
  | "education"
  | "skills"
  | "courses"
  | "projects";

// Tipos principales
export interface Location {
  address?: string;
  postalCode?: string;
  city: string;
  countryCode?: string;
  region: string;
}

export interface Profile {
  network: string;
  username: string;
  url: string;
}

export interface Basics {
  name: string;
  jobPosition: string;
  image?: string;
  email: string;
  phone: string;
  url?: string;
  summary: string;
  location: Location;
  profiles?: Profile[];
}
export interface WorkExperience {
  company: string;
  position: string;
  url: string | null;
  startDate: string;
  endDate?: string | null;
  summary: string;
}

export interface Education {
  institution: string;
  url?: string;
  title: string;
  startDate: string;
  endDate?: string;
}

export interface Project {
  name: string;
  description: string;
  startDate: string;
  endDate?: string;
  url: string;
  avatar?: string;
  github?: string;
}

export interface CVData {
  basics: Basics;
  work: WorkExperience[];
  education: Education[];
  skills: string[];
  projects: Project[];
  courses: Education[];
}

// Tipos para el store
export interface CVStore {
  // Estado del CV
  cvData: Partial<CVData>;

  // Estado del formulario multi-step
  currentStep: FormStep;
  completedSteps: Set<FormStep>;
  totalSteps: number;
  isFormComplete: boolean;

  setCurrentStep: (step: FormStep) => void;
  markStepAsCompleted: (step: FormStep) => void;

  // Acciones para actualizar datos del CV
  addBasics: (basics: Basics) => void;
  addWorkExperience: (work: WorkExperience) => void;
  removeWorkExperience: (index: number) => void;
  addEducation: (education: Education) => void;
  removeEducation: (index: number) => void;
  addCourse: (course: Education) => void;
  removeCourse: (index: number) => void;
  addProject: (project: Project) => void;
  removeProject: (index: number) => void;
  addSkill: (skills: string) => void;
  removeSkill: (index: number) => void;

  // Acciones para navegación del formulario
  setTotalSteps: (total: number) => void;

  // Utilidades
  resetCV: () => void;
  loadCVData: (data: Partial<CVData>) => void;
  getProgress: () => number;
}

// Estado inicial
const initialCVData: Partial<CVData> = {
  basics: {
    name: "",
    jobPosition: "",
    image: "",
    email: "",
    phone: "",
    url: "",
    summary: "",
    location: {
      address: "",
      postalCode: "",
      city: "",
      countryCode: "",
      region: "",
    },
    profiles: [],
  },
  work: [],
  education: [],
  projects: [],
};

// Store con Zustand
const useCVStore = create<CVStore>((set, get) => ({
  // Estado inicial
  cvData: initialCVData,
  currentStep: "basics",
  totalSteps: 0,
  isFormComplete: false,

  completedSteps: new Set(),

  setCurrentStep: (step) => set({ currentStep: step }),
  markStepAsCompleted: (step) =>
    set((state) => {
      const completedSteps = new Set(state.completedSteps);
      completedSteps.add(step);
      return { ...state, completedSteps };
    }),

  addBasics: (basics) =>
    set((state) => ({
      cvData: {
        ...state.cvData,
        basics,
      },
    })),
  // Acciones para experiencia laboral
  addWorkExperience: (work) =>
    set((state) => ({
      cvData: {
        ...state.cvData,
        work: [...(state.cvData.work || []), work],
      },
    })),

  removeWorkExperience: (index) =>
    set((state) => ({
      cvData: {
        ...state.cvData,
        work: state.cvData.work?.filter((_, i) => i !== index) || [],
      },
    })),

  // Acciones para educación
  addEducation: (education) =>
    set((state) => ({
      cvData: {
        ...state.cvData,
        education: [...(state.cvData.education || []), education],
      },
    })),

  removeEducation: (index) =>
    set((state) => ({
      cvData: {
        ...state.cvData,
        education: state.cvData.education?.filter((_, i) => i !== index) || [],
      },
    })),

  // Acciones para educación
  addCourse: (course) =>
    set((state) => ({
      cvData: {
        ...state.cvData,
        courses: [...(state.cvData.courses || []), course],
      },
    })),

  removeCourse: (index) =>
    set((state) => ({
      cvData: {
        ...state.cvData,
        courses: state.cvData.courses?.filter((_, i) => i !== index) || [],
      },
    })),

  // Acciones para habilidades

  // Acciones para proyectos
  addProject: (project) =>
    set((state) => ({
      cvData: {
        ...state.cvData,
        projects: [...(state.cvData.projects || []), project],
      },
    })),

  removeProject: (index) =>
    set((state) => ({
      cvData: {
        ...state.cvData,
        projects: state.cvData.projects?.filter((_, i) => i !== index) || [],
      },
    })),

  addSkill: (skills) =>
    set((state) => ({
      cvData: {
        ...state.cvData,
        skills: [...(state.cvData.skills || []), skills],
      },
    })),

  removeSkill: (index) =>
    set((state) => ({
      cvData: {
        ...state.cvData,
        skills: state.cvData.skills?.filter((_, i) => i !== index) || [],
      },
    })),

  setTotalSteps: (total) =>
    set(() => ({
      totalSteps: total,
    })),

  // Utilidades
  resetCV: () =>
    set(() => ({
      cvData: initialCVData,
      currentStep: "basics",
      isFormComplete: false,
    })),

  loadCVData: (data) =>
    set(() => ({
      cvData: data,
    })),

  getProgress: () => {
    const state = get();
    return (state.completedSteps.size / state.totalSteps) * 100;
  },
}));

export default useCVStore;
