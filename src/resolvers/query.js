// by Rafael Balestrini 25/11/20
// Code needed when we want to read the data with our API.

const {AuthenticationError, ForbiddenError} = require('apollo-server-express');
const {ADMIN} = require('../constants'); //Our app constants

module.exports = { 
  licencia: async (parent, {id}, {models, user}) => {
    if (!user)
    {
      // throw new AuthenticationError('You must be signed in to cancel printing');
      console.log("licencia: User doesn't exist");
      throw new AuthenticationError('Inicie sesion para poder hacer la consulta');
    }
    let license = await models.License.findById(id); // find the license
    let u = await models.User.findById(user.id);
    console.log(`usuaio: ${u}`);
    if (user.id !== String(license.customer) && (u.access !== ADMIN))
    {
      // throw new ForbiddenError("You don't have permissions to cancel printing");
      console.log("licencia: This license does't belong to this user");

      throw new ForbiddenError("No tiene permisos para ver esta licencia");
    }
     else
       return license;
  },

  licencias: async (parent, args, {models, user}) => {
    if (!user)
    {
      // throw new AuthenticationError('You must be signed in to cancel printing');
      console.log("licencias: User doesn't exist");
      throw new AuthenticationError('Inicie sesion para poder hacer la consulta');
    }
    try
    {
      let u = await models.User.findById(user.id);
      if (u)
      {
        if (u.access === ADMIN)
          return await models.License.find();
         else       
           return await models.License.find({CUSTOMER: user.id});
      }
       else
         throw new Error(`The query to License collection (where user.id=${user.id}) returned null.
         **DANGEROUS ALERT! Possible token spoofing in HTTP header**`); //Terminal log
    }
     catch (err)
     {
       console.log(err);
       throw new Error(`The user ...${user.id.slice(-4)} could not be found`);
     }
  }
}
