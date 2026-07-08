export const formatHistoryDate = (dateString: string): string => {
  const date = new Date(dateString);

  // Formateador para el mes abreviado y el día (ej: "Oct 24")
  const dateOptions: Intl.DateTimeFormatOptions = {
    month: 'short',
    day: 'numeric',
  };

  // Formateador para la hora en formato 24h (ej: "14:20")
  const timeOptions: Intl.DateTimeFormatOptions = {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  };

  const formattedDate = date.toLocaleDateString('en-US', dateOptions);
  const formattedTime = date.toLocaleTimeString('en-US', timeOptions);

  // Capitalizamos la primera letra del mes por si acaso (ej: "oct" -> "Oct")
  const cleanDate = formattedDate.charAt(0).toUpperCase() + formattedDate.slice(1);

  return `${cleanDate}, ${formattedTime}`;
};