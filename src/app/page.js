// import Image from "next/image";
import Card from "@/components/Card";
import SearchPanel from "@/components/SearchPanel";

export default function Home() {
  return (
    <div class="grid grid-cols-4 bg-[url('/background.jpg')] p-1">
      <div class="bg-[#949191]/30 p-4 m-1 rounded-md flex flex-col gap-4 col-span-4 md:col-span-3">
        <Card />
        <Card />
      </div>
      <SearchPanel visible={false} />
    </div>
  );
}
/* vi: set et sw=2: */
