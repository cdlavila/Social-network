// Models
const { Follower, User } = require('../database/models/index')

class UserRepository {
  static async create (followerId, followedId) {
    return Follower.create({
      follower_id: followerId,
      followed_id: followedId
    })
  }

  static async get (followerId, followedId) {
    return Follower.findOne({
      where: {
        follower_id: followerId,
        followed_id: followedId
      }
    })
  }

  static async getFollowers (followedId) {
    return Follower.findAll({
      where: { followed_id: followedId },
      include: {
        model: User,
        as: 'follower',
        attributes: { exclude: ['password'] }
      }
    })
  }

  static async getFollowing (followerId) {
    return Follower.findAll({
      where: { follower_id: followerId },
      include: {
        model: User,
        as: 'followed',
        attributes: { exclude: ['password'] }
      }
    })
  }

  static async delete (followerId, followedId) {
    return Follower.destroy({
      where: {
        follower_id: followerId,
        followed_id: followedId
      }
    })
  }
}

module.exports = UserRepository
