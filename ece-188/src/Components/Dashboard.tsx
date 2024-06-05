"use client"

import * as React from "react";
import Image from 'next/image'
import Link from "next/link"

const storiesList = [
  { name: "Cat in the Hat", image: "/catInHat.jpg", link: "/ReadAlong" },
  { name: "A Bad Case of Stripes", image: "/badCaseOfStripes.jpg", link: "/ReadAlong"},
  { name: "Brown Bear, Brown Bear, What Do...", image: "/brownBear.jpg", link: "/ReadAlong" },
  { name: "The Very Hungry Caterpillar", image: "/hungryCaterpillar.jpg", link: "/ReadAlong" },
  { name: "The Very Hungry Caterpillar", image: "/hungryCaterpillar.jpg", link: "/ReadAlong" },
  { name: "Horton Hears A Who", image: "/cloudyWMeatballs.jpg", link: "/ReadAlong" },
  { name: "Horton Hears A Who", image: "/hortonHearsWho.jpg", link: "/ReadAlong" },
  { name: "Cloudy With a Chance of Meatballs", image: "/cloudyWMeatballs.jpg", link: "/ReadAlong" },
];

function loadStory() {

}

const HorizontalBar = () => {
  return <div className="w-full h-[1px] bg-slate-200"></div>;
}

const Dashboard = () => {
  return (
    <div className="w-full h-30 ml-10 mr-10 mt-20 bg-white overflow-hidden shadow-lg">
        <h1 className="mt-10 m-auto font-bold text-center text-4xl">
            Recommended Stories
        </h1>
        <div className="mt-10 grid grid-cols-4 gap-4 place-items-center">
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