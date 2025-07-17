// src/test/core/__tests__/services/vision.service.test.ts
jest.mock('@/hooks/useRecipeGeneratorSession');
jest.mock('axios');
jest.mock('@/lib/axios.config', () => ({
  apiClient: {
    post: jest.fn(),
    interceptors: {
      request: { use: jest.fn() },
      response: { use: jest.fn() },
    }
  }
}));

// 1) Mockeamos FormData antes de importar el servicio
const appendMock = jest.fn();
class MockFormData {
  append = appendMock;
}
(global as any).FormData = MockFormData;

// 2) Mock de axios (aunque no lo usás realmente en el servicio, igual lo mockeaste)
import axios from "axios";
const mockedAxios = axios as jest.Mocked<typeof axios>;

import { apiClient } from "@/lib/axios.config";
const mockedApiClient = apiClient as jest.Mocked<typeof apiClient>;

import { analyzeImagesWithAPI } from "@/services/vision.service";

describe("analyzeImagesWithAPI", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("sólo hace append de los File válidos al FormData", async () => {
    // Preparamos la resolución de la llamada HTTP
    mockedApiClient.post.mockResolvedValueOnce({ data: [] });

    const file1 = new File(["a"], "a.png", { type: "image/png" });
    const notAFile = "no-file";

    await analyzeImagesWithAPI([file1, notAFile as unknown as File]);

    expect(appendMock).toHaveBeenCalledTimes(1);
    expect(appendMock).toHaveBeenCalledWith("image", file1);

    expect(mockedApiClient.post).toHaveBeenCalledWith(
      "/ingredients/image",
      expect.any(MockFormData),
      { headers: { "Content-Type": "multipart/form-data" } }
    );
  });
});
