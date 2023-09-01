import { NgModule } from '@angular/core';
import { ArrayFormControlDirective } from "./array-form-control.directive";

@NgModule({
  declarations: [
    ArrayFormControlDirective,
  ],
  exports: [
    ArrayFormControlDirective,
  ],
})
export class ArrayFormControlModule {
}
