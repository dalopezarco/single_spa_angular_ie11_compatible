import { IIdentity } from './basicEntity.model';
import { IFlexifieldMetadata } from './flexifieldsMetadata.model';

export interface IProcessAttachmentDto extends IIdentity {
  ProcessId: string;
  PersonId: string;
  Extensions: any;
  Metadata: IFlexifieldMetadata[];
}
