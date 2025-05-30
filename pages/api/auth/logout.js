import { removeTokenCookie } from '../../../src/lib/auth-cookies'

export default async function logout (req, res) {
  removeTokenCookie(res)
  res.writeHead(302, { Location: '/' })
  res.end()
}
