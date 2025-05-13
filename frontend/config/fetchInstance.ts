const BACKEND_URL = Deno.env.get("BASE_BACKEND_URL") || "http://catalog-backend:8080";

export const fetchInstance = async (
  url: string,
  options: RequestInit = {}
): Promise<Response> => {
  // Add default headers
  const headers = new Headers(options.headers || {});
  headers.set("Content-Type", "application/json");

  // Retrieve user token from sessionStorage
  let userToken;
  try {
    userToken = JSON.parse(sessionStorage.getItem("user_token") || "null");
  } catch (_error) {
    userToken = undefined;
  }
  if (userToken) {
    headers.set(userToken.header, userToken.token);
  }

  // Add headers to the request
  options.headers = headers;

  // Make the request
  const response = await fetch(`${BACKEND_URL}${url}`, options);

  // Handle errors
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "An error occurred");
  }

  return response;
};