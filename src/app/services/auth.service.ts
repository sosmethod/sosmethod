import { Injectable, EventEmitter } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { AuthUser } from '../models/auth-user';
import { environment } from '../';
const jwt = require('jsonwebtoken');
const querystring = require('querystring');

@Injectable()
export class AuthService {
    private tokenId: string = 'token';
    private serverId: string = 'api_server';
    loggedIn$: Observable<boolean>;

    constructor(private http: Http) {
        this.isLoggedIn();
    }

    getServer(): string {
        return localStorage.getItem(this.serverId);
    }

    getToken(): string {
        return localStorage.getItem(this.tokenId);
    }

    getDecodedToken(): any {
        return jwt.decode(this.getToken());
    }

    tokenExpired(): boolean {
        let expires: boolean = false;
        let token = this.getDecodedToken();
        let now: any = new Date().getTime();
        if (token && token.iat) {
            let expires: any = new Date(token.iat).getTime() + 3600000;
            let expiresIn = expires - now;
            return expiresIn < 1;
        } else {
            return expires;
        }
    }

    getHeaders(): Headers {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('Authorization', `Bearer ${this.getToken()}`);

        return headers;
    }

    setToken(token: string): void {
        localStorage.setItem(this.tokenId, token);
    }

    setServer(server: string): void {
        localStorage.setItem(this.serverId, server);
    }

    clear(): void {
        localStorage.removeItem(this.tokenId);
        localStorage.removeItem(this.serverId);
    }

    // store the URL so we can redirect after logging in
    redirectUrl: string;

    isLoggedIn(): boolean {
        let loggedIn = !!this.getToken();
        this.loggedIn$ = Observable.of(loggedIn);
        return loggedIn;
    }

    login(authUser: AuthUser): Observable<boolean> {
        const headers = AuthService.getLoginHeaders(authUser);

        return this.http.post(environment.tokenUrl,
            querystring.stringify({
                username: authUser.name,
                password: authUser.password,
                grant_type: environment.grant_type,
                scope: environment.scope,
            }),
            {
                headers: headers
            })
            .map(res => this.extractToken(res, environment.tokenUrl))
            .catch(error => {
                return Observable.throw(new Error(error));
            });
    };

    logout(): void {
        this.clear();
        this.isLoggedIn();
    }

    private extractToken(res: Response, url: string): boolean {
        if (res.status < 200 || res.status >= 300) {
            throw new Error('Bad response status: ' + res.status);
        }

        const success = res.status === 200;

        if (success) {
            const token = res.text();
            this.setToken(token);
            this.setServer(url);
        }

        this.isLoggedIn();
        return success;
    }

    static getLoginHeaders(authUser: AuthUser) {
        let headers = new Headers();
        headers.append('Authorization', `Basic ${btoa(`${environment.client_id}:${environment.client_secret}`)}`);
        headers.append('Content-Type', 'application/x-www-form-urlencoded');

        return headers;
    }
}
