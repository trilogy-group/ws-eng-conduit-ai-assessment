"use strict";
var __runInitializers = (this && this.__runInitializers) || function (thisArg, initializers, value) {
    var useValue = arguments.length > 2;
    for (var i = 0; i < initializers.length; i++) {
        value = useValue ? initializers[i].call(thisArg, value) : initializers[i].call(thisArg);
    }
    return useValue ? value : void 0;
};
var __esDecorate = (this && this.__esDecorate) || function (ctor, descriptorIn, decorators, contextIn, initializers, extraInitializers) {
    function accept(f) { if (f !== void 0 && typeof f !== "function") throw new TypeError("Function expected"); return f; }
    var kind = contextIn.kind, key = kind === "getter" ? "get" : kind === "setter" ? "set" : "value";
    var target = !descriptorIn && ctor ? contextIn["static"] ? ctor : ctor.prototype : null;
    var descriptor = descriptorIn || (target ? Object.getOwnPropertyDescriptor(target, contextIn.name) : {});
    var _, done = false;
    for (var i = decorators.length - 1; i >= 0; i--) {
        var context = {};
        for (var p in contextIn) context[p] = p === "access" ? {} : contextIn[p];
        for (var p in contextIn.access) context.access[p] = contextIn.access[p];
        context.addInitializer = function (f) { if (done) throw new TypeError("Cannot add initializers after decoration has completed"); extraInitializers.push(accept(f || null)); };
        var result = (0, decorators[i])(kind === "accessor" ? { get: descriptor.get, set: descriptor.set } : descriptor[key], context);
        if (kind === "accessor") {
            if (result === void 0) continue;
            if (result === null || typeof result !== "object") throw new TypeError("Object expected");
            if (_ = accept(result.get)) descriptor.get = _;
            if (_ = accept(result.set)) descriptor.set = _;
            if (_ = accept(result.init)) initializers.unshift(_);
        }
        else if (_ = accept(result)) {
            if (kind === "field") initializers.unshift(_);
            else descriptor[key] = _;
        }
    }
    if (target) Object.defineProperty(target, contextIn.name, descriptor);
    done = true;
};
var __setFunctionName = (this && this.__setFunctionName) || function (f, name, prefix) {
    if (typeof name === "symbol") name = name.description ? "[".concat(name.description, "]") : "";
    return Object.defineProperty(f, "name", { configurable: true, value: prefix ? "".concat(prefix, " ", name) : name });
};
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
var class_validator_1 = require("class-validator");
var crypto_1 = require("crypto");
var core_1 = require("@mikro-orm/core");
var article_entity_1 = require("../article/article.entity");
var User = exports.User = function () {
    var _a;
    var _classDecorators = [(0, core_1.Entity)()];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var _instanceExtraInitializers = [];
    var _id_decorators;
    var _id_initializers = [];
    var _username_decorators;
    var _username_initializers = [];
    var _email_decorators;
    var _email_initializers = [];
    var _bio_decorators;
    var _bio_initializers = [];
    var _image_decorators;
    var _image_initializers = [];
    var _password_decorators;
    var _password_initializers = [];
    var _favorites_decorators;
    var _favorites_initializers = [];
    var _followers_decorators;
    var _followers_initializers = [];
    var _followed_decorators;
    var _followed_initializers = [];
    var _articles_decorators;
    var _articles_initializers = [];
    var User = _classThis = /** @class */ (function () {
        function User_1(username, email, password) {
            this[_a] = (__runInitializers(this, _instanceExtraInitializers), void 0);
            this.id = __runInitializers(this, _id_initializers, void 0);
            this.username = __runInitializers(this, _username_initializers, void 0);
            this.email = __runInitializers(this, _email_initializers, void 0);
            this.bio = __runInitializers(this, _bio_initializers, '');
            this.image = __runInitializers(this, _image_initializers, '');
            this.password = __runInitializers(this, _password_initializers, void 0);
            this.favorites = __runInitializers(this, _favorites_initializers, new core_1.Collection(this));
            this.followers = __runInitializers(this, _followers_initializers, new core_1.Collection(this));
            this.followed = __runInitializers(this, _followed_initializers, new core_1.Collection(this));
            this.articles = __runInitializers(this, _articles_initializers, new core_1.Collection(this));
            this.username = username;
            this.email = email;
            this.password = (0, crypto_1.createHmac)('sha256', password).digest('hex');
        }
        User_1.prototype.toJSON = function (user) {
            var _b;
            var o = (0, core_1.wrap)(this).toObject();
            o.image = this.image || 'https://api.dicebear.com/9.x/initials/svg?seed=U';
            o.following = user && ((_b = user.followers) === null || _b === void 0 ? void 0 : _b.isInitialized()) ? user.followers.contains(this) : false; // TODO or followed?
            return o;
        };
        return User_1;
    }());
    _a = core_1.EntityRepositoryType;
    __setFunctionName(_classThis, "User");
    (function () {
        _id_decorators = [(0, core_1.PrimaryKey)({ type: 'number' })];
        _username_decorators = [(0, core_1.Property)({ fieldName: 'username' })];
        _email_decorators = [(0, core_1.Property)({ hidden: true, fieldName: 'email' }), (0, class_validator_1.IsEmail)()];
        _bio_decorators = [(0, core_1.Property)({ fieldName: 'bio' })];
        _image_decorators = [(0, core_1.Property)({ fieldName: 'image' })];
        _password_decorators = [(0, core_1.Property)({ hidden: true, fieldName: 'password' })];
        _favorites_decorators = [(0, core_1.ManyToMany)({ entity: function () { return article_entity_1.Article; }, hidden: true })];
        _followers_decorators = [(0, core_1.ManyToMany)({
                entity: function () { return User; },
                inversedBy: function (u) { return u.followed; },
                owner: true,
                pivotTable: 'user_to_follower',
                joinColumn: 'follower',
                inverseJoinColumn: 'following',
                hidden: true,
            })];
        _followed_decorators = [(0, core_1.ManyToMany)(function () { return User; }, function (u) { return u.followers; }, { hidden: true })];
        _articles_decorators = [(0, core_1.OneToMany)(function () { return article_entity_1.Article; }, function (article) { return article.author; }, { hidden: true })];
        __esDecorate(null, null, _id_decorators, { kind: "field", name: "id", static: false, private: false, access: { has: function (obj) { return "id" in obj; }, get: function (obj) { return obj.id; }, set: function (obj, value) { obj.id = value; } } }, _id_initializers, _instanceExtraInitializers);
        __esDecorate(null, null, _username_decorators, { kind: "field", name: "username", static: false, private: false, access: { has: function (obj) { return "username" in obj; }, get: function (obj) { return obj.username; }, set: function (obj, value) { obj.username = value; } } }, _username_initializers, _instanceExtraInitializers);
        __esDecorate(null, null, _email_decorators, { kind: "field", name: "email", static: false, private: false, access: { has: function (obj) { return "email" in obj; }, get: function (obj) { return obj.email; }, set: function (obj, value) { obj.email = value; } } }, _email_initializers, _instanceExtraInitializers);
        __esDecorate(null, null, _bio_decorators, { kind: "field", name: "bio", static: false, private: false, access: { has: function (obj) { return "bio" in obj; }, get: function (obj) { return obj.bio; }, set: function (obj, value) { obj.bio = value; } } }, _bio_initializers, _instanceExtraInitializers);
        __esDecorate(null, null, _image_decorators, { kind: "field", name: "image", static: false, private: false, access: { has: function (obj) { return "image" in obj; }, get: function (obj) { return obj.image; }, set: function (obj, value) { obj.image = value; } } }, _image_initializers, _instanceExtraInitializers);
        __esDecorate(null, null, _password_decorators, { kind: "field", name: "password", static: false, private: false, access: { has: function (obj) { return "password" in obj; }, get: function (obj) { return obj.password; }, set: function (obj, value) { obj.password = value; } } }, _password_initializers, _instanceExtraInitializers);
        __esDecorate(null, null, _favorites_decorators, { kind: "field", name: "favorites", static: false, private: false, access: { has: function (obj) { return "favorites" in obj; }, get: function (obj) { return obj.favorites; }, set: function (obj, value) { obj.favorites = value; } } }, _favorites_initializers, _instanceExtraInitializers);
        __esDecorate(null, null, _followers_decorators, { kind: "field", name: "followers", static: false, private: false, access: { has: function (obj) { return "followers" in obj; }, get: function (obj) { return obj.followers; }, set: function (obj, value) { obj.followers = value; } } }, _followers_initializers, _instanceExtraInitializers);
        __esDecorate(null, null, _followed_decorators, { kind: "field", name: "followed", static: false, private: false, access: { has: function (obj) { return "followed" in obj; }, get: function (obj) { return obj.followed; }, set: function (obj, value) { obj.followed = value; } } }, _followed_initializers, _instanceExtraInitializers);
        __esDecorate(null, null, _articles_decorators, { kind: "field", name: "articles", static: false, private: false, access: { has: function (obj) { return "articles" in obj; }, get: function (obj) { return obj.articles; }, set: function (obj, value) { obj.articles = value; } } }, _articles_initializers, _instanceExtraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name }, null, _classExtraInitializers);
        User = _classThis = _classDescriptor.value;
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return User = _classThis;
}();
