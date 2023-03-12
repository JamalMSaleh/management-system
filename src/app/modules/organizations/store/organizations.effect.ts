import { Injectable } from "@angular/core";
import { Actions, createEffect, CreateEffectMetadata, ofType } from "@ngrx/effects";
import { catchError, map, switchMap, of } from "rxjs";
import { deleteOrganization, deleteOrganizationError, deleteOrganizationSuccess, getOrganization, getOrganizationError, getOrganizations, getOrganizationsError, getOrganizationsSuccess, getOrganizationSuccess, postOrganization, postOrganizationError, postOrganizationSuccess, updateOrganization, updateOrganizationError, updateOrganizationSuccess } from "./organizations.action";
@Injectable()
export class OrganizationsEffect {
  getAllOrganizations$: CreateEffectMetadata = createEffect(() =>
    this.actions$.pipe(
      ofType(getOrganizations),
      switchMap(() => this.organizationService.getAll()),
      map((organizations: Organization[]) =>
        getOrganizationsSuccess({ organizations }),
      ),
      catchError(() => of(getOrganizationsError())),
    ),
  );
  getOrganizationByKey$: CreateEffectMetadata = createEffect(() =>
    this.actions$.pipe(
      ofType(getOrganization),
      switchMap((action: { id: number }) => this.organizationService.getOrganizationByKey(action.id)),
      map((organization: Organization) => getOrganizationSuccess({ organization })),
      catchError(() => of(getOrganizationError())),
    ),
  );
  addOrganization$: CreateEffectMetadata = createEffect(() =>
    this.actions$.pipe(
      ofType(postOrganization),
      switchMap((action: { organization: CreateOrganization }) => this.organizationService.addOrganization(action.organization)),
      map((organization: Organization) => postOrganizationSuccess({ organization })),
      catchError(() => of(postOrganizationError())),
    ),
  );
  updateOrganization$: CreateEffectMetadata = createEffect(() =>
    this.actions$.pipe(
      ofType(updateOrganization),
      switchMap((action: { organization: Organization }) => this.organizationService.update(action.organization)),
      map((organization: Organization) => updateOrganizationSuccess({ organization })),
      catchError(() => of(updateOrganizationError())),
    ),
  );
  deleteOrganization$: CreateEffectMetadata = createEffect(() =>
    this.actions$.pipe(
      ofType(deleteOrganization),
      switchMap((action: { id: number }) => this.organizationService.delete(action.id)),
      map((organizations: Organization[]) =>
        deleteOrganizationSuccess({ organizations }),
      ),
      catchError(() => of(deleteOrganizationError())),
    ),
  );
  constructor(
    private readonly actions$: Actions,
    private readonly organizationService: OrganizationService,
  ) { }

}
