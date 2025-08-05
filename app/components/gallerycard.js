export default function GalleryCard() {
  const galleryItems = [...Array(15)].map((_, index) => ({
    id: index,
    image: `https://randomuser.me/api/portraits/women/${index + 2}.jpg`,
  }));

  // Shuffle the array to show images randomly
  const shuffledItems = galleryItems.sort(() => 0.5 - Math.random());

  return (
    <div className="bg-white p-6 rounded-lg shadow w-80">
      <h3 className="font-bold text-lg mb-2">Gallery</h3>
      <p className="text-gray-400 mb-4 text-sm">156 Photos</p>
      <div className="flex flex-wrap gap-2 max-h-96 overflow-y-scroll">
        {shuffledItems.map((item) => (
          <div key={item.id} className="w-24 h-24 rounded overflow-hidden flex-none">
            <img
              src={item.image}
              alt={`gallery-${item.id + 1}`}
              className="w-full h-full object-cover"
            />
          </div>
        ))}
      </div>
    </div>
  );
}