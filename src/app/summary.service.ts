import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Summary } from './summary.model';

@Injectable()
export class SummaryService {
    constructor(private http: HttpClient) { }

    getCustomersMedium() {
        return this.http.get<any>('assets/summary-data.json')
            .toPromise()
            .then(res => <Summary[]>res.data)
            .then(data => { return data; });
    }
}