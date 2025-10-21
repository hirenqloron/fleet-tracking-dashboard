export const formatDateTime = (dateString) => {
  if (!dateString) return "N/A";
  const date = new Date(dateString);
  if (isNaN(date.getTime())) return "N/A";

  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const seconds = String(date.getSeconds()).padStart(2, "0");

  return `${day}/${month}/${year}, ${hours}:${minutes}:${seconds}`;
};

export const formatETA = (etaString) => {
  if (!etaString || etaString === "-") return "-";
  const eta = new Date(etaString);
  if (isNaN(eta.getTime())) return "-";

  const day = String(eta.getDate()).padStart(2, "0");
  const month = String(eta.getMonth() + 1).padStart(2, "0");
  const year = eta.getFullYear();
  const hours = String(eta.getHours()).padStart(2, "0");
  const minutes = String(eta.getMinutes()).padStart(2, "0");
  const seconds = String(eta.getSeconds()).padStart(2, "0");

  return `${day}/${month}/${year}, ${hours}:${minutes}:${seconds}`;
};

export const formatLocation = (location) => {
  if (!location || !location.lat || !location.lng) return "N/A";
  return `${parseFloat(location.lat).toFixed(4)}, ${parseFloat(
    location.lng
  ).toFixed(4)}`;
};
