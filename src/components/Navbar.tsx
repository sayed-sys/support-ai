import React from 'react';
import {
  Bot,
  MessageSquare,
  Sparkles,
  LayoutDashboard,
  Layers,
  ThumbsUp,
  UserCheck,
  Zap,
  Globe,
  HelpCircle,
} from 'lucide-react';
import { User, Workspace } from '../types';

interface NavbarProps {
  currentView: string;
  setCurrentView: (view: string) => void;
  user: User | null;
  workspace: Workspace | null;
  onOpenAuth: () => void;
  onOpenOnboarding: () => void;
  onToggleChatWidget: () => void;
  isWidgetOpen: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentView,
  setCurrentView,
  user,
  workspace,
  onOpenAuth,
  onOpenOnboarding,
  onToggleChatWidget,
  isWidgetOpen,
}) => {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-200 bg-white/95 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Brand */}
        <div className="flex items-center gap-6">
          <button
            onClick={() => setCurrentView('landing')}
            className="flex items-center gap-2.5 text-left group"
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-500 text-white shadow-xs transition group-hover:bg-indigo-600">
              <Bot className="h-5 w-5" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-lg font-bold tracking-tight text-slate-900">SupportAI</span>
                <span className="rounded-md bg-indigo-50 px-1.5 py-0.2 text-[10px] font-bold text-indigo-700 border border-indigo-200">
                  SaaS
                </span>
              </div>
            </div>
          </button>

          {/* Navigation Links */}
          <nav className="hidden md:flex items-center gap-1">
            <button
              onClick={() => setCurrentView('landing')}
              className={`px-3 py-1.5 rounded-md text-xs font-medium transition ${
                currentView === 'landing'
                  ? 'bg-slate-100 text-slate-900 font-semibold'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              Overview & Features
            </button>
            <button
              onClick={() => setCurrentView('dashboard')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition ${
                currentView === 'dashboard'
                  ? 'bg-indigo-50 text-indigo-700 font-semibold'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              <LayoutDashboard className="h-3.5 w-3.5" />
              SaaS Dashboard
            </button>
            <button
              onClick={() => setCurrentView('feedback_portal')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition ${
                currentView === 'feedback_portal'
                  ? 'bg-indigo-50 text-indigo-700 font-semibold'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              <ThumbsUp className="h-3.5 w-3.5 text-indigo-600" />
              Feedback Portal
              <span className="ml-1 rounded-full bg-indigo-100 text-indigo-700 px-1.5 py-0.2 text-[9px] font-bold">
                AI Matrix
              </span>
            </button>
          </nav>
        </div>

        {/* Right CTA Actions */}
        <div className="flex items-center gap-3">
          {/* Agent Status Pill */}
          <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg">
            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-xs font-medium text-slate-600">Agent Sarah: Online</span>
          </div>

          {/* Test Widget Trigger Button */}
          <button
            onClick={onToggleChatWidget}
            className={`relative flex items-center gap-2 rounded-lg px-3 py-1.5 text-xs font-semibold transition border shadow-xs ${
              isWidgetOpen
                ? 'bg-indigo-600 text-white border-indigo-600'
                : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-50'
            }`}
          >
            <MessageSquare className="h-3.5 w-3.5 text-indigo-600" />
            <span className="hidden sm:inline">Test Chat Widget</span>
            <span className="sm:hidden">Widget</span>
          </button>

          {workspace && (
            <div className="hidden xl:flex items-center gap-2 px-2.5 py-1 rounded-lg bg-slate-50 border border-slate-200 text-xs">
              <span className="font-semibold text-slate-800">{workspace.name}</span>
              <span className="text-slate-400">•</span>
              <span className="capitalize text-indigo-600 font-medium">{workspace.plan} plan</span>
            </div>
          )}

          {user ? (
            <div className="flex items-center gap-2">
              <button
                onClick={() => setCurrentView('dashboard')}
                className="flex items-center gap-2 rounded-lg p-1 hover:bg-slate-100 transition"
              >
                {user.avatar ? (
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="h-8 w-8 rounded-full object-cover border border-slate-200"
                  />
                ) : (
                  <div className="h-8 w-8 rounded-full bg-indigo-100 border border-indigo-200 text-indigo-700 flex items-center justify-center font-bold text-xs">
                    {user.name.slice(0, 2).toUpperCase()}
                  </div>
                )}
                <div className="hidden sm:block text-left text-xs">
                  <div className="font-semibold text-slate-800">{user.name}</div>
                  <div className="text-slate-400 capitalize">{user.role}</div>
                </div>
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <button
                onClick={onOpenAuth}
                className="px-3 py-1.5 text-sm font-medium text-slate-700 hover:text-slate-900"
              >
                Log In
              </button>
              <button
                onClick={onOpenOnboarding}
                className="rounded-lg bg-blue-600 px-3.5 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-700 transition"
              >
                Start Free Trial
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
