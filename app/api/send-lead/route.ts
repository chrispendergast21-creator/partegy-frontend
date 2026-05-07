import { NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, company, type } = body;

    await resend.emails.send({
      from: 'Partegy Leads <onboarding@resend.dev>',
      to: 'chris@partegy.co',
      subject: `New ${type === 'demo' ? 'Demo' : 'Audit'} Request from ${name}`,
      html: `
        <h2>New Lead Captured!</h2>
        <p><strong>Type:</strong> ${type === 'demo' ? 'Demo Request' : 'Partnership Health Audit'}</p>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Company:</strong> ${company}</p>
      `
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Email error:', error);
    return NextResponse.json({ error: 'Failed to send email' }, { status: 500 });
  }
}
