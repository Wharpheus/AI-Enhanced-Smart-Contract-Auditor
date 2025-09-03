"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard,
  Shield,
  Search,
  FileText,
  BarChart3,
  Settings,
  Bot,
  Menu,
  X,
  Zap,
  Code,
  Database,
  Users,
  HelpCircle,
  Bell,
  User,
} from "lucide-react";

interface NavItem {
  name: string;
  href: string;
  icon: React.ComponentType<any>;
  description?: string;
}

const mainNavItems: NavItem[] = [
  {
    name: "Dashboard",
    href: "/",
    icon: LayoutDashboard,
    description: "Audit Overview",
  },
  {
    name: "Audit Studio",
    href: "/audit",
    icon: Shield,
    description: "Smart Contract Analysis",
  },
  {
    name: "DApps Explorer",
    href: "/explorer",
    icon: Search,
    description: "Contract Directory",
  },
  {
    name: "Docs & Tutorials",
    href: "/docs",
    icon: FileText,
    description: "Documentation",
  },
  {
    name: "Reports",
    href: "/reports",
    icon: BarChart3,
    description: "Audit Reports",
  },
  {
    name: "Team & API",
    href: "/team",
    icon: Users,
    description: "Team Management",
  },
];

const sidebarItems = [
  { name: "Audit", icon: Shield, href: "/audit" },
  { name: "Live Test", icon: Zap, href: "/test" },
  { name: "Contracts", icon: Code, href: "/contracts" },
  { name: "Settings", icon: Settings, href: "/settings" },
];

export default function Navigation() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [aiAssistantOpen, setAiAssistantOpen] = useState(false);
  const pathname = usePathname();

  return (
    <>
      {/* Top Navigation Bar */}
      <nav className="fixed top-0 left-0 right-0 z-50 glass-strong border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center">
              <Link href="/" className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-r from-[#00C6FF] to-[#A4FF00] rounded-lg flex items-center justify-center">
                  <Zap className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold gradient-text">
                  Zenix AI
                </span>
              </Link>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {mainNavItems.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`relative group px-3 py-2 rounded-lg transition-all duration-300 ${
                      isActive
                        ? "text-[#00C6FF] bg-white/10"
                        : "text-white/70 hover:text-white hover:bg-white/5"
                    }`}
                  >
                    <div className="flex items-center space-x-2">
                      <item.icon className="w-4 h-4" />
                      <span className="font-medium">{item.name}</span>
                    </div>
                    {isActive && (
                      <motion.div
                        layoutId="activeTab"
                        className="absolute inset-0 bg-gradient-to-r from-[#00C6FF]/20 to-[#A4FF00]/20 rounded-lg border border-[#00C6FF]/30"
                        initial={false}
                        transition={{
                          type: "spring",
                          stiffness: 500,
                          damping: 30,
                        }}
                      />
                    )}
                  </Link>
                );
              })}
            </div>

            {/* Right Side Actions */}
            <div className="flex items-center space-x-4">
              {/* Notifications */}
              <button
                type="button"
                className="relative p-2 text-white/70 hover:text-white hover:bg-white/5 rounded-lg transition-all"
                title="Notifications"
              >
                <Bell className="w-5 h-5" />
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-[#FF0080] rounded-full"></span>
              </button>
              {/* AI Assistant */}
              <button
                onClick={() => setAiAssistantOpen(!aiAssistantOpen)}
                className={`p-2 rounded-lg transition-all ${
                  aiAssistantOpen
                    ? "text-[#A4FF00] bg-[#A4FF00]/10"
                    : "text-white/70 hover:text-white hover:bg-white/5"
                }`}
                title="Toggle AI Assistant"
              >
                <Bot className="w-5 h-5" />
              </button>
              {/* Help */}
              <button
                className="p-2 text-white/70 hover:text-white hover:bg-white/5 rounded-lg transition-all"
                title="Help"
              >
                <HelpCircle className="w-5 h-5" />
              </button>
              {/* User Menu */}
              <button
                className="flex items-center space-x-2 p-2 text-white/70 hover:text-white hover:bg-white/5 rounded-lg transition-all"
                title="User Menu"
              >
                <User className="w-5 h-5" />
                <span className="hidden sm:block font-medium">Admin</span>
              </button>
              {/* Mobile Menu Toggle */}
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="md:hidden p-2 text-white/70 hover:text-white hover:bg-white/5 rounded-lg transition-all"
                title={sidebarOpen ? "Close Menu" : "Open Menu"}
              >
                {sidebarOpen ? (
                  <X className="w-5 h-5" />
                ) : (
                  <Menu className="w-5 h-5" />
                )}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Helix Sidebar */}
      <div
        className={`fixed left-0 top-16 h-full z-40 transition-transform duration-300 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 md:static md:top-0`}
      >
        <div className="w-64 h-full glass border-r border-white/10">
          <div className="p-4">
            <div className="space-y-2">
              {sidebarItems.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`flex items-center space-x-3 p-3 rounded-lg transition-all duration-300 ${
                      isActive
                        ? "text-[#00C6FF] bg-[#00C6FF]/10 border border-[#00C6FF]/30"
                        : "text-white/70 hover:text-white hover:bg-white/5"
                    }`}
                  >
                    <item.icon className="w-5 h-5" />
                    <span className="font-medium">{item.name}</span>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* AI Assistant Panel */}
      <AnimatePresence>
        {aiAssistantOpen && (
          <motion.div
            initial={{ opacity: 0, x: 300 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 300 }}
          >
            <div>
              <div className="bg-[#18181b] fixed top-16 right-0 w-96 h-[32rem] z-50 shadow-xl border-l border-white/10 flex flex-col">
                <div className="flex items-center justify-between p-4 border-b border-white/10">
                  <span className="font-semibold text-white">AI Assistant</span>
                  <button
                    onClick={() => setAiAssistantOpen(false)}
                    className="text-white/70 hover:text-white"
                    title="Close AI Assistant"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
                <div className="p-4 h-80 overflow-y-auto">
                  <div className="space-y-4">
                    <div className="text-sm text-white/70">
                      How can I help you with smart contract auditing today?
                    </div>
                    <div className="space-y-2">
                      <button className="w-full text-left p-3 glass rounded-lg hover:bg-white/5 transition-all text-sm">
                        "How do I analyze reentrancy vulnerabilities?"
                      </button>
                      <button className="w-full text-left p-3 glass rounded-lg hover:bg-white/5 transition-all text-sm">
                        "What are the best practices for access control?"
                      </button>
                      <button className="w-full text-left p-3 glass rounded-lg hover:bg-white/5 transition-all text-sm">
                        "Explain the audit process step by step"
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </>
  );
}
