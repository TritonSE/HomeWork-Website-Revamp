import DonateCarousel from "@/components/DonateCarousel";

export default function Page() {
  return (
    <>
      <h1>Hello</h1>
      <DonateCarousel
        images={["home_page.png", "./images/our-team.png", "./images/get-involved-donate.png"]}
      ></DonateCarousel>
    </>
  );
}
