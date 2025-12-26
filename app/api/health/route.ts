import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function GET() {
  try {
    // Check if Supabase URL is configured
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (!supabaseUrl || !supabaseKey) {
      return NextResponse.json({
        status: 'error',
        message: 'Supabase environment variables not configured',
        hasUrl: !!supabaseUrl,
        hasKey: !!supabaseKey
      }, { status: 500 });
    }

    // Try to query the admissions table
    const { error } = await supabase
      .from('admissions')
      .select('id')
      .limit(1);

    if (error) {
      return NextResponse.json({
        status: 'error',
        message: 'Supabase query failed',
        error: error.message,
        code: error.code
      }, { status: 500 });
    }

    return NextResponse.json({
      status: 'ok',
      message: 'Supabase connection successful',
      supabaseUrl: supabaseUrl.substring(0, 30) + '...',
      tableAccessible: true
    });
  } catch (error) {
    return NextResponse.json({
      status: 'error',
      message: 'Unexpected error',
      error: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}
