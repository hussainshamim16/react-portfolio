// (function () {
//     // wait for everything to be ready (DOM, images, etc.)
//     window.addEventListener('load', function () {
//         // --- BOILERPLATE GSAP SMOOTH SCROLLER (VERTICAL) ---

//         // 1. Register plugins (ScrollTrigger & ScrollSmoother are already in scope)
//         gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

//         // 2. Create the ScrollSmoother instance.
//         //    - smooth: 1.2  → strength / duration of the inertia (1 = no inertia, 2 = very smooth)
//         //    - effects: true → enables data-speed and data-lag (optional, but we can keep it)
//         //    - We target the wrapper and content by their IDs.
//         let smoother = ScrollSmoother.create({
//             wrapper: '#smooth-wrapper',
//             content: '#smooth-content',
//             smooth: 1.5,          // 1.5 gives a pleasant smoothness, adjust to taste
//             effects: true,         // allow future data-speed / data-lag attributes
//             normalizeScroll: true, // normalize scroll behavior across devices (touch + wheel)
//             ignoreMobileResize: true, // prevent issues on mobile orientation change
//         });

//         // 3. (Optional) simple animation to show that ScrollTrigger still works:
//         //    For demo, we fade in cards when they enter view.
//         gsap.utils.toArray('.card').forEach(card => {
//             gsap.fromTo(card,
//                 { opacity: 0, y: 40, scale: 0.9 },
//                 {
//                     opacity: 1,
//                     y: 0,
//                     scale: 1,
//                     duration: 1.2,
//                     ease: 'power2.out',
//                     scrollTrigger: {
//                         trigger: card,
//                         start: 'top bottom-=10',  // when card top hits bottom of viewport minus offset
//                         end: 'bottom center',
//                         toggleActions: 'play none none reverse', // play on enter, reverse on leave
//                         // markers: false,    // set to true for debugging
//                     }
//                 }
//             );
//         });

//         // 4. (Optional) Animate section headings for a bit of flair
//         gsap.utils.toArray('h1').forEach(heading => {
//             gsap.fromTo(heading,
//                 { textShadow: '0 0 10px rgba(0,200,255,0)', y: 30 },
//                 {
//                     textShadow: '0 0 20px rgba(100,230,255,0.6)',
//                     y: 0,
//                     duration: 1,
//                     scrollTrigger: {
//                         trigger: heading,
//                         start: 'top 80%',
//                         toggleActions: 'play reverse play reverse',
//                     }
//                 }
//             );
//         });

//         // Refresh ScrollTrigger after setup to avoid miscalculations
//         ScrollTrigger.refresh();

//         // (optional small feedback in console)
//         console.log('GSAP smooth scroller active – enjoy vertical glide');
//     });
// })();



//   firebase
import { initializeApp } from "firebase/app";
import { getFirestore,collection ,doc,addDoc ,setDoc ,getDocs, query, orderBy ,deleteDoc,getDoc,updateDoc} from "firebase/firestore"; // Example: for Firestore database
// import { getAuth } from "firebase/auth";       // Example: for Authentication

// Paste your Firebase config object here
const firebaseConfig = {
    apiKey: "AIzaSyDjgtziOxqrUwRdL5R-pFbUAq4xTbeb56M",
    authDomain: "hsport04.firebaseapp.com",
    projectId: "hsport04",
    storageBucket: "hsport04.firebasestorage.app",
    messagingSenderId: "972347116336",
    appId: "1:972347116336:web:d2f905a3acb7080d9b56f5"
};

// Initialize Firebase
// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);

export{db,collection,doc,addDoc ,setDoc,getDocs, query, orderBy ,deleteDoc,getDoc,updateDoc }



// console.log(app)