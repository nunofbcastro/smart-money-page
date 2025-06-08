
import React from 'react';
import { Shield, TrendingUp, BookOpen, Users } from 'lucide-react';
import { useLanguage } from './LanguageContext';

const About = () => {
  const { t } = useLanguage();

  const highlights = [
    {
      icon: TrendingUp,
      title: 'Gestão Automática',
      description: 'Categorização inteligente de despesas'
    },
    {
      icon: BookOpen,
      title: 'Educação Financeira',
      description: 'Cursos em vídeo e conteúdo educativo'
    },
    {
      icon: Shield,
      title: 'Segurança Total',
      description: 'Os teus dados protegidos com encriptação'
    },
    {
      icon: Users,
      title: 'Suporte Dedicado',
      description: 'Equipa sempre disponível para ajudar'
    }
  ];

  return (
    <section id="about" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-dark mb-4">
            {t('aboutTitle')}
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {t('aboutDescription')}
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {highlights.map((highlight, index) => (
            <div 
              key={index}
              className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 group"
            >
              <div className="bg-gradient-primary rounded-lg w-12 h-12 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <highlight.icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-dark mb-2">
                {highlight.title}
              </h3>
              <p className="text-gray-600">
                {highlight.description}
              </p>
            </div>
          ))}
        </div>

        {/* Statistics */}
        <div className="mt-20 bg-white rounded-2xl p-8 md:p-12 shadow-lg">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold gradient-text mb-2">€2.5M+</div>
              <div className="text-gray-600">Poupanças dos Utilizadores</div>
            </div>
            <div>
              <div className="text-4xl font-bold gradient-text mb-2">50K+</div>
              <div className="text-gray-600">Transações Processadas</div>
            </div>
            <div>
              <div className="text-4xl font-bold gradient-text mb-2">24/7</div>
              <div className="text-gray-600">Monitorização Automática</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
