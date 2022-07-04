import crypto from 'crypto';


export const station = {
  "id": 3006,
  "name": "Fortlette Plaza",
  "rewardBikesAvailable": 7,
  "rewardDocksAvailable": 10,
  "kioskStatus": "FullService",
  "kioskPublicStatus": "Active",
  "kioskConnectionStatus": "Active",
  "kioskType": 1,
  "addressStreet": "246 S. 40th St.",
  "addressCity": "Philadelphia",
  "addressState": "PA",
  "addressZipCode": "19104",
  "bikes": [
      {
          "dockNumber": 2,
          "isElectric": true,
          "isAvailable": true,
          "battery": 0.8
      },
      {
          "dockNumber": 10,
          "isElectric": false,
          "isAvailable": true,
          "battery": null
      },
      {
          "dockNumber": 12,
          "isElectric": true,
          "isAvailable": true,
          "battery": 0.8
      },
      {
          "dockNumber": 13,
          "isElectric": true,
          "isAvailable": true,
          "battery": 0.8
      },
      {
          "dockNumber": 14,
          "isElectric": false,
          "isAvailable": true,
          "battery": null
      },
      {
          "dockNumber": 15,
          "isElectric": true,
          "isAvailable": true,
          "battery": 0.8
      },
      {
          "dockNumber": 16,
          "isElectric": true,
          "isAvailable": true,
          "battery": 0.8
      }
  ],
  "isVirtual": false,
  "isEventBased": false,
  "closeTime": null,
  "eventEnd": null,
  "eventStart": null,
  "notes": null,
  "openTime": null,
  "publicText": "",
  "timeZone": null,
  "kioskId": 3006,
  "trikesAvailable": 0,
  "latitude": 39.9522,
  "longitude": -75.20311,
  "coordinates": [
    -75.19884,
    39.96016
  ],
  "totalDocks": 20,
  "docksAvailable": 17,
  "bikesAvailable": 3,
  "classicBikesAvailable": 2,
  "smartBikesAvailable": 0,
  "electricBikesAvailable": 1,
  "batchId": crypto.randomUUID()  
}


export const createdStation = {
  ...station,
  "stationId":  crypto.randomUUID(),
  "createdAt": new Date(),
  "updatedAt": new Date(),
  "deletedAt": null
}

export const updatedStation = {
  ...createdStation,
  name: "Fortlette Plaza Updated"
}

