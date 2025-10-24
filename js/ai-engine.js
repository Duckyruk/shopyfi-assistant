/**
 * AI Engine for Shopyfi Naturopathic Assistant
 * Specialized in natural products, therapies, and health guidance
 */

class ShopyfiAI {
    constructor() {
        this.settings = this.loadSettings();
        this.conversationHistory = [];
        this.knowledgeBase = this.initializeKnowledgeBase();
    }

    loadSettings() {
        const defaultSettings = {
            empathyLevel: 9,
            friendlinessLevel: 9,
            formalityLevel: 5,
            detailLevel: 7,
            showPrices: false,
            suggestAppointments: true,
            proactiveMode: true,
            useEmojis: true,
            responseSpeed: 'normal',
            greetingMessage: '¡Hola! 😊 Soy tu asistente virtual de Shopyfi. Estoy aquí para ayudarte a encontrar los mejores productos naturales para tu salud y bienestar. ¿En qué puedo ayudarte hoy?'
        };

        const saved = localStorage.getItem('shopyfi_ai_settings');
        return saved ? { ...defaultSettings, ...JSON.parse(saved) } : defaultSettings;
    }

    saveSettings(settings) {
        this.settings = { ...this.settings, ...settings };
        localStorage.setItem('shopyfi_ai_settings', JSON.stringify(this.settings));
    }

    initializeKnowledgeBase() {
        return {
            servicios: {
                naturopatia: {
                    nombre: 'Naturopatía',
                    descripcion: 'Terapia holística que utiliza métodos naturales para promover la salud y el bienestar.',
                    beneficios: ['Mejora del sistema inmunológico', 'Balance hormonal natural', 'Reducción del estrés'],
                    indicaciones: ['Problemas digestivos', 'Estrés crónico', 'Fatiga']
                },
                quantumScio: {
                    nombre: 'Quantum SCIO',
                    descripcion: 'Sistema cuántico avanzado que analiza más de 11,000 frecuencias del cuerpo.',
                    beneficios: ['Diagnóstico energético completo', 'Detección temprana', 'Terapia personalizada'],
                    indicaciones: ['Análisis preventivo', 'Estrés y ansiedad', 'Dolor crónico']
                },
                acupuntura: {
                    nombre: 'Acupuntura',
                    descripcion: 'Antigua terapia china que estimula puntos específicos del cuerpo.',
                    beneficios: ['Alivio del dolor', 'Reducción del estrés', 'Mejora del sueño'],
                    indicaciones: ['Dolor crónico', 'Migrañas', 'Ansiedad', 'Insomnio']
                },
                hipertermia: {
                    nombre: 'Hipertermia',
                    descripcion: 'Terapia con calor controlado para desintoxicar el organismo.',
                    beneficios: ['Desintoxicación profunda', 'Mejora circulación', 'Fortalecimiento inmunológico'],
                    indicaciones: ['Desintoxicación', 'Problemas circulatorios', 'Dolor muscular']
                },
                testIntolerancia: {
                    nombre: 'Test de Intolerancia Alimentaria',
                    descripcion: 'Análisis completo para identificar alimentos que causan reacciones adversas.',
                    beneficios: ['Identificación precisa', 'Plan nutricional personalizado', 'Mejora digestiva'],
                    indicaciones: ['Problemas digestivos', 'Fatiga crónica', 'Hinchazón abdominal']
                }
            }
        };
    }

    async processMessage(userMessage) {
        this.conversationHistory.push({
            role: 'user',
            content: userMessage,
            timestamp: new Date()
        });

        const response = await this.generateResponse(userMessage);

        this.conversationHistory.push({
            role: 'assistant',
            content: response,
            timestamp: new Date()
        });

        return response;
    }

    async generateResponse(userMessage) {
        const message = userMessage.toLowerCase();
        
        if (this.isGreeting(message)) {
            return this.generateGreeting();
        }

        if (this.matchesKeywords(message, ['servicio', 'terapia', 'tratamiento'])) {
            return this.generateServicesResponse();
        }

        if (this.matchesKeywords(message, ['producto', 'suplemento', 'natural'])) {
            return this.generateProductsResponse(message);
        }

        if (this.matchesKeywords(message, ['cita', 'agendar', 'reservar'])) {
            return this.generateAppointmentResponse();
        }

        return this.generateDefaultResponse(message);
    }

    isGreeting(message) {
        const greetings = ['hola', 'buenos días', 'buenas tardes', 'hey'];
        return greetings.some(greeting => message.includes(greeting));
    }

    matchesKeywords(message, keywords) {
        return keywords.some(keyword => message.includes(keyword));
    }

    generateGreeting() {
        const emojis = this.settings.useEmojis;
        return `${emojis ? '😊 ' : ''}¡Hola! Soy tu asistente virtual de Shopyfi. ¿En qué puedo ayudarte hoy?`;
    }

    generateServicesResponse() {
        const emoji = this.settings.useEmojis;
        let response = `${emoji ? '🌟 ' : ''}Ofrecemos servicios terapéuticos integrales:\n\n`;
        response += `${emoji ? '🍃 ' : ''}**Naturopatía**\n`;
        response += `${emoji ? '⚛️ ' : ''}**Quantum SCIO**\n`;
        response += `${emoji ? '💉 ' : ''}**Acupuntura**\n`;
        response += `${emoji ? '🔥 ' : ''}**Hipertermia**\n`;
        response += `${emoji ? '🧪 ' : ''}**Test de Intolerancia**\n\n`;
        return response;
    }

    generateProductsResponse(message) {
        const emoji = this.settings.useEmojis;
        
        if (typeof window !== 'undefined' && window.PRODUCTOS_SABIAMEDICINA) {
            let response = `${emoji ? '🌿 ' : ''}Contamos con una amplia gama de productos naturales:\n\n`;
            
            response += `${emoji ? '🌾 ' : ''}**Digestivos y Flora Intestinal**:\n`;
            response += `• ERGYPHILUS Confort, INTIMA y PLUS\n• PROBILAC PLUS, GASTRICOL, ALOESAN\n\n`;
            
            response += `${emoji ? '😌 ' : ''}**Relajación y Bienestar**:\n`;
            response += `• Ergycalm, ERGYMAG, SERENBEL\n• SYNER POSITIVE, HIPERIJAL\n\n`;
            
            response += `${emoji ? '✨ ' : ''}**Depuración**:\n`;
            response += `• DEPUR+, ERGYEPUR, Depurativo Antártico\n\n`;
            
            response += `${emoji ? '💪 ' : ''}**Energía**:\n`;
            response += `• ERGYACTIV, ERGYFOSFORYL, ERGYFERIL, BICEBE PLUS\n\n`;
            
            response += `${emoji ? '🛡️ ' : ''}**Inmunidad**: SYSTEM-IM\n`;
            response += `${emoji ? '🦴 ' : ''}**Articulaciones**: ERGYSIL, EPADOL\n\n`;
            
            response += `¿Qué condición específica quieres mejorar?\n`;
            
            return response;
        }
        
        let response = `${emoji ? '🌿 ' : ''}Contamos con productos naturales de alta calidad:\n\n`;
        response += `${emoji ? '💊 ' : ''}**Suplementos**\n`;
        response += `${emoji ? '🌾 ' : ''}**Digestivos**\n`;
        response += `${emoji ? '🛡️ ' : ''}**Inmunidad**\n\n`;
        return response;
    }

    generateAppointmentResponse() {
        const emoji = this.settings.useEmojis;
        return `${emoji ? '📅 ' : ''}¡Perfecto! Puedes agendar aquí:\n` +
               `[Agendar Cita](https://calendly.com/juanpedrohomeopata/citas-naturopata)`;
    }

    generateDefaultResponse(message) {
        const emoji = this.settings.useEmojis;
        return `${emoji ? '😊 ' : ''}Estoy aquí para ayudarte. ¿Qué te interesa saber?`;
    }

    clearHistory() {
        this.conversationHistory = [];
        localStorage.removeItem('shopyfi_conversation_history');
    }

    getResponseDelay() {
        const delays = { fast: 500, normal: 1000, slow: 2000 };
        return delays[this.settings.responseSpeed] || 1000;
    }
}

window.ShopyfiAI = ShopyfiAI;
