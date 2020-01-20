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
var models = [__webpack_require__(/*! ../models/placas-embratex */ "./models/placas-embratex.js"), __webpack_require__(/*! ../models/placas-wentex */ "./models/placas-wentex.js"), __webpack_require__(/*! ../models/verified-users */ "./models/verified-users.js")]; // Initialize models

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

/***/ "./graph-ql/verified-users.js":
/*!************************************!*\
  !*** ./graph-ql/verified-users.js ***!
  \************************************/
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
  var data = _taggedTemplateLiteral(["\n    extend type Query {\n        users_verificados: [User_verified]\n        users_verificado(registro: String): User_verified  \n    }\n    \n    type User_verified {\n        registro: String\n        senha: String\n        nome: String\n        is_verified: String\n        is_super: String\n    }\n\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }



var typeDefs = Object(apollo_server_express__WEBPACK_IMPORTED_MODULE_0__["gql"])(_templateObject());
var resolvers = {
  Query: {
    users_verificados: function () {
      var _users_verificados = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee(args) {
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                return _context.abrupt("return", _databases_database_placas__WEBPACK_IMPORTED_MODULE_1__["users_system"].findAll());

              case 1:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));

      function users_verificados(_x) {
        return _users_verificados.apply(this, arguments);
      }

      return users_verificados;
    }(),
    users_verificado: function () {
      var _users_verificado = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee2(obj, args, context, info) {
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                return _context2.abrupt("return", _databases_database_placas__WEBPACK_IMPORTED_MODULE_1__["users_system"].findByPk(args.registro));

              case 1:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2);
      }));

      function users_verificado(_x2, _x3, _x4, _x5) {
        return _users_verificado.apply(this, arguments);
      }

      return users_verificado;
    }()
  }
};
/*
INSERT INTO users_verificados (registro, senha, nome) VALUES ("00115070297", "em1401", "emerson");
INSERT INTO users_verificados (registro, senha, nome) VALUES ("00115016640", "je1401", "jesimiel");
INSERT INTO users_verificados (registro, senha, nome) VALUES ("00115001201", "cl1401", "claudio");
INSERT INTO users_verificados (registro, senha, nome) VALUES ("00115045179", "an1401", "andre");
INSERT INTO users_verificados (registro, senha, nome) VALUES ("00115062170", "el1401", "elisangela");


*/

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

/***/ "./models/verified-users.js":
/*!**********************************!*\
  !*** ./models/verified-users.js ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = function (sequelize, DataTypes) {
  return sequelize.define('users_system', {
    registro: {
      type: DataTypes.STRING(20),
      allowNull: false,
      primaryKey: true
    },
    senha: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    nome: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    is_verified: {
      type: DataTypes.STRING(5),
      allowNull: false
    },
    is_super: {
      type: DataTypes.STRING(10),
      allowNull: false
    }
  }, {
    tableName: 'users_system',
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
  modules: [__webpack_require__(/*! ./graph-ql/users */ "./graph-ql/users.js"), __webpack_require__(/*! ./graph-ql/funcao-user */ "./graph-ql/funcao-user.js"), __webpack_require__(/*! ./graph-ql/placas-embratex */ "./graph-ql/placas-embratex.js"), __webpack_require__(/*! ./graph-ql/placas-wentex */ "./graph-ql/placas-wentex.js"), __webpack_require__(/*! ./graph-ql/verified-users */ "./graph-ql/verified-users.js") //  require('./graph-ql/dados')
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vZGF0YWJhc2VzL2RhdGFiYXNlLXBsYWNhcy5qcyIsIndlYnBhY2s6Ly8vLi9kYXRhYmFzZXMvZGF0YWJhc2UtdXN1YXJpb3MuanMiLCJ3ZWJwYWNrOi8vLy4vZ3JhcGgtcWwvZnVuY2FvLXVzZXIuanMiLCJ3ZWJwYWNrOi8vLy4vZ3JhcGgtcWwvcGxhY2FzLWVtYnJhdGV4LmpzIiwid2VicGFjazovLy8uL2dyYXBoLXFsL3BsYWNhcy13ZW50ZXguanMiLCJ3ZWJwYWNrOi8vLy4vZ3JhcGgtcWwvdXNlcnMuanMiLCJ3ZWJwYWNrOi8vLy4vZ3JhcGgtcWwvdmVyaWZpZWQtdXNlcnMuanMiLCJ3ZWJwYWNrOi8vLy4vbW9kZWxzL2Z1bmNhby11c2VyLmpzIiwid2VicGFjazovLy8uL21vZGVscy9wbGFjYXMtZW1icmF0ZXguanMiLCJ3ZWJwYWNrOi8vLy4vbW9kZWxzL3BsYWNhcy13ZW50ZXguanMiLCJ3ZWJwYWNrOi8vLy4vbW9kZWxzL3VzZXJzLmpzIiwid2VicGFjazovLy8uL21vZGVscy92ZXJpZmllZC11c2Vycy5qcyIsIndlYnBhY2s6Ly8vLi9zZXJ2ZXIuanMiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwiQGJhYmVsL3BvbHlmaWxsXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwiYXBvbGxvLXNlcnZlci1leHByZXNzXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwiYm9keS1wYXJzZXJcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJjb3JzXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwiZXhwcmVzc1wiIiwid2VicGFjazovLy9leHRlcm5hbCBcInNlcXVlbGl6ZVwiIl0sIm5hbWVzIjpbIlNlcXVlbGl6ZSIsInJlcXVpcmUiLCJkYlBsYWNhcyIsInNlcXVlbGl6ZSIsImhvc3QiLCJwb3J0IiwiZGlhbGVjdCIsImRlZmluZSIsImZyZWV6ZVRhYmxlTmFtZSIsInBvb2wiLCJtYXgiLCJtaW4iLCJhY3F1aXJlIiwiaWRsZSIsIm9wZXJhdG9yc0FsaWFzZXMiLCJtb2RlbHMiLCJmb3JFYWNoIiwibW9kZWwiLCJzZXFNb2RlbCIsIm5hbWUiLCJPYmplY3QiLCJrZXlzIiwia2V5IiwiYXNzb2NpYXRlIiwibW9kdWxlIiwiZXhwb3J0cyIsImRiVXNlcnMiLCJ0eXBlRGVmcyIsImdxbCIsInJlc29sdmVycyIsIlF1ZXJ5IiwibGlzdGFfZnVuY29lcyIsImFyZ3MiLCJmaW5kQWxsIiwibGlzdGFfZnVuY2FvIiwib2JqIiwiY29udGV4dCIsImluZm8iLCJmaW5kQnlQayIsImlkX2Z1bmNhbyIsInBsYWNhc0VtYnJhdGV4IiwicGxhY2FFbWJyYXRleCIsImlkUGxhY2EiLCJNdXRhdGlvbiIsImNyZWF0ZVBsYWNhRW1iIiwicGFyZW50Iiwibm9tZVBsYWNhIiwicXVhbnRpZGFkZSIsInNpdHVhY2FvIiwibG9jYWwiLCJxdGRQYXJhU2l0dWFjYW9CYWl4YSIsInF0ZFBhcmFTaXR1YWNhb09rIiwicmVnVWx0aW1hRWRpY2FvIiwiZm90b1VsdGltb1VzZXIiLCJjcmVhdGUiLCJ1cGRhdGVQbGFjYUVtYiIsInVwZGF0ZSIsIndoZXJlIiwiZGVsZXRlUGxhY2FFbWIiLCJkZXN0cm95IiwicGxhY2FzV2VudGV4IiwicGxhY2FXZW50ZXgiLCJpZCIsImNyZWF0ZVBsYWNhV2VudGV4IiwidXBkYXRlUGxhY2FXZW50ZXgiLCJkZWxldGVQbGFjYVdlbnRleCIsImF0dWFsaXphX2NvbGFib3JhZG9yZXMiLCJhdHVhbGl6YV9jb2xhYm9yYWRvciIsInJlZ2lzdHJvIiwidXNlcnNfdmVyaWZpY2Fkb3MiLCJ1c2Vyc192ZXJpZmljYWRvIiwiRGF0YVR5cGVzIiwidHlwZSIsIlNUUklORyIsImFsbG93TnVsbCIsInByaW1hcnlLZXkiLCJhdXRvSW5jcmVtZW50Iiwibm9tZV9mdW5jYW8iLCJpZF9wZXJtaXNzYW8iLCJ0YWJsZU5hbWUiLCJ0aW1lc3RhbXBzIiwiTUVESVVNSU5UIiwiSU5URUdFUiIsImRhdGFVbHRpbWFFZGljYW8iLCJkZWZhdWx0VmFsdWUiLCJsaXRlcmFsIiwiQkxPQiIsImdldCIsImdldERhdGFWYWx1ZSIsInRvU3RyaW5nIiwibm9tZSIsImZvdG8iLCJzZW5oYSIsImlzX3ZlcmlmaWVkIiwiaXNfc3VwZXIiLCJib2R5UGFyc2VyIiwiQXBvbGxvU2VydmVyIiwiY29ycyIsImFwcCIsImV4cHJlc3MiLCJ1c2UiLCJqc29uIiwibGltaXQiLCJ1cmxlbmNvZGVkIiwiZXh0ZW5kZWQiLCJzZXJ2ZXIiLCJtb2R1bGVzIiwiYXBwbHlNaWRkbGV3YXJlIiwibGlzdGVuIiwiY29uc29sZSIsImxvZyJdLCJtYXBwaW5ncyI6IjtRQUFBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBOzs7UUFHQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0EsMENBQTBDLGdDQUFnQztRQUMxRTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLHdEQUF3RCxrQkFBa0I7UUFDMUU7UUFDQSxpREFBaUQsY0FBYztRQUMvRDs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0EseUNBQXlDLGlDQUFpQztRQUMxRSxnSEFBZ0gsbUJBQW1CLEVBQUU7UUFDckk7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSwyQkFBMkIsMEJBQTBCLEVBQUU7UUFDdkQsaUNBQWlDLGVBQWU7UUFDaEQ7UUFDQTtRQUNBOztRQUVBO1FBQ0Esc0RBQXNELCtEQUErRDs7UUFFckg7UUFDQTs7O1FBR0E7UUFDQTs7Ozs7Ozs7Ozs7O0FDbEZBLElBQU1BLFNBQVMsR0FBR0MsbUJBQU8sQ0FBQyw0QkFBRCxDQUF6Qjs7QUFFQSxJQUFJQyxRQUFRLEdBQUcsRUFBZjtBQUdBLElBQU1DLFNBQVMsR0FBRyxJQUFJSCxTQUFKLENBQWMscUJBQWQs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LENBQWdCO0FBQUVDLE9BQUssRUFBRTtBQUFULENBQWhCLENBQVI7QUFDQUosR0FBRyxDQUFDRSxHQUFKLENBQVFMLFVBQVUsQ0FBQ1EsVUFBWCxDQUFzQjtBQUFFQyxVQUFRLEVBQUU7QUFBWixDQUF0QixDQUFSO0FBQ0FOLEdBQUcsQ0FBQ0UsR0FBSixDQUFRSCxJQUFJLEVBQVo7QUFFQSxJQUFNUSxNQUFNLEdBQUcsSUFBSVQsWUFBSixDQUFpQjtBQUM1QlUsU0FBTyxFQUFFLENBQ0x6RyxtQkFBTyxDQUFDLDZDQUFELENBREYsRUFFTEEsbUJBQU8sQ0FBQyx5REFBRCxDQUZGLEVBR0xBLG1CQUFPLENBQUMsaUVBQUQsQ0FIRixFQUlMQSxtQkFBTyxDQUFDLDZEQUFELENBSkYsRUFLTEEsbUJBQU8sQ0FBQywrREFBRCxDQUxGLENBTVA7QUFOTztBQURtQixDQUFqQixDQUFmO0FBWUF3RyxNQUFNLENBQUNFLGVBQVAsQ0FBdUI7QUFBRVQsS0FBRyxFQUFIQTtBQUFGLENBQXZCO0FBR0FBLEdBQUcsQ0FBQ1UsTUFBSixDQUFXO0FBQUV2RyxNQUFJLEVBQUU7QUFBUixDQUFYLEVBQTJCO0FBQUEsU0FDdkJ3RyxPQUFPLENBQUNDLEdBQVIsc0RBRHVCO0FBQUEsQ0FBM0IsRTs7Ozs7Ozs7Ozs7QUMzQkEsNEM7Ozs7Ozs7Ozs7O0FDQUEsa0Q7Ozs7Ozs7Ozs7O0FDQUEsd0M7Ozs7Ozs7Ozs7O0FDQUEsaUM7Ozs7Ozs7Ozs7O0FDQUEsb0M7Ozs7Ozs7Ozs7O0FDQUEsc0MiLCJmaWxlIjoic2VydmVyLWRpc3QuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gXCIuL3NlcnZlci5qc1wiKTtcbiIsImNvbnN0IFNlcXVlbGl6ZSA9IHJlcXVpcmUoJ3NlcXVlbGl6ZScpXHJcblxyXG52YXIgZGJQbGFjYXMgPSB7fVxyXG5cclxuXHJcbmNvbnN0IHNlcXVlbGl6ZSA9IG5ldyBTZXF1ZWxpemUoJ2NvbnRyb2xlX3BsYWNhc19zeXMnLCAncm9vdCcsICcxMjM0NTYnLCB7XHJcbiAgICBob3N0OiAnbG9jYWxob3N0JyxcclxuICAgIHBvcnQ6ICczMzA3JyxcclxuICAgIGRpYWxlY3Q6ICdteXNxbCcsXHJcbiAgICBkZWZpbmU6IHtcclxuICAgICAgICBmcmVlemVUYWJsZU5hbWU6IHRydWUsXHJcbiAgICB9LFxyXG4gICAgcG9vbDoge1xyXG4gICAgICAgIG1heDogNSxcclxuICAgICAgICBtaW46IDAsXHJcbiAgICAgICAgYWNxdWlyZTogMzAwMDAsXHJcbiAgICAgICAgaWRsZTogMTAwMDAsXHJcbiAgICB9LFxyXG4gICAgLy8gaHR0cDovL2RvY3Muc2VxdWVsaXplanMuY29tL21hbnVhbC90dXRvcmlhbC9xdWVyeWluZy5odG1sI29wZXJhdG9yc1xyXG4gICAgb3BlcmF0b3JzQWxpYXNlczogZmFsc2UsXHJcbn0pXHJcblxyXG5cclxubGV0IG1vZGVscyA9IFtcclxuICAgIHJlcXVpcmUoJy4uL21vZGVscy9wbGFjYXMtZW1icmF0ZXgnKSxcclxuICAgIHJlcXVpcmUoJy4uL21vZGVscy9wbGFjYXMtd2VudGV4JyksXHJcbiAgICByZXF1aXJlKCcuLi9tb2RlbHMvdmVyaWZpZWQtdXNlcnMnKVxyXG5dXHJcblxyXG4vLyBJbml0aWFsaXplIG1vZGVsc1xyXG5tb2RlbHMuZm9yRWFjaChtb2RlbCA9PiB7XHJcbiAgICBjb25zdCBzZXFNb2RlbCA9IG1vZGVsKHNlcXVlbGl6ZSwgU2VxdWVsaXplKVxyXG4gICAgZGJQbGFjYXNbc2VxTW9kZWwubmFtZV0gPSBzZXFNb2RlbFxyXG59KVxyXG5cclxuLy8gQXBwbHkgYXNzb2NpYXRpb25zXHJcblxyXG5PYmplY3Qua2V5cyhkYlBsYWNhcykuZm9yRWFjaChrZXkgPT4ge1xyXG4gICAgXHJcbiAgICBpZiAoJ2Fzc29jaWF0ZScgaW4gZGJQbGFjYXNba2V5XSkge1xyXG4gICAgICAgIGRiUGxhY2FzW2tleV0uYXNzb2NpYXRlKGRiUGxhY2FzKVxyXG4gICAgfVxyXG59KVxyXG5cclxuXHJcbmRiUGxhY2FzLnNlcXVlbGl6ZSA9IHNlcXVlbGl6ZVxyXG5kYlBsYWNhcy5TZXF1ZWxpemUgPSBTZXF1ZWxpemVcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gZGJQbGFjYXNcclxuIiwiY29uc3QgU2VxdWVsaXplID0gcmVxdWlyZSgnc2VxdWVsaXplJylcclxuXHJcbnZhciBkYlVzZXJzID0ge31cclxuXHJcblxyXG5jb25zdCBzZXF1ZWxpemUgPSBuZXcgU2VxdWVsaXplKCdiYW5jb19hbG1veGFyaWZhZG8nLCAnVXNlckNvbGFiJywgJzEyMzQ1NicsIHtcclxuICAgIGhvc3Q6ICcxMzIuMS40LjIzJyxcclxuICAgIHBvcnQ6ICczMzA3JyxcclxuICAgIGRpYWxlY3Q6ICdteXNxbCcsXHJcbiAgICBkZWZpbmU6IHtcclxuICAgICAgICBmcmVlemVUYWJsZU5hbWU6IHRydWUsXHJcbiAgICB9LFxyXG4gICAgcG9vbDoge1xyXG4gICAgICAgIG1heDogNSxcclxuICAgICAgICBtaW46IDAsXHJcbiAgICAgICAgYWNxdWlyZTogMzAwMDAsXHJcbiAgICAgICAgaWRsZTogMTAwMDAsXHJcbiAgICB9LFxyXG4gICAgLy8gaHR0cDovL2RvY3Muc2VxdWVsaXplanMuY29tL21hbnVhbC90dXRvcmlhbC9xdWVyeWluZy5odG1sI29wZXJhdG9yc1xyXG4gICAgb3BlcmF0b3JzQWxpYXNlczogZmFsc2UsXHJcbn0pXHJcblxyXG5cclxubGV0IG1vZGVscyA9IFtcclxuICAgIHJlcXVpcmUoJy4uL21vZGVscy91c2Vycy5qcycpLFxyXG4gICAgcmVxdWlyZSgnLi4vbW9kZWxzL2Z1bmNhby11c2VyLmpzJylcclxuXVxyXG5cclxuLy8gSW5pdGlhbGl6ZSBtb2RlbHNcclxubW9kZWxzLmZvckVhY2gobW9kZWwgPT4ge1xyXG4gICAgY29uc3Qgc2VxTW9kZWwgPSBtb2RlbChzZXF1ZWxpemUsIFNlcXVlbGl6ZSlcclxuICAgIGRiVXNlcnNbc2VxTW9kZWwubmFtZV0gPSBzZXFNb2RlbFxyXG59KVxyXG5cclxuLy8gQXBwbHkgYXNzb2NpYXRpb25zXHJcblxyXG5PYmplY3Qua2V5cyhkYlVzZXJzKS5mb3JFYWNoKGtleSA9PiB7XHJcbiAgICBcclxuICAgIGlmICgnYXNzb2NpYXRlJyBpbiBkYlVzZXJzW2tleV0pIHtcclxuICAgICAgICBkYlVzZXJzW2tleV0uYXNzb2NpYXRlKGRiVXNlcnMpXHJcbiAgICB9XHJcbn0pXHJcblxyXG5cclxuZGJVc2Vycy5zZXF1ZWxpemUgPSBzZXF1ZWxpemVcclxuZGJVc2Vycy5TZXF1ZWxpemUgPSBTZXF1ZWxpemVcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gZGJVc2Vyc1xyXG4iLCJpbXBvcnQgeyBncWwgfSBmcm9tICdhcG9sbG8tc2VydmVyLWV4cHJlc3MnXHJcbmltcG9ydCAqIGFzIGRiVXNlcnMgZnJvbSAnLi4vZGF0YWJhc2VzL2RhdGFiYXNlLXVzdWFyaW9zJ1xyXG5cclxuXHJcbmV4cG9ydCBjb25zdCB0eXBlRGVmcyA9IGdxbGBcclxuICAgIGV4dGVuZCB0eXBlIFF1ZXJ5IHtcclxuICAgICAgICBsaXN0YV9mdW5jb2VzOiBbRnVuY2FvXVxyXG4gICAgICAgIGxpc3RhX2Z1bmNhbyhpZF9mdW5jYW86IFN0cmluZyk6IEZ1bmNhbyAgIFxyXG4gICAgfVxyXG4gICAgXHJcbiAgICB0eXBlIEZ1bmNhbyB7XHJcbiAgICAgICAgaWRfZnVuY2FvOiBTdHJpbmdcclxuICAgICAgICBub21lX2Z1bmNhbzogU3RyaW5nXHJcbiAgICAgICAgaWRfcGVybWlzc2FvOiBTdHJpbmdcclxuICAgIH1cclxuXHJcbmBcclxuZXhwb3J0IGNvbnN0IHJlc29sdmVycyA9IHtcclxuICAgIFF1ZXJ5OiB7XHJcbiAgICAgICAgbGlzdGFfZnVuY29lczogYXN5bmMgKGFyZ3MpID0+IGRiVXNlcnMubGlzdGFfZnVuY2FvLmZpbmRBbGwoKSxcclxuICAgICAgICBsaXN0YV9mdW5jYW86IGFzeW5jIChvYmosIGFyZ3MsIGNvbnRleHQsIGluZm8pID0+IGRiVXNlcnMubGlzdGFfZnVuY2FvLmZpbmRCeVBrKGFyZ3MuaWRfZnVuY2FvKVxyXG4gICAgfSxcclxufSIsImltcG9ydCB7IGdxbCB9IGZyb20gJ2Fwb2xsby1zZXJ2ZXItZXhwcmVzcydcclxuaW1wb3J0ICogYXMgZGJQbGFjYXMgZnJvbSAnLi4vZGF0YWJhc2VzL2RhdGFiYXNlLXBsYWNhcydcclxuXHJcblxyXG5leHBvcnQgY29uc3QgdHlwZURlZnMgPSBncWxgXHJcbiAgICBleHRlbmQgdHlwZSBRdWVyeSB7XHJcbiAgICAgICAgcGxhY2FzRW1icmF0ZXg6IFtQbGFjYUVtYnJhdGV4XVxyXG4gICAgICAgIHBsYWNhRW1icmF0ZXgoaWRQbGFjYTogSUQpOiBQbGFjYUVtYnJhdGV4XHJcbiAgICB9XHJcblxyXG4gICAgc2NhbGFyIERhdGVcclxuXHJcbiAgICB0eXBlIFBsYWNhRW1icmF0ZXgge1xyXG4gICAgICAgIGlkUGxhY2E6IElEXHJcbiAgICAgICAgbm9tZVBsYWNhOiBTdHJpbmdcclxuICAgICAgICBxdWFudGlkYWRlOiBJbnRcclxuICAgICAgICBzaXR1YWNhbzogU3RyaW5nXHJcbiAgICAgICAgbG9jYWw6IFN0cmluZ1xyXG4gICAgICAgIHF0ZFBhcmFTaXR1YWNhb0JhaXhhOiBJbnRcclxuICAgICAgICBxdGRQYXJhU2l0dWFjYW9PazogSW50XHJcbiAgICAgICAgZGF0YVVsdGltYUVkaWNhbzogRGF0ZVxyXG4gICAgICAgIHJlZ1VsdGltYUVkaWNhbyA6IFN0cmluZ1xyXG4gICAgICAgIGZvdG9VbHRpbW9Vc2VyIDogU3RyaW5nXHJcbiAgICB9XHJcblxyXG4gICAgdHlwZSBNdXRhdGlvbiB7XHJcbiAgICAgICAgY3JlYXRlUGxhY2FFbWIgKG5vbWVQbGFjYTogU3RyaW5nLCBxdWFudGlkYWRlOiBJbnQsIHNpdHVhY2FvOiBTdHJpbmcsIGxvY2FsOiBTdHJpbmcsIFxyXG4gICAgICAgICAgICBxdGRQYXJhU2l0dWFjYW9CYWl4YTogSW50LCBxdGRQYXJhU2l0dWFjYW9PazogSW50LCBkYXRhVWx0aW1hRWRpY2FvOiBEYXRlLCByZWdVbHRpbWFFZGljYW8gOiBTdHJpbmcsIGZvdG9VbHRpbW9Vc2VyOiBTdHJpbmcpIDogUGxhY2FFbWJyYXRleFxyXG5cclxuICAgICAgICB1cGRhdGVQbGFjYUVtYiAoaWRQbGFjYTogSUQsIG5vbWVQbGFjYTogU3RyaW5nLCBxdWFudGlkYWRlOiBJbnQsIHNpdHVhY2FvOiBTdHJpbmcsIGxvY2FsOiBTdHJpbmcsIFxyXG4gICAgICAgICAgICBxdGRQYXJhU2l0dWFjYW9CYWl4YTogSW50LCBxdGRQYXJhU2l0dWFjYW9PazogSW50LCBkYXRhVWx0aW1hRWRpY2FvOiBEYXRlLCByZWdVbHRpbWFFZGljYW8gOiBTdHJpbmcsIGZvdG9VbHRpbW9Vc2VyOiBTdHJpbmcpIDogUGxhY2FFbWJyYXRleFxyXG5cclxuICAgICAgICBkZWxldGVQbGFjYUVtYiAoaWRQbGFjYTogSUQpIDogSURcclxuICAgIH1cclxuYFxyXG5leHBvcnQgY29uc3QgcmVzb2x2ZXJzID0ge1xyXG4gICAgUXVlcnk6IHtcclxuICAgICAgICBwbGFjYXNFbWJyYXRleDogYXN5bmMgKGFyZ3MpID0+IGRiUGxhY2FzLnBsYWNhc19lbWJyYXRleC5maW5kQWxsKCksXHJcbiAgICAgICAgcGxhY2FFbWJyYXRleDogYXN5bmMgKG9iaiwgYXJncywgY29udGV4dCwgaW5mbykgPT4gZGJQbGFjYXMucGxhY2FzX2VtYnJhdGV4LmZpbmRCeVBrKGFyZ3MuaWRQbGFjYSlcclxuICAgIH0sXHJcbiAgICBNdXRhdGlvbiA6IHtcclxuICAgICAgICBjcmVhdGVQbGFjYUVtYjogYXN5bmMgKHBhcmVudCwge25vbWVQbGFjYSwgcXVhbnRpZGFkZSwgc2l0dWFjYW8sIGxvY2FsLCBxdGRQYXJhU2l0dWFjYW9CYWl4YSwgcXRkUGFyYVNpdHVhY2FvT2ssIHJlZ1VsdGltYUVkaWNhbywgZm90b1VsdGltb1VzZXJ9LCBpbmZvKSA9PlxyXG4gICAgICAgICAgICBkYlBsYWNhcy5wbGFjYXNfZW1icmF0ZXguY3JlYXRlICh7XHJcbiAgICAgICAgICAgICAgICBub21lUGxhY2E6IG5vbWVQbGFjYSxcclxuICAgICAgICAgICAgICAgIHF1YW50aWRhZGU6IHF1YW50aWRhZGUsXHJcbiAgICAgICAgICAgICAgICBzaXR1YWNhbzogc2l0dWFjYW8sXHJcbiAgICAgICAgICAgICAgICBsb2NhbDogbG9jYWwsXHJcbiAgICAgICAgICAgICAgICBxdGRQYXJhU2l0dWFjYW9CYWl4YSA6IHF0ZFBhcmFTaXR1YWNhb0JhaXhhLFxyXG4gICAgICAgICAgICAgICAgcXRkUGFyYVNpdHVhY2FvT2sgOiBxdGRQYXJhU2l0dWFjYW9PayxcclxuICAgICAgICAgICAgICAgIHJlZ1VsdGltYUVkaWNhbzogcmVnVWx0aW1hRWRpY2FvLFxyXG4gICAgICAgICAgICAgICAgZm90b1VsdGltb1VzZXIgOiBmb3RvVWx0aW1vVXNlclxyXG4gICAgICAgICAgICB9KSxcclxuICAgICAgICB1cGRhdGVQbGFjYUVtYjogYXN5bmMgKHBhcmVudCwge2lkUGxhY2EsIG5vbWVQbGFjYSwgcXVhbnRpZGFkZSwgc2l0dWFjYW8sIGxvY2FsLCBxdGRQYXJhU2l0dWFjYW9CYWl4YSwgcXRkUGFyYVNpdHVhY2FvT2ssIHJlZ1VsdGltYUVkaWNhbywgZm90b1VsdGltb1VzZXJ9LCBpbmZvKSA9PlxyXG4gICAgICAgICAgICBkYlBsYWNhcy5wbGFjYXNfZW1icmF0ZXgudXBkYXRlKHtcclxuICAgICAgICAgICAgICAgIG5vbWVQbGFjYTogbm9tZVBsYWNhLFxyXG4gICAgICAgICAgICAgICAgcXVhbnRpZGFkZTogcXVhbnRpZGFkZSxcclxuICAgICAgICAgICAgICAgIHNpdHVhY2FvOiBzaXR1YWNhbyxcclxuICAgICAgICAgICAgICAgIGxvY2FsOiBsb2NhbCxcclxuICAgICAgICAgICAgICAgIHF0ZFBhcmFTaXR1YWNhb0JhaXhhIDogcXRkUGFyYVNpdHVhY2FvQmFpeGEsXHJcbiAgICAgICAgICAgICAgICBxdGRQYXJhU2l0dWFjYW9PayA6IHF0ZFBhcmFTaXR1YWNhb09rLFxyXG4gICAgICAgICAgICAgICAgcmVnVWx0aW1hRWRpY2FvOiByZWdVbHRpbWFFZGljYW8sXHJcbiAgICAgICAgICAgICAgICBmb3RvVWx0aW1vVXNlciA6IGZvdG9VbHRpbW9Vc2VyXHJcbiAgICAgICAgICAgIH0sIHtcclxuICAgICAgICAgICAgICAgIHdoZXJlIDoge1xyXG4gICAgICAgICAgICAgICAgICAgIGlkUGxhY2E6IGlkUGxhY2FcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSksXHJcbiAgICAgICAgZGVsZXRlUGxhY2FFbWI6IGFzeW5jIChwYXJlbnQsIHtpZFBsYWNhfSwgaW5mbykgPT5cclxuICAgICAgICB7XHJcbiAgICAgICAgZGJQbGFjYXMucGxhY2FzX2VtYnJhdGV4LmRlc3Ryb3kgKHtcclxuICAgICAgICAgICAgd2hlcmUgOiB7XHJcbiAgICAgICAgICAgICAgICBpZFBsYWNhIDogaWRQbGFjYVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59IiwiaW1wb3J0IHsgZ3FsIH0gZnJvbSAnYXBvbGxvLXNlcnZlci1leHByZXNzJ1xyXG5pbXBvcnQgKiBhcyBkYlBsYWNhcyBmcm9tICcuLi9kYXRhYmFzZXMvZGF0YWJhc2UtcGxhY2FzJ1xyXG5cclxuXHJcbmV4cG9ydCBjb25zdCB0eXBlRGVmcyA9IGdxbGBcclxuICAgIGV4dGVuZCB0eXBlIFF1ZXJ5IHtcclxuICAgICAgICBwbGFjYXNXZW50ZXg6IFtQbGFjYVdlbnRleF1cclxuICAgICAgICBwbGFjYVdlbnRleChpZFBsYWNhOiBJRCk6IFBsYWNhV2VudGV4XHJcbiAgICB9XHJcbiAgICBcclxuICAgIHR5cGUgUGxhY2FXZW50ZXgge1xyXG4gICAgICAgIGlkUGxhY2E6IElEXHJcbiAgICAgICAgbm9tZVBsYWNhOiBTdHJpbmdcclxuICAgICAgICBxdWFudGlkYWRlOiBJbnRcclxuICAgICAgICBzaXR1YWNhbzogU3RyaW5nXHJcbiAgICAgICAgbG9jYWw6IFN0cmluZ1xyXG4gICAgICAgIHF0ZFBhcmFTaXR1YWNhb0JhaXhhOiBJbnRcclxuICAgICAgICBxdGRQYXJhU2l0dWFjYW9PazogSW50XHJcbiAgICAgICAgZGF0YVVsdGltYUVkaWNhbzogRGF0ZVxyXG4gICAgICAgIHJlZ1VsdGltYUVkaWNhbyA6IFN0cmluZ1xyXG4gICAgICAgIGZvdG9VbHRpbW9Vc2VyIDogU3RyaW5nXHJcbiAgICB9XHJcblxyXG4gICAgZXh0ZW5kIHR5cGUgTXV0YXRpb24ge1xyXG4gICAgICAgIGNyZWF0ZVBsYWNhV2VudGV4ICAoaWRQbGFjYTogSUQsIG5vbWVQbGFjYTogU3RyaW5nLCBxdWFudGlkYWRlOiBJbnQsIHNpdHVhY2FvOiBTdHJpbmcsIGxvY2FsOiBTdHJpbmcsIFxyXG4gICAgICAgICAgICBxdGRQYXJhU2l0dWFjYW9CYWl4YTogSW50LCBxdGRQYXJhU2l0dWFjYW9PazogSW50LCBkYXRhVWx0aW1hRWRpY2FvOiBEYXRlLCByZWdVbHRpbWFFZGljYW8gOiBTdHJpbmcsIGZvdG9VbHRpbW9Vc2VyOiBTdHJpbmcpIDogUGxhY2FXZW50ZXhcclxuXHJcbiAgICAgICAgdXBkYXRlUGxhY2FXZW50ZXggIChpZFBsYWNhOiBJRCwgbm9tZVBsYWNhOiBTdHJpbmcsIHF1YW50aWRhZGU6IEludCwgc2l0dWFjYW86IFN0cmluZywgbG9jYWw6IFN0cmluZywgXHJcbiAgICAgICBxdGRQYXJhU2l0dWFjYW9CYWl4YTogSW50LCBxdGRQYXJhU2l0dWFjYW9PazogSW50LCBkYXRhVWx0aW1hRWRpY2FvOiBEYXRlLCByZWdVbHRpbWFFZGljYW8gOiBTdHJpbmcsIGZvdG9VbHRpbW9Vc2VyOiBTdHJpbmcgKSA6IFBsYWNhV2VudGV4XHJcblxyXG4gICAgICAgIGRlbGV0ZVBsYWNhV2VudGV4IChpZFBsYWNhOiBJRCkgOiBJRFxyXG4gICAgfVxyXG5gXHJcbmV4cG9ydCBjb25zdCByZXNvbHZlcnMgPSB7XHJcbiAgICBRdWVyeToge1xyXG4gICAgICAgIHBsYWNhc1dlbnRleDogYXN5bmMgKGFyZ3MpID0+IGRiUGxhY2FzLnBsYWNhc193ZW50ZXguZmluZEFsbCgpLFxyXG4gICAgICAgIHBsYWNhV2VudGV4OiBhc3luYyAob2JqLCBhcmdzLCBjb250ZXh0LCBpbmZvKSA9PiBkYlBsYWNhcy5wbGFjYXNfd2VudGV4LmZpbmRCeVBrKGFyZ3MuaWQpXHJcbiAgICB9LFxyXG4gICAgTXV0YXRpb24gOiB7XHJcbiAgICAgICAgY3JlYXRlUGxhY2FXZW50ZXg6IGFzeW5jIChwYXJlbnQsIHtub21lUGxhY2EsIHF1YW50aWRhZGUsIHNpdHVhY2FvLCBsb2NhbCwgcXRkUGFyYVNpdHVhY2FvQmFpeGEsIHF0ZFBhcmFTaXR1YWNhb09rLCByZWdVbHRpbWFFZGljYW8sIGZvdG9VbHRpbW9Vc2VyfSwgaW5mbykgPT5cclxuICAgICAgICAgICAgZGJQbGFjYXMucGxhY2FzX3dlbnRleC5jcmVhdGUgKHtcclxuICAgICAgICAgICAgICAgIG5vbWVQbGFjYTogbm9tZVBsYWNhLFxyXG4gICAgICAgICAgICAgICAgcXVhbnRpZGFkZTogcXVhbnRpZGFkZSxcclxuICAgICAgICAgICAgICAgIHNpdHVhY2FvOiBzaXR1YWNhbyxcclxuICAgICAgICAgICAgICAgIGxvY2FsOiBsb2NhbCxcclxuICAgICAgICAgICAgICAgIHF0ZFBhcmFTaXR1YWNhb0JhaXhhIDogcXRkUGFyYVNpdHVhY2FvQmFpeGEsXHJcbiAgICAgICAgICAgICAgICBxdGRQYXJhU2l0dWFjYW9PayA6IHF0ZFBhcmFTaXR1YWNhb09rLFxyXG4gICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIHJlZ1VsdGltYUVkaWNhbzogcmVnVWx0aW1hRWRpY2FvLFxyXG4gICAgICAgICAgICAgICAgZm90b1VsdGltb1VzZXIgOiBmb3RvVWx0aW1vVXNlclxyXG4gICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIH0pLFxyXG4gICAgICAgIHVwZGF0ZVBsYWNhV2VudGV4OiBhc3luYyAocGFyZW50LCB7aWRQbGFjYSwgbm9tZVBsYWNhLCBxdWFudGlkYWRlLCBzaXR1YWNhbywgbG9jYWwsIHF0ZFBhcmFTaXR1YWNhb0JhaXhhLCBxdGRQYXJhU2l0dWFjYW9PaywgcmVnVWx0aW1hRWRpY2FvLCBmb3RvVWx0aW1vVXNlcn0sIGluZm8pID0+XHJcbiAgICAgICAgICAgIGRiUGxhY2FzLnBsYWNhc193ZW50ZXgudXBkYXRlKHtcclxuICAgICAgICAgICAgICAgIG5vbWVQbGFjYTogbm9tZVBsYWNhLFxyXG4gICAgICAgICAgICAgICAgcXVhbnRpZGFkZTogcXVhbnRpZGFkZSxcclxuICAgICAgICAgICAgICAgIHNpdHVhY2FvOiBzaXR1YWNhbyxcclxuICAgICAgICAgICAgICAgIGxvY2FsOiBsb2NhbCxcclxuICAgICAgICAgICAgICAgIHF0ZFBhcmFTaXR1YWNhb0JhaXhhIDogcXRkUGFyYVNpdHVhY2FvQmFpeGEsXHJcbiAgICAgICAgICAgICAgICBxdGRQYXJhU2l0dWFjYW9PayA6IHF0ZFBhcmFTaXR1YWNhb09rLFxyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIHJlZ1VsdGltYUVkaWNhbzogcmVnVWx0aW1hRWRpY2FvLFxyXG4gICAgICAgICAgICAgICAgZm90b1VsdGltb1VzZXIgOiBmb3RvVWx0aW1vVXNlclxyXG4gICAgICAgICAgICB9LCB7XHJcbiAgICAgICAgICAgICAgICB3aGVyZSA6IHtcclxuICAgICAgICAgICAgICAgICAgICBpZFBsYWNhOiBpZFBsYWNhXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pLFxyXG4gICAgICAgIGRlbGV0ZVBsYWNhV2VudGV4OiBhc3luYyAocGFyZW50LCB7aWRQbGFjYX0sIGluZm8pID0+XHJcbiAgICAgICAge1xyXG4gICAgICAgIGRiUGxhY2FzLnBsYWNhc193ZW50ZXguZGVzdHJveSAoe1xyXG4gICAgICAgICAgICB3aGVyZSA6IHtcclxuICAgICAgICAgICAgICAgIGlkUGxhY2EgOiBpZFBsYWNhXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuIiwiaW1wb3J0IHsgZ3FsIH0gZnJvbSAnYXBvbGxvLXNlcnZlci1leHByZXNzJ1xyXG5pbXBvcnQgKiBhcyBkYlVzZXJzIGZyb20gJy4uL2RhdGFiYXNlcy9kYXRhYmFzZS11c3VhcmlvcydcclxuXHJcblxyXG5leHBvcnQgY29uc3QgdHlwZURlZnMgPSBncWxgXHJcbiAgICBleHRlbmQgdHlwZSBRdWVyeSB7XHJcbiAgICAgICAgYXR1YWxpemFfY29sYWJvcmFkb3JlczogW1VzZXJdXHJcbiAgICAgICAgYXR1YWxpemFfY29sYWJvcmFkb3IocmVnaXN0cm86IFN0cmluZyk6IFVzZXIgICBcclxuICAgIH1cclxuICAgIFxyXG4gICAgdHlwZSBVc2VyIHtcclxuICAgICAgICByZWdpc3RybzogU3RyaW5nXHJcbiAgICAgICAgbm9tZTogU3RyaW5nXHJcbiAgICAgICAgbGlzdGFfZnVuY2FvOiBTdHJpbmdcclxuICAgICAgICBmb3RvOiBTdHJpbmdcclxuICAgIH1cclxuXHJcbmBcclxuZXhwb3J0IGNvbnN0IHJlc29sdmVycyA9IHtcclxuICAgIFF1ZXJ5OiB7XHJcbiAgICAgICAgYXR1YWxpemFfY29sYWJvcmFkb3JlczogYXN5bmMgKGFyZ3MpID0+IGRiVXNlcnMuYXR1YWxpemFfY29sYWJvcmFkb3IuZmluZEFsbCgpLFxyXG4gICAgICAgIGF0dWFsaXphX2NvbGFib3JhZG9yOiBhc3luYyAob2JqLCBhcmdzLCBjb250ZXh0LCBpbmZvKSA9PiBkYlVzZXJzLmF0dWFsaXphX2NvbGFib3JhZG9yLmZpbmRCeVBrKGFyZ3MucmVnaXN0cm8pXHJcbiAgICB9LFxyXG59XHJcblxyXG4vL1xyXG4vLyB1c2VyKHJlZzogU3RyaW5nISk6IFVzZXJcclxuXHJcbiIsImltcG9ydCB7IGdxbCB9IGZyb20gJ2Fwb2xsby1zZXJ2ZXItZXhwcmVzcydcclxuaW1wb3J0ICogYXMgZGJVc2VycyBmcm9tICcuLi9kYXRhYmFzZXMvZGF0YWJhc2UtcGxhY2FzJ1xyXG5cclxuXHJcbmV4cG9ydCBjb25zdCB0eXBlRGVmcyA9IGdxbGBcclxuICAgIGV4dGVuZCB0eXBlIFF1ZXJ5IHtcclxuICAgICAgICB1c2Vyc192ZXJpZmljYWRvczogW1VzZXJfdmVyaWZpZWRdXHJcbiAgICAgICAgdXNlcnNfdmVyaWZpY2FkbyhyZWdpc3RybzogU3RyaW5nKTogVXNlcl92ZXJpZmllZCAgXHJcbiAgICB9XHJcbiAgICBcclxuICAgIHR5cGUgVXNlcl92ZXJpZmllZCB7XHJcbiAgICAgICAgcmVnaXN0cm86IFN0cmluZ1xyXG4gICAgICAgIHNlbmhhOiBTdHJpbmdcclxuICAgICAgICBub21lOiBTdHJpbmdcclxuICAgICAgICBpc192ZXJpZmllZDogU3RyaW5nXHJcbiAgICAgICAgaXNfc3VwZXI6IFN0cmluZ1xyXG4gICAgfVxyXG5cclxuYFxyXG5leHBvcnQgY29uc3QgcmVzb2x2ZXJzID0ge1xyXG4gICAgUXVlcnk6IHtcclxuICAgICAgICB1c2Vyc192ZXJpZmljYWRvczogYXN5bmMgKGFyZ3MpID0+IGRiVXNlcnMudXNlcnNfc3lzdGVtLmZpbmRBbGwoKSxcclxuICAgICAgICB1c2Vyc192ZXJpZmljYWRvOiBhc3luYyAob2JqLCBhcmdzLCBjb250ZXh0LCBpbmZvKSA9PiBkYlVzZXJzLnVzZXJzX3N5c3RlbS5maW5kQnlQayhhcmdzLnJlZ2lzdHJvKVxyXG4gICAgfSxcclxufVxyXG5cclxuXHJcblxyXG4vKlxyXG5JTlNFUlQgSU5UTyB1c2Vyc192ZXJpZmljYWRvcyAocmVnaXN0cm8sIHNlbmhhLCBub21lKSBWQUxVRVMgKFwiMDAxMTUwNzAyOTdcIiwgXCJlbTE0MDFcIiwgXCJlbWVyc29uXCIpO1xyXG5JTlNFUlQgSU5UTyB1c2Vyc192ZXJpZmljYWRvcyAocmVnaXN0cm8sIHNlbmhhLCBub21lKSBWQUxVRVMgKFwiMDAxMTUwMTY2NDBcIiwgXCJqZTE0MDFcIiwgXCJqZXNpbWllbFwiKTtcclxuSU5TRVJUIElOVE8gdXNlcnNfdmVyaWZpY2Fkb3MgKHJlZ2lzdHJvLCBzZW5oYSwgbm9tZSkgVkFMVUVTIChcIjAwMTE1MDAxMjAxXCIsIFwiY2wxNDAxXCIsIFwiY2xhdWRpb1wiKTtcclxuSU5TRVJUIElOVE8gdXNlcnNfdmVyaWZpY2Fkb3MgKHJlZ2lzdHJvLCBzZW5oYSwgbm9tZSkgVkFMVUVTIChcIjAwMTE1MDQ1MTc5XCIsIFwiYW4xNDAxXCIsIFwiYW5kcmVcIik7XHJcbklOU0VSVCBJTlRPIHVzZXJzX3ZlcmlmaWNhZG9zIChyZWdpc3Rybywgc2VuaGEsIG5vbWUpIFZBTFVFUyAoXCIwMDExNTA2MjE3MFwiLCBcImVsMTQwMVwiLCBcImVsaXNhbmdlbGFcIik7XHJcblxyXG5cclxuKi9cclxuIiwiXHJcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oc2VxdWVsaXplLCBEYXRhVHlwZXMpIHtcclxuXHRyZXR1cm4gc2VxdWVsaXplLmRlZmluZSgnbGlzdGFfZnVuY2FvJywge1xyXG5cdFx0aWRfZnVuY2FvOiB7XHJcblx0XHRcdHR5cGU6IERhdGFUeXBlcy5TVFJJTkcoMTYpLFxyXG5cdFx0XHRhbGxvd051bGw6IGZhbHNlLFxyXG5cdFx0XHRwcmltYXJ5S2V5OiB0cnVlLFxyXG5cdFx0XHRhdXRvSW5jcmVtZW50OiB0cnVlXHJcblx0XHR9LFxyXG5cdFx0bm9tZV9mdW5jYW86IHtcclxuXHRcdFx0dHlwZTogRGF0YVR5cGVzLlNUUklORygyNTYpLFxyXG5cdFx0XHRhbGxvd051bGw6IGZhbHNlXHJcblx0XHR9LFxyXG5cdFx0aWRfcGVybWlzc2FvOiB7XHJcblx0XHRcdHR5cGU6IERhdGFUeXBlcy5TVFJJTkcoMjU2KSxcclxuXHRcdFx0YWxsb3dOdWxsOiBmYWxzZVxyXG5cdFx0fSxcclxuXHR9LCB7XHJcblx0XHR0YWJsZU5hbWU6ICdsaXN0YV9mdW5jYW8nLFxyXG5cdFx0dGltZXN0YW1wczogZmFsc2VcclxuXHR9KTtcclxufTsiLCJcclxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihzZXF1ZWxpemUsIERhdGFUeXBlcykge1xyXG5cdHJldHVybiBzZXF1ZWxpemUuZGVmaW5lKCdwbGFjYXNfZW1icmF0ZXgnLCB7XHJcblx0XHRpZFBsYWNhOiB7XHJcblx0XHRcdHR5cGU6IERhdGFUeXBlcy5NRURJVU1JTlQoOCksXHJcblx0XHRcdGFsbG93TnVsbDogZmFsc2UsXHJcblx0XHRcdHByaW1hcnlLZXk6IHRydWUsXHJcblx0XHRcdGF1dG9JbmNyZW1lbnQ6IHRydWVcclxuXHRcdH0sXHJcblx0XHRub21lUGxhY2E6IHtcclxuXHRcdFx0dHlwZTogRGF0YVR5cGVzLlNUUklORygyNTYpLFxyXG5cdFx0XHRhbGxvd051bGw6IGZhbHNlXHJcblx0XHR9LFxyXG5cdFx0cXVhbnRpZGFkZToge1xyXG5cdFx0XHR0eXBlOiBEYXRhVHlwZXMuSU5URUdFUixcclxuXHRcdFx0YWxsb3dOdWxsOiBmYWxzZVxyXG5cdFx0fSxcclxuXHRcdHNpdHVhY2FvOiB7XHJcblx0XHRcdHR5cGU6IERhdGFUeXBlcy5TVFJJTkcoMjU2KSxcclxuXHRcdFx0YWxsb3dOdWxsOiBmYWxzZVxyXG5cdFx0fSxcclxuXHJcblx0XHRxdGRQYXJhU2l0dWFjYW9CYWl4YToge1xyXG5cdFx0XHR0eXBlOiBEYXRhVHlwZXMuSU5URUdFUixcclxuXHRcdFx0YWxsb3dOdWxsOiBmYWxzZVxyXG5cdFx0fSxcclxuXHJcblx0XHRxdGRQYXJhU2l0dWFjYW9Pazoge1xyXG5cdFx0XHR0eXBlOiBEYXRhVHlwZXMuSU5URUdFUixcclxuXHRcdFx0YWxsb3dOdWxsOiBmYWxzZVxyXG5cdFx0fSxcclxuXHJcblx0XHRkYXRhVWx0aW1hRWRpY2FvOiB7XHJcblx0XHRcdHR5cGU6ICdUSU1FU1RBTVAnLFxyXG5cdFx0XHRkZWZhdWx0VmFsdWU6IERhdGFUeXBlcy5saXRlcmFsKCdDVVJSRU5UX1RJTUVTVEFNUCcpLFxyXG5cdFx0XHRhbGxvd051bGw6IGZhbHNlXHJcblx0XHR9LFxyXG5cclxuXHRcdGxvY2FsOiB7XHJcblx0XHRcdHR5cGU6IERhdGFUeXBlcy5TVFJJTkcoMjU2KSxcclxuXHRcdFx0YWxsb3dOdWxsOiBmYWxzZVxyXG5cdFx0fSxcclxuXHRcdFxyXG5cdFx0cmVnVWx0aW1hRWRpY2FvOntcclxuXHRcdFx0dHlwZTogRGF0YVR5cGVzLlNUUklORygyNTYpLFxyXG5cdFx0XHRhbGxvd051bGw6IGZhbHNlXHJcblx0XHR9LFxyXG5cclxuXHRcdGZvdG9VbHRpbW9Vc2VyOiB7XHJcblx0XHRcdHR5cGU6IERhdGFUeXBlcy5CTE9CLFxyXG5cdFx0XHRhbGxvd051bGw6IGZhbHNlLFxyXG5cdFx0XHRnZXQoKSB7XHJcblx0XHRcdFx0cmV0dXJuIHRoaXMuZ2V0RGF0YVZhbHVlKCdmb3RvVWx0aW1vVXNlcicpLnRvU3RyaW5nKCd1dGY4Jyk7XHJcblx0XHRcdCAgfSxcclxuXHRcdH1cclxuXHR9LCB7XHJcblx0XHR0YWJsZU5hbWU6ICdwbGFjYXNfZW1icmF0ZXgnLFxyXG5cdFx0dGltZXN0YW1wczogZmFsc2VcclxuXHR9KTtcclxufTtcclxuIiwiXHJcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oc2VxdWVsaXplLCBEYXRhVHlwZXMpIHtcclxuXHRyZXR1cm4gc2VxdWVsaXplLmRlZmluZSgncGxhY2FzX3dlbnRleCcsIHtcclxuXHRcdGlkUGxhY2E6IHtcclxuXHRcdFx0dHlwZTogRGF0YVR5cGVzLk1FRElVTUlOVCg4KSxcclxuXHRcdFx0YWxsb3dOdWxsOiBmYWxzZSxcclxuXHRcdFx0cHJpbWFyeUtleTogdHJ1ZSxcclxuXHRcdFx0YXV0b0luY3JlbWVudDogdHJ1ZVxyXG5cdFx0fSxcclxuXHRcdG5vbWVQbGFjYToge1xyXG5cdFx0XHR0eXBlOiBEYXRhVHlwZXMuU1RSSU5HKDI1NiksXHJcblx0XHRcdGFsbG93TnVsbDogZmFsc2VcclxuXHRcdH0sXHJcblx0XHRxdWFudGlkYWRlOiB7XHJcblx0XHRcdHR5cGU6IERhdGFUeXBlcy5JTlRFR0VSLFxyXG5cdFx0XHRhbGxvd051bGw6IGZhbHNlXHJcblx0XHR9LFxyXG5cdFx0c2l0dWFjYW86IHtcclxuXHRcdFx0dHlwZTogRGF0YVR5cGVzLlNUUklORygyNTYpLFxyXG5cdFx0XHRhbGxvd051bGw6IGZhbHNlXHJcblx0XHR9LFxyXG5cclxuXHRcdHF0ZFBhcmFTaXR1YWNhb0JhaXhhOiB7XHJcblx0XHRcdHR5cGU6IERhdGFUeXBlcy5JTlRFR0VSLFxyXG5cdFx0XHRhbGxvd051bGw6IGZhbHNlXHJcblx0XHR9LFxyXG5cclxuXHRcdHF0ZFBhcmFTaXR1YWNhb09rOiB7XHJcblx0XHRcdHR5cGU6IERhdGFUeXBlcy5JTlRFR0VSLFxyXG5cdFx0XHRhbGxvd051bGw6IGZhbHNlXHJcblx0XHR9LFxyXG5cclxuXHRcdGRhdGFVbHRpbWFFZGljYW86IHtcclxuXHRcdFx0dHlwZTogJ1RJTUVTVEFNUCcsXHJcblx0XHRcdGRlZmF1bHRWYWx1ZTogRGF0YVR5cGVzLmxpdGVyYWwoJ0NVUlJFTlRfVElNRVNUQU1QJyksXHJcblx0XHRcdGFsbG93TnVsbDogZmFsc2VcclxuXHRcdH0sXHJcblxyXG5cdFx0bG9jYWw6IHtcclxuXHRcdFx0dHlwZTogRGF0YVR5cGVzLlNUUklORygyNTYpLFxyXG5cdFx0XHRhbGxvd051bGw6IGZhbHNlXHJcblx0XHR9LFxyXG5cdFx0XHJcblx0XHRyZWdVbHRpbWFFZGljYW86e1xyXG5cdFx0XHR0eXBlOiBEYXRhVHlwZXMuU1RSSU5HKDI1NiksXHJcblx0XHRcdGFsbG93TnVsbDogZmFsc2VcclxuXHRcdH0sXHJcblxyXG5cdFx0Zm90b1VsdGltb1VzZXI6IHtcclxuXHRcdFx0dHlwZTogRGF0YVR5cGVzLkJMT0IsXHJcblx0XHRcdGFsbG93TnVsbDogZmFsc2UsXHJcblx0XHRcdGdldCgpIHtcclxuXHRcdFx0XHRyZXR1cm4gdGhpcy5nZXREYXRhVmFsdWUoJ2ZvdG9VbHRpbW9Vc2VyJykudG9TdHJpbmcoJ3V0ZjgnKTtcclxuXHRcdFx0ICB9LFxyXG5cdFx0fVxyXG5cdH0sIHtcclxuXHRcdHRhYmxlTmFtZTogJ3BsYWNhc193ZW50ZXgnLFxyXG5cdFx0dGltZXN0YW1wczogZmFsc2VcclxuXHR9KTtcclxufTtcclxuIiwiLyoganNoaW50IGluZGVudDogMSAqL1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihzZXF1ZWxpemUsIERhdGFUeXBlcykge1xyXG5cdHJldHVybiBzZXF1ZWxpemUuZGVmaW5lKCdhdHVhbGl6YV9jb2xhYm9yYWRvcicsIHtcclxuXHRcdHJlZ2lzdHJvOiB7XHJcblx0XHRcdHR5cGU6IERhdGFUeXBlcy5TVFJJTkcoMTYpLFxyXG5cdFx0XHRhbGxvd051bGw6IGZhbHNlLFxyXG5cdFx0XHRwcmltYXJ5S2V5OiB0cnVlLFxyXG5cdFx0XHRhdXRvSW5jcmVtZW50OiB0cnVlXHJcblx0XHR9LFxyXG5cdFx0bm9tZToge1xyXG5cdFx0XHR0eXBlOiBEYXRhVHlwZXMuU1RSSU5HKDI1NiksXHJcblx0XHRcdGFsbG93TnVsbDogZmFsc2VcclxuXHRcdH0sXHJcblx0XHRsaXN0YV9mdW5jYW86IHtcclxuXHRcdFx0dHlwZTogRGF0YVR5cGVzLlNUUklORygyNTYpLFxyXG5cdFx0XHRhbGxvd051bGw6IGZhbHNlXHJcblx0XHR9LFxyXG5cdFx0Zm90bzoge1xyXG5cdFx0XHR0eXBlOiBEYXRhVHlwZXMuQkxPQixcclxuXHRcdFx0YWxsb3dOdWxsOiBmYWxzZSxcclxuXHRcdFx0Z2V0KCkge1xyXG5cdFx0XHRcdHJldHVybiB0aGlzLmdldERhdGFWYWx1ZSgnZm90bycpLnRvU3RyaW5nKCdiYXNlNjQnKTtcclxuXHRcdFx0ICB9LFxyXG5cdFx0fVxyXG5cdH0sIHtcclxuXHRcdHRhYmxlTmFtZTogJ2F0dWFsaXphX2NvbGFib3JhZG9yJyxcclxuXHRcdHRpbWVzdGFtcHM6IGZhbHNlXHJcblx0fSk7XHJcbn07IiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihzZXF1ZWxpemUsIERhdGFUeXBlcykge1xyXG5cdHJldHVybiBzZXF1ZWxpemUuZGVmaW5lKCd1c2Vyc19zeXN0ZW0nLCB7XHJcblx0XHRyZWdpc3Rybzoge1xyXG5cdFx0XHR0eXBlOiBEYXRhVHlwZXMuU1RSSU5HKDIwKSxcclxuXHRcdFx0YWxsb3dOdWxsOiBmYWxzZSxcclxuXHRcdFx0cHJpbWFyeUtleTogdHJ1ZSxcclxuXHRcdH0sXHJcblx0XHRzZW5oYToge1xyXG5cdFx0XHR0eXBlOiBEYXRhVHlwZXMuU1RSSU5HKDUwKSxcclxuXHRcdFx0YWxsb3dOdWxsOiBmYWxzZVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgbm9tZToge1xyXG4gICAgICAgICAgICB0eXBlOiBEYXRhVHlwZXMuU1RSSU5HKDEwMCksXHJcbiAgICAgICAgICAgIGFsbG93TnVsbDogZmFsc2VcclxuXHRcdH0sXHJcblx0XHRpc192ZXJpZmllZDoge1xyXG5cdFx0XHR0eXBlOiBEYXRhVHlwZXMuU1RSSU5HKDUpLFxyXG5cdFx0XHRhbGxvd051bGw6ZmFsc2VcclxuXHRcdH0sXHJcblx0XHRpc19zdXBlcjoge1xyXG5cdFx0XHR0eXBlOiBEYXRhVHlwZXMuU1RSSU5HKDEwKSxcclxuXHRcdFx0YWxsb3dOdWxsOmZhbHNlXHJcblx0XHR9XHJcblx0fSwge1xyXG5cdFx0dGFibGVOYW1lOiAndXNlcnNfc3lzdGVtJyxcclxuXHRcdHRpbWVzdGFtcHM6IGZhbHNlXHJcblx0fSk7XHJcbn07IiwiaW1wb3J0ICdAYmFiZWwvcG9seWZpbGwnXHJcbmltcG9ydCBleHByZXNzIGZyb20gJ2V4cHJlc3MnXHJcbmNvbnN0IGJvZHlQYXJzZXIgPSByZXF1aXJlKCdib2R5LXBhcnNlcicpXHJcbmNvbnN0IHsgQXBvbGxvU2VydmVyIH0gPSByZXF1aXJlKCdhcG9sbG8tc2VydmVyLWV4cHJlc3MnKVxyXG5jb25zdCBjb3JzID0gcmVxdWlyZSgnY29ycycpXHJcbmNvbnN0IGFwcCA9IGV4cHJlc3MoKVxyXG5cclxuXHJcbmFwcC51c2UoYm9keVBhcnNlci5qc29uKHsgbGltaXQ6ICc1bWInIH0pKVxyXG5hcHAudXNlKGJvZHlQYXJzZXIudXJsZW5jb2RlZCh7IGV4dGVuZGVkOiB0cnVlIH0pKVxyXG5hcHAudXNlKGNvcnMoKSlcclxuXHJcbmNvbnN0IHNlcnZlciA9IG5ldyBBcG9sbG9TZXJ2ZXIoe1xyXG4gICAgbW9kdWxlczogW1xyXG4gICAgICAgIHJlcXVpcmUoJy4vZ3JhcGgtcWwvdXNlcnMnKSxcclxuICAgICAgICByZXF1aXJlKCcuL2dyYXBoLXFsL2Z1bmNhby11c2VyJyksXHJcbiAgICAgICAgcmVxdWlyZSgnLi9ncmFwaC1xbC9wbGFjYXMtZW1icmF0ZXgnKSxcclxuICAgICAgICByZXF1aXJlKCcuL2dyYXBoLXFsL3BsYWNhcy13ZW50ZXgnKSxcclxuICAgICAgICByZXF1aXJlKCcuL2dyYXBoLXFsL3ZlcmlmaWVkLXVzZXJzJylcclxuICAgICAgLy8gIHJlcXVpcmUoJy4vZ3JhcGgtcWwvZGFkb3MnKVxyXG5cclxuICAgIF0sXHJcbn0pXHJcblxyXG5zZXJ2ZXIuYXBwbHlNaWRkbGV3YXJlKHsgYXBwIH0pXHJcblxyXG5cclxuYXBwLmxpc3Rlbih7IHBvcnQ6IDUwMDAgfSwgKCkgPT5cclxuICAgIGNvbnNvbGUubG9nKGDwn5qAIFNlcnZlciByZWFkeSBhdCBodHRwOi8vbG9jYWxob3N0OjUwMDBgKSxcclxuKVxyXG5cclxuXHJcblxyXG5cclxuIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiQGJhYmVsL3BvbHlmaWxsXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImFwb2xsby1zZXJ2ZXItZXhwcmVzc1wiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJib2R5LXBhcnNlclwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJjb3JzXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImV4cHJlc3NcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwic2VxdWVsaXplXCIpOyJdLCJzb3VyY2VSb290IjoiIn0=