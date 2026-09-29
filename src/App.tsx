import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from '@/contexts/ThemeContext';
import { Layout } from '@/components/layout/Layout';
import { lazy, Suspense } from 'react';

import { LoadingState } from '@/components/ui/LoadingState';
import { StateInspectorFloat } from '@/components/ui/StateInspectorFloat';

// Lazy load all pages
const Login = lazy(() => import('@/pages/Login'));
const Dashboard = lazy(() => import('@/pages/Dashboard'));
const Orders = lazy(() => import('@/pages/Orders'));
const ViewOrder = lazy(() => import('@/pages/ViewOrder'));
const CreateOrder = lazy(() => import('@/pages/CreateOrder'));
const EditOrder = lazy(() => import('@/pages/EditOrder'));
const OrderWorkflow = lazy(() => import('@/pages/OrderWorkflow'));
const OrderFiles = lazy(() => import('@/pages/OrderFiles'));
const SubOrderDetail = lazy(() => import('@/pages/SubOrderDetail'));
const Cases = lazy(() => import('@/pages/Cases'));
const CaseDetails = lazy(() => import('@/pages/CaseDetails'));
const Patients = lazy(() => import('@/pages/Patients'));
const PatientDetails = lazy(() => import('@/pages/PatientDetails'));
const Doctors = lazy(() => import('@/pages/Doctors'));
const DoctorDetails = lazy(() => import('@/pages/DoctorDetails'));
const Clinics = lazy(() => import('@/pages/Clinics'));
const ClinicDetails = lazy(() => import('@/pages/ClinicDetails'));
const Billing = lazy(() => import('@/pages/Billing'));
const Reports = lazy(() => import('@/pages/Reports'));
const Settings = lazy(() => import('@/pages/Settings'));
const Notifications = lazy(() => import('@/pages/Notifications'));
const ChangeRequests = lazy(() => import('@/pages/ChangeRequests'));
const ScanCenter = lazy(() => import('@/pages/ScanCenter'));
const WorkflowBoard = lazy(() => import('@/pages/WorkflowBoard'));
const Documents = lazy(() => import('@/pages/Documents'));
const Grid = lazy(() => import('@/pages/Grid'));
const Forms = lazy(() => import('@/pages/Forms'));

function SuspenseWrapper({ children }: { children: React.ReactNode }) {
  return <Suspense fallback={<LoadingState />}>{children}</Suspense>;
}

export default function App() {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <Routes>
          <Route path="/login" element={<SuspenseWrapper><Login /></SuspenseWrapper>} />
          <Route path="/" element={<Layout />}>
            <Route index element={<Navigate to="/dashboard" replace />} />
            <Route path="dashboard" element={<SuspenseWrapper><Dashboard /></SuspenseWrapper>} />
            <Route path="orders" element={<SuspenseWrapper><Orders /></SuspenseWrapper>} />
            <Route path="orders/create" element={<SuspenseWrapper><CreateOrder /></SuspenseWrapper>} />
            <Route path="orders/:orderId" element={<SuspenseWrapper><ViewOrder /></SuspenseWrapper>} />
            <Route path="orders/:orderId/edit" element={<SuspenseWrapper><EditOrder /></SuspenseWrapper>} />
            <Route path="orders/:orderId/workflow" element={<SuspenseWrapper><OrderWorkflow /></SuspenseWrapper>} />
            <Route path="orders/:orderId/files" element={<SuspenseWrapper><OrderFiles /></SuspenseWrapper>} />
            <Route path="orders/:orderId/sub-orders/:subOrderId" element={<SuspenseWrapper><SubOrderDetail /></SuspenseWrapper>} />
            <Route path="cases" element={<SuspenseWrapper><Cases /></SuspenseWrapper>} />
            <Route path="cases/:caseId" element={<SuspenseWrapper><CaseDetails /></SuspenseWrapper>} />
            <Route path="patients" element={<SuspenseWrapper><Patients /></SuspenseWrapper>} />
            <Route path="patients/:patientId" element={<SuspenseWrapper><PatientDetails /></SuspenseWrapper>} />
            <Route path="doctors" element={<SuspenseWrapper><Doctors /></SuspenseWrapper>} />
            <Route path="doctors/:doctorId" element={<SuspenseWrapper><DoctorDetails /></SuspenseWrapper>} />
            <Route path="clinics" element={<SuspenseWrapper><Clinics /></SuspenseWrapper>} />
            <Route path="clinics/:clinicId" element={<SuspenseWrapper><ClinicDetails /></SuspenseWrapper>} />
            <Route path="billing" element={<SuspenseWrapper><Billing /></SuspenseWrapper>} />
            <Route path="grid" element={<SuspenseWrapper><Grid /></SuspenseWrapper>} />
            <Route path="forms" element={<SuspenseWrapper><Forms /></SuspenseWrapper>} />
            <Route path="reports" element={<SuspenseWrapper><Reports /></SuspenseWrapper>} />
            <Route path="settings" element={<SuspenseWrapper><Settings /></SuspenseWrapper>} />
            <Route path="notifications" element={<SuspenseWrapper><Notifications /></SuspenseWrapper>} />
            <Route path="change-requests" element={<SuspenseWrapper><ChangeRequests /></SuspenseWrapper>} />
            <Route path="scan-center" element={<SuspenseWrapper><ScanCenter /></SuspenseWrapper>} />
            <Route path="workflow-board" element={<SuspenseWrapper><WorkflowBoard /></SuspenseWrapper>} />
            <Route path="documents" element={<SuspenseWrapper><Documents /></SuspenseWrapper>} />
          </Route>
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Routes>
        <StateInspectorFloat />
      </ThemeProvider>
    </BrowserRouter>
  );
}
