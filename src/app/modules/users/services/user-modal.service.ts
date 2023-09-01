import { Injectable } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { Observable } from "rxjs";
import { UserEditModalComponent } from "../modals/user-edit-modal/user-edit-modal.component";
import { User } from "../model";

@Injectable()
export class UserModalService {
  constructor(
    private matDialog: MatDialog,
  ) {
  }

  // public openCreateModal(): Observable<User | undefined> {
  //   return this.matDialog
  //     .open<UserCreateModalComponent, void, User>(
  //       UserCreateModalComponent,
  //       {
  //         disableClose: true,
  //         autoFocus: false,
  //       }
  //     )
  //     .afterClosed();
  // }

  public openEditModal(user: User): Observable<User | undefined> {
    return this.matDialog
      .open<UserEditModalComponent, User, User>(
        UserEditModalComponent,
        {
          disableClose: true,
          autoFocus: false,
          data: user,
        },
      )
      .afterClosed();
  }
}
