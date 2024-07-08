export async function httpGet<TResponse>(url: string): Promise<TResponse> {
  return {} as TResponse;
}

export async function httpPost<TResponse, TRequest>(
  url: string,
  options?: TRequest
): Promise<TResponse> {
  return {} as TResponse;
}
export async function httpPut<TResponse, TRequest>(
  url: string,
  options?: TRequest
): Promise<TResponse> {
  return {} as TResponse;
}
export async function httpDelete<TResponse>(url: string): Promise<TResponse> {
  return {} as TResponse;
}

import {
  ErrorResponse,
  ResponseType,
  SuccessResponse,
} from "../../models/http";

const get = async <T>(url: string): Promise<ResponseType<T>> => {
  try {
    const response = await fetch(url);
    const data = (await response.json()) as SuccessResponse<T>;
    return data;
  } catch (error) {
    console.error(error);
    return error as ErrorResponse;
  }
};

const post = async <T, P>(
  url: string,
  payload?: P
): Promise<ResponseType<{ id: string }>> => {
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });
    const data = (await response.json()) as SuccessResponse<{ id: string }>;
    return data;
  } catch (error) {
    console.error(error);
    return error as ErrorResponse;
  }
};

const update = async <T, P>(
  url: string,
  payload?: P
): Promise<ResponseType<T>> => {
  try {
    const response = await fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });
    const data = (await response.json()) as SuccessResponse<T>;
    return data;
  } catch (error) {
    console.error(error);
    return error as ErrorResponse;
  }
};

const remove = async <T>(
  url: string
): Promise<ResponseType<{ message: string }>> => {
  try {
    const response = await fetch(url, {
      method: "DELETE",
    });
    const data = (await response.json()) as SuccessResponse<{
      message: string;
    }>;
    return data;
  } catch (error) {
    console.error(error);
    return error as ErrorResponse;
  }
};

export { get, update, remove, post };
