import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(request) {
  try {
    const data = await request.json()

    // Validate required fields
    if (!data.fullName || !data.email || !data.projectDescription) {
      return Response.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Create email HTML
    const emailHTML = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="UTF-8">
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%); color: white; padding: 30px; border-radius: 8px 8px 0 0; }
            .header h1 { margin: 0; font-size: 24px; }
            .content { background: #f9fafb; padding: 30px; border-radius: 0 0 8px 8px; }
            .field { margin-bottom: 20px; }
            .label { font-weight: bold; color: #3b82f6; margin-bottom: 5px; }
            .value { color: #555; white-space: pre-wrap; word-break: break-word; }
            .footer { margin-top: 30px; padding-top: 20px; border-top: 1px solid #ddd; font-size: 12px; color: #999; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>✨ New Project Booking Request</h1>
            </div>
            <div class="content">
              <div class="field">
                <div class="label">Full Name:</div>
                <div class="value">${data.fullName}</div>
              </div>

              <div class="field">
                <div class="label">Email:</div>
                <div class="value">${data.email}</div>
              </div>

              ${data.whatsapp ? `
              <div class="field">
                <div class="label">WhatsApp:</div>
                <div class="value">${data.whatsapp}</div>
              </div>
              ` : ''}

              <div class="field">
                <div class="label">Preferred Contact Method:</div>
                <div class="value">${data.contactMethod}</div>
              </div>

              <div class="field">
                <div class="label">Project Description:</div>
                <div class="value">${data.projectDescription}</div>
              </div>

              ${data.inspiration ? `
              <div class="field">
                <div class="label">Inspiration & References:</div>
                <div class="value">${data.inspiration}</div>
              </div>
              ` : ''}

              <div class="field">
                <div class="label">Deadline:</div>
                <div class="value">${data.deadline}</div>
              </div>

              <div class="field">
                <div class="label">Video Length:</div>
                <div class="value">${data.videoLength}</div>
              </div>

              <div class="field">
                <div class="label">Budget:</div>
                <div class="value">${data.budget}</div>
              </div>

              <div class="footer">
                <p>This email was sent from your portfolio website's project booking form.</p>
              </div>
            </div>
          </div>
        </body>
      </html>
    `

    // Send email via Resend
    const email = await resend.emails.send({
      from: 'noreply@cinova-visuals.com',
      to: 'cinovavisuals48@gmail.com',
      replyTo: data.email,
      subject: `New Project Inquiry from ${data.fullName}`,
      html: emailHTML,
    })

    // Log the submission
    console.log('Form submitted successfully:', {
      email: email.id,
      clientEmail: data.email,
      name: data.fullName,
    })

    return Response.json(
      { 
        message: 'Form submitted successfully',
        id: email.id 
      },
      { status: 200 }
    )
  } catch (error) {
    console.error('Error processing form:', error)
    return Response.json(
      { error: 'Failed to submit form. Please try again.' },
      { status: 500 }
    )
  }
}

