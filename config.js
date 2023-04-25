import SES from "aws-sdk/clients/ses.js"
import S3 from 'aws-sdk/clients/s3.js'
import NodeGeocoder from "node-geocoder"


export const DATABASE = 'mongodb+srv://wayne:wayne@cluster0.bdo1fyn.mongodb.net/test'

export const AWS_ACCESS_KEY_ID = "AKIAZG4ECUH2HJX7SQGK"
export const AWS_SECRET_ACCESS_KEY_ID = "VI/WTo8OsuzPzbQgvQ+St9HB5KYlDHIaUBKsrZ4E"


export const EMAIL_FROM = '"Realist Platform" <ymw0331@gmail.com>'
export const REPLY_TO = "ymw0331@gmail.com"

const awsConfig = {
    accessKeyId: AWS_ACCESS_KEY_ID,
    secretAccessKey: AWS_SECRET_ACCESS_KEY_ID,
    region: "ap-southeast-1",
    apiVersion: "2010-12-01",
}


export const AWSSES = new SES(awsConfig)
export const AWSS3 = new S3(awsConfig)

const options = {
    provider: 'google',
    apiKey: "AIzaSyBKbQwqcidgUdosY2cmQLvh--YYaBA162U",
    formatter: null
};

export const GOOGLE_GEOCODER = NodeGeocoder(options);

export const JWT_SECRET = "sljfkldjfksdjfksdjf"
export const CLIENT_URL = "http://localhost:3000"