import {
  Directive,
  ElementRef,
  HostBinding,
  inject,
  Input,
  OnDestroy,
  Renderer2,
} from "@angular/core";
import { MatFormFieldControl } from "@angular/material/form-field";
import { ControlValueAccessor, NgControl } from "@angular/forms";
import { BehaviorSubject, Subject } from "rxjs";
import { BooleanInput, coerceBooleanProperty } from "@angular/cdk/coercion";

@Directive()
export abstract class BaseFormFieldControlDirective<T>
  implements MatFormFieldControl<T>, ControlValueAccessor, OnDestroy {

  static nextId = 0;

  public stateChanges = new Subject<void>();

  public touched = false;

  @HostBinding('attr.id') public id: string;

  public onChange: (value: T) => void = () => {};

  public onTouch: () => void = () => {};

  public get shouldLabelFloat() {
    return this.focused || !this.empty;
  }

  public get errorState(): boolean {
    return this.touched && !this.ngControl?.valid;
  }

  public get empty(): boolean {
    return !this.valueState.value;
  }

  @Input('aria-describedby') public userAriaDescribedBy: string = '';

  @Input()
  public get placeholder(): string {
    return this.placeholderValue;
  }
  public set placeholder(value: string) {
    this.placeholderValue = value;
    this.stateChanges.next();
  }
  protected placeholderValue: string = '';

  public get focused(): boolean {
    return this.focusedValue;
  }
  public set focused(value: boolean) {
    this.focusedValue = value;
    this.stateChanges.next();
  }
  protected focusedValue: boolean = false;

  @Input()
  public get required(): boolean {
    return this.requiredValue;
  }
  public set required(value: BooleanInput) {
    this.requiredValue = coerceBooleanProperty(value);
    this.stateChanges.next();
  }
  protected requiredValue: boolean = false;

  @Input()
  public get disabled(): boolean {
    return this.disabledValue;
  }
  public set disabled(value: BooleanInput) {
    this.disabledValue = coerceBooleanProperty(value);
    this.stateChanges.next();
  }
  protected disabledValue = false;

  @Input()
  public get value(): T {
    return this.valueState.value;
  }
  public set value(value: T) {
    this.valueState.next(value);
    this.stateChanges.next();
  }
  protected abstract valueState: BehaviorSubject<T>;

  public elementRef: ElementRef<HTMLElement> = inject(ElementRef<HTMLElement>);
  public ngControl: NgControl | null = inject(NgControl, { optional: true, self: true });
  public renderer: Renderer2 = inject(Renderer2);

  protected constructor(
    public controlType: string,
  ) {
    if (this.ngControl != null) {
      this.ngControl.valueAccessor = this;
    }

    this.id = `${this.controlType}-${BaseFormFieldControlDirective.nextId++}`;
  }

  public abstract onContainerClick(): void;

  public abstract writeValue(value: T | null): void;

  public ngOnDestroy() {
    this.stateChanges.complete();
  }

  public setDescribedByIds(ids: string[]) {
    this.renderer.setAttribute(this.elementRef.nativeElement, 'aria-describedby', ids.join(' '));
  }

  public registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  public registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }

  public setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }
}
