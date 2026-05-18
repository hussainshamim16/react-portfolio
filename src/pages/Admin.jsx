import React, { useState, useEffect } from 'react';
import { db } from '../data/scroll';
import {
    updateDoc, collection, addDoc, getDocs, deleteDoc, doc, serverTimestamp
} from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
const AdminDashboard = () => {
    // useEffect(() => {
    //     let confirmInput = prompt("Enter Admin Key");
    //     const navigate = useNavigate();
    //     // 1. Agar user cancel kar de ya khali chodh de
    //     if (confirmInput === null || confirmInput.trim() === "") {
    //         alert("Please write password");
    //         window.location.replace('/')
    //     }
    //     // 2. Agar password galat ho (Sahi key ke barabar NA ho)
    //     else if (confirmInput !== "kig83241234") {
    //         alert("Wrong Key");
    //         navigate("/"); // Sahi tariqa navigate karne ka
    //     }
    // }, [])

    const [activeTab, setActiveTab] = useState('manageBlog');
    const [loading, setLoading] = useState(false);
    const [messages, setMessages] = useState([]);
    const [blogs, setBlogs] = useState([]);
    const [projects, setProjects] = useState([]);
    const [certificates, setCertificates] = useState([]);

    // Edit Modals State
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [editType, setEditType] = useState(''); // 'blog' or 'project'
    const [currentItem, setCurrentItem] = useState(null);
    const [newImageFile, setNewImageFile] = useState(null);

    // Form States
    const [blogForm, setBlogForm] = useState({ title: '', content: '', imageFile: null });
    const [projectForm, setProjectForm] = useState({ title: '', category: '', liveLink: '', githubLink: '', imageFile: null });
    const [certFile, setCertFile] = useState(null);

    const cloudName = "djg3hv9gl";
    const uploadPreset = "portfolioBolt";

    // --- HELPER: Cloudinary ---
    const uploadToCloudinary = async (file) => {
        if (!file) return null;
        const formData = new FormData();
        formData.append("file", file);
        formData.append("upload_preset", uploadPreset);
        try {
            const res = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
                method: "POST",
                body: formData,
            });
            const data = await res.json();
            return data.secure_url;
        } catch (err) {
            console.error("Upload Error:", err);
            return null;
        }
    };

    // --- FETCH FUNCTIONS ---
    const fetchData = async () => {
        const blogSnap = await getDocs(collection(db, "blogs"));
        setBlogs(blogSnap.docs.map(d => ({ id: d.id, ...d.data() })));

        const projSnap = await getDocs(collection(db, "projects"));
        setProjects(projSnap.docs.map(d => ({ id: d.id, ...d.data() })));

        const certSnap = await getDocs(collection(db, "certificates"));
        setCertificates(certSnap.docs.map(d => ({ id: d.id, ...d.data() })));

        const msgSnap = await getDocs(collection(db, "contactMessages"));
        setMessages(msgSnap.docs.map(d => ({ id: d.id, ...d.data() })));
    };

    useEffect(() => { fetchData(); }, []);

    // --- DELETE HANDLER ---
    const handleDelete = async (col, id) => {
        if (window.confirm(`Delete this ${col}?`)) {
            await deleteDoc(doc(db, col, id));
            fetchData();
        }
    };

    // --- SUBMIT HANDLERS ---
    const handleBlogSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        const imageUrl = await uploadToCloudinary(blogForm.imageFile);
        if (imageUrl) {
            await addDoc(collection(db, "blogs"), { ...blogForm, imageUrl, createdAt: serverTimestamp(), imageFile: null });
            setBlogForm({ title: '', content: '', imageFile: null });
            fetchData();
            alert("Blog Added!");
        }
        setLoading(false);
    };

    const handleProjectSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        const imageUrl = await uploadToCloudinary(projectForm.imageFile);
        if (imageUrl) {
            const { imageFile, ...projectData } = projectForm;
            await addDoc(collection(db, "projects"), { ...projectData, imageUrl, createdAt: serverTimestamp() });
            setProjectForm({ title: '', category: '', liveLink: '', githubLink: '', imageFile: null });
            fetchData();
            alert("Project Added!");
        }
        setLoading(false);
    };

    const handleCertSubmit = async () => {
        if (!certFile) return alert("Select file");
        setLoading(true);
        const imageUrl = await uploadToCloudinary(certFile);
        if (imageUrl) {
            await addDoc(collection(db, "certificates"), { imageUrl, createdAt: serverTimestamp() });
            setCertFile(null);
            fetchData();
            alert("Certificate Added!");
        }
        setLoading(false);
    };

    // --- EDIT HANDLERS ---
    const openEditModal = (item, type) => {
        setCurrentItem(item);
        setEditType(type);
        setIsEditModalOpen(true);
    };

    const handleGlobalUpdate = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            let finalImageUrl = currentItem.imageUrl;
            if (newImageFile) {
                const uploadedUrl = await uploadToCloudinary(newImageFile);
                if (uploadedUrl) finalImageUrl = uploadedUrl;
            }

            const docRef = doc(db, editType === 'blog' ? "blogs" : "projects", currentItem.id);
            const updateData = { ...currentItem, imageUrl: finalImageUrl, updatedAt: serverTimestamp() };
            delete updateData.id; // ID field update nahi karte

            await updateDoc(docRef, updateData);
            alert("Updated Successfully!");
            setIsEditModalOpen(false);
            setNewImageFile(null);
            fetchData();
        } catch (err) { console.error(err); }
        setLoading(false);
    };

    const TabButton = ({ id, label, icon }) => (
        <button onClick={() => setActiveTab(id)} style={{
            padding: '10px 15px', border: 'none', background: activeTab === id ? '#4361ee' : '#f0f2f5',
            color: activeTab === id ? 'white' : '#555', borderRadius: '8px', cursor: 'pointer', fontWeight: '600',
            marginRight: '5px', marginBottom: '5px'
        }}> {icon} {label} </button>
    );

    return (
        <div style={{ maxWidth: '1200px', margin: '40px auto', padding: '20px', fontFamily: 'Arial' }}>
            {/* Tabs Header */}
            <div style={{ marginBottom: '30px', borderBottom: '1px solid #ddd', paddingBottom: '10px' }}>
                <TabButton id="manageBlog" label="Manage Blogs" icon="📚" />
                <TabButton id="manageProjects" label="Manage Projects" icon="🛠️" />
                <TabButton id="manageCerts" label="Manage Certificates" icon="📜" />
                <TabButton id="addBlog" label="Add Blog" icon="✍️" />
                <TabButton id="addProject" label="Add Project" icon="🚀" />
                <TabButton id="addCert" label="Add Certificate" icon="➕" />
                <TabButton id="messages" label="Messages" icon="✉️" />
            </div>

            <div style={{ background: '#fff', padding: '20px', borderRadius: '10px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>

                {/* MANAGE SECTIONS */}
                {activeTab === 'manageBlog' && renderTable(blogs, 'blogs', openEditModal)}
                {activeTab === 'manageProjects' && renderTable(projects, 'projects', openEditModal)}
                {activeTab === 'manageCerts' && (
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))', gap: '15px' }}>
                        {certificates.map(c => (
                            <div key={c.id} style={{ position: 'relative', border: '1px solid #eee', padding: '5px' }}>
                                <img src={c.imageUrl} width="100%" alt="cert" />
                                <button onClick={() => handleDelete('certificates', c.id)} style={{ color: 'red', width: '100%', marginTop: '5px', cursor: 'pointer' }}>Delete</button>
                            </div>
                        ))}
                    </div>
                )}

                {/* ADD FORMS (Aapka pehle wala code same rahega, bas IDs match karlein) */}
                {activeTab === 'addBlog' && (
                    <form onSubmit={handleBlogSubmit}>
                        <h2 style={{ color: 'black' }}>Add Blog</h2>
                        <input style={inputStyle} type="text" placeholder="Title" value={blogForm.title} onChange={e => setBlogForm({ ...blogForm, title: e.target.value })} required />
                        <textarea style={{ ...inputStyle, height: '100px' }} placeholder="Content" value={blogForm.content} onChange={e => setBlogForm({ ...blogForm, content: e.target.value })} required />
                        <input style={inputStyle} type="file" onChange={e => setBlogForm({ ...blogForm, imageFile: e.target.files[0] })} required />
                        <button style={btnStyle} type="submit" disabled={loading}>{loading ? 'Uploading...' : 'Publish'}</button>
                    </form>
                )}

                {activeTab === 'addCert' && (
                    <div>
                        <h2 className='text-black'>Upload Certificate</h2>
                        {/* Cert Image File */}
                        <input style={inputStyle} type="file" accept="image/*" onChange={e => setCertFile(e.target.files[0])} />
                        <button style={btnStyle} onClick={handleCertSubmit} disabled={loading}>
                            {loading ? 'Uploading...' : 'Add Certificate'}
                        </button>
                    </div>
                )}

                {activeTab === 'addProject' && (
                    <form onSubmit={handleProjectSubmit}>
                        <h2 style={{ color: 'black' }}>Add Project</h2>
                        <input style={inputStyle} type="text" placeholder="Project Name" value={projectForm.title} onChange={e => setProjectForm({ ...projectForm, title: e.target.value })} required />
                        <input style={inputStyle} type="text" placeholder="Category" value={projectForm.category} onChange={e => setProjectForm({ ...projectForm, category: e.target.value })} required />
                        <input style={inputStyle} type="text" placeholder="Live Link" value={projectForm.liveLink} onChange={e => setProjectForm({ ...projectForm, liveLink: e.target.value })} />
                        <input style={inputStyle} type="text" placeholder="Github" value={projectForm.githubLink} onChange={e => setProjectForm({ ...projectForm, githubLink: e.target.value })} />
                        <input style={inputStyle} type="file" onChange={e => setProjectForm({ ...projectForm, imageFile: e.target.files[0] })} required />
                        <button style={btnStyle} type="submit" disabled={loading}> {loading ? 'Uploading...' : 'Save Project'}</button>
                    </form>
                )}

                {/* Messages Section */}
                {activeTab === 'messages' && (
                    <div>
                        <h2 style={{ color: 'black' }}>Inquiries</h2>
                        {messages.map(m => (
                            <div key={m.id} style={{ borderBottom: '1px solid #eee', padding: '10px' }}>
                                <p style={{ fontWeight: 'bold', color: 'black' }}>{m.name} ({m.email})</p>
                                <p style={{ color: '#444' }}>{m.message}</p>
                            </div>
                        ))}
                    </div>
                )}
            </div>





            {/* GLOBAL EDIT MODAL */}
            {isEditModalOpen && (
                <div style={modalOverlayStyle}>
                    <div style={modalContentStyle}>
                        <h3 style={{ color: 'black' }}>Edit {editType === 'blog' ? 'Blog' : 'Project'}</h3>
                        <form onSubmit={handleGlobalUpdate}>
                            <input style={inputStyle} value={currentItem.title} onChange={e => setCurrentItem({ ...currentItem, title: e.target.value })} />
                            {editType === 'blog' ? (
                                <textarea style={{ ...inputStyle, height: '80px' }} value={currentItem.content} onChange={e => setCurrentItem({ ...currentItem, content: e.target.value })} />
                            ) : (
                                <>
                                    <input style={inputStyle} value={currentItem.category} onChange={e => setCurrentItem({ ...currentItem, category: e.target.value })} />
                                    <input style={inputStyle} value={currentItem.liveLink} onChange={e => setCurrentItem({ ...currentItem, liveLink: e.target.value })} />
                                    <input style={inputStyle} value={currentItem.githubLink} onChange={e => setCurrentItem({ ...currentItem, githubLink: e.target.value })} />
                                </>
                            )}
                            <label style={{ color: 'gray', fontSize: '12px' }}>Change Image (Optional):</label>
                            <input style={inputStyle} type="file" onChange={e => setNewImageFile(e.target.files[0])} />
                            <button style={btnStyle} type="submit" disabled={loading}>{loading ? 'Updating...' : 'Update'}</button>
                            <button style={{ ...btnStyle, background: '#ccc', marginLeft: '10px' }} onClick={() => setIsEditModalOpen(false)}>Cancel</button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );

    // Helper to render table
    function renderTable(data, type, editFn) {
        return (
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead><tr style={{ background: '#f8f9fa', textAlign: 'left' }}><th style={{ padding: '10px', color: 'black' }}>Title / Name</th><th style={{ padding: '10px', color: 'black' }}>Actions</th></tr></thead>
                <tbody>
                    {data.map(item => (
                        <tr key={item.id} style={{ borderBottom: '1px solid #eee' }}>
                            <td style={{ padding: '10px', color: 'black' }}>{item.title}</td>
                            <td>
                                <button onClick={() => editFn(item, type === 'blogs' ? 'blog' : 'project')} style={{ color: 'green', background: 'none', border: 'none', cursor: 'pointer', marginRight: '10px' }}>Edit</button>
                                <button onClick={() => handleDelete(type, item.id)} style={{ color: 'red', background: 'none', border: 'none', cursor: 'pointer' }}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        );
    }
};

// Styles (same as your original)
const inputStyle = { width: '100%', padding: '10px', marginBottom: '10px', borderRadius: '5px', border: '1px solid #ddd', color: 'black' };
const btnStyle = { background: '#4361ee', color: 'white', padding: '10px 20px', border: 'none', borderRadius: '5px', cursor: 'pointer' };
const modalOverlayStyle = { position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', background: 'rgba(0,0,0,0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000 };
const modalContentStyle = { background: 'white', padding: '25px', borderRadius: '10px', width: '400px' };

export default AdminDashboard;