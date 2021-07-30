import { Injectable, Inject } from '@angular/core';

import { LocalStorage, SessionStorage } from './local-storage';
import { USER_ID } from '@constants/help.constants';

@Injectable()
export class StorageService {
    constructor(
        @Inject(LocalStorage) private localStorage: any,
        @Inject(SessionStorage) private sessionStorage: any,
        ) {
    }

    public getUser(): any {
        return this.getObject('USER');
    }

    public getTokens(): any {
        return this.getObject('TOKENS');
    }

    public setTokens(token: any): void {
        if (!this.localStorage) { return; }
        this.setObject('TOKENS', token);
    }


    public removeAuthTokens(): void {
        this.remove(USER_ID);
        this.remove('USER');
        this.remove('TOKENS');
    }

    public setUser(user: any): void {
        if (!this.localStorage) { return; }
        this.setObject('USER', user);
    }

    public tryAddViewForMaterial(id: number): boolean {
        if (!this.sessionStorage) { return false; }
        if (!this.getSession(`material${id}`)) {
            this.setSession(`material${id}`, '1');
            return true;
        }
        return false;
    }

    private setSession(key: string, value: string): void {
        if (!this.sessionStorage) { return; }
        sessionStorage[key] = value;
    }

    private getSession(key: string): string {
        if (!this.sessionStorage) { return ''; }
        return sessionStorage[key] || '';
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
