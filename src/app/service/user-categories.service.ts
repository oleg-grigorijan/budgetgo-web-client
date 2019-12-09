import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {Observable, ReplaySubject, Subject, throwError} from 'rxjs';
import {UserCategory} from '../entity/user-category';
import {BasicAuthenticationService} from './basic-authentication.service';
import {HttpClient, HttpErrorResponse, HttpParams} from '@angular/common/http';
import {catchError, switchMap, tap} from 'rxjs/operators';
import {Category} from '../entity/category';

@Injectable({providedIn: 'root'})
export class UserCategoriesService {

    private readonly categoriesApiUrl = environment.apiBaseUrl + '/categories';
    private readonly userCategoriesApiUrl = environment.apiBaseUrl + '/me/categories';

    private userCategories: UserCategory[];

    private userCategoriesSubject: Subject<UserCategory[]> = new ReplaySubject(1);
    userCategories$ = this.userCategoriesSubject.asObservable();

    constructor(private readonly http: HttpClient, private readonly authenticationService: BasicAuthenticationService) {
        authenticationService.authentication$.subscribe(isAuthenticated => {
            if (isAuthenticated) {
                this.fetch();
            } else {
                this.userCategories = null;
                this.userCategoriesSubject.next(this.userCategories);
            }
        });
    }

    private fetch(): void {
        this.http.get<UserCategory[]>(this.userCategoriesApiUrl).subscribe(userCategories => {
            this.userCategories = userCategories;
            this.userCategoriesSubject.next(this.userCategories);
        });
    }

    private getCategoryByName(categoryName: string): Observable<Category> {
        return this.http.get<Category>(this.categoriesApiUrl, {params: new HttpParams().set('name', categoryName)})
            .pipe(catchError(error => {
                if (error instanceof HttpErrorResponse && error.status === 404) {
                    return this.http.post<Category>(this.categoriesApiUrl, {name: categoryName});
                } else {
                    throwError(error);
                }
            }));
    }

    create(source): Observable<UserCategory> {
        return this.http.post<UserCategory>(this.userCategoriesApiUrl, source).pipe(tap(userCategory => {
            this.userCategories.push(userCategory);
            this.userCategoriesSubject.next(this.userCategories);
        }));
    }

    createByCategoryName(categoryName: string, source): Observable<UserCategory> {
        return this.getCategoryByName(categoryName).pipe(switchMap(category => {
            source.categoryId = category.id;
            return this.create(source);
        }));
    }

    patch(categoryId: number, patches): Observable<UserCategory> {
        return this.http.patch<UserCategory>(this.userCategoriesApiUrl + '/' + categoryId, patches).pipe(tap(userCategory => {
            this.userCategories = this.userCategories.map(uc => {
                if (uc.category.id === categoryId) {
                    return userCategory;
                } else {
                    return uc;
                }
            });
            this.userCategoriesSubject.next(this.userCategories);
        }));
    }

    delete(categoryId: number): Observable<void> {
        return this.http.delete<void>(this.userCategoriesApiUrl + '/' + categoryId).pipe(tap(() => {
            this.userCategories = this.userCategories.filter(uc => uc.category.id !== categoryId);
            this.userCategoriesSubject.next(this.userCategories);
        }));
    }
}
