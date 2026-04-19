export function parseGeminiJsonResponse(rawText: string): { response: string }[] {
    try {
        // Buscamos el JSON válido dentro del texto, en caso de que venga envuelto
        const match = rawText.match(/\[\s*{[\s\S]*?}\s*\]/);

        if (!match) {
            throw new Error('No se encontró un JSON válido en el texto proporcionado.');
        }

        const jsonString = match[0];
        const parsed = JSON.parse(jsonString);

        if (!Array.isArray(parsed)) {
            throw new Error('El contenido parseado no es un array.');
        }

        return parsed;
    } catch (err) {
        console.error('Error al parsear JSON:', err);
        return [];
    }
}