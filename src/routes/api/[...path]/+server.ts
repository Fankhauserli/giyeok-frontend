import type { RequestHandler } from './$types';

export const fallback: RequestHandler = async ({ request, params, fetch }) => {
    const backendUrl = process.env.BACKEND_URL || 'http://localhost:8080';
    const path = params.path;
    const url = new URL(request.url);
    const targetUrl = `${backendUrl}/api/${path}${url.search}`;

    const headers = new Headers(request.headers);
    headers.delete('host'); // Let the fetch agent set the correct host

    const res = await fetch(targetUrl, {
        method: request.method,
        headers,
        body: request.method !== 'GET' && request.method !== 'HEAD' ? await request.arrayBuffer() : undefined,
        duplex: 'half'
    } as any);

    return res;
};
