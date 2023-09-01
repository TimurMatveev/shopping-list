import { ChangeDetectionStrategy, Component, ElementRef, ViewChild } from '@angular/core';
import {
  BaseFormFieldControlDirective
} from "../../../../directives/base-form-field-control/base-form-field-control.directive";
import { MatFormFieldControl } from "@angular/material/form-field";
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'sl-img-src-control',
  templateUrl: './img-src-control.component.html',
  styleUrls: ['./img-src-control.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: MatFormFieldControl,
      useExisting: ImgSrcControlComponent,
    },
  ],
})
export class ImgSrcControlComponent extends BaseFormFieldControlDirective<string | null> {
  @ViewChild('urlInput') private urlInput!: ElementRef<HTMLInputElement>;

  protected valueState: BehaviorSubject<string | null> = new BehaviorSubject<string | null>(null);

  public onContainerClick(): void {
    this.urlInput.nativeElement.focus();
  }

  public override get empty(): boolean {
    return !this.urlInput?.nativeElement.value;
  }

  public get hasLoadError(): boolean {
    const control = this.ngControl?.control;

    if (!control) {
      return false;
    }

    return control.hasError('image.load');
  }

  public previewUrl: string = '';

  public previewLoading: boolean = false;

  constructor() {
    super('sl-img-src-control');
  }

  public writeValue(value: string | null): void {
    this.valueState.next(value);
    this.previewUrl = value || '';

    setTimeout(() => {
      if (this.urlInput) {
        this.urlInput.nativeElement.value = value || '';
      }

      this.stateChanges.next();
    });
  }

  onFocusIn() {
    if (!this.focused) {
      this.focused = true;
    }
  }

  onFocusOut(event: FocusEvent) {
    if (!this.elementRef.nativeElement.contains(event.relatedTarget as Element)) {
      this.touched = true;
      this.focused = false;
      this.onTouch();
    }
  }

  public onUrlInput(url: string, valid: boolean): void {
    this.setError('load', false);

    if (!url) {
      this.updateValue(null);
      this.setError('image.url', false);
      return;
    }

    if (!valid) {
      this.updateValue(null);
      this.setError('image.url', true);
      return;
    }

    this.setError('image.url', false);
    this.previewUrl = url;
    this.previewLoading = true;
  }

  public onPreviewLoaded(): void {
    this.previewLoading = false;

    if (this.valueState.value !== this.previewUrl) {
      this.updateValue(this.previewUrl);
    }
  }

  public onPreviewError(): void {
    this.previewLoading = false;
    this.previewUrl = '';
    this.updateValue(null);
    this.setError('image.load', true);
  }

  private updateValue(url: string | null): void {
    if (this.valueState.value == url) {
      return;
    }

    this.valueState.next(url);
    this.onChange(url);
    this.stateChanges.next();
  }

  private setError(errorCode: string, hasError: boolean): void {
    const control = this.ngControl?.control;

    if (!control) {
      return;
    }

    const alreadyHasError = control.hasError(errorCode);

    if (hasError && !alreadyHasError) {
      control.setErrors({
        [errorCode]: true,
        ...control.errors,
      });
      return;
    }

    else if (!hasError && alreadyHasError) {
      const errors = { ...control.errors };
      delete errors[errorCode];
      control.setErrors(errors);
    }

    this.stateChanges.next();
  }
}
