// Use a document ready function to ensure the DOM is fully loaded before running the script
$(document).ready(function() {

    // ====================
    // DOM Element Selectors
    // ====================
    const chatMessages = $('#chatMessages');
    const chatInput = $('#chatInput');
    const sendBtn = $('#sendBtn');
    const historyBtn = $('#historyBtn');
    const historyModal = $('#historyModal');
    const historyCloseBtn = $('#historyClose');
    const historyList = $('#historyList');
    const navLinks = $('.nav-link, .sidebar-item, .feature-btn');
    const faqItems = $('.faq-item');
    const whatsappBtn = $('#whatsappBtn');
    const emergencyCallBtn = $('#emergencyCallBtn');
    const locateHospitalBtn = $('#locateHospitalBtn');
    const emergencyStatus = $('#emergency-status');
    const contentSections = $('.content-section');
    const datetimeDisplay = $('#datetime');
    const languageSelector = $('#language');
    const voiceBtn = $('#voiceBtn');

    // ====================
    // Global Variables
    // ====================
    const CHAT_HISTORY_KEY = 'healthBuddyChatHistory';
    let currentChatSession = [];
    let isRecording = false;
    let recognition;

    // ====================
    // Language Translation Data
    // ====================
    const translations = {
        en: {
            'Health Buddy': 'Health Buddy',
            'Empowering Health for Everyone': 'Empowering Health for Everyone',
            'Chat': 'Chat',
            'Features': 'Features',
            'About': 'About',
            'FAQ': 'FAQ',
            'Contact': 'Contact',
            'Quick Access': 'Quick Access',
            'De-Stress': 'De-Stress',
            'Symptom Check': 'Symptom Check',
            'Find Doctor': 'Find Doctor',
            'SOS Emergency': 'SOS Emergency',
            'Accessibility': 'Accessibility',
            'Font Size': 'Font Size',
            'Small': 'Small',
            'Medium': 'Medium',
            'Large': 'Large',
            'Language': 'Language',
            'Chat on WhatsApp': 'Chat on WhatsApp',
            'Chat with Health Buddy': 'Chat with Health Buddy',
            'Online': 'Online',
            'History': 'History',
            'InitialGreeting': "Hello! I'm Health Buddy, your friendly AI health assistant. How can I help you today? 😊",
            'Type your message here...': 'Type your message here...',
            'FeaturesDescription': 'Discover a range of powerful features designed to simplify and improve your health journey.',
            'De-Stress Now': 'De-Stress Now',
            'DestressFeatureDesc': 'Instant stress relief with breathing exercises, meditation guides, and calming music recommendations.',
            'Learn More': 'Learn More',
            'Emergency Help': 'Emergency Help',
            'EmergencyFeatureDesc': 'Secure emergency assistance with location-based alerts to hospitals and emergency services.',
            'SymptomFeatureDesc': 'Get an intelligent analysis and personalized advice based on your symptoms.',
            'Start Check': 'Start Check',
            'FindDoctorFeatureDesc': 'Discover qualified healthcare professionals nearby, tailored to your specific needs.',
            'Find Doctors': 'Find Doctors',
            'DestressDescription': 'Find peace and calm with guided exercises and soothing sounds.',
            'Guided Meditation': 'Guided Meditation',
            'MeditationDesc': 'Listen to a 10-minute guided meditation to center your mind.',
            'Start Session': 'Start Session',
            'Calming Sounds': 'Calming Sounds',
            'SoundsDesc': 'Relax with ambient music and nature sounds, like rain or waves.',
            'Play Sounds': 'Play Sounds',
            'Breathing Exercises': 'Breathing Exercises',
            'BreathingDesc': 'Follow a visual guide for effective stress-reducing breaths.',
            'Begin Exercise': 'Begin Exercise',
            'SymptomCheckerDesc': 'Enter your symptoms and get an intelligent analysis.',
            'DescribeSymptoms': 'Describe your symptoms in detail:',
            'SymptomPlaceholder': "e.g., 'Headache, fever, and sore throat'",
            'Check Symptoms': 'Check Symptoms',
            'FindDoctorDesc': 'Find qualified healthcare professionals nearby based on your needs.',
            'Specialty': 'Specialty',
            'Any': 'Any',
            'Dermatologist': 'Dermatologist',
            'Cardiologist': 'Cardiologist',
            'Pediatrician': 'Pediatrician',
            'General Practitioner': 'General Practitioner',
            'Location': 'Location',
            'LocationPlaceholder': 'Your city or postal code',
            'Search for Doctors': 'Search for Doctors',
            'EmergencyDesc': 'In case of a medical emergency, use this feature to get immediate help.',
            'Call Emergency Services': 'Call Emergency Services',
            'Locate Nearest Hospital': 'Locate Nearest Hospital',
            'About Health Buddy': 'About Health Buddy',
            'AboutDescription': 'Health Buddy is your friendly AI-powered health companion, designed to help everyone—from busy professionals to families and elders—get quick, reliable health support. Chat or speak naturally with Health Buddy to:',
            'AboutFeature1Title': 'Relieve stress with custom exercises and music',
            'AboutFeature1Desc': 'Personalized breathing exercises, meditation guides, and calming music recommendations to help you manage stress effectively.',
            'AboutFeature2Title': 'Check symptoms with intelligent Q&A and get personalized advice',
            'AboutFeature2Desc': 'Advanced symptom checker that provides intelligent analysis and personalized health guidance based on your specific concerns.',
            'AboutFeature3Title': 'Find recommended doctors nearby, tailored to your health needs',
            'AboutFeature3Desc': 'Discover qualified healthcare professionals in your area, matched to your specific health requirements and preferences.',
            'AboutFeature4Title': 'Access one-tap, secure emergency SOS help when it matters',
            'AboutFeature4Desc': 'Instant emergency assistance with automatic location sharing to nearby hospitals and emergency services for critical situations.',
            'AboutHighlight': 'Seamless, simple, and always at your service—on the web or WhatsApp. Health Buddy cares for your wellbeing, 24/7! ✨',
            'Frequently Asked Questions': 'Frequently Asked Questions',
            'FAQ1Title': 'What is Health Buddy?',
            'FAQ1Answer': 'Health Buddy is an AI-powered health assistant designed to provide quick, reliable health information and support. It can help you check symptoms, find doctors, access de-stress exercises, and more.',
            'FAQ2Title': 'Is Health Buddy a substitute for a real doctor?',
            'FAQ2Answer': 'No, Health Buddy is not a substitute for professional medical advice, diagnosis, or treatment. It is an informational tool only. Always seek the advice of your physician or other qualified health provider with any questions you may have regarding a medical condition.',
            'FAQ3Title': 'How does the chat history work?',
            'FAQ3Answer': 'The chat history feature stores your conversations in your browser\'s local storage. This allows you to view and revisit your past chats during your current session. The history is deleted when you close the browser or clear your cache.',
            'Contact Us': 'Contact Us',
            'ContactDescription': 'If you have any questions or feedback, feel free to reach out to us!',
            'Email Us': 'Email Us',
            'Call Us': 'Call Us',
            'WhatsApp': 'WhatsApp',
            'SendMessage': 'Send a Message',
            'Your Name': 'Your Name',
            'Your Email': 'Your Email',
            'Your Message': 'Your Message',
            'Chat History': 'Chat History',
            'CreatedForExhibition': 'Created for Your Exhibition Name',
            'Privacy': 'Privacy',
            'Terms of Service': 'Terms of Service',
            'Potential Cause': 'Potential Cause',
            'Recommended Actions': 'Recommended Actions',
            'Disclaimer': 'Disclaimer',
            'BotResponse': "Thank you for your message. I'm currently processing your request. Please hold on a moment.",
            'SymptomAnalysis': 'Analyzing your symptoms... This may take a moment.',
            'NoSymptomInput': 'Please enter at least one symptom.',
            'SymptomResultTitle': 'Based on symptoms like <strong>${symptoms}</strong>, you might have a common cold or a viral infection.',
            'SymptomResultAction1': 'Get plenty of rest and stay hydrated.',
            'SymptomResultAction2': 'Consider over-the-counter pain relievers.',
            'SymptomResultAction3': 'If symptoms worsen or persist for more than 5 days, consult a doctor.',
            'SymptomDisclaimer': 'This is not a substitute for professional medical advice. Please consult a healthcare provider for an accurate diagnosis.',
            'NoLocationInput': 'Please enter a location to search.',
            'SearchingDoctors': 'Searching for doctors near you...',
            'NoDoctorsFound': 'No doctors found for your search criteria.',
            'Address': 'Address',
            'Rating': 'Rating',
            'Book Appointment': 'Book Appointment',
            'EmergencyConnecting': 'Connecting to emergency services... Please hold.',
            'EmergencyCallInitiated': 'Call initiated. Your location has been shared.',
            'FindingLocation': 'Finding your location...',
            'LocationFound': 'Location found. Opening Google Maps...',
            'LocationError': 'Unable to retrieve location. Please check your browser settings.',
            'GeolocationNotSupported': 'Geolocation is not supported by your browser.',
            'WhatsAppUnavailable': 'WhatsApp functionality is currently unavailable.',
            'MicActivated': 'Microphone activated. Start speaking...',
            'RecordingStopped': 'Recording stopped.',
            'NoChatHistory': 'No chat history found.'
        },
        hi: {
            'Health Buddy': 'हेल्थ बडी',
            'Empowering Health for Everyone': 'सभी के लिए स्वास्थ्य को सशक्त बनाना',
            'Chat': 'चैट करें',
            'Features': 'विशेषताएं',
            'About': 'हमारे बारे में',
            'FAQ': 'अक्सर पूछे जाने वाले प्रश्न',
            'Contact': 'संपर्क करें',
            'Quick Access': 'त्वरित पहुंच',
            'De-Stress': 'तनाव से मुक्ति',
            'Symptom Check': 'लक्षण जांच',
            'Find Doctor': 'डॉक्टर ढूंढें',
            'SOS Emergency': 'एसओएस आपातकाल',
            'Accessibility': 'पहुँच',
            'Font Size': 'फ़ॉन्ट आकार',
            'Small': 'छोटा',
            'Medium': 'मध्यम',
            'Large': 'बड़ा',
            'Language': 'भाषा',
            'Chat on WhatsApp': 'व्हाट्सएप पर चैट करें',
            'Chat with Health Buddy': 'हेल्थ बडी से चैट करें',
            'Online': 'ऑनलाइन',
            'History': 'इतिहास',
            'InitialGreeting': "नमस्ते! मैं हेल्थ बडी हूँ, आपका मित्रवत एआई स्वास्थ्य सहायक। मैं आज आपकी क्या मदद कर सकता हूँ? 😊",
            'Type your message here...': 'यहां अपना संदेश लिखें...',
            'FeaturesDescription': 'अपनी स्वास्थ्य यात्रा को सरल और बेहतर बनाने के लिए डिज़ाइन की गई शक्तिशाली सुविधाओं की एक श्रृंखला खोजें।',
            'De-Stress Now': 'तनाव से मुक्ति पाएं',
            'DestressFeatureDesc': 'श्वास अभ्यास, ध्यान मार्गदर्शिका, और शांत संगीत के सुझावों के साथ तुरंत तनाव से राहत पाएं।',
            'Learn More': 'और जानें',
            'Emergency Help': 'आपातकालीन सहायता',
            'EmergencyFeatureDesc': 'अस्पतािल और आपातकालीन सेवाओं के लिए स्थान-आधारित अलर्ट के साथ आपातकालीन सहायता सुरक्षित करें।',
            'SymptomFeatureDesc': 'अपने लक्षणों के आधार पर एक बुद्धिमान विश्लेषण और व्यक्तिगत सलाह प्राप्त करें।',
            'Start Check': 'जांच शुरू करें',
            'FindDoctorFeatureDesc': 'अपनी विशिष्ट आवश्यकताओं के अनुसार आस-पास योग्य स्वास्थ्य पेशेवरों को खोजें।',
            'Find Doctors': 'डॉक्टर खोजें',
            'DestressDescription': 'निर्देशित अभ्यासों और सुखदायक ध्वनियों के साथ शांति और सुकून पाएं।',
            'Guided Meditation': 'निर्देशित ध्यान',
            'MeditationDesc': 'अपने मन को शांत करने के लिए 10 मिनट का निर्देशित ध्यान सुनें।',
            'Start Session': 'सत्र शुरू करें',
            'Calming Sounds': 'शांत करने वाली ध्वनियाँ',
            'SoundsDesc': 'शांत संगीत और प्रकृति की ध्वनियों, जैसे बारिश या लहरों के साथ आराम करें।',
            'Play Sounds': 'ध्वनियाँ चलाएं',
            'Breathing Exercises': 'श्वास अभ्यास',
            'BreathingDesc': 'तनाव कम करने वाली प्रभावी साँसों के लिए एक दृश्य मार्गदर्शिका का पालन करें।',
            'Begin Exercise': 'अभ्यास शुरू करें',
            'SymptomCheckerDesc': 'अपने लक्षण दर्ज करें और एक बुद्धिमान विश्लेषण प्राप्त करें।',
            'DescribeSymptoms': 'अपने लक्षण विस्तार से बताएं:',
            'SymptomPlaceholder': "उदा. 'सिरदर्द, बुखार, और गले में खराश'",
            'Check Symptoms': 'लक्षण जांचें',
            'FindDoctorDesc': 'अपनी ज़रूरतों के अनुसार आस-पास योग्य स्वास्थ्य पेशेवरों को ढूंढें।',
            'Specialty': 'विशेषज्ञता',
            'Any': 'कोई भी',
            'Dermatologist': 'त्वचा विशेषज्ञ',
            'Cardiologist': 'हृदय रोग विशेषज्ञ',
            'Pediatrician': 'शिशु रोग विशेषज्ञ',
            'General Practitioner': 'सामान्य चिकित्सक',
            'Location': 'स्थान',
            'LocationPlaceholder': 'आपका शहर या पिन कोड',
            'Search for Doctors': 'डॉक्टरों को खोजें',
            'EmergencyDesc': 'चिकित्सा आपातकाल की स्थिति में, तत्काल सहायता प्राप्त करने के लिए इस सुविधा का उपयोग करें।',
            'Call Emergency Services': 'आपातकालीन सेवाओं को कॉल करें',
            'Locate Nearest Hospital': 'निकटतम अस्पताल का पता लगाएं',
            'About Health Buddy': 'हेल्थ बडी के बारे में',
            'AboutDescription': 'हेल्थ बडी आपका मित्रवत एआई-संचालित स्वास्थ्य साथी है, जिसे व्यस्त पेशेवरों से लेकर परिवारों और बुजुर्गों तक, सभी को त्वरित, विश्वसनीय स्वास्थ्य सहायता प्रदान करने के लिए डिज़ाइन किया गया है। हेल्थ बडी के साथ स्वाभाविक रूप से चैट करें या बात करें:',
            'AboutFeature1Title': 'कस्टम अभ्यासों और संगीत से तनाव कम करें',
            'AboutFeature1Desc': 'तनाव को प्रभावी ढंग से प्रबंधित करने में आपकी मदद करने के लिए व्यक्तिगत श्वास अभ्यास, ध्यान मार्गदर्शिकाएं और शांत संगीत के सुझाव।',
            'AboutFeature2Title': 'बुद्धिमान प्रश्नोत्तर के साथ लक्षणों की जांच करें और व्यक्तिगत सलाह पाएं',
            'AboutFeature2Desc': 'उन्नत लक्षण जांचकर्ता जो आपकी विशिष्ट चिंताओं के आधार पर बुद्धिमान विश्लेषण और व्यक्तिगत स्वास्थ्य मार्गदर्शन प्रदान करता है।',
            'AboutFeature3Title': 'अपनी स्वास्थ्य आवश्यकताओं के अनुसार आस-पास के अनुशंसित डॉक्टरों को ढूंढें',
            'AboutFeature3Desc': 'अपने क्षेत्र में योग्य स्वास्थ्य पेशेवरों को खोजें, जो आपकी विशिष्ट स्वास्थ्य आवश्यकताओं और प्राथमिकताओं से मेल खाते हों।',
            'AboutFeature4Title': 'जब आवश्यकता हो, एक-टैप, सुरक्षित आपातकालीन एसओएस सहायता प्राप्त करें',
            'AboutFeature4Desc': 'महत्वपूर्ण स्थितियों के लिए पास के अस्पतालों और आपातकालीन सेवाओं के साथ स्वचालित स्थान साझाकरण के साथ तत्काल आपातकालीन सहायता।',
            'AboutHighlight': 'वेब या व्हाट्सएप पर, निर्बाध, सरल और हमेशा आपकी सेवा में। हेल्थ बडी आपके स्वास्थ्य का ख्याल रखता है, 24/7! ✨',
            'Frequently Asked Questions': 'अक्सर पूछे जाने वाले प्रश्न',
            'FAQ1Title': 'हेल्थ बडी क्या है?',
            'FAQ1Answer': 'हेल्थ बडी एक एआई-संचालित स्वास्थ्य सहायक है जिसे त्वरित, विश्वसनीय स्वास्थ्य जानकारी और सहायता प्रदान करने के लिए डिज़ाइन किया गया है। यह आपको लक्षणों की जांच करने, डॉक्टरों को ढूंढने, तनाव-मुक्त करने वाले अभ्यासों तक पहुंचने और बहुत कुछ में मदद कर सकता है।',
            'FAQ2Title': 'क्या हेल्थ बडी एक वास्तविक डॉक्टर का विकल्प है?',
            'FAQ2Answer': 'नहीं, हेल्थ बडी पेशेवर चिकित्सा सलाह, निदान, या उपचार का विकल्प नहीं है। यह केवल एक सूचनात्मक उपकरण है। किसी भी चिकित्सा स्थिति के संबंध में आपके पास कोई भी प्रश्न हो तो हमेशा अपने चिकित्सक या अन्य योग्य स्वास्थ्य प्रदाता से सलाह लें।',
            'FAQ3Title': 'चैट इतिहास कैसे काम करता है?',
            'FAQ3Answer': 'चैट इतिहास सुविधा आपके ब्राउज़र के स्थानीय भंडारण में आपकी बातचीत को संग्रहीत करती है। यह आपको अपने वर्तमान सत्र के दौरान अपनी पिछली चैट देखने और फिर से देखने की अनुमति देता है। जब आप ब्राउज़र बंद करते हैं या अपना कैश साफ़ करते हैं तो इतिहास हटा दिया जाता है।',
            'Contact Us': 'हमसे संपर्क करें',
            'ContactDescription': 'यदि आपके कोई प्रश्न या प्रतिक्रिया है, तो बेझिझक हमसे संपर्क करें!',
            'Email Us': 'हमें ईमेल करें',
            'Call Us': 'हमें कॉल करें',
            'WhatsApp': 'व्हाट्सएप',
            'SendMessage': 'एक संदेश भेजें',
            'Your Name': 'आपका नाम',
            'Your Email': 'आपका ईमेल',
            'Your Message': 'आपका संदेश',
            'Chat History': 'चैट इतिहास',
            'CreatedForExhibition': 'आपके प्रदर्शनी के लिए बनाया गया',
            'Privacy': 'गोपनीयता',
            'Terms of Service': 'सेवा की शर्तें',
            'Potential Cause': 'संभावित कारण',
            'Recommended Actions': 'अनुशंसित क्रियाएँ',
            'Disclaimer': 'अस्वीकरण',
            'BotResponse': "आपके संदेश के लिए धन्यवाद। मैं वर्तमान में आपके अनुरोध को संसाधित कर रहा हूँ। कृपया एक क्षण प्रतीक्षा करें।",
            'SymptomAnalysis': 'आपके लक्षणों का विश्लेषण हो रहा है... इसमें थोड़ा समय लग सकता है।',
            'NoSymptomInput': 'कृपया कम से कम एक लक्षण दर्ज करें।',
            'SymptomResultTitle': '<strong>${symptoms}</strong> जैसे लक्षणों के आधार पर, आपको सामान्य सर्दी या वायरल संक्रमण हो सकता है।',
            'SymptomResultAction1': 'खूब आराम करें और हाइड्रेटेड रहें।',
            'SymptomResultAction2': 'ओवर-द-काउंटर दर्द निवारक पर विचार करें।',
            'SymptomResultAction3': 'यदि लक्षण बिगड़ते हैं या 5 दिनों से अधिक समय तक बने रहते हैं, तो डॉक्टर से सलाह लें।',
            'SymptomDisclaimer': 'यह पेशेवर चिकित्सा सलाह का विकल्प नहीं है। सटीक निदान के लिए कृपया स्वास्थ्य सेवा प्रदाता से परामर्श लें।',
            'NoLocationInput': 'खोजने के लिए कृपया एक स्थान दर्ज करें।',
            'SearchingDoctors': 'आपके पास डॉक्टरों की खोज की जा रही है...',
            'NoDoctorsFound': 'आपके खोज मानदंड के लिए कोई डॉक्टर नहीं मिला।',
            'Address': 'पता',
            'Rating': 'रेटिंग',
            'Book Appointment': 'अपॉइंटमेंट बुक करें',
            'EmergencyConnecting': 'आपातकालीन सेवाओं से कनेक्ट हो रहा है... कृपया प्रतीक्षा करें।',
            'EmergencyCallInitiated': 'कॉल शुरू हो गया है। आपका स्थान साझा कर दिया गया है।',
            'FindingLocation': 'आपका स्थान खोजा जा रहा है...',
            'LocationFound': 'स्थान मिल गया है। गूगल मैप्स खुल रहा है...',
            'LocationError': 'स्थान प्राप्त करने में असमर्थ। कृपया अपनी ब्राउज़र सेटिंग्स जांचें।',
            'GeolocationNotSupported': 'आपके ब्राउज़र द्वारा जियोलोकेशन समर्थित नहीं है।',
            'WhatsAppUnavailable': 'व्हाट्सएप कार्यक्षमता वर्तमान में अनुपलब्ध है।',
            'MicActivated': 'माइक्रोफ़ोन सक्रिय हो गया है। बोलना शुरू करें...',
            'RecordingStopped': 'रिकॉर्डिंग बंद हो गई।',
            'NoChatHistory': 'कोई चैट इतिहास नहीं मिला।'
        }
    };

    // ====================
    // Initialization
    // ====================
    loadChatSession();
    updateDateTime();
    setInterval(updateDateTime, 1000);
    // Initialize speech recognition if supported
    if ('webkitSpeechRecognition' in window) {
        recognition = new webkitSpeechRecognition();
        recognition.continuous = false;
        recognition.lang = 'en-US';
        recognition.interimResults = false;
    } else {
        voiceBtn.hide();
    }
    // Set initial language
    const initialLang = languageSelector.val();
    translateWebsite(initialLang);
    // Ensure the chat section is visible on page load
    $('#chatSection').show();

    // ====================
    // Event Listeners
    // ====================
    sendBtn.on('click', handleSendMessage);
    chatInput.on('keypress', function(e) {
        if (e.which === 13) {
            e.preventDefault();
            handleSendMessage();
        }
    });
    historyBtn.on('click', showHistoryModal);
    historyCloseBtn.on('click', hideHistoryModal);
    navLinks.on('click', handleNavigation);
    faqItems.on('click', handleFaqToggle);
    whatsappBtn.on('click', handleWhatsappPlaceholder);
    emergencyCallBtn.on('click', handleEmergencyCall);
    locateHospitalBtn.on('click', handleLocateHospital);
    languageSelector.on('change', function() {
        const lang = $(this).val();
        translateWebsite(lang);
    });
    $('#symptomsSection .check-symptoms-btn').on('click', checkSymptoms);
    $('#doctorsSection .find-doctors-btn').on('click', findDoctors);
    $('#fontSize').on('change', function() {
        const size = $(this).val();
        $('body').css('font-size', size === 'small' ? '14px' : size === 'medium' ? '16px' : '18px');
    });
    voiceBtn.on('click', toggleSpeechRecognition);
    // Modal close on backdrop click
    historyModal.on('click', function(e) {
        if ($(e.target).is(historyModal)) {
            hideHistoryModal();
        }
    });

    // ====================
    // Chat Functionality
    // ====================

    /**
     * Handles sending a user's message.
     * Displays the message, saves it, and fetches a response from the backend.
     */
    function handleSendMessage() {
        const message = chatInput.val().trim();
        if (message === '') return;

        addMessage('user', message);
        chatInput.val('');

        // Show a loading indicator while waiting for the response
        const loadingHtml = `
            <div class="chat-message assistant loading">
                <div class="message-bubble">
                    <span class="dot"></span><span class="dot"></span><span class="dot"></span>
                </div>
            </div>
        `;
        chatMessages.append(loadingHtml);
        chatMessages.scrollTop(chatMessages[0].scrollHeight);

        // Send the conversation history to the backend
        fetch('http://127.0.0.1:5000/chat', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                messages: currentChatSession
            })
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok: ' + response.statusText);
            }
            return response.json();
        })
        .then(data => {
            // Remove the loading indicator
            $('.chat-message.loading').remove();

            if (data.error) {
                addMessage('assistant', 'Error: ' + data.error);
            } else {
                addMessage('assistant', data.reply);
            }
        })
        .catch(error => {
            console.error('Error:', error);
            // Remove the loading indicator
            $('.chat-message.loading').remove();
            addMessage('assistant', 'Sorry, there was an error processing your request. Please try again.');
        });
    }

    /**
     * Adds a message to the chat display and updates the session history.
     * @param {string} role - 'user' or 'assistant' to determine styling.
     * @param {string} content - The message text.
     * @param {boolean} addToHistory - Whether to save to currentChatSession (default: true).
     */
    function addMessage(role, content, addToHistory = true) {
        const messageHtml = `
            <div class="chat-message ${role}">
                <div class="message-bubble">
                    ${content}
                </div>
            </div>
        `;
        chatMessages.append(messageHtml);
        chatMessages.scrollTop(chatMessages[0].scrollHeight);
        if (addToHistory) {
            currentChatSession.push({ role, content });
            saveChatHistory();
        }
    }

    /**
     * Appends a new message to the chat display (legacy function, can be removed if unused).
     * @param {string} message - The text content of the message.
     * @param {string} sender - 'user' or 'bot' to determine styling and avatar.
     */
    function displayMessage(message, sender) {
        const avatarClass = sender === 'user' ? 'user-avatar' : 'bot-avatar';
        const iconClass = sender === 'user' ? 'fas fa-user' : 'fas fa-robot';
        const messageHtml = `
            <div class="message ${sender}">
                <div class="message-avatar ${avatarClass}">
                    <i class="${iconClass}"></i>
                </div>
                <div class="message-content">
                    ${message}
                </div>
            </div>
        `;
        chatMessages.append(messageHtml);
        scrollToBottom();
    }

    /**
     * Simulates a bot's response after a delay (not used with backend, can be removed).
     */
    function simulateBotResponse() {
        const typingIndicatorHtml = `
            <div class="message bot typing-indicator">
                <div class="message-avatar bot-avatar">
                    <i class="fas fa-robot"></i>
                </div>
                <div class="typing-dot"></div>
                <div class="typing-dot"></div>
                <div class="typing-dot"></div>
            </div>
        `;
        chatMessages.append(typingIndicatorHtml);
        scrollToBottom();

        setTimeout(function() {
            $('.typing-indicator').remove();
            const botMessage = translations[languageSelector.val()]['BotResponse'];
            displayMessage(botMessage, 'bot');
            saveMessage({ sender: 'bot', text: botMessage });
        }, 2000);
    }

    /**
     * Scrolls the chat container to the bottom to show the latest message.
     */
    function scrollToBottom() {
        chatMessages.scrollTop(chatMessages[0].scrollHeight);
    }

    /**
     * Saves a message object to the current chat session array and localStorage (legacy format).
     * @param {object} message - An object containing the sender and text of the message.
     */
    function saveMessage(message) {
        currentChatSession.push(message);
        localStorage.setItem(CHAT_HISTORY_KEY, JSON.stringify(currentChatSession));
    }

    /**
     * Loads and displays the chat history from localStorage on page load.
     */
    function loadChatSession() {
        const historyData = localStorage.getItem(CHAT_HISTORY_KEY);
        if (historyData) {
            try {
                const session = JSON.parse(historyData);
                if (Array.isArray(session)) {
                    currentChatSession = session;
                    currentChatSession.forEach(msg => {
                        // Convert legacy format to new format if needed
                        const role = msg.sender === 'user' ? 'user' : 'assistant';
                        addMessage(role, msg.text, false); // Don't re-save to avoid duplication
                    });
                }
            } catch (e) {
                console.error("Failed to parse chat history from localStorage", e);
                currentChatSession = [];
            }
        } else {
            // Display initial greeting if no history
            addMessage('assistant', translations[languageSelector.val()]['InitialGreeting'], false);
        }
    }

    /**
     * Saves the current chat session to localStorage.
     */
    function saveChatHistory() {
        localStorage.setItem(CHAT_HISTORY_KEY, JSON.stringify(currentChatSession));
    }

    // ====================
    // Navigation and Modals
    // ====================

    /**
     * Handles navigation between different content sections.
     * Hides all sections and shows the selected one.
     */
    function handleNavigation(e) {
        e.preventDefault();
        const sectionId = $(this).data('section') || $(this).data('feature');
        if (!sectionId) {
            return;
        }

        // Update active class for both nav and sidebar links
        $('.nav-link').removeClass('active');
        $(`.nav-link[data-section="${sectionId}"]`).addClass('active');
        $('.sidebar-item').removeClass('active');
        $(`.sidebar-item[data-feature="${sectionId}"]`).addClass('active');

        // Hide all content sections and show the target one
        contentSections.hide();
        $(`#${sectionId}Section`).show();
        scrollToTop();
    }

    /**
     * Displays the chat history modal.
     */
    function showHistoryModal() {
        historyList.empty();
        const currentLang = languageSelector.val();
        if (currentChatSession.length > 0) {
            const historyItemHtml = `
                <div class="history-item">
                    <div class="history-date">${new Date().toLocaleString(currentLang === 'hi' ? 'hi-IN' : 'en-US')}</div>
                    <div class="history-preview">${currentChatSession[0].text.substring(0, 50)}...</div>
                </div>
            `;
            historyList.append(historyItemHtml);
        } else {
            historyList.append(`<p class="text-center">${translations[currentLang]['NoChatHistory']}</p>`);
        }
        historyModal.addClass('active');
    }

    /**
     * Hides the chat history modal.
     */
    function hideHistoryModal() {
        historyModal.removeClass('active');
    }

    /**
     * Toggles the display of FAQ answers.
     */
    function handleFaqToggle() {
        $(this).toggleClass('active');
    }
    function handleNavigation(e) {
    e.preventDefault();
    const sectionId = $(this).data('section') || $(this).data('feature');
    console.log('Navigating to:', sectionId);
    if (!sectionId) return;
    contentSections.hide();
    $(`#${sectionId}Section`).show().addClass('active'); // Ensure .active class
    scrollToTop();
}

    /**
     * Scrolls to the top of the main content section.
     */
    function scrollToTop() {
        $('.main-content').scrollTop(0);
    }

    // ====================
    // Accessibility and Utilities
    // ====================

    /**
     * Updates the date and time display.
     */
    function updateDateTime() {
        const now = new Date();
        const options = {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
        };
        datetimeDisplay.text(now.toLocaleDateString('en-US', options));
    }

    /**
     * Translates the entire website content to the selected language.
     * @param {string} lang - The language code ('en' or 'hi').
     */
    function translateWebsite(lang) {
        $('[data-i18n]').each(function() {
            const key = $(this).data('i18n');
            if (translations[lang] && translations[lang][key]) {
                $(this).text(translations[lang][key]);
            }
        });
        $('[data-i18n-placeholder]').each(function() {
            const key = $(this).data('i18n-placeholder');
            if (translations[lang] && translations[lang][key]) {
                $(this).attr('placeholder', translations[lang][key]);
            }
        });
    }

    // ====================
    // Feature-specific Functions
    // ====================

    /**
     * Handles the placeholder WhatsApp button.
     */
    function handleWhatsappPlaceholder() {
        const currentLang = languageSelector.val();
        alert(translations[currentLang]['WhatsAppUnavailable']);
    }

    /**
     * Simulates checking for symptoms.
     */
    function checkSymptoms() {
        const symptomsInput = $('#symptomsInput');
        const symptoms = symptomsInput.val().trim();
        const resultsDiv = $('#symptomResults');
        const currentLang = languageSelector.val();

        if (symptoms === '') {
            alert(translations[currentLang]['NoSymptomInput']);
            return;
        }

        resultsDiv.html(`<p>${translations[currentLang]['SymptomAnalysis']}</p>`);
        resultsDiv.addClass('loading');

        setTimeout(() => {
            resultsDiv.removeClass('loading');
            const resultTitle = translations[currentLang]['SymptomResultTitle'].replace('${symptoms}', symptoms);
            const html = `
                <div class="result-card">
                    <h3>${translations[currentLang]['Potential Cause']}</h3>
                    <p>${resultTitle}</p>
                </div>
                <div class="result-card">
                    <h3>${translations[currentLang]['Recommended Actions']}</h3>
                    <ul>
                        <li>${translations[currentLang]['SymptomResultAction1']}</li>
                        <li>${translations[currentLang]['SymptomResultAction2']}</li>
                        <li>${translations[currentLang]['SymptomResultAction3']}</li>
                    </ul>
                </div>
                <p class="disclaimer">${translations[currentLang]['SymptomDisclaimer']}</p>
            `;
            resultsDiv.html(html);
        }, 2500);
    }

    /**
     * Simulates finding a doctor based on specialty and location.
     */
    function findDoctors() {
        const location = $('#doctorLocation').val().trim();
        const specialty = $('#doctorSpecialty').val();
        const resultsDiv = $('#doctorResults');
        const currentLang = languageSelector.val();

        if (location === '') {
            alert(translations[currentLang]['NoLocationInput']);
            return;
        }

        resultsDiv.html(`<p>${translations[currentLang]['SearchingDoctors']}</p>`);
        resultsDiv.addClass('loading');

        setTimeout(() => {
            resultsDiv.removeClass('loading');
            const mockDoctors = [{
                name: "Dr. Ananya Sharma",
                specialty: "General Practitioner",
                address: "45-A, Nehru Nagar, Bhopal",
                rating: "4.8"
            }, {
                name: "Dr. Ravi Kumar",
                specialty: "Cardiologist",
                address: "12, Shivaji Nagar, Indore",
                rating: "4.9"
            }];

            const filteredDoctors = specialty === 'any' ? mockDoctors : mockDoctors.filter(d => d.specialty.toLowerCase().includes(specialty));

            if (filteredDoctors.length === 0) {
                resultsDiv.html(`<p class="text-center">${translations[currentLang]['NoDoctorsFound']}</p>`);
                return;
            }

            let html = '';
            filteredDoctors.forEach(doctor => {
                const translatedSpecialty = translations[currentLang][doctor.specialty.replace(' ', '')] || doctor.specialty;
                html += `
                    <div class="doctor-card">
                        <h3>Dr. ${doctor.name}</h3>
                        <p><strong>${translations[currentLang]['Specialty']}:</strong> ${translatedSpecialty}</p>
                        <p><strong>${translations[currentLang]['Address']}:</strong> ${doctor.address}</p>
                        <p><strong>${translations[currentLang]['Rating']}:</strong> ${doctor.rating} / 5</p>
                        <button class="book-appointment-btn">${translations[currentLang]['Book Appointment']}</button>
                    </div>
                `;
            });
            resultsDiv.html(html);
        }, 2500);
    }

    /**
     * Simulates an emergency call.
     */
    function handleEmergencyCall() {
        const currentLang = languageSelector.val();
        emergencyStatus.text(translations[currentLang]['EmergencyConnecting']);
        setTimeout(() => {
            emergencyStatus.text(translations[currentLang]['EmergencyCallInitiated']);
        }, 2000);
    }

    /**
     * Locates the nearest hospital using the Geolocation API.
     */
    function handleLocateHospital() {
        const currentLang = languageSelector.val();
        if (navigator.geolocation) {
            emergencyStatus.text(translations[currentLang]['FindingLocation']);
            navigator.geolocation.getCurrentPosition(position => {
                const { latitude, longitude } = position.coords;
                emergencyStatus.text(translations[currentLang]['LocationFound']);
                window.open(`https://www.google.com/maps/search/hospital/@${latitude},${longitude},15z`, '_blank');
            }, () => {
                emergencyStatus.text(translations[currentLang]['LocationError']);
            });
        } else {
            emergencyStatus.text(translations[currentLang]['GeolocationNotSupported']);
        }
    }

    /**
     * Toggles speech recognition on and off.
     */
    function toggleSpeechRecognition() {
        const currentLang = languageSelector.val();
        if (isRecording) {
            recognition.stop();
            isRecording = false;
            voiceBtn.removeClass('recording');
            emergencyStatus.text(translations[currentLang]['RecordingStopped']);
        } else {
            recognition.start();
            isRecording = true;
            voiceBtn.addClass('recording');
            emergencyStatus.text(translations[currentLang]['MicActivated']);
        }
    }

    // Handle speech recognition results
    if (recognition) {
        recognition.onresult = function(event) {
            const transcript = event.results[0][0].transcript;
            chatInput.val(transcript);
            handleSendMessage();
            isRecording = false;
            voiceBtn.removeClass('recording');
        };

        recognition.onerror = function(event) {
            console.error('Speech recognition error:', event.error);
            isRecording = false;
            voiceBtn.removeClass('recording');
            emergencyStatus.text(`Error: ${event.error}`);
        };

    }

});