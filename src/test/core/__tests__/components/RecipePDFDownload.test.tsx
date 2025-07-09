import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import RecipePDFDownload from "@/components/recipe/RecipePDFDownload";
import jsPDF from "jspdf";

const saveMock = jest.fn();
const textMock = jest.fn();
const setFontSizeMock = jest.fn().mockReturnThis();
const setTextColorMock = jest.fn().mockReturnThis();
const setDrawColorMock = jest.fn().mockReturnThis();
const rectMock = jest.fn().mockReturnThis();
const lineMock = jest.fn().mockReturnThis();
const addImageMock = jest.fn().mockReturnThis();
const addPageMock = jest.fn().mockReturnThis();
const splitTextToSizeMock = jest.fn().mockImplementation((text: string) => [text]);
const setFillColorMock = jest.fn().mockReturnThis();
const setLineWidthMock = jest.fn().mockReturnThis(); // <- ESTE ESTABA FALTANDO

jest.mock("jspdf", () => {
  return jest.fn().mockImplementation(() => ({
    save: saveMock,
    text: textMock,
    setFontSize: setFontSizeMock,
    setTextColor: setTextColorMock,
    setDrawColor: setDrawColorMock,
    rect: rectMock,
    line: lineMock,
    addImage: addImageMock,
    addPage: addPageMock,
    splitTextToSize: splitTextToSizeMock,
    setFillColor: setFillColorMock,
    setLineWidth: setLineWidthMock, // <-- clave para que no falle el código
  }));
});

describe("RecipePDFDownload component", () => {
  const sampleRecipe = {
    name: "Tarta de Manzana",
    ingredients: [
      {
        section: "Masa",
        items: [
          { quantity: "200g", description: "Harina" },
          { quantity: "100g", description: "Manteca" },
        ],
      },
    ],
    stepBlocks: [
      {
        section: "Preparación",
        steps: [
          { description: "Mezclar los ingredientes secos." },
          { description: "Agregar la manteca y amasar." },
        ],
      },
    ],
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("debe renderizar correctamente los botones", () => {
    render(<RecipePDFDownload recipe={sampleRecipe} />);

    expect(screen.getByTitle("Descargar Ingredientes")).toBeInTheDocument();
    expect(screen.getByTitle("Descargar Receta Completa")).toBeInTheDocument();
    expect(screen.getByText("Descargar:")).toBeInTheDocument();
  });

  it("debe ejecutar la función de descarga de ingredientes al hacer clic", () => {
  render(<RecipePDFDownload recipe={sampleRecipe} />);
  const downloadIngredientsButton = screen.getByTitle("Descargar Ingredientes");

  fireEvent.click(downloadIngredientsButton);

  // Verifica que la función save haya sido llamada al menos una vez
  expect(saveMock).toHaveBeenCalled();

  // Verifica que haya sido llamada con el nombre de archivo esperado
  const calledWith = saveMock.mock.calls[0][0];
  expect(calledWith).toContain("ingredientes_");
  expect(calledWith).toContain("Tarta de Manzana");
});


  it("debe ejecutar la función de descarga completa al hacer clic", () => {
    render(<RecipePDFDownload recipe={sampleRecipe} />);
    const downloadFullButton = screen.getByTitle("Descargar Receta Completa");
    fireEvent.click(downloadFullButton);

    expect(saveMock).toHaveBeenCalledWith("receta_Tarta de Manzana.pdf");
  });
});
