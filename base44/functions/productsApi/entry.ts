import { createClientFromRequest } from 'npm:@base44/sdk@0.8.38';

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    const url = new URL(req.url);
    const category = url.searchParams.get('category');
    const sku = url.searchParams.get('sku');
    const limit = Number(url.searchParams.get('limit')) || 100;

    const filter = { status: 'active' };
    if (category) filter.category = category;
    if (sku) filter.sku = sku;

    const products = await base44.asServiceRole.entities.Product.filter(filter, '-created_date', limit);

    return Response.json({ count: products.length, products });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
});