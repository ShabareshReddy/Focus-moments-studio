import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

// This forces the route to always run dynamically (no caching)
export const dynamic = 'force-dynamic';

export async function GET(request) {
    try {
        // 1. Verify the authorization secret
        const authHeader = request.headers.get('authorization');
        
        // Ensure the CRON_SECRET is set in your environment variables
        const cronSecret = process.env.CRON_SECRET;

        // If no secret is configured, or it doesn't match the one in the header, deny access
        if (!cronSecret || authHeader !== `Bearer ${cronSecret}`) {
            return NextResponse.json(
                { error: 'Unauthorized. Invalid or missing CRON_SECRET.' }, 
                { status: 401 }
            );
        }

        // 2. Perform a lightweight generic query
        // We do a simple select on a dedicated `keep_alive` table, limiting to 1 row.
        // This counts as a "read" operation for Supabase.
        const { data, error } = await supabase
            .from('keep_alive')
            .select('id')
            .limit(1);

        if (error) {
            console.error('Keep-alive cron error fetching from Supabase:', error);
            // Even if the query failed, we still hit the DB, so it might keep it alive, but we return 500
            return NextResponse.json({ error: error.message }, { status: 500 });
        }

        // 3. Return success
        return NextResponse.json({ 
            message: 'Keep-alive ping successful!',
            timestamp: new Date().toISOString()
        }, { status: 200 });

    } catch (err) {
        console.error('Keep-alive cron unexpected error:', err);
        return NextResponse.json(
            { error: 'Internal server error during keep-alive ping.' }, 
            { status: 500 }
        );
    }
}
