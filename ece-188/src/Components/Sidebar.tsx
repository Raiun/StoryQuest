"use client"

import * as React from "react";
import { IconType } from "react-icons";
import { BsBookHalf } from "react-icons/bs";
import { IoSettingsOutline } from "react-icons/io5";
import { MdLocalGroceryStore } from "react-icons/md";
import { Reenie_Beanie } from "next/font/google";
import Link from "next/link"

type Props = {
    iconType: IconType
};

const reenieBeanie = Reenie_Beanie({ weight: "400", subsets: ["latin"] });

const Sidebar = () => {
  return (
    <div className="fixed w-24 h-screen m-0 bg-white flex flex-col shadow-lg">
        <div className="w-full mb-5 h-20 text-3xl bg-black">
            <div className={reenieBeanie.className}>
                <p className="m-auto font-bold text-white text-center">Story Quest</p>
            </div>
        </div>
        <Link href="/">
            <SideBarIcon icon={<BsBookHalf size="30" />} text="Stories" />
        </Link>
        <SideBarIcon icon={<MdLocalGroceryStore size="30" />} text="Store" />
        <SideBarIcon icon={<IoSettingsOutline size="30" />} text="Settings" />
    </div>
  );
}

const SideBarIcon = ({ icon, text = "tooltip 💡" } : {icon: any, text: string}) => {
    return(
        <div className="sidebar-icon group">
            {icon}

            <span className="sidebar-tooltip group-hover:scale-100">
                {text}
            </span>
        </div>
    );
}

export default Sidebar