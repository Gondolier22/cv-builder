import Form from "@/components/form";
import { ProjectSchema, type Project } from "../../../landing/schemas";
import { useTranslation } from "react-i18next";
import useCVStore from "@/store/cv";
import { useState, type FC } from "react";
import Snackbar from "@/components/snackbar";
import stepInputs from "./inputs";
import Table from "../table";

interface ProjectsStepProps {
  onNext: () => void;
}

const Projects: FC<ProjectsStepProps> = ({ onNext }) => {
  const { t } = useTranslation();
  const [showSnackbar, setShowSnackbar] = useState(false);
  const onSave = useCVStore((state) => state.addProject);
  const deleteProject = useCVStore((state) => state.removeProject);
  const projectsExperience = useCVStore((state) => state.cvData.projects || []);

  const onSubmit = (data: Project) => {
    onSave(data);
    setShowSnackbar(true);
  };

  return (
    <div className="mx-auto p-6">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          {t("cv.builder.form.projects.title")}
        </h2>
        <p className="text-gray-600">
          {t("cv.builder.form.projects.description")}
        </p>
      </div>

      {/* Diseño responsivo mejorado */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Formulario - toma 1 columna en XL, full width en pantallas menores */}
        <div className="xl:col-span-1">
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <h3 className="text-lg font-semibold mb-4 text-gray-800">
              {t("cv.builder.form.projects.form.title", "Agregar Proyecto")}
            </h3>
            <Form<Project>
              onSubmit={onSubmit}
              schema={ProjectSchema}
              fields={stepInputs}
              btnSubmitText={t("cv.builder.form.projects.buttons.add")}
            />
          </div>
        </div>

        {/* Tabla - toma 2 columnas en XL, full width en pantallas menores */}
        <div className="xl:col-span-2">
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-800">
                {t(
                  "cv.builder.form.projects.table.title",
                  "Proyectos Agregados"
                )}
              </h3>
              <span className="text-sm text-gray-500">
                {projectsExperience.length}{" "}
                {projectsExperience.length === 1 ? "entrada" : "entradas"}
              </span>
            </div>
            {projectsExperience.length > 0 ? (
              <Table data={projectsExperience} onDelete={deleteProject} />
            ) : (
              <div className="text-center py-8 text-gray-500">
                <p>
                  {t(
                    "cv.builder.form.projects.table.empty",
                    "No hay proyectos agregados aún"
                  )}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="mt-8 flex justify-end">
        <button
          onClick={onNext}
          className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
          disabled={projectsExperience.length === 0}
        >
          {t("cv.builder.form.projects.buttons.next")}
        </button>
      </div>

      {showSnackbar && (
        <Snackbar
          message={t("cv.builder.form.projects.messages.successAdded")}
          onClose={() => setShowSnackbar(false)}
        />
      )}
    </div>
  );
};

export default Projects;
