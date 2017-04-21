import request from 'request-promise'

export const getUser = (access_token) =>
  request({
    uri: 'https://graph.facebook.com/me',
    json: true,
    qs: {
      access_token: access_token,
      fields: 'id, name, email, picture'
    }
  }).then(({ id, name, email, picture }) => ({
    service: 'facebook',
    picture: picture.data.url,
    id,
    name,
    email
  }))
