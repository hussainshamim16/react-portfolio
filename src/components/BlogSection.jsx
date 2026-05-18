import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { db } from '../data/scroll';
import { collection, getDocs, orderBy, query } from 'firebase/firestore';
import { Calendar, Clock, Search, ArrowRight } from 'lucide-react';
import blog1Image from '../assets/slide.webp'
const BlogsList = () => {
    const navigate = useNavigate();
    const [blogs, setBlogs] = useState([]);
    const [filteredBlogs, setFilteredBlogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');


    let dumiBlog = [
        {
            id: 1,
            imageUrl: blog1Image,
            title: "blog 1",
            createdAt: "10 may 2025",
            content: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Esse, ipsa.",
        },
        {
            id: 2,
            imageUrl: blog1Image,
            title: "blog 2",
            createdAt: "10 may 2025",
            content: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Esse, ipsa.",
        },
        {
            id: 3,
            imageUrl: blog1Image,
            title: "blog 3",
            createdAt: "10 may 2025",
            content: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Esse, ipsa.",
        }
    ]

    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                const blogsQuery = query(
                    collection(db, "blogs"),
                    orderBy("createdAt", "desc")
                );
                const blogsSnap = await getDocs(blogsQuery);
                const blogsData = blogsSnap.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                }));
                setBlogs(blogsData);
                setFilteredBlogs(blogsData);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching blogs:", error);
                setLoading(false);
            }
        };

        fetchBlogs();
    }, []);

    useEffect(() => {
        if (searchTerm) {
            const filtered = blogs.filter(blog =>
                blog.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                blog.content?.toLowerCase().includes(searchTerm.toLowerCase())
            );
            setFilteredBlogs(filtered);
        } else {
            setFilteredBlogs(blogs);
        }
    }, [searchTerm, blogs]);

    const formatDate = (timestamp) => {
        if (!timestamp) return "Recent";
        const date = typeof timestamp.toDate === 'function' ? timestamp.toDate() : new Date(timestamp);
        return new Intl.DateTimeFormat('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        }).format(date);
    };

    const getReadingTime = (content) => {
        if (!content) return "2 min read";
        const wordsPerMinute = 200;
        const words = content.split(/\s+/).length;
        const minutes = Math.ceil(words / wordsPerMinute);
        return `${minutes} min read`;
    };

    if (loading) {
        return (
            <div className=" from-[#0f172a] to-[#1e293b] py-20">
                <div className="max-w-6xl mx-auto px-6">
                    <div className="animate-pulse">
                        <div className="h-12 bg-slate-700 rounded w-64 mb-12 mx-auto"></div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {[1, 2, 3].map((i) => (
                                <div key={i} className="glass rounded-2xl overflow-hidden">
                                    <div className="h-48 bg-slate-700"></div>
                                    <div className="p-5">
                                        <div className="h-6 bg-slate-700 rounded mb-3"></div>
                                        <div className="h-4 bg-slate-700 rounded mb-2"></div>
                                        <div className="h-4 bg-slate-700 rounded w-2/3"></div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="py-20">
            <div className="max-w-6xl mx-auto px-6">
                {/* Header */}
                <div className="text-center mb-12">
                    <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Latest Blog & Insights</h1>
                    {/* <p className="text-slate-400 text-lg max-w-2xl mx-auto">
                        Exploring technology, development, and everything in between
                    </p> */}
                </div>

                {/* Search Bar */}
                {/* <div className="max-w-md mx-auto mb-12">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
                        <input
                            type="text"
                            placeholder="Search articles..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-10 pr-4 py-3 bg-slate-800/50 border border-slate-700 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:border-blue-500 transition-colors"
                        />
                    </div>
                </div> */}

                {/* Blog Grid */}
                {filteredBlogs.length === 0 ? (
                    // <div className="text-center py-20">
                    //     <p className="text-slate-400 text-lg">No articles found matching your search.</p>
                    //     <button
                    //         onClick={() => setSearchTerm('')}
                    //         className="mt-4 text-blue-400 hover:text-blue-300"
                    //     >
                    //         Clear search
                    //     </button>
                    // </div>
                    <div>
                        {/* .slice(0, 3) se sirf top 3 latest blogs dikhenge */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {dumiBlog.slice(0, 3).map((blog) => (
                                <Link
                                    key={blog.id}
                                    to={`/blogs/${blog.id}`}
                                    className="group"
                                >
                                    <div className="glass rounded-2xl overflow-hidden card-hover transition-all duration-300 hover:transform hover:-translate-y-1 h-full flex flex-col">
                                        <div className="h-48 overflow-hidden relative">
                                            <img
                                                src={blog.imageUrl}
                                                alt={blog.title}
                                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                                onError={(e) => {
                                                    e.target.src = "https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=400&h=300&fit=crop";
                                                }}
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a]/80 via-transparent to-transparent" />
                                        </div>
                                        <div className="p-5 flex flex-col flex-grow justify-between">
                                            <div>
                                                <div className="flex items-center gap-3 text-xs text-slate-400 mb-3">
                                                    <span className="flex items-center gap-1">
                                                        <Calendar className="w-3 h-3" />
                                                        {formatDate(blog.createdAt)}
                                                    </span>
                                                    <span className="flex items-center gap-1">
                                                        <Clock className="w-3 h-3" />
                                                        {getReadingTime(blog.content)}
                                                    </span>
                                                </div>

                                                <h3 className="text-white font-semibold text-xl mb-2 line-clamp-2 group-hover:text-blue-400 transition-colors">
                                                    {blog.title}
                                                </h3>

                                                {/* line-clamp-2 se sirf 2 lines ka paragraph dikhega baki par ... lag jayega */}
                                                <p className="text-slate-400 text-sm leading-relaxed line-clamp-2 mb-4">
                                                    {blog.content?.replace(/<[^>]*>/g, '')}
                                                </p>
                                            </div>

                                            <div className="flex items-center text-blue-400 text-sm font-medium group-hover:gap-2 transition-all">
                                                Read More
                                                <ArrowRight className="w-4 h-4 ml-1 group-hover:ml-2 transition-all" />
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>

                        {/* Bottom Navigation Button */}
                        <div className="text-center mt-16">
                            <button
                                onClick={() => navigate('/blogs')}
                                className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-xl transition-all duration-300 shadow-lg shadow-blue-600/20 hover:shadow-blue-600/30 group"
                            >
                                View All Blogs
                                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </button>
                        </div>
                    </div>

                ) : (
                    <div>
                        {/* .slice(0, 3) se sirf top 3 latest blogs dikhenge */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {filteredBlogs.slice(0, 3).map((blog) => (
                                <Link
                                    key={blog.id}
                                    to={`/blogs/${blog.id}`}
                                    className="group"
                                >
                                    <div className="glass rounded-2xl overflow-hidden card-hover transition-all duration-300 hover:transform hover:-translate-y-1 h-full flex flex-col">
                                        <div className="h-48 overflow-hidden relative">
                                            <img
                                                src={blog.imageUrl}
                                                alt={blog.title}
                                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                                onError={(e) => {
                                                    e.target.src = "https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=400&h=300&fit=crop";
                                                }}
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a]/80 via-transparent to-transparent" />
                                        </div>
                                        <div className="p-5 flex flex-col flex-grow justify-between">
                                            <div>
                                                <div className="flex items-center gap-3 text-xs text-slate-400 mb-3">
                                                    <span className="flex items-center gap-1">
                                                        <Calendar className="w-3 h-3" />
                                                        {formatDate(blog.createdAt)}
                                                    </span>
                                                    <span className="flex items-center gap-1">
                                                        <Clock className="w-3 h-3" />
                                                        {getReadingTime(blog.content)}
                                                    </span>
                                                </div>


                                                <h3 className="text-white font-semibold text-xl mb-2 line-clamp-2 group-hover:text-blue-400 transition-colors">
                                                    {blog.title}
                                                </h3>


                                                {/* line-clamp-2 se sirf 2 lines ka paragraph dikhega baki par ... lag jayega */}
                                                <p className="text-slate-400 text-sm leading-relaxed line-clamp-2 mb-4">
                                                    {blog.content?.replace(/<[^>]*>/g, '')}
                                                </p>
                                            </div>

                                            <div className="flex items-center text-blue-400 text-sm font-medium group-hover:gap-2 transition-all">
                                                Read More
                                                <ArrowRight className="w-4 h-4 ml-1 group-hover:ml-2 transition-all" />
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>

                        {/* Bottom Navigation Button */}
                        <div className="text-center mt-16">
                            <button
                                onClick={() => navigate('/blogs')}
                                className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-xl transition-all duration-300 shadow-lg shadow-blue-600/20 hover:shadow-blue-600/30 group"
                            >
                                View All Blogs
                                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default BlogsList;