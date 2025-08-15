import { useRef } from "react";
import { useTranslation } from "react-i18next";
import { validateCVDataWithErrors } from "../utils/validate-json";
import useCVStore from "@/store/cv";
import { useNavigate } from "react-router-dom";

const useLandingController = () => {
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { loadCVData } = useCVStore();
  const { t } = useTranslation();

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type === "application/json") {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const cvData = JSON.parse(e.target?.result as string);
          const result = validateCVDataWithErrors(cvData);
          if (result.success) {
            loadCVData(cvData);
            navigate("/form");
          } else {
            console.error("Validation errors found:", result.errors);
            alert(t("cv.builder.landing.errors.invalidFormat"));
          }
        } catch (error) {
          console.error("Error al cargar el archivo JSON:", error);
          alert(t("cv.builder.landing.errors.invalidFormat"));
        }
      };
      reader.readAsText(file);
    } else {
      alert(t("cv.builder.landing.errors.selectValidJson"));
    }
  };

  const handleOpenFile = () => {
    fileInputRef.current?.click();
  };

  return {
    fileInputRef,
    handleFileUpload,
    handleOpenFile,
    t,
  };
};

export default useLandingController;
