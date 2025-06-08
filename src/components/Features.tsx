
import React from 'react';
import { Zap, BarChart3, Target, GraduationCap } from 'lucide-react';
import { useLanguage } from './LanguageContext';

const Features = () => {
  const { t } = useLanguage();

  const features = [
    {
      icon: Zap,
      title: t('automationTitle'),
      description: t('automationDesc'),
      color: 'from-yellow-400 to-orange-500'
    },
    {
      icon: BarChart3,
      title: t('analysisTitle'),
      description: t('analysisDesc'),
      color: 'from-blue-400 to-purple-500'
    },
    {
      icon: Target,
      title: t('planningTitle'),
      description: t('planningDesc'),
      color: 'from-green-400 to-blue-500'
    },
    {
      icon: GraduationCap,
      title: t('educationTitle'),
      description: t('educationDesc'),
      color: 'from-purple-400 to-pink-500'
    }
  ];

  return (
    <section id="features" className="py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-dark mb-4">
            {t('featuresTitle')}
          </h2>
          <p className="text-xl text-gray-600">
            Descobre as funcionalidades que vão transformar a tua gestão financeira
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="group relative overflow-hidden bg-white rounded-2xl border border-gray-100 p-8 hover:shadow-2xl transition-all duration-500 hover:-translate-y-2"
            >
              {/* Background gradient on hover */}
              <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}></div>
              
              <div className="relative z-10">
                <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br ${feature.color} mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <feature.icon className="w-8 h-8 text-white" />
                </div>
                
                <h3 className="text-2xl font-bold text-dark mb-4 group-hover:text-primary transition-colors">
                  {feature.title}
                </h3>
                
                <p className="text-gray-600 text-lg leading-relaxed">
                  {feature.description}
                </p>

                {/* Arrow indicator */}
                <div className="mt-6 flex items-center text-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span className="text-sm font-medium">Saber mais</span>
                  <svg className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Feature highlight */}
        <div className="mt-20 bg-gradient-to-r from-primary to-primary-dark rounded-2xl p-8 md:p-12 text-white text-center">
          <h3 className="text-2xl md:text-3xl font-bold mb-4">
            Tudo num só lugar
          </h3>
          <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
            Não precisas de múltiplas apps. A nossa plataforma integra todas as ferramentas essenciais para a tua gestão financeira.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <span className="bg-white/20 rounded-full px-4 py-2 text-sm">Dashboard Unificado</span>
            <span className="bg-white/20 rounded-full px-4 py-2 text-sm">Sincronização Bancária</span>
            <span className="bg-white/20 rounded-full px-4 py-2 text-sm">Relatórios Automáticos</span>
            <span className="bg-white/20 rounded-full px-4 py-2 text-sm">Alertas Inteligentes</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
