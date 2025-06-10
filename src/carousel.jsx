import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function Carousel() {

	const images = [
    {
      src: "https://cdn.pixabay.com/photo/2020/03/18/06/06/street-4942809_1280.jpg",
      alt: "image",
    },
    {
      src: "https://cdn.pixabay.com/photo/2023/01/08/08/40/road-7704729_1280.jpg",
      alt: "nord2 image",
    },
    {
      src: "https://cdn.pixabay.com/photo/2022/03/20/15/40/nature-7081138_960_720.jpg",
      alt: "image",
    },
    {
      src: "https://cdn.pixabay.com/photo/2019/07/13/16/44/woman-4335235_1280.jpg",
      alt: "image",
    },
    {
      src: "https://cdn.pixabay.com/photo/2021/07/05/15/18/senbon-torii-6389421_1280.jpg",
      alt: "image",
    },
  ];

	const [imageIndex, setImageIndex] = useState(1);
	const [jump, setJump] = useState(false);
	const [transitioning, setTransitioning] = useState(false);

	const slides = [images[images.length - 1], ...images, images[0]];

	useEffect(() => {
		const timeoutId = setTimeout(() => {
			showNextImage();
		}, 5000);

		return () => {
			clearTimeout(timeoutId);
		};
	}, [imageIndex]);

	function showNextImage() {
		if (transitioning) return;

		if (imageIndex === 1 && jump) {
			setJump(false);
		}

		if (imageIndex === slides.length - 2 && jump) {
			setJump(false);
		}

		setImageIndex((index) => {
			if (index === slides.length - 1) {
				return 1;
			}
			return index + 1;
		});
	}

	function showPrevImage() {
		if (transitioning) return;

		if (imageIndex === 1 && jump) {
			setJump(false);
		}

		if (imageIndex === slides.length - 2 && jump) {
			setJump(false);
		}

		setImageIndex((index) => {
			if (index === 0) {
				return slides.length - 2;
			}
			return index - 1;
		});
	}

	return (
		<div className="relative w-full h-screen overflow-hidden">
			<div
				style={{
					transform: `translate3d(-${imageIndex * 100}%, 0, 0)`,
					willChange: "transform",
				}}

				onTransitionStart={() => {
					setTransitioning(true);
				}}

				onTransitionEnd={() => {
					if (imageIndex === slides.length - 1) {
						setJump(true);
						setImageIndex(1);
					} else if (imageIndex === 0) {
						setJump(true);
						setImageIndex(slides.length - 2);
					}

					setTransitioning(false);
				}}
				data-jump={jump}
				className={`w-full h-full data-[jump=true]:transition-none
				 data-[jump=false]:transition-transform ease-in-out duration-300 sm:duration-500 md:duration-700 lg:duration-1000 flex relative`}
			>
				{slides?.map((image, index) => {
					return (
						<img
							className="w-full h-full select-none shrink-0 grow-0 object-cover object-center"
							key={`${image.src.toString()}-${index}`}
							src={image.src.toString()}
							alt={image.alt.toString()}
						/>
					);
				})}
			</div>

			<button
				disabled={transitioning}
				onClick={showPrevImage}
				className="absolute disabled:opacity-50 top-1/2 left-5 sm:left-10 -translate-y-1/2 text-white p-2 w-10 h-10 active:not-disabled:scale-90 hover:not-disabled:scale-110 transition-transform duration-300 flex justify-center items-center rounded-full outline-none border-none focus-visible:ring-2 focus:ring-blue-500 bg-black/20 sm:bg-white sm:text-black cursor-pointer"
				aria-label="view previous image"
			>
				<ChevronLeft />
			</button>
			<button
				disabled={transitioning}
				onClick={showNextImage}
				className="absolute disabled:opacity-50 top-1/2 right-5 sm:right-10 -translate-y-1/2  text-white p-2 w-10 h-10 active:not-disabled:scale-90 hover:not-disabled:scale-110 transition-transform duration-300 flex justify-center items-center rounded-full outline-none border-none focus-visible:ring-2 focus:ring-blue-500 bg-black/20 sm:bg-white sm:text-black cursor-pointer"
				aria-label="view next image"
			>
				<ChevronRight />
			</button>

			<div className="absolute bottom-5 left-0 right-0 flex justify-center items-center gap-2 p-4">
				{images.map((_, index) => (
					<button
						data-jump={jump}
						data-active={(index+1) === imageIndex}
						style={{
							willChange: "transform",
						}}
						className="w-1 h-2 sm:w-3 sm:h-3 data-[active=true]:scale-110 data-[active=true]:shadow-md data-[active=false]:shadow-none data-[active=false]:scale-100 data-[jump=true]:transition-none data-[jump=false]:transition-transform duration-300 ease-in-out sm:duration-500 md:duration-700 lg:duration-1000 rounded-full border border-white outline-none focus:ring-2 data-[active=true]:bg-white data-[active=false]:bg-transparent p-1"
						key={index+1}
						onClick={() => {
							setImageIndex(index+1);
						}}
						aria-label={`view image ${index+1}`}
					></button>
				))}
			</div>
		</div>
	);
}
