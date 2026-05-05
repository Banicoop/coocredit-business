import { Insight, PublicFooter, PublicHero, PublicTopbar, Solution } from "@/components/landing/LandingPage";


export default function Home() {
  return (
    <main className="">
      <PublicTopbar/>
      <PublicHero/>
      <Solution/>
      <Insight/>
      <PublicFooter/>
    </main>
  );
}
