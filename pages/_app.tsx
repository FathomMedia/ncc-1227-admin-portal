import "../styles/globals.css";
import type { AppProps } from "next/app";
import { Amplify } from "aws-amplify";
import awsExports from "../src/aws-exports";
import "@aws-amplify/ui-react/styles.css";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
  BarElement,
  ArcElement,
} from "chart.js";
import { StudentProvider } from "../context/StudentContext";
import { AppProvider } from "../context/AppContext";
import { AuthProvider } from "../hooks/use-auth";
import { AdminProvider } from "../context/AdminContext";
import { EducationProvider } from "../context/EducationContext";

Amplify.configure({ ...awsExports, ssr: true });

//register chart js imports
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Filler,
  Title,
  Tooltip,
  Legend,
  Filler,
  BarElement,
  ArcElement
);

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <AppProvider>
        <AdminProvider>
          <StudentProvider>
            <EducationProvider>
              <Component {...pageProps} />
            </EducationProvider>
          </StudentProvider>
        </AdminProvider>
      </AppProvider>
    </AuthProvider>
  );
}
