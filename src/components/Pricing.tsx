
import React from 'react';
import { Button } from '@/components/ui/button';
import { Check, Star } from 'lucide-react';
import { useLanguage } from './LanguageContext';

const Pricing = () => {
  const { t } = useLanguage();

  const plans = [
    {
      name: t('free'),
      price: '0',
      popular: false,
      features: [
        'Dashboard básico',
        'Categorização manual',
        'Relatórios mensais',
        'Suporte por email'
      ]
    },
    {
      name: t('premium'),
      price: '9,90',
      popular: true,
      features: [
        'Dashboard avançado',
        'Categorização automática',
        'Relatórios em tempo real',
        'Sincronização bancária',
        'Objetivos financeiros',
        'Cursos em vídeo',
        'Suporte prioritário'
      ]
    },
    {
      name: t('business'),
      price: '29,90',
      popular: false,
      features: [
        'Tudo do Premium',
        'Múltiplas empresas',
        'Fluxo de caixa avançado',
        'Relatórios personalizados',
        'API de integração',
        'Gestor de conta dedicado',
        'Suporte telefónico'
      ]
    }
  ];

  return (
    <section id="pricing" className="py-20 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            {t('pricingTitle')}
          </h2>
          <p className="text-xl text-muted-foreground">
            Planos simples e transparentes para todos os tipos de utilizadores
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {plans.map((plan, index) => (
            <div 
              key={index}
              className={`relative bg-card rounded-2xl border-2 p-8 transition-all duration-300 hover:-translate-y-2 ${
                plan.popular 
                  ? 'border-primary shadow-2xl scale-105' 
                  : 'border-border hover:border-primary/50 shadow-lg hover:shadow-xl'
              }`}
            >
              {/* Popular badge */}
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <div className="bg-gradient-primary text-white px-4 py-2 rounded-full text-sm font-medium flex items-center space-x-1">
                    <Star className="w-4 h-4" />
                    <span>{t('mostPopular')}</span>
                  </div>
                </div>
              )}

              {/* Plan header */}
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-foreground mb-4">{plan.name}</h3>
                <div className="flex items-center justify-center">
                  <span className="text-4xl font-bold text-foreground">€{plan.price}</span>
                  <span className="text-muted-foreground ml-2">{t('monthly')}</span>
                </div>
              </div>

              {/* Features */}
              <ul className="space-y-4 mb-8">
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-center">
                    <Check className="w-5 h-5 text-primary mr-3 flex-shrink-0" />
                    <span className="text-muted-foreground">{feature}</span>
                  </li>
                ))}
              </ul>

              {/* CTA Button */}
              <Button 
                className={`w-full py-4 text-lg font-semibold ${
                  plan.popular
                    ? 'bg-gradient-primary hover:bg-primary-dark text-white'
                    : 'bg-muted hover:bg-muted/80 text-foreground'
                }`}
              >
                {t('subscribe')}
              </Button>
            </div>
          ))}
        </div>

        {/* Money back guarantee */}
        <div className="mt-16 text-center">
          <div className="bg-muted/50 rounded-2xl p-8 max-w-2xl mx-auto border border-border">
            <h4 className="text-xl font-semibold text-foreground mb-4">
              Garantia de 30 dias
            </h4>
            <p className="text-muted-foreground">
              Se não ficares satisfeito com o nosso serviço, devolvemos o teu dinheiro sem questões.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Pricing;
