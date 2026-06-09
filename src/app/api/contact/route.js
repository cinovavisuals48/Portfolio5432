import nodemailer from 'nodemailer'

export async function POST(request) {
  try {
    const data = await request.json()

    // Configure your email service here
    // For now, we'll just log the data and return success
    console.log('Form submission received:', data)

    // TODO: Set up email sending via nodemailer or your preferred service
    // Example with nodemailer:
    /*
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
    })

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: process.env.RECIPIENT_EMAIL,
      subject: `New Project Inquiry from ${data.fullName}`,
      html: `
        <h2>New Project Booking</h2>
        <p><strong>Name:</strong> ${data.fullName}</p>
        <p><strong>Email:</strong> ${data.email}</p>
        <p><strong>WhatsApp:</strong> ${data.whatsapp || 'Not provided'}</p>
        <p><strong>Preferred Contact:</strong> ${data.contactMethod}</p>
        <p><strong>Project Description:</strong></p>
        <p>${data.projectDescription.replace(/\n/g, '<br>')}</p>
        <p><strong>Inspiration & References:</strong></p>
        <p>${data.inspiration ? data.inspiration.replace(/\n/g, '<br>') : 'Not provided'}</p>
        <p><strong>Deadline:</strong> ${data.deadline}</p>
        <p><strong>Video Length:</strong> ${data.videoLength}</p>
        <p><strong>Budget:</strong> ${data.budget}</p>
      `,
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
