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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __setFunctionName = (this && this.__setFunctionName) || function (f, name, prefix) {
    if (typeof name === "symbol") name = name.description ? "[".concat(name.description, "]") : "";
    return Object.defineProperty(f, "name", { configurable: true, value: prefix ? "".concat(prefix, " ", name) : name });
};
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ArticleService = void 0;
var core_1 = require("@mikro-orm/core");
var common_1 = require("@nestjs/common");
var article_entity_1 = require("./article.entity");
var comment_entity_1 = require("./comment.entity");
var ArticleService = exports.ArticleService = function () {
    var _classDecorators = [(0, common_1.Injectable)()];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var ArticleService = _classThis = /** @class */ (function () {
        function ArticleService_1(em, articleRepository, commentRepository, userRepository) {
            this.em = em;
            this.articleRepository = articleRepository;
            this.commentRepository = commentRepository;
            this.userRepository = userRepository;
        }
        ArticleService_1.prototype.findAll = function (userId, query) {
            return __awaiter(this, void 0, void 0, function () {
                var user, _a, qb, author, author, ids_1, res, articlesCount, ids, articles;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            if (!userId) return [3 /*break*/, 2];
                            return [4 /*yield*/, this.userRepository.findOne(userId, { populate: ['followers', 'favorites'] })];
                        case 1:
                            _a = _b.sent();
                            return [3 /*break*/, 3];
                        case 2:
                            _a = undefined;
                            _b.label = 3;
                        case 3:
                            user = _a;
                            qb = this.articleRepository.createQueryBuilder('a').select('a.*').leftJoin('a.author', 'u');
                            if ('tag' in query) {
                                qb.andWhere({ tagList: new RegExp(query.tag) });
                            }
                            if (!('author' in query)) return [3 /*break*/, 5];
                            return [4 /*yield*/, this.userRepository.findOne({ username: query.author })];
                        case 4:
                            author = _b.sent();
                            if (!author) {
                                return [2 /*return*/, { articles: [], articlesCount: 0 }];
                            }
                            qb.andWhere({ author: author.id });
                            _b.label = 5;
                        case 5:
                            if (!('favorited' in query)) return [3 /*break*/, 7];
                            return [4 /*yield*/, this.userRepository.findOne({ username: query.favorited }, { populate: ['favorites'] })];
                        case 6:
                            author = _b.sent();
                            if (!author) {
                                return [2 /*return*/, { articles: [], articlesCount: 0 }];
                            }
                            ids_1 = author.favorites.$.getIdentifiers();
                            qb.andWhere({ author: ids_1 });
                            _b.label = 7;
                        case 7:
                            qb.orderBy({ createdAt: core_1.QueryOrder.DESC });
                            return [4 /*yield*/, qb.clone().count('id', true).execute('get')];
                        case 8:
                            res = _b.sent();
                            articlesCount = res.count;
                            if ('limit' in query) {
                                qb.limit(+query.limit);
                            }
                            if ('offset' in query) {
                                qb.offset(+query.offset);
                            }
                            return [4 /*yield*/, qb.getResult()];
                        case 9:
                            ids = (_b.sent()).map(function (a) { return a.id; });
                            return [4 /*yield*/, this.articleRepository.find({ id: { $in: ids } }, { populate: ['author'] })];
                        case 10:
                            articles = _b.sent();
                            return [2 /*return*/, { articles: articles.map(function (a) { return a.toJSON(user); }), articlesCount: articlesCount }];
                    }
                });
            });
        };
        ArticleService_1.prototype.findFeed = function (userId, query) {
            return __awaiter(this, void 0, void 0, function () {
                var user, _a, res;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            if (!userId) return [3 /*break*/, 2];
                            return [4 /*yield*/, this.userRepository.findOne(userId, { populate: ['followers', 'favorites'] })];
                        case 1:
                            _a = _b.sent();
                            return [3 /*break*/, 3];
                        case 2:
                            _a = undefined;
                            _b.label = 3;
                        case 3:
                            user = _a;
                            return [4 /*yield*/, this.articleRepository.findAndCount({ author: { followers: userId } }, {
                                    populate: ['author'],
                                    orderBy: { createdAt: core_1.QueryOrder.DESC },
                                    limit: +query.limit,
                                    offset: +query.offset,
                                })];
                        case 4:
                            res = _b.sent();
                            console.log('findFeed', { articles: res[0], articlesCount: res[1] });
                            return [2 /*return*/, { articles: res[0].map(function (a) { return a.toJSON(user); }), articlesCount: res[1] }];
                    }
                });
            });
        };
        ArticleService_1.prototype.findOne = function (userId, where) {
            return __awaiter(this, void 0, void 0, function () {
                var user, _a, article;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            if (!userId) return [3 /*break*/, 2];
                            return [4 /*yield*/, this.userRepository.findOneOrFail(userId, { populate: ['followers', 'favorites'] })];
                        case 1:
                            _a = _b.sent();
                            return [3 /*break*/, 3];
                        case 2:
                            _a = undefined;
                            _b.label = 3;
                        case 3:
                            user = _a;
                            return [4 /*yield*/, this.articleRepository.findOne(where, { populate: ['author'] })];
                        case 4:
                            article = _b.sent();
                            return [2 /*return*/, { article: article && article.toJSON(user) }];
                    }
                });
            });
        };
        ArticleService_1.prototype.addComment = function (userId, slug, dto) {
            return __awaiter(this, void 0, void 0, function () {
                var article, author, comment;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.articleRepository.findOneOrFail({ slug: slug }, { populate: ['author'] })];
                        case 1:
                            article = _a.sent();
                            return [4 /*yield*/, this.userRepository.findOneOrFail(userId)];
                        case 2:
                            author = _a.sent();
                            comment = new comment_entity_1.Comment(author, article, dto.body);
                            return [4 /*yield*/, this.em.persistAndFlush(comment)];
                        case 3:
                            _a.sent();
                            return [2 /*return*/, { comment: comment, article: article.toJSON(author) }];
                    }
                });
            });
        };
        ArticleService_1.prototype.deleteComment = function (userId, slug, id) {
            return __awaiter(this, void 0, void 0, function () {
                var article, user, comment;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.articleRepository.findOneOrFail({ slug: slug }, { populate: ['author'] })];
                        case 1:
                            article = _a.sent();
                            return [4 /*yield*/, this.userRepository.findOneOrFail(userId)];
                        case 2:
                            user = _a.sent();
                            comment = this.commentRepository.getReference(id);
                            if (!article.comments.contains(comment)) return [3 /*break*/, 4];
                            article.comments.remove(comment);
                            return [4 /*yield*/, this.em.removeAndFlush(comment)];
                        case 3:
                            _a.sent();
                            _a.label = 4;
                        case 4: return [2 /*return*/, { article: article.toJSON(user) }];
                    }
                });
            });
        };
        ArticleService_1.prototype.favorite = function (id, slug) {
            return __awaiter(this, void 0, void 0, function () {
                var article, user;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.articleRepository.findOneOrFail({ slug: slug }, { populate: ['author'] })];
                        case 1:
                            article = _a.sent();
                            return [4 /*yield*/, this.userRepository.findOneOrFail(id, { populate: ['favorites', 'followers'] })];
                        case 2:
                            user = _a.sent();
                            if (!user.favorites.contains(article)) {
                                user.favorites.add(article);
                                article.favoritesCount++;
                            }
                            return [4 /*yield*/, this.em.flush()];
                        case 3:
                            _a.sent();
                            return [2 /*return*/, { article: article.toJSON(user) }];
                    }
                });
            });
        };
        ArticleService_1.prototype.unFavorite = function (id, slug) {
            return __awaiter(this, void 0, void 0, function () {
                var article, user;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.articleRepository.findOneOrFail({ slug: slug }, { populate: ['author'] })];
                        case 1:
                            article = _a.sent();
                            return [4 /*yield*/, this.userRepository.findOneOrFail(id, { populate: ['followers', 'favorites'] })];
                        case 2:
                            user = _a.sent();
                            if (user.favorites.contains(article)) {
                                user.favorites.remove(article);
                                article.favoritesCount--;
                            }
                            return [4 /*yield*/, this.em.flush()];
                        case 3:
                            _a.sent();
                            return [2 /*return*/, { article: article.toJSON(user) }];
                    }
                });
            });
        };
        ArticleService_1.prototype.findComments = function (slug) {
            return __awaiter(this, void 0, void 0, function () {
                var article;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.articleRepository.findOne({ slug: slug }, { populate: ['comments'] })];
                        case 1:
                            article = _a.sent();
                            return [2 /*return*/, { comments: article.comments.getItems() }];
                    }
                });
            });
        };
        ArticleService_1.prototype.create = function (userId, dto) {
            return __awaiter(this, void 0, void 0, function () {
                var user, article, uniqueCoAuthors, coAuthorUsers;
                var _a;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0: return [4 /*yield*/, this.userRepository.findOne({ id: userId }, { populate: ['followers', 'favorites', 'articles'] })];
                        case 1:
                            user = _b.sent();
                            article = new article_entity_1.Article(user, dto.title, dto.description, dto.body);
                            (_a = article.tagList).push.apply(_a, dto.tagList);
                            if (!(dto.coAuthors && dto.coAuthors.length > 0)) return [3 /*break*/, 3];
                            uniqueCoAuthors = Array.from(new Set(dto.coAuthors)).filter(function (email) { return email !== (user === null || user === void 0 ? void 0 : user.email); });
                            return [4 /*yield*/, this.userRepository.find({ email: { $in: uniqueCoAuthors } })];
                        case 2:
                            coAuthorUsers = _b.sent();
                            if (coAuthorUsers.length !== uniqueCoAuthors.length) {
                                throw new Error('One or more co-authors not found');
                            }
                            coAuthorUsers.forEach(function (coAuthor) { return article.coAuthors.add(coAuthor); });
                            _b.label = 3;
                        case 3:
                            user === null || user === void 0 ? void 0 : user.articles.add(article);
                            return [4 /*yield*/, this.em.flush()];
                        case 4:
                            _b.sent();
                            return [2 /*return*/, { article: article.toJSON(user) }];
                    }
                });
            });
        };
        ArticleService_1.prototype.update = function (userId, slug, articleData) {
            return __awaiter(this, void 0, void 0, function () {
                var user, article, uniqueCoAuthors, coAuthorUsers;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.userRepository.findOne({ id: userId }, { populate: ['followers', 'favorites', 'articles'] })];
                        case 1:
                            user = _a.sent();
                            return [4 /*yield*/, this.articleRepository.findOne({ slug: slug }, { populate: ['author', 'coAuthors'] })];
                        case 2:
                            article = _a.sent();
                            if (!article) {
                                throw new Error('Article not found');
                            }
                            if (!articleData.coAuthors) return [3 /*break*/, 4];
                            uniqueCoAuthors = Array.from(new Set(articleData.coAuthors)).filter(function (email) { return email !== article.author.email; });
                            return [4 /*yield*/, this.userRepository.find({ email: { $in: uniqueCoAuthors } })];
                        case 3:
                            coAuthorUsers = _a.sent();
                            if (coAuthorUsers.length !== uniqueCoAuthors.length) {
                                throw new Error('One or more co-authors not found');
                            }
                            article.coAuthors.removeAll();
                            coAuthorUsers.forEach(function (coAuthor) { return article.coAuthors.add(coAuthor); });
                            _a.label = 4;
                        case 4:
                            (0, core_1.wrap)(article).assign(articleData);
                            return [4 /*yield*/, this.em.flush()];
                        case 5:
                            _a.sent();
                            return [2 /*return*/, { article: article.toJSON(user) }];
                    }
                });
            });
        };
        ArticleService_1.prototype.delete = function (slug) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.articleRepository.nativeDelete({ slug: slug })];
                });
            });
        };
        return ArticleService_1;
    }());
    __setFunctionName(_classThis, "ArticleService");
    (function () {
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name }, null, _classExtraInitializers);
        ArticleService = _classThis = _classDescriptor.value;
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return ArticleService = _classThis;
}();
