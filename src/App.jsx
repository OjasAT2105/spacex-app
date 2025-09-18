import Banner from "./components/Banner";
import SearchForm from "./components/SearchForm";
import DataGrid from "./components/DataGrid";

function App() {
  return (
    <main className="min-h-screen bg-[#0b1120] text-white">
      <Banner />
      <div className="max-w-6xl mx-auto px-4">
        <SearchForm />
        <DataGrid />
      </div>
    </main>
  );
}

export default App;
