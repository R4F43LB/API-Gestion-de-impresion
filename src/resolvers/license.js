// by Rafael Balestrini 25/11/2024
// Code needed to resolve the users and status info for a license when requested

const appCons = require('../constants'); //Our app constants
module.exports = {
  // Resolve the owner info for a license when requested
  CUSTOMER: async (license, args, {models}) => {
    return await models.User.findById(license.CUSTOMER);
  },
  // Resolve the status info for a license when requested
  STATUS_LICENSE: async (license, args, {models, user}) => {
    let u = await models.User.findById(user.id); // find the user
    if (u.access !== appCons.ADMIN)
      return await models.Status.find(
        {
          license: license._id,
          $or: [
            {code: appCons.PRINT_REQUEST_RECEIVED},
            {code: appCons.SUBSTRATE_SHIPPED},
            {code: appCons.SUBSTRATE_RETURNED}
          ]
        }
      )
    return await models.Status.find({license: license._id})
  }
};
