// by Rafael Balestrini 25/11/2024
// This file combine our resolvers into a single JavaScript module. While this isn’t
// strictly necessary, it's a good pattern to follow as this application and its
// resolvers schemas grow.

const Query = require('./query');
const Mutation = require('./mutation');
const License = require('./license');
const {GraphQLDateTime} = require('graphql-iso-date');

module.exports = {
  Query,
  Mutation,
  License,
  DateTime: GraphQLDateTime
};
