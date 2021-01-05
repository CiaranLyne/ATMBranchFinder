"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_fetch_1 = __importDefault(require("node-fetch"));
const AWS = __importStar(require("aws-sdk"));
main().then(r => console.log("Grab complete."));
async function main() {
    let settings = await getSettings();
    for (let i = 0; i < settings.Banks.length; i++) {
        let targetURL = settings.Banks[i].URL + "open-banking/v2.2";
        console.log(targetURL);
        await fetchData(targetURL);
    }
}
async function fetchData(targetURL) {
    const headers = {
        "Content-Type": "application/prs.openbanking.opendata.v2.2"
    };
    const response = await node_fetch_1.default(targetURL, { method: "GET", headers: headers });
    console.log(response.statusText);
    console.log("test");
}
async function getSettings() {
    const s3 = new AWS.S3();
    const req = {
        Bucket: "atmbranch-finder-ciaran",
        Key: "settings.json"
    };
    const obj = await s3.getObject(req).promise();
    console.log("Loaded settings.");
    const json = obj.Body.toString('utf-8');
    return JSON.parse(json);
}
