import { CTA, Framework, OperatingSystem, Paths, PublicFooter, PublicHero, PublicNav } from "@/components/landing/LandingPage";


export default function Home() {
  return (
    <main className="">
      <PublicNav/>
      <PublicHero/>
      <Framework/>
      <Paths/>
      <OperatingSystem/>
      <CTA/>
      <PublicFooter/>
    </main>
  );
}
