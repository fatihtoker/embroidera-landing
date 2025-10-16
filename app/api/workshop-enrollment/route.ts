import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/server/db';
import { workshopEnrollments, type InsertWorkshopEnrollment } from '@shared/schema';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validate required fields
    if (!body.name || !body.email || !body.workshop) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Insert into database
    const enrollment: InsertWorkshopEnrollment = {
      name: body.name,
      email: body.email,
      phone: body.phone || null,
      workshop: body.workshop,
      preferredDate: body.preferredDate || null,
      message: body.message || null,
      locale: body.locale || 'en',
    };

    const [result] = await db
      .insert(workshopEnrollments)
      .values(enrollment)
      .returning();

    return NextResponse.json(
      { success: true, data: result },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error saving workshop enrollment:', error);
    return NextResponse.json(
      { error: 'Failed to save enrollment' },
      { status: 500 }
    );
  }
}
