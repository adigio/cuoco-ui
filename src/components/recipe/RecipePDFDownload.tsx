"use client";

import React from "react";
import jsPDF from "jspdf";

// Si ya tenés `recipe` disponible en el padre, no se define ningún tipo acá.
interface Props {
  recipe: any;
}

const logoBase64 =
  "data:image/png;base64,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";

const RecipePDFDownload: React.FC<Props> = ({ recipe }) => {
  const handleDownloadPDF = () => {
    const doc = new jsPDF();
    let y = 20;

    doc.setFillColor(255, 255, 255);
    doc.rect(0, 0, 210, 297, "F");

    doc.addImage(logoBase64, "PNG", 90, 200, 30, 15);
    doc.setFontSize(18).setTextColor(0, 0, 0);
    doc.text(recipe.name, 105, y, { align: "center" });
    y += 6;

    doc.setDrawColor(250, 128, 114).setLineWidth(1);
    doc.line(10, y, 200, y);
    y += 10;

    doc.setFontSize(14).text("Ingredientes", 105, y, { align: "center" });
    y += 8;

    recipe.ingredients.forEach((group: any) => {
      if (group.section?.trim()) {
        doc.setFontSize(12).setTextColor(100);
        doc.text(group.section, 105, y, { align: "center" });
        y += 6;
      }

      group.items.forEach((item: any) => {
        doc.setFontSize(11).setTextColor(0, 0, 0);
        const line = `${item.quantity || ""} ${item.description || ""}`;
        doc.text(line, 105, y, { align: "center" });
        y += 7;

        if (y > 280) {
          doc.addPage();
          y = 20;
        }
      });

      y += 4;
    });

    doc.setDrawColor(250, 128, 114).line(10, y, 200, y);
    doc.save(`ingredientes_${recipe.name}.pdf`);
  };

  const handleDownloadFullPDF = () => {
    const doc = new jsPDF();
    doc.setFillColor(255, 255, 255);
    doc.rect(0, 0, 210, 297, "F");

    let y = 20;
    doc.setFontSize(18).setTextColor(0, 0, 0);
    doc.text(recipe.name, 105, y, { align: "center" });
    y += 10;

    doc.setDrawColor(250, 128, 114).line(10, y, 200, y);
    y += 8;

    const pasoX = 15;
    const ingrX = 130;
    let yPaso = y;
    let yIngr = y;

    doc.setFontSize(14); 
    doc.text("Ingredientes", ingrX, yIngr);
    yPaso += 8;
    yIngr += 8;

    recipe.stepBlocks.forEach((block: any) => {
      if (block.section?.trim()) {
        doc.setFontSize(12).setTextColor(100);
        doc.text(block.section, pasoX, yPaso);
        yPaso += 7;
      }

      block.steps.forEach((step: any, i: number) => {
        doc.setFontSize(11).setTextColor(0, 0, 0);
        const lines = doc.splitTextToSize(`${i + 1}. ${step.description}`, 110);
        doc.text(lines, pasoX, yPaso);
        yPaso += lines.length * 7.5;

        if (yPaso > 280) {
          doc.addPage();
          yPaso = 20;
          yIngr = 20;
        }
      });

      yPaso += 5;
    });

    recipe.ingredients.forEach((group: any) => {
      if (group.section?.trim()) {
        doc.setFontSize(12).setTextColor(100);
        doc.text(group.section, ingrX, yIngr);
        yIngr += 7;
      }

      group.items.forEach((item: any) => {
        doc.setFontSize(11).setTextColor(0, 0, 0);
        const line = `${item.quantity || ""} ${item.description || ""}`;
        doc.text(line, ingrX, yIngr);
        yIngr += 7.5;

        if (yIngr > 280) {
          doc.addPage();
          yPaso = 20;
          yIngr = 20;
        }
      });

      yIngr += 5;
    });

    doc.addImage(logoBase64, "PNG", 90, 270, 30, 10);
    doc.save(`receta_${recipe.name}.pdf`);
  };

  return (
    <div className="flex justify-end mt-6 mr-4">
    <div className="flex items-center gap-4 mt-6">
      <h3 className="text-lg font-semibold text-gray-700">Descargar:</h3>

      <button
        onClick={handleDownloadPDF}
        className="p-2 background-color-primary text-white rounded hover:bg-blue-700"
        title="Descargar Ingredientes"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-5 h-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M8 16h8M8 12h8m-6 8h6a2 2 0 002-2v-5H6v5a2 2 0 002 2zm6-12H6a2 2 0 00-2 2v4h16V8a2 2 0 00-2-2z"
          />
        </svg>
      </button>

      <button
        onClick={handleDownloadFullPDF}
        className="p-2 background-color-primary text-white rounded hover:bg-green-700"
        title="Descargar Receta Completa"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-5 h-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 6h16M4 10h16M4 14h10m-5 4h5"
          />
        </svg>
      </button>
    </div>
    </div>
  );
};

export default RecipePDFDownload;
