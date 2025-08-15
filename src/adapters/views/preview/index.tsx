import CVDisplay from "@/components/cv";
import usePreviewController from "./hooks/use-preview-controller";

const Preview = () => {
  const { downloadAsJsonHandler, printAsPDFHandler, goBackHandler } =
    usePreviewController();
  return (
    <section className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-4 gap-6">
      <h1 className="text-2xl font-bold print:hidden">CV Preview</h1>
      <button
        onClick={goBackHandler}
        className="print:hidden absolute top-4 left-4 bg-gray-300 text-gray-800 px-4 py-2 rounded-md cursor-pointer hover:bg-gray-400"
      >
        Volver
      </button>
      <article className="flex justify-between mb-4 gap-6 print:hidden">
        <button
          onClick={downloadAsJsonHandler}
          className="bg-blue-500 text-white px-4 py-2 rounded-md cursor-pointer hover:bg-blue-600"
        >
          Descargar como JSON
        </button>
        <button
          onClick={printAsPDFHandler}
          className="bg-blue-500 text-white px-4 py-2 rounded-md cursor-pointer hover:bg-blue-600"
        >
          Imprimir como PDF
        </button>
      </article>
      <CVDisplay />
    </section>
  );
};

export default Preview;
