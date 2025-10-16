import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/server/db';
import { adminUsers } from '@shared/schema';
import { eq } from 'drizzle-orm';
import { cookies } from 'next/headers';

async function checkAuth() {
  const cookieStore = await cookies();
  const session = cookieStore.get('admin-session');
  return session?.value === 'authenticated';
}

// GET - Fetch all admin users
export async function GET() {
  try {
    const isAuth = await checkAuth();
    if (!isAuth) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const users = await db.select().from(adminUsers).orderBy(adminUsers.createdAt);
    return NextResponse.json({ success: true, users });
  } catch (error) {
    console.error('Error fetching admin users:', error);
    return NextResponse.json(
      { error: 'Failed to fetch users' },
      { status: 500 }
    );
  }
}

// POST - Create a new admin user
export async function POST(request: NextRequest) {
  try {
    const isAuth = await checkAuth();
    if (!isAuth) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { username, email, role } = await request.json();

    if (!username || !email) {
      return NextResponse.json(
        { error: 'Username and email are required' },
        { status: 400 }
      );
    }

    const [newUser] = await db
      .insert(adminUsers)
      .values({
        username,
        email,
        role: role || 'admin',
      })
      .returning();

    return NextResponse.json({ success: true, user: newUser });
  } catch (error: any) {
    console.error('Error creating admin user:', error);
    
    if (error.code === '23505') {
      return NextResponse.json(
        { error: 'Username or email already exists' },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: 'Failed to create user' },
      { status: 500 }
    );
  }
}

// DELETE - Delete an admin user
export async function DELETE(request: NextRequest) {
  try {
    const isAuth = await checkAuth();
    if (!isAuth) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json(
        { error: 'User ID is required' },
        { status: 400 }
      );
    }

    await db.delete(adminUsers).where(eq(adminUsers.id, parseInt(id)));

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting admin user:', error);
    return NextResponse.json(
      { error: 'Failed to delete user' },
      { status: 500 }
    );
  }
}
