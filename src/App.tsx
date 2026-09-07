import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { LandingPage } from './components/LandingPage';
import { Dashboard } from './components/Dashboard';
import { FeedbackPortalView } from './components/views/FeedbackPortalView';
import { ChatWidget } from './components/ChatWidget';
import { AuthModal } from './components/AuthModal';
import { OnboardingModal } from './components/OnboardingModal';
import { api } from './services/api';
import {
  DEMO_USER,
  DEMO_WORKSPACE,
  DEMO_AGENT,
  DEMO_WIDGET_SETTINGS,
  DEMO_KNOWLEDGE_SOURCES,
  DEMO_CONVERSATIONS,
  DEMO_CUSTOMERS,
  DEMO_ANALYTICS,
} from './data/demoData';
import {
  User,
  Workspace,
  Agent,
  WidgetSettings,
  KnowledgeSource,
  Conversation,
  Customer,
  AnalyticsSummary,
} from './types';
import { Bot, RefreshCw } from 'lucide-react';

export default function App() {
  const [currentView, setCurrentView] = useState<'landing' | 'dashboard' | 'feedback_portal'>('landing');
  const [activeSubView, setActiveSubView] = useState<string>('overview');

  // Core Data States with solid demo fallbacks
  const [user, setUser] = useState<User | null>(DEMO_USER);
  const [workspace, setWorkspace] = useState<Workspace>(DEMO_WORKSPACE);
  const [agent, setAgent] = useState<Agent>(DEMO_AGENT);
  const [widgetSettings, setWidgetSettings] = useState<WidgetSettings>(DEMO_WIDGET_SETTINGS);
  const [knowledgeSources, setKnowledgeSources] = useState<KnowledgeSource[]>(DEMO_KNOWLEDGE_SOURCES);
  const [conversations, setConversations] = useState<Conversation[]>(DEMO_CONVERSATIONS);
  const [customers, setCustomers] = useState<Customer[]>(DEMO_CUSTOMERS);
  const [analytics, setAnalytics] = useState<AnalyticsSummary>(DEMO_ANALYTICS);

  // Modals & Chat Widget States
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isOnboardingOpen, setIsOnboardingOpen] = useState(false);
  const [isWidgetOpen, setIsWidgetOpen] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);

  useEffect(() => {
    loadAllData();
  }, []);

  const loadAllData = async () => {
    try {
      const [authRes, agentRes, knowRes, convRes, custRes, analRes] = await Promise.allSettled([
        api.getMe(),
        api.getAgent(),
        api.getKnowledge(),
        api.getConversations(),
        api.getCustomers(),
        api.getAnalytics(),
      ]);

      if (authRes.status === 'fulfilled' && authRes.value.user) {
        setUser(authRes.value.user);
        setWorkspace(authRes.value.workspace);
      }
      if (agentRes.status === 'fulfilled' && agentRes.value.agent) {
        setAgent(agentRes.value.agent);
        setWidgetSettings(agentRes.value.widgetSettings);
      }
      if (knowRes.status === 'fulfilled' && knowRes.value.sources) {
        setKnowledgeSources(knowRes.value.sources);
      }
      if (convRes.status === 'fulfilled' && convRes.value.conversations) {
        setConversations(convRes.value.conversations);
      }
      if (custRes.status === 'fulfilled' && custRes.value.customers) {
        setCustomers(custRes.value.customers);
      }
      if (analRes.status === 'fulfilled' && analRes.value.analytics) {
        setAnalytics(analRes.value.analytics);
      }
    } catch (e) {
      console.warn('Backend load warning, using initial state:', e);
    } finally {
      setInitialLoading(false);
    }
  };

  const handleUpdateAgent = (newAgent: Agent, newSettings: WidgetSettings) => {
    setAgent(newAgent);
    setWidgetSettings(newSettings);
  };

  const handlePlanUpdated = (plan: string, usage: any) => {
    setWorkspace((prev) => ({
      ...prev,
      plan: plan as any,
      usage: usage || prev.usage,
    }));
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans antialiased selection:bg-blue-600 selection:text-white">
      {/* Persistent Global Navbar */}
      <Navbar
        currentView={currentView}
        setCurrentView={(v) => setCurrentView(v as any)}
        user={user}
        workspace={workspace}
        onOpenAuth={() => setIsAuthOpen(true)}
        onOpenOnboarding={() => setIsOnboardingOpen(true)}
        onToggleChatWidget={() => setIsWidgetOpen(!isWidgetOpen)}
        isWidgetOpen={isWidgetOpen}
      />

      {/* Main Views Container */}
      <div className="flex-1">
        {currentView === 'landing' && (
          <LandingPage
            agent={agent}
            widgetSettings={widgetSettings}
            onStartFree={() => setIsOnboardingOpen(true)}
            onOpenDashboard={() => setCurrentView('dashboard')}
            onOpenFeedbackPortal={() => setCurrentView('feedback_portal')}
          />
        )}

        {currentView === 'dashboard' && (
          <Dashboard
            user={user}
            workspace={workspace}
            agent={agent}
            widgetSettings={widgetSettings}
            knowledgeSources={knowledgeSources}
            conversations={conversations}
            customers={customers}
            analytics={analytics}
            activeSubView={activeSubView}
            setActiveSubView={setActiveSubView}
            onRefreshData={loadAllData}
            onOpenTestChat={() => setIsWidgetOpen(true)}
            onUpdateAgent={handleUpdateAgent}
            onPlanUpdated={handlePlanUpdated}
          />
        )}

        {currentView === 'feedback_portal' && (
          <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
            <div className="mb-4 flex items-center justify-between">
              <button
                onClick={() => setCurrentView('dashboard')}
                className="text-xs font-semibold text-blue-600 hover:underline"
              >
                ← Back to SaaS Dashboard
              </button>
            </div>
            <FeedbackPortalView />
          </div>
        )}
      </div>

      {/* Floating Customer Chat Widget (Live RAG & Escalation Sandbox) */}
      <ChatWidget
        agent={agent}
        settings={widgetSettings}
        isOpen={isWidgetOpen}
        onClose={() => setIsWidgetOpen(false)}
      />

      {/* Authentication Modal */}
      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
        onSuccess={(newUser, newWorkspace) => {
          setUser(newUser);
          setWorkspace(newWorkspace);
          setCurrentView('dashboard');
        }}
      />

      {/* 5-Step AI Agent Onboarding Modal */}
      <OnboardingModal
        isOpen={isOnboardingOpen}
        onClose={() => setIsOnboardingOpen(false)}
        onComplete={(newWorkspace, newAgent) => {
          setWorkspace(newWorkspace);
          setAgent(newAgent);
          setCurrentView('dashboard');
        }}
        onOpenTestChat={() => {
          setIsWidgetOpen(true);
        }}
      />
    </div>
  );
}
