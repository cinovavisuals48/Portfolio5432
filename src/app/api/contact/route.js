// Note: Form submissions are now handled directly by the frontend using Web3Forms
// This endpoint is deprecated and can be safely removed in future versions

export async function POST(request) {
  return Response.json(
    { error: 'This endpoint is deprecated. Form submissions are handled directly by Web3Forms.' },
    { status: 410 }
  )
}

