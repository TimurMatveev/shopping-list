import { NgModule } from '@angular/core';
import { PermittedAllPipe, PermittedPipe } from "./pipes";

@NgModule({
  declarations: [
    PermittedPipe,
    PermittedAllPipe,
  ],
  exports: [
    PermittedPipe,
    PermittedAllPipe,
  ],
  providers: [
    PermittedPipe,
    PermittedAllPipe,
  ],
})
export class PermissionModule { }
