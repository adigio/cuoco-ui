// src/test/core/__tests__/services/vision.service.test.ts

// 1) Mockeamos FormData antes de importar el servicio
const appendMock = jest.fn();
class MockFormData {
  append = appendMock;
}
;(global as any).FormData = MockFormData;

// 2) Mock de axios
import axios from "axios";
import { analyzeImagesWithAPI } from "@/services/vision.service";
jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe("analyzeImagesWithAPI", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("sólo hace append de los File válidos al FormData", async () => {
    // Preparamos la resolución de la llamada HTTP
    mockedAxios.post.mockResolvedValueOnce({ data: [] });

    const file1 = new File(["a"], "a.png", { type: "image/png" });
    const notAFile = "no-file";

    // Llamamos con un array que forzamos a File[]
    await analyzeImagesWithAPI([file1, notAFile as unknown as File]);

    // Sólo file1 debería haber sido appended
    expect(appendMock).toHaveBeenCalledTimes(1);
    expect(appendMock).toHaveBeenCalledWith("images", file1);

    // La llamada a axios.post debe usar nuestro MockFormData
    expect(mockedAxios.post).toHaveBeenCalledWith(
      "/api/analyze-images",
      expect.any(MockFormData),
      { headers: { "Content-Type": "multipart/form-data" } }
    );
  });
});
