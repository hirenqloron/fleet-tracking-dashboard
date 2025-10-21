export const formatDateTime = (dateString) => {
  if (!dateString) return "N/A";
  const date = new Date(dateString);
  return date.toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
};

export const formatETA = (etaString) => {
  if (!etaString || etaString === "-") return "-";
  const eta = new Date(etaString);
  return eta.toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
};

export const formatLocation = (location) => {
  if (!location || !location.lat || !location.lng) return "N/A";
  return `${parseFloat(location.lat).toFixed(4)}, ${parseFloat(
    location.lng
  ).toFixed(4)}`;
};
