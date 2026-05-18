import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { db } from '../data/scroll';
import { collection, getDocs } from 'firebase/firestore';
import imagePro from '../assets/muhammad hussain shamim.png'

const ProjectsSection = () => {
    let urlx = window.location.pathname
    
    let dumiData = [
        {
            id: 1,
            imageUrl: imagePro,
            title: "project 1",
            category: "category 1",
            tags: ["html", "css"],
            liveLink: "#",
            githubLink: "#",
        },
        {
            id: 2,
            imageUrl: imagePro,
            title: "project 2",
            category: "category 2",
            tags: ["html", "css"],
            liveLink: "#",
            githubLink: "#",
        },
        {
            id: 3,
            imageUrl: imagePro,
            title: "project 3",
            category: "category 3",
            tags: ["html", "css"],
            liveLink: "#",
            githubLink: "#",
        },
    ]


    const [projects, setProjects] = useState([]);

    const [loading, setLoading] = useState(true);

    // Fetch projects from Firebase
    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const projectsSnap = await getDocs(collection(db, "projects"));
                const projectsData = projectsSnap.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                }));
                setProjects(projectsData);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching projects:", error);
                setLoading(false);
            }
        };

        fetchProjects();
    }, []);

    if (loading) {
        return (
            <section className="py-20">
                <div className="max-w-6xl mx-auto px-6">
                    <div className="flex items-end justify-between mb-12">
                        <div>
                            <h2 className="text-3xl font-bold text-white mb-2">Featured Projects</h2>
                            <p className="text-slate-400">Loading projects...</p>
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {[1, 2, 3].map((i) => (
                            <div key={i} className="glass rounded-2xl overflow-hidden animate-pulse">
                                <div className="h-44 bg-slate-700"></div>
                                <div className="p-5">
                                    <div className="h-6 bg-slate-700 rounded mb-3"></div>
                                    <div className="h-4 bg-slate-700 rounded mb-2 w-2/3"></div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        );
    }

    if (projects.length === 0) {
        return (
            <section className="py-20">
                <div className="max-w-6xl mx-auto px-6">
                    <div className="flex items-end justify-between mb-12">
                        <div>
                            <h2 className="text-3xl font-bold text-white mb-2">Featured Projects</h2>
                            <p className="text-slate-400">No projects added yet</p>
                        </div>
                    </div>
                </div>
            </section>


            // <section className="py-20">
            //     <div className="max-w-6xl mx-auto px-6">
            //         <div className="flex items-end justify-between mb-12">
            //             <div>
            //                 <h2 className="text-3xl font-bold text-white mb-2">Featured Projects</h2>
            //                 <p className="text-slate-400">Some of my recent work</p>
            //             </div>
            //             <Link to="/projects" className="text-blue-400 hover:text-blue-300 text-sm font-medium transition-colors">
            //                 View All →
            //             </Link>
            //         </div>

            //         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            //             {dumiData.map((project) => (
            //                 <div key={project.id} className="glass rounded-2xl overflow-hidden card-hover group">
            //                     <div className="h-44 overflow-hidden relative">
            //                         <img
            //                             src={project.imageUrl || project.image}
            //                             alt={project.title}
            //                             className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            //                             onError={(e) => {
            //                                 e.target.src = "https://via.placeholder.com/400x200?text=No+Image";
            //                             }}
            //                         />
            //                         <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a]/80 to-transparent" />
            //                         <span className="absolute top-3 right-3 text-xs px-2 py-1 rounded-full bg-blue-500/20 text-blue-300 border border-blue-500/30">
            //                             {project.category}
            //                         </span>
            //                     </div>
            //                     <div className="p-5">
            //                         <h3 className="text-white font-semibold text-lg mb-2">{project.title}</h3>
            //                         {project.description && (
            //                             <p className="text-slate-400 text-sm leading-relaxed mb-4 line-clamp-2">{project.description}</p>
            //                         )}
            //                         {project.tags && project.tags.length > 0 && (
            //                             <div className="flex flex-wrap gap-1.5">
            //                                 {project.tags.map((tag, idx) => (
            //                                     <span key={idx} className="text-xs px-2 py-0.5 rounded-full bg-slate-800 text-slate-300">
            //                                         {tag}
            //                                     </span>
            //                                 ))}
            //                             </div>
            //                         )}
            //                         <div className="flex flex-wrap gap-2 pt-5">
            //                             {project.liveLink && (
            //                                 <a
            //                                     href={project.liveLink}
            //                                     target="_blank"
            //                                     rel="noopener noreferrer"
            //                                     className="btn bg-blue-500 text-white px-3 py-1 rounded-2xl hover:bg-blue-600 transition-colors"
            //                                 >
            //                                     Live Link
            //                                 </a>
            //                             )}
            //                             {project.githubLink && (
            //                                 <a
            //                                     href={project.githubLink}
            //                                     target="_blank"
            //                                     rel="noopener noreferrer"
            //                                     className="btn bg-gray-700 text-white px-3 py-1 rounded-2xl hover:bg-gray-600 transition-colors"
            //                                 >
            //                                     Github Link
            //                                 </a>
            //                             )}
            //                         </div>
            //                     </div>
            //                 </div>
            //             ))}
            //         </div>
            //     </div>
            // </section>
        );
    }

    return (
        <section className="py-20">
            <div className="max-w-6xl mx-auto px-6">
                {urlx == '/projects' ? <></> :
                    <div className="flex items-end justify-between mb-12">
                        <div>
                            <h2 className="text-3xl font-bold text-white mb-2">Featured Projects</h2>
                            {/* <p className="text-slate-400">Some of my recent work</p> */}
                        </div>
                        <Link to="/projects" className="text-blue-400 hover:text-blue-300 text-sm font-medium transition-colors">
                            View All →
                        </Link>
                    </div>
                }

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {urlx == '/projects' ? projects.map((project) => (
                        <div key={project.id} className="glass rounded-2xl overflow-hidden card-hover group">
                            <div className="h-44 overflow-hidden relative">
                                <img
                                    src={project.imageUrl || project.image}
                                    alt={project.title}
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                    onError={(e) => {
                                        e.target.src = "https://via.placeholder.com/400x200?text=No+Image";
                                    }}
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a]/80 to-transparent" />
                                <span className="absolute top-3 right-3 text-xs px-2 py-1 rounded-full bg-blue-500 text-white border border-blue-500/30">
                                    {project.category}
                                </span>
                            </div>
                            <div className="p-5">
                                <h3 className="text-white font-semibold text-lg mb-2 capitalize">{project.title}</h3>
                                {project.description && (
                                    <p className="text-slate-400 text-sm leading-relaxed mb-4 line-clamp-2">{project.description}</p>
                                )}
                                {project.tags && project.tags.length > 0 && (
                                    <div className="flex flex-wrap gap-1.5">
                                        {project.tags.map((tag, idx) => (
                                            <span key={idx} className="text-xs px-2 py-0.5 rounded-full bg-slate-800 text-slate-300">
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                )}
                                <div className="flex flex-wrap gap-2 pt-5">
                                    {project.liveLink && (
                                        <a
                                            href={project.liveLink}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="btn bg-blue-500 text-white px-3 py-1 rounded-2xl hover:bg-blue-600 transition-colors"
                                        >
                                            Live Link
                                        </a>
                                    )}
                                    {project.githubLink && (
                                        <a
                                            href={project.githubLink}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="btn bg-gray-700 text-white px-3 py-1 rounded-2xl hover:bg-gray-600 transition-colors"
                                        >
                                            Github Link
                                        </a>
                                    )}
                                </div>
                            </div>
                        </div>
                    )) : projects.slice(0, 3).map((project) => (
                        <div key={project.id} className="glass rounded-2xl overflow-hidden card-hover group">
                            <div className="h-44 overflow-hidden relative">
                                <img
                                    src={project.imageUrl || project.image}
                                    alt={project.title}
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                    onError={(e) => {
                                        e.target.src = "https://via.placeholder.com/400x200?text=No+Image";
                                    }}
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a]/80 to-transparent" />
                                <span className="absolute top-3 right-3 text-xs px-2 py-1 rounded-full bg-blue-500 text-white border border-blue-500/30">
                                    {project.category}
                                </span>
                            </div>
                            <div className="p-5">
                                <h3 className="text-white font-semibold text-lg mb-2">{project.title}</h3>
                                {project.description && (
                                    <p className="text-slate-400 text-sm leading-relaxed mb-4 line-clamp-2">{project.description}</p>
                                )}
                                {project.tags && project.tags.length > 0 && (
                                    <div className="flex flex-wrap gap-1.5">
                                        {project.tags.map((tag, idx) => (
                                            <span key={idx} className="text-xs px-2 py-0.5 rounded-full bg-slate-800 text-slate-300">
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                )}
                                <div className="flex flex-wrap gap-2 pt-5">
                                    {project.liveLink && (
                                        <a
                                            href={project.liveLink}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="btn bg-blue-500 text-white px-3 py-1 rounded-2xl hover:bg-blue-600 transition-colors"
                                        >
                                            Live Link
                                        </a>
                                    )}
                                    {project.githubLink && (
                                        <a
                                            href={project.githubLink}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="btn bg-gray-700 text-white px-3 py-1 rounded-2xl hover:bg-gray-600 transition-colors"
                                        >
                                            Github Link
                                        </a>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ProjectsSection;