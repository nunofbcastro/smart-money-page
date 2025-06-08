
import React from 'react';
import { Facebook, Twitter, Linkedin, Instagram, Mail, Phone, MapPin } from 'lucide-react';
import { useLanguage } from './LanguageContext';

const Footer = () => {
  const { t, language, setLanguage } = useLanguage();

  return (
    <footer className="bg-dark text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main footer content */}
        <div className="py-16">
          <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-8">
            {/* Brand */}
            <div className="lg:col-span-1">
              <div className="flex items-center space-x-2 mb-6">
                <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-lg">€</span>
                </div>
                <span className="text-xl font-bold">Gestão de Finanças</span>
              </div>
              <p className="text-gray-400 mb-6">
                A plataforma mais completa para gestão financeira pessoal e empresarial em Portugal.
              </p>
              
              {/* Social Links */}
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-primary transition-colors">
                  <Facebook className="w-5 h-5" />
                </a>
                <a href="#" className="text-gray-400 hover:text-primary transition-colors">
                  <Twitter className="w-5 h-5" />
                </a>
                <a href="#" className="text-gray-400 hover:text-primary transition-colors">
                  <Linkedin className="w-5 h-5" />
                </a>
                <a href="#" className="text-gray-400 hover:text-primary transition-colors">
                  <Instagram className="w-5 h-5" />
                </a>
              </div>
            </div>

            {/* Product */}
            <div>
              <h4 className="font-semibold mb-6">Produto</h4>
              <ul className="space-y-3 text-gray-400">
                <li><a href="#features" className="hover:text-primary transition-colors">Funcionalidades</a></li>
                <li><a href="#pricing" className="hover:text-primary transition-colors">Preços</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">API</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Integrações</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Segurança</a></li>
              </ul>
            </div>

            {/* Support */}
            <div>
              <h4 className="font-semibold mb-6">Suporte</h4>
              <ul className="space-y-3 text-gray-400">
                <li><a href="#faq" className="hover:text-primary transition-colors">FAQ</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Centro de Ajuda</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Documentação</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Estado do Sistema</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Reportar Bug</a></li>
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4 className="font-semibold mb-6">Contacto</h4>
              <div className="space-y-4 text-gray-400">
                <div className="flex items-center space-x-3">
                  <Mail className="w-5 h-5 text-primary" />
                  <span>ola@gestaofinancas.pt</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Phone className="w-5 h-5 text-primary" />
                  <span>+351 210 123 456</span>
                </div>
                <div className="flex items-center space-x-3">
                  <MapPin className="w-5 h-5 text-primary" />
                  <span>Lisboa, Portugal</span>
                </div>
              </div>

              {/* Language Toggle */}
              <div className="mt-6">
                <button
                  onClick={() => setLanguage(language === 'pt' ? 'en' : 'pt')}
                  className="flex items-center space-x-2 text-gray-400 hover:text-primary transition-colors"
                >
                  <span>🌐</span>
                  <span>{language === 'pt' ? 'English' : 'Português'}</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-gray-800 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-gray-400 text-sm">
              {t('copyright')}
            </p>
            
            <div className="flex space-x-6 text-sm text-gray-400">
              <a href="#" className="hover:text-primary transition-colors">
                {t('terms')}
              </a>
              <a href="#" className="hover:text-primary transition-colors">
                {t('privacy')}
              </a>
              <a href="#" className="hover:text-primary transition-colors">
                Cookies
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
