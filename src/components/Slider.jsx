import React, { useRef, useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { db } from '../data/scroll';
import { collection, getDocs } from 'firebase/firestore';
import 'swiper/css';
import slide1 from '../assets/slide.webp'

const SliderSwiper = () => {
    const swiperRef = useRef(null);
    const [certificates, setCertificates] = useState([]);
    const [loading, setLoading] = useState(true);

    // Fetch certificates from Firebase
    useEffect(() => {
        const fetchCertificates = async () => {
            try {
                const certSnap = await getDocs(collection(db, "certificates"));
                const certsData = certSnap.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                }));
                setCertificates(certsData);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching certificates:", error);
                setLoading(false);
            }
        };

        fetchCertificates();
    }, []);

    // Default slides in case no certificates are found
    const defaultSlides = [
        {
            id: 1,
            title: "For Individuals",
            description: "Optimize your personal health, sleep patterns, and daily energy.",
            bgImage: slide1,
        },
        {
            id: 2,
            title: "For Couples",
            description: "Track sleep, recovery and wellness together.",
            bgImage: slide1,
            logoText: "ORION",
        },
        {
            id: 3,
            title: "For Athletes",
            description: "Push your limits with real-time strain and recovery analytics.",
            bgImage: slide1,
        }
    ];

    // Use certificates from Firebase if available, otherwise use default slides
    const slides = certificates.length > 0
        ? certificates.map((cert, index) => ({
            id: cert.id,
            title: `Certificate ${index + 1}`,
            description: "Professional Certificate",
            bgImage: cert.imageUrl,
            isCertificate: true,
            createdAt: cert.createdAt
        }))
        : defaultSlides;

    if (loading) {
        return (
            <div className="relative w-full py-20 flex items-center justify-center">
                <div className="text-white text-xl">Loading certificates...</div>
            </div>
        );
    }

    return (
        <div className="relative w-full py-20 overflow-hidden font-sans select-none">

            {/* Massive Background Heading */}

            <h2 className="text-3xl font-bold text-white text-center">My Certificates</h2>


            {/* Slider Container */}
            <div className="relative z-10 mt-4">
                <Swiper
                    onBeforeInit={(swiper) => {
                        swiperRef.current = swiper;
                    }}
                    slidesPerView={1.2}
                    centeredSlides={true}
                    loop={true}
                    initialSlide={1}
                    spaceBetween={20}
                    breakpoints={{
                        640: { slidesPerView: 1.5, spaceBetween: 30 },
                        1024: { slidesPerView: 1.8, spaceBetween: 40 },
                        1440: { slidesPerView: 2.1, spaceBetween: 40 },
                    }}
                    className="w-full !overflow-visible"
                >
                    {slides.map((slide) => (
                        <SwiperSlide key={slide.id} className="transition-all duration-500 ease-out">
                            {({ isActive }) => (
                                <div className="flex flex-col w-full">

                                    {/* Card Image Block */}
                                    <div
                                        className={`relative w-full aspect-[16/10] md:aspect-[16/9] rounded-[2rem] overflow-hidden bg-gray-200 transition-all duration-500 bg-cover bg-center ${isActive ? 'scale-100 opacity-100 shadow-xl' : 'scale-[0.96] opacity-40 blur-[1px]'
                                            }`}
                                        style={{ backgroundImage: `url(${slide.bgImage})` }}
                                    >
                                        {/* Active Slide Interactive Elements */}
                                        {isActive && (
                                            <div className="absolute inset-0 p-8 flex flex-col justify-between bg-black/30">
                                                {/* Top Left Brand Tag */}
                                                {slide.logoText && (
                                                    <span className="text-white text-xs font-bold tracking-[0.4em] uppercase opacity-90">
                                                        {slide.logoText}
                                                    </span>
                                                )}

                                            </div>
                                        )}
                                    </div>

                                    {/* Active Slide Metadata & Navigation Controls */}
                                    <div className={`mt-8 px-4 flex flex-col md:flex-row md:items-end md:justify-between transition-all duration-500 ${isActive ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'
                                        }`}>
                                        <div>
                                            <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight">
                                                {slide.title}
                                            </h2>
                                            <p className="mt-2 text-sm text-[#70757a] font-normal tracking-wide max-w-sm">
                                                {slide.description}
                                            </p>
                                        </div>

                                        {/* Custom Nav Handles */}
                                        <div className="flex items-center gap-3 mt-6 md:mt-0">
                                            <button
                                                onClick={() => swiperRef.current?.slidePrev()}
                                                className="w-12 h-12 flex items-center justify-center rounded-full bg-[#1c1c1e] text-white hover:bg-black transition-colors"
                                            >
                                                <ArrowLeft className="w-5 h-5" />
                                            </button>
                                            <button
                                                onClick={() => swiperRef.current?.slideNext()}
                                                className="w-12 h-12 flex items-center justify-center rounded-full bg-[#f1f3f5] text-black border border-gray-200 hover:bg-gray-200 transition-colors"
                                            >
                                                <ArrowRight className="w-5 h-5" />
                                            </button>
                                        </div>
                                    </div>

                                </div>
                            )}
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </div>
    );
};

export default SliderSwiper;