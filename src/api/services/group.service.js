import apiRequest from '../api-client';

export const GroupService = {
    /**
     * Получение списка групп курсантов
     */
    getGroups: async () => {
        const data = await apiRequest({ endpoint: '/api/groups/getGroups', options: { method: "GET" } })
        return data
    },
    /**
    * Получение одной группы курсантов
    */
    getGroup: async (id) => {
        const data = await apiRequest({ endpoint: `/api/groups/getGroup/?id=${id}`, options: { method: "GET" } })
        return data
    },
    /**
     * Получение курсантов группы
     */
    getGroupStudents: async (id) => {
        const data = await apiRequest({ endpoint: `/api/groups/getGroupCadets/?id=${id}`, options: { method: "GET" } })
        return data
    },
    /**
    * Создать группу
    */
    createGroup: async ({ groupNumber, cadets }) => {
        if (!groupNumber) {
            throw new Error("Не указан номер группы");
        }
        if (cadets.length <= 0) {
            throw new Error("Курсанты не выбраны");
        }

        const data = await apiRequest({ endpoint: `/api/groups/createGroup`, body: { groupNumber, cadets }, options: { method: "POST" } })
        return data
    },
};