const API_URL = import.meta.env.VITE_API_URL + "/users";

// ================= LOGIN =================
export const loginUser = async (email: string, password: string) => {
  const res = await fetch(`${API_URL}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  console.log("STATUS:", res.status);

  const data = await res.json();
  console.log("LOGIN RESPONSE:", data);

  if (!res.ok) {
    throw new Error(data.message || "Login failed");
  }

  return data;
};

// ================= REGISTER =================
export const registerUser = async (data: any) => {
  const res = await fetch(`${API_URL}/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!res.ok) throw new Error("Register failed");

  return res.json();
};

// ================= GET USERS =================
export const getUsers = async () => {
  const res = await fetch(API_URL);

  if (!res.ok) throw new Error("Failed to fetch users");

  return res.json();
};