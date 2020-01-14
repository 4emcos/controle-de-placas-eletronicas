/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./server.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./databases/database-placas.js":
/*!**************************************!*\
  !*** ./databases/database-placas.js ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var Sequelize = __webpack_require__(/*! sequelize */ "sequelize");

var dbPlacas = {};
var sequelize = new Sequelize('controle_placas_sys', 'root', '123456', {
  host: 'localhost',
  port: '3307',
  dialect: 'mysql',
  define: {
    freezeTableName: true
  },
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  },
  // http://docs.sequelizejs.com/manual/tutorial/querying.html#operators
  operatorsAliases: false
});
var models = [__webpack_require__(/*! ../models/placas-embratex */ "./models/placas-embratex.js"), __webpack_require__(/*! ../models/placas-wentex */ "./models/placas-wentex.js")]; // Initialize models

models.forEach(function (model) {
  var seqModel = model(sequelize, Sequelize);
  dbPlacas[seqModel.name] = seqModel;
}); // Apply associations

Object.keys(dbPlacas).forEach(function (key) {
  if ('associate' in dbPlacas[key]) {
    dbPlacas[key].associate(dbPlacas);
  }
});
dbPlacas.sequelize = sequelize;
dbPlacas.Sequelize = Sequelize;
module.exports = dbPlacas;

/***/ }),

/***/ "./databases/database-usuarios.js":
/*!****************************************!*\
  !*** ./databases/database-usuarios.js ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var Sequelize = __webpack_require__(/*! sequelize */ "sequelize");

var dbUsers = {};
var sequelize = new Sequelize('banco_almoxarifado', 'UserColab', '123456', {
  host: '132.1.4.23',
  port: '3307',
  dialect: 'mysql',
  define: {
    freezeTableName: true
  },
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  },
  // http://docs.sequelizejs.com/manual/tutorial/querying.html#operators
  operatorsAliases: false
});
var models = [__webpack_require__(/*! ../models/users.js */ "./models/users.js"), __webpack_require__(/*! ../models/funcao-user.js */ "./models/funcao-user.js")]; // Initialize models

models.forEach(function (model) {
  var seqModel = model(sequelize, Sequelize);
  dbUsers[seqModel.name] = seqModel;
}); // Apply associations

Object.keys(dbUsers).forEach(function (key) {
  if ('associate' in dbUsers[key]) {
    dbUsers[key].associate(dbUsers);
  }
});
dbUsers.sequelize = sequelize;
dbUsers.Sequelize = Sequelize;
module.exports = dbUsers;

/***/ }),

/***/ "./graph-ql/funcao-user.js":
/*!*********************************!*\
  !*** ./graph-ql/funcao-user.js ***!
  \*********************************/
/*! exports provided: typeDefs, resolvers */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "typeDefs", function() { return typeDefs; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "resolvers", function() { return resolvers; });
/* harmony import */ var apollo_server_express__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! apollo-server-express */ "apollo-server-express");
/* harmony import */ var apollo_server_express__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(apollo_server_express__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _databases_database_usuarios__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../databases/database-usuarios */ "./databases/database-usuarios.js");
/* harmony import */ var _databases_database_usuarios__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_databases_database_usuarios__WEBPACK_IMPORTED_MODULE_1__);
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _templateObject() {
  var data = _taggedTemplateLiteral(["\n    extend type Query {\n        lista_funcoes: [Funcao]\n        lista_funcao(id_funcao: String): Funcao   \n    }\n    \n    type Funcao {\n        id_funcao: String\n        nome_funcao: String\n        id_permissao: String\n    }\n\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }



var typeDefs = Object(apollo_server_express__WEBPACK_IMPORTED_MODULE_0__["gql"])(_templateObject());
var resolvers = {
  Query: {
    lista_funcoes: function () {
      var _lista_funcoes = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee(args) {
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                return _context.abrupt("return", _databases_database_usuarios__WEBPACK_IMPORTED_MODULE_1__["lista_funcao"].findAll());

              case 1:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));

      function lista_funcoes(_x) {
        return _lista_funcoes.apply(this, arguments);
      }

      return lista_funcoes;
    }(),
    lista_funcao: function () {
      var _lista_funcao = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee2(obj, args, context, info) {
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                return _context2.abrupt("return", _databases_database_usuarios__WEBPACK_IMPORTED_MODULE_1__["lista_funcao"].findByPk(args.id_funcao));

              case 1:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2);
      }));

      function lista_funcao(_x2, _x3, _x4, _x5) {
        return _lista_funcao.apply(this, arguments);
      }

      return lista_funcao;
    }()
  }
};

/***/ }),

/***/ "./graph-ql/placas-embratex.js":
/*!*************************************!*\
  !*** ./graph-ql/placas-embratex.js ***!
  \*************************************/
/*! exports provided: typeDefs, resolvers */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "typeDefs", function() { return typeDefs; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "resolvers", function() { return resolvers; });
/* harmony import */ var apollo_server_express__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! apollo-server-express */ "apollo-server-express");
/* harmony import */ var apollo_server_express__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(apollo_server_express__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _databases_database_placas__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../databases/database-placas */ "./databases/database-placas.js");
/* harmony import */ var _databases_database_placas__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_databases_database_placas__WEBPACK_IMPORTED_MODULE_1__);
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _templateObject() {
  var data = _taggedTemplateLiteral(["\n    extend type Query {\n        placasEmbratex: [PlacaEmbratex]\n        placaEmbratex(idPlaca: ID): PlacaEmbratex\n    }\n\n    scalar Date\n\n    type PlacaEmbratex {\n        idPlaca: ID\n        nomePlaca: String\n        quantidade: Int\n        situacao: String\n        local: String\n        qtdParaSituacaoBaixa: Int\n        qtdParaSituacaoOk: Int\n        dataUltimaEdicao: Date\n        regUltimaEdicao : String\n        fotoUltimoUser : String\n    }\n\n    type Mutation {\n        createPlacaEmb (nomePlaca: String, quantidade: Int, situacao: String, local: String, \n            qtdParaSituacaoBaixa: Int, qtdParaSituacaoOk: Int, dataUltimaEdicao: Date, regUltimaEdicao : String, fotoUltimoUser: String) : PlacaEmbratex\n\n        updatePlacaEmb (idPlaca: ID, nomePlaca: String, quantidade: Int, situacao: String, local: String, \n            qtdParaSituacaoBaixa: Int, qtdParaSituacaoOk: Int, dataUltimaEdicao: Date, regUltimaEdicao : String, fotoUltimoUser: String) : PlacaEmbratex\n\n        deletePlacaEmb (idPlaca: ID) : ID\n    }\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }



var typeDefs = Object(apollo_server_express__WEBPACK_IMPORTED_MODULE_0__["gql"])(_templateObject());
var resolvers = {
  Query: {
    placasEmbratex: function () {
      var _placasEmbratex = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee(args) {
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                return _context.abrupt("return", _databases_database_placas__WEBPACK_IMPORTED_MODULE_1__["placas_embratex"].findAll());

              case 1:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));

      function placasEmbratex(_x) {
        return _placasEmbratex.apply(this, arguments);
      }

      return placasEmbratex;
    }(),
    placaEmbratex: function () {
      var _placaEmbratex = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee2(obj, args, context, info) {
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                return _context2.abrupt("return", _databases_database_placas__WEBPACK_IMPORTED_MODULE_1__["placas_embratex"].findByPk(args.idPlaca));

              case 1:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2);
      }));

      function placaEmbratex(_x2, _x3, _x4, _x5) {
        return _placaEmbratex.apply(this, arguments);
      }

      return placaEmbratex;
    }()
  },
  Mutation: {
    createPlacaEmb: function () {
      var _createPlacaEmb = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee3(parent, _ref, info) {
        var nomePlaca, quantidade, situacao, local, qtdParaSituacaoBaixa, qtdParaSituacaoOk, regUltimaEdicao, fotoUltimoUser;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                nomePlaca = _ref.nomePlaca, quantidade = _ref.quantidade, situacao = _ref.situacao, local = _ref.local, qtdParaSituacaoBaixa = _ref.qtdParaSituacaoBaixa, qtdParaSituacaoOk = _ref.qtdParaSituacaoOk, regUltimaEdicao = _ref.regUltimaEdicao, fotoUltimoUser = _ref.fotoUltimoUser;
                return _context3.abrupt("return", _databases_database_placas__WEBPACK_IMPORTED_MODULE_1__["placas_embratex"].create({
                  nomePlaca: nomePlaca,
                  quantidade: quantidade,
                  situacao: situacao,
                  local: local,
                  qtdParaSituacaoBaixa: qtdParaSituacaoBaixa,
                  qtdParaSituacaoOk: qtdParaSituacaoOk,
                  regUltimaEdicao: regUltimaEdicao,
                  fotoUltimoUser: fotoUltimoUser
                }));

              case 2:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3);
      }));

      function createPlacaEmb(_x6, _x7, _x8) {
        return _createPlacaEmb.apply(this, arguments);
      }

      return createPlacaEmb;
    }(),
    updatePlacaEmb: function () {
      var _updatePlacaEmb = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee4(parent, _ref2, info) {
        var idPlaca, nomePlaca, quantidade, situacao, local, qtdParaSituacaoBaixa, qtdParaSituacaoOk, regUltimaEdicao, fotoUltimoUser;
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                idPlaca = _ref2.idPlaca, nomePlaca = _ref2.nomePlaca, quantidade = _ref2.quantidade, situacao = _ref2.situacao, local = _ref2.local, qtdParaSituacaoBaixa = _ref2.qtdParaSituacaoBaixa, qtdParaSituacaoOk = _ref2.qtdParaSituacaoOk, regUltimaEdicao = _ref2.regUltimaEdicao, fotoUltimoUser = _ref2.fotoUltimoUser;
                return _context4.abrupt("return", _databases_database_placas__WEBPACK_IMPORTED_MODULE_1__["placas_embratex"].update({
                  nomePlaca: nomePlaca,
                  quantidade: quantidade,
                  situacao: situacao,
                  local: local,
                  qtdParaSituacaoBaixa: qtdParaSituacaoBaixa,
                  qtdParaSituacaoOk: qtdParaSituacaoOk,
                  regUltimaEdicao: regUltimaEdicao,
                  fotoUltimoUser: fotoUltimoUser
                }, {
                  where: {
                    idPlaca: idPlaca
                  }
                }));

              case 2:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4);
      }));

      function updatePlacaEmb(_x9, _x10, _x11) {
        return _updatePlacaEmb.apply(this, arguments);
      }

      return updatePlacaEmb;
    }(),
    deletePlacaEmb: function () {
      var _deletePlacaEmb = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee5(parent, _ref3, info) {
        var idPlaca;
        return regeneratorRuntime.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                idPlaca = _ref3.idPlaca;
                _databases_database_placas__WEBPACK_IMPORTED_MODULE_1__["placas_embratex"].destroy({
                  where: {
                    idPlaca: idPlaca
                  }
                });

              case 2:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5);
      }));

      function deletePlacaEmb(_x12, _x13, _x14) {
        return _deletePlacaEmb.apply(this, arguments);
      }

      return deletePlacaEmb;
    }()
  }
};

/***/ }),

/***/ "./graph-ql/placas-wentex.js":
/*!***********************************!*\
  !*** ./graph-ql/placas-wentex.js ***!
  \***********************************/
/*! exports provided: typeDefs, resolvers */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "typeDefs", function() { return typeDefs; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "resolvers", function() { return resolvers; });
/* harmony import */ var apollo_server_express__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! apollo-server-express */ "apollo-server-express");
/* harmony import */ var apollo_server_express__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(apollo_server_express__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _databases_database_placas__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../databases/database-placas */ "./databases/database-placas.js");
/* harmony import */ var _databases_database_placas__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_databases_database_placas__WEBPACK_IMPORTED_MODULE_1__);
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _templateObject() {
  var data = _taggedTemplateLiteral(["\n    extend type Query {\n        placasWentex: [PlacaWentex]\n        placaWentex(idPlaca: ID): PlacaWentex\n    }\n    \n    type PlacaWentex {\n        idPlaca: ID\n        nomePlaca: String\n        quantidade: Int\n        situacao: String\n        local: String\n        qtdParaSituacaoBaixa: Int\n        qtdParaSituacaoOk: Int\n        dataUltimaEdicao: Date\n        regUltimaEdicao : String\n        fotoUltimoUser : String\n    }\n\n    extend type Mutation {\n        createPlacaWentex  (idPlaca: ID, nomePlaca: String, quantidade: Int, situacao: String, local: String, \n            qtdParaSituacaoBaixa: Int, qtdParaSituacaoOk: Int, dataUltimaEdicao: Date, regUltimaEdicao : String, fotoUltimoUser: String) : PlacaWentex\n\n        updatePlacaWentex  (idPlaca: ID, nomePlaca: String, quantidade: Int, situacao: String, local: String, \n       qtdParaSituacaoBaixa: Int, qtdParaSituacaoOk: Int, dataUltimaEdicao: Date, regUltimaEdicao : String, fotoUltimoUser: String ) : PlacaWentex\n\n        deletePlacaWentex (idPlaca: ID) : ID\n    }\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }



var typeDefs = Object(apollo_server_express__WEBPACK_IMPORTED_MODULE_0__["gql"])(_templateObject());
var resolvers = {
  Query: {
    placasWentex: function () {
      var _placasWentex = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee(args) {
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                return _context.abrupt("return", _databases_database_placas__WEBPACK_IMPORTED_MODULE_1__["placas_wentex"].findAll());

              case 1:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));

      function placasWentex(_x) {
        return _placasWentex.apply(this, arguments);
      }

      return placasWentex;
    }(),
    placaWentex: function () {
      var _placaWentex = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee2(obj, args, context, info) {
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                return _context2.abrupt("return", _databases_database_placas__WEBPACK_IMPORTED_MODULE_1__["placas_wentex"].findByPk(args.id));

              case 1:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2);
      }));

      function placaWentex(_x2, _x3, _x4, _x5) {
        return _placaWentex.apply(this, arguments);
      }

      return placaWentex;
    }()
  },
  Mutation: {
    createPlacaWentex: function () {
      var _createPlacaWentex = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee3(parent, _ref, info) {
        var nomePlaca, quantidade, situacao, local, qtdParaSituacaoBaixa, qtdParaSituacaoOk, regUltimaEdicao, fotoUltimoUser;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                nomePlaca = _ref.nomePlaca, quantidade = _ref.quantidade, situacao = _ref.situacao, local = _ref.local, qtdParaSituacaoBaixa = _ref.qtdParaSituacaoBaixa, qtdParaSituacaoOk = _ref.qtdParaSituacaoOk, regUltimaEdicao = _ref.regUltimaEdicao, fotoUltimoUser = _ref.fotoUltimoUser;
                return _context3.abrupt("return", _databases_database_placas__WEBPACK_IMPORTED_MODULE_1__["placas_wentex"].create({
                  nomePlaca: nomePlaca,
                  quantidade: quantidade,
                  situacao: situacao,
                  local: local,
                  qtdParaSituacaoBaixa: qtdParaSituacaoBaixa,
                  qtdParaSituacaoOk: qtdParaSituacaoOk,
                  regUltimaEdicao: regUltimaEdicao,
                  fotoUltimoUser: fotoUltimoUser
                }));

              case 2:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3);
      }));

      function createPlacaWentex(_x6, _x7, _x8) {
        return _createPlacaWentex.apply(this, arguments);
      }

      return createPlacaWentex;
    }(),
    updatePlacaWentex: function () {
      var _updatePlacaWentex = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee4(parent, _ref2, info) {
        var idPlaca, nomePlaca, quantidade, situacao, local, qtdParaSituacaoBaixa, qtdParaSituacaoOk, regUltimaEdicao, fotoUltimoUser;
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                idPlaca = _ref2.idPlaca, nomePlaca = _ref2.nomePlaca, quantidade = _ref2.quantidade, situacao = _ref2.situacao, local = _ref2.local, qtdParaSituacaoBaixa = _ref2.qtdParaSituacaoBaixa, qtdParaSituacaoOk = _ref2.qtdParaSituacaoOk, regUltimaEdicao = _ref2.regUltimaEdicao, fotoUltimoUser = _ref2.fotoUltimoUser;
                return _context4.abrupt("return", _databases_database_placas__WEBPACK_IMPORTED_MODULE_1__["placas_wentex"].update({
                  nomePlaca: nomePlaca,
                  quantidade: quantidade,
                  situacao: situacao,
                  local: local,
                  qtdParaSituacaoBaixa: qtdParaSituacaoBaixa,
                  qtdParaSituacaoOk: qtdParaSituacaoOk,
                  regUltimaEdicao: regUltimaEdicao,
                  fotoUltimoUser: fotoUltimoUser
                }, {
                  where: {
                    idPlaca: idPlaca
                  }
                }));

              case 2:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4);
      }));

      function updatePlacaWentex(_x9, _x10, _x11) {
        return _updatePlacaWentex.apply(this, arguments);
      }

      return updatePlacaWentex;
    }(),
    deletePlacaWentex: function () {
      var _deletePlacaWentex = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee5(parent, _ref3, info) {
        var idPlaca;
        return regeneratorRuntime.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                idPlaca = _ref3.idPlaca;
                _databases_database_placas__WEBPACK_IMPORTED_MODULE_1__["placas_wentex"].destroy({
                  where: {
                    idPlaca: idPlaca
                  }
                });

              case 2:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5);
      }));

      function deletePlacaWentex(_x12, _x13, _x14) {
        return _deletePlacaWentex.apply(this, arguments);
      }

      return deletePlacaWentex;
    }()
  }
};

/***/ }),

/***/ "./graph-ql/users.js":
/*!***************************!*\
  !*** ./graph-ql/users.js ***!
  \***************************/
/*! exports provided: typeDefs, resolvers */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "typeDefs", function() { return typeDefs; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "resolvers", function() { return resolvers; });
/* harmony import */ var apollo_server_express__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! apollo-server-express */ "apollo-server-express");
/* harmony import */ var apollo_server_express__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(apollo_server_express__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _databases_database_usuarios__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../databases/database-usuarios */ "./databases/database-usuarios.js");
/* harmony import */ var _databases_database_usuarios__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_databases_database_usuarios__WEBPACK_IMPORTED_MODULE_1__);
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _templateObject() {
  var data = _taggedTemplateLiteral(["\n    extend type Query {\n        atualiza_colaboradores: [User]\n        atualiza_colaborador(registro: String): User   \n    }\n    \n    type User {\n        registro: String\n        nome: String\n        lista_funcao: String\n        foto: String\n    }\n\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }



var typeDefs = Object(apollo_server_express__WEBPACK_IMPORTED_MODULE_0__["gql"])(_templateObject());
var resolvers = {
  Query: {
    atualiza_colaboradores: function () {
      var _atualiza_colaboradores = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee(args) {
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                return _context.abrupt("return", _databases_database_usuarios__WEBPACK_IMPORTED_MODULE_1__["atualiza_colaborador"].findAll());

              case 1:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));

      function atualiza_colaboradores(_x) {
        return _atualiza_colaboradores.apply(this, arguments);
      }

      return atualiza_colaboradores;
    }(),
    atualiza_colaborador: function () {
      var _atualiza_colaborador = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee2(obj, args, context, info) {
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                return _context2.abrupt("return", _databases_database_usuarios__WEBPACK_IMPORTED_MODULE_1__["atualiza_colaborador"].findByPk(args.registro));

              case 1:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2);
      }));

      function atualiza_colaborador(_x2, _x3, _x4, _x5) {
        return _atualiza_colaborador.apply(this, arguments);
      }

      return atualiza_colaborador;
    }()
  }
}; //
// user(reg: String!): User

/***/ }),

/***/ "./models/funcao-user.js":
/*!*******************************!*\
  !*** ./models/funcao-user.js ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = function (sequelize, DataTypes) {
  return sequelize.define('lista_funcao', {
    id_funcao: {
      type: DataTypes.STRING(16),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    nome_funcao: {
      type: DataTypes.STRING(256),
      allowNull: false
    },
    id_permissao: {
      type: DataTypes.STRING(256),
      allowNull: false
    }
  }, {
    tableName: 'lista_funcao',
    timestamps: false
  });
};

/***/ }),

/***/ "./models/placas-embratex.js":
/*!***********************************!*\
  !*** ./models/placas-embratex.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = function (sequelize, DataTypes) {
  return sequelize.define('placas_embratex', {
    idPlaca: {
      type: DataTypes.MEDIUMINT(8),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    nomePlaca: {
      type: DataTypes.STRING(256),
      allowNull: false
    },
    quantidade: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    situacao: {
      type: DataTypes.STRING(256),
      allowNull: false
    },
    qtdParaSituacaoBaixa: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    qtdParaSituacaoOk: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    dataUltimaEdicao: {
      type: 'TIMESTAMP',
      defaultValue: DataTypes.literal('CURRENT_TIMESTAMP'),
      allowNull: false
    },
    local: {
      type: DataTypes.STRING(256),
      allowNull: false
    },
    regUltimaEdicao: {
      type: DataTypes.STRING(256),
      allowNull: false
    },
    fotoUltimoUser: {
      type: DataTypes.BLOB,
      allowNull: false,
      get: function get() {
        return this.getDataValue('fotoUltimoUser').toString('utf8');
      }
    }
  }, {
    tableName: 'placas_embratex',
    timestamps: false
  });
};

/***/ }),

/***/ "./models/placas-wentex.js":
/*!*********************************!*\
  !*** ./models/placas-wentex.js ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = function (sequelize, DataTypes) {
  return sequelize.define('placas_wentex', {
    idPlaca: {
      type: DataTypes.MEDIUMINT(8),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    nomePlaca: {
      type: DataTypes.STRING(256),
      allowNull: false
    },
    quantidade: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    situacao: {
      type: DataTypes.STRING(256),
      allowNull: false
    },
    qtdParaSituacaoBaixa: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    qtdParaSituacaoOk: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    dataUltimaEdicao: {
      type: 'TIMESTAMP',
      defaultValue: DataTypes.literal('CURRENT_TIMESTAMP'),
      allowNull: false
    },
    local: {
      type: DataTypes.STRING(256),
      allowNull: false
    },
    regUltimaEdicao: {
      type: DataTypes.STRING(256),
      allowNull: false
    },
    fotoUltimoUser: {
      type: DataTypes.BLOB,
      allowNull: false,
      get: function get() {
        return this.getDataValue('fotoUltimoUser').toString('utf8');
      }
    }
  }, {
    tableName: 'placas_wentex',
    timestamps: false
  });
};

/***/ }),

/***/ "./models/users.js":
/*!*************************!*\
  !*** ./models/users.js ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

/* jshint indent: 1 */
module.exports = function (sequelize, DataTypes) {
  return sequelize.define('atualiza_colaborador', {
    registro: {
      type: DataTypes.STRING(16),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    nome: {
      type: DataTypes.STRING(256),
      allowNull: false
    },
    lista_funcao: {
      type: DataTypes.STRING(256),
      allowNull: false
    },
    foto: {
      type: DataTypes.BLOB,
      allowNull: false,
      get: function get() {
        return this.getDataValue('foto').toString('base64');
      }
    }
  }, {
    tableName: 'atualiza_colaborador',
    timestamps: false
  });
};

/***/ }),

/***/ "./server.js":
/*!*******************!*\
  !*** ./server.js ***!
  \*******************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_polyfill__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/polyfill */ "@babel/polyfill");
/* harmony import */ var _babel_polyfill__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_polyfill__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! express */ "express");
/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(express__WEBPACK_IMPORTED_MODULE_1__);



var bodyParser = __webpack_require__(/*! body-parser */ "body-parser");

var _require = __webpack_require__(/*! apollo-server-express */ "apollo-server-express"),
    ApolloServer = _require.ApolloServer;

var cors = __webpack_require__(/*! cors */ "cors");

var app = express__WEBPACK_IMPORTED_MODULE_1___default()();
app.use(bodyParser.json({
  limit: '5mb'
}));
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(cors());
var server = new ApolloServer({
  modules: [__webpack_require__(/*! ./graph-ql/users */ "./graph-ql/users.js"), __webpack_require__(/*! ./graph-ql/funcao-user */ "./graph-ql/funcao-user.js"), __webpack_require__(/*! ./graph-ql/placas-embratex */ "./graph-ql/placas-embratex.js"), __webpack_require__(/*! ./graph-ql/placas-wentex */ "./graph-ql/placas-wentex.js") //  require('./graph-ql/dados')
  ]
});
server.applyMiddleware({
  app: app
});
app.listen({
  port: 5000
}, function () {
  return console.log("\uD83D\uDE80 Server ready at http://localhost:5000");
});

/***/ }),

/***/ "@babel/polyfill":
/*!**********************************!*\
  !*** external "@babel/polyfill" ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("@babel/polyfill");

/***/ }),

/***/ "apollo-server-express":
/*!****************************************!*\
  !*** external "apollo-server-express" ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("apollo-server-express");

/***/ }),

/***/ "body-parser":
/*!******************************!*\
  !*** external "body-parser" ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("body-parser");

/***/ }),

/***/ "cors":
/*!***********************!*\
  !*** external "cors" ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("cors");

/***/ }),

/***/ "express":
/*!**************************!*\
  !*** external "express" ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("express");

/***/ }),

/***/ "sequelize":
/*!****************************!*\
  !*** external "sequelize" ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("sequelize");

/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vZGF0YWJhc2VzL2RhdGFiYXNlLXBsYWNhcy5qcyIsIndlYnBhY2s6Ly8vLi9kYXRhYmFzZXMvZGF0YWJhc2UtdXN1YXJpb3MuanMiLCJ3ZWJwYWNrOi8vLy4vZ3JhcGgtcWwvZnVuY2FvLXVzZXIuanMiLCJ3ZWJwYWNrOi8vLy4vZ3JhcGgtcWwvcGxhY2FzLWVtYnJhdGV4LmpzIiwid2VicGFjazovLy8uL2dyYXBoLXFsL3BsYWNhcy13ZW50ZXguanMiLCJ3ZWJwYWNrOi8vLy4vZ3JhcGgtcWwvdXNlcnMuanMiLCJ3ZWJwYWNrOi8vLy4vbW9kZWxzL2Z1bmNhby11c2VyLmpzIiwid2VicGFjazovLy8uL21vZGVscy9wbGFjYXMtZW1icmF0ZXguanMiLCJ3ZWJwYWNrOi8vLy4vbW9kZWxzL3BsYWNhcy13ZW50ZXguanMiLCJ3ZWJwYWNrOi8vLy4vbW9kZWxzL3VzZXJzLmpzIiwid2VicGFjazovLy8uL3NlcnZlci5qcyIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJAYmFiZWwvcG9seWZpbGxcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJhcG9sbG8tc2VydmVyLWV4cHJlc3NcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJib2R5LXBhcnNlclwiIiwid2VicGFjazovLy9leHRlcm5hbCBcImNvcnNcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJleHByZXNzXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwic2VxdWVsaXplXCIiXSwibmFtZXMiOlsiU2VxdWVsaXplIiwicmVxdWlyZSIsImRiUGxhY2FzIiwic2VxdWVsaXplIiwiaG9zdCIsInBvcnQiLCJkaWFsZWN0IiwiZGVmaW5lIiwiZnJlZXplVGFibGVOYW1lIiwicG9vbCIsIm1heCIsIm1pbiIsImFjcXVpcmUiLCJpZGxlIiwib3BlcmF0b3JzQWxpYXNlcyIsIm1vZGVscyIsImZvckVhY2giLCJtb2RlbCIsInNlcU1vZGVsIiwibmFtZSIsIk9iamVjdCIsImtleXMiLCJrZXkiLCJhc3NvY2lhdGUiLCJtb2R1bGUiLCJleHBvcnRzIiwiZGJVc2VycyIsInR5cGVEZWZzIiwiZ3FsIiwicmVzb2x2ZXJzIiwiUXVlcnkiLCJsaXN0YV9mdW5jb2VzIiwiYXJncyIsImZpbmRBbGwiLCJsaXN0YV9mdW5jYW8iLCJvYmoiLCJjb250ZXh0IiwiaW5mbyIsImZpbmRCeVBrIiwiaWRfZnVuY2FvIiwicGxhY2FzRW1icmF0ZXgiLCJwbGFjYUVtYnJhdGV4IiwiaWRQbGFjYSIsIk11dGF0aW9uIiwiY3JlYXRlUGxhY2FFbWIiLCJwYXJlbnQiLCJub21lUGxhY2EiLCJxdWFudGlkYWRlIiwic2l0dWFjYW8iLCJsb2NhbCIsInF0ZFBhcmFTaXR1YWNhb0JhaXhhIiwicXRkUGFyYVNpdHVhY2FvT2siLCJyZWdVbHRpbWFFZGljYW8iLCJmb3RvVWx0aW1vVXNlciIsImNyZWF0ZSIsInVwZGF0ZVBsYWNhRW1iIiwidXBkYXRlIiwid2hlcmUiLCJkZWxldGVQbGFjYUVtYiIsImRlc3Ryb3kiLCJwbGFjYXNXZW50ZXgiLCJwbGFjYVdlbnRleCIsImlkIiwiY3JlYXRlUGxhY2FXZW50ZXgiLCJ1cGRhdGVQbGFjYVdlbnRleCIsImRlbGV0ZVBsYWNhV2VudGV4IiwiYXR1YWxpemFfY29sYWJvcmFkb3JlcyIsImF0dWFsaXphX2NvbGFib3JhZG9yIiwicmVnaXN0cm8iLCJEYXRhVHlwZXMiLCJ0eXBlIiwiU1RSSU5HIiwiYWxsb3dOdWxsIiwicHJpbWFyeUtleSIsImF1dG9JbmNyZW1lbnQiLCJub21lX2Z1bmNhbyIsImlkX3Blcm1pc3NhbyIsInRhYmxlTmFtZSIsInRpbWVzdGFtcHMiLCJNRURJVU1JTlQiLCJJTlRFR0VSIiwiZGF0YVVsdGltYUVkaWNhbyIsImRlZmF1bHRWYWx1ZSIsImxpdGVyYWwiLCJCTE9CIiwiZ2V0IiwiZ2V0RGF0YVZhbHVlIiwidG9TdHJpbmciLCJub21lIiwiZm90byIsImJvZHlQYXJzZXIiLCJBcG9sbG9TZXJ2ZXIiLCJjb3JzIiwiYXBwIiwiZXhwcmVzcyIsInVzZSIsImpzb24iLCJsaW1pdCIsInVybGVuY29kZWQiLCJleHRlbmRlZCIsInNlcnZlciIsIm1vZHVsZXMiLCJhcHBseU1pZGRsZXdhcmUiLCJsaXN0ZW4iLCJjb25zb2xlIiwibG9nIl0sIm1hcHBpbmdzIjoiO1FBQUE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7OztRQUdBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSwwQ0FBMEMsZ0NBQWdDO1FBQzFFO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0Esd0RBQXdELGtCQUFrQjtRQUMxRTtRQUNBLGlEQUFpRCxjQUFjO1FBQy9EOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQSx5Q0FBeUMsaUNBQWlDO1FBQzFFLGdIQUFnSCxtQkFBbUIsRUFBRTtRQUNySTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLDJCQUEyQiwwQkFBMEIsRUFBRTtRQUN2RCxpQ0FBaUMsZUFBZTtRQUNoRDtRQUNBO1FBQ0E7O1FBRUE7UUFDQSxzREFBc0QsK0RBQStEOztRQUVySDtRQUNBOzs7UUFHQTtRQUNBOzs7Ozs7Ozs7Ozs7QUNsRkEsSUFBTUEsU0FBUyxHQUFHQyxtQkFBTyxDQUFDLDRCQUFELENBQXpCOztBQUVBLElBQUlDLFFBQVEsR0FBRyxFQUFmO0FBR0EsSUFBTUMsU0FBUyxHQUFHLElBQUlILFNBQUosQ0FBYyxxQkFBZCxFQUFxQyxNQUFyQyxFQUE2QyxRQUE3QyxFQUF1RDtBQUNyRUksTUFBSSxFQUFFLFdBRCtEO0FBRXJFQyxNQUFJLEVBQUUsTUFGK0Q7QUFHckVDLFNBQU8sRUFBRSxPQUg0RDtBQUlyRUMsUUFBTSxFQUFFO0FBQ0pDLG1CQUFlLEVBQUU7QUFEYixHQUo2RDtBQU9yRUMsTUFB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Ozs7OztBQ0FBLGtEOzs7Ozs7Ozs7OztBQ0FBLHdDOzs7Ozs7Ozs7OztBQ0FBLGlDOzs7Ozs7Ozs7OztBQ0FBLG9DOzs7Ozs7Ozs7OztBQ0FBLHNDIiwiZmlsZSI6InNlcnZlci1kaXN0LmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZ2V0dGVyIH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuIFx0XHR9XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3RcbiBcdC8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuIFx0Ly8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4gXHQvLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3RcbiBcdC8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbiBcdF9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IF9fd2VicGFja19yZXF1aXJlX18odmFsdWUpO1xuIFx0XHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuIFx0XHRpZigobW9kZSAmIDQpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuIFx0XHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobnMsICdkZWZhdWx0JywgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdmFsdWUgfSk7XG4gXHRcdGlmKG1vZGUgJiAyICYmIHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykgZm9yKHZhciBrZXkgaW4gdmFsdWUpIF9fd2VicGFja19yZXF1aXJlX18uZChucywga2V5LCBmdW5jdGlvbihrZXkpIHsgcmV0dXJuIHZhbHVlW2tleV07IH0uYmluZChudWxsLCBrZXkpKTtcbiBcdFx0cmV0dXJuIG5zO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IFwiLi9zZXJ2ZXIuanNcIik7XG4iLCJjb25zdCBTZXF1ZWxpemUgPSByZXF1aXJlKCdzZXF1ZWxpemUnKVxyXG5cclxudmFyIGRiUGxhY2FzID0ge31cclxuXHJcblxyXG5jb25zdCBzZXF1ZWxpemUgPSBuZXcgU2VxdWVsaXplKCdjb250cm9sZV9wbGFjYXNfc3lzJywgJ3Jvb3QnLCAnMTIzNDU2Jywge1xyXG4gICAgaG9zdDogJ2xvY2FsaG9zdCcsXHJcbiAgICBwb3J0OiAnMzMwNycsXHJcbiAgICBkaWFsZWN0OiAnbXlzcWwnLFxyXG4gICAgZGVmaW5lOiB7XHJcbiAgICAgICAgZnJlZXplVGFibGVOYW1lOiB0cnVlLFxyXG4gICAgfSxcclxuICAgIHBvb2w6IHtcclxuICAgICAgICBtYXg6IDUsXHJcbiAgICAgICAgbWluOiAwLFxyXG4gICAgICAgIGFjcXVpcmU6IDMwMDAwLFxyXG4gICAgICAgIGlkbGU6IDEwMDAwLFxyXG4gICAgfSxcclxuICAgIC8vIGh0dHA6Ly9kb2NzLnNlcXVlbGl6ZWpzLmNvbS9tYW51YWwvdHV0b3JpYWwvcXVlcnlpbmcuaHRtbCNvcGVyYXRvcnNcclxuICAgIG9wZXJhdG9yc0FsaWFzZXM6IGZhbHNlLFxyXG59KVxyXG5cclxuXHJcbmxldCBtb2RlbHMgPSBbXHJcbiAgICByZXF1aXJlKCcuLi9tb2RlbHMvcGxhY2FzLWVtYnJhdGV4JyksXHJcbiAgICByZXF1aXJlKCcuLi9tb2RlbHMvcGxhY2FzLXdlbnRleCcpLFxyXG5dXHJcblxyXG4vLyBJbml0aWFsaXplIG1vZGVsc1xyXG5tb2RlbHMuZm9yRWFjaChtb2RlbCA9PiB7XHJcbiAgICBjb25zdCBzZXFNb2RlbCA9IG1vZGVsKHNlcXVlbGl6ZSwgU2VxdWVsaXplKVxyXG4gICAgZGJQbGFjYXNbc2VxTW9kZWwubmFtZV0gPSBzZXFNb2RlbFxyXG59KVxyXG5cclxuLy8gQXBwbHkgYXNzb2NpYXRpb25zXHJcblxyXG5PYmplY3Qua2V5cyhkYlBsYWNhcykuZm9yRWFjaChrZXkgPT4ge1xyXG4gICAgXHJcbiAgICBpZiAoJ2Fzc29jaWF0ZScgaW4gZGJQbGFjYXNba2V5XSkge1xyXG4gICAgICAgIGRiUGxhY2FzW2tleV0uYXNzb2NpYXRlKGRiUGxhY2FzKVxyXG4gICAgfVxyXG59KVxyXG5cclxuXHJcbmRiUGxhY2FzLnNlcXVlbGl6ZSA9IHNlcXVlbGl6ZVxyXG5kYlBsYWNhcy5TZXF1ZWxpemUgPSBTZXF1ZWxpemVcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gZGJQbGFjYXNcclxuIiwiY29uc3QgU2VxdWVsaXplID0gcmVxdWlyZSgnc2VxdWVsaXplJylcclxuXHJcbnZhciBkYlVzZXJzID0ge31cclxuXHJcblxyXG5jb25zdCBzZXF1ZWxpemUgPSBuZXcgU2VxdWVsaXplKCdiYW5jb19hbG1veGFyaWZhZG8nLCAnVXNlckNvbGFiJywgJzEyMzQ1NicsIHtcclxuICAgIGhvc3Q6ICcxMzIuMS40LjIzJyxcclxuICAgIHBvcnQ6ICczMzA3JyxcclxuICAgIGRpYWxlY3Q6ICdteXNxbCcsXHJcbiAgICBkZWZpbmU6IHtcclxuICAgICAgICBmcmVlemVUYWJsZU5hbWU6IHRydWUsXHJcbiAgICB9LFxyXG4gICAgcG9vbDoge1xyXG4gICAgICAgIG1heDogNSxcclxuICAgICAgICBtaW46IDAsXHJcbiAgICAgICAgYWNxdWlyZTogMzAwMDAsXHJcbiAgICAgICAgaWRsZTogMTAwMDAsXHJcbiAgICB9LFxyXG4gICAgLy8gaHR0cDovL2RvY3Muc2VxdWVsaXplanMuY29tL21hbnVhbC90dXRvcmlhbC9xdWVyeWluZy5odG1sI29wZXJhdG9yc1xyXG4gICAgb3BlcmF0b3JzQWxpYXNlczogZmFsc2UsXHJcbn0pXHJcblxyXG5cclxubGV0IG1vZGVscyA9IFtcclxuICAgIHJlcXVpcmUoJy4uL21vZGVscy91c2Vycy5qcycpLFxyXG4gICAgcmVxdWlyZSgnLi4vbW9kZWxzL2Z1bmNhby11c2VyLmpzJylcclxuXVxyXG5cclxuLy8gSW5pdGlhbGl6ZSBtb2RlbHNcclxubW9kZWxzLmZvckVhY2gobW9kZWwgPT4ge1xyXG4gICAgY29uc3Qgc2VxTW9kZWwgPSBtb2RlbChzZXF1ZWxpemUsIFNlcXVlbGl6ZSlcclxuICAgIGRiVXNlcnNbc2VxTW9kZWwubmFtZV0gPSBzZXFNb2RlbFxyXG59KVxyXG5cclxuLy8gQXBwbHkgYXNzb2NpYXRpb25zXHJcblxyXG5PYmplY3Qua2V5cyhkYlVzZXJzKS5mb3JFYWNoKGtleSA9PiB7XHJcbiAgICBcclxuICAgIGlmICgnYXNzb2NpYXRlJyBpbiBkYlVzZXJzW2tleV0pIHtcclxuICAgICAgICBkYlVzZXJzW2tleV0uYXNzb2NpYXRlKGRiVXNlcnMpXHJcbiAgICB9XHJcbn0pXHJcblxyXG5cclxuZGJVc2Vycy5zZXF1ZWxpemUgPSBzZXF1ZWxpemVcclxuZGJVc2Vycy5TZXF1ZWxpemUgPSBTZXF1ZWxpemVcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gZGJVc2Vyc1xyXG4iLCJpbXBvcnQgeyBncWwgfSBmcm9tICdhcG9sbG8tc2VydmVyLWV4cHJlc3MnXHJcbmltcG9ydCAqIGFzIGRiVXNlcnMgZnJvbSAnLi4vZGF0YWJhc2VzL2RhdGFiYXNlLXVzdWFyaW9zJ1xyXG5cclxuXHJcbmV4cG9ydCBjb25zdCB0eXBlRGVmcyA9IGdxbGBcclxuICAgIGV4dGVuZCB0eXBlIFF1ZXJ5IHtcclxuICAgICAgICBsaXN0YV9mdW5jb2VzOiBbRnVuY2FvXVxyXG4gICAgICAgIGxpc3RhX2Z1bmNhbyhpZF9mdW5jYW86IFN0cmluZyk6IEZ1bmNhbyAgIFxyXG4gICAgfVxyXG4gICAgXHJcbiAgICB0eXBlIEZ1bmNhbyB7XHJcbiAgICAgICAgaWRfZnVuY2FvOiBTdHJpbmdcclxuICAgICAgICBub21lX2Z1bmNhbzogU3RyaW5nXHJcbiAgICAgICAgaWRfcGVybWlzc2FvOiBTdHJpbmdcclxuICAgIH1cclxuXHJcbmBcclxuZXhwb3J0IGNvbnN0IHJlc29sdmVycyA9IHtcclxuICAgIFF1ZXJ5OiB7XHJcbiAgICAgICAgbGlzdGFfZnVuY29lczogYXN5bmMgKGFyZ3MpID0+IGRiVXNlcnMubGlzdGFfZnVuY2FvLmZpbmRBbGwoKSxcclxuICAgICAgICBsaXN0YV9mdW5jYW86IGFzeW5jIChvYmosIGFyZ3MsIGNvbnRleHQsIGluZm8pID0+IGRiVXNlcnMubGlzdGFfZnVuY2FvLmZpbmRCeVBrKGFyZ3MuaWRfZnVuY2FvKVxyXG4gICAgfSxcclxufSIsImltcG9ydCB7IGdxbCB9IGZyb20gJ2Fwb2xsby1zZXJ2ZXItZXhwcmVzcydcclxuaW1wb3J0ICogYXMgZGJQbGFjYXMgZnJvbSAnLi4vZGF0YWJhc2VzL2RhdGFiYXNlLXBsYWNhcydcclxuXHJcblxyXG5leHBvcnQgY29uc3QgdHlwZURlZnMgPSBncWxgXHJcbiAgICBleHRlbmQgdHlwZSBRdWVyeSB7XHJcbiAgICAgICAgcGxhY2FzRW1icmF0ZXg6IFtQbGFjYUVtYnJhdGV4XVxyXG4gICAgICAgIHBsYWNhRW1icmF0ZXgoaWRQbGFjYTogSUQpOiBQbGFjYUVtYnJhdGV4XHJcbiAgICB9XHJcblxyXG4gICAgc2NhbGFyIERhdGVcclxuXHJcbiAgICB0eXBlIFBsYWNhRW1icmF0ZXgge1xyXG4gICAgICAgIGlkUGxhY2E6IElEXHJcbiAgICAgICAgbm9tZVBsYWNhOiBTdHJpbmdcclxuICAgICAgICBxdWFudGlkYWRlOiBJbnRcclxuICAgICAgICBzaXR1YWNhbzogU3RyaW5nXHJcbiAgICAgICAgbG9jYWw6IFN0cmluZ1xyXG4gICAgICAgIHF0ZFBhcmFTaXR1YWNhb0JhaXhhOiBJbnRcclxuICAgICAgICBxdGRQYXJhU2l0dWFjYW9PazogSW50XHJcbiAgICAgICAgZGF0YVVsdGltYUVkaWNhbzogRGF0ZVxyXG4gICAgICAgIHJlZ1VsdGltYUVkaWNhbyA6IFN0cmluZ1xyXG4gICAgICAgIGZvdG9VbHRpbW9Vc2VyIDogU3RyaW5nXHJcbiAgICB9XHJcblxyXG4gICAgdHlwZSBNdXRhdGlvbiB7XHJcbiAgICAgICAgY3JlYXRlUGxhY2FFbWIgKG5vbWVQbGFjYTogU3RyaW5nLCBxdWFudGlkYWRlOiBJbnQsIHNpdHVhY2FvOiBTdHJpbmcsIGxvY2FsOiBTdHJpbmcsIFxyXG4gICAgICAgICAgICBxdGRQYXJhU2l0dWFjYW9CYWl4YTogSW50LCBxdGRQYXJhU2l0dWFjYW9PazogSW50LCBkYXRhVWx0aW1hRWRpY2FvOiBEYXRlLCByZWdVbHRpbWFFZGljYW8gOiBTdHJpbmcsIGZvdG9VbHRpbW9Vc2VyOiBTdHJpbmcpIDogUGxhY2FFbWJyYXRleFxyXG5cclxuICAgICAgICB1cGRhdGVQbGFjYUVtYiAoaWRQbGFjYTogSUQsIG5vbWVQbGFjYTogU3RyaW5nLCBxdWFudGlkYWRlOiBJbnQsIHNpdHVhY2FvOiBTdHJpbmcsIGxvY2FsOiBTdHJpbmcsIFxyXG4gICAgICAgICAgICBxdGRQYXJhU2l0dWFjYW9CYWl4YTogSW50LCBxdGRQYXJhU2l0dWFjYW9PazogSW50LCBkYXRhVWx0aW1hRWRpY2FvOiBEYXRlLCByZWdVbHRpbWFFZGljYW8gOiBTdHJpbmcsIGZvdG9VbHRpbW9Vc2VyOiBTdHJpbmcpIDogUGxhY2FFbWJyYXRleFxyXG5cclxuICAgICAgICBkZWxldGVQbGFjYUVtYiAoaWRQbGFjYTogSUQpIDogSURcclxuICAgIH1cclxuYFxyXG5leHBvcnQgY29uc3QgcmVzb2x2ZXJzID0ge1xyXG4gICAgUXVlcnk6IHtcclxuICAgICAgICBwbGFjYXNFbWJyYXRleDogYXN5bmMgKGFyZ3MpID0+IGRiUGxhY2FzLnBsYWNhc19lbWJyYXRleC5maW5kQWxsKCksXHJcbiAgICAgICAgcGxhY2FFbWJyYXRleDogYXN5bmMgKG9iaiwgYXJncywgY29udGV4dCwgaW5mbykgPT4gZGJQbGFjYXMucGxhY2FzX2VtYnJhdGV4LmZpbmRCeVBrKGFyZ3MuaWRQbGFjYSlcclxuICAgIH0sXHJcbiAgICBNdXRhdGlvbiA6IHtcclxuICAgICAgICBjcmVhdGVQbGFjYUVtYjogYXN5bmMgKHBhcmVudCwge25vbWVQbGFjYSwgcXVhbnRpZGFkZSwgc2l0dWFjYW8sIGxvY2FsLCBxdGRQYXJhU2l0dWFjYW9CYWl4YSwgcXRkUGFyYVNpdHVhY2FvT2ssIHJlZ1VsdGltYUVkaWNhbywgZm90b1VsdGltb1VzZXJ9LCBpbmZvKSA9PlxyXG4gICAgICAgICAgICBkYlBsYWNhcy5wbGFjYXNfZW1icmF0ZXguY3JlYXRlICh7XHJcbiAgICAgICAgICAgICAgICBub21lUGxhY2E6IG5vbWVQbGFjYSxcclxuICAgICAgICAgICAgICAgIHF1YW50aWRhZGU6IHF1YW50aWRhZGUsXHJcbiAgICAgICAgICAgICAgICBzaXR1YWNhbzogc2l0dWFjYW8sXHJcbiAgICAgICAgICAgICAgICBsb2NhbDogbG9jYWwsXHJcbiAgICAgICAgICAgICAgICBxdGRQYXJhU2l0dWFjYW9CYWl4YSA6IHF0ZFBhcmFTaXR1YWNhb0JhaXhhLFxyXG4gICAgICAgICAgICAgICAgcXRkUGFyYVNpdHVhY2FvT2sgOiBxdGRQYXJhU2l0dWFjYW9PayxcclxuICAgICAgICAgICAgICAgIHJlZ1VsdGltYUVkaWNhbzogcmVnVWx0aW1hRWRpY2FvLFxyXG4gICAgICAgICAgICAgICAgZm90b1VsdGltb1VzZXIgOiBmb3RvVWx0aW1vVXNlclxyXG4gICAgICAgICAgICB9KSxcclxuICAgICAgICB1cGRhdGVQbGFjYUVtYjogYXN5bmMgKHBhcmVudCwge2lkUGxhY2EsIG5vbWVQbGFjYSwgcXVhbnRpZGFkZSwgc2l0dWFjYW8sIGxvY2FsLCBxdGRQYXJhU2l0dWFjYW9CYWl4YSwgcXRkUGFyYVNpdHVhY2FvT2ssIHJlZ1VsdGltYUVkaWNhbywgZm90b1VsdGltb1VzZXJ9LCBpbmZvKSA9PlxyXG4gICAgICAgICAgICBkYlBsYWNhcy5wbGFjYXNfZW1icmF0ZXgudXBkYXRlKHtcclxuICAgICAgICAgICAgICAgIG5vbWVQbGFjYTogbm9tZVBsYWNhLFxyXG4gICAgICAgICAgICAgICAgcXVhbnRpZGFkZTogcXVhbnRpZGFkZSxcclxuICAgICAgICAgICAgICAgIHNpdHVhY2FvOiBzaXR1YWNhbyxcclxuICAgICAgICAgICAgICAgIGxvY2FsOiBsb2NhbCxcclxuICAgICAgICAgICAgICAgIHF0ZFBhcmFTaXR1YWNhb0JhaXhhIDogcXRkUGFyYVNpdHVhY2FvQmFpeGEsXHJcbiAgICAgICAgICAgICAgICBxdGRQYXJhU2l0dWFjYW9PayA6IHF0ZFBhcmFTaXR1YWNhb09rLFxyXG4gICAgICAgICAgICAgICAgcmVnVWx0aW1hRWRpY2FvOiByZWdVbHRpbWFFZGljYW8sXHJcbiAgICAgICAgICAgICAgICBmb3RvVWx0aW1vVXNlciA6IGZvdG9VbHRpbW9Vc2VyXHJcbiAgICAgICAgICAgIH0sIHtcclxuICAgICAgICAgICAgICAgIHdoZXJlIDoge1xyXG4gICAgICAgICAgICAgICAgICAgIGlkUGxhY2E6IGlkUGxhY2FcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSksXHJcbiAgICAgICAgZGVsZXRlUGxhY2FFbWI6IGFzeW5jIChwYXJlbnQsIHtpZFBsYWNhfSwgaW5mbykgPT5cclxuICAgICAgICB7XHJcbiAgICAgICAgZGJQbGFjYXMucGxhY2FzX2VtYnJhdGV4LmRlc3Ryb3kgKHtcclxuICAgICAgICAgICAgd2hlcmUgOiB7XHJcbiAgICAgICAgICAgICAgICBpZFBsYWNhIDogaWRQbGFjYVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59IiwiaW1wb3J0IHsgZ3FsIH0gZnJvbSAnYXBvbGxvLXNlcnZlci1leHByZXNzJ1xyXG5pbXBvcnQgKiBhcyBkYlBsYWNhcyBmcm9tICcuLi9kYXRhYmFzZXMvZGF0YWJhc2UtcGxhY2FzJ1xyXG5cclxuXHJcbmV4cG9ydCBjb25zdCB0eXBlRGVmcyA9IGdxbGBcclxuICAgIGV4dGVuZCB0eXBlIFF1ZXJ5IHtcclxuICAgICAgICBwbGFjYXNXZW50ZXg6IFtQbGFjYVdlbnRleF1cclxuICAgICAgICBwbGFjYVdlbnRleChpZFBsYWNhOiBJRCk6IFBsYWNhV2VudGV4XHJcbiAgICB9XHJcbiAgICBcclxuICAgIHR5cGUgUGxhY2FXZW50ZXgge1xyXG4gICAgICAgIGlkUGxhY2E6IElEXHJcbiAgICAgICAgbm9tZVBsYWNhOiBTdHJpbmdcclxuICAgICAgICBxdWFudGlkYWRlOiBJbnRcclxuICAgICAgICBzaXR1YWNhbzogU3RyaW5nXHJcbiAgICAgICAgbG9jYWw6IFN0cmluZ1xyXG4gICAgICAgIHF0ZFBhcmFTaXR1YWNhb0JhaXhhOiBJbnRcclxuICAgICAgICBxdGRQYXJhU2l0dWFjYW9PazogSW50XHJcbiAgICAgICAgZGF0YVVsdGltYUVkaWNhbzogRGF0ZVxyXG4gICAgICAgIHJlZ1VsdGltYUVkaWNhbyA6IFN0cmluZ1xyXG4gICAgICAgIGZvdG9VbHRpbW9Vc2VyIDogU3RyaW5nXHJcbiAgICB9XHJcblxyXG4gICAgZXh0ZW5kIHR5cGUgTXV0YXRpb24ge1xyXG4gICAgICAgIGNyZWF0ZVBsYWNhV2VudGV4ICAoaWRQbGFjYTogSUQsIG5vbWVQbGFjYTogU3RyaW5nLCBxdWFudGlkYWRlOiBJbnQsIHNpdHVhY2FvOiBTdHJpbmcsIGxvY2FsOiBTdHJpbmcsIFxyXG4gICAgICAgICAgICBxdGRQYXJhU2l0dWFjYW9CYWl4YTogSW50LCBxdGRQYXJhU2l0dWFjYW9PazogSW50LCBkYXRhVWx0aW1hRWRpY2FvOiBEYXRlLCByZWdVbHRpbWFFZGljYW8gOiBTdHJpbmcsIGZvdG9VbHRpbW9Vc2VyOiBTdHJpbmcpIDogUGxhY2FXZW50ZXhcclxuXHJcbiAgICAgICAgdXBkYXRlUGxhY2FXZW50ZXggIChpZFBsYWNhOiBJRCwgbm9tZVBsYWNhOiBTdHJpbmcsIHF1YW50aWRhZGU6IEludCwgc2l0dWFjYW86IFN0cmluZywgbG9jYWw6IFN0cmluZywgXHJcbiAgICAgICBxdGRQYXJhU2l0dWFjYW9CYWl4YTogSW50LCBxdGRQYXJhU2l0dWFjYW9PazogSW50LCBkYXRhVWx0aW1hRWRpY2FvOiBEYXRlLCByZWdVbHRpbWFFZGljYW8gOiBTdHJpbmcsIGZvdG9VbHRpbW9Vc2VyOiBTdHJpbmcgKSA6IFBsYWNhV2VudGV4XHJcblxyXG4gICAgICAgIGRlbGV0ZVBsYWNhV2VudGV4IChpZFBsYWNhOiBJRCkgOiBJRFxyXG4gICAgfVxyXG5gXHJcbmV4cG9ydCBjb25zdCByZXNvbHZlcnMgPSB7XHJcbiAgICBRdWVyeToge1xyXG4gICAgICAgIHBsYWNhc1dlbnRleDogYXN5bmMgKGFyZ3MpID0+IGRiUGxhY2FzLnBsYWNhc193ZW50ZXguZmluZEFsbCgpLFxyXG4gICAgICAgIHBsYWNhV2VudGV4OiBhc3luYyAob2JqLCBhcmdzLCBjb250ZXh0LCBpbmZvKSA9PiBkYlBsYWNhcy5wbGFjYXNfd2VudGV4LmZpbmRCeVBrKGFyZ3MuaWQpXHJcbiAgICB9LFxyXG4gICAgTXV0YXRpb24gOiB7XHJcbiAgICAgICAgY3JlYXRlUGxhY2FXZW50ZXg6IGFzeW5jIChwYXJlbnQsIHtub21lUGxhY2EsIHF1YW50aWRhZGUsIHNpdHVhY2FvLCBsb2NhbCwgcXRkUGFyYVNpdHVhY2FvQmFpeGEsIHF0ZFBhcmFTaXR1YWNhb09rLCByZWdVbHRpbWFFZGljYW8sIGZvdG9VbHRpbW9Vc2VyfSwgaW5mbykgPT5cclxuICAgICAgICAgICAgZGJQbGFjYXMucGxhY2FzX3dlbnRleC5jcmVhdGUgKHtcclxuICAgICAgICAgICAgICAgIG5vbWVQbGFjYTogbm9tZVBsYWNhLFxyXG4gICAgICAgICAgICAgICAgcXVhbnRpZGFkZTogcXVhbnRpZGFkZSxcclxuICAgICAgICAgICAgICAgIHNpdHVhY2FvOiBzaXR1YWNhbyxcclxuICAgICAgICAgICAgICAgIGxvY2FsOiBsb2NhbCxcclxuICAgICAgICAgICAgICAgIHF0ZFBhcmFTaXR1YWNhb0JhaXhhIDogcXRkUGFyYVNpdHVhY2FvQmFpeGEsXHJcbiAgICAgICAgICAgICAgICBxdGRQYXJhU2l0dWFjYW9PayA6IHF0ZFBhcmFTaXR1YWNhb09rLFxyXG4gICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIHJlZ1VsdGltYUVkaWNhbzogcmVnVWx0aW1hRWRpY2FvLFxyXG4gICAgICAgICAgICAgICAgZm90b1VsdGltb1VzZXIgOiBmb3RvVWx0aW1vVXNlclxyXG4gICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIH0pLFxyXG4gICAgICAgIHVwZGF0ZVBsYWNhV2VudGV4OiBhc3luYyAocGFyZW50LCB7aWRQbGFjYSwgbm9tZVBsYWNhLCBxdWFudGlkYWRlLCBzaXR1YWNhbywgbG9jYWwsIHF0ZFBhcmFTaXR1YWNhb0JhaXhhLCBxdGRQYXJhU2l0dWFjYW9PaywgcmVnVWx0aW1hRWRpY2FvLCBmb3RvVWx0aW1vVXNlcn0sIGluZm8pID0+XHJcbiAgICAgICAgICAgIGRiUGxhY2FzLnBsYWNhc193ZW50ZXgudXBkYXRlKHtcclxuICAgICAgICAgICAgICAgIG5vbWVQbGFjYTogbm9tZVBsYWNhLFxyXG4gICAgICAgICAgICAgICAgcXVhbnRpZGFkZTogcXVhbnRpZGFkZSxcclxuICAgICAgICAgICAgICAgIHNpdHVhY2FvOiBzaXR1YWNhbyxcclxuICAgICAgICAgICAgICAgIGxvY2FsOiBsb2NhbCxcclxuICAgICAgICAgICAgICAgIHF0ZFBhcmFTaXR1YWNhb0JhaXhhIDogcXRkUGFyYVNpdHVhY2FvQmFpeGEsXHJcbiAgICAgICAgICAgICAgICBxdGRQYXJhU2l0dWFjYW9PayA6IHF0ZFBhcmFTaXR1YWNhb09rLFxyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIHJlZ1VsdGltYUVkaWNhbzogcmVnVWx0aW1hRWRpY2FvLFxyXG4gICAgICAgICAgICAgICAgZm90b1VsdGltb1VzZXIgOiBmb3RvVWx0aW1vVXNlclxyXG4gICAgICAgICAgICB9LCB7XHJcbiAgICAgICAgICAgICAgICB3aGVyZSA6IHtcclxuICAgICAgICAgICAgICAgICAgICBpZFBsYWNhOiBpZFBsYWNhXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pLFxyXG4gICAgICAgIGRlbGV0ZVBsYWNhV2VudGV4OiBhc3luYyAocGFyZW50LCB7aWRQbGFjYX0sIGluZm8pID0+XHJcbiAgICAgICAge1xyXG4gICAgICAgIGRiUGxhY2FzLnBsYWNhc193ZW50ZXguZGVzdHJveSAoe1xyXG4gICAgICAgICAgICB3aGVyZSA6IHtcclxuICAgICAgICAgICAgICAgIGlkUGxhY2EgOiBpZFBsYWNhXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuIiwiaW1wb3J0IHsgZ3FsIH0gZnJvbSAnYXBvbGxvLXNlcnZlci1leHByZXNzJ1xyXG5pbXBvcnQgKiBhcyBkYlVzZXJzIGZyb20gJy4uL2RhdGFiYXNlcy9kYXRhYmFzZS11c3VhcmlvcydcclxuXHJcblxyXG5leHBvcnQgY29uc3QgdHlwZURlZnMgPSBncWxgXHJcbiAgICBleHRlbmQgdHlwZSBRdWVyeSB7XHJcbiAgICAgICAgYXR1YWxpemFfY29sYWJvcmFkb3JlczogW1VzZXJdXHJcbiAgICAgICAgYXR1YWxpemFfY29sYWJvcmFkb3IocmVnaXN0cm86IFN0cmluZyk6IFVzZXIgICBcclxuICAgIH1cclxuICAgIFxyXG4gICAgdHlwZSBVc2VyIHtcclxuICAgICAgICByZWdpc3RybzogU3RyaW5nXHJcbiAgICAgICAgbm9tZTogU3RyaW5nXHJcbiAgICAgICAgbGlzdGFfZnVuY2FvOiBTdHJpbmdcclxuICAgICAgICBmb3RvOiBTdHJpbmdcclxuICAgIH1cclxuXHJcbmBcclxuZXhwb3J0IGNvbnN0IHJlc29sdmVycyA9IHtcclxuICAgIFF1ZXJ5OiB7XHJcbiAgICAgICAgYXR1YWxpemFfY29sYWJvcmFkb3JlczogYXN5bmMgKGFyZ3MpID0+IGRiVXNlcnMuYXR1YWxpemFfY29sYWJvcmFkb3IuZmluZEFsbCgpLFxyXG4gICAgICAgIGF0dWFsaXphX2NvbGFib3JhZG9yOiBhc3luYyAob2JqLCBhcmdzLCBjb250ZXh0LCBpbmZvKSA9PiBkYlVzZXJzLmF0dWFsaXphX2NvbGFib3JhZG9yLmZpbmRCeVBrKGFyZ3MucmVnaXN0cm8pXHJcbiAgICB9LFxyXG59XHJcblxyXG4vL1xyXG4vLyB1c2VyKHJlZzogU3RyaW5nISk6IFVzZXJcclxuXHJcbiIsIlxyXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKHNlcXVlbGl6ZSwgRGF0YVR5cGVzKSB7XHJcblx0cmV0dXJuIHNlcXVlbGl6ZS5kZWZpbmUoJ2xpc3RhX2Z1bmNhbycsIHtcclxuXHRcdGlkX2Z1bmNhbzoge1xyXG5cdFx0XHR0eXBlOiBEYXRhVHlwZXMuU1RSSU5HKDE2KSxcclxuXHRcdFx0YWxsb3dOdWxsOiBmYWxzZSxcclxuXHRcdFx0cHJpbWFyeUtleTogdHJ1ZSxcclxuXHRcdFx0YXV0b0luY3JlbWVudDogdHJ1ZVxyXG5cdFx0fSxcclxuXHRcdG5vbWVfZnVuY2FvOiB7XHJcblx0XHRcdHR5cGU6IERhdGFUeXBlcy5TVFJJTkcoMjU2KSxcclxuXHRcdFx0YWxsb3dOdWxsOiBmYWxzZVxyXG5cdFx0fSxcclxuXHRcdGlkX3Blcm1pc3Nhbzoge1xyXG5cdFx0XHR0eXBlOiBEYXRhVHlwZXMuU1RSSU5HKDI1NiksXHJcblx0XHRcdGFsbG93TnVsbDogZmFsc2VcclxuXHRcdH0sXHJcblx0fSwge1xyXG5cdFx0dGFibGVOYW1lOiAnbGlzdGFfZnVuY2FvJyxcclxuXHRcdHRpbWVzdGFtcHM6IGZhbHNlXHJcblx0fSk7XHJcbn07IiwiXHJcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oc2VxdWVsaXplLCBEYXRhVHlwZXMpIHtcclxuXHRyZXR1cm4gc2VxdWVsaXplLmRlZmluZSgncGxhY2FzX2VtYnJhdGV4Jywge1xyXG5cdFx0aWRQbGFjYToge1xyXG5cdFx0XHR0eXBlOiBEYXRhVHlwZXMuTUVESVVNSU5UKDgpLFxyXG5cdFx0XHRhbGxvd051bGw6IGZhbHNlLFxyXG5cdFx0XHRwcmltYXJ5S2V5OiB0cnVlLFxyXG5cdFx0XHRhdXRvSW5jcmVtZW50OiB0cnVlXHJcblx0XHR9LFxyXG5cdFx0bm9tZVBsYWNhOiB7XHJcblx0XHRcdHR5cGU6IERhdGFUeXBlcy5TVFJJTkcoMjU2KSxcclxuXHRcdFx0YWxsb3dOdWxsOiBmYWxzZVxyXG5cdFx0fSxcclxuXHRcdHF1YW50aWRhZGU6IHtcclxuXHRcdFx0dHlwZTogRGF0YVR5cGVzLklOVEVHRVIsXHJcblx0XHRcdGFsbG93TnVsbDogZmFsc2VcclxuXHRcdH0sXHJcblx0XHRzaXR1YWNhbzoge1xyXG5cdFx0XHR0eXBlOiBEYXRhVHlwZXMuU1RSSU5HKDI1NiksXHJcblx0XHRcdGFsbG93TnVsbDogZmFsc2VcclxuXHRcdH0sXHJcblxyXG5cdFx0cXRkUGFyYVNpdHVhY2FvQmFpeGE6IHtcclxuXHRcdFx0dHlwZTogRGF0YVR5cGVzLklOVEVHRVIsXHJcblx0XHRcdGFsbG93TnVsbDogZmFsc2VcclxuXHRcdH0sXHJcblxyXG5cdFx0cXRkUGFyYVNpdHVhY2FvT2s6IHtcclxuXHRcdFx0dHlwZTogRGF0YVR5cGVzLklOVEVHRVIsXHJcblx0XHRcdGFsbG93TnVsbDogZmFsc2VcclxuXHRcdH0sXHJcblxyXG5cdFx0ZGF0YVVsdGltYUVkaWNhbzoge1xyXG5cdFx0XHR0eXBlOiAnVElNRVNUQU1QJyxcclxuXHRcdFx0ZGVmYXVsdFZhbHVlOiBEYXRhVHlwZXMubGl0ZXJhbCgnQ1VSUkVOVF9USU1FU1RBTVAnKSxcclxuXHRcdFx0YWxsb3dOdWxsOiBmYWxzZVxyXG5cdFx0fSxcclxuXHJcblx0XHRsb2NhbDoge1xyXG5cdFx0XHR0eXBlOiBEYXRhVHlwZXMuU1RSSU5HKDI1NiksXHJcblx0XHRcdGFsbG93TnVsbDogZmFsc2VcclxuXHRcdH0sXHJcblx0XHRcclxuXHRcdHJlZ1VsdGltYUVkaWNhbzp7XHJcblx0XHRcdHR5cGU6IERhdGFUeXBlcy5TVFJJTkcoMjU2KSxcclxuXHRcdFx0YWxsb3dOdWxsOiBmYWxzZVxyXG5cdFx0fSxcclxuXHJcblx0XHRmb3RvVWx0aW1vVXNlcjoge1xyXG5cdFx0XHR0eXBlOiBEYXRhVHlwZXMuQkxPQixcclxuXHRcdFx0YWxsb3dOdWxsOiBmYWxzZSxcclxuXHRcdFx0Z2V0KCkge1xyXG5cdFx0XHRcdHJldHVybiB0aGlzLmdldERhdGFWYWx1ZSgnZm90b1VsdGltb1VzZXInKS50b1N0cmluZygndXRmOCcpO1xyXG5cdFx0XHQgIH0sXHJcblx0XHR9XHJcblx0fSwge1xyXG5cdFx0dGFibGVOYW1lOiAncGxhY2FzX2VtYnJhdGV4JyxcclxuXHRcdHRpbWVzdGFtcHM6IGZhbHNlXHJcblx0fSk7XHJcbn07XHJcbiIsIlxyXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKHNlcXVlbGl6ZSwgRGF0YVR5cGVzKSB7XHJcblx0cmV0dXJuIHNlcXVlbGl6ZS5kZWZpbmUoJ3BsYWNhc193ZW50ZXgnLCB7XHJcblx0XHRpZFBsYWNhOiB7XHJcblx0XHRcdHR5cGU6IERhdGFUeXBlcy5NRURJVU1JTlQoOCksXHJcblx0XHRcdGFsbG93TnVsbDogZmFsc2UsXHJcblx0XHRcdHByaW1hcnlLZXk6IHRydWUsXHJcblx0XHRcdGF1dG9JbmNyZW1lbnQ6IHRydWVcclxuXHRcdH0sXHJcblx0XHRub21lUGxhY2E6IHtcclxuXHRcdFx0dHlwZTogRGF0YVR5cGVzLlNUUklORygyNTYpLFxyXG5cdFx0XHRhbGxvd051bGw6IGZhbHNlXHJcblx0XHR9LFxyXG5cdFx0cXVhbnRpZGFkZToge1xyXG5cdFx0XHR0eXBlOiBEYXRhVHlwZXMuSU5URUdFUixcclxuXHRcdFx0YWxsb3dOdWxsOiBmYWxzZVxyXG5cdFx0fSxcclxuXHRcdHNpdHVhY2FvOiB7XHJcblx0XHRcdHR5cGU6IERhdGFUeXBlcy5TVFJJTkcoMjU2KSxcclxuXHRcdFx0YWxsb3dOdWxsOiBmYWxzZVxyXG5cdFx0fSxcclxuXHJcblx0XHRxdGRQYXJhU2l0dWFjYW9CYWl4YToge1xyXG5cdFx0XHR0eXBlOiBEYXRhVHlwZXMuSU5URUdFUixcclxuXHRcdFx0YWxsb3dOdWxsOiBmYWxzZVxyXG5cdFx0fSxcclxuXHJcblx0XHRxdGRQYXJhU2l0dWFjYW9Pazoge1xyXG5cdFx0XHR0eXBlOiBEYXRhVHlwZXMuSU5URUdFUixcclxuXHRcdFx0YWxsb3dOdWxsOiBmYWxzZVxyXG5cdFx0fSxcclxuXHJcblx0XHRkYXRhVWx0aW1hRWRpY2FvOiB7XHJcblx0XHRcdHR5cGU6ICdUSU1FU1RBTVAnLFxyXG5cdFx0XHRkZWZhdWx0VmFsdWU6IERhdGFUeXBlcy5saXRlcmFsKCdDVVJSRU5UX1RJTUVTVEFNUCcpLFxyXG5cdFx0XHRhbGxvd051bGw6IGZhbHNlXHJcblx0XHR9LFxyXG5cclxuXHRcdGxvY2FsOiB7XHJcblx0XHRcdHR5cGU6IERhdGFUeXBlcy5TVFJJTkcoMjU2KSxcclxuXHRcdFx0YWxsb3dOdWxsOiBmYWxzZVxyXG5cdFx0fSxcclxuXHRcdFxyXG5cdFx0cmVnVWx0aW1hRWRpY2FvOntcclxuXHRcdFx0dHlwZTogRGF0YVR5cGVzLlNUUklORygyNTYpLFxyXG5cdFx0XHRhbGxvd051bGw6IGZhbHNlXHJcblx0XHR9LFxyXG5cclxuXHRcdGZvdG9VbHRpbW9Vc2VyOiB7XHJcblx0XHRcdHR5cGU6IERhdGFUeXBlcy5CTE9CLFxyXG5cdFx0XHRhbGxvd051bGw6IGZhbHNlLFxyXG5cdFx0XHRnZXQoKSB7XHJcblx0XHRcdFx0cmV0dXJuIHRoaXMuZ2V0RGF0YVZhbHVlKCdmb3RvVWx0aW1vVXNlcicpLnRvU3RyaW5nKCd1dGY4Jyk7XHJcblx0XHRcdCAgfSxcclxuXHRcdH1cclxuXHR9LCB7XHJcblx0XHR0YWJsZU5hbWU6ICdwbGFjYXNfd2VudGV4JyxcclxuXHRcdHRpbWVzdGFtcHM6IGZhbHNlXHJcblx0fSk7XHJcbn07XHJcbiIsIi8qIGpzaGludCBpbmRlbnQ6IDEgKi9cclxuXHJcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oc2VxdWVsaXplLCBEYXRhVHlwZXMpIHtcclxuXHRyZXR1cm4gc2VxdWVsaXplLmRlZmluZSgnYXR1YWxpemFfY29sYWJvcmFkb3InLCB7XHJcblx0XHRyZWdpc3Rybzoge1xyXG5cdFx0XHR0eXBlOiBEYXRhVHlwZXMuU1RSSU5HKDE2KSxcclxuXHRcdFx0YWxsb3dOdWxsOiBmYWxzZSxcclxuXHRcdFx0cHJpbWFyeUtleTogdHJ1ZSxcclxuXHRcdFx0YXV0b0luY3JlbWVudDogdHJ1ZVxyXG5cdFx0fSxcclxuXHRcdG5vbWU6IHtcclxuXHRcdFx0dHlwZTogRGF0YVR5cGVzLlNUUklORygyNTYpLFxyXG5cdFx0XHRhbGxvd051bGw6IGZhbHNlXHJcblx0XHR9LFxyXG5cdFx0bGlzdGFfZnVuY2FvOiB7XHJcblx0XHRcdHR5cGU6IERhdGFUeXBlcy5TVFJJTkcoMjU2KSxcclxuXHRcdFx0YWxsb3dOdWxsOiBmYWxzZVxyXG5cdFx0fSxcclxuXHRcdGZvdG86IHtcclxuXHRcdFx0dHlwZTogRGF0YVR5cGVzLkJMT0IsXHJcblx0XHRcdGFsbG93TnVsbDogZmFsc2UsXHJcblx0XHRcdGdldCgpIHtcclxuXHRcdFx0XHRyZXR1cm4gdGhpcy5nZXREYXRhVmFsdWUoJ2ZvdG8nKS50b1N0cmluZygnYmFzZTY0Jyk7XHJcblx0XHRcdCAgfSxcclxuXHRcdH1cclxuXHR9LCB7XHJcblx0XHR0YWJsZU5hbWU6ICdhdHVhbGl6YV9jb2xhYm9yYWRvcicsXHJcblx0XHR0aW1lc3RhbXBzOiBmYWxzZVxyXG5cdH0pO1xyXG59OyIsImltcG9ydCAnQGJhYmVsL3BvbHlmaWxsJ1xyXG5pbXBvcnQgZXhwcmVzcyBmcm9tICdleHByZXNzJ1xyXG5jb25zdCBib2R5UGFyc2VyID0gcmVxdWlyZSgnYm9keS1wYXJzZXInKVxyXG5jb25zdCB7IEFwb2xsb1NlcnZlciB9ID0gcmVxdWlyZSgnYXBvbGxvLXNlcnZlci1leHByZXNzJylcclxuY29uc3QgY29ycyA9IHJlcXVpcmUoJ2NvcnMnKVxyXG5jb25zdCBhcHAgPSBleHByZXNzKClcclxuXHJcblxyXG5hcHAudXNlKGJvZHlQYXJzZXIuanNvbih7IGxpbWl0OiAnNW1iJyB9KSlcclxuYXBwLnVzZShib2R5UGFyc2VyLnVybGVuY29kZWQoeyBleHRlbmRlZDogdHJ1ZSB9KSlcclxuYXBwLnVzZShjb3JzKCkpXHJcblxyXG5jb25zdCBzZXJ2ZXIgPSBuZXcgQXBvbGxvU2VydmVyKHtcclxuICAgIG1vZHVsZXM6IFtcclxuICAgICAgICByZXF1aXJlKCcuL2dyYXBoLXFsL3VzZXJzJyksXHJcbiAgICAgICAgcmVxdWlyZSgnLi9ncmFwaC1xbC9mdW5jYW8tdXNlcicpLFxyXG4gICAgICAgIHJlcXVpcmUoJy4vZ3JhcGgtcWwvcGxhY2FzLWVtYnJhdGV4JyksXHJcbiAgICAgICAgcmVxdWlyZSgnLi9ncmFwaC1xbC9wbGFjYXMtd2VudGV4JyksXHJcbiAgICAgIC8vICByZXF1aXJlKCcuL2dyYXBoLXFsL2RhZG9zJylcclxuXHJcbiAgICBdLFxyXG59KVxyXG5cclxuc2VydmVyLmFwcGx5TWlkZGxld2FyZSh7IGFwcCB9KVxyXG5cclxuXHJcbmFwcC5saXN0ZW4oeyBwb3J0OiA1MDAwIH0sICgpID0+XHJcbiAgICBjb25zb2xlLmxvZyhg8J+agCBTZXJ2ZXIgcmVhZHkgYXQgaHR0cDovL2xvY2FsaG9zdDo1MDAwYCksXHJcbilcclxuXHJcblxyXG5cclxuXHJcbiIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIkBiYWJlbC9wb2x5ZmlsbFwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJhcG9sbG8tc2VydmVyLWV4cHJlc3NcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiYm9keS1wYXJzZXJcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiY29yc1wiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJleHByZXNzXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInNlcXVlbGl6ZVwiKTsiXSwic291cmNlUm9vdCI6IiJ9