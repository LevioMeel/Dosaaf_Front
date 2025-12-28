import apiRequest from '../api-client';

export const GenerateService = {
    /**
     * Сгенерировать - Путевой лист 
     */
    generateWaybill: async ({ cadets, meta }) => {
        const cadetsForDoc = cadets.map((el) => {
            return {
                fioCursant: el.student_name,
            };
        });

        const data = await apiRequest({ endpoint: '/api/generate/waybills', body: { meta, cadets: cadetsForDoc }, options: { method: "POST" }, type: 'blob' })
        return data
    },
    /**
       * Сгенерировать - Путевой лист 
       */
    generateGraphUchetDrive: async ({ cadets, meta }) => {

        const cadetsForDoc = cadets.map((el, index) => {
            return {
                id: index,
                fioCursant: el.student_name,
                fioMaster: "Хайдаров Денис",
            };
        });

        const data = await apiRequest({ endpoint: '/api/generate/graphUchetDrive', body: { meta, cadets: cadetsForDoc }, options: { method: "POST" }, type: 'blob' })
        return data
    }


};