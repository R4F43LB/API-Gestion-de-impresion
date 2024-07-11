// by Rafael Balestrini 25/11/2024
// Code needed when we want to modify the data with our API.

const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {AuthenticationError} = require('apollo-server-express');
const appCons = require('../constants'); //Our app constants
require('dotenv').config();

module.exports = {
  imprimirLic: async (parent, args, {models, user}) => {
    // if there is no user on the context (JWT), throw an authentication error
    if (!user)
    {
      // throw new AuthenticationError('You must be signed in to print a license');
      throw new AuthenticationError('Inicie sesion para poder imprimir una licencia');
    }  
    try
    {
      let newLicense = await models.License.create(
        {
          ID_TIPO_IDENTIFICACION: args.ID_TIPO_IDENTIFICACION,
          NRO_IDENTIFICACION: args.NRO_IDENTIFICACION,
          P_NOMBRE: args.P_NOMBRE,
          S_NOMBRE: args.S_NOMBRE,
          P_APELLIDO: args.P_APELLIDO,
          S_APELLIDO: args.S_APELLIDO,
          GRADO_TIPO: args.GRADO_TIPO,
          FECHA_NACIMIENTO: args.FECHA_NACIMIENTO,
          FECHA_EXPEDICION: args.FECHA_EXPEDICION,
          FECHA_VENCIMIENTO: args.FECHA_VENCIMIENTO,
          NACIONALIDAD: args.NACIONALIDAD,
          SEXO: args.SEXO,
          LIMITACIONES: args.LIMITACIONES,
          NRO_VERIFICACION: args.NRO_VERIFICACION,
          TELEFONO_EMERGENCIA: args.TELEFONO_EMERGENCIA,
          GRUPO_SANGUINEO: args.GRUPO_SANGUINEO,
          FACTOR: args.FACTOR,
          INFORMACION_MEDICA: args.INFORMACION_MEDICA,
          ALERGICO_A: args.ALERGICO_A,
          CODIGOS_SEGURIDAD: args.CODIGOS_SEGURIDAD,
          FOTOGRAFIA: args.FOTOGRAFIA,
          QR: args.QR,
          CODIGO_DE_BARRA: args.CODIGO_DE_BARRA,
          ESPECIALIDAD_01: args.ESPECIALIDAD_01,
          FECHA_EMISION_E01: args.FECHA_EMISION_E01,
          FECHA_VCTO_E01: args.FECHA_VCTO_E01,
          ESPECIALIDAD_02: args.ESPECIALIDAD_02,
          FECHA_EMISION_E02: args.FECHA_EMISION_E02,
          FECHA_VCTO_E02: args.FECHA_VCTO_E02,
          ESPECIALIDAD_03: args.ESPECIALIDAD_03,
          FECHA_EMISION_E03: args.FECHA_EMISION_E03,
          FECHA_VCTO_E03: args.FECHA_VCTO_E03,
          CUSTOMER: mongoose.Types.ObjectId(user.id)
        }
      );

      const newStatus = await models.Status.create(
        {
          code: appCons.PRINT_REQUEST_RECEIVED,
          description: "License received to print",
          license: mongoose.Types.ObjectId(newLicense.id)
        });

      return await models.License.findById(newLicense.id);
    }
     catch (err)
     {
      console.log(err);
     }
  },

  signUp: async (parent, {username, email, password}, {models, user}) => {
    email = email.trim().toLowerCase(); // normalize email address
    const hashed = await bcrypt.hash(password, 10); // Encrypt the password
    let access = appCons.USER; // User privilege level
    try
    {
      user = await models.User.create({username, email, password: hashed, access});
      // create and return the json web token
      return jwt.sign({id: user._id}, process.env.JWT_SECRET);
    }
     catch (err)
     {
       console.log(err);
       throw new Error('Error al intentar crear la cuenta');
     }
  },

  signIn: async (parent, {username, email, password}, {models}) => {
    if (email)
      email = email.trim().toLowerCase();  // normalize email address
    // Find the user in the database, based on the username $or email
    const user = await models.User.findOne({$or: [{email}, {username}]});
    if (!user)
      throw new AuthenticationError('Error al intentar iniciar sesion');
    // Decrypt the password stored in the database and compare it with
    // the one the user has entered.
    const valid = await bcrypt.compare(password, user.password);
    if (!valid)
      throw new AuthenticationError('Error al intentar iniciar sesion');
    // create and return the json web token
    return jwt.sign({id: user._id}, process.env.JWT_SECRET);
  }
};
