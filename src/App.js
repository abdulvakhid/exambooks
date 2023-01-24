import { Registr } from "./components/Registr/Registr";
import {Routes, Route} from "react-router-dom"
import { Login } from "./components/Login/Login";
import { Home } from "./pages/Home/Home";
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import {lang} from "./lang/lang"
import { Books } from "./pages/Books/Books";
import { Profile } from "./pages/Profile/Profile";
import { AddAuthor } from "./pages/AddAuthor/AddAuthor";
import { AddBook } from "./pages/AddBook/AddBook";
import { SingleAuthor } from "./pages/SingleAuthor/SingleAuthor";
import { SingleBook } from "./pages/SingleBook/SingleBook";

function App() {


  i18n
  .use(initReactI18next)
  .init({
    debug: true,
    fallbackLng: localStorage.getItem("language") || "en",
    interpolation: {
      escapeValue: false, 
    },
    resources: {
     en: {translation: lang.en},
     uz: {translation: lang.uz},
     ru: {translation: lang.ru},
    }
  });

  return (
  
    <Routes>
      <Route path="/register" element={<Registr/>}/>
      <Route path="/login" element={<Login/>}/>
      <Route path="/*" element={<Home/>}/>
      <Route path="/books/*" element={<Books/>}/>
      <Route path="/profile/*" element={<Profile/>}/>
      <Route path="/addauthor" element={<AddAuthor/>}/>
      <Route path="/addbook" element={<AddBook/>}/>
      <Route path="/singleauthor/:id" element={<SingleAuthor/>} />
      <Route path="/singlebook/:id" element={<SingleBook/>} />
    </Routes>
  
  );
}

export default App;
