export const baseUrl = `${process.env.REACT_APP_URL}/api/v1`

export const headers = () => ({
  "Content-Type": "application/json",
  Accept: "application/json",
  Authorization: `Bearer ${localStorage.getItem("token")}`,
})
