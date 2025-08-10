import Form from "@/components/form";
import { EducationSchema, type Education } from "../../../landing/schemas";
import { useTranslation } from "react-i18next";
import useCVStore from "@/store/cv";
import { useState, type FC } from "react";
import Snackbar from "@/components/snackbar";
import stepInputs from "./inputs";

interface EducationStepProps {
  onNext: () => void;
}

const Education: FC<EducationStepProps> = ({ onNext }) => {
  const { t } = useTranslation();
  const [showSnackbar, setShowSnackbar] = useState(false);
  const onSave = useCVStore((state) => state.addEducation);
  const educationExperience = useCVStore(
    (state) => state.cvData.education || []
  );

  const onSubmit = (data: Education) => {
    onSave(data);
    setShowSnackbar(true);
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          {t("cv.builder.form.education.title")}
        </h2>
        <p className="text-gray-600">
          {t("cv.builder.form.education.description")}
        </p>
      </div>
      <Form<Education>
        onSubmit={onSubmit}
        schema={EducationSchema}
        fields={stepInputs}
        btnSubmitText={t("cv.builder.form.education.buttons.add")}
      ></Form>
      <div className="mt-6 flex justify-end">
        <button
          onClick={onNext}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          disabled={educationExperience.length === 0}
        >
          {t("cv.builder.form.education.buttons.next")}
        </button>
      </div>
      {showSnackbar && (
        <Snackbar
          message={t("cv.builder.form.education.messages.successAdded")}
          onClose={() => setShowSnackbar(false)}
        />
      )}
    </div>
  );
};

export default Education;
