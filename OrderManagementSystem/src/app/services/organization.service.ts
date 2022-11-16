import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Organization } from '../models/organization';

@Injectable({
  providedIn: 'root'
})

export class OrganizationService {
  private url = "organization";

  constructor(private http: HttpClient)
  {

  }

  public getOrganizations(): Observable<Organization[]> {

    return this.http.get<Organization[]>(`${environment.apiUrl}/${this.url}`);
  }

  public updateOrganization(org: Organization): Observable<Organization[]> {

    return this.http.put<Organization[]>(`${environment.apiUrl}/${this.url}`,org);
  }

  public createOrganization(org: Organization): Observable<Organization[]> {

    return this.http.post<Organization[]>(`${environment.apiUrl}/${this.url}`,org);
  }

  public deleteOrganization(org: Organization): Observable<Organization[]> {

    return this.http.delete<Organization[]>(`${environment.apiUrl}/${this.url}/${org.id}`);
  }
}
