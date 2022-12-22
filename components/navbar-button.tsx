import React from "react";
import Link from "next/link";

interface Props {
  name: string;
  icon: any;
  linkTo: string;
}
export default function NavBarButton({ name, icon, linkTo }: Props) {
  return (
    <Link
      href={linkTo}
      className="flex justify-start w-52 px-4 py-2 text-gray rounded-xl text-sm hover:bg-anzac-100 hover:border-anzac-100 hover:text-anzac-500  hover:cursor-pointer"
    >
      <div>{icon}</div>
      <div className=" pl-4">{name}</div>
    </Link>
  );
}
