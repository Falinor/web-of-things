import request from 'request-promise'

export const getUser = (access_token) =>
  request({
    uri: 'https://www.googleapis.com/userinfo/v2/me',
    json: true,
    qs: {
      access_token: access_token
    }
  }).then(({ id, name, email, picture }) => ({
    service: 'google',
    picture,
    id,
    name,
    email
  }))
