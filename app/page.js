import Garden from "@/components/models/garden";
import RenderModel from "@/components/RenderModel";
import Image from "next/image";

export default function Home() {
  return (
    <div
      className={
        "flex min-h-screen flex-col items-center justify-between relative"
      }
    >
      <div className={"w-full h-screen"}>
        <RenderModel></RenderModel>
      </div>
    </div>
  );
}
