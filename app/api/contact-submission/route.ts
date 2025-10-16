import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/server/db';
import { contactSubmissions, type InsertContactSubmission } from '@shared/schema';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validate required fields
    if (!body.name || !body.email || !body.subject || !body.message) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Insert into database
    const submission: InsertContactSubmission = {
      name: body.name,
      email: body.email,
      subject: body.subject,
      message: body.message,
      locale: body.locale || 'en',
    };

    const [result] = await db
      .insert(contactSubmissions)
      .values(submission)
      .returning();

    return NextResponse.json(
      { success: true, data: result },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error saving contact submission:', error);
    return NextResponse.json(
      { error: 'Failed to save submission' },
      { status: 500 }
    );
  }
}
