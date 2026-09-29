import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ScanLine, MapPin, Server, ArrowRight, LayoutGrid, List } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { SearchInput } from '@/components/ui/SearchInput';
import { LoadingState } from '@/components/ui/LoadingState';
import { EmptyState } from '@/components/ui/EmptyState';
import { formatDate } from '@/utils/format';
import { api } from '@/services/api';
import { useFetch } from '@/hooks/useFetch';
import { useTableState } from '@/hooks/useTableState';
import { useStore } from '@/hooks/useStore';

export default function ScanCenter() {
  const [viewMode, setViewMode] = useState<'table' | 'grid'>('table');
  const { data: centersData, loading: centersLoading } = useFetch(api.getScanCenters);
  const orders = useStore(s => s.getOrders());
  const { searchQuery, setSearchQuery } = useTableState();

  if (centersLoading) return <LoadingState text="Loading scan center data..." />;

  const centers = centersData || [];
  
  const scanOrders = orders.filter(o => o.scanCenterName || o.scanCenterId);
  
  const filteredOrders = scanOrders.filter(o => 
    (o.orderNumber || o.id).toLowerCase().includes(searchQuery.toLowerCase()) ||
    (o.patientName || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
    (o.doctorName || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
    (o.scanCenterName || '').toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getScanStatus = (status: string) => {
    if (status === 'Completed' || status === 'Ready') return 'Done';
    if (status === 'Review') return 'Review';
    return 'Active';
  };

  const getScanStatusColor = (status: string) => {
    if (status === 'Done') return 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400';
    if (status === 'Review') return 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400';
    return 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400';
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto p-4 sm:p-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Scan Center</h1>
        <p className="text-gray-500 dark:text-gray-400 mt-1">Manage scan centers, devices, and incoming digital impressions</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
        {centers.map(center => (
          <div key={center.id} className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-5">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white truncate">{center.name}</h3>
                <div className="flex items-center text-xs text-gray-500 dark:text-gray-400 mt-1">
                  <MapPin className="w-3 h-3 mr-1" />
                  <span className="truncate">{center.location}</span>
                </div>
              </div>
              <div className={`px-2 py-0.5 rounded-full text-xs font-medium ${center.status === 'Operational' ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' : 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400'}`}>
                {{ Operational: 'Active', Maintenance: 'Maintenance' }[center.status] || center.status}
              </div>
            </div>
            
            <div className="flex items-center text-sm text-gray-600 dark:text-gray-300 mb-4">
              <Server className="w-4 h-4 mr-2 text-gray-400" />
              <span className="text-xs truncate">Operator: {center.operator}</span>
            </div>
            
            <div className="grid grid-cols-3 gap-2 border-t border-gray-100 dark:border-gray-700 pt-4">
              <div className="text-center">
                <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">Active</div>
                <div className="font-semibold text-blue-600 dark:text-blue-400">{center.activeOrders}</div>
              </div>
              <div className="text-center">
                <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">Today</div>
                <div className="font-semibold text-green-600 dark:text-green-400">{center.completedToday}</div>
              </div>
              <div className="text-center">
                <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">Devices</div>
                <div className="font-semibold text-gray-900 dark:text-white">{center.devices}</div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
        <div className="p-4 sm:p-6 border-b border-gray-200 dark:border-gray-700 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h2 className="text-lg font-bold text-gray-900 dark:text-white">Scan Orders</h2>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Orders associated with scan centers ({filteredOrders.length})</p>
          </div>
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <div className="w-full sm:w-72">
              <SearchInput
                value={searchQuery}
                onChange={setSearchQuery}
                placeholder="Search scan orders..."
              />
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
        </div>

        {filteredOrders.length === 0 ? (
          <EmptyState
            icon={<ScanLine className="w-8 h-8 opacity-60" />}
            title="No scan orders found"
            description="Adjust search query or check back later."
          />
        ) : viewMode === 'table' ? (
          <div className="w-full">
            <table className="w-full text-left divide-y divide-gray-200 dark:divide-gray-700">
              <thead>
                <tr className="text-xs text-gray-500 dark:text-gray-400 uppercase bg-gray-50 dark:bg-gray-900">
                  <th className="px-4 py-3">Order #</th>
                  <th className="px-4 py-3">Patient</th>
                  <th className="hidden md:table-cell px-4 py-3">Doctor</th>
                  <th className="hidden lg:table-cell px-4 py-3">Scan Center</th>
                  <th className="hidden sm:table-cell px-4 py-3">Restoration</th>
                  <th className="hidden xl:table-cell px-4 py-3">Format</th>
                  <th className="px-4 py-3">Scan Status</th>
                  <th className="hidden lg:table-cell px-4 py-3">Received</th>
                  <th className="px-4 py-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700 text-sm text-gray-700 dark:text-gray-300">
                {filteredOrders.map((order) => {
                  const sStatus = getScanStatus(order.status);
                  return (
                    <tr key={order.id} className="hover:bg-gray-50 dark:hover:bg-slate-800 transition-colors">
                      <td className="px-4 py-3 font-mono font-medium text-blue-600 dark:text-blue-400 whitespace-nowrap">{order.orderNumber}</td>
                      <td className="px-4 py-3 text-gray-900 dark:text-white font-medium max-w-[140px] truncate">{order.patientName}</td>
                      <td className="hidden md:table-cell px-4 py-3 max-w-[130px] truncate">{order.doctorName}</td>
                      <td className="hidden lg:table-cell px-4 py-3 max-w-[130px] truncate">{order.scanCenterName}</td>
                      <td className="hidden sm:table-cell px-4 py-3">{order.restoration}</td>
                      <td className="hidden xl:table-cell px-4 py-3">
                        <span className="font-mono text-xs bg-gray-100 dark:bg-gray-700 px-2 py-0.5 rounded">{order.format}</span>
                      </td>
                      <td className="px-4 py-3">
                        <span className={`px-2.5 py-1 rounded-full text-xs font-medium whitespace-nowrap ${getScanStatusColor(sStatus)}`}>
                          {sStatus}
                        </span>
                      </td>
                      <td className="hidden lg:table-cell px-4 py-3 text-gray-500 whitespace-nowrap">{formatDate(order.receivedAt)}</td>
                      <td className="px-4 py-3 text-right">
                        <Link to={`/orders/${order.id}`}>
                          <Button size="sm" variant="outline">
                            View <ArrowRight className="w-3.5 h-3.5 ml-1" />
                          </Button>
                        </Link>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="p-4 sm:p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredOrders.map((order) => {
              const sStatus = getScanStatus(order.status);
              return (
                <div key={order.id} className="bg-gray-50 dark:bg-slate-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700 flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-mono text-sm font-semibold text-blue-600 dark:text-blue-400">{order.orderNumber}</span>
                      <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${getScanStatusColor(sStatus)}`}>
                        {sStatus}
                      </span>
                    </div>
                    <h4 className="font-medium text-gray-900 dark:text-white mb-2">{order.patientName}</h4>
                    <div className="text-xs text-gray-500 dark:text-gray-400 space-y-1">
                      <p><span className="text-gray-400">Doctor:</span> {order.doctorName}</p>
                      <p><span className="text-gray-400">Center:</span> {order.scanCenterName}</p>
                      <p><span className="text-gray-400">Restoration:</span> {order.restoration} ({order.format})</p>
                      <p><span className="text-gray-400">Received:</span> {formatDate(order.receivedAt)}</p>
                    </div>
                  </div>
                  <div className="mt-4 pt-3 border-t border-gray-200 dark:border-gray-700 flex justify-end">
                    <Link to={`/orders/${order.id}`}>
                      <Button size="sm" variant="outline">
                        View Details <ArrowRight className="w-3.5 h-3.5 ml-1" />
                      </Button>
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
