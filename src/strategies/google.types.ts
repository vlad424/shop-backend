export class GoogleProfile {
  id: number
  displayName: string
  name: { familyName: undefined, givenName: string }
  emails: [ { value: string, verified: boolean } ]
  photos: [
    {
      value: string
    }
  ]
  provider: string
  _raw: {
    sub: string,
    name: string,
    given_name: string,
    picture: string,
    email: string,
    email_verified: boolean
    }
  _json: {
    sub: string,
    name: string,
    given_name: string,
    picture: string,
    email: string,
    email_verified: boolean
  }
}