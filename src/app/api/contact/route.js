export async function POST(request) {
  try {
    const data = await request.json()

    // Log form submission (you can replace this with your email service later)
    console.log('Form submission received:', {
      name: data.fullName,
      email: data.email,
      whatsapp: data.whatsapp,
      contactMethod: data.contactMethod,
      projectDescription: data.projectDescription,
      inspiration: data.inspiration,
      deadline: data.deadline,
      videoLength: data.videoLength,
      budget: data.budget,
    })

    // TODO: Set up email sending
    // Options:
    // 1. Use Resend (https://resend.com) - npm install resend
    // 2. Use SendGrid (https://sendgrid.com)
    // 3. Use nodemailer (https://nodemailer.com) - npm install nodemailer
    // 4. Use your own email service
    
    // Example with Resend (recommended):
    /*
    import { Resend } from 'resend'
    const resend = new Resend(process.env.RESEND_API_KEY)
    
    await resend.emails.send({
      from: 'noreply@yourdomain.com',
      to: process.env.RECIPIENT_EMAIL,
      subject: `New Project Inquiry from ${data.fullName}`,
      html: `...email template...`,
      replyTo: data.email,
    })
    */

    return Response.json(
      { message: 'Form submitted successfully' },
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
