import { useState, useEffect } from "react";

export default function useFetch(url: string) {
  const [data, SetData] = useState([]);
  const [isPending, setIspennding] = useState(true);
  const [error, setError] = useState<null | string>(null);

  useEffect(() => {
    fetch(url)
      .then((res) => {
        if (!res.ok) {
          throw Error("Couldn't fetch the data for that resources.");
        }
        return res.json();
      })
      .then((data) => {
        SetData(data);
        setIspennding(false);
        setError(null);
      })
      .catch((err) => {
        setError(err.message);
        setIspennding(false);
      });
  }, [url]);
  return { data, isPending, error };
}
