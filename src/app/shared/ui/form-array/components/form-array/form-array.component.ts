import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ContentChild,
  Input,
  OnInit,
  TrackByFunction,
} from '@angular/core';
import { FormArray, FormGroup } from "@angular/forms";
import { trackBySelf } from "../../../../helpers/track-by.helper";
import { FormArrayItemDirective } from "../../directives";
import { CdkDragDrop, moveItemInArray } from "@angular/cdk/drag-drop";

@Component({
  selector: 'sl-form-array[formArray][createControl]',
  templateUrl: './form-array.component.html',
  styleUrls: ['./form-array.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormArrayComponent<T, G extends FormGroup> implements OnInit {
  @Input() public formArray!: FormArray<G>;

  @Input() public items: T[] = [];

  @Input() public addText: string = '';

  @Input() public addIcon: string = 'add';

  @Input() public minLength: number = 0;

  @Input() public maxLength: number = Infinity;

  @Input() public createControl!: (value?: T) => G;

  @ContentChild(FormArrayItemDirective) public formArrayItemDirective!: FormArrayItemDirective<T, G>;

  public readonly trackByControl: TrackByFunction<G> = trackBySelf;

  constructor(
    private changeDetectorRef: ChangeDetectorRef,
  ) {
  }

  public ngOnInit(): void {
    this.items.forEach((item: T) => this.formArray.push(this.createControl(item)));

    while(this.formArray.length < this.minLength) {
      this.formArray.push(this.createControl());
    }
  }

  public addControl(item?: T): void {
    this.formArray.push(this.createControl(item));
  }

  public swapControls(previousIndex: number, nextIndex: number): void {
    moveItemInArray(this.formArray.controls, previousIndex, nextIndex);
    this.changeDetectorRef.markForCheck();
  }
}
