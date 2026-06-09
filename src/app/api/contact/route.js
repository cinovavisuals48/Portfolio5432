import { Resend } from 'resend'

export async function POST(request) {
  try {
    // Initialize Resend with API key at runtime
    const resend = new Resend(process.env.RESEND_API_KEY)

    const data = await request.json()

    // Validate required fields
    if (!data.fullName || !data.email || !data.projectDescription) {
      return Response.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Send email to you
    const emailResult = await resend.emails.send({
      from: 'Project Inquiry <onboarding@resend.dev>',
      to: process.env.RECIPIENT_EMAIL || 'cinovavisuals48@gmail.com',
      replyTo: data.email,
      subject: `🎬 New Project Inquiry from ${data.fullName}`,
      html: `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 32px 24px; text-align: center; border-radius: 12px 12px 0 0;">
            <h1 style="margin: 0; font-size: 28px; font-weight: 800;">New Project Inquiry</h1>
          </div>
          
          <div style="background: #f9fafb; padding: 32px 24px; border-radius: 0 0 12px 12px; border: 1px solid #e5e7eb;">
            <div style="margin-bottom: 28px;">
              <h2 style="margin: 0 0 16px 0; font-size: 16px; font-weight: 700; color: #1f2937; text-transform: uppercase; letter-spacing: 0.05em;">Client Information</h2>
              <div style="background: white; padding: 16px; border-radius: 8px; border-left: 4px solid #667eea;">
                <p style="margin: 8px 0; font-size: 14px; color: #4b5563;"><strong>Name:</strong> ${data.fullName}</p>
                <p style="margin: 8px 0; font-size: 14px; color: #4b5563;"><strong>Email:</strong> <a href="mailto:${data.email}" style="color: #667eea; text-decoration: none;">${data.email}</a></p>
                ${data.whatsapp ? `<p style="margin: 8px 0; font-size: 14px; color: #4b5563;"><strong>WhatsApp:</strong> ${data.whatsapp}</p>` : ''}
                <p style="margin: 8px 0; font-size: 14px; color: #4b5563;"><strong>Preferred Contact:</strong> ${data.contactMethod}</p>
              </div>
            </div>

            <div style="margin-bottom: 28px;">
              <h2 style="margin: 0 0 16px 0; font-size: 16px; font-weight: 700; color: #1f2937; text-transform: uppercase; letter-spacing: 0.05em;">Project Details</h2>
              <div style="background: white; padding: 16px; border-radius: 8px; border-left: 4px solid #667eea;">
                <p style="margin: 0 0 12px 0; font-size: 13px; font-weight: 600; color: #6b7280; text-transform: uppercase; letter-spacing: 0.05em;">Description</p>
                <p style="margin: 0 0 20px 0; font-size: 14px; color: #374151; line-height: 1.6; white-space: pre-wrap;">${data.projectDescription}</p>
                
                ${data.inspiration ? `
                  <p style="margin: 0 0 8px 0; font-size: 13px; font-weight: 600; color: #6b7280; text-transform: uppercase; letter-spacing: 0.05em;">Inspiration & References</p>
                  <p style="margin: 0 0 20px 0; font-size: 14px; color: #374151; line-height: 1.6; white-space: pre-wrap;">${data.inspiration}</p>
                ` : ''}

                <p style="margin: 0 0 8px 0; font-size: 13px; font-weight: 600; color: #6b7280; text-transform: uppercase; letter-spacing: 0.05em;">Timeline</p>
                <p style="margin: 0 0 12px 0; font-size: 14px; color: #374151;">📅 ${data.deadline}</p>

                <p style="margin: 0 0 8px 0; font-size: 13px; font-weight: 600; color: #6b7280; text-transform: uppercase; letter-spacing: 0.05em;">Video Length</p>
                <p style="margin: 0 0 12px 0; font-size: 14px; color: #374151;">🎬 ${data.videoLength}</p>

                <p style="margin: 0 0 8px 0; font-size: 13px; font-weight: 600; color: #6b7280; text-transform: uppercase; letter-spacing: 0.05em;">Budget</p>
                <p style="margin: 0; font-size: 14px; color: #374151;">💰 ${data.budget}</p>
              </div>
            </div>

            <div style="border-top: 1px solid #e5e7eb; padding-top: 20px;">
              <p style="margin: 0; font-size: 12px; color: #6b7280; text-align: center;">
                <strong>Reply directly to this email</strong> to respond to the client at <a href="mailto:${data.email}" style="color: #667eea; text-decoration: none;">${data.email}</a>
              </p>
            </div>
          </div>
        </div>
      `,
    })

    if (emailResult.error) {
      console.error('Resend error:', emailResult.error)
      return Response.json(
        { error: 'Failed to send email' },
        { status: 500 }
      )
    }

    return Response.json(
      { 
        message: 'Form submitted successfully',
        id: emailResult.data?.id 
      },
      { status: 200 }
    )
  } catch (error) {
    console.error('Error processing form:', error)
    return Response.json(
      { error: 'Failed to submit form' },
      { status: 500 }
    )
  }
}
