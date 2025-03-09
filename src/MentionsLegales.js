import React from 'react';
import { Link } from 'react-router-dom';

const MentionsLegales = () => {
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
        
        
        <div className="bg-gradient-to-b from-gray-50 to-white min-h-screen">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                {/* Header section with decorative elements */}
                <div className="relative mb-12">
                    <div className="absolute inset-0 flex items-center" aria-hidden="true">
                        <div className="w-full border-t border-gray-300"></div>
                    </div>
                    <div className="relative flex justify-center">
                        <span className="bg-[#312783] px-6 text-xl text-white font-bold">YLH CAR</span>
                    </div>
                </div>

                <div className="text-center mb-12">
                    <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight sm:text-5xl mb-3">
                        Mentions Légales
                    </h1>
                    <p className="text-gray-500 text-sm">
                        Dernière mise à jour : <span className="font-medium">09/03/2024</span>
                    </p>
                </div>

                <div className="bg-white shadow-xl rounded-2xl overflow-hidden">
                    {/* Table of contents */}
                    <div className="bg-gray-50 p-6 border-b border-gray-200">
                        <h2 className="text-lg font-medium text-gray-900 mb-4">Sommaire</h2>
                        <nav className="grid grid-cols-1 md:grid-cols-2 gap-2">
                            {[
                                { id: 'editeur', name: 'Éditeur du Site' },
                                { id: 'hebergeur', name: 'Hébergeur du Site' },
                                { id: 'propriete', name: 'Propriété Intellectuelle' },
                                { id: 'donnees', name: 'Protection des Données' },
                                { id: 'cookies', name: 'Cookies' },
                                { id: 'responsabilite', name: 'Limitation de Responsabilité' },
                                { id: 'droit', name: 'Droit Applicable' },
                                { id: 'contact', name: 'Contact' },
                            ].map((item) => (
                                <a
                                    key={item.id}
                                    href={`#${item.id}`}
                                    className="group flex items-center px-3 py-2 text-sm font-medium text-gray-700 rounded-md hover:text-gray-900 hover:bg-gray-100"
                                >
                                    <span className="truncate">{item.name}</span>
                                </a>
                            ))}
                        </nav>
                    </div>

                    {/* Content sections */}
                    <div className="p-6 space-y-10">
                        {/* 1. Éditeur */}
                        <section id="editeur" className="relative">
                            <div className="absolute -left-3 h-full w-1 bg-indigo-600 rounded-full opacity-50"></div>
                            <h2 className="text-2xl font-bold text-gray-900 mb-4 pl-4">1. Éditeur du Site</h2>
                            <div className="bg-gray-50 rounded-lg p-6 shadow-sm">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <div className="flex items-start">
                                            <div className="flex-shrink-0">
                                                <svg className="h-5 w-5 text-indigo-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                                </svg>
                                            </div>
                                            <p className="ml-2 text-gray-700"><span className="font-medium">Nom de l'entreprise:</span> YLH CAR</p>
                                        </div>
                                        <div className="flex items-start">
                                            <div className="flex-shrink-0">
                                                <svg className="h-5 w-5 text-indigo-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                                </svg>
                                            </div>
                                            <p className="ml-2 text-gray-700"><span className="font-medium">Forme juridique:</span> SARL</p>
                                        </div>
                                        <div className="flex items-start">
                                            <div className="flex-shrink-0">
                                                <svg className="h-5 w-5 text-indigo-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                                </svg>
                                            </div>
                                            <p className="ml-2 text-gray-700"><span className="font-medium">Siège social:</span> LOT BOUCHOUK RESIDENCE ANNAKHIL 2 ENTRER 2 MAG 1 BOUCHOUK, Salé</p>
                                        </div>
                                        <div className="flex items-start">
                                            <div className="flex-shrink-0">
                                                <svg className="h-5 w-5 text-indigo-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                                </svg>
                                            </div>
                                            <p className="ml-2 text-gray-700"><span className="font-medium">Directeur de publication:</span> LEMAAMER Amine</p>
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <div className="flex items-start">
                                            <div className="flex-shrink-0">
                                                <svg className="h-5 w-5 text-indigo-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                                </svg>
                                            </div>
                                            <p className="ml-2 text-gray-700"><span className="font-medium">R.C.:</span> 38677</p>
                                        </div>
                                        <div className="flex items-start">
                                            <div className="flex-shrink-0">
                                                <svg className="h-5 w-5 text-indigo-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                                </svg>
                                            </div>
                                            <p className="ml-2 text-gray-700"><span className="font-medium">I.F.:</span> 60155946</p>
                                        </div>
                                        <div className="flex items-start">
                                            <div className="flex-shrink-0">
                                                <svg className="h-5 w-5 text-indigo-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                                </svg>
                                            </div>
                                            <p className="ml-2 text-gray-700"><span className="font-medium">CNSS:</span> 5261993</p>
                                        </div>
                                        <div className="flex items-start">
                                            <div className="flex-shrink-0">
                                                <svg className="h-5 w-5 text-indigo-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                                    <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                                                </svg>
                                            </div>
                                            <p className="ml-2 text-gray-700"><span className="font-medium">Téléphone:</span> +212661918917</p>
                                        </div>
                                        <div className="flex items-start">
                                            <div className="flex-shrink-0">
                                                <svg className="h-5 w-5 text-indigo-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                                                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                                                </svg>
                                            </div>
                                            <p className="ml-2 text-gray-700"><span className="font-medium">Email:</span> administration@ylhcar.ma</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/* 2. Hébergeur */}
                        <section id="hebergeur" className="relative">
                            <div className="absolute -left-3 h-full w-1 bg-indigo-600 rounded-full opacity-50"></div>
                            <h2 className="text-2xl font-bold text-gray-900 mb-4 pl-4">2. Hébergeur du Site</h2>
                            <div className="bg-gray-50 rounded-lg p-6 shadow-sm">
                                <div className="space-y-3">
                                    <div className="flex items-start">
                                        <div className="flex-shrink-0">
                                            <svg className="h-5 w-5 text-indigo-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                            </svg>
                                        </div>
                                        <p className="ml-2 text-gray-700"><span className="font-medium">Nom de l'hébergeur:</span> Arcanes technologies</p>
                                    </div>
                                    <div className="flex items-start">
                                        <div className="flex-shrink-0">
                                            <svg className="h-5 w-5 text-indigo-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                            </svg>
                                        </div>
                                        <p className="ml-2 text-gray-700"><span className="font-medium">Siège social:</span> 11 boulevard zerktouni imm tarfaya 9eme étage numéro 23 Casablanca</p>
                                    </div>
                                    <div className="flex items-start">
                                        <div className="flex-shrink-0">
                                            <svg className="h-5 w-5 text-indigo-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                                <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                                            </svg>
                                        </div>
                                        <p className="ml-2 text-gray-700"><span className="font-medium">Téléphone:</span> +212522491944</p>
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/* 3. Propriété Intellectuelle */}
                        <section id="propriete" className="relative">
                            <div className="absolute -left-3 h-full w-1 bg-indigo-600 rounded-full opacity-50"></div>
                            <h2 className="text-2xl font-bold text-gray-900 mb-4 pl-4">3. Propriété Intellectuelle</h2>
                            <div className="bg-gray-50 rounded-lg p-6 shadow-sm">
                                <p className="text-gray-700 leading-relaxed">
                                    Tous les contenus présents sur le site (textes, images, logos, etc.) sont protégés par le droit d'auteur 
                                    et sont la propriété exclusive de YLH CAR. Toute reproduction, distribution ou utilisation sans autorisation 
                                    préalable écrite est strictement interdite et peut constituer une contrefaçon sanctionnée par les articles 
                                    L.335-2 et suivants du Code de la propriété intellectuelle.
                                </p>
                            </div>
                        </section>

                        {/* 4. Protection des Données */}
                        <section id="donnees" className="relative">
                            <div className="absolute -left-3 h-full w-1 bg-indigo-600 rounded-full opacity-50"></div>
                            <h2 className="text-2xl font-bold text-gray-900 mb-4 pl-4">4. Protection des Données Personnelles</h2>
                            <div className="bg-gray-50 rounded-lg p-6 shadow-sm">
                                <p className="text-gray-700 mb-4">
                                    Conformément à la loi n°09-08 relative à la protection des personnes physiques à l'égard 
                                    du traitement des données à caractère personnel au Maroc :
                                </p>
                                <div className="space-y-4">
                                    <div className="flex items-start">
                                        <div className="flex-shrink-0">
                                            <svg className="h-6 w-6 text-indigo-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                                            </svg>
                                        </div>
                                        <div className="ml-3">
                                            <h3 className="font-medium text-gray-900">Finalité des données</h3>
                                            <p className="text-gray-700">Gestion des réservations, marketing, et services personnalisés.</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start">
                                        <div className="flex-shrink-0">
                                            <svg className="h-6 w-6 text-indigo-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
                                            </svg>
                                        </div>
                                        <div className="ml-3">
                                            <h3 className="font-medium text-gray-900">Droit d'accès, de rectification et d'opposition</h3>
                                            <p className="text-gray-700">Vous pouvez exercer ces droits en nous contactant par email à administration@ylhcar.ma.</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start">
                                        <div className="flex-shrink-0">
                                            <svg className="h-6 w-6 text-indigo-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>
                                        </div>
                                        <div className="ml-3">
                                            <h3 className="font-medium text-gray-900">Durée de conservation</h3>
                                            <p className="text-gray-700">Les données sont conservées pendant une durée de 365 jours.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/* 5. Cookies */}
                        <section id="cookies" className="relative">
                            <div className="absolute -left-3 h-full w-1 bg-indigo-600 rounded-full opacity-50"></div>
                            <h2 className="text-2xl font-bold text-gray-900 mb-4 pl-4">5. Cookies</h2>
                            <div className="bg-gray-50 rounded-lg p-6 shadow-sm">
                                <p className="text-gray-700">
                                    Le site utilise des cookies pour améliorer l'expérience utilisateur et des statistiques anonymes. 
                                    Vous pouvez désactiver les cookies dans les paramètres de votre navigateur.
                                </p>
                            </div>
                        </section>

                        {/* 6. Limitation de Responsabilité */}
                        <section id="responsabilite" className="relative">
                            <div className="absolute -left-3 h-full w-1 bg-indigo-600 rounded-full opacity-50"></div>
                            <h2 className="text-2xl font-bold text-gray-900 mb-4 pl-4">6. Limitation de Responsabilité</h2>
                            <div className="bg-gray-50 rounded-lg p-6 shadow-sm">
                                <p className="text-gray-700">
                                    YLH CAR s'efforce d'assurer l'exactitude des informations diffusées sur le site mais ne saurait être tenu 
                                    responsable des omissions, inexactitudes ou carences dans la mise à jour. L'utilisateur reconnaît utiliser 
                                    ces informations sous sa responsabilité exclusive.
                                </p>
                            </div>
                        </section>

                        {/* 7. Droit Applicable */}
                        <section id="droit" className="relative">
                            <div className="absolute -left-3 h-full w-1 bg-indigo-600 rounded-full opacity-50"></div>
                            <h2 className="text-2xl font-bold text-gray-900 mb-4 pl-4">7. Droit Applicable et Litiges</h2>
                            <div className="bg-gray-50 rounded-lg p-6 shadow-sm">
                                <p className="text-gray-700">
                                    Les présentes mentions légales sont soumises au droit marocain. Tout litige sera porté devant 
                                    les tribunaux compétents de Salé.
                                </p>
                            </div>
                        </section>

                        {/* 8. Contact */}
                        <section id="contact" className="relative">
                            <div className="absolute -left-3 h-full w-1 bg-indigo-600 rounded-full opacity-50"></div>
                            <h2 className="text-2xl font-bold text-gray-900 mb-4 pl-4">8. Contact</h2>
                            <div className="bg-gray-50 rounded-lg p-6 shadow-sm">
                                <p className="text-gray-700 mb-4">Pour toute question relative aux mentions légales, veuillez nous contacter à :</p>
                                <div className="inline-flex items-center bg-indigo-50 rounded-full px-4 py-2 text-indigo-700">
                                    <svg className="h-5 w-5 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                        <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                                        <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                                    </svg>
                                    administration@ylhcar.ma
                                </div>
                                <div className="inline-flex items-center bg-indigo-50 rounded-full px-4 py-2 text-indigo-700 mt-2 ml-2">
                                    <svg className="h-5 w-5 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                        <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                                    </svg>
                                    +212661918917
                                </div>
                            </div>
                        </section>
                    </div>

                    {/* Footer */}
                    <div className="bg-gray-50 p-6 border-t border-gray-200 text-center">
                        <div className="flex justify-center items-center space-x-2">
                            <span className="text-gray-500 text-sm">© {new Date().getFullYear()} YLH CAR. Tous droits réservés.</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </div>
        </div>
    );
};

export default MentionsLegales;