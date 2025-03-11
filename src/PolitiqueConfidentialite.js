import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const PolitiqueConfidentialite = () => {
    const [activeSection, setActiveSection] = useState(null);

    const toggleSection = (index) => {
        setActiveSection(activeSection === index ? null : index);
    };

    const sections = [
        {
            title: "1. Responsable du Traitement des Données",
            content: (
                <ul className="list-none space-y-2">
                    <li className="flex items-center"><span className="w-40 font-medium">Nom de l'entreprise:</span>YLH CAR</li>
                    <li className="flex items-center"><span className="w-40 font-medium">Forme juridique:</span>SARL</li>
                    <li className="flex items-center"><span className="w-40 font-medium">Siège social:</span>LOT BOUCHOUK, RÉSIDENCE ANNAKHIL 2, ENTRÉE 2, MAG 1 BOUCHOUK, Salé, Maroc</li>
                    <li className="flex items-center"><span className="w-40 font-medium">R.C.:</span>38677</li>
                    <li className="flex items-center"><span className="w-40 font-medium">I.F.:</span>60155946</li>
                    <li className="flex items-center"><span className="w-40 font-medium">CNSS:</span>5261993</li>
                    <li className="flex items-center"><span className="w-40 font-medium">Téléphone:</span>+212661918917</li>
                    <li className="flex items-center"><span className="w-40 font-medium">Email:</span>administration@ylhcar.ma</li>
                    <li className="flex items-center"><span className="w-40 font-medium">Directeur de publication:</span>LEMAAMER Amine</li>
                </ul>
            )
        },
        {
            title: "2. Données Collectées",
            content: (
                <div>
                    <div className="mb-4">
                        <h3 className="text-lg font-semibold mb-2 text-blue-700">2.1. Données collectées automatiquement</h3>
                        <ul className="list-disc pl-5 space-y-1">
                            <li>Adresse IP</li>
                            <li>Informations sur le navigateur et le dispositif utilisé</li>
                            <li>Pages visitées et durée de la visite</li>
                            <li>Cookies et technologies similaires</li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold mb-2 text-blue-700">2.2. Données collectées directement</h3>
                        <ul className="list-disc pl-5 space-y-1">
                            <li>Lors d'une réservation: nom, prénom, adresse email, numéro de téléphone, informations de paiement.</li>
                            <li>Lors de l'inscription à la newsletter: adresse email.</li>
                            <li>Lors d'une demande de contact: nom, email, message.</li>
                        </ul>
                    </div>
                </div>
            )
        },
        {
            title: "3. Finalités du Traitement des Données",
            content: (
                <div>
                    <p className="mb-2">Vos données sont collectées pour les finalités suivantes:</p>
                    <ul className="list-disc pl-5 space-y-1">
                        <li>Gestion des réservations et paiements</li>
                        <li>Communication et suivi des clients</li>
                        <li>Amélioration du site et des services</li>
                        <li>Envoi de newsletters et offres promotionnelles (avec consentement)</li>
                        <li>Conformité légale et sécurité</li>
                    </ul>
                </div>
            )
        },
        {
            title: "4. Bases Légales du Traitement",
            content: (
                <div>
                    <p className="mb-2">Nous traitons vos données de manière légale selon les bases suivantes:</p>
                    <ul className="list-disc pl-5 space-y-1">
                        <li>Exécution du contrat: pour gérer vos réservations et demandes.</li>
                        <li>Consentement: pour l'envoi de newsletters et de cookies non essentiels.</li>
                        <li>Intérêt légitime: pour améliorer nos services et prévenir les fraudes.</li>
                    </ul>
                </div>
            )
        },
        {
            title: "5. Durée de Conservation des Données",
            content: (
                <ul className="list-disc pl-5 space-y-1">
                    <li>Données de réservation: conservées pendant 5 ans après la dernière interaction.</li>
                    <li>Données marketing: conservées jusqu'à désinscription.</li>
                    <li>Cookies: durée maximale de 13 mois.</li>
                </ul>
            )
        },
        {
            title: "6. Utilisation des Cookies",
            content: (
                <div>
                    <p className="mb-2">Nous utilisons des cookies pour:</p>
                    <ul className="list-disc pl-5 space-y-1">
                        <li>Améliorer l'expérience utilisateur</li>
                        <li>Réaliser des statistiques anonymes</li>
                        <li>Proposer des contenus personnalisés</li>
                    </ul>
                    <p className="mt-2">Vous pouvez gérer les cookies via les paramètres de votre navigateur.</p>
                </div>
            )
        },
        {
            title: "7. Partage des Données",
            content: (
                <div>
                    <p className="mb-2">Nous ne partageons vos données qu'avec:</p>
                    <ul className="list-disc pl-5 space-y-1">
                        <li>Fournisseurs de services: pour le traitement des paiements et l'hébergement du site.</li>
                        <li>Autorités légales: en cas d'obligation légale.</li>
                    </ul>
                    <p className="mt-2 font-medium">Nous ne vendons jamais vos données à des tiers.</p>
                </div>
            )
        },
        {
            title: "8. Sécurité des Données",
            content: (
                <p>Nous mettons en place des mesures techniques et organisationnelles appropriées pour protéger vos données contre tout accès non autorisé, perte ou altération.</p>
            )
        },
        {
            title: "9. Vos Droits",
            content: (
                <div>
                    <p className="mb-2">Conformément à la loi n°09-08 relative à la protection des données au Maroc, vous disposez des droits suivants:</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div className="bg-blue-50 p-3 rounded shadow-sm">
                            <h4 className="font-semibold mb-1 text-blue-700">Droit d'Accès</h4>
                            <p className="text-sm">Connaître les données que nous détenons sur vous.</p>
                        </div>
                        <div className="bg-blue-50 p-3 rounded shadow-sm">
                            <h4 className="font-semibold mb-1 text-blue-700">Droit de Rectification</h4>
                            <p className="text-sm">Corriger des informations incorrectes.</p>
                        </div>
                        <div className="bg-blue-50 p-3 rounded shadow-sm">
                            <h4 className="font-semibold mb-1 text-blue-700">Droit de Suppression</h4>
                            <p className="text-sm">Demander la suppression de vos données (sauf obligations légales).</p>
                        </div>
                        <div className="bg-blue-50 p-3 rounded shadow-sm">
                            <h4 className="font-semibold mb-1 text-blue-700">Droit d'Opposition</h4>
                            <p className="text-sm">Refuser le traitement à des fins marketing.</p>
                        </div>
                        <div className="bg-blue-50 p-3 rounded shadow-sm md:col-span-2">
                            <h4 className="font-semibold mb-1 text-blue-700">Droit à la Portabilité</h4>
                            <p className="text-sm">Recevoir vos données dans un format structuré.</p>
                        </div>
                    </div>
                    <p className="mb-2 font-medium">Pour exercer ces droits, contactez-nous à:</p>
                    <ul className="list-none">
                        <li className="flex items-center mb-1"><span className="mr-2 text-blue-600">✉️</span> administration@ylhcar.ma</li>
                        <li className="flex items-center"><span className="mr-2 text-blue-600">📞</span> +212661918917</li>
                    </ul>
                </div>
            )
        },
        {
            title: "10. Transferts Hors Maroc",
            content: (
                <p>Vos données sont stockées au Maroc. Si nous devions les transférer en dehors du Maroc, nous nous assurerions que des mesures adéquates sont en place pour garantir leur protection.</p>
            )
        },
        {
            title: "11. Modifications de la Politique de Confidentialité",
            content: (
                <p>Nous nous réservons le droit de modifier cette politique à tout moment. Les modifications seront publiées sur cette page avec la date de mise à jour.</p>
            )
        },
        {
            title: "12. Contact",
            content: (
                <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="mb-2 font-medium">Pour toute question relative à cette politique:</p>
                    <div className="flex flex-col md:flex-row md:space-x-8">
                        <div className="flex items-center mb-2 md:mb-0">
                            <div className="bg-blue-600 text-white p-2 rounded-full mr-3">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                                </svg>
                            </div>
                            <span>administration@ylhcar.ma</span>
                        </div>
                        <div className="flex items-center">
                            <div className="bg-blue-600 text-white p-2 rounded-full mr-3">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                    <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                                </svg>
                            </div>
                            <span>+212661918917</span>
                        </div>
                    </div>
                </div>
            )
        }
    ];

    return (
        <div className="bg-gradient-to-b from-gray-50 to-white min-h-screen">
            <div className="max-w-6xl mx-auto px-4 py-12">
            <div className="mb-6">
                    <Link 
                        to="/" 
                        className="inline-flex items-center px-4 py-2 bg-white border border-primary-500 rounded-lg text-primary-600 font-medium shadow-sm hover:bg-primary-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-colors"
                    >
                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                        </svg>
                        Retour à la page principale
                    </Link>
                </div>
        <div className="max-w-6xl mx-auto px-4 py-12 bg-white">
            <div className="bg-gradient-to-r from-blue-700 to-blue-500 text-white p-8 rounded-t-lg shadow-lg">
                <h1 className="text-4xl font-bold mb-4">Politique de Confidentialité</h1>
                <div className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                    </svg>
                    <p>Dernière mise à jour : 09/03/2025</p>
                </div>
            </div>
            
            <div className="bg-white p-6 rounded-b-lg shadow-lg mb-8">
                <div className="border-l-4 border-blue-500 pl-4 italic text-gray-600 mb-6">
                    Chez YLH CAR, nous attachons une grande importance à la protection de vos données personnelles. La présente Politique de Confidentialité a pour but de vous informer sur la manière dont nous collectons, utilisons, stockons et protégeons vos informations.
                </div>
                
                <div className="space-y-4">
                    {sections.map((section, index) => (
                        <div key={index} className="border border-gray-200 rounded-lg overflow-hidden">
                            <button 
                                className={`flex justify-between items-center w-full p-4 text-left font-semibold text-lg ${activeSection === index ? 'bg-blue-600 text-white' : 'bg-gray-50 text-gray-800'}`}
                                onClick={() => toggleSection(index)}
                            >
                                <span>{section.title}</span>
                                <svg 
                                    xmlns="http://www.w3.org/2000/svg" 
                                    className={`h-5 w-5 transition-transform duration-300 ${activeSection === index ? 'transform rotate-180' : ''}`} 
                                    viewBox="0 0 20 20" 
                                    fill="currentColor"
                                >
                                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                                </svg>
                            </button>
                            <div 
                                className={`transition-all duration-300 ease-in-out ${activeSection === index ? 'max-h-screen opacity-100 p-4' : 'max-h-0 opacity-0 overflow-hidden'}`}
                            >
                                {section.content}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            
            <div className="mt-8 text-center text-sm text-gray-500 p-4 border-t">
                <p>© 2025 YLH CAR SARL. Tous droits réservés.</p>
            </div>
        </div></div></div>
    );
};

export default PolitiqueConfidentialite;