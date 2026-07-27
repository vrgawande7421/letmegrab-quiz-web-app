import { Suspense } from "react";
import { useRoutes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ContextProvider } from "./context/CreateContex";
import { AppRoutes } from "./route/AppRoutes";

function App() {
  const router = useRoutes(AppRoutes());
  return (
    <ContextProvider>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <Suspense
        fallback={
          <div className="h-screen flex justify-center items-center font-semibold text-lg text-gray-600">
            Loading...
          </div>
        }
      >
        {router}
      </Suspense>
    </ContextProvider>
  );
}

export default App;
