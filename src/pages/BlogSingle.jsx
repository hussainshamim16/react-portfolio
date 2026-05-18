import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { db } from '../data/scroll';
import { doc, getDoc } from 'firebase/firestore';

function BlogSingle() {
    const { id } = useParams(); // URL se id extract karne ke liye (e.g., /blog/12345)
    const [blog, setBlog] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchSingleBlog = async () => {
            try {
                const docRef = doc(db, "blogs", id);
                const docSnap = await getDoc(docRef);

                if (docSnap.exists()) {
                    setBlog({ id: docSnap.id, ...docSnap.data() });
                } else {
                    console.log("No such document!");
                }
            } catch (error) {
                console.error("Error fetching blog post:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchSingleBlog();
    }, [id]);

    const formatDate = (timestamp) => {
        if (!timestamp) return "";
        const date = timestamp.toDate();
        return date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
    };

    if (loading) {
        return (
            <div className="min-h-screen flex justify-center items-center text-white pt-28">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
        );
    }

    if (!blog) {
        return (
            <div className="min-h-screen flex flex-col justify-center items-center text-white pt-28 px-6 text-center">
                <h2 className="text-2xl font-bold mb-4">Blog Post Not Found</h2>
                <p className="text-slate-400 mb-6">The article you are looking for does not exist or has been removed.</p>
                <Link to="/blogs" className="px-5 py-2 bg-blue-600 hover:bg-blue-500 rounded-xl text-sm font-medium transition-colors">
                    ← Back to Blogs
                </Link>
            </div>
        );
    }

    return (
        <main className="pt-28 pb-20 min-h-screen text-white">
            <div className="max-w-4xl mx-auto px-6">

                {/* Back Button */}
                <Link
                    to="/blog"
                    className="inline-flex items-center gap-2 text-slate-400 hover:text-blue-400 text-sm font-medium mb-8 transition-colors group"
                >
                    <span className="transform group-hover:-translate-x-1 transition-transform">←</span> Back to articles
                </Link>

                {/* Blog Article */}
                <article>
                    {/* Header Meta */}
                    <div className="flex items-center gap-3 text-xs text-slate-500 mb-4">
                        <span>📅 {formatDate(blog.createdAt)}</span>
                    </div>

                    {/* Title */}
                    <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-8 leading-tight tracking-tight text-white">
                        {blog.title}
                    </h1>

                    {/* Main Cover Image */}
                    <div className="glass rounded-2xl overflow-hidden aspect-video mb-10 bg-slate-800 border border-slate-800">
                        <img
                            src={blog.imageUrl}
                            alt={blog.title}
                            className="w-full h-full object-cover"
                        />
                    </div>

                    {/* Blog Main Content Content */}
                    <div className="prose prose-invert max-w-none text-slate-300 space-y-6 text-base sm:text-lg leading-relaxed whitespace-pre-line">
                        {blog.content}
                    </div>
                </article>

                {/* Footer Contact Call To Action (CTA) */}
                <div className="mt-16 pt-10 border-t border-slate-800">
                    <div className="glass rounded-2xl p-6 sm:p-8 border border-blue-500/10 bg-blue-500/5">
                        <h3 className="text-xl font-bold text-white mb-2">Let's Build Something Amazing Together</h3>
                        <p className="text-slate-400 text-sm mb-4 leading-relaxed">
                            Whether you are looking to build a high-performance React application, a custom WordPress/Shopify store, or integrated backend solutions with Supabase and Firebase, I'm ready to bring your ideas to life. I focus on clean architecture, lightning-fast performance, and robust code structure.
                        </p>
                        <p className="text-blue-400 font-medium text-sm mb-6">
                            Have an interesting project, a freelance opportunity, or just want to discuss modern web tech?
                        </p>
                        <div className="flex flex-wrap gap-4 text-sm">
                            <a
                                href="https://www.linkedin.com/in/muhammadhussainshamim/"
                                className="px-4 py-2.5 capitalize bg-slate-900 border border-slate-700 rounded-xl text-slate-300 hover:text-white hover:border-blue-500 transition-colors flex items-center gap-2"
                            >
                                Let's Connect : hussian shamim
                            </a>
                            <a
                                href="mailto:hussainshamimdev@gmail.com@gmail.com"
                                className="px-4 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-slate-300 hover:text-white hover:border-blue-500 transition-colors flex items-center gap-2"
                            >
                                📧 Email Me: hussainshamimdev@gmail.com
                            </a>
                        </div>
                    </div>
                </div>

            </div>
        </main>
    );
}

export default BlogSingle