import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // Assurez-vous que react-router-dom est installé

const ConditionsGenerales = () => {
    // Instead of tracking a single active section, we'll track if all sections should be expanded
    const [expandAll, setExpandAll] = useState(false);
    // We'll also track individual section states
    const [activeSections, setActiveSections] = useState({});

    // Toggle a specific section
    const toggleSection = (index) => {
        setActiveSections({
            ...activeSections,
            [index]: !activeSections[index]
        });
    };

    // Toggle all sections
    const toggleAllSections = () => {
        const newExpandAll = !expandAll;
        setExpandAll(newExpandAll);
        
        // Create a new object with all sections set to the new state
        const newActiveSections = {};
        sections.forEach((_, index) => {
            newActiveSections[index] = newExpandAll;
        });
        
        setActiveSections(newActiveSections);
    };

    const sections = [
        {
            title: "1. Informations Légales",
            content: (
                <ul className="list-none space-y-3">
                    <li className="flex items-start">
                        <span className="text-primary-600 mr-2">•</span>
                        <span><span className="font-medium">Nom de l'entreprise :</span> YLH CAR</span>
                    </li>
                    <li className="flex items-start">
                        <span className="text-primary-600 mr-2">•</span>
                        <span><span className="font-medium">Forme juridique :</span> SARL</span>
                    </li>
                    <li className="flex items-start">
                        <span className="text-primary-600 mr-2">•</span>
                        <span><span className="font-medium">Siège social :</span> LOT BOUCHOUK, RÉSIDENCE ANNAKHIL 2, ENTRÉE 2, MAG 1 BOUCHOUK, Salé, Maroc</span>
                    </li>
                    <li className="flex items-start">
                        <span className="text-primary-600 mr-2">•</span>
                        <span><span className="font-medium">R.C. :</span> 38677</span>
                    </li>
                    <li className="flex items-start">
                        <span className="text-primary-600 mr-2">•</span>
                        <span><span className="font-medium">I.F. :</span> 60155946</span>
                    </li>
                    <li className="flex items-start">
                        <span className="text-primary-600 mr-2">•</span>
                        <span><span className="font-medium">CNSS :</span> 5261993</span>
                    </li>
                    <li className="flex items-start">
                        <span className="text-primary-600 mr-2">•</span>
                        <span><span className="font-medium">Téléphone :</span> +212661918917</span>
                    </li>
                    <li className="flex items-start">
                        <span className="text-primary-600 mr-2">•</span>
                        <span><span className="font-medium">Email :</span> <a href="mailto:administration@ylhcar.ma" className="text-primary-600 hover:underline">administration@ylhcar.ma</a></span>
                    </li>
                    <li className="flex items-start">
                        <span className="text-primary-600 mr-2">•</span>
                        <span><span className="font-medium">Directeur de publication :</span> LEMAAMER Amine</span>
                    </li>
                </ul>
            )
        },
        {
            title: "2. Objet",
            content: (
                <p>Les présentes CGU régissent l'utilisation du site et les conditions de location des véhicules avec ou sans chauffeur, ainsi que les transferts aéroportuaires au Maroc proposés par YLH CAR.</p>
            )
        },
        {
            title: "3. Services Proposés",
            content: (
                <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="bg-white rounded-lg shadow-md p-4 border-l-4 border-primary-500">
                            <h4 className="font-semibold text-lg mb-2">Location de véhicules</h4>
                            <p>Citadines, SUV, berlines, luxueuses et utilitaires.</p>
                        </div>
                        <div className="bg-white rounded-lg shadow-md p-4 border-l-4 border-primary-500">
                            <h4 className="font-semibold text-lg mb-2">Transferts aéroportuaires</h4>
                            <p>À partir de 400 DH par trajet simple.</p>
                        </div>
                        <div className="bg-white rounded-lg shadow-md p-4 border-l-4 border-primary-500">
                            <h4 className="font-semibold text-lg mb-2">Tarifs</h4>
                            <p>À partir de 250 DH/jour selon le type de véhicule et la durée.</p>
                        </div>
                    </div>
                </div>
            )
        },
        {
            title: "4. Conditions de Location",
            content: (
                <div className="space-y-6">
                    <div>
                        <h3 className="text-xl font-semibold mb-3 text-primary-700">4.1. Conducteur</h3>
                        <ul className="list-none space-y-3">
                            <li className="flex items-start">
                                <span className="text-primary-600 mr-2">•</span>
                                <span><span className="font-medium">Âge minimum :</span> 21 ans pour les citadines et 25 ans pour les autres catégories.</span>
                            </li>
                            <li className="flex items-start">
                                <span className="text-primary-600 mr-2">•</span>
                                <span><span className="font-medium">Permis de conduire valide :</span> depuis au moins 2 ans.</span>
                            </li>
                            <li className="flex items-start">
                                <span className="text-primary-600 mr-2">•</span>
                                <span><span className="font-medium">Documents requis :</span> pièce d'identité et carte de crédit au nom du conducteur.</span>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="text-xl font-semibold mb-3 text-primary-700">4.2. Réservation et Paiement</h3>
                        <ul className="list-none space-y-3">
                            <li className="flex items-start">
                                <span className="text-primary-600 mr-2">•</span>
                                <span><span className="font-medium">Réservation :</span> via le site, téléphone ou en agence.</span>
                            </li>
                            <li className="flex items-start">
                                <span className="text-primary-600 mr-2">•</span>
                                <span><span className="font-medium">Paiement :</span> acompte à la réservation et solde à la prise en charge.</span>
                            </li>
                            <li className="flex items-start">
                                <span className="text-primary-600 mr-2">•</span>
                                <span><span className="font-medium">Moyens acceptés :</span> carte bancaire, espèces.</span>
                            </li>
                        </ul>
                    </div>
                </div>
            )
        },
        {
            title: "5. Assurances et Caution",
            content: (
                <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                    <ul className="list-none space-y-3">
                        <li className="flex items-start">
                            <span className="text-primary-600 mr-2">•</span>
                            <span><span className="font-medium">Assurance incluse :</span> responsabilité civile.</span>
                        </li>
                        <li className="flex items-start">
                            <span className="text-primary-600 mr-2">•</span>
                            <span><span className="font-medium">Options complémentaires :</span> tous risques, bris de glace.</span>
                        </li>
                        <li className="flex items-start">
                            <span className="text-primary-600 mr-2">•</span>
                            <span><span className="font-medium">Caution :</span> bloquée par carte bancaire, restituée après inspection du véhicule.</span>
                        </li>
                    </ul>
                </div>
            )
        },
        {
            title: "6. Modification et Annulation",
            content: (
                <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                    <ul className="list-none space-y-3">
                        <li className="flex items-start">
                            <span className="text-primary-600 mr-2">•</span>
                            <span><span className="font-medium">Annulation gratuite :</span> jusqu'à 48 heures avant la prise en charge.</span>
                        </li>
                        <li className="flex items-start">
                            <span className="text-primary-600 mr-2">•</span>
                            <span><span className="font-medium">Frais d'annulation :</span> 50% du montant si moins de 48 heures.</span>
                        </li>
                    </ul>
                </div>
            )
        },
        {
            title: "7. Obligations du Locataire",
            content: (
                <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                    <ul className="list-none space-y-3">
                        <li className="flex items-start">
                            <span className="text-primary-600 mr-2">•</span>
                            <span><span className="font-medium">Retour du véhicule :</span> avec le plein d'essence.</span>
                        </li>
                        <li className="flex items-start">
                            <span className="text-primary-600 mr-2">•</span>
                            <span><span className="font-medium">Interdictions :</span> sous-location et transport de marchandises illicites.</span>
                        </li>
                        <li className="flex items-start">
                            <span className="text-primary-600 mr-2">•</span>
                            <span><span className="font-medium">Responsabilité :</span> en cas d'amendes et dommages non couverts.</span>
                        </li>
                    </ul>
                </div>
            )
        },
        {
            title: "8. Limitations de Responsabilité",
            content: (
                <p>YLH CAR s'efforce d'assurer l'exactitude des informations diffusées sur le site mais ne saurait être tenu responsable des omissions, inexactitudes ou carences dans la mise à jour.</p>
            )
        },
        {
            title: "9. Protection des Données Personnelles",
            content: (
                <div>
                    <p className="mb-3">Conformément à la loi n°09-08 relative à la protection des données au Maroc :</p>
                    <ul className="list-none space-y-3">
                        <li className="flex items-start">
                            <span className="text-primary-600 mr-2">•</span>
                            <span><span className="font-medium">Finalité des données :</span> gestion des réservations, marketing et services personnalisés.</span>
                        </li>
                        <li className="flex items-start">
                            <span className="text-primary-600 mr-2">•</span>
                            <span><span className="font-medium">Droits d'accès et de rectification :</span> sur demande par email à <a href="mailto:administration@ylhcar.ma" className="text-primary-600 hover:underline">administration@ylhcar.ma</a>.</span>
                        </li>
                        <li className="flex items-start">
                            <span className="text-primary-600 mr-2">•</span>
                            <span><span className="font-medium">Durée de conservation :</span> les données sont conservées pendant une durée de 5 ans.</span>
                        </li>
                    </ul>
                </div>
            )
        },
        {
            title: "10. Cookies",
            content: (
                <p>Le site utilise des cookies pour améliorer l'expérience utilisateur et fournir des statistiques anonymes. Gestion des cookies : vous pouvez les désactiver dans les paramètres de votre navigateur.</p>
            )
        },
        {
            title: "11. Droit Applicable et Litiges",
            content: (
                <p>Les présentes CGU sont régies par le droit marocain. Tout litige sera soumis aux tribunaux compétents de Salé.</p>
            )
        },
        {
            title: "12. Contact",
            content: (
                <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
                    <p className="mb-4">Pour toute question relative aux présentes CGU :</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="flex items-center">
                            <svg className="w-6 h-6 text-primary-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                            </svg>
                            <a href="mailto:administration@ylhcar.ma" className="text-primary-600 hover:underline">administration@ylhcar.ma</a>
                        </div>
                        <div className="flex items-center">
                            <svg className="w-6 h-6 text-primary-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                            </svg>
                            <a href="tel:+212661918917" className="text-primary-600 hover:underline">+212661918917</a>
                        </div>
                    </div>
                </div>
            )
        },
        {
            title: "13. Acceptation des CGU",
            content: (
                <p>L'utilisation du site implique l'acceptation pleine et entière des présentes CGU.</p>
            )
        },
    ];

    return (
        <div className="bg-gradient-to-b from-gray-50 to-white min-h-screen">
            <div className="max-w-6xl mx-auto px-4 py-12">
                {/* Bouton de retour à la page principale */}
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

                <div className="bg-white rounded-xl shadow-xl overflow-hidden">
                    <div className="bg-gradient-to-r from-primary-600 to-primary-800 p-8 text-white">
                        <h1 className="text-4xl font-bold mb-4">Conditions Générales d'Utilisation et de Location</h1>
                        <div className="flex items-center">
                            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                            <p>Dernière mise à jour : 09/03/2025</p>
                        </div>
                    </div>
                    
                    <div className="p-8">
                        <div className="mb-8 text-gray-700 leading-relaxed">
                            <p>Bienvenue sur le site de <span className="font-semibold">YLH CAR</span>. En utilisant notre site et nos services, vous acceptez les présentes Conditions Générales d'Utilisation et de Location (ci-après "CGU"). Nous vous invitons à les lire attentivement.</p>
                        </div>
                        
                        <div className="mb-4 flex justify-end">
                            <button 
                                className="text-primary-600 hover:text-primary-800 font-medium flex items-center"
                                onClick={toggleAllSections}
                            >
                                {expandAll ? "Tout réduire" : "Tout développer"}
                                <svg className="w-5 h-5 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={expandAll ? "M5 15l7-7 7 7" : "M19 9l-7 7-7-7"} />
                                </svg>
                            </button>
                        </div>
                        
                        <div className="space-y-4">
                            {sections.map((section, index) => (
                                <div 
                                    key={index} 
                                    className="border border-gray-200 rounded-lg overflow-hidden"
                                >
                                    <button 
                                        className={`w-full px-6 py-4 text-left font-semibold flex justify-between items-center ${activeSections[index] ? 'bg-primary-50 text-primary-700' : 'bg-white text-gray-800 hover:bg-gray-50'}`}
                                        onClick={() => toggleSection(index)}
                                    >
                                        <span>{section.title}</span>
                                        <svg 
                                            className={`w-5 h-5 transition-transform ${activeSections[index] ? 'transform rotate-180' : ''}`}
                                            fill="none" 
                                            stroke="currentColor" 
                                            viewBox="0 0 24 24" 
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                                        </svg>
                                    </button>
                                    
                                    {(activeSections[index] || expandAll) && (
                                        <div className="px-6 py-4 bg-white text-gray-700 leading-relaxed">
                                            {section.content}
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                    
                    <div className="bg-gray-50 px-8 py-6 text-center text-gray-600 border-t border-gray-200">
                        <p>&copy; {new Date().getFullYear()} YLH CAR. Tous droits réservés.</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ConditionsGenerales;