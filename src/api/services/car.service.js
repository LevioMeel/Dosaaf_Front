import apiRequest from '../api-client';

export const CarService = {
    /**
     * Получить список машин 
     */
    getCars: async () => {
        const data = await apiRequest({ endpoint: '/api/cars/getCars', options: { method: "GET" } })
        return data
    },
};