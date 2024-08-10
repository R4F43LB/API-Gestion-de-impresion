<img src="cover.png" width="200" align="right" />

# GLC API
Authors
-------

 by Rafael Balestrini

Description
-----------

This repository provides a step-by-step guide to set up a GraphQL web service using MongoDB, GraphQL and JavaScript code for the GLC API. GLC customers will be able to request the printing of a card by consuming a web service.

## Prerequisites:
* Node.js and npm (or yarn) installed on your system. 
* Basic understanding of GraphQL concepts (queries, mutations, schemas).

## Getting Started:
1. **Clone the repository**:
```bash
git clone https://github.com/R4F43LB/Print-Management-API.git
```
... and go there
```bash
cd Print-Management-API
```
2. **Install dependencies**:  
The code was formatted with Prettier and it is highly recommended installing globally
```bash
npm install -g prettier
```
where the option '-g' tells npm to install this package globally.
> [!NOTE]
> It is also recommended to install ESLinter

3. **Define your Schema**:
```javascript
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
    CANCEL_PRINT: Boolean
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

```
4. **Implement Resolvers**:  
A resolver is a function that is responsible for providing the data for a specific field in the schema. Whenever a client makes a query that requests a field, the corresponding resolver is triggered to fetch and return the requested data.
```javascript
// by Rafael Balestrini 25/11/2020
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
```
5. **Start the Server**:
6. **Run the Server**:
7. **Further Development**:
