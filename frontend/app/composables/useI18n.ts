type Locale = 'en' | 'id'

const translations = {
  en: {
    // Hero
    heroAvailable: 'Available for collaboration',
    heroTitle: 'Building reliable backend systems & data-driven engineering products.',
    heroDescription: 'I design APIs, dashboards, and system-oriented applications that bridge hardware engineering and software systems.',
    heroViewProjects: 'View Projects',
    heroDownloadCV: 'Download CV',
    heroContactMe: 'Contact Me',
    heroLocation: 'Location',
    heroApiDriven: 'API-driven content',
    heroDatabaseFirst: 'Database-first',

    heroScrollExplore: 'Scroll to explore',

    // About
    aboutEyebrow: '01 / Profile',
    aboutTitle: 'Technical Identity',
    aboutDescription: 'A multidisciplinary engineer working across hardware and software boundaries.',
    aboutBioTitle: 'About Me',
    aboutBioDefault: 'A passionate developer with interests in Backend Development, Data, QA, and technology-based system development.',
    aboutDomains: 'Domains',
    aboutTechnologies: 'Technologies',
    aboutProjects: 'Projects',
    aboutInfoName: 'Name',
    aboutInfoLocation: 'Location',
    aboutInfoEmail: 'Email',
    aboutInfoWebsite: 'Website',
    aboutInfoNotSpecified: 'Not specified',

    // Capabilities
    capEETitle: 'Electrical Engineering',
    capEEDesc: 'PCB design, embedded systems, and hardware-software integration for IoT and industrial applications.',
    capIoTTitle: 'IoT Systems',
    capIoTDesc: 'End-to-end IoT solutions from sensor data acquisition to cloud dashboards and real-time monitoring.',
    capDataTitle: 'Data Science',
    capDataDesc: 'Data analysis, visualization, and pipeline development for engineering and business intelligence.',
    capBackendTitle: 'Backend Development',
    capBackendDesc: 'RESTful APIs, microservices, and database architecture with Go, Node.js, and PostgreSQL.',
    capMLTitle: 'Machine Learning',
    capMLDesc: 'Predictive models, anomaly detection, and ML pipeline integration for engineering systems.',
    capQATitle: 'Quality Assurance',
    capQADesc: 'Test automation, CI/CD pipelines, and quality frameworks for reliable software delivery.',

    // Projects
    projectsEyebrow: '02 / Featured Work',
    projectsTitle: 'Featured Projects',
    projectsDescription: 'Selected projects showcasing engineering across multiple domains.',
    projectsViewCaseStudy: 'View case study',
    projectsMore: 'more',
    projectsViewAll: 'View all projects',
    projectsEmpty: 'No projects available yet.',
    projectsError: 'Failed to load projects',

    // Experience
    experienceEyebrow: '03 / Journey',
    experienceTitle: 'Experience & Education',
    experienceDescription: 'Professional journey and academic background in engineering.',
    experiencePresent: 'Present',
    experienceEmpty: 'No experience entries available yet.',

    // Skills
    skillsEyebrow: '04 / Tech Stack',
    skillsTitle: 'Skills & Technologies',
    skillsDescription: 'Technologies and tools I work with across different domains.',
    skillsBackend: 'Backend',
    skillsFrontend: 'Frontend',
    skillsDatabase: 'Database',
    skillsDevOps: 'DevOps',
    skillsData: 'Data & ML',
    skillsLevelAdvanced: 'Advanced',
    skillsLevelIntermediate: 'Intermediate',
    skillsLevelFamiliar: 'Familiar',
    skillsEmpty: 'No skills data available yet.',

    // Achievements
    achievementsEyebrow: '06 / Achievements',
    achievementsTitle: 'Achievements & Certifications',
    achievementsDescription: 'Professional certifications, awards, and notable accomplishments.',
    achievementsEmpty: 'No achievements available yet.',
    achievementsViewCredential: 'View credential',

    // Contact
    contactEyebrow: '05 / Contact',
    contactTitle: "Let's build something",
    contactTitleAccent: 'reliable',
    contactTitleEnd: 'together.',
    contactDescription: 'Reach out for collaboration, internship, freelance work, or technical discussion across EE, IoT, Data, Backend, and ML.',
    contactEmailMe: 'Email Me',
    contactDownloadCV: 'Download CV',
    contactConnect: 'Connect',
    contactAvailable: 'Available for collaboration',
    contactResponseTime: 'Usually within 24 hours',
    contactNoLinks: 'Contact links are not available yet.',
    contactFormTitle: 'Send a Message',
    contactFormName: 'Name',
    contactFormNamePlaceholder: 'Your name',
    contactFormNameRequired: 'Name is required.',
    contactFormEmail: 'Email',
    contactFormEmailPlaceholder: 'your@email.com',
    contactFormEmailRequired: 'Email is required.',
    contactFormEmailInvalid: 'Please enter a valid email address.',
    contactFormSubject: 'Subject',
    contactFormSubjectPlaceholder: 'What is this about?',
    contactFormOptional: 'optional',
    contactFormMessage: 'Message',
    contactFormMessagePlaceholder: 'Your message...',
    contactFormMessageRequired: 'Message is required.',
    contactFormSubmit: 'Send Message',
    contactFormSending: 'Sending...',
    contactFormSuccessTitle: 'Message sent!',
    contactFormSuccessMessage: 'Thank you for reaching out. I will get back to you soon.',

    // Footer
    footerTitle: 'Cyber-Physical Systems Portfolio',
    footerDescription: 'Built with Nuxt, Go, PostgreSQL, and Supabase Storage. Designed for the intersection of hardware engineering and software systems.',
    footerApiDriven: 'API-driven content',
    footerDatabaseFirst: 'Database-first',
    footerCollaboration: 'Open to collaboration',
    footerRights: 'All rights reserved.',

    // Projects page
    projectsPageTitle: 'All Projects',
    projectsPageDescription: 'Browse all published projects with search and filter.',
    projectsPageSearch: 'Search projects...',
    projectsPageAllCategories: 'All Categories',
    projectsPageShowing: 'Showing',
    projectsPageOf: 'of',
    projectsPageProjects: 'projects',

    // Project detail
    projectDetailBack: 'Back to projects',
    projectDetailCaseStudy: 'Case Study',
    projectDetailOverview: 'Overview',
    projectDetailNoDescription: 'Full project description not available yet.',
    projectDetailProblem: 'Problem',
    projectDetailSolution: 'Solution',
    projectDetailImpact: 'Impact',
    projectDetailGallery: 'Gallery',
    projectDetailMetadata: 'Metadata',
    projectDetailCategory: 'Category',
    projectDetailRole: 'Role',
    projectDetailStarted: 'Started',
    projectDetailCompleted: 'Completed',
    projectDetailTechStack: 'Tech Stack',
    projectDetailLinks: 'Links',
    projectDetailOpenDemo: 'Open Demo',
    projectDetailRepository: 'Repository',
    projectDetailDocumentation: 'Documentation',
    projectDetailNoLinks: 'External links not available yet.',
    projectDetailAllProjects: 'All Projects',
    projectDetailViewMore: 'View more engineering work',

    // Common
    commonLoading: 'Loading...',
    commonError: 'Something went wrong',
    commonRetry: 'Try again',
    commonBackToPublicSite: '← Back to public site',
  },
  id: {
    // Hero
    heroAvailable: 'Tersedia untuk kolaborasi',
    heroTitle: 'Membangun sistem backend yang handal & produk engineering berbasis data.',
    heroDescription: 'Saya merancang API, dashboard, dan aplikasi berorientasi sistem yang menjembatani engineering hardware dan software.',
    heroViewProjects: 'Lihat Project',
    heroDownloadCV: 'Unduh CV',
    heroContactMe: 'Hubungi Saya',
    heroLocation: 'Lokasi',
    heroApiDriven: 'Konten berbasis API',
    heroDatabaseFirst: 'Database-first',

    heroScrollExplore: 'Gulir ke bawah',

    // About
    aboutEyebrow: '01 / Profil',
    aboutTitle: 'Identitas Teknis',
    aboutDescription: 'Insiner multidisiplin yang bekerja di batas hardware dan software.',
    aboutBioTitle: 'Tentang Saya',
    aboutBioDefault: 'Developer yang memiliki minat pada Backend Development, Data, QA, dan pengembangan sistem berbasis teknologi.',
    aboutDomains: 'Domain',
    aboutTechnologies: 'Teknologi',
    aboutProjects: 'Project',
    aboutInfoName: 'Nama',
    aboutInfoLocation: 'Lokasi',
    aboutInfoEmail: 'Email',
    aboutInfoWebsite: 'Website',
    aboutInfoNotSpecified: 'Belum tersedia',

    // Capabilities
    capEETitle: 'Electrical Engineering',
    capEEDesc: 'Desain PCB, sistem embedded, dan integrasi hardware-software untuk aplikasi IoT dan industri.',
    capIoTTitle: 'Sistem IoT',
    capIoTDesc: 'Solusi IoT end-to-end dari akuisisi data sensor hingga dashboard cloud dan monitoring real-time.',
    capDataTitle: 'Data Science',
    capDataDesc: 'Analisis data, visualisasi, dan pengembangan pipeline untuk engineering dan business intelligence.',
    capBackendTitle: 'Backend Development',
    capBackendDesc: 'API RESTful, microservice, dan arsitektur database dengan Go, Node.js, dan PostgreSQL.',
    capMLTitle: 'Machine Learning',
    capMLDesc: 'Model prediktif, deteksi anomali, dan integrasi pipeline ML untuk sistem engineering.',
    capQATitle: 'Quality Assurance',
    capQADesc: 'Otomasi test, pipeline CI/CD, dan framework kualitas untuk pengiriman software yang handal.',

    // Projects
    projectsEyebrow: '02 / Karya Unggulan',
    projectsTitle: 'Project Unggulan',
    projectsDescription: 'Project terpilih yang menunjukkan engineering di berbagai domain.',
    projectsViewCaseStudy: 'Lihat studi kasus',
    projectsMore: 'lagi',
    projectsViewAll: 'Lihat semua project',
    projectsEmpty: 'Belum ada project tersedia.',
    projectsError: 'Gagal memuat project',

    // Experience
    experienceEyebrow: '03 / Perjalanan',
    experienceTitle: 'Pengalaman & Pendidikan',
    experienceDescription: 'Perjalanan profesional dan latar belakang akademik di bidang engineering.',
    experiencePresent: 'Sekarang',
    experienceEmpty: 'Belum ada data pengalaman tersedia.',

    // Skills
    skillsEyebrow: '04 / Tech Stack',
    skillsTitle: 'Keahlian & Teknologi',
    skillsDescription: 'Teknologi dan tools yang saya gunakan di berbagai domain.',
    skillsBackend: 'Backend',
    skillsFrontend: 'Frontend',
    skillsDatabase: 'Database',
    skillsDevOps: 'DevOps',
    skillsData: 'Data & ML',
    skillsLevelAdvanced: 'Mahir',
    skillsLevelIntermediate: 'Menengah',
    skillsLevelFamiliar: 'Kenal',
    skillsEmpty: 'Belum ada data keahlian tersedia.',

    // Achievements
    achievementsEyebrow: '06 / Pencapaian',
    achievementsTitle: 'Pencapaian & Sertifikasi',
    achievementsDescription: 'Sertifikasi profesional, penghargaan, dan pencapaian penting.',
    achievementsEmpty: 'Belum ada pencapaian tersedia.',
    achievementsViewCredential: 'Lihat kredensial',

    // Contact
    contactEyebrow: '05 / Kontak',
    contactTitle: 'Mari bangun sesuatu yang',
    contactTitleAccent: 'handal',
    contactTitleEnd: 'bersama.',
    contactDescription: 'Hubungi saya untuk kolaborasi, magang, pekerjaan freelance, atau diskusi teknis di bidang EE, IoT, Data, Backend, dan ML.',
    contactEmailMe: 'Email Saya',
    contactDownloadCV: 'Unduh CV',
    contactConnect: 'Terhubung',
    contactAvailable: 'Tersedia untuk kolaborasi',
    contactResponseTime: 'Biasanya dalam 24 jam',
    contactNoLinks: 'Tautan kontak belum tersedia.',
    contactFormTitle: 'Kirim Pesan',
    contactFormName: 'Nama',
    contactFormNamePlaceholder: 'Nama Anda',
    contactFormNameRequired: 'Nama wajib diisi.',
    contactFormEmail: 'Email',
    contactFormEmailPlaceholder: 'email@anda.com',
    contactFormEmailRequired: 'Email wajib diisi.',
    contactFormEmailInvalid: 'Masukkan alamat email yang valid.',
    contactFormSubject: 'Subjek',
    contactFormSubjectPlaceholder: 'Perihal apa?',
    contactFormOptional: 'opsional',
    contactFormMessage: 'Pesan',
    contactFormMessagePlaceholder: 'Pesan Anda...',
    contactFormMessageRequired: 'Pesan wajib diisi.',
    contactFormSubmit: 'Kirim Pesan',
    contactFormSending: 'Mengirim...',
    contactFormSuccessTitle: 'Pesan terkirim!',
    contactFormSuccessMessage: 'Terima kasih telah menghubungi. Saya akan segera membalas.',

    // Footer
    footerTitle: 'Portfolio Sistem Cyber-Physical',
    footerDescription: 'Dibangun dengan Nuxt, Go, PostgreSQL, dan Supabase Storage. Dirancang untuk persimpangan engineering hardware dan sistem software.',
    footerApiDriven: 'Konten berbasis API',
    footerDatabaseFirst: 'Database-first',
    footerCollaboration: 'Terbuka untuk kolaborasi',
    footerRights: 'Hak cipta dilindungi.',

    // Projects page
    projectsPageTitle: 'Semua Project',
    projectsPageDescription: 'Jelajahi semua project yang dipublikasikan dengan pencarian dan filter.',
    projectsPageSearch: 'Cari project...',
    projectsPageAllCategories: 'Semua Kategori',
    projectsPageShowing: 'Menampilkan',
    projectsPageOf: 'dari',
    projectsPageProjects: 'project',

    // Project detail
    projectDetailBack: 'Kembali ke project',
    projectDetailCaseStudy: 'Studi Kasus',
    projectDetailOverview: 'Ringkasan',
    projectDetailNoDescription: 'Deskripsi lengkap project belum tersedia.',
    projectDetailProblem: 'Masalah',
    projectDetailSolution: 'Solusi',
    projectDetailImpact: 'Dampak',
    projectDetailGallery: 'Galeri',
    projectDetailMetadata: 'Metadata',
    projectDetailCategory: 'Kategori',
    projectDetailRole: 'Peran',
    projectDetailStarted: 'Dimulai',
    projectDetailCompleted: 'Selesai',
    projectDetailTechStack: 'Tech Stack',
    projectDetailLinks: 'Tautan',
    projectDetailOpenDemo: 'Buka Demo',
    projectDetailRepository: 'Repository',
    projectDetailDocumentation: 'Dokumentasi',
    projectDetailNoLinks: 'Tautan eksternal belum tersedia.',
    projectDetailAllProjects: 'Semua Project',
    projectDetailViewMore: 'Lihat lebih banyak karya engineering',

    // Common
    commonLoading: 'Memuat...',
    commonError: 'Terjadi kesalahan',
    commonRetry: 'Coba lagi',
    commonBackToPublicSite: '← Kembali ke situs publik',
  },
} as const

type TranslationKey = keyof typeof translations.en

const currentLocale = ref<Locale>('en')

export function useI18n() {
  function t(key: TranslationKey): string {
    return translations[currentLocale.value][key] || translations.en[key] || key
  }

  function setLocale(locale: Locale) {
    currentLocale.value = locale
    if (import.meta.client) {
      localStorage.setItem('locale', locale)
    }
  }

  function toggleLocale() {
    setLocale(currentLocale.value === 'en' ? 'id' : 'en')
  }

  function initLocale() {
    if (import.meta.client) {
      const saved = localStorage.getItem('locale') as Locale
      if (saved && (saved === 'en' || saved === 'id')) {
        currentLocale.value = saved
      }
    }
  }

  const locale = computed(() => currentLocale.value)
  const isEnglish = computed(() => currentLocale.value === 'en')

  return {
    t,
    locale,
    isEnglish,
    setLocale,
    toggleLocale,
    initLocale,
  }
}
