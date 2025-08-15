import Form from "@/components/form";
import {
  WorkExperienceSchema,
  type WorkExperience,
} from "../../../landing/schemas";
import { useTranslation } from "react-i18next";
import useCVStore from "@/store/cv";
import { useState, type FC } from "react";
import Snackbar from "@/components/snackbar";
import stepInputs from "./inputs";
import Table from "../table";

interface WorkExperienceStepProps {
  onNext: () => void;
}

const WorkExperience: FC<WorkExperienceStepProps> = ({ onNext }) => {
  const { t } = useTranslation();
  const [showSnackbar, setShowSnackbar] = useState(false);
  const onSave = useCVStore((state) => state.addWorkExperience);
  const deleteExperience = useCVStore((state) => state.removeWorkExperience);
  const workExperience = useCVStore((state) => state.cvData.work || []);

  const onSubmit = (data: WorkExperience) => {
    onSave(data);
    setShowSnackbar(true);
  };

  return (
    <div className="mx-auto p-6">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          {t("cv.builder.form.work.title")}
        </h2>
        <p className="text-gray-600">{t("cv.builder.form.work.description")}</p>
      </div>

      {/* Diseño responsivo mejorado */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Formulario - toma 1 columna en XL, full width en pantallas menores */}
        <div className="xl:col-span-1">
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <h3 className="text-lg font-semibold mb-4 text-gray-800">
              {t("cv.builder.form.work.form.title", "Agregar Experiencia")}
            </h3>
            <Form<WorkExperience>
              onSubmit={onSubmit}
              schema={WorkExperienceSchema}
              fields={stepInputs}
              btnSubmitText={t("cv.builder.form.work.buttons.add")}
            />
          </div>
        </div>

        {/* Tabla - toma 2 columnas en XL, full width en pantallas menores */}
        <div className="xl:col-span-2">
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-800">
                {t(
                  "cv.builder.form.work.table.title",
                  "Experiencias Agregadas"
                )}
              </h3>
              <span className="text-sm text-gray-500">
                {workExperience.length}{" "}
                {workExperience.length === 1 ? "entrada" : "entradas"}
              </span>
            </div>
            {workExperience.length > 0 ? (
              <Table data={workExperience} onDelete={deleteExperience} />
            ) : (
              <div className="text-center py-8 text-gray-500">
                <p>
                  {t(
                    "cv.builder.form.work.table.empty",
                    "No hay experiencias agregadas aún"
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
          disabled={workExperience.length === 0}
        >
          {t("cv.builder.form.work.buttons.next")}
        </button>
      </div>

      {showSnackbar && (
        <Snackbar
          message={t("cv.builder.form.work.messages.successAdded")}
          onClose={() => setShowSnackbar(false)}
        />
      )}
    </div>
  );
};

export default WorkExperience;
