import { Injectable } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { Observable, of } from "rxjs";
import { Shopping, ShoppingShort } from "../model";
import {
  ShoppingCreateModalComponent,
  ShoppingCreateModalData,
  ShoppingEditModalComponent,
  ShoppingEditModalData,
} from "../modals";
import { AuthService } from "../../../shared/modules/auth";
import { User } from "../../users";

@Injectable()
export class ShoppingModalService {
  constructor(
    private matDialog: MatDialog,
  ) {
  }

  public openCreateModal(userId: User['id']): Observable<ShoppingShort | undefined> {
    return this.matDialog
      .open<ShoppingCreateModalComponent, ShoppingCreateModalData, ShoppingShort>(
        ShoppingCreateModalComponent,
        {
          data: {
            showUser: true, // this.authService.protectedUser.id !== userId,
            userId,
          },
          disableClose: true,
          autoFocus: false,
          width: '100vw',
          maxWidth: '60rem',
        }
      )
      .afterClosed();
  }

  public openEditModal(
    shopping: ShoppingShort,
    userId: User['id'],
  ): Observable<ShoppingShort | undefined> {
    debugger;
    return this.matDialog
      .open<ShoppingEditModalComponent, ShoppingEditModalData, ShoppingShort>(
        ShoppingEditModalComponent,
        {
          disableClose: true,
          autoFocus: false,
          data: {
            shopping,
            showUser: true, //this.authService.protectedUser.id !== userId,
            userId,
          },
          width: '100vw',
          maxWidth: '60rem',
        },
      )
      .afterClosed();
  }

  public openShareModal(
    shopping: Shopping,
  ): Observable<Shopping | undefined> {
    // return this.matDialog
    //   .open<ShoppingEditModalComponent, ShoppingEditModalData, ShoppingShort>(
    //     ShoppingEditModalComponent,
    //     {
    //       disableClose: true,
    //       autoFocus: false,
    //       data: { shopping, showUser, user },
    //       width: '100vw',
    //       maxWidth: '48rem',
    //     },
    //   )
    //   .afterClosed();
    return of(undefined);
  }
}
