"use client";

import { useEffect, useState } from "react";

export default function Timezone() {
  const [utc, setUtc] = useState("");

  useEffect(() => {
    const offsetMinutes = new Date().getTimezoneOffset();
    const offsetHours = -(offsetMinutes / 60);
    const utcString =
      offsetHours >= 0 ? `UTC+${offsetHours}` : `UTC${offsetHours}`;

    setUtc(utcString);
  }, []);

  return <span>{utc}</span>;
}
