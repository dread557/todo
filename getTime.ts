export function addAMPM(timeString: any) {
  // Split the time string into hours, minutes, and seconds
  const [hours, minutes, seconds] = timeString?.split(":");

  // Convert hours to a number
  let hour = parseInt(hours, 10);

  // Determine whether it's AM or PM
  let ampm = "AM";
  if (hour >= 12) {
    ampm = "PM";
  }

  // Convert 24-hour format to 12-hour format if needed
  if (hour > 12) {
    hour -= 12;
  }

  // Construct the formatted time string with AM/PM
  const formattedTime = `${hour}:${minutes} ${ampm}`;

  return formattedTime;
}

const originalTime = "11:11:00";
const timeWithAMPM = addAMPM(originalTime);
