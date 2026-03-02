import { createBrowserRouter } from "react-router";
import { HomePage } from "./pages/home-page";
import { BookingPage } from "./pages/booking-page";
import { ConfirmationPage } from "./pages/confirmation-page";
import { PaymentPage } from "./pages/payment-page";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: HomePage,
  },
  {
    path: "/booking",
    Component: BookingPage,
  },
  {
    path: "/confirmation",
    Component: ConfirmationPage,
  },
  {
    path: "/payment",
    Component: PaymentPage,
  },
]);
