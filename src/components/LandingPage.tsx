import React, { useState } from 'react';
import {
  Bot,
  Zap,
  ShieldCheck,
  Headphones,
  ArrowRight,
  Check,
  Sparkles,
  Search,
  BookOpen,
  MessageSquare,
  Users,
  BarChart3,
  Globe2,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  Store,
  Layers,
  ThumbsUp,
} from 'lucide-react';
import { Agent, WidgetSettings } from '../types';
import { ChatWidget } from './ChatWidget';

interface LandingPageProps {
  onStartFree: () => void;
  onOpenDashboard: () => void;
  onOpenFeedbackPortal: () => void;
  agent: Agent;
  widgetSettings: WidgetSettings;
}

export const LandingPage: React.FC<LandingPageProps> = ({
  onStartFree,
  onOpenDashboard,
  onOpenFeedbackPortal,
  agent,
  widgetSettings,
}) => {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly');

  const faqs = [
    {
      q: 'How does SupportAI learn my business knowledge?',
      a: 'You can upload documents (PDF, TXT, DOCX), connect website URLs for automatic crawling, or enter FAQs and custom text. Our RAG engine extracts, chunks, and semantically indexes your data so the AI agent only answers with verified facts.',
    },
    {
      q: 'What happens if a customer asks a question the AI does not know?',
      a: 'SupportAI is strictly configured to never hallucinate. When confidence is low or specific company data is absent, the agent transparently offers to connect the customer with your human team, marks the ticket for escalation, and adds the query to your Unanswered Questions backlog.',
    },
    {
      q: 'Can human agents take over conversations in real time?',
      a: 'Yes! The Conversations dashboard provides a live human agent desk. When a conversation is escalated or requires personal attention, your support staff can step in and reply directly to the customer in the same chat window.',
    },
    {
      q: 'How do I install the chat widget on my website?',
      a: 'You can copy and paste a simple 2-line JavaScript snippet into your website header or footer. It works with Shopify, WordPress, Webflow, React, Next.js, Squarespace, and custom HTML.',
    },
    {
      q: 'Can customers submit product feedback and feature requests?',
      a: 'Yes! SupportAI includes a dedicated Feedback Portal with built-in AI categorization and automated prioritization that organizes user ideas and pain points by sentiment urgency and recurring request patterns.',
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      {/* 1. HERO SECTION */}
      <section className="relative overflow-hidden pt-12 pb-20 lg:pt-20 lg:pb-28 bg-white border-b border-slate-200">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Copy */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50/70 px-3.5 py-1 text-xs font-semibold text-blue-700">
                <Sparkles className="h-3.5 w-3.5 text-blue-600" />
                <span>Next-Gen Customer Support AI SaaS</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 leading-[1.1]">
                Turn Customer Questions Into{' '}
                <span className="text-blue-600 underline decoration-blue-300 decoration-wavy decoration-2">
                  Instant Answers
                </span>
                .
              </h1>

              <p className="text-lg sm:text-xl text-slate-600 max-w-2xl mx-auto lg:mx-0 font-normal leading-relaxed">
                Your AI support agent learns your business, answers customers 24/7, and sends complex
                conversations to your team.
              </p>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 pt-2">
                <button
                  onClick={onStartFree}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-6 py-3.5 text-base font-semibold text-white shadow-md hover:bg-blue-700 transition"
                >
                  Start Free Trial
                  <ArrowRight className="h-4 w-4" />
                </button>
                <button
                  onClick={onOpenDashboard}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white px-6 py-3.5 text-base font-semibold text-slate-700 shadow-xs hover:bg-slate-50 transition"
                >
                  Explore Dashboard
                </button>
                <button
                  onClick={onOpenFeedbackPortal}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl border border-indigo-200 bg-indigo-50/70 px-5 py-3.5 text-base font-semibold text-indigo-700 shadow-xs hover:bg-indigo-100 transition"
                >
                  <ThumbsUp className="h-4 w-4" />
                  Feedback Portal
                </button>
              </div>

              {/* Trust Indicators */}
              <div className="pt-4 flex flex-wrap items-center justify-center lg:justify-start gap-y-2 gap-x-6 text-xs text-slate-500">
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                  <span>No credit card required</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                  <span>3-minute setup</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                  <span>Anti-hallucination RAG</span>
                </div>
              </div>
            </div>

            {/* Right Interactive Preview */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="w-full max-w-md">
                <div className="text-center mb-3">
                  <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 bg-slate-100 px-3 py-1 rounded-full border border-slate-200">
                    Live Widget Sandbox
                  </span>
                </div>
                {/* Standalone embedded widget */}
                <ChatWidget
                  agent={agent}
                  settings={widgetSettings}
                  isOpen={true}
                  onClose={() => {}}
                  standalone={true}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. HOW IT WORKS */}
      <section className="py-20 bg-slate-50 border-b border-slate-200">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-xs font-bold uppercase tracking-wider text-blue-600 mb-2">
              Simple 4-Step Workflow
            </h2>
            <p className="text-3xl font-extrabold text-slate-900 sm:text-4xl">
              From business knowledge to live 24/7 customer care in minutes.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs relative">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-100 text-blue-600 font-bold text-lg mb-4">
                1
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">Add Knowledge Sources</h3>
              <p className="text-sm text-slate-600">
                Paste your website URL, upload PDFs/DOCs, or enter FAQs. SupportAI automatically
                chunks and indexes verified facts.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs relative">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-100 text-indigo-600 font-bold text-lg mb-4">
                2
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">Configure AI Agent</h3>
              <p className="text-sm text-slate-600">
                Choose personality (Friendly, Professional, Concise), set greeting messages, and
                define custom escalation triggers.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs relative">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-100 text-emerald-600 font-bold text-lg mb-4">
                3
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">Install Chat Widget</h3>
              <p className="text-sm text-slate-600">
                Embed a lightweight script tag on your website or Shopify store. Customize theme
                colors and branding.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs relative">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-amber-100 text-amber-600 font-bold text-lg mb-4">
                4
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">Automate & Escalate</h3>
              <p className="text-sm text-slate-600">
                AI resolves 85%+ of tickets automatically. Complex or sensitive cases seamlessly
                transfer to your human team.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. CORE VALUE PILLARS & FEATURES */}
      <section className="py-20 bg-white border-b border-slate-200">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-xs font-bold uppercase tracking-wider text-blue-600 mb-2">
              Engineered for Real Businesses
            </h2>
            <p className="text-3xl font-extrabold text-slate-900 sm:text-4xl">
              Everything required to deliver reliable, accurate support.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 rounded-2xl border border-slate-200 bg-slate-50/60 hover:bg-white hover:shadow-sm transition">
              <div className="h-10 w-10 rounded-xl bg-blue-600 text-white flex items-center justify-center mb-4">
                <ShieldCheck className="h-5 w-5" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">Zero-Hallucination RAG</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                The agent only speaks from verified business knowledge. If information is missing,
                it transparently offers human help rather than inventing answers.
              </p>
            </div>

            <div className="p-6 rounded-2xl border border-slate-200 bg-slate-50/60 hover:bg-white hover:shadow-sm transition">
              <div className="h-10 w-10 rounded-xl bg-indigo-600 text-white flex items-center justify-center mb-4">
                <Headphones className="h-5 w-5" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">Real-Time Human Handover</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                When a customer asks for a person, or expresses frustration, the ticket transfers
                to your operator desk where agents take over the live chat.
              </p>
            </div>

            <div className="p-6 rounded-2xl border border-slate-200 bg-slate-50/60 hover:bg-white hover:shadow-sm transition">
              <div className="h-10 w-10 rounded-xl bg-amber-600 text-white flex items-center justify-center mb-4">
                <Search className="h-5 w-5" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">Unanswered Questions AI</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Automatically identifies queries the AI couldn't answer, aggregates frequency, and
                gives you a 1-click button to enrich your knowledge base.
              </p>
            </div>

            <div className="p-6 rounded-2xl border border-slate-200 bg-slate-50/60 hover:bg-white hover:shadow-sm transition">
              <div className="h-10 w-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center mb-4">
                <ThumbsUp className="h-5 w-5" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">Dedicated Feedback Portal</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Invite customers to suggest features and report issues. AI automatically analyzes
                sentiment and prioritizes development based on recurring patterns.
              </p>
            </div>

            <div className="p-6 rounded-2xl border border-slate-200 bg-slate-50/60 hover:bg-white hover:shadow-sm transition">
              <div className="h-10 w-10 rounded-xl bg-purple-600 text-white flex items-center justify-center mb-4">
                <Store className="h-5 w-5" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">Shopify & Webhook Ready</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Simulate or connect order status lookups, tracking codes, and inventory queries
                directly inside customer chat.
              </p>
            </div>

            <div className="p-6 rounded-2xl border border-slate-200 bg-slate-50/60 hover:bg-white hover:shadow-sm transition">
              <div className="h-10 w-10 rounded-xl bg-rose-600 text-white flex items-center justify-center mb-4">
                <BarChart3 className="h-5 w-5" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">CSAT & Resolution Metrics</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Track AI resolution rates, escalation volume, customer satisfaction, and message
                usage trends in real-time.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. TARGET USE CASES */}
      <section className="py-20 bg-slate-50 border-b border-slate-200">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-xs font-bold uppercase tracking-wider text-blue-600 mb-2">
              Tailored For Your Business Model
            </h2>
            <p className="text-3xl font-extrabold text-slate-900 sm:text-4xl">
              Who uses SupportAI to scale customer delight?
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-2xl border border-slate-200">
              <div className="text-2xl mb-3">🛍️</div>
              <h3 className="font-bold text-slate-900 mb-1">E-commerce Stores</h3>
              <p className="text-xs text-slate-600">
                Answer shipping questions, return windows, order status tracking, and product size
                recommendations 24/7.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200">
              <div className="text-2xl mb-3">💻</div>
              <h3 className="font-bold text-slate-900 mb-1">SaaS Companies</h3>
              <p className="text-xs text-slate-600">
                Resolve tier pricing questions, feature documentation lookups, API guides, and
                onboarding steps immediately.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200">
              <div className="text-2xl mb-3">📍</div>
              <h3 className="font-bold text-slate-900 mb-1">Local & Service Pros</h3>
              <p className="text-xs text-slate-600">
                Confirm operating hours, service locations, booking policies, and emergency contact
                guidelines without phone bottlenecks.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200">
              <div className="text-2xl mb-3">🚀</div>
              <h3 className="font-bold text-slate-900 mb-1">Agencies & Consultancies</h3>
              <p className="text-xs text-slate-600">
                Deploy white-labeled customer support bots across multiple client accounts with
                isolated workspaces.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. PRICING SECTION */}
      <section className="py-20 bg-white border-b border-slate-200" id="pricing">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-xs font-bold uppercase tracking-wider text-blue-600 mb-2">
              Transparent Pricing
            </h2>
            <p className="text-3xl font-extrabold text-slate-900 sm:text-4xl">
              Scale your support as your business grows.
            </p>
            <p className="text-slate-600 mt-2 text-sm">
              All plans include RAG vector knowledge base, embeddable widget, and human escalation.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {/* Free */}
            <div className="rounded-2xl border border-slate-200 bg-white p-6 flex flex-col justify-between">
              <div>
                <h3 className="font-bold text-slate-900 text-lg">Free</h3>
                <p className="text-xs text-slate-500 mt-1">For testing and personal stores</p>
                <div className="mt-4 mb-6">
                  <span className="text-3xl font-extrabold text-slate-900">$0</span>
                  <span className="text-xs text-slate-500"> / month</span>
                </div>
                <ul className="space-y-2.5 text-xs text-slate-600">
                  <li className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-emerald-600" />
                    <span>100 AI messages / mo</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-emerald-600" />
                    <span>Up to 3 Knowledge docs</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-emerald-600" />
                    <span>Standard Website Widget</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-emerald-600" />
                    <span>Basic analytics</span>
                  </li>
                </ul>
              </div>
              <button
                onClick={onStartFree}
                className="mt-6 w-full rounded-xl border border-slate-300 bg-slate-50 py-2.5 text-xs font-semibold text-slate-800 hover:bg-slate-100 transition"
              >
                Get Started
              </button>
            </div>

            {/* Starter */}
            <div className="rounded-2xl border border-slate-200 bg-white p-6 flex flex-col justify-between">
              <div>
                <h3 className="font-bold text-slate-900 text-lg">Starter</h3>
                <p className="text-xs text-slate-500 mt-1">For growing boutique businesses</p>
                <div className="mt-4 mb-6">
                  <span className="text-3xl font-extrabold text-slate-900">$19</span>
                  <span className="text-xs text-slate-500"> / month</span>
                </div>
                <ul className="space-y-2.5 text-xs text-slate-600">
                  <li className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-emerald-600" />
                    <span>1,000 AI messages / mo</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-emerald-600" />
                    <span>Up to 15 Knowledge docs</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-emerald-600" />
                    <span>Custom branding & colors</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-emerald-600" />
                    <span>Human takeover inbox</span>
                  </li>
                </ul>
              </div>
              <button
                onClick={onStartFree}
                className="mt-6 w-full rounded-xl bg-slate-900 py-2.5 text-xs font-semibold text-white hover:bg-slate-800 transition"
              >
                Start Starter Trial
              </button>
            </div>

            {/* Growth */}
            <div className="rounded-2xl border-2 border-blue-600 bg-white p-6 flex flex-col justify-between shadow-md relative">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-blue-600 text-white px-3 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider">
                Most Popular
              </div>
              <div>
                <h3 className="font-bold text-slate-900 text-lg">Growth</h3>
                <p className="text-xs text-slate-500 mt-1">For high-traffic stores & SaaS</p>
                <div className="mt-4 mb-6">
                  <span className="text-3xl font-extrabold text-blue-600">$49</span>
                  <span className="text-xs text-slate-500"> / month</span>
                </div>
                <ul className="space-y-2.5 text-xs text-slate-600">
                  <li className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-blue-600" />
                    <span className="font-semibold text-slate-900">5,000 AI messages / mo</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-blue-600" />
                    <span>Up to 50 Knowledge docs</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-blue-600" />
                    <span>Shopify order lookup hook</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-blue-600" />
                    <span>AI Unanswered Questions engine</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-blue-600" />
                    <span>Dedicated Feedback Portal</span>
                  </li>
                </ul>
              </div>
              <button
                onClick={onStartFree}
                className="mt-6 w-full rounded-xl bg-blue-600 py-2.5 text-xs font-semibold text-white hover:bg-blue-700 transition"
              >
                Start Growth Trial
              </button>
            </div>

            {/* Pro */}
            <div className="rounded-2xl border border-slate-200 bg-white p-6 flex flex-col justify-between">
              <div>
                <h3 className="font-bold text-slate-900 text-lg">Pro</h3>
                <p className="text-xs text-slate-500 mt-1">For multi-brand scale & agencies</p>
                <div className="mt-4 mb-6">
                  <span className="text-3xl font-extrabold text-slate-900">$99</span>
                  <span className="text-xs text-slate-500"> / month</span>
                </div>
                <ul className="space-y-2.5 text-xs text-slate-600">
                  <li className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-emerald-600" />
                    <span className="font-semibold">20,000 AI messages / mo</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-emerald-600" />
                    <span>200 Knowledge docs</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-emerald-600" />
                    <span>Multi-agent workspace</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-emerald-600" />
                    <span>Priority dedicated support</span>
                  </li>
                </ul>
              </div>
              <button
                onClick={onStartFree}
                className="mt-6 w-full rounded-xl border border-slate-300 bg-slate-50 py-2.5 text-xs font-semibold text-slate-800 hover:bg-slate-100 transition"
              >
                Contact Sales / Start Pro
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 6. FAQ ACCORDION */}
      <section className="py-20 bg-slate-50 border-b border-slate-200">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-xs font-bold uppercase tracking-wider text-blue-600 mb-2">FAQ</h2>
            <p className="text-3xl font-extrabold text-slate-900 sm:text-4xl">
              Frequently Asked Questions
            </p>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, index) => {
              const isOpen = openFaq === index;
              return (
                <div
                  key={index}
                  className="rounded-xl border border-slate-200 bg-white overflow-hidden shadow-2xs"
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : index)}
                    className="w-full flex items-center justify-between p-4 text-left font-semibold text-slate-900 hover:bg-slate-50 transition"
                  >
                    <span>{faq.q}</span>
                    {isOpen ? (
                      <ChevronUp className="h-4 w-4 text-slate-500 shrink-0" />
                    ) : (
                      <ChevronDown className="h-4 w-4 text-slate-500 shrink-0" />
                    )}
                  </button>
                  {isOpen && (
                    <div className="px-4 pb-4 pt-1 text-sm text-slate-600 leading-relaxed border-t border-slate-100">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 7. FINAL CTA */}
      <section className="py-20 bg-blue-600 text-white text-center">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 space-y-6">
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            Ready to give your customers instant 24/7 answers?
          </h2>
          <p className="text-lg text-blue-100 max-w-xl mx-auto">
            Set up your AI support agent in 3 minutes. Test with your own website knowledge.
          </p>
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              onClick={onStartFree}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-white px-7 py-3.5 text-base font-bold text-blue-700 shadow-md hover:bg-blue-50 transition"
            >
              Start Free Trial Now
              <ArrowRight className="h-4 w-4" />
            </button>
            <button
              onClick={onOpenDashboard}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl border border-blue-400 bg-blue-700/50 px-6 py-3.5 text-base font-semibold text-white hover:bg-blue-700 transition"
            >
              Open SaaS Dashboard
            </button>
          </div>
        </div>
      </section>

      {/* 8. FOOTER */}
      <footer className="py-12 bg-slate-900 text-slate-400 text-xs border-t border-slate-800">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="h-6 w-6 rounded-md bg-blue-600 text-white flex items-center justify-center font-bold text-xs">
              S
            </div>
            <span className="font-bold text-white text-sm">SupportAI</span>
            <span>— AI Customer Support Agent Platform</span>
          </div>
          <div>© {new Date().getFullYear()} SupportAI Inc. All rights reserved.</div>
        </div>
      </footer>
    </div>
  );
};
