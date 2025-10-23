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
    digestivos: [
        'ERGYPHILUS Confort - Probiótico para confort digestivo',
        'ERGYPHILUS INTIMA - Probiótico íntimo',
        'ERGYPHILUS PLUS - Probiótico avanzado',
        'PROBILAC PLUS - Probióticos 90 cápsulas',
        'GIANLUCA MECH GASTRICOL - Para salud gástrica',
        'ALOESAN - Aloe vera digestivo',
        'KUZUKOE STICKS - Digestivo natural',
        'KUZULOE - Bienestar digestivo'
    ],
    
    relajacion_estres: [
        'Ergycalm - Relajante físico y mental',
        'ERGYMAG - Magnesio para fatiga física y nerviosa',
        'SERENBEL - Cápsulas para la serenidad',
        'SYNER POSITIVE - Bienestar emocional',
        'HIPERIJAL - Hipérico natural'
    ],
    
    depurativos: [
        'DEPUR+ TRICONATURA - Depurativo natural',
        'ERGYEPUR NUTERGIA - Depuración hepática',
        'Gianluca Depurativo Antártico - Depuración profunda'
    ],
    
    articulaciones: [
        'ERGYSIL - Solución para articulaciones',
        'EPADOL COLAGENO MARINO - Colágeno para articulaciones y piel'
    ],
    
    energia_vitalidad: [
        'ERGYACTIV - Activador energético',
        'ERGYFOSFORYL - Fósforo y energía mental',
        'ERGYFERIL - Hierro y vitalidad',
        'BICEBE PLUS - Vitaminas del grupo B'
    ],
    
    inmunidad: [
        'SYSTEM-IM - Refuerzo inmunitario en sobres'
    ],
    
    otros: [
        'ETERNOX OMEGA 7 - Aceite de espino amarillo',
        'Saw Palmetto Vermont - Salud prostática'
    ]
},

// URLs de productos de Sabiamedicina.com
productosUrls: {
    'ERGYPHILUS Confort': 'https://sabiamedicina.com/products/ergyphilus-confort-60-capsulas',
    'ERGYPHILUS INTIMA': 'https://sabiamedicina.com/products/ergyphilus-intima',
    'ERGYPHILUS PLUS': 'https://sabiamedicina.com/products/ergyphilus-plus',
    'PROBILAC PLUS': 'https://sabiamedicina.com/products/probilac-plus-90-capsulas',
    'GASTRICOL': 'https://sabiamedicina.com/products/gianluca-mech-gastricol-500ml',
    'ALOESAN': 'https://sabiamedicina.com/products/aloesan',
    'KUZUKOE': 'https://sabiamedicina.com/products/kuzukoe-sticks-30',
    'KUZULOE': 'https://sabiamedicina.com/products/kuzuloe-500ml',
    'Ergycalm': 'https://sabiamedicina.com/products/ergycalm-relajante-fisico-y-mental-250-ml',
    'ERGYMAG': 'https://sabiamedicina.com/products/ergymag-fatiga-fisica-y-nerviosa-aporte-de-magnesio',
    'SERENBEL': 'https://sabiamedicina.com/products/serenbel',
    'SYNER POSITIVE': 'https://sabiamedicina.com/products/syner-positive',
    'HIPERIJAL': 'https://sabiamedicina.com/products/hiperijal',
    'DEPUR+': 'https://sabiamedicina.com/products/depur-500ml-triconatura',
    'ERGYEPUR': 'https://sabiamedicina.com/products/ergyepur-nutergia-250-ml',
    'Depurativo Antártico': 'https://sabiamedicina.com/products/gianluca-depurativo-antartico-500ml',
    'ERGYSIL': 'https://sabiamedicina.com/products/ergysil-solicion-articulaciones-500-ml',
    'EPADOL': 'https://sabiamedicina.com/products/epadol-colageno-marino-300g',
    'ERGYACTIV': 'https://sabiamedicina.com/products/ergyactiv',
    'ERGYFOSFORYL': 'https://sabiamedicina.com/products/ergyfosforyl-60-capsuas',
    'ERGYFERIL': 'https://sabiamedicina.com/products/ergyferil-60caps',
    'BICEBE PLUS': 'https://sabiamedicina.com/products/bicebe-plus',
    'SYSTEM-IM': 'https://sabiamedicina.com/products/sisten-im',
    'ETERNOX OMEGA 7': 'https://sabiamedicina.com/products/eternox-omega-7-aceite-de-bayas-de-espino-amarillo',
    'Saw Palmetto': 'https://sabiamedicina.com/products/saw-palmetto-vermont-supplements-90-capsulas'
    }
},

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
   generateProductsResponse(message) {
    const emoji = this.settings.useEmojis;
    let response = `${emoji ? '🌿 ' : ''}En Sabiamedicina.com tenemos productos naturales de alta calidad:\n\n`;
    
    response += `${emoji ? '💊 ' : ''}**Digestivos y Probióticos**: ERGYPHILUS Confort, ERGYPHILUS Plus, PROBILAC Plus, GASTRICOL\n`;
    response += `${emoji ? '😌 ' : ''}**Relajación y Estrés**: Ergycalm, ERGYMAG (magnesio), SERENBEL, SYNER POSITIVE\n`;
    response += `${emoji ? '✨ ' : ''}**Depurativos**: DEPUR+, ERGYEPUR, Depurativo Antártico\n`;
    response += `${emoji ? '🦴 ' : ''}**Articulaciones**: ERGYSIL, EPADOL Colágeno Marino\n`;
    response += `${emoji ? '⚡ ' : ''}**Energía**: ERGYACTIV, ERGYFOSFORYL, ERGYFERIL, BICEBE PLUS\n`;
    response += `${emoji ? '🛡️ ' : ''}**Inmunidad**: SYSTEM-IM\n\n`;
    
    response += `Todos nuestros productos son naturales y de marcas reconocidas como Nutergia y Gianluca Mech.\n\n`;
    response += `¿Hay alguna necesidad específica de salud que quieras mejorar? Puedo recomendarte los productos más adecuados para ti.`;
    
    return response;
}
    /**
     * Generate products response
     */
    generateProductsResponse(message) {
    const emoji = this.settings.useEmojis;
    let response = `${emoji ? '🌿 ' : ''}En Sabiamedicina.com tenemos productos naturales de alta calidad:\n\n`;
    
    response += `${emoji ? '💊 ' : ''}**Digestivos y Probióticos**: ERGYPHILUS Confort, ERGYPHILUS Plus, PROBILAC Plus, GASTRICOL\n`;
    response += `${emoji ? '😌 ' : ''}**Relajación y Estrés**: Ergycalm, ERGYMAG (magnesio), SERENBEL, SYNER POSITIVE\n`;
    response += `${emoji ? '✨ ' : ''}**Depurativos**: DEPUR+, ERGYEPUR, Depurativo Antártico\n`;
    response += `${emoji ? '🦴 ' : ''}**Articulaciones**: ERGYSIL, EPADOL Colágeno Marino\n`;
    response += `${emoji ? '⚡ ' : ''}**Energía**: ERGYACTIV, ERGYFOSFORYL, ERGYFERIL, BICEBE PLUS\n`;
    response += `${emoji ? '🛡️ ' : ''}**Inmunidad**: SYSTEM-IM\n\n`;
    
    response += `Todos nuestros productos son naturales y de marcas reconocidas como Nutergia y Gianluca Mech.\n\n`;
    response += `¿Hay alguna necesidad específica de salud que quieras mejorar? Puedo recomendarte los productos más adecuados.`;
    
    if (this.settings.suggestAppointments) {
        response += `\n\n${emoji ? '📅 ' : ''}También puedes agendar una consulta personalizada para un plan a tu medida.`;
    }
    
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
