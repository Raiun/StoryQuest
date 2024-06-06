"use client"

import * as React from "react";
import Image from 'next/image'
import Link from "next/link"

const storiesList = [
  { name: "Cat in the Hat", image: "/catInHat.jpg", link: "/ReadAlong?title=Cat%20in%20the Hat" },
  { name: "A Bad Case of Stripes", image: "/badCaseOfStripes.jpg", link: "/ReadAlong?title=A%20Bad%20Case%20of%20Stripes"},
  { name: "Brown Bear, Brown Bear, What Do...", image: "/brownBear.jpg", link: "/ReadAlong?title=Brown%20Bear,%20Brown%20Bear,%20What%20Do..." },
  { name: "The Very Hungry Caterpillar", image: "/hungryCaterpillar.jpg", link: "/ReadAlong?title=The%20Very%20Hungry%20Caterpillar" },
  { name: "The Very Hungry Caterpillar", image: "/hungryCaterpillar.jpg", link: "/ReadAlong?title=The%20Very%20Hungry%20Caterpillar" },
  { name: "Horton Hears A Who", image: "/cloudyWMeatballs.jpg", link: "/ReadAlong?title=Horton%20Hears%20A%20Who" },
  { name: "Horton Hears A Who", image: "/hortonHearsWho.jpg", link: "/ReadAlong?title=Horton%20Hears%20A%20Who" },
  { name: "Cloudy With a Chance of Meatballs", image: "/cloudyWMeatballs.jpg", link: "/ReadAlong?title=Cloudy%20With%20a%20Chance%20of%20Meatballs" },
];

const HorizontalBar = () => {
  return <div className="w-full h-[1px] bg-slate-200"></div>;
}

const Dashboard = () => {
  return (
    <div className="w-full h-full mt-20 ml-36 mr-10 mb-0 pt-0 pb-40 p-5 bg-white shadow-lg">
      <h1 className="mt-10 m-auto font-bold text-center text-4xl">
          Recommended Stories
      </h1>
      <HorizontalBar></HorizontalBar>
      <div className="w-full h-full mt-10 grid grid-cols-4 gap-4 place-items-center">
      {storiesList.map((story, index) => (
        <Link href={story.link}>
          <div
          key={index}
          className="w-80 h-48 shadow-lg bg-black hover:bg-gray-300 text-white flex flex-col items-center justify-center"
          >
            <img className="h-4/5" src={story.image} alt={story.name}></img>
            <HorizontalBar></HorizontalBar>
            {story.name}
          </div>
        </Link>
      ))}
      </div>
    </div>
  );
}

export default Dashboard