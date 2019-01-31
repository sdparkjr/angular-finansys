import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";

import { Observable, throwError } from "rxjs";
import { map, catchError, flatMap } from "rxjs/operators";

import { Category } from "./category.model";

@Injectable({
  providedIn: "root"
})
export class CategoryService {
  private apiPath: string = "api/categories";

  constructor(private _http: HttpClient) {}

  getAll(): Observable<Category[]> {
    return this._http.get(this.apiPath).pipe(
      catchError(this.handlerError),
      map(this.jsonDataToCategories)
    );
  }

  getByid(id: number): Observable<Category> {
    const url = `${this.apiPath}/${id}`;

    return this._http.get(url).pipe(
      catchError(this.handlerError),
      map(this.jsonDataToCategory)
    );
  }

  create(category: Category): Observable<Category> {
    return this._http.post(this.apiPath, category).pipe(
      catchError(this.handlerError),
      map(this.jsonDataToCategory)
    );
  }

  update(category: Category): Observable<Category> {
    const url = `${this.apiPath}/${category.id}`;

    return this._http.put(url, category).pipe(
      catchError(this.handlerError),
      map(() => category)
    );
  }

  delete(id: number): Observable<any> {
    const url = `${this.apiPath}/${id}`;

    return this._http.delete(url).pipe(
      catchError(this.handlerError),
      map(() => {
        null;
      })
    );
  }

  //PRIVATE METHOD

  private jsonDataToCategories(jsondata: any[]): Category[] {
    const categories: Category[] = [];

    jsondata.forEach(x => categories.push(x as Category)); //populando do dados no array

    return categories;
  }

  private jsonDataToCategory(jsondata: any): Category {
    return jsondata as Category;
  }

  private handlerError(error: any): Observable<any> {
    console.log("Erro na requisição =>" + error);

    return throwError(error);
  }
}
