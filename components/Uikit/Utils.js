import { arrayMove as dndKitArrayMove } from "@dnd-kit/sortable";

export function removeAtIndex (array, index) {
  return [...array.slice(0, index), ...array.slice(index + 1)];
};

export function insertAtIndex (array, index, item) {
  return [...array.slice(0, index), item, ...array.slice(index)];
};

export function arrayMove (array, oldIndex, newIndex){
  return dndKitArrayMove(array, oldIndex, newIndex);
};
