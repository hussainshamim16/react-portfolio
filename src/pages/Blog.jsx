import { useState, useEffect } from 'react';
import { db } from '../data/scroll';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import { Link } from 'react-router-dom'; // 👈 React Router ka Link import karein

function Blog() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchBlogs = async () => {
    try {
      const blogsQuery = query(collection(db, "blogs"), orderBy("createdAt", "desc"));
      const snap = await getDocs(blogsQuery);
      setBlogs(snap.docs.map(d => ({ id: d.id, ...d.data() })));
    } catch (error) {
      console.error("Error fetching blogs:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  const formatDate = (timestamp) => {
    if (!timestamp) return "";
    const date = timestamp.toDate();
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  return (
    <main className="pt-28 pb-20 min-h-screen text-white">
      <div className="max-w-6xl mx-auto px-6">

        <div className="text-center mb-16">
          <div className="inline-block px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-medium mb-4">
            Our News & Articles
          </div>
          <h1 className="text-4xl font-bold mb-4">Latest Blog Posts</h1>
          <p className="text-slate-400 max-w-xl mx-auto text-sm">
            Discover insights, tutorials, and deep-dives into modern web development.
          </p>
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : blogs.length === 0 ? (
          <div className="text-center py-20 glass rounded-2xl">
            <p className="text-slate-400 text-lg">No blogs found. Check back later!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogs.map((b) => (
              <article
                key={b.id}
                className="glass rounded-2xl overflow-hidden flex flex-col group hover:border-blue-500/40 transition-all duration-300 hover:-translate-y-1 shadow-lg shadow-black/10"
              >
                <div className="relative aspect-video w-full overflow-hidden bg-slate-800">
                  <img
                    src={b.imageUrl}
                    alt={b.title}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>

                <div className="p-6 flex flex-col flex-grow">
                  <div className="flex items-center gap-2 mb-3 text-xs text-slate-500">
                    <span>📅</span>
                    <span>{formatDate(b.createdAt)}</span>
                  </div>
                  <Link to={`/blogs/${b.id}`} >
                    <h2 className="text-xl font-bold text-white mb-3 line-clamp-2 group-hover:text-blue-400 transition-colors">
                      {b.title}
                    </h2>
                  </Link>
                  <p className="text-slate-400 text-sm leading-relaxed mb-6 line-clamp-3">
                    {b.content}
                  </p>

                  <div className="mt-auto pt-4 border-t border-slate-800 flex items-center justify-between">
                    {/* 👈 BUTTON KO LINK SE REPLACE KIYA HAI TAQI ID PAS HO SAKE */}
                    <Link
                      to={`/blogs/${b.id}`}
                      className="text-blue-400 hover:text-blue-300 text-xs font-semibold flex items-center gap-1 transition-colors"
                    >
                      Read More <span className="transform group-hover:translate-x-1 transition-transform">→</span>
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}


export default Blog