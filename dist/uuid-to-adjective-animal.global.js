(() => {
  var __create = Object.create;
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getProtoOf = Object.getPrototypeOf;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __require = /* @__PURE__ */ ((x) => typeof require !== "undefined" ? require : typeof Proxy !== "undefined" ? new Proxy(x, {
    get: (a, b) => (typeof require !== "undefined" ? require : a)[b]
  }) : x)(function(x) {
    if (typeof require !== "undefined")
      return require.apply(this, arguments);
    throw new Error('Dynamic require of "' + x + '" is not supported');
  });
  var __commonJS = (cb, mod) => function __require2() {
    return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target, mod));

  // node_modules/uuid/dist/rng.js
  var require_rng = __commonJS({
    "node_modules/uuid/dist/rng.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.default = rng;
      var _crypto = _interopRequireDefault(__require("crypto"));
      function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : { default: obj };
      }
      var rnds8Pool = new Uint8Array(256);
      var poolPtr = rnds8Pool.length;
      function rng() {
        if (poolPtr > rnds8Pool.length - 16) {
          _crypto.default.randomFillSync(rnds8Pool);
          poolPtr = 0;
        }
        return rnds8Pool.slice(poolPtr, poolPtr += 16);
      }
    }
  });

  // node_modules/uuid/dist/regex.js
  var require_regex = __commonJS({
    "node_modules/uuid/dist/regex.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.default = void 0;
      var _default = /^(?:[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}|00000000-0000-0000-0000-000000000000)$/i;
      exports.default = _default;
    }
  });

  // node_modules/uuid/dist/validate.js
  var require_validate = __commonJS({
    "node_modules/uuid/dist/validate.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.default = void 0;
      var _regex = _interopRequireDefault(require_regex());
      function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : { default: obj };
      }
      function validate2(uuid2) {
        return typeof uuid2 === "string" && _regex.default.test(uuid2);
      }
      var _default = validate2;
      exports.default = _default;
    }
  });

  // node_modules/uuid/dist/stringify.js
  var require_stringify = __commonJS({
    "node_modules/uuid/dist/stringify.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.default = void 0;
      var _validate = _interopRequireDefault(require_validate());
      function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : { default: obj };
      }
      var byteToHex = [];
      for (let i = 0; i < 256; ++i) {
        byteToHex.push((i + 256).toString(16).substr(1));
      }
      function stringify2(arr, offset = 0) {
        const uuid2 = (byteToHex[arr[offset + 0]] + byteToHex[arr[offset + 1]] + byteToHex[arr[offset + 2]] + byteToHex[arr[offset + 3]] + "-" + byteToHex[arr[offset + 4]] + byteToHex[arr[offset + 5]] + "-" + byteToHex[arr[offset + 6]] + byteToHex[arr[offset + 7]] + "-" + byteToHex[arr[offset + 8]] + byteToHex[arr[offset + 9]] + "-" + byteToHex[arr[offset + 10]] + byteToHex[arr[offset + 11]] + byteToHex[arr[offset + 12]] + byteToHex[arr[offset + 13]] + byteToHex[arr[offset + 14]] + byteToHex[arr[offset + 15]]).toLowerCase();
        if (!(0, _validate.default)(uuid2)) {
          throw TypeError("Stringified UUID is invalid");
        }
        return uuid2;
      }
      var _default = stringify2;
      exports.default = _default;
    }
  });

  // node_modules/uuid/dist/v1.js
  var require_v1 = __commonJS({
    "node_modules/uuid/dist/v1.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.default = void 0;
      var _rng = _interopRequireDefault(require_rng());
      var _stringify = _interopRequireDefault(require_stringify());
      function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : { default: obj };
      }
      var _nodeId;
      var _clockseq;
      var _lastMSecs = 0;
      var _lastNSecs = 0;
      function v12(options, buf, offset) {
        let i = buf && offset || 0;
        const b = buf || new Array(16);
        options = options || {};
        let node = options.node || _nodeId;
        let clockseq = options.clockseq !== void 0 ? options.clockseq : _clockseq;
        if (node == null || clockseq == null) {
          const seedBytes = options.random || (options.rng || _rng.default)();
          if (node == null) {
            node = _nodeId = [seedBytes[0] | 1, seedBytes[1], seedBytes[2], seedBytes[3], seedBytes[4], seedBytes[5]];
          }
          if (clockseq == null) {
            clockseq = _clockseq = (seedBytes[6] << 8 | seedBytes[7]) & 16383;
          }
        }
        let msecs = options.msecs !== void 0 ? options.msecs : Date.now();
        let nsecs = options.nsecs !== void 0 ? options.nsecs : _lastNSecs + 1;
        const dt = msecs - _lastMSecs + (nsecs - _lastNSecs) / 1e4;
        if (dt < 0 && options.clockseq === void 0) {
          clockseq = clockseq + 1 & 16383;
        }
        if ((dt < 0 || msecs > _lastMSecs) && options.nsecs === void 0) {
          nsecs = 0;
        }
        if (nsecs >= 1e4) {
          throw new Error("uuid.v1(): Can't create more than 10M uuids/sec");
        }
        _lastMSecs = msecs;
        _lastNSecs = nsecs;
        _clockseq = clockseq;
        msecs += 122192928e5;
        const tl = ((msecs & 268435455) * 1e4 + nsecs) % 4294967296;
        b[i++] = tl >>> 24 & 255;
        b[i++] = tl >>> 16 & 255;
        b[i++] = tl >>> 8 & 255;
        b[i++] = tl & 255;
        const tmh = msecs / 4294967296 * 1e4 & 268435455;
        b[i++] = tmh >>> 8 & 255;
        b[i++] = tmh & 255;
        b[i++] = tmh >>> 24 & 15 | 16;
        b[i++] = tmh >>> 16 & 255;
        b[i++] = clockseq >>> 8 | 128;
        b[i++] = clockseq & 255;
        for (let n = 0; n < 6; ++n) {
          b[i + n] = node[n];
        }
        return buf || (0, _stringify.default)(b);
      }
      var _default = v12;
      exports.default = _default;
    }
  });

  // node_modules/uuid/dist/parse.js
  var require_parse = __commonJS({
    "node_modules/uuid/dist/parse.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.default = void 0;
      var _validate = _interopRequireDefault(require_validate());
      function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : { default: obj };
      }
      function parse2(uuid2) {
        if (!(0, _validate.default)(uuid2)) {
          throw TypeError("Invalid UUID");
        }
        let v;
        const arr = new Uint8Array(16);
        arr[0] = (v = parseInt(uuid2.slice(0, 8), 16)) >>> 24;
        arr[1] = v >>> 16 & 255;
        arr[2] = v >>> 8 & 255;
        arr[3] = v & 255;
        arr[4] = (v = parseInt(uuid2.slice(9, 13), 16)) >>> 8;
        arr[5] = v & 255;
        arr[6] = (v = parseInt(uuid2.slice(14, 18), 16)) >>> 8;
        arr[7] = v & 255;
        arr[8] = (v = parseInt(uuid2.slice(19, 23), 16)) >>> 8;
        arr[9] = v & 255;
        arr[10] = (v = parseInt(uuid2.slice(24, 36), 16)) / 1099511627776 & 255;
        arr[11] = v / 4294967296 & 255;
        arr[12] = v >>> 24 & 255;
        arr[13] = v >>> 16 & 255;
        arr[14] = v >>> 8 & 255;
        arr[15] = v & 255;
        return arr;
      }
      var _default = parse2;
      exports.default = _default;
    }
  });

  // node_modules/uuid/dist/v35.js
  var require_v35 = __commonJS({
    "node_modules/uuid/dist/v35.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.default = _default;
      exports.URL = exports.DNS = void 0;
      var _stringify = _interopRequireDefault(require_stringify());
      var _parse = _interopRequireDefault(require_parse());
      function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : { default: obj };
      }
      function stringToBytes(str) {
        str = unescape(encodeURIComponent(str));
        const bytes = [];
        for (let i = 0; i < str.length; ++i) {
          bytes.push(str.charCodeAt(i));
        }
        return bytes;
      }
      var DNS = "6ba7b810-9dad-11d1-80b4-00c04fd430c8";
      exports.DNS = DNS;
      var URL = "6ba7b811-9dad-11d1-80b4-00c04fd430c8";
      exports.URL = URL;
      function _default(name, version2, hashfunc) {
        function generateUUID(value, namespace, buf, offset) {
          if (typeof value === "string") {
            value = stringToBytes(value);
          }
          if (typeof namespace === "string") {
            namespace = (0, _parse.default)(namespace);
          }
          if (namespace.length !== 16) {
            throw TypeError("Namespace must be array-like (16 iterable integer values, 0-255)");
          }
          let bytes = new Uint8Array(16 + value.length);
          bytes.set(namespace);
          bytes.set(value, namespace.length);
          bytes = hashfunc(bytes);
          bytes[6] = bytes[6] & 15 | version2;
          bytes[8] = bytes[8] & 63 | 128;
          if (buf) {
            offset = offset || 0;
            for (let i = 0; i < 16; ++i) {
              buf[offset + i] = bytes[i];
            }
            return buf;
          }
          return (0, _stringify.default)(bytes);
        }
        try {
          generateUUID.name = name;
        } catch (err) {
        }
        generateUUID.DNS = DNS;
        generateUUID.URL = URL;
        return generateUUID;
      }
    }
  });

  // node_modules/uuid/dist/md5.js
  var require_md5 = __commonJS({
    "node_modules/uuid/dist/md5.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.default = void 0;
      var _crypto = _interopRequireDefault(__require("crypto"));
      function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : { default: obj };
      }
      function md5(bytes) {
        if (Array.isArray(bytes)) {
          bytes = Buffer.from(bytes);
        } else if (typeof bytes === "string") {
          bytes = Buffer.from(bytes, "utf8");
        }
        return _crypto.default.createHash("md5").update(bytes).digest();
      }
      var _default = md5;
      exports.default = _default;
    }
  });

  // node_modules/uuid/dist/v3.js
  var require_v3 = __commonJS({
    "node_modules/uuid/dist/v3.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.default = void 0;
      var _v = _interopRequireDefault(require_v35());
      var _md = _interopRequireDefault(require_md5());
      function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : { default: obj };
      }
      var v32 = (0, _v.default)("v3", 48, _md.default);
      var _default = v32;
      exports.default = _default;
    }
  });

  // node_modules/uuid/dist/v4.js
  var require_v4 = __commonJS({
    "node_modules/uuid/dist/v4.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.default = void 0;
      var _rng = _interopRequireDefault(require_rng());
      var _stringify = _interopRequireDefault(require_stringify());
      function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : { default: obj };
      }
      function v42(options, buf, offset) {
        options = options || {};
        const rnds = options.random || (options.rng || _rng.default)();
        rnds[6] = rnds[6] & 15 | 64;
        rnds[8] = rnds[8] & 63 | 128;
        if (buf) {
          offset = offset || 0;
          for (let i = 0; i < 16; ++i) {
            buf[offset + i] = rnds[i];
          }
          return buf;
        }
        return (0, _stringify.default)(rnds);
      }
      var _default = v42;
      exports.default = _default;
    }
  });

  // node_modules/uuid/dist/sha1.js
  var require_sha1 = __commonJS({
    "node_modules/uuid/dist/sha1.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.default = void 0;
      var _crypto = _interopRequireDefault(__require("crypto"));
      function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : { default: obj };
      }
      function sha1(bytes) {
        if (Array.isArray(bytes)) {
          bytes = Buffer.from(bytes);
        } else if (typeof bytes === "string") {
          bytes = Buffer.from(bytes, "utf8");
        }
        return _crypto.default.createHash("sha1").update(bytes).digest();
      }
      var _default = sha1;
      exports.default = _default;
    }
  });

  // node_modules/uuid/dist/v5.js
  var require_v5 = __commonJS({
    "node_modules/uuid/dist/v5.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.default = void 0;
      var _v = _interopRequireDefault(require_v35());
      var _sha = _interopRequireDefault(require_sha1());
      function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : { default: obj };
      }
      var v52 = (0, _v.default)("v5", 80, _sha.default);
      var _default = v52;
      exports.default = _default;
    }
  });

  // node_modules/uuid/dist/nil.js
  var require_nil = __commonJS({
    "node_modules/uuid/dist/nil.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.default = void 0;
      var _default = "00000000-0000-0000-0000-000000000000";
      exports.default = _default;
    }
  });

  // node_modules/uuid/dist/version.js
  var require_version = __commonJS({
    "node_modules/uuid/dist/version.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.default = void 0;
      var _validate = _interopRequireDefault(require_validate());
      function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : { default: obj };
      }
      function version2(uuid2) {
        if (!(0, _validate.default)(uuid2)) {
          throw TypeError("Invalid UUID");
        }
        return parseInt(uuid2.substr(14, 1), 16);
      }
      var _default = version2;
      exports.default = _default;
    }
  });

  // node_modules/uuid/dist/index.js
  var require_dist = __commonJS({
    "node_modules/uuid/dist/index.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      Object.defineProperty(exports, "v1", {
        enumerable: true,
        get: function() {
          return _v.default;
        }
      });
      Object.defineProperty(exports, "v3", {
        enumerable: true,
        get: function() {
          return _v2.default;
        }
      });
      Object.defineProperty(exports, "v4", {
        enumerable: true,
        get: function() {
          return _v3.default;
        }
      });
      Object.defineProperty(exports, "v5", {
        enumerable: true,
        get: function() {
          return _v4.default;
        }
      });
      Object.defineProperty(exports, "NIL", {
        enumerable: true,
        get: function() {
          return _nil.default;
        }
      });
      Object.defineProperty(exports, "version", {
        enumerable: true,
        get: function() {
          return _version.default;
        }
      });
      Object.defineProperty(exports, "validate", {
        enumerable: true,
        get: function() {
          return _validate.default;
        }
      });
      Object.defineProperty(exports, "stringify", {
        enumerable: true,
        get: function() {
          return _stringify.default;
        }
      });
      Object.defineProperty(exports, "parse", {
        enumerable: true,
        get: function() {
          return _parse.default;
        }
      });
      var _v = _interopRequireDefault(require_v1());
      var _v2 = _interopRequireDefault(require_v3());
      var _v3 = _interopRequireDefault(require_v4());
      var _v4 = _interopRequireDefault(require_v5());
      var _nil = _interopRequireDefault(require_nil());
      var _version = _interopRequireDefault(require_version());
      var _validate = _interopRequireDefault(require_validate());
      var _stringify = _interopRequireDefault(require_stringify());
      var _parse = _interopRequireDefault(require_parse());
      function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : { default: obj };
      }
    }
  });

  // node_modules/uuid/wrapper.mjs
  var import_dist = __toESM(require_dist(), 1);
  var v1 = import_dist.default.v1;
  var v3 = import_dist.default.v3;
  var v4 = import_dist.default.v4;
  var v5 = import_dist.default.v5;
  var NIL = import_dist.default.NIL;
  var version = import_dist.default.version;
  var validate = import_dist.default.validate;
  var stringify = import_dist.default.stringify;
  var parse = import_dist.default.parse;

  // src/animals.ts
  var animals = [
    "Aardvark",
    "Albatross",
    "Alligator",
    "Alpaca",
    "American bison",
    "Ant",
    "Anteater",
    "Antelope",
    "Ape",
    "Armadillo",
    "Ass/donkey",
    "Baboon",
    "Badger",
    "Barracuda",
    "Bat",
    "Bear",
    "Beaver",
    "Bee",
    "Beetle",
    "Binturong",
    "Bird",
    "Bison",
    "Bluebird",
    "Boar/wild pig",
    "Bobcat",
    "Budgerigar/budgie",
    "Buffalo",
    "Butterfly",
    "Camel",
    "Capybara",
    "Caracal",
    "Caribou",
    "Cassowary",
    "Cat",
    "Caterpillar",
    "Cattle",
    "Chamois",
    "Cheetah",
    "Chicken",
    "Chimpanzee",
    "Chinchilla",
    "Chough",
    "Coati",
    "Cobra",
    "Cockroach",
    "Cod",
    "Cormorant",
    "Cougar",
    "Coyote",
    "Crab",
    "Crane",
    "Cricket",
    "Crocodile",
    "Crow",
    "Cuckoo",
    "Curlew",
    "Deer",
    "Dhole",
    "Dingo",
    "Dinosaur",
    "Dog",
    "Dogfish",
    "Dolphin",
    "Donkey",
    "Dove",
    "Dragonfly",
    "Duck",
    "Dugong",
    "Dunlin",
    "Eagle",
    "Echidna",
    "Eel",
    "Eland",
    "Elephant",
    "Elephant seal",
    "Elk/wapiti",
    "Emu",
    "Falcon",
    "Ferret",
    "Finch",
    "Fish",
    "Fisher",
    "Flamingo",
    "Fly",
    "Fossa",
    "Fox",
    "Frog",
    "Gaur",
    "Gazelle",
    "Gecko",
    "Genet",
    "Gerbil",
    "Giant panda",
    "Giraffe",
    "Gnat",
    "Gnu",
    "Goat",
    "Goldfinch",
    "Goosander",
    "Goose",
    "Gorilla",
    "Goshawk",
    "Grasshopper",
    "Grouse",
    "Guanaco",
    "Guinea fowl",
    "Guinea pig",
    "Gull",
    "Hamster",
    "Hare",
    "Hawk",
    "Hedgehog",
    "Hermit crab",
    "Heron",
    "Herring",
    "Hippopotamus",
    "Hoatzin",
    "Hoopoe",
    "Hornet",
    "Horse",
    "Human",
    "Hummingbird",
    "Hyena",
    "Ibex",
    "Ibis",
    "Iguana",
    "Impala",
    "Jackal",
    "Jaguar",
    "Jay",
    "Jellyfish",
    "Junglefowl",
    "Kangaroo",
    "Kingbird",
    "Kingfisher",
    "Kinkajou",
    "Kite",
    "Koala",
    "Kodkod",
    "Komodo dragon",
    "Kookaburra",
    "Kouprey",
    "Kowari",
    "Langur",
    "Lapwing",
    "Lark",
    "Lechwe",
    "Lemur",
    "Leopard",
    "Lion",
    "Lizard",
    "Llama",
    "Lobster",
    "Locust",
    "Loris",
    "Louse",
    "Lynx",
    "Lyrebird",
    "Macaque",
    "Macaw",
    "Magpie",
    "Mallard",
    "Mammoth",
    "Manatee",
    "Mandrill",
    "Manta ray",
    "Marmoset",
    "Marmot",
    "Meerkat",
    "Mink",
    "Mole",
    "Mongoose",
    "Monkey",
    "Moose",
    "Mosquito",
    "Mouse",
    "Myna",
    "Narwhal",
    "Newt",
    "Nightingale",
    "Nilgai",
    "Ocelot",
    "Octopus",
    "Okapi",
    "Olingo",
    "Opossum",
    "Orangutan",
    "Oryx/gemsbok",
    "Ostrich",
    "Otter",
    "Ox",
    "Owl",
    "Oyster",
    "Panther",
    "Parrot",
    "Panda",
    "Partridge",
    "Peafowl",
    "Pelican",
    "Penguin",
    "Pheasant",
    "Pig",
    "Pigeon",
    "Pika",
    "Polar bear",
    "Pony",
    "Porcupine",
    "Porpoise",
    "Prairie dog",
    "Pug",
    "Quail",
    "Quelea",
    "Quetzal",
    "Rabbit",
    "Raccoon",
    "Ram",
    "Rat",
    "Raven",
    "Red deer",
    "Red panda",
    "Reindeer/caribou",
    "Rhea",
    "Rhinoceros",
    "Rook",
    "Saki",
    "Salamander",
    "Salmon",
    "Sand dollar",
    "Sandpiper",
    "Sardine",
    "Sassaby",
    "Sea lion",
    "Seahorse",
    "Seal",
    "Serval",
    "Shark",
    "Sheep",
    "Shrew",
    "Shrike",
    "Siamang",
    "Skink",
    "Skipper",
    "Skunk",
    "Sloth",
    "Snail",
    "Snake",
    "Spider",
    "Spoonbill",
    "Squid",
    "Squirrel",
    "Starfish",
    "Starling",
    "Stilt",
    "Swan",
    "Tamarin",
    "Tapir",
    "Tarsier",
    "Termite",
    "Thrush",
    "Tiger",
    "Toad",
    "Topi",
    "Toucan",
    "Turaco",
    "Turkey",
    "Turtle",
    "Vicu\xF1a",
    "Vinegaroon",
    "Viper",
    "Vulture",
    "Wallaby",
    "Walrus",
    "Wasp",
    "Water buffalo",
    "Waxwing",
    "Weasel",
    "Whale",
    "Wildebeest",
    "Wobbegong",
    "Wolf",
    "Wolverine",
    "Wombat",
    "Woodpecker",
    "Worm",
    "Wren",
    "Yak",
    "Zebra"
  ];

  // src/adjectives.ts
  var adjectives = [
    "Aback",
    "Abaft",
    "Abandoned",
    "Abashed",
    "Aberrant",
    "Abhorrent",
    "Abiding",
    "Abject",
    "Ablaze",
    "Able",
    "Abnormal",
    "Aboard",
    "Aboriginal",
    "Abortive",
    "Abounding",
    "Abrasive",
    "Abrupt",
    "Absent",
    "Absorbed",
    "Absorbing",
    "Abstracted",
    "Absurd",
    "Abundant",
    "Abusive",
    "Acceptable",
    "Accessible",
    "Accidental",
    "Accurate",
    "Acid",
    "Acidic",
    "Acoustic",
    "Acrid",
    "Actually",
    "Adamant",
    "Adorable",
    "Adventurous",
    "Aggressive",
    "Agitated",
    "Alert",
    "Aloof",
    "Amiable",
    "Amused",
    "Annoyed",
    "Antsy",
    "Anxious",
    "Appalling",
    "Appetizing",
    "Apprehensive",
    "Arrogant",
    "Ashamed",
    "Astonishing",
    "Attractive",
    "Average",
    "Bad",
    "Barbarous",
    "Bashful",
    "Batty",
    "Bawdy",
    "Beautiful",
    "Beefy",
    "Befitting",
    "Belligerent",
    "Beneficial",
    "Bent",
    "Berserk",
    "Best",
    "Better",
    "Bewildered",
    "Big",
    "Billowy",
    "Bite-sized",
    "Biting",
    "Bitter",
    "Bizarre",
    "Black",
    "Black-and-white",
    "Bland",
    "Bloody",
    "Blue",
    "Blue-eyed",
    "Blushing",
    "Boiling",
    "Boorish",
    "Bored",
    "Boring",
    "Bouncy",
    "Boundless",
    "Brainy",
    "Brash",
    "Brave",
    "Brawny",
    "Breakable",
    "Breezy",
    "Brief",
    "Bright",
    "Broad",
    "Broken",
    "Brown",
    "Bulky",
    "Bumpy",
    "Burly",
    "Bustling",
    "Busy",
    "Cagey",
    "Calculating",
    "Callous",
    "Calm",
    "Capable",
    "Capricious",
    "Careful",
    "Careless",
    "Caring",
    "Cautious",
    "Ceaseless",
    "Certain",
    "Changeable",
    "Charming",
    "Cheap",
    "Cheeky",
    "Cheerful",
    "Chemical",
    "Chief",
    "Childlike",
    "Chilly",
    "Chivalrous",
    "Chubby",
    "Chunky",
    "Clammy",
    "Classy",
    "Clean",
    "Clear",
    "Clever",
    "Cloistered",
    "Closed",
    "Cloudy",
    "Clueless",
    "Clumsy",
    "Cluttered",
    "Coherent",
    "Cold",
    "Colorful",
    "Colossal",
    "Combative",
    "Comfortable",
    "Common",
    "Complete",
    "Complex",
    "Concerned",
    "Condemned",
    "Condescending",
    "Confused",
    "Conscious",
    "Contemplative",
    "Convincing",
    "Convoluted",
    "Cooing",
    "Cool",
    "Cooperative",
    "Coordinated",
    "Corny",
    "Costly",
    "Courageous",
    "Cowardly",
    "Crabby",
    "Craven",
    "Crazy",
    "Creepy",
    "Crooked",
    "Cruel",
    "Cuddly",
    "Cultured",
    "Cumbersome",
    "Curious",
    "Curly",
    "Curved",
    "Curvy",
    "Cut",
    "Cynical",
    "Daffy",
    "Daily",
    "Damaged",
    "Damaging",
    "Damp",
    "Dangerous",
    "Dapper",
    "Dark",
    "Dashing",
    "Dazzling",
    "Dead",
    "Deadpan",
    "Deafening",
    "Dear",
    "Debonair",
    "Decayed",
    "Deceitful",
    "Decisive",
    "Decorous",
    "Deep",
    "Deeply",
    "Defeated",
    "Defective",
    "Defiant",
    "Delicate",
    "Delicious",
    "Delightful",
    "Delirious",
    "Demonic",
    "Dependent",
    "Depraved",
    "Depressed",
    "Deranged",
    "Descriptive",
    "Deserted",
    "Despicable",
    "Detailed",
    "Determined",
    "Devilish",
    "Dilapidated",
    "Diminutive",
    "Disgusted",
    "Distinct",
    "Distraught",
    "Distressed",
    "Disturbed",
    "Dizzy",
    "Drab",
    "Drained",
    "Dull",
    "Eager",
    "Early",
    "Earsplitting",
    "Earthy",
    "Easy",
    "Eatable",
    "Economic",
    "Ecstatic",
    "Educated",
    "Efficacious",
    "Efficient",
    "Eight",
    "Elastic",
    "Elated",
    "Elderly",
    "Electric",
    "Elegant",
    "Elfin",
    "Elite",
    "Emaciated",
    "Embarrassed",
    "Eminent",
    "Empty",
    "Enchanted",
    "Enchanting",
    "Encouraging",
    "Endurable",
    "Energetic",
    "Enormous",
    "Entertaining",
    "Enthusiastic",
    "Envious",
    "Equable",
    "Equal",
    "Erect",
    "Erratic",
    "Ethereal",
    "Exasperated",
    "Excited",
    "Exhilarated",
    "Extensive",
    "Exuberant",
    "Fabulous",
    "Faded",
    "Faint",
    "Fair",
    "Faithful",
    "Fallacious",
    "False",
    "Familiar",
    "Famous",
    "Fanatical",
    "Fancy",
    "Fantastic",
    "Far",
    "Far-flung",
    "Fascinated",
    "Fast",
    "Fat",
    "Faulty",
    "Fearful",
    "Fearless",
    "Feeble",
    "Feigned",
    "Female",
    "Fertile",
    "Festive",
    "Few",
    "Fierce",
    "Fierce",
    "Filthy",
    "Flat",
    "Floppy",
    "Fluttering",
    "Foolish",
    "Frantic",
    "Fresh",
    "Friendly",
    "Frightened",
    "Frothy",
    "Frustrating",
    "Funny",
    "Fuzzy",
    "Gabby",
    "Gainful",
    "Gamy",
    "Gaping",
    "Garrulous",
    "Gaudy",
    "General",
    "Gentle",
    "Ghastly",
    "Giant",
    "Giddy",
    "Gifted",
    "Gigantic",
    "Glamorous",
    "Gleaming",
    "Glib",
    "Glistening",
    "Glorious",
    "Glossy",
    "Godly",
    "Good",
    "Goofy",
    "Gorgeous",
    "Graceful",
    "Grandiose",
    "Grateful",
    "Gratis",
    "Gray",
    "Greasy",
    "Grieving",
    "Gritty",
    "Grotesque",
    "Grubby",
    "Grumpy",
    "Habitual",
    "Half",
    "Hallowed",
    "Halting",
    "Handsome",
    "Handsomely",
    "Handy",
    "Hanging",
    "Hapless",
    "Happy",
    "Hard",
    "Hard-to-find",
    "Harebrained",
    "Harmonious",
    "Harsh",
    "Hateful",
    "Heady",
    "Healthy",
    "Heartbreaking",
    "Heavenly",
    "Heavy",
    "Hellish",
    "Helpful",
    "Helpless",
    "Hesitant",
    "Hideous",
    "High",
    "Highfalutin",
    "High-pitched",
    "Hilarious",
    "Hissing",
    "Historical",
    "Holistic",
    "Hollow",
    "Homeless",
    "Homely",
    "Honorable",
    "Horrible",
    "Horrific",
    "Hospitable",
    "Hot",
    "Huge",
    "Hulking",
    "Humdrum",
    "Humorous",
    "Hungry",
    "Hurried",
    "Hurt",
    "Hushed",
    "Husky",
    "Hypnotic",
    "Hysterical",
    "Icky",
    "Icy",
    "Ideal",
    "Idiotic",
    "Ignorant",
    "Ill",
    "Illegal",
    "Ill-fated",
    "Ill-informed",
    "Illustrious",
    "Imaginary",
    "Immense",
    "Imminent",
    "Impartial",
    "Imperfect",
    "Impolite",
    "Important",
    "Imported",
    "Impossible",
    "Impressionable",
    "Incandescent",
    "Incompetent",
    "Inconclusive",
    "Incredible",
    "Industrious",
    "Inexpensive",
    "Infamous",
    "Innate",
    "Innocent",
    "Inquisitive",
    "Insidious",
    "Instinctive",
    "Intelligent",
    "Interesting",
    "Internal",
    "Intrigued",
    "Invincible",
    "Irate",
    "Irritable",
    "Irritating",
    "Itchy",
    "Jaded",
    "Jagged",
    "Jazzy",
    "Jealous",
    "Jittery",
    "Jobless",
    "Jolly",
    "Joyous",
    "Judicious",
    "Juicy",
    "Jumbled",
    "Jumpy",
    "Juvenile",
    "Kaput",
    "Keen",
    "Kind",
    "Kindhearted",
    "Kindly",
    "Knotty",
    "Knowing",
    "Known",
    "Labored",
    "Lackadaisical",
    "Lacking",
    "Lame",
    "Lamentable",
    "Languid",
    "Large",
    "Last",
    "Late",
    "Laughable",
    "Lavish",
    "Lazy",
    "Lean",
    "Learned",
    "Left",
    "Legal",
    "Lethal",
    "Level",
    "Lewd",
    "Light",
    "Like",
    "Likeable",
    "Limping",
    "Literate",
    "Little",
    "Lively",
    "Livid",
    "Living",
    "Lonely",
    "Long",
    "Longing",
    "Long-term",
    "Loose",
    "Lopsided",
    "Loud",
    "Loutish",
    "Lovely",
    "Loving",
    "Low",
    "Lowly",
    "Lucky",
    "Ludicrous",
    "Lumpy",
    "Lush",
    "Luxuriant",
    "Lying",
    "Lyrical",
    "Macabre",
    "Macho",
    "Maddening",
    "Madly",
    "Magenta",
    "Magical",
    "Magnificent",
    "Majestic",
    "Makeshift",
    "Male",
    "Malicious",
    "Mammoth",
    "Maniacal",
    "Many",
    "Marked",
    "Married",
    "Marvelous",
    "Massive",
    "Material",
    "Materialistic",
    "Mature",
    "Mean",
    "Measly",
    "Meaty",
    "Medical",
    "Meek",
    "Melancholy",
    "Mellow",
    "Melodic",
    "Melted",
    "Merciful",
    "Mere",
    "Messy",
    "Mighty",
    "Military",
    "Milky",
    "Mindless",
    "Miniature",
    "Minor",
    "Minute",
    "Miscreant",
    "Mistaken",
    "Misty",
    "Mixed",
    "Moaning",
    "Modern",
    "Moldy",
    "Momentous",
    "Moody",
    "Mortified",
    "Motionless",
    "Mountainous",
    "Muddled",
    "Muddy",
    "Mundane",
    "Murky",
    "Mushy",
    "Mute",
    "Mysterious",
    "Naive",
    "Nappy",
    "Narrow",
    "Nasty",
    "Natural",
    "Naughty",
    "Nauseating",
    "Near",
    "Neat",
    "Nebulous",
    "Necessary",
    "Needless",
    "Needy",
    "Neighborly",
    "Nervous",
    "New",
    "Next",
    "Nice",
    "Nifty",
    "Nimble",
    "Nine",
    "Nippy",
    "Noiseless",
    "Noisy",
    "Nonchalant",
    "Nondescript",
    "Nonsensical",
    "Nonstop",
    "Normal",
    "Nostalgic",
    "Nosy",
    "Noxious",
    "Null",
    "Numberless",
    "Numerous",
    "Nutritious",
    "Nutty",
    "Oafish",
    "Obedient",
    "Obeisant",
    "Obese",
    "Obnoxious",
    "Obscene",
    "Obsequious",
    "Observant",
    "Obsolete",
    "Obtainable",
    "Oceanic",
    "Odd",
    "Offbeat",
    "Old",
    "Old-fashioned",
    "Omniscient",
    "One",
    "Onerous",
    "Open",
    "Opposite",
    "Optimal",
    "Orange",
    "Ordinary",
    "Organic",
    "Ossified",
    "Outgoing",
    "Outrageous",
    "Outstanding",
    "Painful",
    "Painstaking",
    "Pale",
    "Paltry",
    "Panicky",
    "Panoramic",
    "Parallel",
    "Parched",
    "Parsimonious",
    "Past",
    "Pastoral",
    "Pathetic",
    "Peaceful",
    "Penitent",
    "Perfect",
    "Periodic",
    "Permissible",
    "Perpetual",
    "Petite",
    "Precious",
    "Prickly",
    "Proud",
    "Pungent",
    "Puny",
    "Quack",
    "Quaint",
    "Quarrelsome",
    "Questionable",
    "Quick",
    "Quickest",
    "Quiet",
    "Quirky",
    "Quixotic",
    "Quizzical",
    "Rabid",
    "Racial",
    "Ragged",
    "Rainy",
    "Rambunctious",
    "Rampant",
    "Rapid",
    "Rare",
    "Raspy",
    "Ratty",
    "Ready",
    "Real",
    "Reassured",
    "Rebel",
    "Receptive",
    "Recondite",
    "Red",
    "Redundant",
    "Reflective",
    "Regular",
    "Relieved",
    "Repulsive",
    "Responsive",
    "Ripe",
    "Robust",
    "Rotten",
    "Rotund",
    "Rough",
    "Round",
    "Sable",
    "Sad",
    "Safe",
    "Salty",
    "Same",
    "Sarcastic",
    "Sassy",
    "Satisfying",
    "Savory",
    "Scandalous",
    "Scant",
    "Scarce",
    "Scared",
    "Scary",
    "Scattered",
    "Scientific",
    "Scintillating",
    "Scrawny",
    "Screeching",
    "Second",
    "Second-hand",
    "Selfish",
    "Shaggy",
    "Shaky",
    "Shallow",
    "Sharp",
    "Shiny",
    "Short",
    "Silky",
    "Silly",
    "Skinny",
    "Slimy",
    "Slippery",
    "Small",
    "Smarmy",
    "Smiling",
    "Smoggy",
    "Smooth",
    "Smug",
    "Soggy",
    "Solid",
    "Sore",
    "Sour",
    "Sparkling",
    "Spicy",
    "Splendid",
    "Spotless",
    "Square",
    "Stale",
    "Steady",
    "Steep",
    "Sticky",
    "Stormy",
    "Stout",
    "Straight",
    "Strange",
    "Strong",
    "Stunning",
    "Substantial",
    "Successful",
    "Succulent",
    "Superficial",
    "Superior",
    "Swanky",
    "Sweet",
    "Taboo",
    "Tacit",
    "Tacky",
    "Talented",
    "Tall",
    "Tame",
    "Tan",
    "Tangible",
    "Tangy",
    "Tart",
    "Tasteful",
    "Tasteless",
    "Tasty",
    "Tawdry",
    "Tearful",
    "Tedious",
    "Teeny",
    "Teeny-tiny",
    "Telling",
    "Tender",
    "Tense",
    "Terrible",
    "Testy",
    "Thankful",
    "Thick",
    "Thoughtful",
    "Thoughtless",
    "Tight",
    "Timely",
    "Tricky",
    "Trite",
    "Troubled",
    "Twitterpated",
    "Ubiquitous",
    "Ugliest",
    "Ugly",
    "Ultra",
    "Unable",
    "Unaccountable",
    "Unadvised",
    "Unarmed",
    "Unbecoming",
    "Unbiased",
    "Uncovered",
    "Understood",
    "Undesirable",
    "Unequal",
    "Unequaled",
    "Uneven",
    "Unhealthy",
    "Uninterested",
    "Unique",
    "Unkempt",
    "Unknown",
    "Unnatural",
    "Unruly",
    "Unsightly",
    "Unsuitable",
    "Untidy",
    "Unused",
    "Unusual",
    "Unwieldy",
    "Unwritten",
    "Upbeat",
    "Uppity",
    "Upset",
    "Uptight",
    "Used",
    "Useful",
    "Useless",
    "Utopian",
    "Utter",
    "Uttermost",
    "Vacuous",
    "Vagabond",
    "Vague",
    "Valuable",
    "Various",
    "Vast",
    "Vengeful",
    "Venomous",
    "Verdant",
    "Versed",
    "Vexed",
    "Victorious",
    "Vigorous",
    "Violent",
    "Violet",
    "Virtuous",
    "Vivacious",
    "Vivid",
    "Voiceless",
    "Volatile",
    "Voracious",
    "Vulgar",
    "Wacky",
    "Waggish",
    "Waiting",
    "Wakeful",
    "Wandering",
    "Warlike",
    "Warm",
    "Wary",
    "Wasteful",
    "Watery",
    "Weak",
    "Wealthy",
    "Weary",
    "Well-groomed",
    "Well-made",
    "Well-off",
    "Well-to-do",
    "Wet",
    "Whimsical",
    "Whispering",
    "White",
    "Whole",
    "Whopping",
    "Wicked",
    "Wide",
    "Wide-eyed",
    "Wiggly",
    "Wild",
    "Willing",
    "Windy",
    "Wiry",
    "Wise",
    "Wistful",
    "Witty",
    "Wobbly",
    "Woebegone",
    "Womanly",
    "Wonderful",
    "Woozy",
    "Workable",
    "Worried",
    "Worthless",
    "Wrathful",
    "Wretched",
    "Wrong",
    "Wry",
    "Yellow",
    "Yielding",
    "Young",
    "Youthful",
    "Yummy",
    "Zany",
    "Zealous",
    "Zippy"
  ];

  // src/pokemon.ts
  var pokemon = [
    "Bulbasaur",
    "Ivysaur",
    "Venusaur",
    "Charmander",
    "Charmeleon",
    "Charizard",
    "Squirtle",
    "Wartortle",
    "Blastoise",
    "Caterpie",
    "Metapod",
    "Butterfree",
    "Weedle",
    "Kakuna",
    "Beedrill",
    "Pidgey",
    "Pidgeotto",
    "Pidgeot",
    "Rattata",
    "Raticate",
    "Spearow",
    "Fearow",
    "Ekans",
    "Arbok",
    "Pikachu",
    "Raichu",
    "Sandshrew",
    "Sandslash",
    "Nidoran\u2640",
    "Nidorina",
    "Nidoqueen",
    "Nidoran\u2642",
    "Nidorino",
    "Nidoking",
    "Clefairy",
    "Clefable",
    "Vulpix",
    "Ninetales",
    "Jigglypuff",
    "Wigglytuff",
    "Zubat",
    "Golbat",
    "Oddish",
    "Gloom",
    "Vileplume",
    "Paras",
    "Parasect",
    "Venonat",
    "Venomoth",
    "Diglett",
    "Dugtrio",
    "Meowth",
    "Persian",
    "Psyduck",
    "Golduck",
    "Mankey",
    "Primeape",
    "Growlithe",
    "Arcanine",
    "Poliwag",
    "Poliwhirl",
    "Poliwrath",
    "Abra",
    "Kadabra",
    "Alakazam",
    "Machop",
    "Machoke",
    "Machamp",
    "Bellsprout",
    "Weepinbell",
    "Victreebel",
    "Tentacool",
    "Tentacruel",
    "Geodude",
    "Graveler",
    "Golem",
    "Ponyta",
    "Rapidash",
    "Slowpoke",
    "Slowbro",
    "Magnemite",
    "Magneton",
    "Farfetch'd",
    "Doduo",
    "Dodrio",
    "Seel",
    "Dewgong",
    "Grimer",
    "Muk",
    "Shellder",
    "Cloyster",
    "Gastly",
    "Haunter",
    "Gengar",
    "Onix",
    "Drowzee",
    "Hypno",
    "Krabby",
    "Kingler",
    "Voltorb",
    "Electrode",
    "Exeggcute",
    "Exeggutor",
    "Cubone",
    "Marowak",
    "Hitmonlee",
    "Hitmonchan",
    "Lickitung",
    "Koffing",
    "Weezing",
    "Rhyhorn",
    "Rhydon",
    "Chansey",
    "Tangela",
    "Kangaskhan",
    "Horsea",
    "Seadra",
    "Goldeen",
    "Seaking",
    "Staryu",
    "Starmie",
    "Mr. Mime",
    "Scyther",
    "Jynx",
    "Electabuzz",
    "Magmar",
    "Pinsir",
    "Tauros",
    "Magikarp",
    "Gyarados",
    "Lapras",
    "Ditto",
    "Eevee",
    "Vaporeon",
    "Jolteon",
    "Flareon",
    "Porygon",
    "Omanyte",
    "Omastar",
    "Kabuto",
    "Kabutops",
    "Aerodactyl",
    "Snorlax",
    "Articuno",
    "Zapdos",
    "Moltres",
    "Dratini",
    "Dragonair",
    "Dragonite",
    "Mewtwo",
    "Mew",
    "Chikorita",
    "Bayleef",
    "Meganium",
    "Cyndaquil",
    "Quilava",
    "Typhlosion",
    "Totodile",
    "Croconaw",
    "Feraligatr",
    "Sentret",
    "Furret",
    "Hoothoot",
    "Noctowl",
    "Ledyba",
    "Ledian",
    "Spinarak",
    "Ariados",
    "Crobat",
    "Chinchou",
    "Lanturn",
    "Pichu",
    "Cleffa",
    "Igglybuff",
    "Togepi",
    "Togetic",
    "Natu",
    "Xatu",
    "Mareep",
    "Flaaffy",
    "Ampharos",
    "Bellossom",
    "Marill",
    "Azumarill",
    "Sudowoodo",
    "Politoed",
    "Hoppip",
    "Skiploom",
    "Jumpluff",
    "Aipom",
    "Sunkern",
    "Sunflora",
    "Yanma",
    "Wooper",
    "Quagsire",
    "Espeon",
    "Umbreon",
    "Murkrow",
    "Slowking",
    "Misdreavus",
    "Unown",
    "Wobbuffet",
    "Girafarig",
    "Pineco",
    "Forretress",
    "Dunsparce",
    "Gligar",
    "Steelix",
    "Snubbull",
    "Granbull",
    "Qwilfish",
    "Scizor",
    "Shuckle",
    "Heracross",
    "Sneasel",
    "Teddiursa",
    "Ursaring",
    "Slugma",
    "Magcargo",
    "Swinub",
    "Piloswine",
    "Corsola",
    "Remoraid",
    "Octillery",
    "Delibird",
    "Mantine",
    "Skarmory",
    "Houndour",
    "Houndoom",
    "Kingdra",
    "Phanpy",
    "Donphan",
    "Porygon2",
    "Stantler",
    "Smeargle",
    "Tyrogue",
    "Hitmontop",
    "Smoochum",
    "Elekid",
    "Magby",
    "Miltank",
    "Blissey",
    "Raikou",
    "Entei",
    "Suicune",
    "Larvitar",
    "Pupitar",
    "Tyranitar",
    "Lugia",
    "Ho-oh",
    "Celebi",
    "Treecko",
    "Grovyle",
    "Sceptile",
    "Torchic",
    "Combusken",
    "Blaziken",
    "Mudkip",
    "Marshtomp",
    "Swampert",
    "Poochyena",
    "Mightyena",
    "Zigzagoon",
    "Linoone",
    "Wurmple",
    "Silcoon",
    "Beautifly",
    "Cascoon",
    "Dustox",
    "Lotad",
    "Lombre",
    "Ludicolo",
    "Seedot",
    "Nuzleaf",
    "Shiftry",
    "Taillow",
    "Swellow",
    "Wingull",
    "Pelipper",
    "Ralts",
    "Kirlia",
    "Gardevoir",
    "Surskit",
    "Masquerain",
    "Shroomish",
    "Breloom",
    "Slakoth",
    "Vigoroth",
    "Slaking",
    "Nincada",
    "Ninjask",
    "Shedinja",
    "Whismur",
    "Loudred",
    "Exploud",
    "Makuhita",
    "Hariyama",
    "Azurill",
    "Nosepass",
    "Skitty",
    "Delcatty",
    "Sableye",
    "Mawile",
    "Aron",
    "Lairon",
    "Aggron",
    "Meditite",
    "Medicham",
    "Electrike",
    "Manectric",
    "Plusle",
    "Minun",
    "Volbeat",
    "Illumise",
    "Roselia",
    "Gulpin",
    "Swalot",
    "Carvanha",
    "Sharpedo",
    "Wailmer",
    "Wailord",
    "Numel",
    "Camerupt",
    "Torkoal",
    "Spoink",
    "Grumpig",
    "Spinda",
    "Trapinch",
    "Vibrava",
    "Flygon",
    "Cacnea",
    "Cacturne",
    "Swablu",
    "Altaria",
    "Zangoose",
    "Seviper",
    "Lunatone",
    "Solrock",
    "Barboach",
    "Whiscash",
    "Corphish",
    "Crawdaunt",
    "Baltoy",
    "Claydol",
    "Lileep",
    "Cradily",
    "Anorith",
    "Armaldo",
    "Feebas",
    "Milotic",
    "Castform",
    "Kecleon",
    "Shuppet",
    "Banette",
    "Duskull",
    "Dusclops",
    "Tropius",
    "Chimecho",
    "Absol",
    "Wynaut",
    "Snorunt",
    "Glalie",
    "Spheal",
    "Sealeo",
    "Walrein",
    "Clamperl",
    "Huntail",
    "Gorebyss",
    "Relicanth",
    "Luvdisc",
    "Bagon",
    "Shelgon",
    "Salamence",
    "Beldum",
    "Metang",
    "Metagross",
    "Regirock",
    "Regice",
    "Registeel",
    "Latias",
    "Latios",
    "Kyogre",
    "Groudon",
    "Rayquaza",
    "Jirachi",
    "Deoxys",
    "Turtwig",
    "Grotle",
    "Torterra",
    "Chimchar",
    "Monferno",
    "Infernape",
    "Piplup",
    "Prinplup",
    "Empoleon",
    "Starly",
    "Staravia",
    "Staraptor",
    "Bidoof",
    "Bibarel",
    "Kricketot",
    "Kricketune",
    "Shinx",
    "Luxio",
    "Luxray",
    "Budew",
    "Roserade",
    "Cranidos",
    "Rampardos",
    "Shieldon",
    "Bastiodon",
    "Burmy",
    "Wormadam",
    "Mothim",
    "Combee",
    "Vespiquen",
    "Pachirisu",
    "Buizel",
    "Floatzel",
    "Cherubi",
    "Cherrim",
    "Shellos",
    "Gastrodon",
    "Ambipom",
    "Drifloon",
    "Drifblim",
    "Buneary",
    "Lopunny",
    "Mismagius",
    "Honchkrow",
    "Glameow",
    "Purugly",
    "Chingling",
    "Stunky",
    "Skuntank",
    "Bronzor",
    "Bronzong",
    "Bonsly",
    "Mime Jr.",
    "Happiny",
    "Chatot",
    "Spiritomb",
    "Gible",
    "Gabite",
    "Garchomp",
    "Munchlax",
    "Riolu",
    "Lucario",
    "Hippopotas",
    "Hippowdon",
    "Skorupi",
    "Drapion",
    "Croagunk",
    "Toxicroak",
    "Carnivine",
    "Finneon",
    "Lumineon",
    "Mantyke",
    "Snover",
    "Abomasnow",
    "Weavile",
    "Magnezone",
    "Lickilicky",
    "Rhyperior",
    "Tangrowth",
    "Electivire",
    "Magmortar",
    "Togekiss",
    "Yanmega",
    "Leafeon",
    "Glaceon",
    "Gliscor",
    "Mamoswine",
    "Porygon-Z",
    "Gallade",
    "Probopass",
    "Dusknoir",
    "Froslass",
    "Rotom",
    "Uxie",
    "Mesprit",
    "Azelf",
    "Dialga",
    "Palkia",
    "Heatran",
    "Regigigas",
    "Giratina",
    "Cresselia",
    "Phione",
    "Manaphy",
    "Darkrai",
    "Shaymin",
    "Arceus",
    "Victini",
    "Snivy",
    "Servine",
    "Serperior",
    "Tepig",
    "Pignite",
    "Emboar",
    "Oshawott",
    "Dewott",
    "Samurott",
    "Patrat",
    "Watchog",
    "Lillipup",
    "Herdier",
    "Stoutland",
    "Purrloin",
    "Liepard",
    "Pansage",
    "Simisage",
    "Pansear",
    "Simisear",
    "Panpour",
    "Simipour",
    "Munna",
    "Musharna",
    "Pidove",
    "Tranquill",
    "Unfezant",
    "Blitzle",
    "Zebstrika",
    "Roggenrola",
    "Boldore",
    "Gigalith",
    "Woobat",
    "Swoobat",
    "Drilbur",
    "Excadrill",
    "Audino",
    "Timburr",
    "Gurdurr",
    "Conkeldurr",
    "Tympole",
    "Palpitoad",
    "Seismitoad",
    "Throh",
    "Sawk",
    "Sewaddle",
    "Swadloon",
    "Leavanny",
    "Venipede",
    "Whirlipede",
    "Scolipede",
    "Cottonee",
    "Whimsicott",
    "Petilil",
    "Lilligant",
    "Basculin",
    "Sandile",
    "Krokorok",
    "Krookodile",
    "Darumaka",
    "Darmanitan",
    "Maractus",
    "Dwebble",
    "Crustle",
    "Scraggy",
    "Scrafty",
    "Sigilyph",
    "Yamask",
    "Cofagrigus",
    "Tirtouga",
    "Carracosta",
    "Archen",
    "Archeops",
    "Trubbish",
    "Garbodor",
    "Zorua",
    "Zoroark",
    "Minccino",
    "Cinccino",
    "Gothita",
    "Gothorita",
    "Gothitelle",
    "Solosis",
    "Duosion",
    "Reuniclus",
    "Ducklett",
    "Swanna",
    "Vanillite",
    "Vanillish",
    "Vanilluxe",
    "Deerling",
    "Sawsbuck",
    "Emolga",
    "Karrablast",
    "Escavalier",
    "Foongus",
    "Amoonguss",
    "Frillish",
    "Jellicent",
    "Alomomola",
    "Joltik",
    "Galvantula",
    "Ferroseed",
    "Ferrothorn",
    "Klink",
    "Klang",
    "Klinklang",
    "Tynamo",
    "Eelektrik",
    "Eelektross",
    "Elgyem",
    "Beheeyem",
    "Litwick",
    "Lampent",
    "Chandelure",
    "Axew",
    "Fraxure",
    "Haxorus",
    "Cubchoo",
    "Beartic",
    "Cryogonal",
    "Shelmet",
    "Accelgor",
    "Stunfisk",
    "Mienfoo",
    "Mienshao",
    "Druddigon",
    "Golett",
    "Golurk",
    "Pawniard",
    "Bisharp",
    "Bouffalant",
    "Rufflet",
    "Braviary",
    "Vullaby",
    "Mandibuzz",
    "Heatmor",
    "Durant",
    "Deino",
    "Zweilous",
    "Hydreigon",
    "Larvesta",
    "Volcarona",
    "Cobalion",
    "Terrakion",
    "Virizion",
    "Tornadus",
    "Thundurus",
    "Reshiram",
    "Zekrom",
    "Landorus",
    "Kyurem",
    "Keldeo",
    "Meloetta",
    "Genesect",
    "Chespin",
    "Quilladin",
    "Chesnaught",
    "Fennekin",
    "Braixen",
    "Delphox",
    "Froakie",
    "Frogadier",
    "Greninja",
    "Bunnelby",
    "Diggersby",
    "Fletchling",
    "Fletchinder",
    "Talonflame",
    "Scatterbug",
    "Spewpa",
    "Vivillon",
    "Litleo",
    "Pyroar",
    "Flab\xE9b\xE9",
    "Floette",
    "Florges",
    "Skiddo",
    "Gogoat",
    "Pancham",
    "Pangoro",
    "Furfrou",
    "Espurr",
    "Meowstic",
    "Honedge",
    "Doublade",
    "Aegislash",
    "Spritzee",
    "Aromatisse",
    "Swirlix",
    "Slurpuff",
    "Inkay",
    "Malamar",
    "Binacle",
    "Barbaracle",
    "Skrelp",
    "Dragalge",
    "Clauncher",
    "Clawitzer",
    "Helioptile",
    "Heliolisk",
    "Tyrunt",
    "Tyrantrum",
    "Amaura",
    "Aurorus",
    "Sylveon",
    "Hawlucha",
    "Dedenne",
    "Carbink",
    "Goomy",
    "Sliggoo",
    "Goodra",
    "Klefki",
    "Phantump",
    "Trevenant",
    "Pumpkaboo",
    "Gourgeist",
    "Bergmite",
    "Avalugg",
    "Noibat",
    "Noivern",
    "Xerneas",
    "Yveltal",
    "Zygarde",
    "Diancie",
    "Hoopa",
    "Volcanion",
    "Rowlet",
    "Dartrix",
    "Decidueye",
    "Litten",
    "Torracat",
    "Incineroar",
    "Popplio",
    "Brionne",
    "Primarina",
    "Pikipek",
    "Trumbeak",
    "Toucannon",
    "Yungoos",
    "Gumshoos",
    "Grubbin",
    "Charjabug",
    "Vikavolt",
    "Crabrawler",
    "Crabominable",
    "Oricorio",
    "Cutiefly",
    "Ribombee",
    "Rockruff",
    "Lycanroc",
    "Wishiwashi",
    "Mareanie",
    "Toxapex",
    "Mudbray",
    "Mudsdale",
    "Dewpider",
    "Araquanid",
    "Fomantis",
    "Lurantis",
    "Morelull",
    "Shiinotic",
    "Salandit",
    "Salazzle",
    "Stufful",
    "Bewear",
    "Bounsweet",
    "Steenee",
    "Tsareena",
    "Comfey",
    "Oranguru",
    "Passimian",
    "Wimpod",
    "Golisopod",
    "Sandygast",
    "Palossand",
    "Pyukumuku",
    "Type: Null",
    "Silvally",
    "Minior",
    "Komala",
    "Turtonator",
    "Togedemaru",
    "Mimikyu",
    "Bruxish",
    "Drampa",
    "Dhelmise",
    "Jangmo-o",
    "Hakamo-o",
    "Kommo-o",
    "Tapu Koko",
    "Tapu Lele",
    "Tapu Bulu",
    "Tapu Fini",
    "Cosmog",
    "Cosmoem",
    "Solgaleo",
    "Lunala",
    "Nihilego",
    "Buzzwole",
    "Pheromosa",
    "Xurkitree",
    "Celesteela",
    "Kartana",
    "Guzzlord",
    "Necrozma",
    "Magearna",
    "Marshadow",
    "Poipole",
    "Naganadel",
    "Stakataka",
    "Blacephalon",
    "Zeraora",
    "Meltan",
    "Melmetal",
    "Grookey",
    "Thwackey",
    "Rillaboom",
    "Scorbunny",
    "Raboot",
    "Cinderace",
    "Sobble",
    "Drizzile",
    "Inteleon",
    "Skwovet",
    "Greedent",
    "Rookidee",
    "Corvisquire",
    "Corviknight",
    "Blipbug",
    "Dottler",
    "Orbeetle",
    "Nickit",
    "Thievul",
    "Gossifleur",
    "Eldegoss",
    "Wooloo",
    "Dubwool",
    "Chewtle",
    "Drednaw",
    "Yamper",
    "Boltund",
    "Rolycoly",
    "Carkol",
    "Coalossal",
    "Applin",
    "Flapple",
    "Appletun",
    "Silicobra",
    "Sandaconda",
    "Cramorant",
    "Arrokuda",
    "Barraskewda",
    "Toxel",
    "Toxtricity",
    "Sizzlipede",
    "Centiskorch",
    "Clobbopus",
    "Grapploct",
    "Sinistea",
    "Polteageist",
    "Hatenna",
    "Hattrem",
    "Hatterene",
    "Impidimp",
    "Morgrem",
    "Grimmsnarl",
    "Obstagoon",
    "Perrserker",
    "Cursola",
    "Sirfetch'd",
    "Mr. Rime",
    "Runerigus",
    "Milcery",
    "Alcremie",
    "Falinks",
    "Pincurchin",
    "Snom",
    "Frosmoth",
    "Stonjourner",
    "Eiscue",
    "Indeedee",
    "Morpeko",
    "Cufant",
    "Copperajah",
    "Dracozolt",
    "Arctozolt",
    "Dracovish",
    "Arctovish",
    "Duraludon",
    "Dreepy",
    "Drakloak",
    "Dragapult",
    "Zacian",
    "Zamazenta",
    "Eternatus",
    "Kubfu",
    "Urshifu",
    "Zarude",
    "Regieleki",
    "Regidrago",
    "Glastrier",
    "Spectrier",
    "Calyrex",
    "Wyrdeer",
    "Kleavor",
    "Ursaluna",
    "Basculegion",
    "Sneasler",
    "Overqwil",
    "Enamorus"
  ];

  // src/uuid-to-adjective-animal.ts
  var animalsAndPokemon = [...animals, ...pokemon];
  var uuidToIntegerArray = (uuid2) => {
    const uuidBytes = parse(uuid2);
    const view = new DataView(uuidBytes.buffer);
    return [
      view.getUint32(0),
      view.getUint32(4),
      view.getUint32(8),
      view.getUint32(12)
    ];
  };
  var indexToAdjective = (adjectiveIndex) => adjectives[adjectiveIndex % adjectives.length];
  var indexToAnimal = (animalIndex, includePokemon) => includePokemon ? animalsAndPokemon[animalIndex % animalsAndPokemon.length] : animals[animalIndex % animals.length];
  var uuidToAnimalAdjective = (uuid2, {
    format = "ADJECTIVE_ANIMAL",
    includePokemon = false
  } = {}) => {
    const [partOne, partTwo, partThree, partFour] = uuidToIntegerArray(uuid2);
    switch (format) {
      case "ADJECTIVE_ANIMAL": {
        return `${indexToAdjective(partOne + partTwo)} ${indexToAnimal(partThree + partFour, includePokemon)}`;
      }
      case "ADJECTIVE_ADJECTIVE_ANIMAL": {
        return `${indexToAdjective(partOne + partTwo)} ${indexToAdjective(partTwo + partThree)} ${indexToAnimal(partFour, includePokemon)}`;
      }
      case "ADJECTIVE_ADJECTIVE_ADJECTIVE_ANIMAL": {
        return `${indexToAdjective(partOne)} ${indexToAdjective(partTwo)} ${indexToAdjective(partThree)} ${indexToAnimal(partFour, includePokemon)}`;
      }
      default: {
        return `${indexToAdjective(partOne + partTwo)} ${indexToAnimal(partThree + partFour, includePokemon)}`;
      }
    }
  };
  var randomAnimalAdjective = (options) => {
    const uuid2 = v4();
    return { uuid: uuid2, animalAdjective: uuidToAnimalAdjective(uuid2, options) };
  };
})();
