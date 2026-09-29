import React, { useState } from 'react';
import { api } from '@/services/api';
import { useFetch } from '@/hooks/useFetch';
import { useTableState } from '@/hooks/useTableState';
import { SearchInput } from '@/components/ui/SearchInput';
import { Select } from '@/components/ui/Select';
import { Pagination } from '@/components/ui/Pagination';
import { EmptyState } from '@/components/ui/EmptyState';
import { LoadingState } from '@/components/ui/LoadingState';
import { formatDate } from '@/utils/format';
import { FileText, Download, Eye, LayoutGrid, List } from 'lucide-react';
import { Link } from 'react-router-dom';

const getCategoryStyle = (category: string) => {
  switch (category) {
    case 'Prescriptions': return 'bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-400';
    case 'Scan Files': return 'bg-cyan-100 text-cyan-700 dark:bg-cyan-900/40 dark:text-cyan-400';
    case 'Patient Photos': return 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-400';
    case 'Invoices': return 'bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-400';
    case 'Reports': return 'bg-purple-100 text-purple-700 dark:bg-purple-900/40 dark:text-purple-400';
    default: return 'bg-slate-100 text-slate-700 dark:bg-gray-700 dark:text-gray-300';
  }
};

export default function Documents() {
  const [viewMode, setViewMode] = useState<'table' | 'grid'>('table');
  const { data: documentsData, loading, error } = useFetch(api.getDocuments);
  
  const {
    searchQuery,
    setSearchQuery,
    statusFilter: categoryFilter,
    setStatusFilter: setCategoryFilter,
    currentPage,
    setCurrentPage,
    pageSize,
  } = useTableState();

  if (loading) return <LoadingState text="Loading documents..." />;
  if (error) return <div className="text-red-500 p-6">Error loading documents</div>;

  const documents = documentsData || [];

  const filteredDocs = documents.filter(doc => {
    const matchesSearch = doc.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          (doc.patientName || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
                          (doc.orderId || doc.orderNumber || '').toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = categoryFilter === 'All' || doc.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  const totalPages = Math.ceil(filteredDocs.length / pageSize);
  const paginatedDocs = filteredDocs.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  return (
    <div className="space-y-6 max-w-7xl mx-auto w-full min-w-0">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Documents</h1>
        <p className="text-gray-500 dark:text-gray-400 mt-1">Manage files, prescriptions, and reports ({documents.length} total)</p>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
        <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto flex-1">
            <div className="w-full sm:w-72">
              <SearchInput placeholder="Search documents..." value={searchQuery} onChange={setSearchQuery} />
            </div>
            <div className="w-full sm:w-48">
              <Select
                value={categoryFilter}
                onChange={setCategoryFilter}
                options={[
                  { value: 'All', label: 'All Categories' },
                  { value: 'Prescriptions', label: 'Prescriptions' },
                  { value: 'Scan Files', label: 'Scan Files' },
                  { value: 'Patient Photos', label: 'Patient Photos' },
                  { value: 'Invoices', label: 'Invoices' },
                  { value: 'Reports', label: 'Reports' },
                ]}
              />
            </div>
          </div>

          <div className="flex items-center gap-1 border border-gray-200 dark:border-gray-700 rounded-md p-1 bg-gray-50 dark:bg-gray-900 shrink-0">
            <button 
              onClick={() => setViewMode('table')}
              className={`p-1.5 rounded transition-colors ${viewMode === 'table' ? 'bg-white dark:bg-gray-700 shadow-sm text-blue-600 dark:text-blue-400' : 'text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'}`}
              title="Table View"
            >
              <List className="w-4 h-4" />
            </button>
            <button 
              onClick={() => setViewMode('grid')}
              className={`p-1.5 rounded transition-colors ${viewMode === 'grid' ? 'bg-white dark:bg-gray-700 shadow-sm text-blue-600 dark:text-blue-400' : 'text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'}`}
              title="Card Grid View"
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
          </div>
        </div>

        {paginatedDocs.length === 0 ? (
          <EmptyState title="No documents found" description="Try adjusting your filters or search query." icon={<FileText className="w-8 h-8" />} />
        ) : viewMode === 'table' ? (
          <div className="w-full overflow-x-auto">
            <table className="w-full min-w-[700px] text-left divide-y divide-gray-200 dark:divide-gray-700">
              <thead>
                <tr className="bg-gray-50 dark:bg-gray-900 text-xs text-gray-500 dark:text-gray-400 uppercase">
                  <th className="px-4 py-3">Name</th>
                  <th className="px-4 py-3">Category</th>
                  <th className="hidden sm:table-cell px-4 py-3">Size</th>
                  <th className="hidden md:table-cell px-4 py-3">Date</th>
                  <th className="hidden lg:table-cell px-4 py-3">Patient</th>
                  <th className="hidden xl:table-cell px-4 py-3">Doctor</th>
                  <th className="px-4 py-3">Order #</th>
                  <th className="px-4 py-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700 text-sm text-gray-700 dark:text-gray-300">
                {paginatedDocs.map((doc) => (
                  <tr key={doc.id} className="hover:bg-gray-50 dark:hover:bg-slate-800 transition-colors">
                    <td className="px-4 py-3 font-medium text-gray-900 dark:text-white flex items-center max-w-[200px] truncate">
                      <FileText className="w-4 h-4 mr-2 text-gray-400 shrink-0" />
                      <span className="truncate">{doc.name}</span>
                    </td>
                    <td className="px-4 py-3">
                      <span className={`px-2.5 py-1 rounded-full text-xs font-medium whitespace-nowrap ${getCategoryStyle(doc.category)}`}>
                        {doc.category}
                      </span>
                    </td>
                    <td className="hidden sm:table-cell px-4 py-3 text-gray-500 dark:text-gray-400">{doc.size}</td>
                    <td className="hidden md:table-cell px-4 py-3 text-gray-500 dark:text-gray-400 whitespace-nowrap">{formatDate(doc.date || (doc as any).uploadedAt)}</td>
                    <td className="hidden lg:table-cell px-4 py-3 max-w-[130px] truncate">{doc.patientName || '-'}</td>
                    <td className="hidden xl:table-cell px-4 py-3 max-w-[130px] truncate">{doc.doctor || (doc as any).doctorName || '-'}</td>
                    <td className="px-4 py-3">
                      {doc.orderNumber || doc.orderId ? (
                        <Link to={`/orders/${doc.orderId || doc.orderNumber}`} className="text-blue-600 dark:text-blue-400 hover:underline font-mono text-xs">
                          {doc.orderNumber || doc.orderId}
                        </Link>
                      ) : (
                        <span className="text-gray-400">-</span>
                      )}
                    </td>
                    <td className="px-4 py-3 text-right space-x-2 whitespace-nowrap">
                      <button className="text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors p-1" title="View">
                        <Eye className="w-4 h-4 inline-block" />
                      </button>
                      <button className="text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors p-1" title="Download">
                        <Download className="w-4 h-4 inline-block" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="p-4 sm:p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {paginatedDocs.map((doc) => (
              <div key={doc.id} className="bg-gray-50 dark:bg-slate-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700 flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-start mb-2">
                    <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${getCategoryStyle(doc.category)}`}>
                      {doc.category}
                    </span>
                    <span className="text-xs text-gray-400">{doc.size}</span>
                  </div>
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-2 flex items-center">
                    <FileText className="w-4 h-4 mr-1.5 text-blue-500 shrink-0" />
                    <span className="truncate">{doc.name}</span>
                  </h4>
                  <div className="text-xs text-gray-500 dark:text-gray-400 space-y-1">
                    {doc.patientName && <p><span className="text-gray-400">Patient:</span> {doc.patientName}</p>}
                    {(doc.doctor || (doc as any).doctorName) && <p><span className="text-gray-400">Doctor:</span> {doc.doctor || (doc as any).doctorName}</p>}
                    {(doc.orderNumber || doc.orderId) && (
                      <p><span className="text-gray-400">Order:</span> <Link to={`/orders/${doc.orderId || doc.orderNumber}`} className="text-blue-600 dark:text-blue-400 hover:underline font-mono">{doc.orderNumber || doc.orderId}</Link></p>
                    )}
                    <p><span className="text-gray-400">Date:</span> {formatDate(doc.date || (doc as any).uploadedAt)}</p>
                  </div>
                </div>
                <div className="mt-4 pt-3 border-t border-gray-200 dark:border-gray-700 flex justify-end gap-2">
                  <button className="px-3 py-1.5 rounded-md border border-gray-200 dark:border-gray-700 text-xs font-medium text-gray-700 dark:text-gray-300 hover:bg-white dark:hover:bg-gray-700 flex items-center gap-1 transition-colors">
                    <Eye className="w-3.5 h-3.5" /> View
                  </button>
                  <button className="px-3 py-1.5 rounded-md bg-blue-600 text-white text-xs font-medium hover:bg-blue-700 flex items-center gap-1 transition-colors">
                    <Download className="w-3.5 h-3.5" /> Download
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="p-4 border-t border-gray-200 dark:border-gray-700 flex justify-end">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
            pageSize={pageSize}
            totalCount={filteredDocs.length}
          />
        </div>
      </div>
    </div>
  );
}
