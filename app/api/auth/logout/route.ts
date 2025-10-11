import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import Session from 'supertokens-web-js/recipe/session';

export async function GET() {
  await Session.signOut();

  // Delete all cookies
  const cookieStore = await cookies();
  const allCookies = cookieStore.getAll();

  allCookies.forEach((cookie) => {
    cookieStore.delete(cookie.name);
  });

  return NextResponse.json({ success: true });
}
