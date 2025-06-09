import axios from "axios";
import { analyzeImagesWithAPI } from "@/services/vision.service";

jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe("analyzeImagesWithAPI", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("sólo hace append de los File válidos al FormData", async () => {
    const appendSpy = jest.spyOn(FormData.prototype, "append");
    mockedAxios.post.mockResolvedValueOnce({ data: [] });

    const file1 = new File(["a"], "a.png", { type: "image/png" });
    const notAFile = "no-file";

    // <-- aquí forzamos el array a File[] aunque contenga un string
    await analyzeImagesWithAPI([file1, notAFile as unknown as File]);

    // Sólo file1 pasa el instanceof File
    expect(appendSpy).toHaveBeenCalledTimes(1);
    expect(appendSpy).toHaveBeenCalledWith("images", file1);

    expect(mockedAxios.post).toHaveBeenCalledWith(
      "/api/analyze-images",
      expect.any(FormData),
      { headers: { "Content-Type": "multipart/form-data" } }
    );
  });
});
