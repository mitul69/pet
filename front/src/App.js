import logo from './logo.svg';
import './App.css';
import Pets from './screens/pets';

function App() {
  return (
    <div className="App">

      <header>
        <nav className="bg-white border-gray-200 mb-2 px-4 lg:px-6 py-2.5 dark:bg-gray-800">
          <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
            <a href="https://flowbite.com" className="flex items-center">
              <img src="https://flowbite.com/docs/images/logo.svg" className="mr-3 h-6 sm:h-9" alt="Flowbite Logo" />
              <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">Pet App</span>
            </a>
          </div>
        </nav>
      </header>
      <div className="mx-auto max-w-screen-xl">
        <Pets />
      </div>
    </div>
  );
}

export default App;
