import { NextResponse } from 'next/server';
import { supabase } from '@/utils/supabase';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const slugParam = searchParams.get('slug');

  if (!slugParam) {
    return NextResponse.json({ error: 'Missing slug parameter. Format should be @username/agent-name' }, { status: 400 });
  }

  // Parse the slug: @username/agent-name
  const match = slugParam.match(/^@([^\/]+)\/(.+)$/);

  if (!match) {
    return NextResponse.json({ error: 'Invalid slug format. Expected @username/agent-name' }, { status: 400 });
  }

  const [, username, agentSlug] = match;

  // 1. Find user by username
  const { data: profileData, error: profileError } = await supabase
    .from('profiles')
    .select('id, username')
    .eq('username', username)
    .single();

  if (profileError || !profileData) {
    return NextResponse.json({ error: 'User not found' }, { status: 404 });
  }

  // 2. Find agent by user_id and slug
  const { data: agentData, error: agentError } = await supabase
    .from('agents')
    .select('name, version, compatibility, payload_md')
    .eq('user_id', profileData.id)
    .eq('slug', agentSlug)
    .single();

  if (agentError || !agentData) {
    return NextResponse.json({ error: 'Agent not found' }, { status: 404 });
  }

  // 3. Return formatted payload
  return NextResponse.json({
    name: agentData.name,
    author: profileData.username,
    version: agentData.version,
    compatibility: agentData.compatibility,
    payload: agentData.payload_md,
  });
}
