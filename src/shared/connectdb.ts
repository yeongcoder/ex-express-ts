import express, { Request, Response, NextFunction } from 'express';
import {Connection, createConnection, getConnectionManager} from "typeorm";

async function getOrCreateDBConnection() {
    const option = {
        "name": "default",
        "type": "mariadb",
        "host": "localhost",
        "port": 3306,
        "username": "yeongjeseo",
        "password": "123",
        "database": "paywork",
        "synchronize": true,
        "logging": false,
        "entities": [
            "src/models/*.ts"
        ]
    }
    let conn:any;

    if (hasConnection(option.name)) {
        conn = getDBConnection(option.name);

        if (!conn.isConnected)
            await conn.connect();

        return conn;
    } else {
        return await createDBConnection(option);
    }
}

function hasConnection(connectionName:string) {
    return getConnectionManager().has(connectionName)
}

function getDBConnection(connectionName:string = 'default') {
    try {
        if (getConnectionManager().has(connectionName)) {
            return getConnectionManager().get(connectionName)
        } else {
            console.log('undefind DB Connection. Create first!');
            return undefined;
        }
    } catch(error) {
        console.error('getDBConnection fail!', error);
    }

    return undefined;
}

async function createDBConnection(option:any, doConnect:boolean = true) {
    try {
        // Creates a new connection based on the given connection options and registers it in the manager. 
        // Connection won't be established, you'll need to manually call connect method to establish connection.
         

        let conn = getConnectionManager().create(option);

        if (doConnect)
            await conn.connect();

        return conn;
    } catch (error) {
        console.error("createDBConnection fail!", option, error)
        return undefined;
    }
}

export default getOrCreateDBConnection;