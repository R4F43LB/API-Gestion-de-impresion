// by Rafael Balestrini 25/11/2020
// Code needed to read and write license data to glc database from within the application.

// Require the mongoose library
const { UserInputError } = require('apollo-server-express');
const mongoose = require('mongoose');
const appCons = require('../constants'); //Our app constants

const opts = {
  timestamps: true, // Assigns createdAt and updatedAt fields with a Date type
  toJSON: {virtuals: true}
};

// Define the license's database schema
const licenseSchema = new mongoose.Schema(
  {
    ID_TIPO_IDENTIFICACION: {type: String, required: true},
    NRO_IDENTIFICACION: {type: String, required: true},
    P_NOMBRE: {type: String, required: true},
    S_NOMBRE: {type: String, required: false},
    P_APELLIDO: {type: String, required: true},
    S_APELLIDO: {type: String, required: false},
    GRADO_TIPO: {type: Number, required: true},
    FECHA_NACIMIENTO_ISO: {type: Date, required: true},
    FECHA_EXPEDICION_ISO: {type: Date, required: true},
    FECHA_VENCIMIENTO_ISO: {type: Date, required: true},
    NACIONALIDAD: {type: String, required: true},
    SEXO: {type: String, required: true},
    LIMITACIONES: {type: String, required: false},
    NRO_VERIFICACION: {type: String, required: true},
    TELEFONO_EMERGENCIA: {type: Number, required: true},
    GRUPO_SANGUINEO: {type: String, required: true},
    FACTOR: {type: String, required: true},
    INFORMACION_MEDICA: {type: String, required: true},
    ALERGICO_A: {type: String, required: false},
    CODIGOS_SEGURIDAD: {type: String, required: true},
    SUBSTRATUM: {type: String, required: false},
    FOTOGRAFIA: {type: String, required: true},
    QR: {type: String, required: true},
    CODIGO_DE_BARRA: {type: String, required: true},
    ESPECIALIDAD_01: {type: String, required: false},
    FECHA_EMISION_E01_ISO: {type: Date, required: false},
    FECHA_VCTO_E01_ISO: {type: Date, required: false},
    ESPECIALIDAD_02: {type: String, required: false},
    FECHA_EMISION_E02_ISO: {type: Date, required: false},
    FECHA_VCTO_E02_ISO: {type: Date, required: false},
    ESPECIALIDAD_03: {type: String, required: false},
    FECHA_EMISION_E03_ISO: {type: Date, required: false},
    FECHA_VCTO_E03_ISO: {type: Date, required: false},
    DEST_AGENCIA_DESTINO: {type: String, required: false},
    DEST_TLF_LOCAL: {type: String, required: false},
    DEST_TLF_CELULAR: {type: String, required: false},
    DEST_ESTADO: {type: String, required: false},
    DEST_MUNICIPIO: {type: String, required: false},
    DEST_PARROQUIA: {type: String, required: false},
    DEST_LOCALIDAD: {type: String, required: false},
    DEST_DIRECCION: {type: String, required: false},
    DEST_INMUEBLE: {type: String, required: false},
    DEST_ZONA_POSTAL: {type: String, required: false},
    TRACKING_NUMBER: {type: String, required: false},
    STATUS_LICENSE: [{type: mongoose.Schema.Types.ObjectId, ref: 'Status'}],
    CANCEL_PRINT: {type: Boolean, default: false},
    CUSTOMER: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true}
  },
  opts
);

licenseSchema.virtual('FECHA_NACIMIENTO').set(function(date) {
    // `date` is the value being set, so use the value to set `FECHA_NACIMIENTO`
    //  FECHA_NACIMIENTO = `${date}T00:00:00.000Z`
    let regEx = new RegExp(appCons.REGEXPDATE, 'g'); //Regular expression
    if(regEx.test(date))
      this.FECHA_NACIMIENTO_ISO = new Date(date);
     else
       throw `Incorrect date format or out of the valid time range on (${date}). "aaaa-mm-dd" format expected or 1900-2099 time range`;
  }).get(function() {
    return (this.FECHA_NACIMIENTO_ISO) ? this.FECHA_NACIMIENTO_ISO.toISOString().substring(0,10) : null});

licenseSchema.virtual('FECHA_EXPEDICION').set(function(date) {
    let regEx = new RegExp(appCons.REGEXPDATE, 'g'); //Regular expression
    if(regEx.test(date))
      this.FECHA_EXPEDICION_ISO = new Date(date);
     else
       throw `Incorrect date format or out of the valid time range on (${date}). "aaaa-mm-dd" format expected or 1900-2099 time range`;
  }).get(function() { 
    return (this.FECHA_EXPEDICION_ISO) ? this.FECHA_EXPEDICION_ISO.toISOString().substring(0,10) : null});

licenseSchema.virtual('FECHA_VENCIMIENTO').set(function(date) {
    let regEx = new RegExp(appCons.REGEXPDATE, 'g'); //Regular expression
    if(regEx.test(date))
      this.FECHA_VENCIMIENTO_ISO = new Date(date);
    else
      throw `Incorrect date format or out of the valid time range on (${date}). "aaaa-mm-dd" format expected or 1900-2099 time range`;
  }).get(function() {
    return (this.FECHA_VENCIMIENTO_ISO) ? this.FECHA_VENCIMIENTO_ISO.toISOString().substring(0,10) : null});

licenseSchema.virtual('FECHA_EMISION_E01').set(function(date) {
    let regEx = new RegExp(appCons.REGEXPDATE, 'g'); //Regular expression
    if(regEx.test(date))
      this.FECHA_EMISION_E01_ISO = new Date(date);
    else
      throw `Incorrect date format or out of the valid time range on (${date}). "aaaa-mm-dd" format expected or 1900-2099 time range`;
  }).get(function() {
    return (this.FECHA_EMISION_E01_ISO) ? this.FECHA_EMISION_E01_ISO.toISOString().substring(0,10) : null});

licenseSchema.virtual('FECHA_VCTO_E01').set(function(date) {
    let regEx = new RegExp(appCons.REGEXPDATE, 'g'); //Regular expression
    if(regEx.test(date))
      this.FECHA_VCTO_E01_ISO = new Date(date);
    else
      throw `Incorrect date format or out of the valid time range on (${date}). "aaaa-mm-dd" format expected or 1900-2099 time range`;
  }).get(function() { 
    return (this.FECHA_VCTO_E01_ISO) ? this.FECHA_VCTO_E01_ISO.toISOString().substring(0,10) : null});

licenseSchema.virtual('FECHA_EMISION_E02').set(function(date) {
    let regEx = new RegExp(appCons.REGEXPDATE, 'g'); //Regular expression
    if(regEx.test(date))
      this.FECHA_EMISION_E02_ISO = new Date(date);
     else
       throw `Incorrect date format or out of the valid time range on (${date}). "aaaa-mm-dd" format expected or 1900-2099 time range`;
  }).get(function() { 
    return (this.FECHA_EMISION_E02_ISO) ? this.FECHA_EMISION_E02_ISO.toISOString().substring(0,10) : null});
  
licenseSchema.virtual('FECHA_VCTO_E02').set(function(date) {
    let regEx = new RegExp(appCons.REGEXPDATE, 'g'); //Regular expression
    if(regEx.test(date))
      this.FECHA_VCTO_E02_ISO = new Date(date);
     else
       throw `Incorrect date format or out of the valid time range on (${date}). "aaaa-mm-dd" format expected or 1900-2099 time range`;
  }).get(function() {
    return (this.FECHA_VCTO_E02_ISO) ? this.FECHA_VCTO_E02_ISO.toISOString().substring(0,10) : null});
  
licenseSchema.virtual('FECHA_EMISION_E03').set(function(date) {
    let regEx = new RegExp(appCons.REGEXPDATE, 'g'); //Regular expression
    if(regEx.test(date))
      this.FECHA_EMISION_E03_ISO = new Date(date);
     else
       throw `Incorrect date format or out of the valid time range on (${date}). "aaaa-mm-dd" format expected or 1900-2099 time range`;
  }).get(function() {
    return (this.FECHA_EMISION_E03_ISO) ? this.FECHA_EMISION_E03_ISO.toISOString().substring(0,10) : null});
  
licenseSchema.virtual('FECHA_VCTO_E03').set(function(date) {
    let regEx = new RegExp(appCons.REGEXPDATE, 'g'); //Regular expression
    if(regEx.test(date))
      this.FECHA_VCTO_E03_ISO = new Date(date);
     else
       throw `Incorrect date format or out of the valid time range on (${date}). "aaaa-mm-dd" format expected or 1900-2099 time range`;
    }).get(function() {
      return (this.FECHA_VCTO_E03_ISO) ? this.FECHA_VCTO_E03_ISO.toISOString().substring(0,10) : null});

const License = mongoose.model('License', licenseSchema);
module.exports = License;
