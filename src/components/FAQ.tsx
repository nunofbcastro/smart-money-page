
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
  ] : language === 'en' ? [
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
  ] : language === 'es' ? [
    {
      question: '¿Cómo funciona la sincronización bancaria?',
      answer: 'Utilizamos tecnología de Open Banking para conectar de forma segura a tus cuentas bancarias. Todos los datos están encriptados y nunca almacenamos tus credenciales bancarias.'
    },
    {
      question: '¿Están seguros mis datos?',
      answer: 'Sí, utilizamos encriptación de nivel bancario y seguimos todas las normas de seguridad GDPR. Tus datos nunca se comparten con terceros sin tu consentimiento.'
    },
    {
      question: '¿Puedo cancelar mi suscripción en cualquier momento?',
      answer: 'Sí, puedes cancelar tu suscripción en cualquier momento a través de la configuración de tu cuenta. No hay tarifas de cancelación ni penalizaciones.'
    },
    {
      question: '¿Qué bancos son compatibles?',
      answer: 'Admitimos los principales bancos portugueses incluyendo CGD, BCP, Santander, BPI, Novo Banco y muchos otros. La lista está en constante expansión.'
    },
    {
      question: '¿Hay una aplicación móvil?',
      answer: 'Sí, tenemos aplicaciones nativas para iOS y Android con todas las características de la versión web. Puedes descargar desde la App Store o Google Play.'
    },
    {
      question: '¿Cómo funciona el soporte al cliente?',
      answer: 'Ofrecemos soporte por correo electrónico para todos los usuarios, chat en vivo para usuarios Premium, y soporte telefónico para usuarios Business.'
    }
  ] : [
    {
      question: 'Comment fonctionne la synchronisation bancaire?',
      answer: 'Nous utilisons la technologie Open Banking pour vous connecter en toute sécurité à vos comptes bancaires. Toutes les données sont cryptées et nous ne stockons jamais vos identifiants bancaires.'
    },
    {
      question: 'Mes données sont-elles sécurisées?',
      answer: 'Oui, nous utilisons un cryptage de niveau bancaire et suivons toutes les normes de sécurité GDPR. Vos données ne sont jamais partagées avec des tiers sans votre consentement.'
    },
    {
      question: 'Puis-je annuler mon abonnement à tout moment?',
      answer: 'Oui, vous pouvez annuler votre abonnement à tout moment via les paramètres de votre compte. Il n\'y a pas de frais d\'annulation ni de pénalités.'
    },
    {
      question: 'Quelles banques sont prises en charge?',
      answer: 'Nous supportons les principales banques portugaises y compris CGD, BCP, Santander, BPI, Novo Banco et bien d\'autres. La liste est en constante expansion.'
    },
    {
      question: 'Y a-t-il une application mobile?',
      answer: 'Oui, nous avons des applications natives pour iOS et Android avec toutes les fonctionnalités de la version web. Vous pouvez télécharger depuis l\'App Store ou Google Play.'
    },
    {
      question: 'Comment fonctionne le support client?',
      answer: 'Nous offrons un support par email pour tous les utilisateurs, un chat en direct pour les utilisateurs Premium, et un support téléphonique pour les utilisateurs Business.'
    }
  ];

  return (
    <section id="faq" className="py-20 bg-muted/50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            {t('faqTitle')}
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            {t('faqDescription')}
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem 
                key={index} 
                value={`item-${index}`}
                className="bg-card rounded-lg border border-border px-6"
              >
                <AccordionTrigger className="text-left font-semibold text-foreground hover:text-primary">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground pb-6">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        {/* Contact CTA */}
        <div className="mt-16 text-center">
          <p className="text-muted-foreground mb-4">
            {t('stillHaveQuestions')}
          </p>
          <Button 
            variant="outline"
            className="border-primary text-primary hover:bg-primary hover:text-white"
          >
            {t('contactUs')}
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
