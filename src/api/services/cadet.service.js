import apiRequest from '../api-client';

export const CadetService = {
    /**
    * Создать курсанта
    */
    createCadet: async (students) => {

        if (!students || students.length <= 0) {
            throw new Error("Курсанты не указаны");
        }
        const hasEmpty = students.some((st) => !st.name || !st.phone);
        if (hasEmpty) {
            throw new Error("Заполните имя и телефон для всех курсантов");
        }

        const data = await apiRequest({ endpoint: '/api/cadets/createCadet', body: students, options: { method: "POST" } })
        return data
    },
    /**
    * Получить не закрепленных за группами курсантов 
    */
    getLooseCadets: async () => {
        const data = await apiRequest({ endpoint: '/api/cadets/getLooseCadets', options: { method: "GET" } })
        return data
    },
    /**
    * Получить закрепленных за группами курсантов 
    */
    getAllCadets: async () => {
        const data = await apiRequest({ endpoint: '/api/cadets/getAllCadets', options: { method: "GET" } })
        return data
    },
    /**
    * Удалить курсанта 
    */
    deleteCadet: async (cadet) => {
        const data = await apiRequest({ endpoint: '/api/cadets/deleteCadet', body: cadet, options: { method: "POST" } })
        return data
    },
};