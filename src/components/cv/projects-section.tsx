import React from "react";
import type { Project } from "../../store/cv";

interface ProjectsSectionProps {
  projects: Project[];
}

export const ProjectsSection: React.FC<ProjectsSectionProps> = ({
  projects,
}) => {
  if (!projects || projects.length === 0) return null;

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("es-ES", {
      month: "short",
      year: "numeric",
    });
  };

  return (
    <section className="mb-8 print:mb-6 print:break-inside-avoid">
      <h2 className="text-2xl print:text-xl font-bold text-gray-900 mb-4 print:mb-3 border-b border-gray-300 pb-2 print:pb-1">
        Proyectos
      </h2>

      <div className="space-y-6 print:space-y-4">
        {projects.map((project, index) => (
          <div
            key={index}
            className="print:break-inside-avoid border-l-4 border-purple-200 pl-4 print:pl-3"
          >
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-3">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  {project.avatar && (
                    <img
                      src={project.avatar}
                      alt={`${project.name} logo`}
                      className="w-8 h-8 print:w-6 print:h-6 rounded object-cover print:hidden"
                    />
                  )}
                  <h3 className="text-lg print:text-base font-semibold text-gray-900">
                    {project.url ? (
                      <a
                        href={project.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:text-blue-800 print:text-gray-900"
                      >
                        {project.name}
                      </a>
                    ) : (
                      project.name
                    )}
                  </h3>
                </div>

                <p className="text-gray-700 text-sm print:text-xs leading-relaxed mb-3">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-3 text-sm print:text-xs">
                  {project.url && (
                    <a
                      href={project.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-800 print:text-gray-900 font-medium"
                    >
                      🔗 Demo
                    </a>
                  )}
                  {project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-800 print:text-gray-900 font-medium"
                    >
                      📦 Código
                    </a>
                  )}
                </div>
              </div>

              <div className="text-sm print:text-xs text-gray-600 font-medium sm:text-right">
                {formatDate(project.startDate)}
                {project.endDate ? ` - ${formatDate(project.endDate)}` : ""}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ProjectsSection;
