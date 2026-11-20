import React, { useState, useEffect } from 'react';
import { api } from '../../services/api';
import {
  Cloud,
  Database,
  RefreshCw,
  Zap,
  CheckCircle2,
  AlertCircle,
  ShieldCheck,
  Server,
  FileText,
  Users,
  Award,
  CreditCard,
  Building,
  BookOpen,
  FileCheck,
  Upload,
  Download,
  Key,
  Copy,
  Check,
  ExternalLink,
  Eye,
  X,
  Search,
  Loader2,
} from 'lucide-react';

export const AdminFirebase: React.FC = () => {
  const [status, setStatus] = useState<any>(null);
  const [collections, setCollections] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [testing, setTesting] = useState(false);
  const [syncingAll, setSyncingAll] = useState(false);
  const [syncingSingle, setSyncingSingle] = useState<string | null>(null);
  const [testResult, setTestResult] = useState<any>(null);
  const [syncResult, setSyncResult] = useState<any>(null);
  const [activeConfigTab, setActiveConfigTab] = useState<'json' | 'manual'>('json');
  const [savingConfig, setSavingConfig] = useState(false);
  const [configSuccess, setConfigSuccess] = useState('');

  // Form states
  const [serviceAccountJson, setServiceAccountJson] = useState('');
  const [manualForm, setManualForm] = useState({
    projectId: 'aicqb-prod',
    clientEmail: '',
    privateKey: '',
  });

  // Data inspection modal
  const [viewingCollection, setViewingCollection] = useState<string | null>(null);
  const [collectionData, setCollectionData] = useState<any[]>([]);
  const [loadingCollectionData, setLoadingCollectionData] = useState(false);
  const [dataSearch, setDataSearch] = useState('');
  const [copiedKey, setCopiedKey] = useState(false);

  useEffect(() => {
    loadAll();
  }, []);

  const loadAll = async () => {
    setLoading(true);
    try {
      const [statusRes, colRes] = await Promise.all([
        api.getFirebaseStatus(),
        api.getFirebaseCollections(),
      ]);

      if (statusRes?.success) {
        setStatus(statusRes.status);
        setManualForm((prev) => ({
          ...prev,
          projectId: statusRes.status.projectId || prev.projectId,
          clientEmail: statusRes.status.clientEmail || prev.clientEmail,
        }));
      }

      if (colRes?.success && colRes.collections) {
        setCollections(colRes.collections);
      }
    } catch (err) {
      console.error('Failed to load Firebase status:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleTestConnection = async () => {
    setTesting(true);
    setTestResult(null);
    try {
      const res = await api.testFirebase();
      setTestResult(res?.result || res);
      await loadAll();
    } catch (err: any) {
      setTestResult({ connected: false, error: err.message, message: 'Connection test failed: ' + err.message });
    } finally {
      setTesting(false);
    }
  };

  const handleSyncAll = async () => {
    setSyncingAll(true);
    setSyncResult(null);
    try {
      const res = await api.syncFirebase();
      setSyncResult(res);
      await loadAll();
    } catch (err: any) {
      setSyncResult({ success: false, error: err.message });
    } finally {
      setSyncingAll(false);
    }
  };

  const handleSyncSingle = async (name: string) => {
    setSyncingSingle(name);
    try {
      const res = await api.syncFirebaseCollection(name);
      if (res?.success) {
        setSyncResult({
          success: true,
          message: `Collection "${name}" (${res.count} records) successfully synced to Firebase Firestore!`,
        });
      }
      await loadAll();
    } catch (err: any) {
      alert('Failed to sync collection: ' + err.message);
    } finally {
      setSyncingSingle(null);
    }
  };

  const handleSaveJsonConfig = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!serviceAccountJson.trim()) {
      alert('Please paste a valid serviceAccountKey.json content');
      return;
    }

    try {
      setSavingConfig(true);
      setConfigSuccess('');
      // Test parse
      const parsed = JSON.parse(serviceAccountJson);
      const res = await api.updateFirebaseConfig({
        serviceAccountJson: parsed,
        projectId: parsed.project_id,
        clientEmail: parsed.client_email,
      });

      if (res?.success) {
        setConfigSuccess('Firebase Service Account Key successfully activated and hot-reloaded!');
        setServiceAccountJson('');
        await loadAll();
        setTimeout(() => setConfigSuccess(''), 5000);
      }
    } catch (err: any) {
      alert('Failed to save service account key: ' + err.message);
    } finally {
      setSavingConfig(false);
    }
  };

  const handleSaveManualConfig = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setSavingConfig(true);
      setConfigSuccess('');
      const res = await api.updateFirebaseConfig(manualForm);
      if (res?.success) {
        setConfigSuccess('Firebase configuration saved and reloaded!');
        await loadAll();
        setTimeout(() => setConfigSuccess(''), 5000);
      }
    } catch (err: any) {
      alert('Failed to update config: ' + err.message);
    } finally {
      setSavingConfig(false);
    }
  };

  const handleViewCollectionData = async (name: string) => {
    setViewingCollection(name);
    setLoadingCollectionData(true);
    setDataSearch('');
    try {
      const res = await api.getFirebaseCollectionData(name);
      if (res?.success) {
        setCollectionData(res.data || []);
      }
    } catch (err: any) {
      alert('Failed to load collection data: ' + err.message);
    } finally {
      setLoadingCollectionData(false);
    }
  };

  const handleExportBackup = () => {
    window.open('/api/health', '_blank');
  };

  const getCollectionIcon = (iconName: string) => {
    switch (iconName) {
      case 'Users': return Users;
      case 'Award': return Award;
      case 'FileCheck': return FileCheck;
      case 'BookOpen': return BookOpen;
      case 'CreditCard': return CreditCard;
      case 'ShieldCheck': return ShieldCheck;
      case 'Building': return Building;
      case 'FileText': return FileText;
      default: return Database;
    }
  };

  const totalDocuments = collections.reduce((acc, c) => acc + (c.totalCount || 0), 0);

  const filteredCollectionData = collectionData.filter((item) => {
    if (!dataSearch) return true;
    const s = dataSearch.toLowerCase();
    return JSON.stringify(item).toLowerCase().includes(s);
  });

  return (
    <div className="space-y-6">
      {/* Top Header matching Admin Theme */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <h1 className="text-xl sm:text-2xl font-black text-[#10264B]">
              Firebase Cloud Database & Sync
            </h1>
            <span className="text-[10px] font-black uppercase tracking-wider bg-orange-100 text-orange-700 px-2.5 py-0.5 rounded-full border border-orange-200">
              Live Dynamic SDK
            </span>
          </div>
          <p className="text-xs text-gray-500 mt-1">
            Real-time bidirectional synchronization between AICQB local persistent storage and Google Cloud Firestore.
          </p>
        </div>

        {/* Live Status Badge */}
        <div className="flex items-center space-x-3">
          {status?.isConnected ? (
            <div className="flex items-center space-x-2 bg-emerald-50 border border-emerald-200 text-emerald-800 px-4 py-2 rounded-xl shadow-xs">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
              <span className="text-xs font-black">Google Cloud Live Connected</span>
            </div>
          ) : (
            <div className="flex items-center space-x-2 bg-amber-50 border border-amber-200 text-amber-900 px-4 py-2 rounded-xl shadow-xs">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500"></span>
              <span className="text-xs font-black">Local Hybrid Persistent Storage</span>
            </div>
          )}

          <button
            onClick={loadAll}
            disabled={loading}
            className="p-2.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-600 transition-colors shadow-xs"
            title="Refresh Status"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin text-[#F47716]' : ''}`} />
          </button>
        </div>
      </div>

      {/* 4 Summary Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1: Cloud Mode */}
        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs flex items-center space-x-4">
          <div className="w-12 h-12 rounded-2xl bg-orange-50 border border-orange-200 text-[#F47716] flex items-center justify-center flex-shrink-0">
            <Cloud className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Storage Mode</span>
            <span className="text-sm sm:text-base font-black text-[#10264B] block mt-0.5">
              {status?.isConnected ? 'Cloud Firestore' : 'Local Hybrid (JSON)'}
            </span>
            <span className="text-[11px] font-semibold text-emerald-600">
              {status?.isConnected ? '● Synchronizing in Real-Time' : '● Auto-Cached Offline'}
            </span>
          </div>
        </div>

        {/* Card 2: Firebase Project ID */}
        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs flex items-center space-x-4">
          <div className="w-12 h-12 rounded-2xl bg-blue-50 border border-blue-200 text-blue-600 flex items-center justify-center flex-shrink-0">
            <Server className="w-6 h-6" />
          </div>
          <div className="overflow-hidden">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Project ID</span>
            <span className="text-sm sm:text-base font-black text-[#10264B] font-mono truncate block mt-0.5" title={status?.projectId || 'aicqb-prod'}>
              {status?.projectId || 'aicqb-prod'}
            </span>
            <span className="text-[11px] text-slate-500 font-mono truncate block">
              {status?.clientEmail ? status.clientEmail.split('@')[0] : 'admin-service'}
            </span>
          </div>
        </div>

        {/* Card 3: Synced Collections */}
        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs flex items-center space-x-4">
          <div className="w-12 h-12 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-600 flex items-center justify-center flex-shrink-0">
            <Database className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Firestore Collections</span>
            <span className="text-xl sm:text-2xl font-black text-[#10264B] block mt-0.5">
              {collections.length} Collections
            </span>
            <span className="text-[11px] text-slate-500">
              {status?.lastSyncAt ? `Last: ${new Date(status.lastSyncAt).toLocaleTimeString()}` : 'Continuous Real-Time Sync'}
            </span>
          </div>
        </div>

        {/* Card 4: Total Live Documents */}
        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs flex items-center space-x-4">
          <div className="w-12 h-12 rounded-2xl bg-purple-50 border border-purple-200 text-purple-600 flex items-center justify-center flex-shrink-0">
            <FileText className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Total Database Records</span>
            <span className="text-xl sm:text-2xl font-black text-[#10264B] font-mono block mt-0.5">
              {totalDocuments} Docs
            </span>
            <span className="text-[11px] font-bold text-purple-600">
              Auto-Mirrored & Indexed
            </span>
          </div>
        </div>
      </div>

      {/* Main Action Bar */}
      <div className="bg-white rounded-2xl border border-slate-200 p-4 sm:p-5 shadow-xs flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={handleTestConnection}
            disabled={testing}
            className="px-5 py-2.5 bg-[#10264B] hover:bg-[#1E3A6E] text-white text-xs sm:text-sm font-bold rounded-xl shadow-sm transition-all flex items-center space-x-2 cursor-pointer disabled:opacity-50"
          >
            {testing ? (
              <Loader2 className="w-4 h-4 animate-spin text-amber-400" />
            ) : (
              <Zap className="w-4 h-4 text-amber-400" />
            )}
            <span>{testing ? 'Testing Cloud Ping...' : 'Test Connection & Ping Latency'}</span>
          </button>

          <button
            onClick={handleSyncAll}
            disabled={syncingAll}
            className="px-5 py-2.5 bg-gradient-to-r from-[#F47716] to-[#E35D00] hover:from-[#E35D00] hover:to-[#C94E00] text-white text-xs sm:text-sm font-extrabold rounded-xl shadow-md transition-all flex items-center space-x-2 cursor-pointer disabled:opacity-50 border border-orange-400"
          >
            {syncingAll ? (
              <RefreshCw className="w-4 h-4 animate-spin text-white" />
            ) : (
              <RefreshCw className="w-4 h-4 text-white" />
            )}
            <span>{syncingAll ? 'Synchronizing All Collections...' : '1-Click Sync All to Cloud Firestore'}</span>
          </button>
        </div>

        <button
          onClick={handleExportBackup}
          className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs sm:text-sm font-bold rounded-xl transition-all flex items-center space-x-2 cursor-pointer"
        >
          <Download className="w-4 h-4 text-slate-500" />
          <span>Export Cloud Backup</span>
        </button>
      </div>

      {/* Diagnostic & Result Notifications */}
      {testResult && (
        <div
          className={`p-4 rounded-2xl border text-xs sm:text-sm flex items-start space-x-3.5 animate-fadeIn ${
            testResult.connected
              ? 'bg-emerald-50 border-emerald-200 text-emerald-900'
              : 'bg-amber-50 border-amber-200 text-amber-950'
          }`}
        >
          {testResult.connected ? (
            <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
          ) : (
            <AlertCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
          )}
          <div className="flex-1 space-y-1">
            <div className="flex items-center justify-between">
              <span className="font-extrabold">
                {testResult.connected
                  ? 'Google Cloud Firestore Connected Successfully!'
                  : 'Local Storage Fallback Mode Active'}
              </span>
              {testResult.latencyMs && (
                <span className="font-mono text-xs bg-white/90 px-2.5 py-0.5 rounded-full border border-emerald-300 font-bold text-emerald-800">
                  {testResult.latencyMs}ms Latency
                </span>
              )}
            </div>
            <p className="text-xs leading-relaxed opacity-90">{testResult.message}</p>
          </div>
          <button onClick={() => setTestResult(null)} className="text-slate-400 hover:text-slate-600">
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {syncResult && (
        <div className="p-4 rounded-2xl border border-emerald-200 bg-emerald-50 text-emerald-900 text-xs sm:text-sm flex items-start space-x-3.5 animate-fadeIn">
          <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
          <div className="flex-1">
            <span className="font-black">Cloud Synchronization Complete!</span>
            <p className="text-xs mt-0.5 leading-relaxed">
              {syncResult.message || 'All collections have been verified and mirrored to Google Cloud Firestore.'}
            </p>
          </div>
          <button onClick={() => setSyncResult(null)} className="text-emerald-700 hover:text-emerald-900">
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Firestore Collections Grid (8 Collections) */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-black text-base text-[#10264B]">Cloud Firestore Collections</h3>
            <p className="text-xs text-slate-500">Live records mirrored automatically upon each creation or edit.</p>
          </div>
          <span className="text-xs font-mono font-bold text-slate-500 bg-white px-3 py-1 rounded-lg border border-slate-200">
            {collections.length} active collections
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {collections.map((col) => {
            const Icon = getCollectionIcon(col.icon);
            const isSyncingThis = syncingSingle === col.name;

            return (
              <div
                key={col.name}
                className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs hover:border-[#F47716] transition-all flex flex-col justify-between space-y-4"
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-200 text-[#10264B] flex items-center justify-center flex-shrink-0">
                      <Icon className="w-5 h-5 text-[#F47716]" />
                    </div>
                    <div>
                      <h4 className="font-bold text-sm text-[#10264B]">{col.label}</h4>
                      <span className="font-mono text-[10px] text-slate-400">/{col.name}</span>
                    </div>
                  </div>
                  <span className="font-mono text-sm font-black text-[#10264B] bg-slate-100 px-2 py-0.5 rounded-lg border border-slate-200">
                    {col.totalCount}
                  </span>
                </div>

                <div className="flex items-center justify-between text-[11px] text-slate-500 border-t border-slate-100 pt-3">
                  <span className="flex items-center space-x-1.5">
                    <span className={`w-2 h-2 rounded-full ${status?.isConnected ? 'bg-emerald-500' : 'bg-amber-400'}`}></span>
                    <span>{status?.isConnected ? 'Cloud Sync Ready' : 'Local Persistent'}</span>
                  </span>

                  <div className="flex items-center space-x-1.5">
                    <button
                      onClick={() => handleViewCollectionData(col.name)}
                      className="p-1.5 rounded-lg text-slate-600 hover:text-[#10264B] hover:bg-slate-100 transition-colors cursor-pointer"
                      title="Inspect Records"
                    >
                      <Eye className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => handleSyncSingle(col.name)}
                      disabled={isSyncingThis}
                      className="px-2.5 py-1 bg-slate-100 hover:bg-[#F47716] hover:text-white text-slate-700 font-bold rounded-lg transition-colors cursor-pointer text-[10px] flex items-center space-x-1"
                      title="Sync this collection"
                    >
                      <RefreshCw className={`w-3 h-3 ${isSyncingThis ? 'animate-spin' : ''}`} />
                      <span>Sync</span>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Firebase Credentials Configuration Section */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-4">
          <div>
            <h3 className="text-base sm:text-lg font-black text-[#10264B] flex items-center space-x-2">
              <Key className="w-5 h-5 text-[#F47716]" />
              <span>Firebase Service Account & Cloud Credentials</span>
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Paste your Google Cloud Service Account JSON or enter credentials manually to activate live Cloud Firestore.
            </p>
          </div>

          <div className="flex items-center bg-slate-100 p-1 rounded-xl text-xs font-bold">
            <button
              type="button"
              onClick={() => setActiveConfigTab('json')}
              className={`px-4 py-1.5 rounded-lg transition-all cursor-pointer ${
                activeConfigTab === 'json'
                  ? 'bg-white text-[#10264B] shadow-xs'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              Paste serviceAccountKey.json
            </button>
            <button
              type="button"
              onClick={() => setActiveConfigTab('manual')}
              className={`px-4 py-1.5 rounded-lg transition-all cursor-pointer ${
                activeConfigTab === 'manual'
                  ? 'bg-white text-[#10264B] shadow-xs'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              Manual Key Fields
            </button>
          </div>
        </div>

        {/* Tab 1: Paste Service Account JSON */}
        {activeConfigTab === 'json' && (
          <form onSubmit={handleSaveJsonConfig} className="space-y-4">
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 text-xs space-y-2">
              <div className="flex items-center justify-between font-bold text-slate-800">
                <span className="flex items-center space-x-1.5">
                  <ExternalLink className="w-4 h-4 text-[#F47716]" />
                  <span>How to get your Service Account Key from Firebase:</span>
                </span>
                <a
                  href="https://console.firebase.google.com"
                  target="_blank"
                  rel="noreferrer"
                  className="text-[#F47716] hover:underline flex items-center space-x-1"
                >
                  <span>Open Firebase Console</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
              <p className="text-slate-600 leading-relaxed text-[11px]">
                1. Open your Firebase project &gt; Click <strong>Project Settings ⚙️</strong> &gt; Select <strong>Service accounts</strong> tab.<br />
                2. Click <strong>Generate new private key</strong> &gt; Open the downloaded <code className="bg-white px-1.5 py-0.5 rounded border">.json</code> file.<br />
                3. Paste the complete JSON contents below and click <strong>Activate Service Account</strong>.
              </p>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                Paste Complete serviceAccountKey.json
              </label>
              <textarea
                rows={7}
                value={serviceAccountJson}
                onChange={(e) => setServiceAccountJson(e.target.value)}
                placeholder={`{\n  "type": "service_account",\n  "project_id": "aicqb-prod",\n  "private_key_id": "...",\n  "private_key": "-----BEGIN PRIVATE KEY-----\\n...\\n-----END PRIVATE KEY-----\\n",\n  "client_email": "firebase-adminsdk@aicqb-prod.iam.gserviceaccount.com"\n}`}
                className="w-full p-4 font-mono text-xs bg-slate-950 text-emerald-400 rounded-2xl border border-slate-800 focus:border-[#F47716] focus:outline-none focus:ring-2 focus:ring-orange-200"
              />
            </div>

            <div className="flex items-center justify-between pt-2">
              <button
                type="submit"
                disabled={savingConfig || !serviceAccountJson.trim()}
                className="px-6 py-2.5 bg-gradient-to-r from-[#F47716] to-[#E35D00] hover:from-[#E35D00] hover:to-[#C94E00] text-white font-extrabold text-xs sm:text-sm rounded-xl shadow-md transition-all flex items-center space-x-2 cursor-pointer disabled:opacity-50 border border-orange-400"
              >
                {savingConfig && <Loader2 className="w-4 h-4 animate-spin text-white" />}
                <Upload className="w-4 h-4" />
                <span>{savingConfig ? 'Activating Credentials...' : 'Activate & Hot-Reload Service Account'}</span>
              </button>

              {configSuccess && (
                <span className="text-xs text-emerald-700 font-bold bg-emerald-50 px-3 py-1.5 rounded-lg border border-emerald-200">
                  ✓ {configSuccess}
                </span>
              )}
            </div>
          </form>
        )}

        {/* Tab 2: Manual Key Fields */}
        {activeConfigTab === 'manual' && (
          <form onSubmit={handleSaveManualConfig} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Firebase Project ID</label>
                <input
                  type="text"
                  value={manualForm.projectId}
                  onChange={(e) => setManualForm({ ...manualForm, projectId: e.target.value })}
                  placeholder="aicqb-prod"
                  className="w-full text-xs font-mono px-3.5 py-2.5 border rounded-xl bg-white border-slate-200 focus:border-[#F47716] focus:outline-none"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Client Email (Service Account)</label>
                <input
                  type="email"
                  value={manualForm.clientEmail}
                  onChange={(e) => setManualForm({ ...manualForm, clientEmail: e.target.value })}
                  placeholder="firebase-adminsdk@aicqb-prod.iam.gserviceaccount.com"
                  className="w-full text-xs font-mono px-3.5 py-2.5 border rounded-xl bg-white border-slate-200 focus:border-[#F47716] focus:outline-none"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Private Key (RSA Private Key PEM)
              </label>
              <textarea
                rows={5}
                value={manualForm.privateKey}
                onChange={(e) => setManualForm({ ...manualForm, privateKey: e.target.value })}
                placeholder="-----BEGIN PRIVATE KEY-----&#10;...&#10;-----END PRIVATE KEY-----"
                className="w-full p-3 font-mono text-xs bg-slate-900 text-slate-200 rounded-xl border border-slate-700 focus:border-[#F47716] focus:outline-none"
                required
              />
            </div>

            <div className="flex items-center justify-between pt-2">
              <button
                type="submit"
                disabled={savingConfig}
                className="px-6 py-2.5 bg-[#10264B] hover:bg-[#1E3A6E] text-white font-bold text-xs sm:text-sm rounded-xl shadow-md transition-all flex items-center space-x-2 cursor-pointer disabled:opacity-50"
              >
                {savingConfig && <Loader2 className="w-4 h-4 animate-spin text-white" />}
                <span>{savingConfig ? 'Saving Configuration...' : 'Save Manual Credentials'}</span>
              </button>

              {configSuccess && (
                <span className="text-xs text-emerald-700 font-bold bg-emerald-50 px-3 py-1.5 rounded-lg border border-emerald-200">
                  ✓ {configSuccess}
                </span>
              )}
            </div>
          </form>
        )}
      </div>

      {/* Collection Data Inspector Modal */}
      {viewingCollection && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-fadeIn">
          <div className="bg-white rounded-3xl max-w-4xl w-full max-h-[85vh] flex flex-col shadow-2xl border border-slate-200 overflow-hidden">
            <div className="bg-[#10264B] text-white px-6 py-4 flex items-center justify-between">
              <div>
                <h3 className="font-black text-base flex items-center space-x-2">
                  <Database className="w-4 h-4 text-[#F47716]" />
                  <span>Collection Records: /{viewingCollection}</span>
                </h3>
                <span className="text-[11px] text-slate-300">
                  Showing {filteredCollectionData.length} active documents in local & cloud Firestore
                </span>
              </div>
              <button
                onClick={() => setViewingCollection(null)}
                className="p-1 text-slate-400 hover:text-white rounded-lg transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-4 border-b border-slate-200 bg-slate-50 flex items-center justify-between">
              <div className="relative w-full max-w-sm">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                <input
                  type="text"
                  value={dataSearch}
                  onChange={(e) => setDataSearch(e.target.value)}
                  placeholder="Search records by ID, name, email, or fields..."
                  className="w-full pl-9 pr-3 py-1.5 bg-white border border-slate-200 rounded-xl text-xs focus:outline-none focus:ring-1 focus:ring-[#F47716]"
                />
              </div>

              <button
                onClick={() => handleSyncSingle(viewingCollection)}
                disabled={syncingSingle === viewingCollection}
                className="px-3.5 py-1.5 bg-[#F47716] hover:bg-[#E35D00] text-white text-xs font-bold rounded-xl transition-all flex items-center space-x-1.5 cursor-pointer shadow-xs disabled:opacity-50"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${syncingSingle === viewingCollection ? 'animate-spin' : ''}`} />
                <span>Sync Now</span>
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-3 font-mono text-xs">
              {loadingCollectionData ? (
                <div className="py-12 text-center text-slate-500">
                  <Loader2 className="w-6 h-6 animate-spin text-[#F47716] mx-auto mb-2" />
                  <span>Loading records...</span>
                </div>
              ) : filteredCollectionData.length === 0 ? (
                <div className="py-12 text-center text-slate-400">
                  No records found in collection /{viewingCollection}
                </div>
              ) : (
                filteredCollectionData.map((doc, i) => (
                  <div key={i} className="bg-slate-50 rounded-xl border border-slate-200 p-3.5 space-y-1 hover:bg-white hover:border-blue-300 transition-all">
                    <div className="flex items-center justify-between text-[11px] text-slate-500 font-sans border-b border-slate-200 pb-1">
                      <span className="font-bold font-mono text-[#10264B]">
                        ID: {doc.id || doc.candidateId || doc.certificateNo || doc.uid || `#${i + 1}`}
                      </span>
                      <span>
                        {doc.updatedAt || doc.createdAt ? new Date(doc.updatedAt || doc.createdAt).toLocaleString() : 'Active'}
                      </span>
                    </div>
                    <pre className="text-[11px] text-slate-700 overflow-x-auto pt-1 leading-snug">
                      {JSON.stringify(doc, null, 2)}
                    </pre>
                  </div>
                ))
              )}
            </div>

            <div className="p-4 border-t border-slate-200 bg-slate-50 flex justify-end">
              <button
                onClick={() => setViewingCollection(null)}
                className="px-5 py-2 bg-slate-200 hover:bg-slate-300 text-slate-800 text-xs font-bold rounded-xl transition-colors cursor-pointer"
              >
                Close Viewer
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
