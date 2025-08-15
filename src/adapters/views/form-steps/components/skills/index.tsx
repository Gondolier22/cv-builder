import Form from "@/components/form";
import { SkillsSchema, type Skills } from "../../../landing/schemas";
import { useTranslation } from "react-i18next";
import useCVStore from "@/store/cv";
import { useState, type FC, useCallback, useMemo } from "react";
import Snackbar from "@/components/snackbar";
import stepInputs from "./inputs";

interface SkillsStepProps {
  onNext: () => void;
}

const Skills: FC<SkillsStepProps> = ({ onNext }) => {
  const { t } = useTranslation();
  const [showSnackbar, setShowSnackbar] = useState(false);
  const onSave = useCVStore((state) => state.addSkill);
  const removeSkill = useCVStore((state) => state.removeSkill);
  // Selector optimizado para obtener solo las skills
  const skills = useCVStore((state) => state.cvData.skills);
  const skillsExperience = useMemo(() => skills ?? [], [skills]);

  const onSubmit = useCallback(
    (data: Skills) => {
      // Verificar si la skill ya existe para evitar duplicados
      if (!skillsExperience.includes(data.skill)) {
        onSave(data.skill);
        setShowSnackbar(true);
      }
    },
    [onSave, skillsExperience]
  );

  const handleRemoveSkill = useCallback(
    (index: number) => {
      removeSkill(index);
    },
    [removeSkill]
  );

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          {t("cv.builder.form.skills.title")}
        </h2>
        <p className="text-gray-600">
          {t("cv.builder.form.skills.description")}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Formulario */}
        <div className="space-y-6">
          <Form<Skills>
            onSubmit={onSubmit}
            schema={SkillsSchema}
            fields={stepInputs}
            btnSubmitText={t("cv.builder.form.skills.buttons.add")}
          />
        </div>

        {/* Lista de Skills como Chips */}
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Habilidades Añadidas ({skillsExperience.length})
            </h3>

            {skillsExperience.length > 0 ? (
              <div className="flex flex-wrap gap-2">
                {skillsExperience.map((skill, index) => (
                  <div
                    key={index}
                    className="inline-flex items-center gap-2 px-3 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-medium border border-blue-200 hover:bg-blue-200 transition-colors"
                  >
                    <span>{skill}</span>
                    <button
                      onClick={() => handleRemoveSkill(index)}
                      className="ml-1 inline-flex items-center justify-center w-5 h-5 rounded-full bg-blue-200 hover:bg-red-200 hover:text-red-600 transition-colors"
                      title={`Eliminar ${skill}`}
                      aria-label={`Eliminar habilidad ${skill}`}
                    >
                      <svg
                        width="12"
                        height="12"
                        viewBox="0 0 12 12"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M9 3L3 9M3 3L9 9"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500 bg-gray-50 rounded-lg border-2 border-dashed border-gray-200">
                <svg
                  className="mx-auto h-12 w-12 text-gray-400 mb-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                  />
                </svg>
                <p className="text-sm">No hay habilidades añadidas aún.</p>
                <p className="text-xs mt-1">
                  Usa el formulario para añadir tus primeras habilidades.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="mt-8 flex justify-end">
        <button
          onClick={onNext}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
          disabled={skillsExperience.length === 0}
        >
          {t("cv.builder.form.skills.buttons.next")}
        </button>
      </div>

      {showSnackbar && (
        <Snackbar
          message={t("cv.builder.form.skills.messages.successAdded")}
          onClose={() => setShowSnackbar(false)}
        />
      )}
    </div>
  );
};

export default Skills;
