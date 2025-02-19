/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Omis Technology. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

// eslint-disable-next-line import/no-unresolved
import { Low } from 'lowdb';

// eslint-disable-next-line import/no-unresolved
import { JSONFile } from 'lowdb/node';
import { app } from 'electron';
import * as path from 'path';

/**
 * Generic database service using LowDB.
 * @template T The type of data stored in the database
 */
export class DatabaseService<T extends object> {
    private readonly db: Low<T>;

    /**
     * Creates a new database instance.
     * @param filename - Name of the database file
     * @param defaults - Default values for the database
     */
    constructor(filename: string, defaults: T) {
        const dbPath = path.join(app.getPath('userData'), filename);
        const adapter = new JSONFile<T>(dbPath);
        this.db = new Low(adapter, defaults);
    }

    /**
     * Gets all data from the database.
     */
    public async getData(): Promise<Readonly<T>> {
        await this.db.read();
        return { ...this.db.data };
    }

    /**
     * Updates data in the database.
     * @param newData - Partial data to update
     */
    public async updateData(newData: Partial<T>): Promise<void> {
        await this.db.read();
        this.db.data = { ...this.db.data, ...newData };
        await this.db.write();
    }

    /**
     * Sets the entire database content.
     * @param data - New data to set
     */
    public async setData(data: T): Promise<void> {
        this.db.data = { ...data };
        await this.db.write();
    }

    /**
     * Gets a specific value from the database.
     * @param key - Key to retrieve
     */
    public async getValue<K extends keyof T>(key: K): Promise<T[K]> {
        await this.db.read();
        return this.db.data[key];
    }

    /**
     * Sets a specific value in the database.
     * @param key - Key to set
     * @param value - Value to set
     */
    public async setValue<K extends keyof T>(key: K, value: T[K]): Promise<void> {
        await this.db.read();
        this.db.data[key] = value;
        await this.db.write();
    }

    /**
     * Resets the database to default values.
     * @param defaults - Default values to reset to
     */
    public async resetToDefaults(defaults: T): Promise<void> {
        this.db.data = { ...defaults };
        await this.db.write();
    }
} 