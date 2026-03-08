import { cookies } from 'next/headers';
import { supabaseAdmin } from '@/lib/supabaseAdmin';
import { NextResponse } from 'next/server';

export async function POST(request) {
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

        // 2. Parse form data
        const formData = await request.formData();
        const file = formData.get('file');
        const category = formData.get('category') || 'Uncategorized';
        const folder = formData.get('folder') || 'uploads';

        if (!file) {
            return NextResponse.json({ error: 'No file provided' }, { status: 400 });
        }

        // 3. Upload to Supabase Storage - Prefix with category
        const fileExt = file.name.split('.').pop();
        const safeCategory = category.replace(/[^a-zA-Z0-9-]/g, ''); // Ensure safe filename
        const fileName = `${safeCategory}_${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
        const filePath = `${folder}/${fileName}`;

        // Convert the File object to an ArrayBuffer to upload
        const arrayBuffer = await file.arrayBuffer();
        const buffer = new Uint8Array(arrayBuffer);

        const { data, error } = await supabaseAdmin.storage
            .from('gallery-images')
            .upload(filePath, buffer, {
                contentType: file.type,
                upsert: false
            });

        if (error) {
            console.error("Supabase Upload Error:", error);
            return NextResponse.json({ error: error.message }, { status: 500 });
        }

        // 4. Get Public URL
        const { data: { publicUrl } } = supabaseAdmin.storage
            .from('gallery-images')
            .getPublicUrl(filePath);

        return NextResponse.json({ 
            success: true, 
            path: filePath, 
            url: publicUrl 
        });

    } catch (error) {
        console.error("Upload API Error:", error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
