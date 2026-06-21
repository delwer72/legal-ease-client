const API = process.env.NEXT_PUBLIC_API_URL;

const getHeaders = (token) => ({
  "Content-Type": "application/json",
  ...(token && { Authorization: `Bearer ${token}` }),
});

// ─── RESPONSE HANDLER ────────────────────────────
const handleResponse = async (res) => {
  const contentType = res.headers.get("content-type") || "";
  if (!contentType.includes("application/json")) {
    const text = await res.text();
    throw new Error(`Server returned non-JSON response (status ${res.status}): ${text.slice(0, 150)}`);
  }
  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.message || `Request failed with status ${res.status}`);
  }
  return data;
};

// ─── AUTH ───────────────────────────────────────
export const generateJWT = async (email) => {
  const res = await fetch(`${API}/api/auth/jwt`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email }),
  });
  return handleResponse(res);
};

export const saveUser = async (userData) => {
  const res = await fetch(`${API}/api/users`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(userData),
  });
  return handleResponse(res);
};

// ─── USERS ──────────────────────────────────────
export const getMe = async (token) => {
  const res = await fetch(`${API}/api/users/me`, {
    headers: getHeaders(token),
  });
  return handleResponse(res);
};

export const updateProfile = async (token, data) => {
  const res = await fetch(`${API}/api/users/me`, {
    method: "PATCH",
    headers: getHeaders(token),
    body: JSON.stringify(data),
  });
  return handleResponse(res);
};

export const getAllUsers = async (token) => {
  const res = await fetch(`${API}/api/users`, {
    headers: getHeaders(token),
  });
  return handleResponse(res);
};

export const changeUserRole = async (token, id, role) => {
  const res = await fetch(`${API}/api/users/${id}/role`, {
    method: "PATCH",
    headers: getHeaders(token),
    body: JSON.stringify({ role }),
  });
  return handleResponse(res);
};

export const deleteUser = async (token, id) => {
  const res = await fetch(`${API}/api/users/${id}`, {
    method: "DELETE",
    headers: getHeaders(token),
  });
  return handleResponse(res);
};

// ─── LAWYERS ────────────────────────────────────
export const getLawyers = async (params = {}) => {
  const query = new URLSearchParams(params).toString();
  const res = await fetch(`${API}/api/lawyers?${query}`);
  return handleResponse(res);
};

export const getFeaturedLawyers = async () => {
  const res = await fetch(`${API}/api/lawyers/featured`);
  return handleResponse(res);
};

export const getTopLawyers = async () => {
  const res = await fetch(`${API}/api/lawyers/top`);
  return handleResponse(res);
};

export const getLawyerById = async (id) => {
  const res = await fetch(`${API}/api/lawyers/${id}`);
  return handleResponse(res);
};

export const createLawyerProfile = async (token, data) => {
  const res = await fetch(`${API}/api/lawyers`, {
    method: "POST",
    headers: getHeaders(token),
    body: JSON.stringify(data),
  });
  return handleResponse(res);
};

export const getMyLawyerProfile = async (token) => {
  const res = await fetch(`${API}/api/lawyers/my-profile/me`, {
    headers: getHeaders(token),
  });
  return handleResponse(res);
};

export const updateMyLawyerProfile = async (token, data) => {
  const res = await fetch(`${API}/api/lawyers/my-profile`, {
    method: "PATCH",
    headers: getHeaders(token),
    body: JSON.stringify(data),
  });
  return handleResponse(res);
};

export const togglePublishProfile = async (token, published) => {
  const res = await fetch(`${API}/api/lawyers/my-profile/publish`, {
    method: "PATCH",
    headers: getHeaders(token),
    body: JSON.stringify({ published }),
  });
  return handleResponse(res);
};

export const adminTogglePublish = async (token, id, published) => {
  const res = await fetch(`${API}/api/lawyers/${id}/publish`, {
    method: "PATCH",
    headers: getHeaders(token),
    body: JSON.stringify({ published }),
  });
  return handleResponse(res);
};

export const adminDeleteLawyer = async (token, id) => {
  const res = await fetch(`${API}/api/lawyers/${id}`, {
    method: "DELETE",
    headers: getHeaders(token),
  });
  return handleResponse(res);
};

// ─── HIRING ─────────────────────────────────────
export const sendHiringRequest = async (token, data) => {
  const res = await fetch(`${API}/api/hiring`, {
    method: "POST",
    headers: getHeaders(token),
    body: JSON.stringify(data),
  });
  return handleResponse(res);
};

export const getMyHiringHistory = async (token) => {
  const res = await fetch(`${API}/api/hiring/my`, {
    headers: getHeaders(token),
  });
  return handleResponse(res);
};

export const getLawyerHiringRequests = async (token) => {
  const res = await fetch(`${API}/api/hiring/lawyer`, {
    headers: getHeaders(token),
  });
  return handleResponse(res);
};

export const updateHiringStatus = async (token, id, status) => {
  const res = await fetch(`${API}/api/hiring/${id}/status`, {
    method: "PATCH",
    headers: getHeaders(token),
    body: JSON.stringify({ status }),
  });
  return handleResponse(res);
};

export const checkHired = async (token, lawyerId) => {
  const res = await fetch(`${API}/api/hiring/check/${lawyerId}`, {
    headers: getHeaders(token),
  });
  return handleResponse(res);
};

// ─── PAYMENTS ───────────────────────────────────
export const createPaymentIntent = async (token, hiringId) => {
  const res = await fetch(`${API}/api/payments/create-intent`, {
    method: "POST",
    headers: getHeaders(token),
    body: JSON.stringify({ hiringId }),
  });
  return handleResponse(res);
};

export const confirmPayment = async (token, data) => {
  const res = await fetch(`${API}/api/payments/confirm`, {
    method: "POST",
    headers: getHeaders(token),
    body: JSON.stringify(data),
  });
  return handleResponse(res);
};

export const getAllTransactions = async (token) => {
  const res = await fetch(`${API}/api/payments`, {
    headers: getHeaders(token),
  });
  return handleResponse(res);
};

// ─── COMMENTS ───────────────────────────────────
export const getComments = async (lawyerId) => {
  const res = await fetch(`${API}/api/comments/${lawyerId}`);
  return handleResponse(res);
};

export const postComment = async (token, data) => {
  const res = await fetch(`${API}/api/comments`, {
    method: "POST",
    headers: getHeaders(token),
    body: JSON.stringify(data),
  });
  return handleResponse(res);
};

export const getMyComments = async (token) => {
  const res = await fetch(`${API}/api/comments/user/my`, {
    headers: getHeaders(token),
  });
  return handleResponse(res);
};

export const updateComment = async (token, id, comment) => {
  const res = await fetch(`${API}/api/comments/${id}`, {
    method: "PATCH",
    headers: getHeaders(token),
    body: JSON.stringify({ comment }),
  });
  return handleResponse(res);
};

export const deleteComment = async (token, id) => {
  const res = await fetch(`${API}/api/comments/${id}`, {
    method: "DELETE",
    headers: getHeaders(token),
  });
  return handleResponse(res);
};

// ─── ANALYTICS ──────────────────────────────────
export const getAnalytics = async (token) => {
  const res = await fetch(`${API}/api/admin/analytics`, {
    headers: getHeaders(token),
  });
  return handleResponse(res);
};