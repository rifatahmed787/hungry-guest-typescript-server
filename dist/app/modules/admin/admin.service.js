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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminService = void 0;
/* eslint-disable @typescript-eslint/no-explicit-any */
const http_status_1 = __importDefault(require("http-status"));
const mongoose_1 = __importDefault(require("mongoose"));
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const admin_model_1 = require("./admin.model");
const auth_model_1 = __importDefault(require("../auth/auth.model"));
const getSingleAdmin = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield admin_model_1.Admin.findOne({ id });
    return result;
});
const getAllAdmins = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield admin_model_1.Admin.findAll();
    return result;
});
const updateAdmin = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const isExist = yield admin_model_1.Admin.findOne({ id });
    if (!isExist) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, "Admin not found !");
    }
    const { name } = payload, adminData = __rest(payload, ["name"]);
    const updatedStudentData = Object.assign({}, adminData);
    if (name && Object.keys(name).length > 0) {
        Object.keys(name).forEach((key) => {
            const nameKey = `name.${key}`;
            updatedStudentData[nameKey] = name[key];
        });
    }
    const result = yield admin_model_1.Admin.findOneAndUpdate({ id }, updatedStudentData, {
        new: true,
    });
    return result;
});
const deleteAdmin = (id) => __awaiter(void 0, void 0, void 0, function* () {
    // check if the admin is exist
    const isExist = yield admin_model_1.Admin.findOne({ id });
    if (!isExist) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, "Admin not found !");
    }
    const session = yield mongoose_1.default.startSession();
    try {
        session.startTransaction();
        //delete user first
        const student = yield admin_model_1.Admin.findOneAndDelete({ id }, { session });
        if (!student) {
            throw new ApiError_1.default(404, "Failed to delete User");
        }
        //delete user
        yield auth_model_1.default.deleteOne({ id });
        session.commitTransaction();
        session.endSession();
        return student;
    }
    catch (error) {
        session.abortTransaction();
        throw error;
    }
});
exports.AdminService = {
    getSingleAdmin,
    getAllAdmins,
    updateAdmin,
    deleteAdmin,
};
