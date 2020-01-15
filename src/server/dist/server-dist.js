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
  var data = _taggedTemplateLiteral(["\n    extend type Query {\n        users_verificados: [User_verified]\n        users_verificado(registro: String): User_verified  \n    }\n    \n    type User_verified {\n        registro: String\n        senha: String\n        nome: String\n        is_verified: String\n    }\n\n"]);

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vZGF0YWJhc2VzL2RhdGFiYXNlLXBsYWNhcy5qcyIsIndlYnBhY2s6Ly8vLi9kYXRhYmFzZXMvZGF0YWJhc2UtdXN1YXJpb3MuanMiLCJ3ZWJwYWNrOi8vLy4vZ3JhcGgtcWwvZnVuY2FvLXVzZXIuanMiLCJ3ZWJwYWNrOi8vLy4vZ3JhcGgtcWwvcGxhY2FzLWVtYnJhdGV4LmpzIiwid2VicGFjazovLy8uL2dyYXBoLXFsL3BsYWNhcy13ZW50ZXguanMiLCJ3ZWJwYWNrOi8vLy4vZ3JhcGgtcWwvdXNlcnMuanMiLCJ3ZWJwYWNrOi8vLy4vZ3JhcGgtcWwvdmVyaWZpZWQtdXNlcnMuanMiLCJ3ZWJwYWNrOi8vLy4vbW9kZWxzL2Z1bmNhby11c2VyLmpzIiwid2VicGFjazovLy8uL21vZGVscy9wbGFjYXMtZW1icmF0ZXguanMiLCJ3ZWJwYWNrOi8vLy4vbW9kZWxzL3BsYWNhcy13ZW50ZXguanMiLCJ3ZWJwYWNrOi8vLy4vbW9kZWxzL3VzZXJzLmpzIiwid2VicGFjazovLy8uL21vZGVscy92ZXJpZmllZC11c2Vycy5qcyIsIndlYnBhY2s6Ly8vLi9zZXJ2ZXIuanMiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwiQGJhYmVsL3BvbHlmaWxsXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwiYXBvbGxvLXNlcnZlci1leHByZXNzXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwiYm9keS1wYXJzZXJcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJjb3JzXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwiZXhwcmVzc1wiIiwid2VicGFjazovLy9leHRlcm5hbCBcInNlcXVlbGl6ZVwiIl0sIm5hbWVzIjpbIlNlcXVlbGl6ZSIsInJlcXVpcmUiLCJkYlBsYWNhcyIsInNlcXVlbGl6ZSIsImhvc3QiLCJwb3J0IiwiZGlhbGVjdCIsImRlZmluZSIsImZyZWV6ZVRhYmxlTmFtZSIsInBvb2wiLCJtYXgiLCJtaW4iLCJhY3F1aXJlIiwiaWRsZSIsIm9wZXJhdG9yc0FsaWFzZXMiLCJtb2RlbHMiLCJmb3JFYWNoIiwibW9kZWwiLCJzZXFNb2RlbCIsIm5hbWUiLCJPYmplY3QiLCJrZXlzIiwia2V5IiwiYXNzb2NpYXRlIiwibW9kdWxlIiwiZXhwb3J0cyIsImRiVXNlcnMiLCJ0eXBlRGVmcyIsImdxbCIsInJlc29sdmVycyIsIlF1ZXJ5IiwibGlzdGFfZnVuY29lcyIsImFyZ3MiLCJmaW5kQWxsIiwibGlzdGFfZnVuY2FvIiwib2JqIiwiY29udGV4dCIsImluZm8iLCJmaW5kQnlQayIsImlkX2Z1bmNhbyIsInBsYWNhc0VtYnJhdGV4IiwicGxhY2FFbWJyYXRleCIsImlkUGxhY2EiLCJNdXRhdGlvbiIsImNyZWF0ZVBsYWNhRW1iIiwicGFyZW50Iiwibm9tZVBsYWNhIiwicXVhbnRpZGFkZSIsInNpdHVhY2FvIiwibG9jYWwiLCJxdGRQYXJhU2l0dWFjYW9CYWl4YSIsInF0ZFBhcmFTaXR1YWNhb09rIiwicmVnVWx0aW1hRWRpY2FvIiwiZm90b1VsdGltb1VzZXIiLCJjcmVhdGUiLCJ1cGRhdGVQbGFjYUVtYiIsInVwZGF0ZSIsIndoZXJlIiwiZGVsZXRlUGxhY2FFbWIiLCJkZXN0cm95IiwicGxhY2FzV2VudGV4IiwicGxhY2FXZW50ZXgiLCJpZCIsImNyZWF0ZVBsYWNhV2VudGV4IiwidXBkYXRlUGxhY2FXZW50ZXgiLCJkZWxldGVQbGFjYVdlbnRleCIsImF0dWFsaXphX2NvbGFib3JhZG9yZXMiLCJhdHVhbGl6YV9jb2xhYm9yYWRvciIsInJlZ2lzdHJvIiwidXNlcnNfdmVyaWZpY2Fkb3MiLCJ1c2Vyc192ZXJpZmljYWRvIiwiRGF0YVR5cGVzIiwidHlwZSIsIlNUUklORyIsImFsbG93TnVsbCIsInByaW1hcnlLZXkiLCJhdXRvSW5jcmVtZW50Iiwibm9tZV9mdW5jYW8iLCJpZF9wZXJtaXNzYW8iLCJ0YWJsZU5hbWUiLCJ0aW1lc3RhbXBzIiwiTUVESVVNSU5UIiwiSU5URUdFUiIsImRhdGFVbHRpbWFFZGljYW8iLCJkZWZhdWx0VmFsdWUiLCJsaXRlcmFsIiwiQkxPQiIsImdldCIsImdldERhdGFWYWx1ZSIsInRvU3RyaW5nIiwibm9tZSIsImZvdG8iLCJzZW5oYSIsImlzX3ZlcmlmaWVkIiwiYm9keVBhcnNlciIsIkFwb2xsb1NlcnZlciIsImNvcnMiLCJhcHAiLCJleHByZXNzIiwidXNlIiwianNvbiIsImxpbWl0IiwidXJsZW5jb2RlZCIsImV4dGVuZGVkIiwic2VydmVyIiwibW9kdWxlcyIsImFwcGx5TWlkZGxld2FyZSIsImxpc3RlbiIsImNvbnNvbGUiLCJsb2ciXSwibWFwcGluZ3MiOiI7UUFBQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTs7O1FBR0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLDBDQUEwQyxnQ0FBZ0M7UUFDMUU7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSx3REFBd0Qsa0JBQWtCO1FBQzFFO1FBQ0EsaURBQWlELGNBQWM7UUFDL0Q7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBLHlDQUF5QyxpQ0FBaUM7UUFDMUUsZ0hBQWdILG1CQUFtQixFQUFFO1FBQ3JJO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0EsMkJBQTJCLDBCQUEwQixFQUFFO1FBQ3ZELGlDQUFpQyxlQUFlO1FBQ2hEO1FBQ0E7UUFDQTs7UUFFQTtRQUNBLHNEQUFzRCwrREFBK0Q7O1FBRXJIO1FBQ0E7OztRQUdBO1FBQ0E7Ozs7Ozs7Ozs7OztBQ2xGQSxJQUFNQSxTQUFTLEdBQUdDLG1CQUFPLENBQUMsNEJBQUQsQ0FBekI7O0FBRUEsSUFBSUMsUUFBUSxHQUFHLEVBQWY7QUFHQSxJQUFNQyxTQUFTLEdBQUcsSUFBSUgsU0FBSixDQUFjLHFCQUFkLEVBQXFDLE1BQXJD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LENBQXRCLENBQVI7QUFDQU4sR0FBRyxDQUFDRSxHQUFKLENBQVFILElBQUksRUFBWjtBQUVBLElBQU1RLE1BQU0sR0FBRyxJQUFJVCxZQUFKLENBQWlCO0FBQzVCVSxTQUFPLEVBQUUsQ0FDTHhHLG1CQUFPLENBQUMsNkNBQUQsQ0FERixFQUVMQSxtQkFBTyxDQUFDLHlEQUFELENBRkYsRUFHTEEsbUJBQU8sQ0FBQyxpRUFBRCxDQUhGLEVBSUxBLG1CQUFPLENBQUMsNkRBQUQsQ0FKRixFQUtMQSxtQkFBTyxDQUFDLCtEQUFELENBTEYsQ0FNUDtBQU5PO0FBRG1CLENBQWpCLENBQWY7QUFZQXVHLE1BQU0sQ0FBQ0UsZUFBUCxDQUF1QjtBQUFFVCxLQUFHLEVBQUhBO0FBQUYsQ0FBdkI7QUFHQUEsR0FBRyxDQUFDVSxNQUFKLENBQVc7QUFBRXRHLE1BQUksRUFBRTtBQUFSLENBQVgsRUFBMkI7QUFBQSxTQUN2QnVHLE9BQU8sQ0FBQ0MsR0FBUixzREFEdUI7QUFBQSxDQUEzQixFOzs7Ozs7Ozs7OztBQzNCQSw0Qzs7Ozs7Ozs7Ozs7QUNBQSxrRDs7Ozs7Ozs7Ozs7QUNBQSx3Qzs7Ozs7Ozs7Ozs7QUNBQSxpQzs7Ozs7Ozs7Ozs7QUNBQSxvQzs7Ozs7Ozs7Ozs7QUNBQSxzQyIsImZpbGUiOiJzZXJ2ZXItZGlzdC5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBcIi4vc2VydmVyLmpzXCIpO1xuIiwiY29uc3QgU2VxdWVsaXplID0gcmVxdWlyZSgnc2VxdWVsaXplJylcclxuXHJcbnZhciBkYlBsYWNhcyA9IHt9XHJcblxyXG5cclxuY29uc3Qgc2VxdWVsaXplID0gbmV3IFNlcXVlbGl6ZSgnY29udHJvbGVfcGxhY2FzX3N5cycsICdyb290JywgJzEyMzQ1NicsIHtcclxuICAgIGhvc3Q6ICdsb2NhbGhvc3QnLFxyXG4gICAgcG9ydDogJzMzMDcnLFxyXG4gICAgZGlhbGVjdDogJ215c3FsJyxcclxuICAgIGRlZmluZToge1xyXG4gICAgICAgIGZyZWV6ZVRhYmxlTmFtZTogdHJ1ZSxcclxuICAgIH0sXHJcbiAgICBwb29sOiB7XHJcbiAgICAgICAgbWF4OiA1LFxyXG4gICAgICAgIG1pbjogMCxcclxuICAgICAgICBhY3F1aXJlOiAzMDAwMCxcclxuICAgICAgICBpZGxlOiAxMDAwMCxcclxuICAgIH0sXHJcbiAgICAvLyBodHRwOi8vZG9jcy5zZXF1ZWxpemVqcy5jb20vbWFudWFsL3R1dG9yaWFsL3F1ZXJ5aW5nLmh0bWwjb3BlcmF0b3JzXHJcbiAgICBvcGVyYXRvcnNBbGlhc2VzOiBmYWxzZSxcclxufSlcclxuXHJcblxyXG5sZXQgbW9kZWxzID0gW1xyXG4gICAgcmVxdWlyZSgnLi4vbW9kZWxzL3BsYWNhcy1lbWJyYXRleCcpLFxyXG4gICAgcmVxdWlyZSgnLi4vbW9kZWxzL3BsYWNhcy13ZW50ZXgnKSxcclxuICAgIHJlcXVpcmUoJy4uL21vZGVscy92ZXJpZmllZC11c2VycycpXHJcbl1cclxuXHJcbi8vIEluaXRpYWxpemUgbW9kZWxzXHJcbm1vZGVscy5mb3JFYWNoKG1vZGVsID0+IHtcclxuICAgIGNvbnN0IHNlcU1vZGVsID0gbW9kZWwoc2VxdWVsaXplLCBTZXF1ZWxpemUpXHJcbiAgICBkYlBsYWNhc1tzZXFNb2RlbC5uYW1lXSA9IHNlcU1vZGVsXHJcbn0pXHJcblxyXG4vLyBBcHBseSBhc3NvY2lhdGlvbnNcclxuXHJcbk9iamVjdC5rZXlzKGRiUGxhY2FzKS5mb3JFYWNoKGtleSA9PiB7XHJcbiAgICBcclxuICAgIGlmICgnYXNzb2NpYXRlJyBpbiBkYlBsYWNhc1trZXldKSB7XHJcbiAgICAgICAgZGJQbGFjYXNba2V5XS5hc3NvY2lhdGUoZGJQbGFjYXMpXHJcbiAgICB9XHJcbn0pXHJcblxyXG5cclxuZGJQbGFjYXMuc2VxdWVsaXplID0gc2VxdWVsaXplXHJcbmRiUGxhY2FzLlNlcXVlbGl6ZSA9IFNlcXVlbGl6ZVxyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBkYlBsYWNhc1xyXG4iLCJjb25zdCBTZXF1ZWxpemUgPSByZXF1aXJlKCdzZXF1ZWxpemUnKVxyXG5cclxudmFyIGRiVXNlcnMgPSB7fVxyXG5cclxuXHJcbmNvbnN0IHNlcXVlbGl6ZSA9IG5ldyBTZXF1ZWxpemUoJ2JhbmNvX2FsbW94YXJpZmFkbycsICdVc2VyQ29sYWInLCAnMTIzNDU2Jywge1xyXG4gICAgaG9zdDogJzEzMi4xLjQuMjMnLFxyXG4gICAgcG9ydDogJzMzMDcnLFxyXG4gICAgZGlhbGVjdDogJ215c3FsJyxcclxuICAgIGRlZmluZToge1xyXG4gICAgICAgIGZyZWV6ZVRhYmxlTmFtZTogdHJ1ZSxcclxuICAgIH0sXHJcbiAgICBwb29sOiB7XHJcbiAgICAgICAgbWF4OiA1LFxyXG4gICAgICAgIG1pbjogMCxcclxuICAgICAgICBhY3F1aXJlOiAzMDAwMCxcclxuICAgICAgICBpZGxlOiAxMDAwMCxcclxuICAgIH0sXHJcbiAgICAvLyBodHRwOi8vZG9jcy5zZXF1ZWxpemVqcy5jb20vbWFudWFsL3R1dG9yaWFsL3F1ZXJ5aW5nLmh0bWwjb3BlcmF0b3JzXHJcbiAgICBvcGVyYXRvcnNBbGlhc2VzOiBmYWxzZSxcclxufSlcclxuXHJcblxyXG5sZXQgbW9kZWxzID0gW1xyXG4gICAgcmVxdWlyZSgnLi4vbW9kZWxzL3VzZXJzLmpzJyksXHJcbiAgICByZXF1aXJlKCcuLi9tb2RlbHMvZnVuY2FvLXVzZXIuanMnKVxyXG5dXHJcblxyXG4vLyBJbml0aWFsaXplIG1vZGVsc1xyXG5tb2RlbHMuZm9yRWFjaChtb2RlbCA9PiB7XHJcbiAgICBjb25zdCBzZXFNb2RlbCA9IG1vZGVsKHNlcXVlbGl6ZSwgU2VxdWVsaXplKVxyXG4gICAgZGJVc2Vyc1tzZXFNb2RlbC5uYW1lXSA9IHNlcU1vZGVsXHJcbn0pXHJcblxyXG4vLyBBcHBseSBhc3NvY2lhdGlvbnNcclxuXHJcbk9iamVjdC5rZXlzKGRiVXNlcnMpLmZvckVhY2goa2V5ID0+IHtcclxuICAgIFxyXG4gICAgaWYgKCdhc3NvY2lhdGUnIGluIGRiVXNlcnNba2V5XSkge1xyXG4gICAgICAgIGRiVXNlcnNba2V5XS5hc3NvY2lhdGUoZGJVc2VycylcclxuICAgIH1cclxufSlcclxuXHJcblxyXG5kYlVzZXJzLnNlcXVlbGl6ZSA9IHNlcXVlbGl6ZVxyXG5kYlVzZXJzLlNlcXVlbGl6ZSA9IFNlcXVlbGl6ZVxyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBkYlVzZXJzXHJcbiIsImltcG9ydCB7IGdxbCB9IGZyb20gJ2Fwb2xsby1zZXJ2ZXItZXhwcmVzcydcclxuaW1wb3J0ICogYXMgZGJVc2VycyBmcm9tICcuLi9kYXRhYmFzZXMvZGF0YWJhc2UtdXN1YXJpb3MnXHJcblxyXG5cclxuZXhwb3J0IGNvbnN0IHR5cGVEZWZzID0gZ3FsYFxyXG4gICAgZXh0ZW5kIHR5cGUgUXVlcnkge1xyXG4gICAgICAgIGxpc3RhX2Z1bmNvZXM6IFtGdW5jYW9dXHJcbiAgICAgICAgbGlzdGFfZnVuY2FvKGlkX2Z1bmNhbzogU3RyaW5nKTogRnVuY2FvICAgXHJcbiAgICB9XHJcbiAgICBcclxuICAgIHR5cGUgRnVuY2FvIHtcclxuICAgICAgICBpZF9mdW5jYW86IFN0cmluZ1xyXG4gICAgICAgIG5vbWVfZnVuY2FvOiBTdHJpbmdcclxuICAgICAgICBpZF9wZXJtaXNzYW86IFN0cmluZ1xyXG4gICAgfVxyXG5cclxuYFxyXG5leHBvcnQgY29uc3QgcmVzb2x2ZXJzID0ge1xyXG4gICAgUXVlcnk6IHtcclxuICAgICAgICBsaXN0YV9mdW5jb2VzOiBhc3luYyAoYXJncykgPT4gZGJVc2Vycy5saXN0YV9mdW5jYW8uZmluZEFsbCgpLFxyXG4gICAgICAgIGxpc3RhX2Z1bmNhbzogYXN5bmMgKG9iaiwgYXJncywgY29udGV4dCwgaW5mbykgPT4gZGJVc2Vycy5saXN0YV9mdW5jYW8uZmluZEJ5UGsoYXJncy5pZF9mdW5jYW8pXHJcbiAgICB9LFxyXG59IiwiaW1wb3J0IHsgZ3FsIH0gZnJvbSAnYXBvbGxvLXNlcnZlci1leHByZXNzJ1xyXG5pbXBvcnQgKiBhcyBkYlBsYWNhcyBmcm9tICcuLi9kYXRhYmFzZXMvZGF0YWJhc2UtcGxhY2FzJ1xyXG5cclxuXHJcbmV4cG9ydCBjb25zdCB0eXBlRGVmcyA9IGdxbGBcclxuICAgIGV4dGVuZCB0eXBlIFF1ZXJ5IHtcclxuICAgICAgICBwbGFjYXNFbWJyYXRleDogW1BsYWNhRW1icmF0ZXhdXHJcbiAgICAgICAgcGxhY2FFbWJyYXRleChpZFBsYWNhOiBJRCk6IFBsYWNhRW1icmF0ZXhcclxuICAgIH1cclxuXHJcbiAgICBzY2FsYXIgRGF0ZVxyXG5cclxuICAgIHR5cGUgUGxhY2FFbWJyYXRleCB7XHJcbiAgICAgICAgaWRQbGFjYTogSURcclxuICAgICAgICBub21lUGxhY2E6IFN0cmluZ1xyXG4gICAgICAgIHF1YW50aWRhZGU6IEludFxyXG4gICAgICAgIHNpdHVhY2FvOiBTdHJpbmdcclxuICAgICAgICBsb2NhbDogU3RyaW5nXHJcbiAgICAgICAgcXRkUGFyYVNpdHVhY2FvQmFpeGE6IEludFxyXG4gICAgICAgIHF0ZFBhcmFTaXR1YWNhb09rOiBJbnRcclxuICAgICAgICBkYXRhVWx0aW1hRWRpY2FvOiBEYXRlXHJcbiAgICAgICAgcmVnVWx0aW1hRWRpY2FvIDogU3RyaW5nXHJcbiAgICAgICAgZm90b1VsdGltb1VzZXIgOiBTdHJpbmdcclxuICAgIH1cclxuXHJcbiAgICB0eXBlIE11dGF0aW9uIHtcclxuICAgICAgICBjcmVhdGVQbGFjYUVtYiAobm9tZVBsYWNhOiBTdHJpbmcsIHF1YW50aWRhZGU6IEludCwgc2l0dWFjYW86IFN0cmluZywgbG9jYWw6IFN0cmluZywgXHJcbiAgICAgICAgICAgIHF0ZFBhcmFTaXR1YWNhb0JhaXhhOiBJbnQsIHF0ZFBhcmFTaXR1YWNhb09rOiBJbnQsIGRhdGFVbHRpbWFFZGljYW86IERhdGUsIHJlZ1VsdGltYUVkaWNhbyA6IFN0cmluZywgZm90b1VsdGltb1VzZXI6IFN0cmluZykgOiBQbGFjYUVtYnJhdGV4XHJcblxyXG4gICAgICAgIHVwZGF0ZVBsYWNhRW1iIChpZFBsYWNhOiBJRCwgbm9tZVBsYWNhOiBTdHJpbmcsIHF1YW50aWRhZGU6IEludCwgc2l0dWFjYW86IFN0cmluZywgbG9jYWw6IFN0cmluZywgXHJcbiAgICAgICAgICAgIHF0ZFBhcmFTaXR1YWNhb0JhaXhhOiBJbnQsIHF0ZFBhcmFTaXR1YWNhb09rOiBJbnQsIGRhdGFVbHRpbWFFZGljYW86IERhdGUsIHJlZ1VsdGltYUVkaWNhbyA6IFN0cmluZywgZm90b1VsdGltb1VzZXI6IFN0cmluZykgOiBQbGFjYUVtYnJhdGV4XHJcblxyXG4gICAgICAgIGRlbGV0ZVBsYWNhRW1iIChpZFBsYWNhOiBJRCkgOiBJRFxyXG4gICAgfVxyXG5gXHJcbmV4cG9ydCBjb25zdCByZXNvbHZlcnMgPSB7XHJcbiAgICBRdWVyeToge1xyXG4gICAgICAgIHBsYWNhc0VtYnJhdGV4OiBhc3luYyAoYXJncykgPT4gZGJQbGFjYXMucGxhY2FzX2VtYnJhdGV4LmZpbmRBbGwoKSxcclxuICAgICAgICBwbGFjYUVtYnJhdGV4OiBhc3luYyAob2JqLCBhcmdzLCBjb250ZXh0LCBpbmZvKSA9PiBkYlBsYWNhcy5wbGFjYXNfZW1icmF0ZXguZmluZEJ5UGsoYXJncy5pZFBsYWNhKVxyXG4gICAgfSxcclxuICAgIE11dGF0aW9uIDoge1xyXG4gICAgICAgIGNyZWF0ZVBsYWNhRW1iOiBhc3luYyAocGFyZW50LCB7bm9tZVBsYWNhLCBxdWFudGlkYWRlLCBzaXR1YWNhbywgbG9jYWwsIHF0ZFBhcmFTaXR1YWNhb0JhaXhhLCBxdGRQYXJhU2l0dWFjYW9PaywgcmVnVWx0aW1hRWRpY2FvLCBmb3RvVWx0aW1vVXNlcn0sIGluZm8pID0+XHJcbiAgICAgICAgICAgIGRiUGxhY2FzLnBsYWNhc19lbWJyYXRleC5jcmVhdGUgKHtcclxuICAgICAgICAgICAgICAgIG5vbWVQbGFjYTogbm9tZVBsYWNhLFxyXG4gICAgICAgICAgICAgICAgcXVhbnRpZGFkZTogcXVhbnRpZGFkZSxcclxuICAgICAgICAgICAgICAgIHNpdHVhY2FvOiBzaXR1YWNhbyxcclxuICAgICAgICAgICAgICAgIGxvY2FsOiBsb2NhbCxcclxuICAgICAgICAgICAgICAgIHF0ZFBhcmFTaXR1YWNhb0JhaXhhIDogcXRkUGFyYVNpdHVhY2FvQmFpeGEsXHJcbiAgICAgICAgICAgICAgICBxdGRQYXJhU2l0dWFjYW9PayA6IHF0ZFBhcmFTaXR1YWNhb09rLFxyXG4gICAgICAgICAgICAgICAgcmVnVWx0aW1hRWRpY2FvOiByZWdVbHRpbWFFZGljYW8sXHJcbiAgICAgICAgICAgICAgICBmb3RvVWx0aW1vVXNlciA6IGZvdG9VbHRpbW9Vc2VyXHJcbiAgICAgICAgICAgIH0pLFxyXG4gICAgICAgIHVwZGF0ZVBsYWNhRW1iOiBhc3luYyAocGFyZW50LCB7aWRQbGFjYSwgbm9tZVBsYWNhLCBxdWFudGlkYWRlLCBzaXR1YWNhbywgbG9jYWwsIHF0ZFBhcmFTaXR1YWNhb0JhaXhhLCBxdGRQYXJhU2l0dWFjYW9PaywgcmVnVWx0aW1hRWRpY2FvLCBmb3RvVWx0aW1vVXNlcn0sIGluZm8pID0+XHJcbiAgICAgICAgICAgIGRiUGxhY2FzLnBsYWNhc19lbWJyYXRleC51cGRhdGUoe1xyXG4gICAgICAgICAgICAgICAgbm9tZVBsYWNhOiBub21lUGxhY2EsXHJcbiAgICAgICAgICAgICAgICBxdWFudGlkYWRlOiBxdWFudGlkYWRlLFxyXG4gICAgICAgICAgICAgICAgc2l0dWFjYW86IHNpdHVhY2FvLFxyXG4gICAgICAgICAgICAgICAgbG9jYWw6IGxvY2FsLFxyXG4gICAgICAgICAgICAgICAgcXRkUGFyYVNpdHVhY2FvQmFpeGEgOiBxdGRQYXJhU2l0dWFjYW9CYWl4YSxcclxuICAgICAgICAgICAgICAgIHF0ZFBhcmFTaXR1YWNhb09rIDogcXRkUGFyYVNpdHVhY2FvT2ssXHJcbiAgICAgICAgICAgICAgICByZWdVbHRpbWFFZGljYW86IHJlZ1VsdGltYUVkaWNhbyxcclxuICAgICAgICAgICAgICAgIGZvdG9VbHRpbW9Vc2VyIDogZm90b1VsdGltb1VzZXJcclxuICAgICAgICAgICAgfSwge1xyXG4gICAgICAgICAgICAgICAgd2hlcmUgOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWRQbGFjYTogaWRQbGFjYVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KSxcclxuICAgICAgICBkZWxldGVQbGFjYUVtYjogYXN5bmMgKHBhcmVudCwge2lkUGxhY2F9LCBpbmZvKSA9PlxyXG4gICAgICAgIHtcclxuICAgICAgICBkYlBsYWNhcy5wbGFjYXNfZW1icmF0ZXguZGVzdHJveSAoe1xyXG4gICAgICAgICAgICB3aGVyZSA6IHtcclxuICAgICAgICAgICAgICAgIGlkUGxhY2EgOiBpZFBsYWNhXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn0iLCJpbXBvcnQgeyBncWwgfSBmcm9tICdhcG9sbG8tc2VydmVyLWV4cHJlc3MnXHJcbmltcG9ydCAqIGFzIGRiUGxhY2FzIGZyb20gJy4uL2RhdGFiYXNlcy9kYXRhYmFzZS1wbGFjYXMnXHJcblxyXG5cclxuZXhwb3J0IGNvbnN0IHR5cGVEZWZzID0gZ3FsYFxyXG4gICAgZXh0ZW5kIHR5cGUgUXVlcnkge1xyXG4gICAgICAgIHBsYWNhc1dlbnRleDogW1BsYWNhV2VudGV4XVxyXG4gICAgICAgIHBsYWNhV2VudGV4KGlkUGxhY2E6IElEKTogUGxhY2FXZW50ZXhcclxuICAgIH1cclxuICAgIFxyXG4gICAgdHlwZSBQbGFjYVdlbnRleCB7XHJcbiAgICAgICAgaWRQbGFjYTogSURcclxuICAgICAgICBub21lUGxhY2E6IFN0cmluZ1xyXG4gICAgICAgIHF1YW50aWRhZGU6IEludFxyXG4gICAgICAgIHNpdHVhY2FvOiBTdHJpbmdcclxuICAgICAgICBsb2NhbDogU3RyaW5nXHJcbiAgICAgICAgcXRkUGFyYVNpdHVhY2FvQmFpeGE6IEludFxyXG4gICAgICAgIHF0ZFBhcmFTaXR1YWNhb09rOiBJbnRcclxuICAgICAgICBkYXRhVWx0aW1hRWRpY2FvOiBEYXRlXHJcbiAgICAgICAgcmVnVWx0aW1hRWRpY2FvIDogU3RyaW5nXHJcbiAgICAgICAgZm90b1VsdGltb1VzZXIgOiBTdHJpbmdcclxuICAgIH1cclxuXHJcbiAgICBleHRlbmQgdHlwZSBNdXRhdGlvbiB7XHJcbiAgICAgICAgY3JlYXRlUGxhY2FXZW50ZXggIChpZFBsYWNhOiBJRCwgbm9tZVBsYWNhOiBTdHJpbmcsIHF1YW50aWRhZGU6IEludCwgc2l0dWFjYW86IFN0cmluZywgbG9jYWw6IFN0cmluZywgXHJcbiAgICAgICAgICAgIHF0ZFBhcmFTaXR1YWNhb0JhaXhhOiBJbnQsIHF0ZFBhcmFTaXR1YWNhb09rOiBJbnQsIGRhdGFVbHRpbWFFZGljYW86IERhdGUsIHJlZ1VsdGltYUVkaWNhbyA6IFN0cmluZywgZm90b1VsdGltb1VzZXI6IFN0cmluZykgOiBQbGFjYVdlbnRleFxyXG5cclxuICAgICAgICB1cGRhdGVQbGFjYVdlbnRleCAgKGlkUGxhY2E6IElELCBub21lUGxhY2E6IFN0cmluZywgcXVhbnRpZGFkZTogSW50LCBzaXR1YWNhbzogU3RyaW5nLCBsb2NhbDogU3RyaW5nLCBcclxuICAgICAgIHF0ZFBhcmFTaXR1YWNhb0JhaXhhOiBJbnQsIHF0ZFBhcmFTaXR1YWNhb09rOiBJbnQsIGRhdGFVbHRpbWFFZGljYW86IERhdGUsIHJlZ1VsdGltYUVkaWNhbyA6IFN0cmluZywgZm90b1VsdGltb1VzZXI6IFN0cmluZyApIDogUGxhY2FXZW50ZXhcclxuXHJcbiAgICAgICAgZGVsZXRlUGxhY2FXZW50ZXggKGlkUGxhY2E6IElEKSA6IElEXHJcbiAgICB9XHJcbmBcclxuZXhwb3J0IGNvbnN0IHJlc29sdmVycyA9IHtcclxuICAgIFF1ZXJ5OiB7XHJcbiAgICAgICAgcGxhY2FzV2VudGV4OiBhc3luYyAoYXJncykgPT4gZGJQbGFjYXMucGxhY2FzX3dlbnRleC5maW5kQWxsKCksXHJcbiAgICAgICAgcGxhY2FXZW50ZXg6IGFzeW5jIChvYmosIGFyZ3MsIGNvbnRleHQsIGluZm8pID0+IGRiUGxhY2FzLnBsYWNhc193ZW50ZXguZmluZEJ5UGsoYXJncy5pZClcclxuICAgIH0sXHJcbiAgICBNdXRhdGlvbiA6IHtcclxuICAgICAgICBjcmVhdGVQbGFjYVdlbnRleDogYXN5bmMgKHBhcmVudCwge25vbWVQbGFjYSwgcXVhbnRpZGFkZSwgc2l0dWFjYW8sIGxvY2FsLCBxdGRQYXJhU2l0dWFjYW9CYWl4YSwgcXRkUGFyYVNpdHVhY2FvT2ssIHJlZ1VsdGltYUVkaWNhbywgZm90b1VsdGltb1VzZXJ9LCBpbmZvKSA9PlxyXG4gICAgICAgICAgICBkYlBsYWNhcy5wbGFjYXNfd2VudGV4LmNyZWF0ZSAoe1xyXG4gICAgICAgICAgICAgICAgbm9tZVBsYWNhOiBub21lUGxhY2EsXHJcbiAgICAgICAgICAgICAgICBxdWFudGlkYWRlOiBxdWFudGlkYWRlLFxyXG4gICAgICAgICAgICAgICAgc2l0dWFjYW86IHNpdHVhY2FvLFxyXG4gICAgICAgICAgICAgICAgbG9jYWw6IGxvY2FsLFxyXG4gICAgICAgICAgICAgICAgcXRkUGFyYVNpdHVhY2FvQmFpeGEgOiBxdGRQYXJhU2l0dWFjYW9CYWl4YSxcclxuICAgICAgICAgICAgICAgIHF0ZFBhcmFTaXR1YWNhb09rIDogcXRkUGFyYVNpdHVhY2FvT2ssXHJcbiAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgcmVnVWx0aW1hRWRpY2FvOiByZWdVbHRpbWFFZGljYW8sXHJcbiAgICAgICAgICAgICAgICBmb3RvVWx0aW1vVXNlciA6IGZvdG9VbHRpbW9Vc2VyXHJcbiAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgfSksXHJcbiAgICAgICAgdXBkYXRlUGxhY2FXZW50ZXg6IGFzeW5jIChwYXJlbnQsIHtpZFBsYWNhLCBub21lUGxhY2EsIHF1YW50aWRhZGUsIHNpdHVhY2FvLCBsb2NhbCwgcXRkUGFyYVNpdHVhY2FvQmFpeGEsIHF0ZFBhcmFTaXR1YWNhb09rLCByZWdVbHRpbWFFZGljYW8sIGZvdG9VbHRpbW9Vc2VyfSwgaW5mbykgPT5cclxuICAgICAgICAgICAgZGJQbGFjYXMucGxhY2FzX3dlbnRleC51cGRhdGUoe1xyXG4gICAgICAgICAgICAgICAgbm9tZVBsYWNhOiBub21lUGxhY2EsXHJcbiAgICAgICAgICAgICAgICBxdWFudGlkYWRlOiBxdWFudGlkYWRlLFxyXG4gICAgICAgICAgICAgICAgc2l0dWFjYW86IHNpdHVhY2FvLFxyXG4gICAgICAgICAgICAgICAgbG9jYWw6IGxvY2FsLFxyXG4gICAgICAgICAgICAgICAgcXRkUGFyYVNpdHVhY2FvQmFpeGEgOiBxdGRQYXJhU2l0dWFjYW9CYWl4YSxcclxuICAgICAgICAgICAgICAgIHF0ZFBhcmFTaXR1YWNhb09rIDogcXRkUGFyYVNpdHVhY2FvT2ssXHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgcmVnVWx0aW1hRWRpY2FvOiByZWdVbHRpbWFFZGljYW8sXHJcbiAgICAgICAgICAgICAgICBmb3RvVWx0aW1vVXNlciA6IGZvdG9VbHRpbW9Vc2VyXHJcbiAgICAgICAgICAgIH0sIHtcclxuICAgICAgICAgICAgICAgIHdoZXJlIDoge1xyXG4gICAgICAgICAgICAgICAgICAgIGlkUGxhY2E6IGlkUGxhY2FcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSksXHJcbiAgICAgICAgZGVsZXRlUGxhY2FXZW50ZXg6IGFzeW5jIChwYXJlbnQsIHtpZFBsYWNhfSwgaW5mbykgPT5cclxuICAgICAgICB7XHJcbiAgICAgICAgZGJQbGFjYXMucGxhY2FzX3dlbnRleC5kZXN0cm95ICh7XHJcbiAgICAgICAgICAgIHdoZXJlIDoge1xyXG4gICAgICAgICAgICAgICAgaWRQbGFjYSA6IGlkUGxhY2FcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG4iLCJpbXBvcnQgeyBncWwgfSBmcm9tICdhcG9sbG8tc2VydmVyLWV4cHJlc3MnXHJcbmltcG9ydCAqIGFzIGRiVXNlcnMgZnJvbSAnLi4vZGF0YWJhc2VzL2RhdGFiYXNlLXVzdWFyaW9zJ1xyXG5cclxuXHJcbmV4cG9ydCBjb25zdCB0eXBlRGVmcyA9IGdxbGBcclxuICAgIGV4dGVuZCB0eXBlIFF1ZXJ5IHtcclxuICAgICAgICBhdHVhbGl6YV9jb2xhYm9yYWRvcmVzOiBbVXNlcl1cclxuICAgICAgICBhdHVhbGl6YV9jb2xhYm9yYWRvcihyZWdpc3RybzogU3RyaW5nKTogVXNlciAgIFxyXG4gICAgfVxyXG4gICAgXHJcbiAgICB0eXBlIFVzZXIge1xyXG4gICAgICAgIHJlZ2lzdHJvOiBTdHJpbmdcclxuICAgICAgICBub21lOiBTdHJpbmdcclxuICAgICAgICBsaXN0YV9mdW5jYW86IFN0cmluZ1xyXG4gICAgICAgIGZvdG86IFN0cmluZ1xyXG4gICAgfVxyXG5cclxuYFxyXG5leHBvcnQgY29uc3QgcmVzb2x2ZXJzID0ge1xyXG4gICAgUXVlcnk6IHtcclxuICAgICAgICBhdHVhbGl6YV9jb2xhYm9yYWRvcmVzOiBhc3luYyAoYXJncykgPT4gZGJVc2Vycy5hdHVhbGl6YV9jb2xhYm9yYWRvci5maW5kQWxsKCksXHJcbiAgICAgICAgYXR1YWxpemFfY29sYWJvcmFkb3I6IGFzeW5jIChvYmosIGFyZ3MsIGNvbnRleHQsIGluZm8pID0+IGRiVXNlcnMuYXR1YWxpemFfY29sYWJvcmFkb3IuZmluZEJ5UGsoYXJncy5yZWdpc3RybylcclxuICAgIH0sXHJcbn1cclxuXHJcbi8vXHJcbi8vIHVzZXIocmVnOiBTdHJpbmchKTogVXNlclxyXG5cclxuIiwiaW1wb3J0IHsgZ3FsIH0gZnJvbSAnYXBvbGxvLXNlcnZlci1leHByZXNzJ1xyXG5pbXBvcnQgKiBhcyBkYlVzZXJzIGZyb20gJy4uL2RhdGFiYXNlcy9kYXRhYmFzZS1wbGFjYXMnXHJcblxyXG5cclxuZXhwb3J0IGNvbnN0IHR5cGVEZWZzID0gZ3FsYFxyXG4gICAgZXh0ZW5kIHR5cGUgUXVlcnkge1xyXG4gICAgICAgIHVzZXJzX3ZlcmlmaWNhZG9zOiBbVXNlcl92ZXJpZmllZF1cclxuICAgICAgICB1c2Vyc192ZXJpZmljYWRvKHJlZ2lzdHJvOiBTdHJpbmcpOiBVc2VyX3ZlcmlmaWVkICBcclxuICAgIH1cclxuICAgIFxyXG4gICAgdHlwZSBVc2VyX3ZlcmlmaWVkIHtcclxuICAgICAgICByZWdpc3RybzogU3RyaW5nXHJcbiAgICAgICAgc2VuaGE6IFN0cmluZ1xyXG4gICAgICAgIG5vbWU6IFN0cmluZ1xyXG4gICAgICAgIGlzX3ZlcmlmaWVkOiBTdHJpbmdcclxuICAgIH1cclxuXHJcbmBcclxuZXhwb3J0IGNvbnN0IHJlc29sdmVycyA9IHtcclxuICAgIFF1ZXJ5OiB7XHJcbiAgICAgICAgdXNlcnNfdmVyaWZpY2Fkb3M6IGFzeW5jIChhcmdzKSA9PiBkYlVzZXJzLnVzZXJzX3N5c3RlbS5maW5kQWxsKCksXHJcbiAgICAgICAgdXNlcnNfdmVyaWZpY2FkbzogYXN5bmMgKG9iaiwgYXJncywgY29udGV4dCwgaW5mbykgPT4gZGJVc2Vycy51c2Vyc19zeXN0ZW0uZmluZEJ5UGsoYXJncy5yZWdpc3RybylcclxuICAgIH0sXHJcbn1cclxuXHJcblxyXG5cclxuLypcclxuSU5TRVJUIElOVE8gdXNlcnNfdmVyaWZpY2Fkb3MgKHJlZ2lzdHJvLCBzZW5oYSwgbm9tZSkgVkFMVUVTIChcIjAwMTE1MDcwMjk3XCIsIFwiZW0xNDAxXCIsIFwiZW1lcnNvblwiKTtcclxuSU5TRVJUIElOVE8gdXNlcnNfdmVyaWZpY2Fkb3MgKHJlZ2lzdHJvLCBzZW5oYSwgbm9tZSkgVkFMVUVTIChcIjAwMTE1MDE2NjQwXCIsIFwiamUxNDAxXCIsIFwiamVzaW1pZWxcIik7XHJcbklOU0VSVCBJTlRPIHVzZXJzX3ZlcmlmaWNhZG9zIChyZWdpc3Rybywgc2VuaGEsIG5vbWUpIFZBTFVFUyAoXCIwMDExNTAwMTIwMVwiLCBcImNsMTQwMVwiLCBcImNsYXVkaW9cIik7XHJcbklOU0VSVCBJTlRPIHVzZXJzX3ZlcmlmaWNhZG9zIChyZWdpc3Rybywgc2VuaGEsIG5vbWUpIFZBTFVFUyAoXCIwMDExNTA0NTE3OVwiLCBcImFuMTQwMVwiLCBcImFuZHJlXCIpO1xyXG5JTlNFUlQgSU5UTyB1c2Vyc192ZXJpZmljYWRvcyAocmVnaXN0cm8sIHNlbmhhLCBub21lKSBWQUxVRVMgKFwiMDAxMTUwNjIxNzBcIiwgXCJlbDE0MDFcIiwgXCJlbGlzYW5nZWxhXCIpO1xyXG5cclxuXHJcbiovXHJcbiIsIlxyXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKHNlcXVlbGl6ZSwgRGF0YVR5cGVzKSB7XHJcblx0cmV0dXJuIHNlcXVlbGl6ZS5kZWZpbmUoJ2xpc3RhX2Z1bmNhbycsIHtcclxuXHRcdGlkX2Z1bmNhbzoge1xyXG5cdFx0XHR0eXBlOiBEYXRhVHlwZXMuU1RSSU5HKDE2KSxcclxuXHRcdFx0YWxsb3dOdWxsOiBmYWxzZSxcclxuXHRcdFx0cHJpbWFyeUtleTogdHJ1ZSxcclxuXHRcdFx0YXV0b0luY3JlbWVudDogdHJ1ZVxyXG5cdFx0fSxcclxuXHRcdG5vbWVfZnVuY2FvOiB7XHJcblx0XHRcdHR5cGU6IERhdGFUeXBlcy5TVFJJTkcoMjU2KSxcclxuXHRcdFx0YWxsb3dOdWxsOiBmYWxzZVxyXG5cdFx0fSxcclxuXHRcdGlkX3Blcm1pc3Nhbzoge1xyXG5cdFx0XHR0eXBlOiBEYXRhVHlwZXMuU1RSSU5HKDI1NiksXHJcblx0XHRcdGFsbG93TnVsbDogZmFsc2VcclxuXHRcdH0sXHJcblx0fSwge1xyXG5cdFx0dGFibGVOYW1lOiAnbGlzdGFfZnVuY2FvJyxcclxuXHRcdHRpbWVzdGFtcHM6IGZhbHNlXHJcblx0fSk7XHJcbn07IiwiXHJcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oc2VxdWVsaXplLCBEYXRhVHlwZXMpIHtcclxuXHRyZXR1cm4gc2VxdWVsaXplLmRlZmluZSgncGxhY2FzX2VtYnJhdGV4Jywge1xyXG5cdFx0aWRQbGFjYToge1xyXG5cdFx0XHR0eXBlOiBEYXRhVHlwZXMuTUVESVVNSU5UKDgpLFxyXG5cdFx0XHRhbGxvd051bGw6IGZhbHNlLFxyXG5cdFx0XHRwcmltYXJ5S2V5OiB0cnVlLFxyXG5cdFx0XHRhdXRvSW5jcmVtZW50OiB0cnVlXHJcblx0XHR9LFxyXG5cdFx0bm9tZVBsYWNhOiB7XHJcblx0XHRcdHR5cGU6IERhdGFUeXBlcy5TVFJJTkcoMjU2KSxcclxuXHRcdFx0YWxsb3dOdWxsOiBmYWxzZVxyXG5cdFx0fSxcclxuXHRcdHF1YW50aWRhZGU6IHtcclxuXHRcdFx0dHlwZTogRGF0YVR5cGVzLklOVEVHRVIsXHJcblx0XHRcdGFsbG93TnVsbDogZmFsc2VcclxuXHRcdH0sXHJcblx0XHRzaXR1YWNhbzoge1xyXG5cdFx0XHR0eXBlOiBEYXRhVHlwZXMuU1RSSU5HKDI1NiksXHJcblx0XHRcdGFsbG93TnVsbDogZmFsc2VcclxuXHRcdH0sXHJcblxyXG5cdFx0cXRkUGFyYVNpdHVhY2FvQmFpeGE6IHtcclxuXHRcdFx0dHlwZTogRGF0YVR5cGVzLklOVEVHRVIsXHJcblx0XHRcdGFsbG93TnVsbDogZmFsc2VcclxuXHRcdH0sXHJcblxyXG5cdFx0cXRkUGFyYVNpdHVhY2FvT2s6IHtcclxuXHRcdFx0dHlwZTogRGF0YVR5cGVzLklOVEVHRVIsXHJcblx0XHRcdGFsbG93TnVsbDogZmFsc2VcclxuXHRcdH0sXHJcblxyXG5cdFx0ZGF0YVVsdGltYUVkaWNhbzoge1xyXG5cdFx0XHR0eXBlOiAnVElNRVNUQU1QJyxcclxuXHRcdFx0ZGVmYXVsdFZhbHVlOiBEYXRhVHlwZXMubGl0ZXJhbCgnQ1VSUkVOVF9USU1FU1RBTVAnKSxcclxuXHRcdFx0YWxsb3dOdWxsOiBmYWxzZVxyXG5cdFx0fSxcclxuXHJcblx0XHRsb2NhbDoge1xyXG5cdFx0XHR0eXBlOiBEYXRhVHlwZXMuU1RSSU5HKDI1NiksXHJcblx0XHRcdGFsbG93TnVsbDogZmFsc2VcclxuXHRcdH0sXHJcblx0XHRcclxuXHRcdHJlZ1VsdGltYUVkaWNhbzp7XHJcblx0XHRcdHR5cGU6IERhdGFUeXBlcy5TVFJJTkcoMjU2KSxcclxuXHRcdFx0YWxsb3dOdWxsOiBmYWxzZVxyXG5cdFx0fSxcclxuXHJcblx0XHRmb3RvVWx0aW1vVXNlcjoge1xyXG5cdFx0XHR0eXBlOiBEYXRhVHlwZXMuQkxPQixcclxuXHRcdFx0YWxsb3dOdWxsOiBmYWxzZSxcclxuXHRcdFx0Z2V0KCkge1xyXG5cdFx0XHRcdHJldHVybiB0aGlzLmdldERhdGFWYWx1ZSgnZm90b1VsdGltb1VzZXInKS50b1N0cmluZygndXRmOCcpO1xyXG5cdFx0XHQgIH0sXHJcblx0XHR9XHJcblx0fSwge1xyXG5cdFx0dGFibGVOYW1lOiAncGxhY2FzX2VtYnJhdGV4JyxcclxuXHRcdHRpbWVzdGFtcHM6IGZhbHNlXHJcblx0fSk7XHJcbn07XHJcbiIsIlxyXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKHNlcXVlbGl6ZSwgRGF0YVR5cGVzKSB7XHJcblx0cmV0dXJuIHNlcXVlbGl6ZS5kZWZpbmUoJ3BsYWNhc193ZW50ZXgnLCB7XHJcblx0XHRpZFBsYWNhOiB7XHJcblx0XHRcdHR5cGU6IERhdGFUeXBlcy5NRURJVU1JTlQoOCksXHJcblx0XHRcdGFsbG93TnVsbDogZmFsc2UsXHJcblx0XHRcdHByaW1hcnlLZXk6IHRydWUsXHJcblx0XHRcdGF1dG9JbmNyZW1lbnQ6IHRydWVcclxuXHRcdH0sXHJcblx0XHRub21lUGxhY2E6IHtcclxuXHRcdFx0dHlwZTogRGF0YVR5cGVzLlNUUklORygyNTYpLFxyXG5cdFx0XHRhbGxvd051bGw6IGZhbHNlXHJcblx0XHR9LFxyXG5cdFx0cXVhbnRpZGFkZToge1xyXG5cdFx0XHR0eXBlOiBEYXRhVHlwZXMuSU5URUdFUixcclxuXHRcdFx0YWxsb3dOdWxsOiBmYWxzZVxyXG5cdFx0fSxcclxuXHRcdHNpdHVhY2FvOiB7XHJcblx0XHRcdHR5cGU6IERhdGFUeXBlcy5TVFJJTkcoMjU2KSxcclxuXHRcdFx0YWxsb3dOdWxsOiBmYWxzZVxyXG5cdFx0fSxcclxuXHJcblx0XHRxdGRQYXJhU2l0dWFjYW9CYWl4YToge1xyXG5cdFx0XHR0eXBlOiBEYXRhVHlwZXMuSU5URUdFUixcclxuXHRcdFx0YWxsb3dOdWxsOiBmYWxzZVxyXG5cdFx0fSxcclxuXHJcblx0XHRxdGRQYXJhU2l0dWFjYW9Pazoge1xyXG5cdFx0XHR0eXBlOiBEYXRhVHlwZXMuSU5URUdFUixcclxuXHRcdFx0YWxsb3dOdWxsOiBmYWxzZVxyXG5cdFx0fSxcclxuXHJcblx0XHRkYXRhVWx0aW1hRWRpY2FvOiB7XHJcblx0XHRcdHR5cGU6ICdUSU1FU1RBTVAnLFxyXG5cdFx0XHRkZWZhdWx0VmFsdWU6IERhdGFUeXBlcy5saXRlcmFsKCdDVVJSRU5UX1RJTUVTVEFNUCcpLFxyXG5cdFx0XHRhbGxvd051bGw6IGZhbHNlXHJcblx0XHR9LFxyXG5cclxuXHRcdGxvY2FsOiB7XHJcblx0XHRcdHR5cGU6IERhdGFUeXBlcy5TVFJJTkcoMjU2KSxcclxuXHRcdFx0YWxsb3dOdWxsOiBmYWxzZVxyXG5cdFx0fSxcclxuXHRcdFxyXG5cdFx0cmVnVWx0aW1hRWRpY2FvOntcclxuXHRcdFx0dHlwZTogRGF0YVR5cGVzLlNUUklORygyNTYpLFxyXG5cdFx0XHRhbGxvd051bGw6IGZhbHNlXHJcblx0XHR9LFxyXG5cclxuXHRcdGZvdG9VbHRpbW9Vc2VyOiB7XHJcblx0XHRcdHR5cGU6IERhdGFUeXBlcy5CTE9CLFxyXG5cdFx0XHRhbGxvd051bGw6IGZhbHNlLFxyXG5cdFx0XHRnZXQoKSB7XHJcblx0XHRcdFx0cmV0dXJuIHRoaXMuZ2V0RGF0YVZhbHVlKCdmb3RvVWx0aW1vVXNlcicpLnRvU3RyaW5nKCd1dGY4Jyk7XHJcblx0XHRcdCAgfSxcclxuXHRcdH1cclxuXHR9LCB7XHJcblx0XHR0YWJsZU5hbWU6ICdwbGFjYXNfd2VudGV4JyxcclxuXHRcdHRpbWVzdGFtcHM6IGZhbHNlXHJcblx0fSk7XHJcbn07XHJcbiIsIi8qIGpzaGludCBpbmRlbnQ6IDEgKi9cclxuXHJcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oc2VxdWVsaXplLCBEYXRhVHlwZXMpIHtcclxuXHRyZXR1cm4gc2VxdWVsaXplLmRlZmluZSgnYXR1YWxpemFfY29sYWJvcmFkb3InLCB7XHJcblx0XHRyZWdpc3Rybzoge1xyXG5cdFx0XHR0eXBlOiBEYXRhVHlwZXMuU1RSSU5HKDE2KSxcclxuXHRcdFx0YWxsb3dOdWxsOiBmYWxzZSxcclxuXHRcdFx0cHJpbWFyeUtleTogdHJ1ZSxcclxuXHRcdFx0YXV0b0luY3JlbWVudDogdHJ1ZVxyXG5cdFx0fSxcclxuXHRcdG5vbWU6IHtcclxuXHRcdFx0dHlwZTogRGF0YVR5cGVzLlNUUklORygyNTYpLFxyXG5cdFx0XHRhbGxvd051bGw6IGZhbHNlXHJcblx0XHR9LFxyXG5cdFx0bGlzdGFfZnVuY2FvOiB7XHJcblx0XHRcdHR5cGU6IERhdGFUeXBlcy5TVFJJTkcoMjU2KSxcclxuXHRcdFx0YWxsb3dOdWxsOiBmYWxzZVxyXG5cdFx0fSxcclxuXHRcdGZvdG86IHtcclxuXHRcdFx0dHlwZTogRGF0YVR5cGVzLkJMT0IsXHJcblx0XHRcdGFsbG93TnVsbDogZmFsc2UsXHJcblx0XHRcdGdldCgpIHtcclxuXHRcdFx0XHRyZXR1cm4gdGhpcy5nZXREYXRhVmFsdWUoJ2ZvdG8nKS50b1N0cmluZygnYmFzZTY0Jyk7XHJcblx0XHRcdCAgfSxcclxuXHRcdH1cclxuXHR9LCB7XHJcblx0XHR0YWJsZU5hbWU6ICdhdHVhbGl6YV9jb2xhYm9yYWRvcicsXHJcblx0XHR0aW1lc3RhbXBzOiBmYWxzZVxyXG5cdH0pO1xyXG59OyIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oc2VxdWVsaXplLCBEYXRhVHlwZXMpIHtcclxuXHRyZXR1cm4gc2VxdWVsaXplLmRlZmluZSgndXNlcnNfc3lzdGVtJywge1xyXG5cdFx0cmVnaXN0cm86IHtcclxuXHRcdFx0dHlwZTogRGF0YVR5cGVzLlNUUklORygyMCksXHJcblx0XHRcdGFsbG93TnVsbDogZmFsc2UsXHJcblx0XHRcdHByaW1hcnlLZXk6IHRydWUsXHJcblx0XHR9LFxyXG5cdFx0c2VuaGE6IHtcclxuXHRcdFx0dHlwZTogRGF0YVR5cGVzLlNUUklORyg1MCksXHJcblx0XHRcdGFsbG93TnVsbDogZmFsc2VcclxuICAgICAgICB9LFxyXG4gICAgICAgIG5vbWU6IHtcclxuICAgICAgICAgICAgdHlwZTogRGF0YVR5cGVzLlNUUklORygxMDApLFxyXG4gICAgICAgICAgICBhbGxvd051bGw6IGZhbHNlXHJcblx0XHR9LFxyXG5cdFx0aXNfdmVyaWZpZWQ6IHtcclxuXHRcdFx0dHlwZTogRGF0YVR5cGVzLlNUUklORyg1KSxcclxuXHRcdFx0YWxsb3dOdWxsOmZhbHNlXHJcblxyXG5cdFx0fVxyXG5cdH0sIHtcclxuXHRcdHRhYmxlTmFtZTogJ3VzZXJzX3N5c3RlbScsXHJcblx0XHR0aW1lc3RhbXBzOiBmYWxzZVxyXG5cdH0pO1xyXG59OyIsImltcG9ydCAnQGJhYmVsL3BvbHlmaWxsJ1xyXG5pbXBvcnQgZXhwcmVzcyBmcm9tICdleHByZXNzJ1xyXG5jb25zdCBib2R5UGFyc2VyID0gcmVxdWlyZSgnYm9keS1wYXJzZXInKVxyXG5jb25zdCB7IEFwb2xsb1NlcnZlciB9ID0gcmVxdWlyZSgnYXBvbGxvLXNlcnZlci1leHByZXNzJylcclxuY29uc3QgY29ycyA9IHJlcXVpcmUoJ2NvcnMnKVxyXG5jb25zdCBhcHAgPSBleHByZXNzKClcclxuXHJcblxyXG5hcHAudXNlKGJvZHlQYXJzZXIuanNvbih7IGxpbWl0OiAnNW1iJyB9KSlcclxuYXBwLnVzZShib2R5UGFyc2VyLnVybGVuY29kZWQoeyBleHRlbmRlZDogdHJ1ZSB9KSlcclxuYXBwLnVzZShjb3JzKCkpXHJcblxyXG5jb25zdCBzZXJ2ZXIgPSBuZXcgQXBvbGxvU2VydmVyKHtcclxuICAgIG1vZHVsZXM6IFtcclxuICAgICAgICByZXF1aXJlKCcuL2dyYXBoLXFsL3VzZXJzJyksXHJcbiAgICAgICAgcmVxdWlyZSgnLi9ncmFwaC1xbC9mdW5jYW8tdXNlcicpLFxyXG4gICAgICAgIHJlcXVpcmUoJy4vZ3JhcGgtcWwvcGxhY2FzLWVtYnJhdGV4JyksXHJcbiAgICAgICAgcmVxdWlyZSgnLi9ncmFwaC1xbC9wbGFjYXMtd2VudGV4JyksXHJcbiAgICAgICAgcmVxdWlyZSgnLi9ncmFwaC1xbC92ZXJpZmllZC11c2VycycpXHJcbiAgICAgIC8vICByZXF1aXJlKCcuL2dyYXBoLXFsL2RhZG9zJylcclxuXHJcbiAgICBdLFxyXG59KVxyXG5cclxuc2VydmVyLmFwcGx5TWlkZGxld2FyZSh7IGFwcCB9KVxyXG5cclxuXHJcbmFwcC5saXN0ZW4oeyBwb3J0OiA1MDAwIH0sICgpID0+XHJcbiAgICBjb25zb2xlLmxvZyhg8J+agCBTZXJ2ZXIgcmVhZHkgYXQgaHR0cDovL2xvY2FsaG9zdDo1MDAwYCksXHJcbilcclxuXHJcblxyXG5cclxuXHJcbiIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIkBiYWJlbC9wb2x5ZmlsbFwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJhcG9sbG8tc2VydmVyLWV4cHJlc3NcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiYm9keS1wYXJzZXJcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiY29yc1wiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJleHByZXNzXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInNlcXVlbGl6ZVwiKTsiXSwic291cmNlUm9vdCI6IiJ9