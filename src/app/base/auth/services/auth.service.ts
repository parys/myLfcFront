import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

import { tap, catchError, flatMap, retry } from 'rxjs/operators';
import { Observable, Subscription, of, interval, throwError } from 'rxjs';

import { StorageService } from '@base/storage';
import { SignalRService } from '@base/signalr';

import { IAuthTokenModel, IRegisterModel, ILoginModel, IRefreshGrantModel } from '../models';
import { UriEncoder } from '../uri-encoder';
import { environment } from '@environments/environment';
import { Store } from '@ngxs/store';
import { SetTokens, SetUser, Logout } from '@auth/store';
import { CookieOptions, Cookies } from '@base/cookie';

@Injectable()
export class AuthService {
    private coockieOptions = new CookieOptions({
        secure: environment.production,
        expires: new Date(new Date().setMonth(new Date().getMonth() + 1)),
        maxAge: 2678400,
        path: '/'
    });
    private refreshSubscription$: Subscription;
    public tokens: IAuthTokenModel;

    constructor(private http: HttpClient,
                private cookies: Cookies,
                private storage: StorageService,
                private signalRService: SignalRService,
                private store: Store
    ) {
    }

    public get authorizationHeader(): string {
        if (this.tokens) {
            return `${this.tokens.token_type} ${this.tokens.access_token}`;
        } else {
            return '';
        }
    }

    public async init(): Promise<IAuthTokenModel> {
        return await this.startupTokenRefresh();
    }

    public register(data: IRegisterModel): Observable<any> {
        return this.http.post(environment.apiUrl + 'api/v1/account/register', data).pipe(
            catchError(res => throwError(res.error)));
    }

    public login(user: ILoginModel): Observable<any> {
        return this.getTokens(user, 'password').pipe(
            catchError(res => throwError(res.error)),
            tap(res => {
                this.scheduleRefresh();
            }));
    }

    public logout(): void {
        this.cookies.remove('auth-tokens');
        this.storage.removeAuthTokens();
        this.store.dispatch(new Logout());
        if (this.refreshSubscription$) {
            this.refreshSubscription$.unsubscribe();
        }
        this.signalRService.initializeHub();
    }

    public async refreshTokens(): Promise<IAuthTokenModel> {
        return await this.getTokens({ refresh_token: this.tokens.refresh_token }, 'refresh_token').toPromise();
    }

    private getTokens(data: IRefreshGrantModel | ILoginModel | any, grantType: string): Observable<IAuthTokenModel> {
        const headers = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8;' });

        Object.assign(data, { scope: 'offline_access' });

        let params2 = new HttpParams({ fromString: '', encoder: new UriEncoder() });
        params2 = params2.set('grant_type', grantType);
        Object.keys(data)
            .forEach(key => params2 = params2.append(key, data[key]));

        return this.http.post<IAuthTokenModel>(environment.apiUrl + 'connect/token', params2.toString(), { headers }).pipe(
            retry(2),
            tap((tokens: IAuthTokenModel) => {
                this.parseTokens(tokens);
            }));
    }

    private async startupTokenRefresh(): Promise<any> {
        const tokensFromStore = this.storage.getTokens();
        const tokensFromCookie = this.cookies.getObject('auth-tokens');
     //   console.warn(tokensFromStore, tokensFromCookie);
        this.tokens = tokensFromStore ?? tokensFromCookie;
        if (!this.tokens) {
            this.signalRService.initializeHub();
            return of('');
        }
        this.store.dispatch(new SetTokens(this.tokens));
        const data = this.storage.getUser();
        this.setUser(data);

        return await this.refreshTokens();
    }

    private scheduleRefresh(): void {
        // refresh every half the total expiration time
        if (this.tokens) {
            this.refreshSubscription$ = interval(this.tokens.expires_in * 500).pipe(
                flatMap(() => this.refreshTokens()))
                .subscribe();
        }
    }

    private setUserProfile(user: any): void {
        this.storage.setUser(user);
        this.setUser(user);
        this.signalRService.initializeHub();
    }

    private setUser(data: any): void {
        if (data) {
            this.store.dispatch(new SetUser(data));
        }
    }

    private setTokens(tokens: IAuthTokenModel): void {
        this.cookies.setObject('auth-tokens', tokens, this.coockieOptions);
        this.storage.setTokens(tokens);
    }

    private parseTokens(tokens: IAuthTokenModel): void {
        tokens.expiration_date = new Date(new Date().getTime() + tokens.expires_in * 1000).getTime().toString();
        tokens.refresh_token = tokens.refresh_token ?? this.tokens?.refresh_token;
        tokens.id_token = '';
        const user = JSON.parse(atob(tokens.access_token.split('.')[1]));

        this.setTokens(tokens);

        this.tokens = tokens;
        this.store.dispatch(new SetTokens(tokens));
        this.setUserProfile(user);
        this.scheduleRefresh();
    }
}
