'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

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
  const [enrollments, setEnrollments] = useState<WorkshopEnrollment[]>([]);
  const [submissions, setSubmissions] = useState<ContactSubmission[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'enrollments' | 'contacts'>('enrollments');

  useEffect(() => {
    fetchData();
  }, []);

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

  if (loading) {
    return (
      <div className="min-h-screen bg-beige-light flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-terracotta mx-auto mb-4"></div>
          <p className="text-gray-600 font-inter">Loading data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-beige-light">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-4xl font-playfair font-bold text-gray-800">Admin Dashboard</h1>
            <Link 
              href="/en" 
              className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors font-inter"
            >
              ← Back to Website
            </Link>
          </div>
          <div className="flex gap-4 text-sm font-inter">
            <div className="bg-white rounded-lg p-4 shadow flex-1">
              <p className="text-gray-600 mb-1">Workshop Enrollments</p>
              <p className="text-3xl font-bold text-terracotta">{enrollments.length}</p>
            </div>
            <div className="bg-white rounded-lg p-4 shadow flex-1">
              <p className="text-gray-600 mb-1">Contact Submissions</p>
              <p className="text-3xl font-bold text-sage-dark">{submissions.length}</p>
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
        </div>

        {/* Content */}
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
      </div>
    </div>
  );
}
