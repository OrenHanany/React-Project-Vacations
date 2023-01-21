import Vacation from "../Models/Vacation";

export class VacationState {
  vacation: Vacation | undefined;
}

export enum vacationActionType {
  edit = "edit",
}

// how the action will go, to prevent bugs
export interface vacationAction {
  type: vacationActionType;
  payload?: any;
}

export function edit(vacation: Vacation) {
  return {
    type: vacationActionType.edit,
    payload: vacation,
  };
}

export function vacationReducer(
  prevVacation: VacationState = new VacationState(),
  action: any
) {
  const newVacation = { ...prevVacation };
  switch (action.type) {
    case vacationActionType.edit:
      newVacation.vacation = action.payload;
      break;
  }
  return newVacation;
}