'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.credentials = exports.userAgent = exports.header = exports.json = exports.form = exports.query = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _queryString = require('query-string');

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var FetchHttpClient = function () {
  function FetchHttpClient(baseUrl) {
    _classCallCheck(this, FetchHttpClient);

    this.baseUrl = baseUrl || '';
    this.middlewareId = 1;
    this.middlewares = [];
  }

  _createClass(FetchHttpClient, [{
    key: 'addMiddleware',
    value: function addMiddleware(middleware) {
      if (!middleware.middlewareId) {
        middleware.middlewareId = this.middlewareId++;
      }
      this.middlewares.push(middleware);

      return this;
    }
  }, {
    key: 'removeMiddleware',
    value: function removeMiddleware(middleware) {
      if (!middleware.middlewareId) {
        return this;
      }

      if (this.middlewares[middleware.middlewareId]) {
        delete this.middlewares[middleware.middlewareId];
      }

      return this;
    }
  }, {
    key: 'fetch',
    value: function (_fetch) {
      function fetch(_x) {
        return _fetch.apply(this, arguments);
      }

      fetch.toString = function () {
        return _fetch.toString();
      };

      return fetch;
    }(function () {
      var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(path) {
        var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
        var url, responseMiddlewares, requestPromise;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                if (!(typeof fetch !== 'function')) {
                  _context.next = 2;
                  break;
                }

                throw new TypeError('fetch() function not available');

              case 2:

                options = _extends({ headers: {} }, options);

                url = this.resolveUrl(path, options.uriParams || {});
                responseMiddlewares = [];
                requestPromise = this.middlewares.reduce(function (promise, middleware) {
                  return promise.then(function (request) {
                    var result = middleware(request);
                    if (typeof result === 'function') {
                      responseMiddlewares.push(result);
                    }
                    return result && typeof result !== 'function' ? result : request;
                  });
                }, Promise.resolve({ url: url, path: path, options: options })).then(function (request) {
                  return fetch(request.url, request.options);
                });
                return _context.abrupt('return', requestPromise.then(function (response) {
                  return responseMiddlewares.reduce(function (promise, middleware) {
                    return promise.then(function (response) {
                      return middleware(response) || response;
                    });
                  }, Promise.resolve(response));
                }));

              case 7:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      return function (_x3) {
        return _ref.apply(this, arguments);
      };
    }())
  }, {
    key: 'request',
    value: function () {
      var _ref2 = _asyncToGenerator(regeneratorRuntime.mark(function _callee2(path, method) {
        var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return this.fetch(path, _extends({}, options, { method: method }));

              case 2:
                return _context2.abrupt('return', _context2.sent);

              case 3:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function request(_x5, _x6) {
        return _ref2.apply(this, arguments);
      }

      return request;
    }()
  }, {
    key: 'get',
    value: function () {
      var _ref3 = _asyncToGenerator(regeneratorRuntime.mark(function _callee3(path) {
        var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.next = 2;
                return this.request(path, 'GET', options);

              case 2:
                return _context3.abrupt('return', _context3.sent);

              case 3:
              case 'end':
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function get(_x8) {
        return _ref3.apply(this, arguments);
      }

      return get;
    }()
  }, {
    key: 'post',
    value: function () {
      var _ref4 = _asyncToGenerator(regeneratorRuntime.mark(function _callee4(path) {
        var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                _context4.next = 2;
                return this.request(path, 'POST', options);

              case 2:
                return _context4.abrupt('return', _context4.sent);

              case 3:
              case 'end':
                return _context4.stop();
            }
          }
        }, _callee4, this);
      }));

      function post(_x10) {
        return _ref4.apply(this, arguments);
      }

      return post;
    }()
  }, {
    key: 'put',
    value: function () {
      var _ref5 = _asyncToGenerator(regeneratorRuntime.mark(function _callee5(path) {
        var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
        return regeneratorRuntime.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                _context5.next = 2;
                return this.request(path, 'PUT', options);

              case 2:
                return _context5.abrupt('return', _context5.sent);

              case 3:
              case 'end':
                return _context5.stop();
            }
          }
        }, _callee5, this);
      }));

      function put(_x12) {
        return _ref5.apply(this, arguments);
      }

      return put;
    }()
  }, {
    key: 'delete',
    value: function () {
      var _ref6 = _asyncToGenerator(regeneratorRuntime.mark(function _callee6(path) {
        var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
        return regeneratorRuntime.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                _context6.next = 2;
                return this.request(path, 'DELETE', options);

              case 2:
                return _context6.abrupt('return', _context6.sent);

              case 3:
              case 'end':
                return _context6.stop();
            }
          }
        }, _callee6, this);
      }));

      function _delete(_x14) {
        return _ref6.apply(this, arguments);
      }

      return _delete;
    }()
  }, {
    key: 'patch',
    value: function () {
      var _ref7 = _asyncToGenerator(regeneratorRuntime.mark(function _callee7(path) {
        var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
        return regeneratorRuntime.wrap(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                _context7.next = 2;
                return this.request(path, 'PATCH', options);

              case 2:
                return _context7.abrupt('return', _context7.sent);

              case 3:
              case 'end':
                return _context7.stop();
            }
          }
        }, _callee7, this);
      }));

      function patch(_x16) {
        return _ref7.apply(this, arguments);
      }

      return patch;
    }()
  }, {
    key: 'resolveUrl',
    value: function resolveUrl(path) {
      var variables = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

      if (path.toLowerCase().startsWith('http://') || path.toLowerCase().startsWith('https://') || path.startsWith('//')) {
        return path;
      }

      var baseUrl = this.baseUrl.replace(/\/+$/g, '');
      var fullUrl = '';

      if (path.startsWith('/')) {
        var rootPos = baseUrl.indexOf('/', baseUrl.indexOf('//') + 2);
        fullUrl = baseUrl.substr(0, rootPos === -1 ? undefined : rootPos) + path;
      } else {
        fullUrl = baseUrl + '/' + path;
      }

      fullUrl = fullUrl.replace(/\{(\w+)\}/ig, function (match, group) {
        if (!variables[group]) throw new Error('Unknown path variable \'' + group + '\'.');
        return encodeURIComponent(variables[group]);
      });

      return fullUrl;
    }
  }]);

  return FetchHttpClient;
}();

exports.default = FetchHttpClient;
var query = exports.query = function query() {
  return function (request) {
    if (request.options.query) {
      var queryString = (0, _queryString.stringify)(request.options.query);
      if (request.url.indexOf('?') === -1) {
        request.url = request.url.concat('?');
      }
      if (request.url.endsWith('&') || request.url.endsWith('?')) {
        request.url = request.url.concat(queryString);
      } else {
        request.url = request.url.concat('&', queryString);
      }
    }
  };
};

var form = exports.form = function form() {
  return function (request) {
    if (request.options.form) {
      request.options.body = (0, _queryString.stringify)(request.options.form);
      request.options.headers['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';
    }
  };
};

var json = exports.json = function json() {
  return function (request) {
    if (request.options.json) {
      request.options.body = JSON.stringify(request.options.json);
      request.options.headers['Content-Type'] = 'application/json';
    }
    request.options.headers.Accept = 'application/json';

    return function (response) {
      var contentType = response.headers.get('Content-Type') || '';
      if (contentType.indexOf('json') === -1) return response;
      return response.json().then(function (json) {
        return response.jsonData = json, response;
      });
    };
  };
};

var header = exports.header = function header(headers) {
  return function (request) {
    request.options.headers = _extends({}, request.options.headers, headers);
  };
};

var userAgent = exports.userAgent = function userAgent(ua) {
  return function (request) {
    var uaSegments = [];
    Object.keys(ua).forEach(function (key) {
      return uaSegments.push(key + '/' + ua[key]);
    });
    request.options.headers['User-Agent'] = uaSegments.join(' ');
  };
};

var credentials = exports.credentials = function credentials(_credentials) {
  return function (request) {
    request.options.credentials = _credentials;
  };
};