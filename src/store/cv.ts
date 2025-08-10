import { create } from "zustand";

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
  label: string;
  image?: string;
  email: string;
  phone: string;
  url?: string;
  summary: string;
  location: Location;
  profiles: Profile[];
}

export interface Button {
  text: string;
  href: string;
  type: string;
}

export interface Hero {
  title: string;
  subtitle: string;
  description: string;
  buttons: Button[];
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

export interface Language {
  language: string;
  isNative: boolean;
  read?: string;
  write?: string;
  speak?: string;
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
  courses: Education[];
  skills: string[];
  languages: Language[];
  projects: Project[];
  awards: any[];
  certificates: any[];
  publications: any[];
  volunteer: any[];
}

// Tipos para el store
export interface CVStore {
  // Estado del CV
  cvData: Partial<CVData>;

  // Estado del formulario multi-step
  currentStep: number;
  totalSteps: number;
  isFormComplete: boolean;

  // Acciones para actualizar datos del CV
  updateBasics: (basics: Partial<Basics>) => void;
  addWorkExperience: (work: WorkExperience) => void;
  updateWorkExperience: (index: number, work: Partial<WorkExperience>) => void;
  removeWorkExperience: (index: number) => void;
  addEducation: (education: Education) => void;
  updateEducation: (index: number, education: Partial<Education>) => void;
  removeEducation: (index: number) => void;
  updateSkills: (skills: string[]) => void;
  addCourses: (courses: Education) => void;
  addLanguage: (language: Language) => void;
  updateLanguage: (index: number, language: Partial<Language>) => void;
  removeLanguage: (index: number) => void;
  addProject: (project: Project) => void;
  updateProject: (index: number, project: Partial<Project>) => void;
  removeProject: (index: number) => void;

  // Acciones para navegación del formulario
  nextStep: () => void;
  prevStep: () => void;
  goToStep: (step: number) => void;
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
    label: "",
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
  languages: [],
  projects: [],
};

// Store con Zustand
const useCVStore = create<CVStore>((set, get) => ({
  // Estado inicial
  cvData: initialCVData,
  currentStep: 0,
  totalSteps: 6, // basics, work, education, technologies, languages, projects
  isFormComplete: false,

  // Acciones para actualizar datos del CV
  addCourses: (courses) =>
    set((state) => ({
      cvData: {
        ...state.cvData,
        courses: [...(state.cvData.courses ?? []), courses],
      },
    })),

  // Acciones para datos básicos
  updateBasics: (basics) =>
    set((state) => ({
      cvData: {
        ...state.cvData,
        basics: {
          name: basics.name ?? state.cvData.basics?.name ?? "",
          label: basics.label ?? state.cvData.basics?.label ?? "",
          image: basics.image ?? state.cvData.basics?.image ?? "",
          email: basics.email ?? state.cvData.basics?.email ?? "",
          phone: basics.phone ?? state.cvData.basics?.phone ?? "",
          url: basics.url ?? state.cvData.basics?.url ?? "",
          summary: basics.summary ?? state.cvData.basics?.summary ?? "",
          location: basics.location ??
            state.cvData.basics?.location ?? {
              address: "",
              postalCode: "",
              city: "",
              countryCode: "",
              region: "",
            },
          profiles: basics.profiles ?? state.cvData.basics?.profiles ?? [],
        },
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

  updateWorkExperience: (index, work) =>
    set((state) => {
      const updatedWork = [...(state.cvData.work || [])];
      updatedWork[index] = { ...updatedWork[index], ...work };
      return {
        cvData: {
          ...state.cvData,
          work: updatedWork,
        },
      };
    }),

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

  updateEducation: (index, education) =>
    set((state) => {
      const updatedEducation = [...(state.cvData.education || [])];
      updatedEducation[index] = { ...updatedEducation[index], ...education };
      return {
        cvData: {
          ...state.cvData,
          education: updatedEducation,
        },
      };
    }),

  removeEducation: (index) =>
    set((state) => ({
      cvData: {
        ...state.cvData,
        education: state.cvData.education?.filter((_, i) => i !== index) || [],
      },
    })),

  // Acciones para habilidades
  updateSkills: (skills: string[]) =>
    set((state) => {
      return {
        cvData: {
          ...state.cvData,
          skills: [...new Set(...(state.cvData.skills || [])), ...skills],
        },
      };
    }),

  // Acciones para idiomas
  addLanguage: (language) =>
    set((state) => ({
      cvData: {
        ...state.cvData,
        languages: [...(state.cvData.languages || []), language],
      },
    })),

  updateLanguage: (index, language) =>
    set((state) => {
      const updatedLanguages = [...(state.cvData.languages || [])];
      updatedLanguages[index] = { ...updatedLanguages[index], ...language };
      return {
        cvData: {
          ...state.cvData,
          languages: updatedLanguages,
        },
      };
    }),

  removeLanguage: (index) =>
    set((state) => ({
      cvData: {
        ...state.cvData,
        languages: state.cvData.languages?.filter((_, i) => i !== index) || [],
      },
    })),

  // Acciones para proyectos
  addProject: (project) =>
    set((state) => ({
      cvData: {
        ...state.cvData,
        projects: [...(state.cvData.projects || []), project],
      },
    })),

  updateProject: (index, project) =>
    set((state) => {
      const updatedProjects = [...(state.cvData.projects || [])];
      updatedProjects[index] = { ...updatedProjects[index], ...project };
      return {
        cvData: {
          ...state.cvData,
          projects: updatedProjects,
        },
      };
    }),

  removeProject: (index) =>
    set((state) => ({
      cvData: {
        ...state.cvData,
        projects: state.cvData.projects?.filter((_, i) => i !== index) || [],
      },
    })),

  // Navegación del formulario
  nextStep: () =>
    set((state) => ({
      currentStep: Math.min(state.currentStep + 1, state.totalSteps - 1),
    })),

  prevStep: () =>
    set((state) => ({
      currentStep: Math.max(state.currentStep - 1, 0),
    })),

  goToStep: (step) =>
    set((state) => ({
      currentStep: Math.max(0, Math.min(step, state.totalSteps - 1)),
    })),

  setTotalSteps: (total) =>
    set(() => ({
      totalSteps: total,
    })),

  // Utilidades
  resetCV: () =>
    set(() => ({
      cvData: initialCVData,
      currentStep: 0,
      isFormComplete: false,
    })),

  loadCVData: (data) =>
    set(() => ({
      cvData: data,
    })),

  getProgress: () => {
    const state = get();
    return ((state.currentStep + 1) / state.totalSteps) * 100;
  },
}));

export default useCVStore;
