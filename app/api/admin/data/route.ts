import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/server/db';
import { workshopEnrollments, contactSubmissions } from '@shared/schema';
import { desc } from 'drizzle-orm';

export async function GET(request: NextRequest) {
  try {
    // Fetch all workshop enrollments, ordered by most recent first
    const enrollments = await db
      .select()
      .from(workshopEnrollments)
      .orderBy(desc(workshopEnrollments.createdAt));

    // Fetch all contact submissions, ordered by most recent first
    const submissions = await db
      .select()
      .from(contactSubmissions)
      .orderBy(desc(contactSubmissions.createdAt));

    return NextResponse.json(
      {
        success: true,
        data: {
          enrollments,
          submissions,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error fetching admin data:', error);
    return NextResponse.json(
      { error: 'Failed to fetch data' },
      { status: 500 }
    );
  }
}
