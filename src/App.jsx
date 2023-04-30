import { Link, Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "./App.css";

import InfiniteQueriesPage from "./components/InfiniteQueries.page";
import PaginatedQueriesPage from "./components/PaginatedQueries.page";
import HomePage from "./components/Home.page";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import ParallelQueriesPage from "./components/ParallelQueries.page";
import RQSuperHeroesPage from "./components/RQSuperHeroes.page";
import SuperHeroesPage from "./components/SuperHeroes.page";

const queryClient = new QueryClient();
function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <div>
          <nav>
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/super-heroes">Traditional Super Heroes</Link>
              </li>
              <li>
                <Link to="/rq-super-heroes">RQ Super Heroes</Link>
              </li>
              <li>
                <Link to="/rq-parallel">RQ parallel</Link>
              </li>
              <li>
                <Link to="/rq-paginated">RQ paginated</Link>
              </li>
              <li>
                <Link to="/rq-infinite">RQ infinite</Link>
              </li>
            </ul>
          </nav>

          <Routes>
            <Route path="/super-heroes" element={<SuperHeroesPage />} />

            <Route path="/rq-super-heroes" element={<RQSuperHeroesPage />} />

            <Route path="/rq-parallel" element={<ParallelQueriesPage />} />

            <Route path="/rq-paginated" element={<PaginatedQueriesPage />} />

            <Route path="/rq-infinite" element={<InfiniteQueriesPage />} />

            <Route path="/" element={<HomePage />} />
          </Routes>
        </div>
      </Router>
      {/* <ReactQueryDevtools initialIsOpen={false} position="bottom-right" /> */}
    </QueryClientProvider>
  );
}

export default App;
