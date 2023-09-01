import { FormControl } from "@angular/forms";

export type DateRangeForm = {
  start: FormControl<Date | null>;
  end: FormControl<Date | null>;
};
