'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import UserManagement from '@/components/UserManagement';

type WorkshopEnrollment = {
  id: number;
  name: string;
  email: string;
  phone: string | null;
  workshop: string;
  preferredDate: string | null;
  message: string | null;
  locale: string;
  createdAt: string;
};

type ContactSubmission = {
  id: number;
  name: string;
  email: string;
  subject: string;
  message: string;
  locale: string;
  createdAt: string;
};

export default function AdminPage() {
  const router = useRouter();
  const [enrollments, setEnrollments] = useState<WorkshopEnrollment[]>([]);
  const [submissions, setSubmissions] = useState<ContactSubmission[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'enrollments' | 'contacts' | 'users'>('enrollments');
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const response = await fetch('/api/admin/auth/check');
      const data = await response.json();
      
      if (data.authenticated) {
        setIsAuthenticated(true);
        fetchData();
      } else {
        router.push('/admin/login');
      }
    } catch (error) {
      console.error('Auth check error:', error);
      router.push('/admin/login');
    }
  };

  const fetchData = async () => {
    try {
      const response = await fetch('/api/admin/data');
      const result = await response.json();
      
      if (result.success) {
        setEnrollments(result.data.enrollments);
        setSubmissions(result.data.submissions);
      }
    } catch (error) {
      console.error('Error fetching admin data:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const handleLogout = async () => {
    await fetch('/api/admin/auth/logout', { method: 'POST' });
    router.push('/admin/login');
  };

  if (isAuthenticated === null || loading) {
    return (
      <div className="min-h-screen bg-beige-light flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-terracotta mx-auto mb-4"></div>
          <p className="text-gray-600 font-inter">Loading...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null; // Will redirect to login
  }

  return (
    <div className="min-h-screen bg-beige-light">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-4xl font-playfair font-bold text-gray-800 mb-1">Admin Dashboard</h1>
              <p className="text-gray-600 font-inter">Manage workshop enrollments and contact submissions</p>
            </div>
            <div className="flex gap-3">
              <Link 
                href="/en" 
                className="px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-inter flex items-center gap-2"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                Website
              </Link>
              <button
                onClick={handleLogout}
                className="px-4 py-2 bg-terracotta text-white rounded-lg hover:bg-terracotta-dark transition-colors font-inter flex items-center gap-2"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
                Logout
              </button>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <div className="bg-gradient-to-br from-terracotta/10 to-terracotta/5 rounded-xl p-6 border border-terracotta/20">
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm font-medium text-gray-600 font-inter">Workshop Enrollments</p>
                <div className="p-2 bg-terracotta/20 rounded-lg">
                  <svg className="w-5 h-5 text-terracotta" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </div>
              </div>
              <p className="text-3xl font-bold text-gray-800 font-playfair">{enrollments.length}</p>
              <p className="text-xs text-gray-600 font-inter mt-1">Total registrations</p>
            </div>
            
            <div className="bg-gradient-to-br from-sage/10 to-sage/5 rounded-xl p-6 border border-sage/20">
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm font-medium text-gray-600 font-inter">Contact Submissions</p>
                <div className="p-2 bg-sage/20 rounded-lg">
                  <svg className="w-5 h-5 text-sage-dark" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
              </div>
              <p className="text-3xl font-bold text-gray-800 font-playfair">{submissions.length}</p>
              <p className="text-xs text-gray-600 font-inter mt-1">Total messages</p>
            </div>

            <div className="bg-gradient-to-br from-blue-50 to-blue-100/50 rounded-xl p-6 border border-blue-200">
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm font-medium text-gray-600 font-inter">Total Interactions</p>
                <div className="p-2 bg-blue-200 rounded-lg">
                  <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
              </div>
              <p className="text-3xl font-bold text-gray-800 font-playfair">{enrollments.length + submissions.length}</p>
              <p className="text-xs text-gray-600 font-inter mt-1">Combined entries</p>
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-purple-100/50 rounded-xl p-6 border border-purple-200">
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm font-medium text-gray-600 font-inter">Languages</p>
                <div className="p-2 bg-purple-200 rounded-lg">
                  <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
                  </svg>
                </div>
              </div>
              <p className="text-3xl font-bold text-gray-800 font-playfair">3</p>
              <p className="text-xs text-gray-600 font-inter mt-1">EN / NL / TR</p>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-6">
          <button
            onClick={() => setActiveTab('enrollments')}
            className={`px-6 py-3 rounded-t-lg font-inter transition-colors ${
              activeTab === 'enrollments'
                ? 'bg-white text-terracotta font-semibold'
                : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
            }`}
          >
            Workshop Enrollments ({enrollments.length})
          </button>
          <button
            onClick={() => setActiveTab('contacts')}
            className={`px-6 py-3 rounded-t-lg font-inter transition-colors ${
              activeTab === 'contacts'
                ? 'bg-white text-terracotta font-semibold'
                : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
            }`}
          >
            Contact Submissions ({submissions.length})
          </button>
          <button
            onClick={() => setActiveTab('users')}
            className={`px-6 py-3 rounded-t-lg font-inter transition-colors ${
              activeTab === 'users'
                ? 'bg-white text-terracotta font-semibold'
                : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
            }`}
          >
            User Management
          </button>
        </div>

        {/* Content */}
        {activeTab === 'users' ? (
          <UserManagement />
        ) : (
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            {activeTab === 'enrollments' ? (
            <div className="overflow-x-auto">
              {enrollments.length === 0 ? (
                <div className="p-8 text-center text-gray-500 font-inter">
                  No workshop enrollments yet.
                </div>
              ) : (
                <table className="w-full">
                  <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-inter font-semibold text-gray-600 uppercase tracking-wider">
                        Date
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-inter font-semibold text-gray-600 uppercase tracking-wider">
                        Name
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-inter font-semibold text-gray-600 uppercase tracking-wider">
                        Email
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-inter font-semibold text-gray-600 uppercase tracking-wider">
                        Phone
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-inter font-semibold text-gray-600 uppercase tracking-wider">
                        Workshop
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-inter font-semibold text-gray-600 uppercase tracking-wider">
                        Preferred Date
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-inter font-semibold text-gray-600 uppercase tracking-wider">
                        Message
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-inter font-semibold text-gray-600 uppercase tracking-wider">
                        Language
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {enrollments.map((enrollment) => (
                      <tr key={enrollment.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-inter">
                          {formatDate(enrollment.createdAt)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 font-inter">
                          {enrollment.name}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 font-inter">
                          {enrollment.email}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 font-inter">
                          {enrollment.phone || '-'}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-900 font-inter">
                          {enrollment.workshop}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 font-inter">
                          {enrollment.preferredDate || '-'}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-600 font-inter max-w-xs truncate">
                          {enrollment.message || '-'}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 font-inter uppercase">
                          {enrollment.locale}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          ) : (
            <div className="overflow-x-auto">
              {submissions.length === 0 ? (
                <div className="p-8 text-center text-gray-500 font-inter">
                  No contact submissions yet.
                </div>
              ) : (
                <table className="w-full">
                  <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-inter font-semibold text-gray-600 uppercase tracking-wider">
                        Date
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-inter font-semibold text-gray-600 uppercase tracking-wider">
                        Name
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-inter font-semibold text-gray-600 uppercase tracking-wider">
                        Email
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-inter font-semibold text-gray-600 uppercase tracking-wider">
                        Subject
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-inter font-semibold text-gray-600 uppercase tracking-wider">
                        Message
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-inter font-semibold text-gray-600 uppercase tracking-wider">
                        Language
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {submissions.map((submission) => (
                      <tr key={submission.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-inter">
                          {formatDate(submission.createdAt)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 font-inter">
                          {submission.name}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 font-inter">
                          {submission.email}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-900 font-inter">
                          {submission.subject}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-600 font-inter max-w-md">
                          <div className="line-clamp-3">{submission.message}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 font-inter uppercase">
                          {submission.locale}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          )}
          </div>
        )}
      </div>
    </div>
  );
}
