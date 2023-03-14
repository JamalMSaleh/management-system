import { Injectable } from "@angular/core";
import { Actions, createEffect, CreateEffectMetadata, ofType } from "@ngrx/effects";
import { catchError, map, switchMap, of, tap } from "rxjs";
import { OrganizationService } from "src/app/shared/services/organization.service";
import { ToastService } from "src/app/shared/services/toast.service";
import { OrdersFacade } from "../../orders/store/orders.facade";
import { ActionTypes } from "../shared/enums/action-types";
import { Organization, CreateOrganization } from "../shared/model/organization.model";
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
  getAllOrganizationsError$: CreateEffectMetadata = createEffect(() =>
    this.actions$.pipe(
      ofType(getOrganizationsError),
      tap(() => {
        this.toastService.addErrorMessage(ActionTypes.GetOrganizationsError);
      }),
    ),
    { dispatch: false },
  );
  getOrganizationByKey$: CreateEffectMetadata = createEffect(() =>
    this.actions$.pipe(
      ofType(getOrganization),
      switchMap((action: { id: number }) => this.organizationService.getOrganizationByKey(action.id)),
      map((organization: Organization) => getOrganizationSuccess({ organization })),
      tap(() => {
        this.toastService.addSuccessMessage(ActionTypes.GetOrganizationSuccess);
      }),
      catchError(() => of(getOrganizationError())),
    ),
  );

  getOrganizationByKeyError$: CreateEffectMetadata = createEffect(() =>
    this.actions$.pipe(
      ofType(getOrganizationsError),
      tap(() => {
        this.toastService.addErrorMessage(ActionTypes.GetOrganizationError);
      }),
    ),
    { dispatch: false },
  );
  addOrganization$: CreateEffectMetadata = createEffect(() =>
    this.actions$.pipe(
      ofType(postOrganization),
      switchMap((action: { organization: CreateOrganization }) => this.organizationService.addOrganization(action.organization)),
      map((organization: Organization) => postOrganizationSuccess(organization)),
      catchError(() => of(postOrganizationError())),
    ),
  );

  addOrganizationError$: CreateEffectMetadata = createEffect(() =>
    this.actions$.pipe(
      ofType(getOrganizationsError),
      tap(() => {
        this.toastService.addErrorMessage(ActionTypes.PostOrganizationError);
      }),
    ),
    { dispatch: false },
  );
  updateOrganization$: CreateEffectMetadata = createEffect(() =>
    this.actions$.pipe(
      ofType(updateOrganization),
      switchMap((action: CreateOrganization) => this.organizationService.update(action)),
      map((organization: Organization) => updateOrganizationSuccess(organization)),
      tap(() => {
        this.toastService.addSuccessMessage(ActionTypes.UpdateOrganizationSuccess);
      }),
      catchError(() => of(updateOrganizationError())),
    ),
  );
  updateOrganizationError$: CreateEffectMetadata = createEffect(() =>
    this.actions$.pipe(
      ofType(getOrganizationsError),
      tap(() => {
        this.toastService.addErrorMessage(ActionTypes.UpdateOrganizationError);
      }),
    ),
    { dispatch: false },
  );
  deleteOrganization$: CreateEffectMetadata = createEffect(() =>
    this.actions$.pipe(
      ofType(deleteOrganization),
      switchMap((action: { id: number }) => this.organizationService.delete(action.id)),
      map((organizations: Organization[]) =>
        deleteOrganizationSuccess({ organizations }),
      ),
      tap(() => {
        this.toastService.addSuccessMessage(ActionTypes.DeleteOrganizationSuccess);
      }),
      catchError(() => of(deleteOrganizationError())),
    ),
  );
  deleteOrganizationError$: CreateEffectMetadata = createEffect(() =>
    this.actions$.pipe(
      ofType(getOrganizationsError),
      tap(() => {
        this.toastService.addErrorMessage(ActionTypes.DeleteOrganizationError);
      }),
    ),
    { dispatch: false },
  );
  constructor(
    private readonly actions$: Actions,
    private readonly organizationService: OrganizationService,
    private readonly toastService: ToastService,
    private readonly orderFacade: OrdersFacade,
  ) { }

}
