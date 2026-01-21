export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }
  const { name, email, service, details } = req.body || {};
  if (!name || !email || !service || !details) {
    return res.status(400).json({ error: 'Missing required fields' });
  }
  return res.status(200).json({ ok: true });
}
