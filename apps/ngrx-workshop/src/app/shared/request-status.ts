export enum LoadingState {
  IDLE = "idle",
  PENDING = "pending",
  FULFILLED = "fulfilled",
}

export interface ErrorState {
  errorMessage: string;
}

export type RequestStatus = LoadingState | ErrorState;

export function getErrorMessage(requestStatus: RequestStatus): string | null {
  if ((requestStatus as ErrorState).errorMessage !== undefined) {
    return (requestStatus as ErrorState).errorMessage;
  }
  return null;
}
