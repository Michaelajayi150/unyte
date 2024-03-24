import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";
import ScrollToTop from "./utils/scrollToTop";
import Hero from "./components/hero";
import Searched from "./components/searched";
import Product from "./components/product";

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route
          element={
            <>
              <Hero />
              <Outlet />
            </>
          }
        >
          <Route path="/" element={<></>} />
          <Route path="/search" element={<Searched />} />
        </Route>

        <Route path="/product/compare" element={<Product />} />
      </Routes>

      <div className="w-fit mx-auto mt-auto text-xs py-6 px-4">
        &copy; {new Date().getFullYear()} - Built with React.js by{" "}
        <a
          className="underline text-red-400"
          href="https://github.com/Michaelajayi150"
        >
          Ajayi Michael
        </a>
      </div>
    </BrowserRouter>
  );
}

export default App;
