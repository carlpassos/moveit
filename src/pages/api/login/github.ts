import { NowRequest, NowResponse } from '@vercel/node'
import { useCookies } from "react-cookie"
import { serialize } from 'cookie'


const clientId = process.env.GITHUB_CLIENT_ID
const clientSecret = process.env.GITHUB_CLIENT_SECRET

  async function getAccessToken (code) {
    const res = await fetch('https://github.com/login/oauth/access_token', {
    method: "POST",  
    headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        client_id: clientId,
        client_secret: clientSecret,
        code
      })
    })

    const data = await res.text();

    const params = new URLSearchParams(data);
    return params.get('access_token')
  }

  async function getGithubUser (access_token) {
    const req = await fetch('https://api.github.com/user', {
      headers: {
        Authorization: `bearer ${access_token}`
      }
    })

    const data = await req.json()
    return data
  }

export default async (request: NowRequest, response: NowResponse) => {

  const code = request.query.code;

  const token = await getAccessToken(code);
  const gitHubData = await getGithubUser(token);

  if (gitHubData) {
    await response.setHeader('Set-Cookie', serialize('github_token', `${JSON.stringify(token)}`, { path: '/' }));
    response.redirect('../../home')
    response.end();
  } else {
    response.redirect('../../?error=true')
  }
  
  return response.json({gitHubData})
}