"use strict";
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
var __runInitializers = (this && this.__runInitializers) || function (thisArg, initializers, value) {
    var useValue = arguments.length > 2;
    for (var i = 0; i < initializers.length; i++) {
        value = useValue ? initializers[i].call(thisArg, value) : initializers[i].call(thisArg);
    }
    return useValue ? value : void 0;
};
var __setFunctionName = (this && this.__setFunctionName) || function (f, name, prefix) {
    if (typeof name === "symbol") name = name.description ? "[".concat(name.description, "]") : "";
    return Object.defineProperty(f, "name", { configurable: true, value: prefix ? "".concat(prefix, " ", name) : name });
};
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
exports.Article = void 0;
var core_1 = require("@mikro-orm/core");
var slug_1 = require("slug");
var user_entity_1 = require("../user/user.entity");
var comment_entity_1 = require("./comment.entity");
var Article = exports.Article = function () {
    var _classDecorators = [(0, core_1.Entity)()];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var _instanceExtraInitializers = [];
    var _id_decorators;
    var _id_initializers = [];
    var _slug_decorators;
    var _slug_initializers = [];
    var _title_decorators;
    var _title_initializers = [];
    var _description_decorators;
    var _description_initializers = [];
    var _body_decorators;
    var _body_initializers = [];
    var _createdAt_decorators;
    var _createdAt_initializers = [];
    var _updatedAt_decorators;
    var _updatedAt_initializers = [];
    var _tagList_decorators;
    var _tagList_initializers = [];
    var _author_decorators;
    var _author_initializers = [];
    var _coAuthors_decorators;
    var _coAuthors_initializers = [];
    var _comments_decorators;
    var _comments_initializers = [];
    var _favoritesCount_decorators;
    var _favoritesCount_initializers = [];
    var Article = _classThis = /** @class */ (function () {
        function Article_1(author, title, description, body) {
            this.id = (__runInitializers(this, _instanceExtraInitializers), __runInitializers(this, _id_initializers, void 0));
            this.slug = __runInitializers(this, _slug_initializers, void 0);
            this.title = __runInitializers(this, _title_initializers, void 0);
            this.description = __runInitializers(this, _description_initializers, '');
            this.body = __runInitializers(this, _body_initializers, '');
            this.createdAt = __runInitializers(this, _createdAt_initializers, new Date());
            this.updatedAt = __runInitializers(this, _updatedAt_initializers, new Date());
            this.tagList = __runInitializers(this, _tagList_initializers, []);
            this.author = __runInitializers(this, _author_initializers, void 0);
            this.coAuthors = __runInitializers(this, _coAuthors_initializers, new core_1.Collection(this));
            this.comments = __runInitializers(this, _comments_initializers, new core_1.Collection(this));
            this.favoritesCount = __runInitializers(this, _favoritesCount_initializers, 0);
            this.author = author;
            this.title = title;
            this.description = description;
            this.body = body;
            this.slug = (0, slug_1.default)(title, { lower: true }) + '-' + ((Math.random() * Math.pow(36, 6)) | 0).toString(36);
        }
        Article_1.prototype.toJSON = function (user) {
            var o = (0, core_1.wrap)(this).toObject();
            o.favorited = user && user.favorites.isInitialized() ? user.favorites.contains(this) : false;
            o.author = this.author.toJSON(user);
            return o;
        };
        return Article_1;
    }());
    __setFunctionName(_classThis, "Article");
    (function () {
        _id_decorators = [(0, core_1.PrimaryKey)({ type: 'number' })];
        _slug_decorators = [(0, core_1.Property)({ fieldName: 'slug' })];
        _title_decorators = [(0, core_1.Property)({ fieldName: 'title' })];
        _description_decorators = [(0, core_1.Property)({ fieldName: 'description' })];
        _body_decorators = [(0, core_1.Property)({ fieldName: 'body' })];
        _createdAt_decorators = [(0, core_1.Property)({ type: 'date', fieldName: 'created_at' })];
        _updatedAt_decorators = [(0, core_1.Property)({ type: 'date', onUpdate: function () { return new Date(); }, fieldName: 'updated_at' })];
        _tagList_decorators = [(0, core_1.Property)({ type: core_1.ArrayType, fieldName: 'tag_list' })];
        _author_decorators = [(0, core_1.ManyToOne)(function () { return user_entity_1.User; }, { fieldName: 'author_id' })];
        _coAuthors_decorators = [(0, core_1.ManyToMany)(function () { return user_entity_1.User; })];
        _comments_decorators = [(0, core_1.OneToMany)(function () { return comment_entity_1.Comment; }, function (comment) { return comment.article; }, { eager: true, orphanRemoval: true })];
        _favoritesCount_decorators = [(0, core_1.Property)({ type: 'number', fieldName: 'favorites_count' })];
        __esDecorate(null, null, _id_decorators, { kind: "field", name: "id", static: false, private: false, access: { has: function (obj) { return "id" in obj; }, get: function (obj) { return obj.id; }, set: function (obj, value) { obj.id = value; } } }, _id_initializers, _instanceExtraInitializers);
        __esDecorate(null, null, _slug_decorators, { kind: "field", name: "slug", static: false, private: false, access: { has: function (obj) { return "slug" in obj; }, get: function (obj) { return obj.slug; }, set: function (obj, value) { obj.slug = value; } } }, _slug_initializers, _instanceExtraInitializers);
        __esDecorate(null, null, _title_decorators, { kind: "field", name: "title", static: false, private: false, access: { has: function (obj) { return "title" in obj; }, get: function (obj) { return obj.title; }, set: function (obj, value) { obj.title = value; } } }, _title_initializers, _instanceExtraInitializers);
        __esDecorate(null, null, _description_decorators, { kind: "field", name: "description", static: false, private: false, access: { has: function (obj) { return "description" in obj; }, get: function (obj) { return obj.description; }, set: function (obj, value) { obj.description = value; } } }, _description_initializers, _instanceExtraInitializers);
        __esDecorate(null, null, _body_decorators, { kind: "field", name: "body", static: false, private: false, access: { has: function (obj) { return "body" in obj; }, get: function (obj) { return obj.body; }, set: function (obj, value) { obj.body = value; } } }, _body_initializers, _instanceExtraInitializers);
        __esDecorate(null, null, _createdAt_decorators, { kind: "field", name: "createdAt", static: false, private: false, access: { has: function (obj) { return "createdAt" in obj; }, get: function (obj) { return obj.createdAt; }, set: function (obj, value) { obj.createdAt = value; } } }, _createdAt_initializers, _instanceExtraInitializers);
        __esDecorate(null, null, _updatedAt_decorators, { kind: "field", name: "updatedAt", static: false, private: false, access: { has: function (obj) { return "updatedAt" in obj; }, get: function (obj) { return obj.updatedAt; }, set: function (obj, value) { obj.updatedAt = value; } } }, _updatedAt_initializers, _instanceExtraInitializers);
        __esDecorate(null, null, _tagList_decorators, { kind: "field", name: "tagList", static: false, private: false, access: { has: function (obj) { return "tagList" in obj; }, get: function (obj) { return obj.tagList; }, set: function (obj, value) { obj.tagList = value; } } }, _tagList_initializers, _instanceExtraInitializers);
        __esDecorate(null, null, _author_decorators, { kind: "field", name: "author", static: false, private: false, access: { has: function (obj) { return "author" in obj; }, get: function (obj) { return obj.author; }, set: function (obj, value) { obj.author = value; } } }, _author_initializers, _instanceExtraInitializers);
        __esDecorate(null, null, _coAuthors_decorators, { kind: "field", name: "coAuthors", static: false, private: false, access: { has: function (obj) { return "coAuthors" in obj; }, get: function (obj) { return obj.coAuthors; }, set: function (obj, value) { obj.coAuthors = value; } } }, _coAuthors_initializers, _instanceExtraInitializers);
        __esDecorate(null, null, _comments_decorators, { kind: "field", name: "comments", static: false, private: false, access: { has: function (obj) { return "comments" in obj; }, get: function (obj) { return obj.comments; }, set: function (obj, value) { obj.comments = value; } } }, _comments_initializers, _instanceExtraInitializers);
        __esDecorate(null, null, _favoritesCount_decorators, { kind: "field", name: "favoritesCount", static: false, private: false, access: { has: function (obj) { return "favoritesCount" in obj; }, get: function (obj) { return obj.favoritesCount; }, set: function (obj, value) { obj.favoritesCount = value; } } }, _favoritesCount_initializers, _instanceExtraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name }, null, _classExtraInitializers);
        Article = _classThis = _classDescriptor.value;
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return Article = _classThis;
}();
