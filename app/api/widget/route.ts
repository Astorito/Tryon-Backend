import fs from 'fs';
import path from 'path';

const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, x-client-key',
};

export async function GET(req: Request) {
  try {
    const filePath = path.join(process.cwd(), 'public', 'widget-v1.js');
    if (!fs.existsSync(filePath)) {
      return new Response(JSON.stringify({ success: false, error: 'Widget not found' }), {
        status: 404,
        headers: {
          'Content-Type': 'application/json',
          ...CORS_HEADERS,
        },
      });
    }

    const code = await fs.promises.readFile(filePath, 'utf8');

    return new Response(code, {
      status: 200,
      headers: {
        'Content-Type': 'application/javascript; charset=utf-8',
        ...CORS_HEADERS,
      },
    });
  } catch (err) {
    return new Response(JSON.stringify({ success: false, error: 'Internal server error' }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
        ...CORS_HEADERS,
      },
    });
  }
}

export async function OPTIONS() {
  return new Response(JSON.stringify({ success: true }), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
      ...CORS_HEADERS,
    },
  });
}

export const dynamic = 'force-dynamic';

export default GET;
