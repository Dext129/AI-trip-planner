import Image from "next/image";
import { Button } from "@/components/ui/button";
import Hero from "./_components/Hero";
import { PopularCityList } from "./PopularCityList";

export default function Home() {
  return (
    <div>
      <Hero />
      <PopularCityList />
    </div>
  );
}
  