import React, { useState } from 'react';
import {
  LayoutDashboard,
  Bot,
  BookOpen,
  MessageSquare,
  Users,
  BarChart3,
  HelpCircle,
  ThumbsUp,
  Sliders,
  Code,
  CreditCard,
  Settings,
  ChevronRight,
  Menu,
  X,
  Sparkles,
  ExternalLink,
  LifeBuoy,
} from 'lucide-react';
import {
  User,
  Workspace,
  Agent,
  WidgetSettings,
  KnowledgeSource,
  Conversation,
  Customer,
  AnalyticsSummary,
} from '../types';

import { OverviewView } from './views/OverviewView';
import { AgentBuilderView } from './views/AgentBuilderView';
import { KnowledgeBaseView } from './views/KnowledgeBaseView';
import { ConversationsView } from './views/ConversationsView';
import { CustomersView } from './views/CustomersView';
import { AnalyticsView } from './views/AnalyticsView';
import { UnansweredQuestionsView } from './views/UnansweredQuestionsView';
import { FeedbackPortalView } from './views/FeedbackPortalView';
import { IntegrationsView } from './views/IntegrationsView';
import { BillingView } from './views/BillingView';
import { SettingsView } from './views/SettingsView';

interface DashboardProps {
  user: User | null;
  workspace: Workspace;
  agent: Agent;
  widgetSettings: WidgetSettings;
  knowledgeSources: KnowledgeSource[];
  conversations: Conversation[];
  customers: Customer[];
  analytics: AnalyticsSummary;
  activeSubView: string;
  setActiveSubView: (view: string) => void;
  onRefreshData: () => void;
  onOpenTestChat: () => void;
  onUpdateAgent: (agent: Agent, settings: WidgetSettings) => void;
  onPlanUpdated: (plan: string, usage: any) => void;
}

export const Dashboard: React.FC<DashboardProps> = ({
  user,
  workspace,
  agent,
  widgetSettings,
  knowledgeSources,
  conversations,
  customers,
  analytics,
  activeSubView,
  setActiveSubView,
  onRefreshData,
  onOpenTestChat,
  onUpdateAgent,
  onPlanUpdated,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selectedConversationId, setSelectedConversationId] = useState<string | undefined>(
    conversations[0]?.id
  );

  const waitingForHumanCount = conversations.filter((c) => c.status === 'waiting_human').length;
  const usagePercent = Math.min(
    100,
    Math.round((workspace.usage.aiMessages / workspace.usage.maxMessages) * 100)
  );

  const navGroups = [
    {
      group: 'Main Menu',
      items: [
        { id: 'overview', label: 'Overview', icon: LayoutDashboard },
        { id: 'agent_builder', label: 'AI Agent Customizer', icon: Bot },
        {
          id: 'knowledge',
          label: 'Knowledge Base (RAG)',
          icon: BookOpen,
          badge: `${knowledgeSources.length} docs`,
          badgeColor: 'bg-indigo-500/30 text-indigo-200',
        },
        {
          id: 'conversations',
          label: 'Live Chat Desk',
          icon: MessageSquare,
          badge: waitingForHumanCount > 0 ? `${waitingForHumanCount} alert` : undefined,
          badgeColor: 'bg-amber-500/30 text-amber-200 font-bold',
        },
      ],
    },
    {
      group: 'Intelligence & Feedback',
      items: [
        {
          id: 'unanswered',
          label: 'Unanswered Questions',
          icon: HelpCircle,
          badge: '3 missing',
          badgeColor: 'bg-rose-500/30 text-rose-200',
        },
        {
          id: 'feedback_portal',
          label: 'Feedback & Priorities',
          icon: ThumbsUp,
          badge: 'AI Matrix',
          badgeColor: 'bg-indigo-500 text-white font-bold',
        },
        { id: 'customers', label: 'Customers CRM', icon: Users },
        { id: 'analytics', label: 'Analytics & CSAT', icon: BarChart3 },
      ],
    },
    {
      group: 'Workspace & Setup',
      items: [
        { id: 'integrations', label: 'Widget & Shopify', icon: Code },
        { id: 'billing', label: 'Billing & Plans', icon: CreditCard },
        { id: 'settings', label: 'Settings', icon: Settings },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-[#F1F5F9] flex flex-col md:flex-row font-sans">
      {/* Mobile Header Bar */}
      <div className="md:hidden flex items-center justify-between bg-[#1E293B] border-b border-slate-800 px-4 py-3 sticky top-16 z-30">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 bg-indigo-500 rounded-md flex items-center justify-center text-white">
            <Bot className="w-4 h-4" />
          </div>
          <span className="font-bold text-white text-sm">{workspace.name}</span>
          <span className="text-[10px] bg-indigo-900/60 text-indigo-300 border border-indigo-700/60 px-2 py-0.5 rounded font-semibold uppercase">
            {workspace.plan}
          </span>
        </div>
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="p-1.5 rounded-lg border border-slate-700 text-slate-300 hover:bg-slate-800"
        >
          {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* High Density Left Sidebar Navigation */}
      <aside
        className={`w-full md:w-60 bg-[#1E293B] border-r border-slate-800 shrink-0 md:sticky md:top-16 md:h-[calc(100vh-64px)] flex flex-col justify-between overflow-y-auto ${
          mobileMenuOpen ? 'block' : 'hidden md:flex'
        }`}
      >
        <div className="p-3 space-y-4">
          {/* Workspace Status in Dark Sidebar */}
          <div className="px-2 pt-2 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 bg-indigo-500 rounded-lg flex items-center justify-center text-white shadow-xs">
                <Bot className="w-4 h-4" />
              </div>
              <div className="truncate">
                <div className="font-bold text-white text-xs truncate">{workspace.name}</div>
                <div className="text-[10px] text-slate-400 truncate">{workspace.website || 'supportai.io'}</div>
              </div>
            </div>
            <span className="text-[10px] font-bold text-indigo-400 bg-indigo-950/80 border border-indigo-800/80 px-1.5 py-0.5 rounded uppercase">
              {workspace.plan}
            </span>
          </div>

          {/* Grouped Nav Items */}
          <nav className="space-y-4">
            {navGroups.map((grp, gIdx) => (
              <div key={gIdx} className="space-y-0.5">
                <div className="text-slate-400 text-[10px] uppercase font-bold tracking-wider px-3 pt-1 pb-1">
                  {grp.group}
                </div>
                {grp.items.map((item) => {
                  const Icon = item.icon;
                  const isActive = activeSubView === item.id;

                  return (
                    <button
                      key={item.id}
                      onClick={() => {
                        setActiveSubView(item.id);
                        setMobileMenuOpen(false);
                      }}
                      className={`w-full flex items-center justify-between px-3 py-2 rounded-md text-xs transition ${
                        isActive
                          ? 'bg-indigo-600 text-white font-semibold shadow-xs'
                          : 'text-slate-300 hover:bg-slate-800 hover:text-white font-medium'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <Icon
                          className={`h-4 w-4 ${isActive ? 'text-white' : 'text-slate-400'}`}
                        />
                        <span>{item.label}</span>
                      </div>

                      {item.badge && (
                        <span
                          className={`text-[10px] px-1.5 py-0.2 rounded font-medium ${
                            isActive
                              ? 'bg-white/25 text-white'
                              : item.badgeColor || 'bg-slate-700 text-slate-300'
                          }`}
                        >
                          {item.badge}
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            ))}
          </nav>
        </div>

        {/* Sidebar Footer: High Density Usage Card & Quick Action */}
        <div className="pt-2">
          {/* Plan Usage Box */}
          <div className="p-3.5 bg-slate-900 mx-3 mb-3 rounded-xl border border-slate-800/80">
            <div className="text-[10px] text-indigo-400 font-bold uppercase mb-1 flex justify-between items-center">
              <span>{workspace.plan} Plan</span>
              <span className="text-white font-bold">{usagePercent}%</span>
            </div>
            <div className="w-full bg-slate-700 h-1 rounded-full mb-2 overflow-hidden">
              <div
                className="bg-indigo-500 h-full rounded-full transition-all duration-500"
                style={{ width: `${usagePercent}%` }}
              />
            </div>
            <div className="text-[11px] text-slate-400 flex justify-between">
              <span>
                {workspace.usage.aiMessages.toLocaleString()} / {workspace.usage.maxMessages.toLocaleString()} msgs
              </span>
            </div>
          </div>

          {/* Quick Launch Test Chat */}
          <div className="p-3 border-t border-slate-800 bg-[#162032] space-y-2">
            <div className="flex items-center justify-between text-xs px-1">
              <div className="flex items-center gap-1.5">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
                <span className="font-semibold text-slate-300 text-[11px]">{agent.name}: Online</span>
              </div>
              <span className="text-[10px] text-emerald-400 font-medium">RAG Ready</span>
            </div>

            <button
              onClick={onOpenTestChat}
              className="w-full flex items-center justify-center gap-2 rounded-md border border-slate-700 bg-slate-800 hover:bg-slate-700/90 py-1.5 text-xs font-semibold text-white shadow-2xs transition"
            >
              <MessageSquare className="h-3.5 w-3.5 text-indigo-400" />
              Test Chat Widget
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content View Area */}
      <main className="flex-1 p-4 sm:p-6 lg:p-7 max-w-7xl mx-auto w-full overflow-x-hidden">
        {activeSubView === 'overview' && (
          <OverviewView
            analytics={analytics}
            recentConversations={conversations}
            workspace={workspace}
            agent={agent}
            onNavigate={(v) => setActiveSubView(v)}
            onSelectConversation={(id) => {
              setSelectedConversationId(id);
              setActiveSubView('conversations');
            }}
            onOpenTestChat={onOpenTestChat}
          />
        )}

        {activeSubView === 'agent_builder' && (
          <AgentBuilderView
            agent={agent}
            widgetSettings={widgetSettings}
            onUpdate={onUpdateAgent}
          />
        )}

        {activeSubView === 'knowledge' && (
          <KnowledgeBaseView sources={knowledgeSources} onRefresh={onRefreshData} />
        )}

        {activeSubView === 'conversations' && (
          <ConversationsView
            conversations={conversations}
            selectedConversationId={selectedConversationId}
            onSelectConversation={(id) => setSelectedConversationId(id)}
            currentUser={user}
            onRefresh={onRefreshData}
          />
        )}

        {activeSubView === 'unanswered' && (
          <UnansweredQuestionsView onKnowledgeUpdated={onRefreshData} />
        )}

        {activeSubView === 'feedback_portal' && <FeedbackPortalView />}

        {activeSubView === 'customers' && (
          <CustomersView
            customers={customers}
            onOpenCustomerChat={() => setActiveSubView('conversations')}
          />
        )}

        {activeSubView === 'analytics' && <AnalyticsView analytics={analytics} />}

        {activeSubView === 'integrations' && (
          <IntegrationsView agent={agent} widgetSettings={widgetSettings} />
        )}

        {activeSubView === 'billing' && (
          <BillingView workspace={workspace} onPlanUpdated={onPlanUpdated} />
        )}

        {activeSubView === 'settings' && (
          <SettingsView workspace={workspace} currentUser={user} />
        )}
      </main>
    </div>
  );
};
