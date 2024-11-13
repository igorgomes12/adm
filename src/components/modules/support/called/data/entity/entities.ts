export enum Priority {
  LOW = "LOW",
  MEDIUM = "MEDIUM",
  HIGH = "HIGH",
}

export enum TypeCalled {
  BUG = "BUG",
  ASSISTANCE = "ASSISTANCE",
}

export enum TypeContact {
  PHONE = "PHONE",
  EMAIL = "EMAIL",
  WHATSAPP = "WHATSAPP",
  MOBILE = "MOBILE",
}

export enum TypeSolutions {
  PHONE = "PHONE",
  IN_PERSON = "IN_PERSON",
  REMOTE = "REMOTE",
}

export interface Called {
  id?: number;
  priority: Priority;
  caller: string;
  name: string;
  description: string;
  status: boolean;
  type: TypeCalled;
  contact: TypeContact;
  system?: string | null;
  module?: string | null;
  requested: string;
  note?: string | null;
  response?: string | null;
  solutionType: TypeSolutions;
  duration?: Date | null;
  completedAt?: Date | null;
  timestampFinally?: Date | null;
  createdAt?: Date | null;
  timestamp?: Date | null;
  updatedAt?: Date | null;
  deletedAt?: Date | null;
}
