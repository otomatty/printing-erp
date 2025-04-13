interface PageHeroProps {
	title: string;
	subtitle: string;
}

export default function PageHero({ title, subtitle }: PageHeroProps) {
	return (
		<div className="relative h-[30vh] min-h-[240px] w-full flex items-center justify-center overflow-hidden bg-primary">
			<div className="container mx-auto px-4 z-10 text-center text-white">
				<h1 className="text-4xl md:text-5xl font-bold mb-4">{title}</h1>
				<p className="text-lg max-w-2xl mx-auto">{subtitle}</p>
			</div>
		</div>
	);
}
