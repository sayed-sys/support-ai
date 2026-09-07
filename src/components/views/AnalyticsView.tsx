import React from 'react';
import {
  BarChart3,
  TrendingUp,
  MessageSquare,
  CheckCircle2,
  AlertTriangle,
  Clock,
  ThumbsUp,
  ThumbsDown,
  PieChart,
  Calendar,
} from 'lucide-react';
import { AnalyticsSummary } from '../../types';

interface AnalyticsViewProps {
  analytics: AnalyticsSummary;
}

export const AnalyticsView: React.FC<AnalyticsViewProps> = ({ analytics }) => {
  const maxDayCount = Math.max(...analytics.dailyVolume.map((d) => d.count), 1);

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div>
        <h1 className="text-xl font-bold text-slate-900">Support Analytics & Resolution Intelligence</h1>
        <p className="text-xs text-slate-500">
          Real-time metrics on automated resolution, human escalation rates, and customer sentiment.
        </p>
      </div>

      {/* Primary KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
        <div className="rounded-2xl border border-slate-200 bg-white p-4.5 shadow-2xs">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-medium">Conversations</span>
            <MessageSquare className="h-4 w-4 text-blue-500" />
          </div>
          <div className="text-2xl font-bold text-slate-900">{analytics.totalConversations}</div>
          <div className="text-[11px] text-slate-400 mt-1">Past 30 days</div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-4.5 shadow-2xs">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-medium">AI Automation</span>
            <CheckCircle2 className="h-4 w-4 text-emerald-500" />
          </div>
          <div className="text-2xl font-bold text-emerald-600">{analytics.aiResolvedRate}%</div>
          <div className="text-[11px] text-emerald-700 font-medium mt-1">
            {analytics.aiResolvedCount} resolved by AI
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-4.5 shadow-2xs">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-medium">Escalations</span>
            <AlertTriangle className="h-4 w-4 text-amber-500" />
          </div>
          <div className="text-2xl font-bold text-amber-600">{analytics.escalationRate}%</div>
          <div className="text-[11px] text-slate-400 mt-1">{analytics.escalatedCount} human transfers</div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-4.5 shadow-2xs">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-medium">Avg Response</span>
            <Clock className="h-4 w-4 text-purple-500" />
          </div>
          <div className="text-2xl font-bold text-slate-900">{analytics.avgResponseTimeSec}s</div>
          <div className="text-[11px] text-emerald-600 font-medium mt-1">Instant RAG retrieval</div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-4.5 shadow-2xs">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-medium">CSAT Score</span>
            <ThumbsUp className="h-4 w-4 text-blue-500" />
          </div>
          <div className="text-2xl font-bold text-slate-900">{analytics.customerSatisfactionPercent}%</div>
          <div className="text-[11px] text-emerald-600 font-medium mt-1">
            {analytics.feedbackHelpfulness.helpfulCount} positive ratings
          </div>
        </div>
      </div>

      {/* Chart: Daily Conversations Volume */}
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-base font-bold text-slate-900">Conversation Volume (Last 7 Days)</h2>
            <p className="text-xs text-slate-500">Daily customer chats handled autonomously and escalated</p>
          </div>
          <span className="text-xs font-semibold text-slate-500 bg-slate-100 px-3 py-1 rounded-full">
            Total {analytics.dailyVolume.reduce((acc, d) => acc + d.count, 0)} Chats
          </span>
        </div>

        <div className="pt-6">
          <div className="flex items-end justify-between gap-2 h-44 border-b border-slate-200 pb-2 px-4">
            {analytics.dailyVolume.map((d, i) => {
              const heightPercent = Math.round((d.count / maxDayCount) * 100);
              return (
                <div key={i} className="flex-1 flex flex-col items-center gap-2 group">
                  <span className="text-[11px] font-bold text-slate-700 opacity-0 group-hover:opacity-100 transition">
                    {d.count}
                  </span>
                  <div className="w-full max-w-[42px] bg-slate-100 rounded-t-xl overflow-hidden h-36 flex items-end">
                    <div
                      className="w-full bg-blue-600 rounded-t-xl transition-all duration-500 group-hover:bg-blue-700"
                      style={{ height: `${heightPercent}%` }}
                    />
                  </div>
                  <span className="text-[11px] text-slate-500 font-medium">{d.date.slice(5)}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Two Columns: Category Breakdown & CSAT Helpfulness */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Category Breakdown */}
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs space-y-4">
          <div>
            <h2 className="text-base font-bold text-slate-900">Common Customer Inquiries</h2>
            <p className="text-xs text-slate-500">Autonomous intent classification across chat sessions</p>
          </div>

          <div className="space-y-3 pt-2">
            {analytics.categoryBreakdown.map((cat, idx) => (
              <div key={idx}>
                <div className="flex justify-between text-xs mb-1">
                  <span className="font-semibold text-slate-800">{cat.category}</span>
                  <span className="text-slate-500 font-medium">
                    {cat.count} chats ({cat.percentage}%)
                  </span>
                </div>
                <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                  <div
                    className="bg-indigo-600 h-full rounded-full"
                    style={{ width: `${cat.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Feedback Helpfulness */}
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs space-y-4 flex flex-col justify-between">
          <div>
            <h2 className="text-base font-bold text-slate-900">Message Helpfulness & CSAT</h2>
            <p className="text-xs text-slate-500">Direct feedback provided by customers on AI answers</p>

            <div className="grid grid-cols-2 gap-4 mt-6">
              <div className="p-4 rounded-xl border border-emerald-200 bg-emerald-50/50 flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600">
                  <ThumbsUp className="h-5 w-5" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-emerald-700">
                    {analytics.feedbackHelpfulness.helpfulCount}
                  </div>
                  <div className="text-xs text-emerald-800 font-medium">Helpful Ratings</div>
                </div>
              </div>

              <div className="p-4 rounded-xl border border-rose-200 bg-rose-50/50 flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-rose-100 flex items-center justify-center text-rose-600">
                  <ThumbsDown className="h-5 w-5" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-rose-700">
                    {analytics.feedbackHelpfulness.unhelpfulCount}
                  </div>
                  <div className="text-xs text-rose-800 font-medium">Unhelpful Ratings</div>
                </div>
              </div>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-600">
            <span className="font-semibold text-slate-800">Quality Guarantee: </span>
            Unhelpful ratings automatically flag the conversation in the dashboard for support supervisor review.
          </div>
        </div>
      </div>
    </div>
  );
};
