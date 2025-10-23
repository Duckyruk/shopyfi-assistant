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

    /**
     * Load settings from localStorage or use defaults
     */
    loadSettings() {
        const defaultSettings = {
            empathyLevel: 9,
            friendlinessLevel: 9,
            formalityLevel: 5,
            detailLevel: 7,
            showPrices: false, // No mostrar precios según requisitos
            suggestAppointments: true,
            proactiveMode: true,
            useEmojis: true,
            responseSpeed: 'normal',
            greetingMessage: '¡Hola! 😊 Soy tu asistente virtual de Shopyfi. Estoy aquí para ayudarte a encontrar los mejores productos naturales para tu salud y bienestar. ¿En qué puedo ayudarte hoy?'
        };

        const saved = localStorage.getItem('shopyfi_ai_settings');
        return saved ? { ...defaultSettings, ...JSON.parse(saved) } : defaultSettings;
    }

    /**
     * Save settings to localStorage
     */
    saveSettings(settings) {
        this.settings = { ...this.settings, ...settings };
        localStorage.setItem('shopyfi_ai_settings', JSON.stringify(this.settings));
    }

    /**
     * Initialize knowledge base with products and services
     */
    initializeKnowledgeBase() {
        return {
            servicios: {
                naturopatia: {
                    nombre: 'Naturopatía',
                    descripcion: 'Terapia holística que utiliza métodos naturales para promover la salud y el bienestar. Nuestros naturopatas profesionales te guían en tu camino hacia la salud integral.',
                    beneficios: ['Mejora del sistema inmunológico', 'Balance hormonal natural', 'Reducción del estrés', 'Mejora digestiva', 'Aumento de energía vital'],
                    indicaciones: ['Problemas digestivos', 'Estrés crónico', 'Fatiga', 'Desequilibrios hormonales', 'Prevención de enfermedades']
                },
                quantumScio: {
                    nombre: 'Quantum SCIO',
                    descripcion: 'Sistema cuántico avanzado de diagnóstico y terapia bioenergética. El Quantum SCIO analiza más de 11,000 frecuencias del cuerpo para detectar desequilibrios energéticos y proporcionar terapia de reequilibrio.',
                    beneficios: ['Diagnóstico energético completo', 'Detección temprana de desequilibrios', 'Terapia de frecuencias personalizadas', 'Sin efectos secundarios', 'Mejora del bienestar general'],
                    indicaciones: ['Análisis preventivo de salud', 'Estrés y ansiedad', 'Dolor crónico', 'Alergias', 'Problemas emocionales', 'Desequilibrios energéticos']
                },
                acupuntura: {
                    nombre: 'Acupuntura',
                    descripcion: 'Antigua terapia china que estimula puntos específicos del cuerpo para restaurar el flujo de energía (Qi) y promover la curación natural.',
                    beneficios: ['Alivio del dolor sin medicamentos', 'Reducción del estrés', 'Mejora del sueño', 'Estimulación del sistema inmune', 'Balance energético'],
                    indicaciones: ['Dolor crónico', 'Migrañas', 'Ansiedad', 'Insomnio', 'Problemas digestivos', 'Adicciones']
                },
                hipertermia: {
                    nombre: 'Hipertermia',
                    descripcion: 'Terapia que utiliza calor controlado para mejorar la circulación, desintoxicar el organismo y fortalecer el sistema inmunológico.',
                    beneficios: ['Desintoxicación profunda', 'Mejora de la circulación', 'Fortalecimiento inmunológico', 'Reducción de inflamación', 'Apoyo en procesos de recuperación'],
                    indicaciones: ['Desintoxicación', 'Problemas circulatorios', 'Dolor muscular', 'Apoyo inmunológico', 'Recuperación deportiva']
                },
                testIntolerancia: {
                    nombre: 'Test de Intolerancia Alimentaria',
                    descripcion: 'Análisis completo para identificar alimentos que causan reacciones adversas en tu organismo, permitiéndote crear una dieta personalizada y saludable.',
                    beneficios: ['Identificación precisa de intolerancias', 'Plan nutricional personalizado', 'Mejora digestiva', 'Aumento de energía', 'Reducción de inflamación'],
                    indicaciones: ['Problemas digestivos recurrentes', 'Fatiga crónica', 'Problemas de piel', 'Hinchazón abdominal', 'Dolores de cabeza frecuentes']
                }
            },
            
            productos: {
                suplementos: {
                    vitaminas: ['Vitamina C natural', 'Complejo B', 'Vitamina D3', 'Omega 3', 'Multivitamínicos naturales'],
                    minerales: ['Magnesio', 'Zinc', 'Calcio natural', 'Hierro vegetal', 'Selenio'],
                    plantas: ['Equinácea', 'Ginseng', 'Cúrcuma', 'Jengibre', 'Valeriana', 'Pasiflora']
                },
                digestivos: {
                    probioticos: ['Probióticos avanzados', 'Flora intestinal', 'Enzimas digestivas'],
                    fibra: ['Psyllium', 'Fibra de acacia', 'Semillas de chía'],
                    hierbas: ['Manzanilla', 'Hinojo', 'Menta piperita', 'Regaliz']
                },
                inmunidad: {
                    defensas: ['Própolis', 'Jalea real', 'Equinácea', 'Astrágalo'],
                    antioxidantes: ['Resveratrol', 'Coenzima Q10', 'Té verde', 'Açaí']
                },
                estres: {
                    adaptogenos: ['Ashwagandha', 'Rhodiola', 'Ginseng siberiano'],
                    relajantes: ['Valeriana', 'Pasiflora', 'Melisa', 'Magnesio']
                },
                desintoxicacion: {
                    depurativos: ['Cardo mariano', 'Diente de león', 'Alcachofa', 'Chlorella'],
                    antioxidantes: ['Glutatión', 'NAC', 'Ácido alfa-lipoico']
                }
            },

            condiciones: {
                'estrés': {
                    productos: ['Ashwagandha', 'Rhodiola', 'Magnesio', 'Complejo B', 'Valeriana'],
                    servicios: ['acupuntura', 'naturopatia', 'quantumScio'],
                    consejo: 'El estrés crónico puede afectar tu salud de múltiples formas. Te recomiendo combinar suplementos adaptógenos con terapias como la acupuntura para resultados óptimos.'
                },
                'digestión': {
                    productos: ['Probióticos', 'Enzimas digestivas', 'Manzanilla', 'Jengibre', 'Hinojo'],
                    servicios: ['naturopatia', 'testIntolerancia'],
                    consejo: 'Los problemas digestivos pueden estar relacionados con intolerancias alimentarias. Un test de intolerancia puede revelarnos información valiosa.'
                },
                'inmunidad': {
                    productos: ['Vitamina C', 'Zinc', 'Própolis', 'Equinácea', 'Vitamina D3'],
                    servicios: ['naturopatia', 'quantumScio'],
                    consejo: 'Fortalecer tu sistema inmunológico es fundamental. La combinación de suplementos naturales con terapia Quantum SCIO puede optimizar tus defensas.'
                },
                'dolor': {
                    productos: ['Cúrcuma', 'Omega 3', 'MSM', 'Boswellia'],
                    servicios: ['acupuntura', 'hipertermia', 'naturopatia'],
                    consejo: 'El dolor crónico responde muy bien a la acupuntura. Muchos pacientes experimentan alivio significativo sin necesidad de medicamentos.'
                },
                'fatiga': {
                    productos: ['Ginseng', 'Coenzima Q10', 'Complejo B', 'Hierro vegetal', 'Magnesio'],
                    servicios: ['naturopatia', 'quantumScio', 'testIntolerancia'],
                    consejo: 'La fatiga puede tener múltiples causas. Un análisis con Quantum SCIO puede ayudarnos a identificar desequilibrios energéticos específicos.'
                },
                'ansiedad': {
                    productos: ['Pasiflora', 'Magnesio', 'Ashwagandha', 'L-teanina', 'Omega 3'],
                    servicios: ['acupuntura', 'naturopatia', 'quantumScio'],
                    consejo: 'La ansiedad responde muy bien a tratamientos naturales. La acupuntura combinada con suplementos puede brindarte alivio sin efectos secundarios.'
                },
                'insomnio': {
                    productos: ['Melatonina', 'Valeriana', 'Magnesio', 'L-triptófano', 'Pasiflora'],
                    servicios: ['acupuntura', 'naturopatia'],
                    consejo: 'Un buen descanso es fundamental para tu salud. La acupuntura tiene excelentes resultados en problemas de sueño.'
                },
                'desintoxicación': {
                    productos: ['Cardo mariano', 'Chlorella', 'Diente de león', 'Glutatión', 'Alcachofa'],
                    servicios: ['hipertermia', 'naturopatia'],
                    consejo: 'La desintoxicación es esencial para mantener la salud. La hipertermia es especialmente efectiva para eliminar toxinas del organismo.'
                }
            }
        };
    }

    /**
     * Main function to process user messages
     */
    async processMessage(userMessage) {
        // Add to conversation history
        this.conversationHistory.push({
            role: 'user',
            content: userMessage,
            timestamp: new Date()
        });

        // Analyze message intent and generate response
        const response = await this.generateResponse(userMessage);

        // Add to conversation history
        this.conversationHistory.push({
            role: 'assistant',
            content: response,
            timestamp: new Date()
        });

        return response;
    }

    /**
     * Generate intelligent response based on user message
     */
    async generateResponse(userMessage) {
        const message = userMessage.toLowerCase();
        
        // Check for greetings
        if (this.isGreeting(message)) {
            return this.generateGreeting();
        }

        // Check for service inquiries
        if (this.matchesKeywords(message, ['servicio', 'terapia', 'tratamiento', 'qué hacen', 'qué ofrecen'])) {
            return this.generateServicesResponse();
        }

        // Check for product inquiries
        if (this.matchesKeywords(message, ['producto', 'suplemento', 'natural', 'vitamina', 'hierba'])) {
            return this.generateProductsResponse(message);
        }

        // Check for specific services
        if (this.matchesKeywords(message, ['quantum', 'scio', 'cuántico'])) {
            return this.generateQuantumScioResponse();
        }

        if (this.matchesKeywords(message, ['acupuntura', 'agujas', 'puntos'])) {
            return this.generateAcupunctureResponse();
        }

        if (this.matchesKeywords(message, ['hipertermia', 'calor', 'temperatura'])) {
            return this.generateHyperthermiaResponse();
        }

        if (this.matchesKeywords(message, ['test', 'intolerancia', 'alergia', 'alimento'])) {
            return this.generateIntoleranceTestResponse();
        }

        if (this.matchesKeywords(message, ['naturopatía', 'naturopata', 'natural'])) {
            return this.generateNaturopathyResponse();
        }

        // Check for health conditions
        const condition = this.identifyCondition(message);
        if (condition) {
            return this.generateConditionResponse(condition);
        }

        // Check for appointment inquiries
        if (this.matchesKeywords(message, ['cita', 'agendar', 'reservar', 'consulta', 'hora'])) {
            return this.generateAppointmentResponse();
        }

        // Check for price inquiries
        if (this.matchesKeywords(message, ['precio', 'costo', 'cuánto', 'vale', 'pagar'])) {
            return this.generatePriceResponse();
        }

        // Default helpful response
        return this.generateDefaultResponse(message);
    }

    /**
     * Check if message is a greeting
     */
    isGreeting(message) {
        const greetings = ['hola', 'buenos días', 'buenas tardes', 'buenas noches', 'hey', 'saludos'];
        return greetings.some(greeting => message.includes(greeting));
    }

    /**
     * Check if message matches any keywords
     */
    matchesKeywords(message, keywords) {
        return keywords.some(keyword => message.includes(keyword));
    }

    /**
     * Identify health condition from message
     */
    identifyCondition(message) {
        for (const condition in this.knowledgeBase.condiciones) {
            if (message.includes(condition)) {
                return condition;
            }
        }
        return null;
    }

    /**
     * Generate personalized greeting
     */
    generateGreeting() {
        const emojis = this.settings.useEmojis;
        const greetings = [
            `${emojis ? '😊 ' : ''}¡Hola! Soy tu asistente virtual de Shopyfi. Me especializo en salud natural y terapias holísticas. ¿En qué puedo ayudarte hoy?`,
            `${emojis ? '🌿 ' : ''}¡Bienvenido/a! Estoy aquí para orientarte sobre nuestros productos naturales y servicios terapéuticos. ¿Qué te gustaría saber?`,
            `${emojis ? '✨ ' : ''}¡Qué alegría saludarte! Puedo ayudarte a encontrar los mejores productos naturales para tu salud. ¿En qué estás interesado/a?`
        ];
        
        return greetings[Math.floor(Math.random() * greetings.length)];
    }

    /**
     * Generate services overview response
     */
    generateServicesResponse() {
        const emoji = this.settings.useEmojis;
        let response = `${emoji ? '🌟 ' : ''}¡Excelente pregunta! En Shopyfi ofrecemos servicios terapéuticos integrales:\n\n`;
        
        response += `${emoji ? '🍃 ' : ''}**Naturopatía**: Terapia holística que utiliza métodos naturales para promover tu salud integral.\n\n`;
        response += `${emoji ? '⚛️ ' : ''}**Quantum SCIO**: Sistema cuántico avanzado que analiza más de 11,000 frecuencias del cuerpo para detectar y equilibrar energéticamente.\n\n`;
        response += `${emoji ? '💉 ' : ''}**Acupuntura**: Antigua terapia china para aliviar dolor, reducir estrés y restaurar el balance energético.\n\n`;
        response += `${emoji ? '🔥 ' : ''}**Hipertermia**: Terapia con calor controlado para desintoxicar y fortalecer el sistema inmunológico.\n\n`;
        response += `${emoji ? '🧪 ' : ''}**Test de Intolerancia Alimentaria**: Análisis completo para identificar alimentos que afectan tu bienestar.\n\n`;
        
        if (this.settings.suggestAppointments) {
            response += `${emoji ? '📅 ' : ''}¿Te gustaría agendar una cita para conocer mejor cómo podemos ayudarte?`;
        }
        
        return response;
    }

    /**
     * Generate products response
     */
    generateProductsResponse(message) {
        const emoji = this.settings.useEmojis;
        let response = `${emoji ? '🌿 ' : ''}Contamos con una amplia gama de productos naturales de alta calidad:\n\n`;
        
        response += `${emoji ? '💊 ' : ''}**Suplementos**: Vitaminas, minerales y extractos de plantas medicinales\n`;
        response += `${emoji ? '🌾 ' : ''}**Digestivos**: Probióticos, enzimas y hierbas para la salud intestinal\n`;
        response += `${emoji ? '🛡️ ' : ''}**Inmunidad**: Própolis, equinácea y antioxidantes naturales\n`;
        response += `${emoji ? '😌 ' : ''}**Estrés y Relajación**: Adaptógenos y plantas calmantes\n`;
        response += `${emoji ? '✨ ' : ''}**Desintoxicación**: Depurativos hepáticos y antioxidantes\n\n`;
        
        response += `Todos nuestros productos son naturales, sin aditivos químicos y de origen sostenible.\n\n`;
        response += `¿Hay alguna condición de salud específica que quieras mejorar? Puedo recomendarte los productos más adecuados para ti.`;
        
        return response;
    }

    /**
     * Generate Quantum SCIO response
     */
    generateQuantumScioResponse() {
        const emoji = this.settings.useEmojis;
        const service = this.knowledgeBase.servicios.quantumScio;
        
        let response = `${emoji ? '⚛️ ' : ''}**${service.nombre}**\n\n`;
        response += `${service.descripcion}\n\n`;
        response += `${emoji ? '✅ ' : ''}**Beneficios:**\n`;
        service.beneficios.forEach(b => response += `• ${b}\n`);
        response += `\n${emoji ? '👤 ' : ''}**Ideal para:**\n`;
        service.indicaciones.forEach(i => response += `• ${i}\n`);
        
        if (this.settings.suggestAppointments) {
            response += `\n${emoji ? '📅 ' : ''}¿Te gustaría agendar una sesión de Quantum SCIO? Es una experiencia única que puede revelarte información valiosa sobre tu salud.`;
        }
        
        return response;
    }

    /**
     * Generate Acupuncture response
     */
    generateAcupunctureResponse() {
        const emoji = this.settings.useEmojis;
        const service = this.knowledgeBase.servicios.acupuntura;
        
        let response = `${emoji ? '💉 ' : ''}**${service.nombre}**\n\n`;
        response += `${service.descripcion}\n\n`;
        response += `${emoji ? '✅ ' : ''}**Beneficios:**\n`;
        service.beneficios.forEach(b => response += `• ${b}\n`);
        response += `\n${emoji ? '👤 ' : ''}**Especialmente efectiva para:**\n`;
        service.indicaciones.forEach(i => response += `• ${i}\n`);
        
        if (this.settings.suggestAppointments) {
            response += `\n${emoji ? '📅 ' : ''}Nuestros acupuntores profesionales están listos para ayudarte. ¿Te gustaría agendar una sesión?`;
        }
        
        return response;
    }

    /**
     * Generate Hyperthermia response
     */
    generateHyperthermiaResponse() {
        const emoji = this.settings.useEmojis;
        const service = this.knowledgeBase.servicios.hipertermia;
        
        let response = `${emoji ? '🔥 ' : ''}**${service.nombre}**\n\n`;
        response += `${service.descripcion}\n\n`;
        response += `${emoji ? '✅ ' : ''}**Beneficios:**\n`;
        service.beneficios.forEach(b => response += `• ${b}\n`);
        response += `\n${emoji ? '👤 ' : ''}**Recomendada para:**\n`;
        service.indicaciones.forEach(i => response += `• ${i}\n`);
        
        if (this.settings.suggestAppointments) {
            response += `\n${emoji ? '📅 ' : ''}¿Quieres experimentar los beneficios de la hipertermia? Puedo ayudarte a agendar tu primera sesión.`;
        }
        
        return response;
    }

    /**
     * Generate Intolerance Test response
     */
    generateIntoleranceTestResponse() {
        const emoji = this.settings.useEmojis;
        const service = this.knowledgeBase.servicios.testIntolerancia;
        
        let response = `${emoji ? '🧪 ' : ''}**${service.nombre}**\n\n`;
        response += `${service.descripcion}\n\n`;
        response += `${emoji ? '✅ ' : ''}**Beneficios:**\n`;
        service.beneficios.forEach(b => response += `• ${b}\n`);
        response += `\n${emoji ? '🔍 ' : ''}**Síntomas que indican necesidad de este test:**\n`;
        service.indicaciones.forEach(i => response += `• ${i}\n`);
        
        if (this.settings.suggestAppointments) {
            response += `\n${emoji ? '📅 ' : ''}Este test puede cambiar tu vida al identificar qué alimentos te están afectando. ¿Te gustaría agendarlo?`;
        }
        
        return response;
    }

    /**
     * Generate Naturopathy response
     */
    generateNaturopathyResponse() {
        const emoji = this.settings.useEmojis;
        const service = this.knowledgeBase.servicios.naturopatia;
        
        let response = `${emoji ? '🍃 ' : ''}**${service.nombre}**\n\n`;
        response += `${service.descripcion}\n\n`;
        response += `${emoji ? '✅ ' : ''}**Beneficios:**\n`;
        service.beneficios.forEach(b => response += `• ${b}\n`);
        response += `\n${emoji ? '👤 ' : ''}**Ayuda con:**\n`;
        service.indicaciones.forEach(i => response += `• ${i}\n`);
        
        if (this.settings.suggestAppointments) {
            response += `\n${emoji ? '📅 ' : ''}Como naturopatas profesionales, podemos crear un plan personalizado para tu salud. ¿Quieres una consulta?`;
        }
        
        return response;
    }

    /**
     * Generate condition-specific response
     */
    generateConditionResponse(condition) {
        const emoji = this.settings.useEmojis;
        const info = this.knowledgeBase.condiciones[condition];
        
        let response = `${emoji ? '💚 ' : ''}Entiendo que estás buscando ayuda con ${condition}. ${info.consejo}\n\n`;
        
        response += `${emoji ? '🌿 ' : ''}**Productos naturales recomendados:**\n`;
        info.productos.slice(0, 5).forEach(p => response += `• ${p}\n`);
        
        response += `\n${emoji ? '✨ ' : ''}**Servicios terapéuticos que pueden ayudarte:**\n`;
        info.servicios.forEach(s => {
            const servicio = this.knowledgeBase.servicios[s];
            response += `• ${servicio.nombre}\n`;
        });
        
        if (this.settings.suggestAppointments) {
            response += `\n${emoji ? '📅 ' : ''}¿Te gustaría agendar una consulta para crear un plan personalizado? Puedo ayudarte a coordinarlo.`;
        }
        
        return response;
    }

    /**
     * Generate appointment response
     */
    generateAppointmentResponse() {
        const emoji = this.settings.useEmojis;
        return `${emoji ? '📅 ' : ''}¡Perfecto! Agendar una cita es muy sencillo.\n\n` +
               `${emoji ? '👉 ' : ''}Puedes hacerlo directamente aquí: [Agendar Cita](https://calendly.com/juanpedrohomeopata/citas-naturopata)\n\n` +
               `${emoji ? '💚 ' : ''}También puedes hacer clic en el botón "Agendar Cita" en la parte superior de la página.\n\n` +
               `Nuestro naturopata Juan Pedro estará encantado de atenderte y crear un plan personalizado para tu salud.`;
    }

    /**
     * Generate price response (without showing prices as per requirements)
     */
    generatePriceResponse() {
        const emoji = this.settings.useEmojis;
        return `${emoji ? '💚 ' : ''}Gracias por tu interés. Para información detallada sobre precios y planes personalizados, te invito a agendar una consulta gratuita donde podremos evaluar tus necesidades específicas.\n\n` +
               `${emoji ? '📅 ' : ''}¿Te gustaría agendar una cita? Puedo ayudarte a coordinarla.`;
    }

    /**
     * Generate default helpful response
     */
    generateDefaultResponse(message) {
        const emoji = this.settings.useEmojis;
        const responses = [
            `${emoji ? '😊 ' : ''}Entiendo tu consulta. Me especializo en productos naturales y terapias holísticas. ¿Podrías decirme más sobre qué necesitas para tu salud?`,
            `${emoji ? '🌿 ' : ''}Estoy aquí para ayudarte. Puedo orientarte sobre productos naturales, nuestros servicios terapéuticos o ayudarte a agendar una cita. ¿Qué te interesa?`,
            `${emoji ? '💚 ' : ''}Gracias por tu mensaje. Para darte la mejor recomendación, ¿podrías contarme qué aspecto de tu salud te gustaría mejorar?`
        ];
        
        return responses[Math.floor(Math.random() * responses.length)];
    }

    /**
     * Clear conversation history
     */
    clearHistory() {
        this.conversationHistory = [];
        localStorage.removeItem('shopyfi_conversation_history');
    }

    /**
     * Get response speed delay
     */
    getResponseDelay() {
        const delays = {
            fast: 500,
            normal: 1000,
            slow: 2000
        };
        return delays[this.settings.responseSpeed] || 1000;
    }
}

// Export for use in main.js
window.ShopyfiAI = ShopyfiAI;
