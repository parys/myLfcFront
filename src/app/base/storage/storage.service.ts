import { Injectable, Inject } from '@angular/core';

import { LocalStorage } from './local-storage';
import { USER_ID } from '@constants/help.constants';

@Injectable()
export class StorageService {
    constructor(
        @Inject(LocalStorage) private localStorage: any) {
    }

    public getUser(): any {
        this.getObject('USER');
    }

    public removeAuthTokens(): void {
        this.remove(USER_ID);
        this.remove('USER');
    }

    public setUser(user: any): void {
        if (!this.localStorage) { return; }
        this.setObject('USER', user);
    }

    public tryAddViewForMaterial(id: number): boolean {
        if (!this.localStorage) { return false; }
        if (!this.get(`material${id}`)) {
            this.set(`material${id}`, '1');
            return true;
        }
        return false;
    }

    private set(key: string, value: string): void {
        if (!this.localStorage) { return; }
        localStorage[key] = value;
    }

    private get(key: string): string {
        if (!this.localStorage) { return ''; }
        return localStorage[key] || '';
    }

    private setObject(key: string, value: any): void {
        if (!this.localStorage) { return; }
        localStorage[key] = JSON.stringify(value);
    }

    private getObject(key: string): any {
        if (!this.localStorage) { return null; }
        if (localStorage[key]) {
            return JSON.parse(localStorage[key]);
        }
        return null;
    }

    private remove(key: string): void {
        if (!this.localStorage) { return; }
        this.localStorage.removeItem(key);
    }
}
