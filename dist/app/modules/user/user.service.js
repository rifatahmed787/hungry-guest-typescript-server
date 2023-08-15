"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const auth_model_1 = __importDefault(require("../auth/auth.model"));
const getUserByEmail = (email) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield auth_model_1.default.findOne({ email });
        return user;
    }
    catch (error) {
        throw new Error("Error fetching user by email");
    }
});
const getAllUsers = () => __awaiter(void 0, void 0, void 0, function* () {
    const allUser = yield auth_model_1.default.find();
    return allUser;
});
const updateUser = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield auth_model_1.default.findByIdAndUpdate(id, payload, { new: true });
    return result;
});
const deleteUser = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield auth_model_1.default.findByIdAndDelete(id);
    return result;
});
exports.UserService = {
    getUserByEmail,
    getAllUsers,
    updateUser,
    deleteUser,
};
