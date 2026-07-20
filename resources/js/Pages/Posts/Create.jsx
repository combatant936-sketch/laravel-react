import { useCallback, useEffect, useState } from "react";
import CategoriesServices from "../../Services/CategoriesServices";
import axios from "axios";
import { useNavigate } from "react-router-dom";


function PostsCreate() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        title: "",
        content: "",
        category_id: "",
        thumbnail: ""
    })
    const [categories, setCategories] = useState([]);
    const [errors, setErrors] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const fetchCategories = useCallback(() => {
        CategoriesServices.getAll()
            .then(response => setCategories(response.data.data));
    }, []);

    useEffect(() => {
        fetchCategories();
    }, [fetchCategories]);
    const updateTitle = (e) => {
        setFormData(prev => ({ ...prev, title: e.target.value }))
    }
    const updateCategory = (e) => {
        setFormData(prev => ({ ...prev, category_id: e.target.value }))
    }
    const updateThumbnail = (e) => {
        setFormData(prev => ({ ...prev, thumbnail: e.target.files[0] }))
    }
    const updateContent = (e) => {
        setFormData(prev => ({ ...prev, content: e.target.value }))
    }
    const submit = (e) => {
        e.preventDefault();
        if (isLoading == true) { return }
        setIsLoading(() => true)
        setErrors((prev) => [])

        let formData1 = new FormData()
        formData1.append("title", formData.title)
        formData1.append("content", formData.content)
        formData1.append("category_id", formData.category_id)
        formData1.append("thumbnail", formData.thumbnail)

        axios.post("/api/posts", formData1).then((res) => navigate("/"))
            .catch((error) => setErrors(prev => ({ ...prev, ...error.response.data.errors }))).finally(() => setIsLoading(() => false))
    }
    const showErrors = (field) => {

        return errors[field]?.map((error, index) => (
            <div key={index} className="text-red-500">
                {error}
            </div>
        ))

    }
    return (
        <form
            onSubmit={submit}
            className="max-w-3xl mx-auto bg-gray-50 border border-gray-200 p-10 rounded-2xl shadow-2xl space-y-8"
        >
            <div>
                <label className="block mb-3 text-xl font-bold text-gray-900">
                    Title
                </label>
                <input
                    type="text"
                    value={formData.title}
                    onChange={updateTitle}
                    placeholder="Enter post title"
                    className="w-full h-14 px-5 text-lg font-medium text-gray-900 bg-white placeholder:text-gray-500 border-2 border-gray-400 rounded-xl focus:outline-none focus:border-blue-600 focus:ring-4 focus:ring-blue-200"
                />
                {showErrors("title")}
            </div>

            <div>
                <label className="block mb-3 text-xl font-bold text-gray-900">
                    Category
                </label>
                <select
                    value={formData.category_id}
                    onChange={updateCategory}
                    className="w-full h-14 px-5 text-lg font-medium text-gray-900 bg-white border-2 border-gray-400 rounded-xl focus:outline-none focus:border-blue-600 focus:ring-4 focus:ring-blue-200"
                >
                    <option value="">Select Category</option>
                    {categories.map((category, index) =>
                        <option value={category.id}>{category.name}</option>
                    )}
                </select>
                {showErrors("category_id")}
            </div>

            <div>
                <label className="block mb-3 text-xl font-bold text-gray-900">
                    Content
                </label>
                <textarea
                    value={formData.content}
                    onChange={updateContent}
                    rows={8}
                    placeholder="Write your content..."
                    className="w-full px-5 py-4 text-lg font-medium text-gray-900 bg-white placeholder:text-gray-500 border-2 border-gray-400 rounded-xl resize-y focus:outline-none focus:border-blue-600 focus:ring-4 focus:ring-blue-200"
                />
                {showErrors("content")}
            </div>

            <div>
                <label className="block mb-3 text-xl font-bold text-gray-900">
                    Thumbnail
                </label>
                <input type="file" name="thumbnail" id="thumbnail"

                    onChange={updateThumbnail}
                ></input>
                {showErrors("thumbnail")}
            </div>


            <div className="flex justify-end">
                <button
                    disabled={isLoading}
                    type="submit"
                    className="px-10 py-4 text-xl font-bold text-white bg-blue-700 rounded-xl shadow-lg hover:bg-blue-800 hover:shadow-xl transition-all duration-200"
                >
                    {isLoading ? "Creating..." : "Save Post"}
                </button>
            </div>
        </form>
    );
}

export default PostsCreate;