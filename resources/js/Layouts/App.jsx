import { BrowserRouter, Link, NavLink, Route, Routes } from "react-router-dom"
import PostsIndex from "../Pages/Posts/Index"
import PostsCreate from "../Pages/Posts/Create"
import PostsEdit from "../Pages/Posts/Edit"


function App() {

    return (
        <BrowserRouter>
            <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
                {/* Header */}
                <header className="bg-white dark:bg-gray-800 shadow">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex items-center justify-between">
                        <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200">
                            Dashboard
                        </h2>

                        <div className="flex items-center gap-3">
                            <NavLink
                                to="/"
                                className={({ isActive }) =>
                                    `px-4 py-2 text-sm text-white ${isActive
                                        ? "font-bold underline underline-offset-4"
                                        : "font-medium"
                                    }`
                                }
                            >
                                All Posts
                            </NavLink>

                            <NavLink
                                to="/posts/create"
                                className={({ isActive }) =>
                                    `px-4 py-2 text-sm text-white ${isActive
                                        ? "font-bold underline underline-offset-4"
                                        : "font-medium"
                                    }`
                                }
                            >
                                + Create Post
                            </NavLink>
                        </div>
                    </div>
                </header>

                {/* Main Content */}
                <main className="py-12">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="bg-white dark:bg-gray-800 shadow-sm rounded-lg overflow-hidden">
                            <div className="p-6 text-gray-900 dark:text-gray-100">

                                <Routes>
                                    <Route path="/" element={<PostsIndex />} />
                                    <Route path="/posts/create" element={<PostsCreate />} />
                                    <Route path="/posts/edit/:id" element={<PostsEdit />} />

                                </Routes>

                            </div>
                        </div>
                    </div>
                </main >
            </div >
        </BrowserRouter >
    )
}
export default App