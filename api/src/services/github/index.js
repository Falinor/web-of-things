import request from 'request-promise'
import Promise from 'bluebird'

const userRequest = (access_token) => request({
  uri: 'https://api.github.com/user',
  json: true,
  qs: {
    access_token: access_token
  }
})

const emailRequest = (access_token) => request({
  uri: 'https://api.github.com/user/emails',
  json: true,
  qs: {
    access_token: access_token
  }
})

export function getUser(access_token) {
  Promise.all([userRequest(access_token), emailRequest(access_token)])
    .spread((responseOfUserReq, responseOfEmailReq) => ({
      service: 'github',
      id: responseOfUserReq.id,
      name: responseOfUserReq.login,
      email: responseOfEmailReq[0].email,
      picture: responseOfUserReq.avatar_url
    }));
}
