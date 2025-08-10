import { BasicsSchema, type Basics } from "../../../landing/schemas";
import useCVStore from "@/store/cv";
import { useTranslation } from "react-i18next";
import Form from "@/components/form";
import StepInputs from "./inputs";

interface BasicsStepProps {
  onNext: () => void;
}

const BasicsStep = ({ onNext }: BasicsStepProps) => {
  const { t } = useTranslation();
  const initialData = useCVStore((state) => state.cvData.basics);
  const onSave = useCVStore((state) => state.updateBasics);

  const onSubmit = (data: Basics) => {
    const reader = new FileReader();
    reader.readAsDataURL(data.image as File);
    reader.onload = () => {
      onSave({ ...data, image: reader.result as string });
      onNext();
    };
  };

  console.log("Initial Data:", initialData);

  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          {t("cv.builder.form.basics.title")}
        </h2>
        <p className="text-gray-600">
          {t("cv.builder.form.basics.description")}
        </p>
      </div>

      <Form<Basics>
        onSubmit={onSubmit}
        schema={BasicsSchema}
        fields={StepInputs}
        initialData={initialData}
      ></Form>
    </div>
  );
};

export default BasicsStep;
