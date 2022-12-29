import React from "react";
import Link from "next/link";

interface Props {
  name: string;
  icon: any;
  linkTo: string;
  target?: React.HTMLAttributeAnchorTarget;
}
export default function NavBarButton({ name, icon, linkTo, target }: Props) {
  return (
    <Link
      href={linkTo}
      target={target}
      className="flex justify-start px-4 py-2 text-sm w-52 text-gray rounded-xl hover:bg-anzac-100 hover:border-anzac-100 hover:text-anzac-500 hover:cursor-pointer"
    >
      <div>{icon}</div>
      <div className="pl-4 ">{name}</div>
    </Link>
  );
}
