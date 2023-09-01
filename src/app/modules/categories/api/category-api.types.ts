import { I18nRecord } from "../../../shared/types/i18n-record.types";

export type CategoryDto = {
  id: string;
  name: I18nRecord;
  image: string;
  tags?: string[];
}
