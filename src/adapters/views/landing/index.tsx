import { Link } from "react-router-dom";
import useLandingController from "./hooks/use-landing-controller";

const LandingPage = () => {
  const { fileInputRef, handleFileUpload, handleOpenFile, t } =
    useLandingController();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-6">
      <div className="max-w-4xl mx-auto text-center">
        {/* Título de la aplicación */}
        <h1 className="text-5xl md:text-6xl font-bold text-gray-800 mb-6">
          {t("cv.builder.landing.title")}
          <span className="text-indigo-600">
            {t("cv.builder.landing.titleSuffix")}
          </span>
        </h1>

        {/* Descripción */}
        <p className="text-xl text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed">
          {t("cv.builder.landing.description")}
        </p>

        {/* Características destacadas */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="text-3xl mb-4">📝</div>
            <h3 className="font-semibold text-gray-800 mb-2">
              {t("cv.builder.landing.features.guidedForm.title")}
            </h3>
            <p className="text-gray-600 text-sm">
              {t("cv.builder.landing.features.guidedForm.description")}
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="text-3xl mb-4">🎨</div>
            <h3 className="font-semibold text-gray-800 mb-2">
              {t("cv.builder.landing.features.preview.title")}
            </h3>
            <p className="text-gray-600 text-sm">
              {t("cv.builder.landing.features.preview.description")}
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="text-3xl mb-4">📄</div>
            <h3 className="font-semibold text-gray-800 mb-2">
              {t("cv.builder.landing.features.downloadPdf.title")}
            </h3>
            <p className="text-gray-600 text-sm">
              {t("cv.builder.landing.features.downloadPdf.description")}
            </p>
          </div>
        </div>

        {/* Botones de acción */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          {/* Botón para crear nuevo CV */}
          <Link
            to="form"
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-4 px-8 rounded-lg text-lg transition-colors duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
          >
            {t("cv.builder.landing.buttons.createNew")}
          </Link>

          {/* Botón para cargar archivo existente */}
          <button
            onClick={handleOpenFile}
            className="bg-white hover:bg-gray-50 text-indigo-600 font-semibold py-4 px-8 rounded-lg text-lg border-2 border-indigo-600 transition-colors duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
          >
            {t("cv.builder.landing.buttons.loadExisting")}
          </button>

          {/* Input file oculto */}
          <input
            ref={fileInputRef}
            type="file"
            accept=".json"
            onChange={handleFileUpload}
            className="hidden"
          />
        </div>

        {/* Nota informativa */}
        <p className="text-sm text-gray-500 mt-8">
          {t("cv.builder.landing.tip")}
        </p>
      </div>
    </div>
  );
};

export default LandingPage;
