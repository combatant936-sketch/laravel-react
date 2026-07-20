import { useState, useEffect, useCallback, useMemo } from "react";
import axios from "axios";
import { debounce } from "lodash";
import CategoriesServices from "../../Services/CategoriesServices";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

function PostsIndex() {
    const [posts, setPosts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [query, setQuery] = useState({ page: 1, id: "", title: "", content: "", category_id: '', order_column: "id", order_direction: "asc", global: "" });

    const fetchPosts = useCallback(() => {
        axios.get(`/api/posts`, { params: query })
            .then(response => setPosts(response.data));
    }, [query]);

    const fetchCategories = useCallback(() => {
        CategoriesServices.getAll()
            .then(response => setCategories(response.data.data));
    }, []);

    useEffect(() => {
        fetchPosts();
        fetchCategories();
    }, [fetchPosts, fetchCategories]);

    const changeLink = (url) => {
        const fullURL = new URL(url)
        const page = fullURL.searchParams.get('page')
        setQuery((prev) => ({
            ...prev,
            page,
        }));
        fetchPosts()
    }

    const debounceFetchPosts = debounce(fetchPosts, 5000);
    const changeCategory = (event) => {
        setQuery((prev) => ({
            ...prev,
            category_id: event.target.value,
        }));
        debounceFetchPosts()
    }

    const renderPaginationLinks = () => {
        return posts.meta.links.map((link, index) => {
            return (
                <button
                    key={index}
                    onClick={() => link.url && changeLink(link.url)}
                    disabled={!link.url}
                    dangerouslySetInnerHTML={{ __html: link.label }}
                    className={`
      px-4 py-2 text-sm font-medium border transition-colors duration-200
      ${link.active
                            ? "bg-blue-600 text-white border-blue-600"
                            : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
                        }
      ${!link.url
                            ? "cursor-not-allowed opacity-50"
                            : "cursor-pointer"
                        }
    `}
                />
            );
        });
    }
    const renderPagination = () => {
        return (
            <div className="mt-4 flex items-center justify-between rounded-lg border border-gray-200 bg-white px-4 py-3 shadow-sm">
                <p className="text-sm text-gray-600">
                    Showing{" "}
                    <span className="font-semibold text-gray-900">
                        {posts.meta.from}
                    </span>{" "}
                    to{" "}
                    <span className="font-semibold text-gray-900">
                        {posts.meta.to}
                    </span>{" "}
                    of{" "}
                    <span className="font-semibold text-gray-900">
                        {posts.meta.total}
                    </span>{" "}
                    results
                </p>
                <div>
                    {renderPaginationLinks()}
                </div>
            </div>
        );
    };

    const renderCategories = () => {
        return categories.map((category) => (
            <option key={category.id} value={category.id}>
                {category.name}
            </option>
        ));
    };

    const renderCategoryFilter = () => {
        return (
            <div className="mb-6 flex items-center">
                <div className="w-full max-w-xs">
                    <label
                        htmlFor="category"
                        className="mb-2 block text-sm font-medium text-gray-700"
                    >
                        Category
                    </label>

                    <select
                        onChange={changeCategory}
                        id="category"
                        className="block w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm text-gray-700 shadow-sm transition focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        <option value="">All Categories</option>
                        {renderCategories()}
                    </select>
                </div>
            </div>
        );
    };

    const orderColumnIconChanged = (column) => {
        let direct = "fa-sort";
        if (query.order_column == column)
            if (query.order_direction == "asc")
                direct = "fa-sort-up"
            else
                direct = "fa-sort-down"

        return <i className={`fa-solid ${direct}`}></i >



    }

    const updateColumn = (column) => {

        let diection = "asc";

        if (column == query.order_column) {
            diection = query.order_direction == "asc" ? "desc" : "asc"
        }
        setQuery((prev) => ({
            ...prev,
            page: 1,
            order_direction: diection,
            order_column: column,
        }));
        fetchPosts()
    }

    const deletePost = (e) => {
        Swal.fire({
            title: "Are you sure?",
            text: "Do you want to delete this post?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Yes",
            cancelButtonText: "No",
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
        }).then((result) => {
            if (result.isConfirmed) {
                // Delete the post here

                axios.delete(`/api/posts/${e.target.value}`).then((res) => {
                    fetchPosts()
                    Swal.fire("Deleted!", "Post deleted successfully.", "success");
                }).catch((error) => {
                    Swal.fire("Error", "Failed to delete post", "error");
                })


            }
        });
    }

    const renderTableFiltersColumn = (column, callback) => {
        return (<div>
            <input type="text" value={column} onChange={callback}></input>
        </div>)

    }

    const renderTableFiltersCateogories = () => {
        return (<div>
            <select
                onChange={changeCategory}
                id="category"
                className="block w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm text-gray-700 shadow-sm transition focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
                <option value="">All Categories</option>
                {renderCategories()}
            </select>
        </div>)

    }

    const handleTitleFilter = (event) => {
        setQuery((prev) => ({
            ...prev,
            title: event.target.value,
        }));
        debounceFetchPosts()
    }
    const handleGlobalFilter = (event) => {
        setQuery((prev) => ({
            ...prev,
            global: event.target.value,
        }));
        debounceFetchPosts()
    }
    const handleIdFilter = (event) => {
        setQuery((prev) => ({
            ...prev,
            id: event.target.value,
        }));
        debounceFetchPosts()
    }
    const handleContentFilter = (event) => {
        setQuery((prev) => ({
            ...prev,
            content: event.target.value,
        }));
        debounceFetchPosts()
    }
    const renderTableFilters = () => {
        return (
            <tr>
                <th>
                    {renderTableFiltersColumn(query.id, handleIdFilter)}
                </th>
                <th>
                    {renderTableFiltersColumn(query.title, handleTitleFilter)}
                </th>
                <th>
                    {renderTableFiltersColumn(query.content, handleContentFilter)}
                </th>
                <th>
                    {renderTableFiltersCateogories()}
                </th>
            </tr>


        );

    }

    if (!('data' in posts)) return <div>Loading...</div>;
    return (
        <div className="p-6">
            <div className="overflow-x-auto rounded-xl border border-gray-200 shadow-sm">
                <div className="flex flex-row min-w-full">
                    <input type="text" value={query.global} onChange={handleGlobalFilter}></input>
                </div>
                <table className="min-w-full divide-y divide-gray-200 bg-white">
                    <thead className="bg-gray-100">
                        <tr>

                            <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-600">
                                <button onClick={() => updateColumn("id")}>{orderColumnIconChanged("id")}</button>
                                ID
                            </th>
                            <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-600">
                                <button onClick={() => updateColumn("title")}>{orderColumnIconChanged("title")}</button>
                                Title
                            </th>
                            <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-600">
                                Content
                            </th>
                            <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-600">
                                Category
                            </th>

                            <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-600">
                                Created At
                            </th>
                            <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-600">
                                Edit
                            </th>
                        </tr>
                        {renderTableFilters()}
                    </thead>

                    <tbody className="divide-y divide-gray-200">
                        {posts.data.map((post) => (
                            <tr
                                key={post.id}
                                className="transition-colors duration-200 hover:bg-gray-50"
                            >
                                <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-900">
                                    {post.id}
                                </td>

                                <td className="px-6 py-4 text-sm font-medium text-gray-900">
                                    {post.title}
                                </td>

                                <td className="max-w-md px-6 py-4 text-sm text-gray-600">
                                    <p className="line-clamp-2">
                                        {post.content}
                                    </p>
                                </td>

                                <td className="max-w-md px-6 py-4 text-sm text-gray-600">
                                    <p className="line-clamp-2">
                                        {post.category.name}
                                    </p>
                                </td>

                                <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                                    {post.created_at}
                                </td>
                                <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                                    <Link to={`/posts/edit/${post.id}`} className="text-blue-600 hover:text-blue-900">Edit</Link>
                                    <button value={post.id} onClick={deletePost} className="text-red-600 hover:text-red-900">Delete</button>

                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className="mt-6">
                {renderPagination()}

            </div>
        </div>
    );
}

export default PostsIndex;