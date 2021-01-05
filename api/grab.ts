import fetch from "node-fetch";
import * as AWS from 'aws-sdk';
import {Settings} from "./SettingsTypes";

main().then(r => console.log("Grab complete."));

async function main() {
    let settings = await getSettings();

    for (let i = 0; i < settings.Banks.length; i++) {
        let targetURL = settings.Banks[i].URL + "open-banking/v2.2";
        console.log(targetURL);

        await fetchData(targetURL);
    }
}

async function fetchData(targetURL: string) {
    const headers = {
        "Content-Type": "application/prs.openbanking.opendata.v2.2"
    };

    const response = await fetch(targetURL, {method: "GET", headers: headers});

    console.log(response.statusText);
    console.log("test");
}

async function getSettings(): Promise<Settings> {
    const s3: AWS.S3 = new AWS.S3();
    const req: AWS.S3.Types.GetObjectRequest = {
        Bucket: "atmbranch-finder-ciaran",
        Key: "settings.json"
    };
    const obj = await s3.getObject(req).promise();
    console.log("Loaded settings.");
    const json = (obj.Body as any).toString('utf-8');
    return JSON.parse(json) as Settings;
}

