// Get today date
export function today() {
  let t = new Date();
  t.setDate(t.getDate());
  return t.toISOString().split("T")[0];
}
