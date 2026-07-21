import { createClientFromRequest } from 'npm:@base44/sdk@0.8.38';

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    const user = await base44.auth.me();
    if (!user) return Response.json({ error: 'Unauthorized' }, { status: 401 });

    const { accessToken } = await base44.asServiceRole.connectors.getConnection('supabase');

    const response = await fetch('https://api.supabase.com/v1/projects', {
      headers: { 'Authorization': `Bearer ${accessToken}` }
    });

    if (!response.ok) {
      const text = await response.text();
      return Response.json({ error: `Supabase API error: ${text}` }, { status: response.status });
    }

    const projects = await response.json();
    const summary = projects.map(p => ({
      name: p.name,
      ref: p.id,
      status: p.status,
      region: p.region,
      created_at: p.created_at
    }));

    return Response.json({ projects: summary });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
});