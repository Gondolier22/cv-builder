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

interface WorkExperienceStepProps {
  onNext: () => void;
}

const WorkExperience: FC<WorkExperienceStepProps> = ({ onNext }) => {
  const { t } = useTranslation();
  const [showSnackbar, setShowSnackbar] = useState(false);
  const onSave = useCVStore((state) => state.addWorkExperience);
  const workExperience = useCVStore((state) => state.cvData.work || []);

  const onSubmit = (data: WorkExperience) => {
    onSave(data);
    setShowSnackbar(true);
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          {t("cv.builder.form.work.title")}
        </h2>
        <p className="text-gray-600">{t("cv.builder.form.work.description")}</p>
      </div>
      <Form<WorkExperience>
        onSubmit={onSubmit}
        schema={WorkExperienceSchema}
        fields={stepInputs}
        btnSubmitText={t("cv.builder.form.work.buttons.add")}
      ></Form>
      <div className="mt-6 flex justify-end">
        <button
          onClick={onNext}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
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
