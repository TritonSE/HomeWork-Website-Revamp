import { PageHeader } from "../components/PageHeader";

export default function Page() {
  return (
    <>
      <PageHeader
        imageUrl={"/home_page.png"}
        header={"Amplifying the voices of previously incarcerated individuals"}
        subheader={
          "We're committed to amplifying the voices of those rebuilding their lives, offering support, mentorship, and guidance for enduring personal growth within a nurturing community."
        }
      ></PageHeader>
      <h1>Hello</h1>
    </>
  );
}
