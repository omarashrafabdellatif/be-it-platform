export function json(data: unknown, init?: ResponseInit) {
  return Response.json(data, init);
}

export function badRequest(message: string, details?: unknown) {
  return json({ ok: false, message, details }, { status: 400 });
}

export function unauthorized(message = 'Unauthorized') {
  return json({ ok: false, message }, { status: 401 });
}

export function forbidden(message = 'Forbidden') {
  return json({ ok: false, message }, { status: 403 });
}
