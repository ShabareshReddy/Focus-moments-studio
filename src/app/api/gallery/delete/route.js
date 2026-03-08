import { cookies } from 'next/headers';
import { supabaseAdmin } from '@/lib/supabaseAdmin';
import { NextResponse } from 'next/server';

export async function DELETE(request) {
    try {
        // 1. Verify admin cookie
        const cookieStore = await cookies();
        const adminAuth = cookieStore.get('admin_auth');

        if (!adminAuth || adminAuth.value !== 'true') {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        if (!supabaseAdmin) {
            return NextResponse.json({ error: 'Supabase admin client not configured' }, { status: 500 });
        }

        // 2. Parse request body to get the file path
        const { path } = await request.json();

        if (!path) {
            return NextResponse.json({ error: 'No file path provided' }, { status: 400 });
        }

        // 3. Delete from Supabase Storage
        const { data, error } = await supabaseAdmin.storage
            .from('gallery-images')
            .remove([path]);

        if (error) {
            console.error("Supabase Delete Error:", error);
            return NextResponse.json({ error: error.message }, { status: 500 });
        }

        return NextResponse.json({ success: true, message: 'File deleted successfully' });

    } catch (error) {
        console.error("Delete API Error:", error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
