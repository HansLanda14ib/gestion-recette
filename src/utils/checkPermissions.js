const CustomError = require('../errors')
const checkPermissions = (requestUser, resourceUserId) => {
    console.log(requestUser)
    console.log(resourceUserId)
    console.log(typeof requestUser)
    if (requestUser.role === 'owner') return
    if (requestUser.userId === resourceUserId.toString()) return
    throw new CustomError.UnauthorizedError('Not authorized to access this route')
}

module.exports = checkPermissions