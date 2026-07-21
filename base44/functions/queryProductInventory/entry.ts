import { createClientFromRequest } from 'npm:@base44/sdk@0.8.38';

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    const user = await base44.auth.me();
    if (!user) return Response.json({ error: 'Unauthorized' }, { status: 401 });

    const { accessToken } = await base44.asServiceRole.connectors.getConnection('supabase');

    // 1. Get the project ref
    const projectsRes = await fetch('https://api.supabase.com/v1/projects', {
      headers: { Authorization: `Bearer ${accessToken}` }
    });
    if (!projectsRes.ok) {
      return Response.json({ error: `Failed to list projects: ${await projectsRes.text()}` }, { status: 500 });
    }
    const projects = await projectsRes.json();
    if (!projects.length) {
      return Response.json({ error: 'No Supabase projects found for this account' }, { status: 404 });
    }
    const projectRef = projects[0].ref;

    // 2. Inspect schema (list tables + columns) via SQL introspection
    const schemaQuery = `
      select table_name, column_name, data_type, is_nullable
      from information_schema.columns
      where table_schema = 'public'
      order by table_name, ordinal_position;
    `;
    const schemaRes = await fetch(`https://api.supabase.com/v1/projects/${projectRef}/database/query/read-only`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${accessToken}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ query: schemaQuery })
    });
    if (!schemaRes.ok) {
      return Response.json({ error: `Failed to inspect schema: ${await schemaRes.text()}` }, { status: 500 });
    }
    const schemaRows = await schemaRes.json();

    const schemaByTable = {};
    for (const row of schemaRows) {
      if (!schemaByTable[row.table_name]) schemaByTable[row.table_name] = [];
      schemaByTable[row.table_name].push({
        column: row.column_name,
        type: row.data_type,
        nullable: row.is_nullable === 'YES'
      });
    }
    const tables = Object.keys(schemaByTable);
    const inventoryTableName = tables.find((t) => /product|inventory|item/i.test(t)) || null;

    let inventoryRows = [];
    let inventoryColumns = [];
    let totalCount = null;

    if (inventoryTableName) {
      // 3. Get service_role key
      const keysRes = await fetch(`https://api.supabase.com/v1/projects/${projectRef}/api-keys`, {
        headers: { Authorization: `Bearer ${accessToken}` }
      });
      if (!keysRes.ok) {
        return Response.json({ error: `Failed to get API keys: ${await keysRes.text()}` }, { status: 500 });
      }
      const keys = await keysRes.json();
      const serviceRoleKey = keys.find((k) => k.name === 'service_role')?.api_key;

      if (serviceRoleKey) {
        // 4. Query the inventory table via PostgREST
        const dataRes = await fetch(
          `https://${projectRef}.supabase.co/rest/v1/${inventoryTableName}?select=*&limit=50`,
          {
            headers: {
              apikey: serviceRoleKey,
              Authorization: `Bearer ${serviceRoleKey}`,
              Prefer: 'count=exact'
            }
          }
        );
        if (dataRes.ok) {
          inventoryRows = await dataRes.json();
          inventoryColumns = inventoryRows.length ? Object.keys(inventoryRows[0]) : [];
          const contentRange = dataRes.headers.get('content-range');
          if (contentRange && contentRange.includes('/')) {
            totalCount = contentRange.split('/')[1];
          }
        }
      }
    }

    return Response.json({
      projectRef,
      tables,
      schemaByTable,
      inventoryTableName,
      inventoryColumns,
      totalCount,
      sampleRows: inventoryRows
    });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
});