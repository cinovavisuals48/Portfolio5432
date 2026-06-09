// ⚠️ DEPRECATED: This API route is no longer used
// 
// Migration to Tally Form - December 2024
// The form backend has been moved to Tally.so for better management.
// All form submissions are now handled directly by Tally.
//
// You can safely delete the /src/app/api/contact directory.
// See TALLY_SETUP.md for migration details.

export async function POST(request) {
  return Response.json(
    { error: 'This endpoint is deprecated. Please use Tally.so form instead.' },
    { status: 410 }
  )
}

