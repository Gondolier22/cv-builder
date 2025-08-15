# CV Builder Pro 📝

Una aplicación web moderna y completa para crear currículums vitae profesionales de forma rápida, sencilla e intuitiva. Construida con React, TypeScript y Tailwind CSS.

## 🎯 Propósito del Proyecto

CV Builder Pro es una herramienta que permite a los usuarios crear, editar y exportar currículums profesionales sin complicaciones. La aplicación ofrece:

- **Formulario guiado paso a paso** para completar toda la información profesional
- **Vista previa en tiempo real** del CV mientras se edita
- **Exportación a PDF** con diseño profesional optimizado para impresión
- **Carga de CV existentes** en formato JSON para edición
- **Interfaz multiidioma** (Español e Inglés)
- **Diseño responsive** que funciona en cualquier dispositivo

## 🚀 Características Principales

### ✨ Funcionalidades Core

- **Editor de CV por pasos**: Proceso guiado para completar información básica, experiencia laboral, educación, proyectos, habilidades e idiomas
- **Vista previa instantánea**: Visualización en tiempo real del CV mientras se edita
- **Exportación PDF**: Generación de CV en formato PDF profesional
- **Importación JSON**: Carga de CV existentes para edición
- **Validación de formularios**: Validación robusta con Zod y React Hook Form
- **Persistencia de datos**: Almacenamiento automático del progreso con Zustand

### 🎨 Experiencia de Usuario

- **Interfaz moderna**: Diseño limpio y profesional con Tailwind CSS
- **Responsive design**: Optimizado para desktop, tablet y móvil
- **Internacionalización**: Soporte para múltiples idiomas (i18next)
- **Animaciones fluidas**: Transiciones suaves y elementos interactivos
- **Navegación intuitiva**: Flujo de trabajo claro y fácil de seguir

## 🛠️ Tecnologías Utilizadas

### Frontend

- **React 19** - Biblioteca principal de UI con las últimas características
- **TypeScript** - Tipado estático para mayor robustez del código
- **Vite** - Herramienta de construcción rápida y moderna
- **Tailwind CSS 4** - Framework de CSS utility-first
- **React Router Dom 7** - Enrutamiento del lado del cliente

### Gestión de Estado y Formularios

- **Zustand** - Gestión de estado ligera y eficiente
- **React Hook Form** - Manejo de formularios performante
- **Zod** - Validación de esquemas TypeScript-first
- **@hookform/resolvers** - Integración entre React Hook Form y Zod

### UI y Experiencia

- **React Icons** - Biblioteca de iconos vectoriales
- **@tanstack/react-table** - Tablas potentes y flexibles
- **classnames** - Utilidad para manejar clases CSS condicionalmente
- **React Helmet Async** - Gestión del head del documento

### Internacionalización

- **i18next** - Framework de internacionalización
- **react-i18next** - Bindings de React para i18next

### Desarrollo y Testing

- **ESLint** - Linter para mantener calidad del código
- **Vitest** - Framework de testing rápido
- **@testing-library/react** - Utilidades para testing de componentes
- **Jest** - Framework de testing adicional

## 📁 Estructura del Proyecto

```text
cv-builder/
├── public/                    # Archivos estáticos
│   ├── favicon.ico
│   ├── logo.webp
│   └── vite.svg
├── src/
│   ├── adapters/             # Capa de adaptadores (Router, Views)
│   │   ├── router.tsx        # Configuración de rutas
│   │   └── views/            # Vistas principales
│   │       ├── landing/      # Página de inicio
│   │       ├── form-steps/   # Formulario paso a paso
│   │       └── preview/      # Vista previa del CV
│   ├── assets/               # Recursos estáticos
│   │   └── cv.json          # Ejemplo de CV en JSON
│   ├── components/           # Componentes reutilizables
│   │   ├── cv/              # Componentes específicos del CV
│   │   └── form/            # Componentes de formularios
│   ├── layouts/             # Layouts de la aplicación
│   │   └── main/            # Layout principal con header/footer
│   ├── libs/                # Librerías y configuraciones
│   │   └── i18n/            # Configuración de internacionalización
│   ├── store/               # Gestión de estado global
│   │   └── cv.ts            # Store del CV con Zustand
│   ├── main.tsx             # Punto de entrada de la aplicación
│   └── index.css            # Estilos globales
├── package.json             # Dependencias y scripts
├── vite.config.ts          # Configuración de Vite
├── tsconfig.json           # Configuración de TypeScript
└── tailwind.config.js      # Configuración de Tailwind CSS
```

### 🏗️ Arquitectura por Capas

El proyecto sigue una arquitectura limpia organizada en capas:

1. **Adapters**: Capa de entrada (Router, Views, Controllers)
2. **Components**: Componentes de UI reutilizables
3. **Layouts**: Estructuras de layout de la aplicación
4. **Store**: Gestión de estado global
5. **Libs**: Configuraciones y utilidades externas

## 📖 Flujo de la Aplicación

### 1. Página de Inicio (Landing)

- Presentación de la aplicación y sus características
- Opciones para crear un nuevo CV o cargar uno existente
- Carga de archivos JSON con validación

### 2. Formulario por Pasos

- **Paso 1**: Información básica (nombre, contacto, resumen)
- **Paso 2**: Experiencia laboral
- **Paso 3**: Proyectos personales/profesionales
- **Paso 4**: Educación y formación académica
- **Paso 5**: Cursos y certificaciones
- **Paso 6**: Habilidades técnicas
- **Paso 7**: Idiomas y nivel de competencia

### 3. Vista Previa

- Visualización del CV completo
- Opción de descarga en PDF
- Posibilidad de volver a editar

## 🚀 Instalación y Uso

### Prerrequisitos

- Node.js (versión 18 o superior)
- npm o yarn

### Instalación

```bash
# Clonar el repositorio
git clone https://github.com/tu-usuario/cv-builder.git

# Entrar al directorio
cd cv-builder

# Instalar dependencias
npm install
```

### Scripts Disponibles

```bash
# Desarrollo
npm run dev          # Inicia el servidor de desarrollo

# Construcción
npm run build        # Construye la aplicación para producción

# Linting
npm run lint         # Ejecuta ESLint para revisar el código

# Vista previa
npm run preview      # Previsualiza la construcción de producción
```

## 🌐 Características Técnicas

### Performance

- **Lazy loading**: Carga de componentes bajo demanda
- **Code splitting**: Separación automática del código
- **Optimización de bundle**: Configuración optimizada de Vite

### Accesibilidad

- **Semántica HTML**: Estructura HTML semánticamente correcta
- **Navegación por teclado**: Soporte completo para navegación con teclado
- **ARIA labels**: Etiquetas ARIA apropiadas

### Mantenibilidad

- **TypeScript**: Tipado fuerte para prevenir errores
- **ESLint**: Configuración estricta para mantener calidad del código
- **Estructura modular**: Organización clara y escalable

## 🤝 Contribución

Las contribuciones son bienvenidas. Para contribuir:

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.

## 📧 Contacto

Para preguntas o sugerencias, puedes abrir un issue en el repositorio o contactar al equipo de desarrollo.
