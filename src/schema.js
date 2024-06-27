// by Rafael Balestrini 25/11/2020
// A schema of type definitions and resolvers, which resolve
// the queries and mutations performed against the data.

const {gql} = require('apollo-server-express');

module.exports = gql`
  scalar DateTime
  
  type License {
    id: ID!
    ID_TIPO_IDENTIFICACION: String!
    NRO_IDENTIFICACION: String!
    P_NOMBRE: String
    S_NOMBRE: String!
    P_APELLIDO: String!
    S_APELLIDO: String!
    GRADO_TIPO: Int!
    FECHA_NACIMIENTO: String!
    FECHA_EXPEDICION: String!
    FECHA_VENCIMIENTO: String!
    NACIONALIDAD: String!
    SEXO: String!
    LIMITACIONES: String!
    NRO_VERIFICACION: String!
    TELEFONO_EMERGENCIA: String!
    GRUPO_SANGUINEO: String!
    FACTOR: String!
    INFORMACION_MEDICA: String!
    ALERGICO_A: String
    CODIGOS_SEGURIDAD: String!
    FOTOGRAFIA: String!
    QR: String!
    CODIGO_DE_BARRA : String!
    ESPECIALIDAD_01: String
    FECHA_EMISION_E01: String
    FECHA_VCTO_E01: String
    ESPECIALIDAD_02: String
    FECHA_EMISION_E02: String
    FECHA_VCTO_E02: String
    ESPECIALIDAD_03: String
    FECHA_EMISION_E03: String
    FECHA_VCTO_E03: String
    DEST_AGENCIA_DESTINO: String
    DEST_TLF_LOCAL: String
    DEST_TLF_CELULAR: String
    DEST_ESTADO: String
    DEST_MUNICIPIO: String
    DEST_PARROQUIA: String
    DEST_LOCALIDAD: String
    DEST_DIRECCION: String
    DEST_INMUEBLE: String
    DEST_ZONA_POSTAL: String
    STATUS_LICENSE: [Status!]
    """
    CANCEL_PRINT: Boolean
    """
    createdAt: DateTime!
    updatedAt: DateTime!
    CUSTOMER: User!
  }

  type Query{
    hello: String
    licencias: [License!]!
    licencia(id: ID!): License!
  }

  type User {
    id: ID!
    username: String!
    password: String!
    email: String!
    licenses: [License]
  }
  
  type Status {
    id: ID!
    code: Int!
    description: String
    createdAt: DateTime!
  }

  type Mutation {
    imprimirLic(
      ID_TIPO_IDENTIFICACION: String!
      NRO_IDENTIFICACION: String!
      P_NOMBRE: String!
      S_NOMBRE: String
      P_APELLIDO: String!
      S_APELLIDO: String
      GRADO_TIPO: Int!
      FECHA_NACIMIENTO: String!
      FECHA_EXPEDICION: String!
      FECHA_VENCIMIENTO: String!
      NACIONALIDAD: String!
      SEXO: String!
      LIMITACIONES: String
      NRO_VERIFICACION: String!
      TELEFONO_EMERGENCIA: String!
      GRUPO_SANGUINEO: String!
      FACTOR: String!
      INFORMACION_MEDICA: String!
      ALERGICO_A: String
      CODIGOS_SEGURIDAD: String!
      FOTOGRAFIA: String!
      QR: String!
      CODIGO_DE_BARRA : String!
      ESPECIALIDAD_01: String
      FECHA_EMISION_E01: String
      FECHA_VCTO_E01: String
      ESPECIALIDAD_02: String
      FECHA_EMISION_E02: String
      FECHA_VCTO_E02: String
      ESPECIALIDAD_03: String
      FECHA_EMISION_E03: String
      FECHA_VCTO_E03: String
      DEST_AGENCIA_DESTINO: String
      DEST_TLF_LOCAL: String
      DEST_TLF_CELULAR: String
      DEST_ESTADO: String
      DEST_MUNICIPIO: String
      DEST_PARROQUIA: String
      DEST_LOCALIDAD: String
      DEST_DIRECCION: String
      DEST_INMUEBLE: String
      DEST_ZONA_POSTAL: String
    ): License!

    signUp(username: String!, email: String!, password: String!): String!

    signIn(username: String, email: String, password: String!): String!
  }
`;
