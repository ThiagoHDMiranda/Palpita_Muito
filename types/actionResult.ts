export type ActionSuccess<T> = {
  success: true;
  data: T;
};

export type ActionError = {
  success: false;
  message: string;
};

export type ActionResult<T> = ActionSuccess<T> | ActionError;
