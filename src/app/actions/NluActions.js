export const DATA = "DATA";
export const ID = "ID";
export const NAME = "NAME";
export const TEXT = "TEXT";

export const data = (payload) => ({
  type: DATA,
  payload
});

export const id = (newId) => ({
  type: ID,
  newId
});

export const name = (newName) => ({
  type: NAME,
  newName
});

export const text = (newText) => ({
  type: TEXT,
  newText
});
