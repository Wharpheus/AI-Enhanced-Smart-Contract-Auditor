"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Navigation from "@/components/Navigation";
import {
  Shield,
  AlertTriangle,
  CheckCircle,
  XCircle,
  TrendingUp,
  Activity,
  Upload,
  Search,
  Zap,
  BarChart3,
  Clock,
  Eye,
  Download,
  Play,
} from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

// Mock data for charts
const vulnerabilityData = [
  { month: "Jan", reentrancy: 12, overflow: 8, access: 15, oracle: 5 },
  { month: "Feb", reentrancy: 8, overflow: 12, access: 10, oracle: 7 },
  { month: "Mar", reentrancy: 15, overflow: 6, access: 12, oracle: 9 },
  { month: "Apr", reentrancy: 10, overflow: 14, access: 8, oracle: 11 },
  { month: "May", reentrancy: 6, overflow: 18, access: 15, oracle: 6 },
  { month: "Jun", reentrancy: 12, overflow: 10, access: 11, oracle: 8 },
];

const pieData = [
  { name: "Reentrancy", value: 35, color: "#FF0080" },
  { name: "Overflow", value: 25, color: "#FF6B00" },
  { name: "Access Control", value: 30, color: "#00C6FF" },
  { name: "Oracle", value: 10, color: "#A4FF00" },
];

const recentContracts = [
  {
    address: "0x1234...5678",
    name: "DeFi Protocol",
    status: "passed",
    time: "2h ago",
  },
  {
    address: "0x8765...4321",
    name: "NFT Marketplace",
    status: "failed",
    time: "4h ago",
  },
  {
    address: "0x9876...5432",
    name: "DAO Governance",
    status: "warning",
    time: "6h ago",
  },
  {
    address: "0x5432...1098",
    name: "Staking Contract",
    status: "passed",
    time: "8h ago",
  },
];

export default function Dashboard() {
  const [isLoading, setIsLoading] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setUploadedFile(file);
      // Trigger audit process
      setIsLoading(true);
      setTimeout(() => setIsLoading(false), 3000);
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "passed":
        return <span className="badge-success">Passed</span>;
      case "failed":
        return <span className="badge-error">Failed</span>;
      case "warning":
        return <span className="badge-warning">Warning</span>;
      default:
        return <span className="badge-warning">Pending</span>;
    }
  };

  return (
    <div className="min-h-screen">
      <Navigation />

      {/* Main Content */}
      <div className="pt-16 md:pl-64">
        <div className="p-6">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <h1 className="text-4xl font-bold gradient-text mb-2">Dashboard</h1>
            <p className="text-white/70">
              AI-powered smart contract security analysis overview
            </p>
          </motion.div>

          {/* Summary Cards */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
          >
            <div className="card-futuristic">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-white/70 text-sm">Total Audits</p>
                  <p className="text-3xl font-bold text-white">1,247</p>
                  <p className="text-[#A4FF00] text-sm flex items-center">
                    <TrendingUp className="w-4 h-4 mr-1" />
                    +12% this month
                  </p>
                </div>
                <div className="w-12 h-12 bg-gradient-to-r from-[#00C6FF] to-[#A4FF00] rounded-lg flex items-center justify-center">
                  <Shield className="w-6 h-6 text-white" />
                </div>
              </div>
            </div>

            <div className="card-futuristic">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-white/70 text-sm">Passed</p>
                  <p className="text-3xl font-bold text-white">892</p>
                  <p className="text-[#A4FF00] text-sm flex items-center">
                    <CheckCircle className="w-4 h-4 mr-1" />
                    71.5% success rate
                  </p>
                </div>
                <div className="w-12 h-12 bg-gradient-to-r from-[#00FF88] to-[#00C6FF] rounded-lg flex items-center justify-center">
                  <CheckCircle className="w-6 h-6 text-white" />
                </div>
              </div>
            </div>

            <div className="card-futuristic">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-white/70 text-sm">Failed</p>
                  <p className="text-3xl font-bold text-white">234</p>
                  <p className="text-[#FF0080] text-sm flex items-center">
                    <XCircle className="w-4 h-4 mr-1" />
                    18.8% failure rate
                  </p>
                </div>
                <div className="w-12 h-12 bg-gradient-to-r from-[#FF0080] to-[#FF6B00] rounded-lg flex items-center justify-center">
                  <XCircle className="w-6 h-6 text-white" />
                </div>
              </div>
            </div>

            <div className="card-futuristic">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-white/70 text-sm">Warnings</p>
                  <p className="text-3xl font-bold text-white">121</p>
                  <p className="text-[#FFB800] text-sm flex items-center">
                    <AlertTriangle className="w-4 h-4 mr-1" />
                    9.7% warning rate
                  </p>
                </div>
                <div className="w-12 h-12 bg-gradient-to-r from-[#FFB800] to-[#FF6B00] rounded-lg flex items-center justify-center">
                  <AlertTriangle className="w-6 h-6 text-white" />
                </div>
              </div>
            </div>
          </motion.div>

          {/* Charts Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8"
          >
            {/* Vulnerability Trend Chart */}
            <div className="card-futuristic">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-white">
                  Vulnerability Trends
                </h3>
                <BarChart3 className="w-5 h-5 text-[#00C6FF]" />
              </div>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={vulnerabilityData}>
                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke="rgba(255,255,255,0.1)"
                  />
                  <XAxis dataKey="month" stroke="rgba(255,255,255,0.7)" />
                  <YAxis stroke="rgba(255,255,255,0.7)" />
                  <Tooltip
                    contentStyle={{
                      background: "rgba(0,0,0,0.8)",
                      border: "1px solid rgba(255,255,255,0.2)",
                      borderRadius: "8px",
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey="reentrancy"
                    stroke="#FF0080"
                    strokeWidth={2}
                  />
                  <Line
                    type="monotone"
                    dataKey="overflow"
                    stroke="#FF6B00"
                    strokeWidth={2}
                  />
                  <Line
                    type="monotone"
                    dataKey="access"
                    stroke="#00C6FF"
                    strokeWidth={2}
                  />
                  <Line
                    type="monotone"
                    dataKey="oracle"
                    stroke="#A4FF00"
                    strokeWidth={2}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>

            {/* Vulnerability Distribution */}
            <div className="card-futuristic">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-white">
                  Vulnerability Distribution
                </h3>
                <Activity className="w-5 h-5 text-[#A4FF00]" />
              </div>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      background: "rgba(0,0,0,0.8)",
                      border: "1px solid rgba(255,255,255,0.2)",
                      borderRadius: "8px",
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

          {/* Quick Audit Widget */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="card-futuristic mb-8"
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold text-white">Quick Audit</h3>
              <Zap className="w-6 h-6 text-[#A4FF00]" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* File Upload */}
              <div className="space-y-4">
                <div className="text-center p-8 border-2 border-dashed border-white/20 rounded-lg hover:border-[#00C6FF] transition-colors">
                  <Upload className="w-12 h-12 text-[#00C6FF] mx-auto mb-4" />
                  <p className="text-white/70 mb-2">Upload Smart Contract</p>
                  <p className="text-sm text-white/50 mb-4">
                    Drag & drop .sol files or click to browse
                  </p>
                  <input
                    type="file"
                    accept=".sol"
                    onChange={handleFileUpload}
                    className="hidden"
                    id="contract-upload"
                  />
                  <label
                    htmlFor="contract-upload"
                    className="btn-neon cursor-pointer"
                  >
                    Choose File
                  </label>
                </div>

                {uploadedFile && (
                  <div className="text-center">
                    <p className="text-[#A4FF00] text-sm">
                      ✓ {uploadedFile.name}
                    </p>
                  </div>
                )}
              </div>

              {/* Contract Address Input */}
              <div className="space-y-4">
                <div>
                  <label className="block text-white/70 text-sm mb-2">
                    Contract Address
                  </label>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white/50" />
                    <input
                      type="text"
                      placeholder="0x1234...5678"
                      className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-white/50 focus:border-[#00C6FF] focus:outline-none transition-colors"
                    />
                  </div>
                </div>

                <button className="w-full btn-neon flex items-center justify-center space-x-2">
                  <Play className="w-5 h-5" />
                  <span>Start Analysis</span>
                </button>

                {isLoading && (
                  <div className="text-center">
                    <div className="spinner mx-auto mb-2"></div>
                    <p className="text-[#00C6FF] text-sm">
                      Analyzing contract...
                    </p>
                  </div>
                )}
              </div>
            </div>
          </motion.div>

          {/* Recent Contracts */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="card-futuristic"
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold text-white">
                Recent Audits
              </h3>
              <button className="text-[#00C6FF] hover:text-[#A4FF00] transition-colors">
                View All
              </button>
            </div>

            <div className="space-y-4">
              {recentContracts.map((contract, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 * index }}
                  className="flex items-center justify-between p-4 glass rounded-lg hover:bg-white/5 transition-all"
                >
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 bg-gradient-to-r from-[#00C6FF] to-[#A4FF00] rounded-lg flex items-center justify-center">
                      <Eye className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="text-white font-medium">{contract.name}</p>
                      <p className="text-white/50 text-sm">
                        {contract.address}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4">
                    {getStatusBadge(contract.status)}
                    <div className="text-right">
                      <p className="text-white/70 text-sm">{contract.time}</p>
                    </div>
                    <button
                      type="button"
                      title="Download audit report"
                      className="p-2 text-white/50 hover:text-[#00C6FF] transition-colors"
                      onClick={() => {
                      // Simulate download (replace with actual download logic)
                      alert(`Downloading report for ${contract.name}`);
                      }}
                    >
                      <Download className="w-4 h-4" />
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
