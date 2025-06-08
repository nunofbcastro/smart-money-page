
import React from 'react';
import { Button } from '@/components/ui/button';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useLanguage } from './LanguageContext';

const FAQ = () => {
  const { t, language } = useLanguage();

  const faqs = language === 'pt' ? [
    {
      question: 'Como funciona a sincronização bancária?',
      answer: 'Utilizamos tecnologia de Open Banking para conectar de forma segura às tuas contas bancárias. Todos os dados são encriptados e nunca armazenamos as tuas credenciais bancárias.'
    },
    {
      question: 'Os meus dados estão seguros?',
      answer: 'Sim, utilizamos encriptação de nível bancário e seguimos todas as normas de segurança GDPR. Os teus dados nunca são partilhados com terceiros sem o teu consentimento.'
    },
    {
      question: 'Posso cancelar a subscrição a qualquer momento?',
      answer: 'Sim, podes cancelar a tua subscrição a qualquer momento através das definições da conta. Não há taxas de cancelamento ou penalizações.'
    },
    {
      question: 'Que bancos são suportados?',
      answer: 'Suportamos os principais bancos portugueses incluindo CGD, BCP, Santander, BPI, Novo Banco e muitos outros. A lista está em constante expansão.'
    },
    {
      question: 'Existe uma app móvel?',
      answer: 'Sim, temos apps nativas para iOS e Android com todas as funcionalidades da versão web. Podes descarregar na App Store ou Google Play.'
    },
    {
      question: 'Como funciona o suporte ao cliente?',
      answer: 'Oferecemos suporte por email para todos os utilizadores, chat ao vivo para utilizadores Premium, e suporte telefónico para utilizadores Business.'
    }
  ] : [
    {
      question: 'How does bank synchronization work?',
      answer: 'We use Open Banking technology to securely connect to your bank accounts. All data is encrypted and we never store your banking credentials.'
    },
    {
      question: 'Is my data secure?',
      answer: 'Yes, we use bank-level encryption and follow all GDPR security standards. Your data is never shared with third parties without your consent.'
    },
    {
      question: 'Can I cancel my subscription anytime?',
      answer: 'Yes, you can cancel your subscription anytime through your account settings. There are no cancellation fees or penalties.'
    },
    {
      question: 'Which banks are supported?',
      answer: 'We support major Portuguese banks including CGD, BCP, Santander, BPI, Novo Banco and many others. The list is constantly expanding.'
    },
    {
      question: 'Is there a mobile app?',
      answer: 'Yes, we have native apps for iOS and Android with all the features of the web version. You can download from the App Store or Google Play.'
    },
    {
      question: 'How does customer support work?',
      answer: 'We offer email support for all users, live chat for Premium users, and phone support for Business users.'
    }
  ];

  return (
    <section id="faq" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-dark mb-4">
            {t('faqTitle')}
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Respostas às perguntas mais frequentes sobre a nossa plataforma
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem 
                key={index} 
                value={`item-${index}`}
                className="bg-white rounded-lg border border-gray-200 px-6"
              >
                <AccordionTrigger className="text-left font-semibold text-dark hover:text-primary">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-gray-600 pb-6">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        {/* Contact CTA */}
        <div className="mt-16 text-center">
          <p className="text-gray-600 mb-4">
            Ainda tens dúvidas?
          </p>
          <Button 
            variant="outline"
            className="border-primary text-primary hover:bg-primary hover:text-white"
          >
            Contacta-nos
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
