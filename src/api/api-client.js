const BASE_URL = process.env.NEXT_PUBLIC_FETCH_URL || '';

/**
 * Универсальная обертка над fetch
 * @param {string} endpoint - путь (например, '/login')
 * @param {object} body - данные для отправки
 * @param {object} options - дополнительные опции (method, headers и т.д.)
 */
async function apiRequest({ endpoint, body, options = {}, type = 'json' }) {
    const url = `${BASE_URL}${endpoint}`;

    const config = {
        method: 'POST', // Значение по умолчанию
        credentials: "include",
        ...options,     // Если в options есть method, он перезапишет 'POST'
        headers: {
            'Content-Type': 'application/json',
            ...options.headers,
        },
    };
    if (body) config.body = JSON.stringify(body);

    const response = await fetch(url, config);
    let result = null
    if (type === 'json') {
        result = await response.json().catch(() => ({}));
        result = result.data
    } else if (type === 'blob') {
        result = await response.blob().catch(() => ({}));
    } else {
        throw new Error(`Неверный тип запроса: ${type}. Нужен json/blob`);
    }

    if (!response.ok || (type === 'json' && result.status === 'error')) {
        // Выбрасываем ошибку, если HTTP статус плохой ИЛИ бэкенд прислал статус ошибки
        const error = new Error(result.message || `Ошибка API: ${response.status}`);
        error.errors = result.errors; // сохраняем детали ошибок от Express
        throw error;
    }

    // Возвращаем только блок data, чтобы сервисы работали с чистыми данными
    return result;
}

export default apiRequest;