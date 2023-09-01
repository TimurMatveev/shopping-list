import { NgModule } from '@angular/core';
import { StatusComponent } from "./components/status/status.component";

@NgModule({
  declarations: [
    StatusComponent,
  ],
  exports: [
    StatusComponent,
  ],
})
export class StatusModule { }
