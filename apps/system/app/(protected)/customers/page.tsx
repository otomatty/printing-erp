import {
  Users,
  Search,
  Plus,
  Phone,
  Mail,
  Eye,
  BarChart,
  MessageSquare,
} from 'lucide-react';
import Link from 'next/link';
import CustomersPageClient from './customers-page-client';
import { fetchCustomers } from '../../_actions/customers';

interface Customer {
  id: string;
  name: string;
  contact: string;
  email: string;
  phone: string;
  lastOrder: string;
}

export const dynamic = 'force-dynamic';

export default async function CustomersPage() {
  // データの取得
  const customers = await fetchCustomers();
  return <CustomersPageClient customers={customers} />;
}
