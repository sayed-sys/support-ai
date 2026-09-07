import {
  User,
  Workspace,
  Agent,
  WidgetSettings,
  KnowledgeSource,
  Conversation,
  Message,
  Customer,
  UnansweredQuestion,
  FeedbackItem,
  AnalyticsSummary,
} from '../types';

export const api = {
  // Auth & Workspace
  async getMe(): Promise<{ user: User; workspace: Workspace; members: any[] }> {
    const res = await fetch('/api/auth/me');
    return res.json();
  },

  async login(email: string, password?: string): Promise<{ user: User; workspace: Workspace }> {
    const res = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    return res.json();
  },

  async register(data: { email: string; name: string; businessName?: string }): Promise<{ user: User; workspace: Workspace }> {
    const res = await fetch('/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    return res.json();
  },

  async completeOnboarding(data: {
    businessName: string;
    businessDescription: string;
    website: string;
    focusAreas: string[];
  }): Promise<{ success: boolean; workspace: Workspace; agent: Agent }> {
    const res = await fetch('/api/onboarding/complete', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    return res.json();
  },

  // Agent & Widget
  async getAgent(): Promise<{ agent: Agent; widgetSettings: WidgetSettings }> {
    const res = await fetch('/api/agent');
    return res.json();
  },

  async updateAgent(data: { agent?: Partial<Agent>; widgetSettings?: Partial<WidgetSettings> }): Promise<{ agent: Agent; widgetSettings: WidgetSettings }> {
    const res = await fetch('/api/agent', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    return res.json();
  },

  // Knowledge Base
  async getKnowledge(): Promise<{ sources: KnowledgeSource[]; chunksCount: number }> {
    const res = await fetch('/api/knowledge');
    return res.json();
  },

  async addKnowledgeSource(data: { type: string; title: string; content: string; url?: string }): Promise<{ source: KnowledgeSource; newChunksCount: number }> {
    const res = await fetch('/api/knowledge/source', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    return res.json();
  },

  async scrapeUrl(url: string): Promise<{ source: KnowledgeSource; chunksCount: number }> {
    const res = await fetch('/api/knowledge/scrape', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ url }),
    });
    return res.json();
  },

  async deleteKnowledgeSource(id: string): Promise<{ success: boolean }> {
    const res = await fetch(`/api/knowledge/source/${id}`, {
      method: 'DELETE',
    });
    return res.json();
  },

  // Chat & RAG
  async sendChatMessage(params: {
    conversationId?: string;
    message: string;
    customerEmail?: string;
    customerName?: string;
  }): Promise<{
    conversationId: string;
    userMessage: Message;
    aiMessage: Message;
    conversationStatus: string;
    escalated: boolean;
    sourcesUsed: string[];
    usage: any;
  }> {
    const res = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(params),
    });
    return res.json();
  },

  // Conversations & Human Desk
  async getConversations(): Promise<{ conversations: Conversation[]; messages: Record<string, Message[]> }> {
    const res = await fetch('/api/conversations');
    return res.json();
  },

  async getConversation(id: string): Promise<{ conversation: Conversation; messages: Message[] }> {
    const res = await fetch(`/api/conversations/${id}`);
    return res.json();
  },

  async sendHumanMessage(conversationId: string, text: string, senderName?: string): Promise<{ message: Message; conversation: Conversation }> {
    const res = await fetch(`/api/conversations/${conversationId}/messages`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text, senderName }),
    });
    return res.json();
  },

  async updateConversation(conversationId: string, updates: Partial<Conversation>): Promise<{ conversation: Conversation }> {
    const res = await fetch(`/api/conversations/${conversationId}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updates),
    });
    return res.json();
  },

  async submitMessageFeedback(messageId: string, feedback: 'helpful' | 'unhelpful'): Promise<{ success: boolean; message: Message }> {
    const res = await fetch(`/api/messages/${messageId}/feedback`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ feedback }),
    });
    return res.json();
  },

  // Customers & Analytics
  async getCustomers(): Promise<{ customers: Customer[] }> {
    const res = await fetch('/api/customers');
    return res.json();
  },

  async getAnalytics(): Promise<{ analytics: AnalyticsSummary }> {
    const res = await fetch('/api/analytics');
    return res.json();
  },

  // Unanswered Questions
  async getUnansweredQuestions(): Promise<{ questions: UnansweredQuestion[] }> {
    const res = await fetch('/api/unanswered-questions');
    return res.json();
  },

  async addAnswerToKnowledgeBase(questionId: string, answer: string): Promise<{ success: boolean; question: UnansweredQuestion; source: KnowledgeSource }> {
    const res = await fetch(`/api/unanswered-questions/${questionId}/add-to-kb`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ answer }),
    });
    return res.json();
  },

  // User's Dedicated Feedback Portal & Prioritization
  async getFeedbackPortalItems(): Promise<{ feedbackItems: FeedbackItem[] }> {
    const res = await fetch('/api/feedback/portal');
    return res.json();
  },

  async submitFeedback(data: {
    title: string;
    description: string;
    userName?: string;
    userEmail?: string;
    categoryHint?: string;
  }): Promise<{ feedbackItem: FeedbackItem }> {
    const res = await fetch('/api/feedback/portal', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    return res.json();
  },

  async upvoteFeedback(id: string): Promise<{ feedbackItem: FeedbackItem }> {
    const res = await fetch(`/api/feedback/portal/${id}/upvote`, {
      method: 'POST',
    });
    return res.json();
  },

  async rePrioritizeFeedback(): Promise<{ success: boolean; message: string; feedbackItems: FeedbackItem[] }> {
    const res = await fetch('/api/feedback/re-prioritize', {
      method: 'POST',
    });
    return res.json();
  },

  // Billing
  async upgradePlan(plan: string): Promise<{ success: boolean; plan: string; usage: any }> {
    const res = await fetch('/api/billing/upgrade', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ plan }),
    });
    return res.json();
  },

  // Shopify
  async lookupShopifyOrder(orderNumber: string): Promise<any> {
    const res = await fetch(`/api/integrations/shopify/orders/${orderNumber}`);
    return res.json();
  },
};
