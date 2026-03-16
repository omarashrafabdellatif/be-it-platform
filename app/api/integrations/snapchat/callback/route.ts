export async function GET(request: Request) {
  return Response.redirect(new URL('/app/integrations', request.url), 302);
}
