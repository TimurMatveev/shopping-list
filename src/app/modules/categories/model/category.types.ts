import { I18nRecord } from "../../../shared/types/i18n-record.types";

export type Category = {
  key: string;
  name: I18nRecord;
  image: string;
  tags: Set<string>;
};
