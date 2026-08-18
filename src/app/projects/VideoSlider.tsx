// "use client";

// import { useRef, useState, useEffect } from "react";
// import Slider from "react-slick";
// import ReactPlayer from "react-player";

// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";

// export default function VideoSlider() {
//   const sliderRef = useRef<Slider | null>(null);
//   const playerRefs = useRef<(HTMLVideoElement | null)[]>([]);
//   const [currentSlide, setCurrentSlide] = useState(0);
//   const [isPlaying, setIsPlaying] = useState(false);
//   const [isMounted, setIsMounted] = useState(false);

//   const videoUrls = [
//     "https://res.cloudinary.com/dnevlp0j4/video/upload/v1781086352/Etala_Final_Video_10-6_pg9wcj.mp4",
//     "https://res.cloudinary.com/dnevlp0j4/video/upload/v1783429274/ETALA_Story1_dgxjrf.mp4",
//     "https://res.cloudinary.com/dnevlp0j4/video/upload/v1784468034/Story_3_lrnkhy.mp4",
//     "https://res.cloudinary.com/dnevlp0j4/video/upload/v1785673937/Story_4_52_wefd1j.mp4",
//   ];

//   useEffect(() => {
//     setIsMounted(true);
//     setCurrentSlide(0);
//     setIsPlaying(true);

//     // Force slick to show first slide after rtl change
//     setTimeout(() => {
//       sliderRef.current?.slickGoTo(0, true);
//     }, 0);
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, []);

//   const handleEnded = () => {
//     sliderRef.current?.slickNext();
//   };

//   const handlePause = () => setIsPlaying(false);
//   const handlePlay = () => setIsPlaying(true);

//   const settings = {
//     infinite: true,
//     speed: 500,
//     slidesToShow: 1,
//     slidesToScroll: 1,
//     arrows: false,
//     swipe: true,
//     touchMove: true,
//     beforeChange: (current: number) => {
//       const player = playerRefs.current[current];
//       if (player) {
//         player.pause();
//         player.currentTime = 0;
//       }
//     },
//     afterChange: (index: number) => {
//       setCurrentSlide(index);
//       setIsPlaying(true);
//     },
//   };

//   if (!isMounted) return null;

//   return (
//     <div className="w-full h-full rounded-[2.5rem] overflow-hidden absolute inset-0">
//       <Slider
//         ref={sliderRef}
//         {...settings}
//         className="w-full h-full"
//       >
//         {videoUrls.map((url, index) => (
//           <div key={index} className="w-full h-full">
//             {currentSlide === index ? (
//               <ReactPlayer
//                 ref={(el: HTMLVideoElement | null) => {
//                   playerRefs.current[index] = el;
//                 }}
//                 src={url}
//                 width="100%"
//                 height="100%"
//                 controls
//                 playing={isPlaying}
//                 onEnded={handleEnded}
//                 onPause={handlePause}
//                 onPlay={handlePlay}
//                 muted
//                 playsInline
//                 preload="auto"
//               />
//             ) : (
//               <div className="w-full h-full bg-black" />
//             )}
//           </div>
//         ))}
//       </Slider>
//     </div>
//   );
// }