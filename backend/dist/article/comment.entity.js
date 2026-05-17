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
exports.Comment = void 0;
var core_1 = require("@mikro-orm/core");
var user_entity_1 = require("../user/user.entity");
var article_entity_1 = require("./article.entity");
var Comment = exports.Comment = function () {
    var _classDecorators = [(0, core_1.Entity)()];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var _instanceExtraInitializers = [];
    var _id_decorators;
    var _id_initializers = [];
    var _createdAt_decorators;
    var _createdAt_initializers = [];
    var _updatedAt_decorators;
    var _updatedAt_initializers = [];
    var _body_decorators;
    var _body_initializers = [];
    var _article_decorators;
    var _article_initializers = [];
    var _author_decorators;
    var _author_initializers = [];
    var Comment = _classThis = /** @class */ (function () {
        function Comment_1(author, article, body) {
            this.id = (__runInitializers(this, _instanceExtraInitializers), __runInitializers(this, _id_initializers, void 0));
            this.createdAt = __runInitializers(this, _createdAt_initializers, new Date());
            this.updatedAt = __runInitializers(this, _updatedAt_initializers, new Date());
            this.body = __runInitializers(this, _body_initializers, void 0);
            this.article = __runInitializers(this, _article_initializers, void 0);
            this.author = __runInitializers(this, _author_initializers, void 0);
            this.author = author;
            this.article = article;
            this.body = body;
        }
        return Comment_1;
    }());
    __setFunctionName(_classThis, "Comment");
    (function () {
        _id_decorators = [(0, core_1.PrimaryKey)({ type: 'number' })];
        _createdAt_decorators = [(0, core_1.Property)({ type: 'date', fieldName: 'created_at' })];
        _updatedAt_decorators = [(0, core_1.Property)({ type: 'date', onUpdate: function () { return new Date(); }, fieldName: 'updated_at' })];
        _body_decorators = [(0, core_1.Property)({ fieldName: 'body' })];
        _article_decorators = [(0, core_1.ManyToOne)(function () { return article_entity_1.Article; }, { fieldName: 'article_id' })];
        _author_decorators = [(0, core_1.ManyToOne)(function () { return user_entity_1.User; }, { fieldName: 'author_id' })];
        __esDecorate(null, null, _id_decorators, { kind: "field", name: "id", static: false, private: false, access: { has: function (obj) { return "id" in obj; }, get: function (obj) { return obj.id; }, set: function (obj, value) { obj.id = value; } } }, _id_initializers, _instanceExtraInitializers);
        __esDecorate(null, null, _createdAt_decorators, { kind: "field", name: "createdAt", static: false, private: false, access: { has: function (obj) { return "createdAt" in obj; }, get: function (obj) { return obj.createdAt; }, set: function (obj, value) { obj.createdAt = value; } } }, _createdAt_initializers, _instanceExtraInitializers);
        __esDecorate(null, null, _updatedAt_decorators, { kind: "field", name: "updatedAt", static: false, private: false, access: { has: function (obj) { return "updatedAt" in obj; }, get: function (obj) { return obj.updatedAt; }, set: function (obj, value) { obj.updatedAt = value; } } }, _updatedAt_initializers, _instanceExtraInitializers);
        __esDecorate(null, null, _body_decorators, { kind: "field", name: "body", static: false, private: false, access: { has: function (obj) { return "body" in obj; }, get: function (obj) { return obj.body; }, set: function (obj, value) { obj.body = value; } } }, _body_initializers, _instanceExtraInitializers);
        __esDecorate(null, null, _article_decorators, { kind: "field", name: "article", static: false, private: false, access: { has: function (obj) { return "article" in obj; }, get: function (obj) { return obj.article; }, set: function (obj, value) { obj.article = value; } } }, _article_initializers, _instanceExtraInitializers);
        __esDecorate(null, null, _author_decorators, { kind: "field", name: "author", static: false, private: false, access: { has: function (obj) { return "author" in obj; }, get: function (obj) { return obj.author; }, set: function (obj, value) { obj.author = value; } } }, _author_initializers, _instanceExtraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name }, null, _classExtraInitializers);
        Comment = _classThis = _classDescriptor.value;
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return Comment = _classThis;
}();
