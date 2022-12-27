import React, { useEffect, useState } from "react";
import { Storage } from "aws-amplify";
import Link from "next/link";

interface Props {
  storageKey: string | undefined | null;
}

export default function GetStorageLinkComponent({ storageKey }: Props) {
  const [link, setLink] = useState<string | undefined>(undefined);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    setIsLoading(true);
    async function getLink(key: string) {
      let link = await Storage.get(key);
      return link;
    }
    storageKey &&
      getLink(storageKey).then((value) => {
        setLink(value);
      });

    return () => {};
  }, [storageKey]);

  return (
    <div>
      {link && (
        <Link className="link link-primary" target="_blank" href={link}>
          View
        </Link>
      )}
      {!link && <div className="text-error">Document Not Submitted</div>}
    </div>
  );
}
