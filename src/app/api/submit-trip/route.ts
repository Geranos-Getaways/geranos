// src/app/api/submit-trip/route.ts
import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';
import qs from 'qs';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const { name, email, phone, startDate, endDate, tocity, adult, child, message } = body;

    const postData = qs.stringify({
      name,
      email,
      startDate,
      endDate,
      phone,
      tocity,
      message,
      adult,
      child,
    });

    await axios.post('https://travbizz.net/holidaybreak/website_enquiry.php', postData, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });

    return NextResponse.json({ message: 'CRM submission successful' }, { status: 200 });
  } catch (error: any) {
    console.error('CRM submission error:', {
      message: error.message,
      responseData: error.response?.data,
      status: error.response?.status,
    });

    return NextResponse.json(
      {
        message: 'Failed to submit to CRM',
        detail: error.message || 'Unknown error',
      },
      { status: 500 }
    );
  }
}
