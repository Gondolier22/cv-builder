import Form from "@/components/form";
import { SkillsSchema, type Skills } from "../../../landing/schemas";
import { useTranslation } from "react-i18next";
import useCVStore from "@/store/cv";
import { useState, type FC, useCallback } from "react";
import Snackbar from "@/components/snackbar";
import stepInputs from "./inputs";

interface SkillsStepProps {
  onNext: () => void;
}

const Skills: FC<SkillsStepProps> = ({ onNext }) => {
  const { t } = useTranslation();
  const [showSnackbar, setShowSnackbar] = useState(false);
  const onSave = useCVStore((state) => state.updateSkills);
  // Selector optimizado para obtener solo las skills
  const skillsExperience = useCVStore((state) => state.cvData.skills) ?? [];

  const onSubmit = useCallback(
    (data: Skills) => {
      onSave([data.skill]);
      setShowSnackbar(true);
    },
    [onSave]
  );

  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          {t("cv.builder.form.skills.title")}
        </h2>
        <p className="text-gray-600">
          {t("cv.builder.form.skills.description")}
        </p>
      </div>
      <Form<Skills>
        onSubmit={onSubmit}
        schema={SkillsSchema}
        fields={stepInputs}
        btnSubmitText={t("cv.builder.form.skills.buttons.add")}
      ></Form>
      <div className="mt-6 flex justify-end">
        <button
          onClick={onNext}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
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
