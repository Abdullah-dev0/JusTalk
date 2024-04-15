"use client";

import Image from "next/image";

import { cn } from "@/lib/utils";

interface HomeCardProps {
   className?: string;
   icon: string;
   title: string;
   description: string;
   handleClick?: () => void;
}

const HomeCard = ({
   className,
   icon,
   title,
   description,
   handleClick,
}: HomeCardProps) => {
   return (
      <section
         className={cn(
            "bg-orange-1 px-4 py-6 flex flex-col justify-between w-full xl:max-w-[270px] min-h-[260px] rounded-[14px] cursor-pointer",
            className
         )}
         onClick={handleClick}
      >
         <div className="flex-center glassmorphism size-12 rounded-[10px]">
            <Image src={icon} alt="meeting" width={27} height={27} />
         </div>

         <div className="flex flex-col gap-2">
            <h1 className="text-[23px] font-bold">{title}</h1>
            <p className="text-[16px] leading-5 font-normal">{description}</p>
         </div>
      </section>
   );
};

export default HomeCard;
