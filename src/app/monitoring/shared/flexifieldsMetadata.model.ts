export interface IFlexifieldMetadata {
  ShortName: string;
  FullName: string;
  Owner: string;
  Versioned: boolean;
  DataType: string;
  List: ICustomList;
  SelectOptions: ISelectOption[];
  SelectedOption: any;
  Group: IFieldGroup;
  Sequence: number;
  Mandatory: boolean;
  Hidden: boolean;
  DefaultValue: string;
  ReadOnly: boolean;
}

export interface ICustomList {
  ShortName: string;
  FullName: string;
  ListValues: ICustomListValues[];
}

export interface ICustomListValues {
  Index: string;
  FullName: string;
  ShortName: string;
}

export interface IFieldGroup {
  Id: string;
  ShortName: string;
  FullName: string;
  Owner: string;
  Sequence: number;
}

export class FieldGroup {
  static otherShortName = 'Other';
  static groupOwnerVendor = 'Vendor';
  static groupOwnerSystem = 'System';
}

export interface ISelectOption {
  id: any;
  name: string;
  group: string;
  description?: string;
}
