export const baseUrl = `${process.env.REACT_APP_URL}/api/v1`

export const HEADERS = {
  "Content-Type": "application/json",
  Accept: "application/json",
  Authorization: `Bearer ${localStorage.getItem("token")}`,
}
