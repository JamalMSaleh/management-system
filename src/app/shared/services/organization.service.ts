import { Injectable } from '@angular/core';
import { NgxIndexedDBService } from 'ngx-indexed-db';
import { Observable } from 'rxjs';
import { DbTableNames } from 'src/database-config';
import { CreateOrganization, Organization } from '../../modules/organizations/shared/model/organization.model';

@Injectable({
  providedIn: 'root',
})
export class OrganizationService {

  constructor(private readonly dbService: NgxIndexedDBService) { }
  addOrganization(model: CreateOrganization): Observable<Organization> {
    return this.dbService.add(DbTableNames.Organization, model);
  }
  update(model: Organization): Observable<Organization> {
    return this.dbService.update(DbTableNames.Organization, model);
  }
  getAll(): Observable<Organization[]> {
    return this.dbService.getAll(DbTableNames.Organization);
  }
  delete(id: number): Observable<Organization[]> {
    return this.dbService.delete(DbTableNames.Organization, id);
  }
  getOrganizationByKey(id: number): Observable<Organization> {
    return this.dbService.getByKey(DbTableNames.Organization, id);
  }
}
