import { ThemeProvider } from "@tritonse/tse-constellation";
import { PageHeader } from "./components/PageHeader";

export default function App() {
  return (
    <ThemeProvider>
      <PageHeader></PageHeader>
    </ThemeProvider>
  );
}
