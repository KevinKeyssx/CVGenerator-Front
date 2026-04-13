import type { CVData, Template, EditorSection } from '$lib/types';

function generateId(): string {
  return Math.random().toString(36).substring(2, 11);
}

const defaultCVData: CVData = {
  personalInfo: {
    fullName: 'María García López',
    title: 'Desarrolladora Full Stack',
    email: 'maria.garcia@email.com',
    phone: '+34 612 345 678',
    location: 'Madrid, España',
    website: 'mariagarcia.dev',
    linkedin: 'linkedin.com/in/mariagarcia',
    summary: 'Desarrolladora Full Stack con más de 5 años de experiencia creando aplicaciones web escalables y de alto rendimiento. Especializada en React, Node.js y arquitecturas cloud. Apasionada por el código limpio y las mejores prácticas de desarrollo.',
    photoUrl: ''
  },
  experiences: [
    {
      id: generateId(),
      company: 'Tech Solutions S.L.',
      position: 'Senior Full Stack Developer',
      startDate: '2022-01',
      endDate: '',
      current: true,
      description: 'Liderando el desarrollo de aplicaciones web empresariales utilizando React y Node.js.',
      achievements: [
        'Reduje el tiempo de carga de la aplicación en un 40%',
        'Implementé CI/CD que aceleró los deployments en un 60%',
        'Mentoría a 3 desarrolladores junior'
      ]
    },
    {
      id: generateId(),
      company: 'Innovate Digital',
      position: 'Full Stack Developer',
      startDate: '2019-06',
      endDate: '2021-12',
      current: false,
      description: 'Desarrollo de plataformas e-commerce y sistemas de gestión.',
      achievements: [
        'Desarrollé una plataforma de e-commerce con 10K usuarios activos',
        'Integración con múltiples pasarelas de pago'
      ]
    }
  ],
  education: [
    {
      id: generateId(),
      institution: 'Universidad Politécnica de Madrid',
      degree: 'Grado en Ingeniería Informática',
      field: 'Ingeniería del Software',
      startDate: '2015-09',
      endDate: '2019-06',
      description: 'Especialización en desarrollo de software y arquitectura de sistemas.'
    }
  ],
  skills: [
    { id: generateId(), name: 'JavaScript/TypeScript', level: 5, category: 'Frontend' },
    { id: generateId(), name: 'React', level: 5, category: 'Frontend' },
    { id: generateId(), name: 'Node.js', level: 4, category: 'Backend' },
    { id: generateId(), name: 'Python', level: 4, category: 'Backend' },
    { id: generateId(), name: 'PostgreSQL', level: 4, category: 'Database' },
    { id: generateId(), name: 'AWS', level: 3, category: 'Cloud' },
    { id: generateId(), name: 'Docker', level: 4, category: 'DevOps' },
    { id: generateId(), name: 'Git', level: 5, category: 'Tools' }
  ],
  languages: [
    { id: generateId(), name: 'Español', level: 'native' },
    { id: generateId(), name: 'Inglés', level: 'fluent' },
    { id: generateId(), name: 'Francés', level: 'intermediate' }
  ],
  projects: [
    {
      id: generateId(),
      name: 'TaskFlow Pro',
      description: 'Aplicación de gestión de proyectos con colaboración en tiempo real',
      url: 'github.com/mariagarcia/taskflow',
      technologies: ['React', 'Node.js', 'Socket.io', 'MongoDB']
    },
    {
      id: generateId(),
      name: 'WeatherApp',
      description: 'App de pronóstico del tiempo con geolocalización',
      url: 'github.com/mariagarcia/weatherapp',
      technologies: ['Svelte', 'OpenWeather API', 'TailwindCSS']
    }
  ]
};

const templates: Template[] = [
  {
    id: 'modern',
    name: 'Moderno',
    description: 'Diseño limpio y contemporáneo con acentos de color',
    thumbnail: 'modern',
    primaryColor: '#3B82F6',
    accentColor: '#8B5CF6'
  },
  {
    id: 'classic',
    name: 'Clásico',
    description: 'Estilo tradicional y profesional',
    thumbnail: 'classic',
    primaryColor: '#1F2937',
    accentColor: '#6B7280'
  },
  {
    id: 'creative',
    name: 'Creativo',
    description: 'Diseño atrevido para destacar',
    thumbnail: 'creative',
    primaryColor: '#EC4899',
    accentColor: '#F59E0B'
  },
  {
    id: 'minimal',
    name: 'Minimalista',
    description: 'Simplicidad elegante y espaciado generoso',
    thumbnail: 'minimal',
    primaryColor: '#0F172A',
    accentColor: '#64748B'
  }
];

class CVStore {
  cvData = $state<CVData>(defaultCVData);
  selectedTemplate = $state<Template>(templates[0]);
  activeSection = $state<EditorSection>('personal');
  isPreviewMode = $state(false);

  get templates() {
    return templates;
  }

  updatePersonalInfo(field: keyof CVData['personalInfo'], value: string) {
    this.cvData.personalInfo[field] = value;
  }

  // Experience methods
  addExperience() {
    const newExperience = {
      id: generateId(),
      company: '',
      position: '',
      startDate: '',
      endDate: '',
      current: false,
      description: '',
      achievements: []
    };
    this.cvData.experiences = [...this.cvData.experiences, newExperience];
    return newExperience.id;
  }

  updateExperience(id: string, field: keyof CVData['experiences'][0], value: any) {
    this.cvData.experiences = this.cvData.experiences.map(exp =>
      exp.id === id ? { ...exp, [field]: value } : exp
    );
  }

  removeExperience(id: string) {
    this.cvData.experiences = this.cvData.experiences.filter(exp => exp.id !== id);
  }

  addAchievement(expId: string) {
    this.cvData.experiences = this.cvData.experiences.map(exp =>
      exp.id === expId ? { ...exp, achievements: [...exp.achievements, ''] } : exp
    );
  }

  updateAchievement(expId: string, index: number, value: string) {
    this.cvData.experiences = this.cvData.experiences.map(exp =>
      exp.id === expId
        ? { ...exp, achievements: exp.achievements.map((a, i) => (i === index ? value : a)) }
        : exp
    );
  }

  removeAchievement(expId: string, index: number) {
    this.cvData.experiences = this.cvData.experiences.map(exp =>
      exp.id === expId
        ? { ...exp, achievements: exp.achievements.filter((_, i) => i !== index) }
        : exp
    );
  }

  // Education methods
  addEducation() {
    const newEducation = {
      id: generateId(),
      institution: '',
      degree: '',
      field: '',
      startDate: '',
      endDate: '',
      description: ''
    };
    this.cvData.education = [...this.cvData.education, newEducation];
    return newEducation.id;
  }

  updateEducation(id: string, field: keyof CVData['education'][0], value: string) {
    this.cvData.education = this.cvData.education.map(edu =>
      edu.id === id ? { ...edu, [field]: value } : edu
    );
  }

  removeEducation(id: string) {
    this.cvData.education = this.cvData.education.filter(edu => edu.id !== id);
  }

  // Skills methods
  addSkill() {
    const newSkill = {
      id: generateId(),
      name: '',
      level: 3,
      category: ''
    };
    this.cvData.skills = [...this.cvData.skills, newSkill];
    return newSkill.id;
  }

  updateSkill(id: string, field: keyof CVData['skills'][0], value: any) {
    this.cvData.skills = this.cvData.skills.map(skill =>
      skill.id === id ? { ...skill, [field]: value } : skill
    );
  }

  removeSkill(id: string) {
    this.cvData.skills = this.cvData.skills.filter(skill => skill.id !== id);
  }

  // Languages methods
  addLanguage() {
    const newLanguage = {
      id: generateId(),
      name: '',
      level: 'intermediate' as const
    };
    this.cvData.languages = [...this.cvData.languages, newLanguage];
    return newLanguage.id;
  }

  updateLanguage(id: string, field: keyof CVData['languages'][0], value: any) {
    this.cvData.languages = this.cvData.languages.map(lang =>
      lang.id === id ? { ...lang, [field]: value } : lang
    );
  }

  removeLanguage(id: string) {
    this.cvData.languages = this.cvData.languages.filter(lang => lang.id !== id);
  }

  // Projects methods
  addProject() {
    const newProject = {
      id: generateId(),
      name: '',
      description: '',
      url: '',
      technologies: []
    };
    this.cvData.projects = [...this.cvData.projects, newProject];
    return newProject.id;
  }

  updateProject(id: string, field: keyof CVData['projects'][0], value: any) {
    this.cvData.projects = this.cvData.projects.map(proj =>
      proj.id === id ? { ...proj, [field]: value } : proj
    );
  }

  removeProject(id: string) {
    this.cvData.projects = this.cvData.projects.filter(proj => proj.id !== id);
  }

  addTechnology(projId: string, tech: string) {
    this.cvData.projects = this.cvData.projects.map(proj =>
      proj.id === projId ? { ...proj, technologies: [...proj.technologies, tech] } : proj
    );
  }

  removeTechnology(projId: string, index: number) {
    this.cvData.projects = this.cvData.projects.map(proj =>
      proj.id === projId
        ? { ...proj, technologies: proj.technologies.filter((_, i) => i !== index) }
        : proj
    );
  }

  // Template methods
  selectTemplate(template: Template) {
    this.selectedTemplate = template;
  }

  // Navigation
  setActiveSection(section: EditorSection) {
    this.activeSection = section;
  }

  togglePreviewMode() {
    this.isPreviewMode = !this.isPreviewMode;
  }

  // Reset
  resetCV() {
    this.cvData = { ...defaultCVData };
  }
}

export const cvStore = new CVStore();
