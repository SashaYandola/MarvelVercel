import { lazy, Suspense } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import AppHeader from "../appHeader/AppHeader";
import Spinner from "../spinner/Spinner";

// const MainPage = lazy(() => import('../pages').then(module => ({ default: module.MainPage })));
// const ComicsPage = lazy(() => import('../pages').then(module => ({ default: module.ComicsPage })));                  //<---именованные
// const NotFound = lazy(() => import('../pages').then(module => ({ default: module.NotFound })));
// const SingleComicPage = lazy(() => import('../pages').then(module => ({ default: module.SingleComicPage })));

const MainPage = lazy(() => import('../pages/MainPage'));
const ComicsPage = lazy(() => import('../pages/ComicsPage'));                                                           //<---export default
const SingleComicPage = lazy(() => import('../pages/singleComicPage/SingleComicPage'));
const SingleCharPage = lazy(() => import('../pages/singleCharPage/SingleCharPage'));
const SinglePage = lazy(() => import('../pages/SinglePage'));
const NotFound = lazy(() => import('../pages/404'));

const App = () => {
    return (
        <Router>
            <div className="app">
                <AppHeader />
                <main>
                    <Suspense fallback = {<Spinner/>}>
                        <Routes>
                            <Route path="/" element={<MainPage />} />
                            <Route path="/comics" element={<ComicsPage />} />
                            <Route path="/comics/:id" element={<SinglePage Component={SingleComicPage} dataType='comic'/>}/>
                            <Route path="/characters/:id" element={<SinglePage Component={SingleCharPage} dataType='character'/>}/>
                            <Route path="*" element={<NotFound/>}/>
                        </Routes>
                    </Suspense>
                </main>
            </div>
        </Router>
    )
}

export default App;