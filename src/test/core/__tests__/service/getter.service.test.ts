import {
  getCookingLevels,
  getAllergy,
  getPlan,
  getDiet,
  getDietaryNeed,
  getUnitTypes,
  getPreparationTimes,
  getMealTypes
} from '@/services/getter.service'; // CAMBIÁ si el path es otro
import { apiClient } from '@/lib/axios.config';

jest.mock('@/lib/axios.config', () => ({
  apiClient: {
    get: jest.fn(),
  },
}));

describe('Preferences Service', () => {
  const mockData = [{ id: 1, name: 'Mock Item' }];

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('getCookingLevels devuelve datos correctamente', async () => {
    (apiClient.get as jest.Mock).mockResolvedValueOnce({ data: mockData });
    const result = await getCookingLevels();
    expect(apiClient.get).toHaveBeenCalledWith('cook-levels');
    expect(result).toEqual(mockData);
  });

  it('getCookingLevels lanza error con mensaje custom', async () => {
    (apiClient.get as jest.Mock).mockRejectedValueOnce({ response: { data: { message: 'Error custom' } } });
    await expect(getCookingLevels()).rejects.toThrow('Error custom');
  });

  it('getAllergy devuelve datos correctamente', async () => {
    (apiClient.get as jest.Mock).mockResolvedValueOnce({ data: mockData });
    const result = await getAllergy();
    expect(apiClient.get).toHaveBeenCalledWith('allergies');
    expect(result).toEqual(mockData);
  });

  it('getAllergy lanza error con mensaje default', async () => {
    (apiClient.get as jest.Mock).mockRejectedValueOnce({});
    await expect(getAllergy()).rejects.toThrow('Error al obtener alergias');
  });

  it('getPlan devuelve datos correctamente', async () => {
    (apiClient.get as jest.Mock).mockResolvedValueOnce({ data: mockData });
    const result = await getPlan();
    expect(apiClient.get).toHaveBeenCalledWith('plans');
    expect(result).toEqual(mockData);
  });

  it('getDiet devuelve datos correctamente', async () => {
    (apiClient.get as jest.Mock).mockResolvedValueOnce({ data: mockData });
    const result = await getDiet();
    expect(apiClient.get).toHaveBeenCalledWith('diets');
    expect(result).toEqual(mockData);
  });

  it('getDietaryNeed devuelve datos correctamente', async () => {
    (apiClient.get as jest.Mock).mockResolvedValueOnce({ data: mockData });
    const result = await getDietaryNeed();
    expect(apiClient.get).toHaveBeenCalledWith('dietary-needs');
    expect(result).toEqual(mockData);
  });

  it('getUnitTypes devuelve datos correctamente', async () => {
    (apiClient.get as jest.Mock).mockResolvedValueOnce({ data: mockData });
    const result = await getUnitTypes();
    expect(apiClient.get).toHaveBeenCalledWith('units');
    expect(result).toEqual(mockData);
  });

  it('getPreparationTimes devuelve datos correctamente', async () => {
    (apiClient.get as jest.Mock).mockResolvedValueOnce({ data: mockData });
    const result = await getPreparationTimes();
    expect(apiClient.get).toHaveBeenCalledWith('preparation-times');
    expect(result).toEqual(mockData);
  });

  it('getMealTypes devuelve datos correctamente', async () => {
    (apiClient.get as jest.Mock).mockResolvedValueOnce({ data: mockData });
    const result = await getMealTypes();
    expect(apiClient.get).toHaveBeenCalledWith('meal-types');
    expect(result).toEqual(mockData);
  });
});
