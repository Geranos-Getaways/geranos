// src/app/api/submit-trip/route.ts

import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';
import qs from 'qs';
import https from 'https';

// ⚠️ TEMPORARY SSL workaround — do NOT use in production
const httpsAgent = new https.Agent({ rejectUnauthorized: false });

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    // Clean up input data
    const sanitize = (val: any) => (typeof val === 'string' ? val.trim() : '');

    const name = sanitize(body.name);
    const email = sanitize(body.email);
    const phone = sanitize(body.phone);
    const startDate = sanitize(body.startDate);
    const endDate = sanitize(body.endDate);
    const tocity = sanitize(body.tocity);
    const adult = sanitize(body.adult);
    const child = sanitize(body.child);
    const message = sanitize(body.message);

    // Encode data for x-www-form-urlencoded format
    const postData = qs.stringify({
      name,
      email,
      phone,
      startDate,
      endDate,
      tocity,
      adult,
      child,
      message,
    });

    // Send request to CRM
    const response = await axios.post(
      'https://crm.geranosgetaways.com/websitequery.php',
      postData,
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'User-Agent':
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/113.0.0.0 Safari/537.36',
          Referer: 'https://travbizz.net/',
        },
        httpsAgent, // disable SSL verification for local testing
      }
    );

    return NextResponse.json({ message: 'CRM submission successful' }, { status: 200 });
  } catch (error: any) {
    // 🔍 Log full debug info
    console.error('❌ CRM submission error:');
    console.error('Message:', error?.message);
    console.error('Code:', error?.code);
    console.error('Response Status:', error?.response?.status);
    console.error('Response Data:', error?.response?.data);

    return NextResponse.json(
      {
        message: 'Failed to submit to CRM',
        detail: error?.message || 'Unknown error',
      },
      { status: 500 }
    );
  }
}
