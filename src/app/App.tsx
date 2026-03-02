import { RouterProvider } from 'react-router';
import { router } from './routes';
import { Toaster } from './components/ui/sonner';
import { InventoryProvider } from './context/inventory-context';
import { LiveBookingNotifications } from './components/live-booking-notifications';

function App() {
  return (
    <InventoryProvider>
      <RouterProvider router={router} />
      {/* <LiveBookingNotifications /> */}
      <Toaster position="top-right" />
    </InventoryProvider>
  );
}

export default App;