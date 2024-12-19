import { Routes, Route } from "react-router-dom";
import { TransactionList } from "./screens/CreateTransaction";
import ItemForm from "./screens/postTransection";

function App() {
  return (
    <>
      <main className="min-h-screen bg-gray-50">
        <Routes>
          <Route path="/" element={<TransactionList />} />
          <Route path="/add" element={<ItemForm />} />
        </Routes>
      </main>
    </>
  );
}

export default App;
