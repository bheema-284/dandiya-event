export default function GalleryCard() {
  // The number of images has been increased to 30 to better showcase the repeating pattern.
  // You can change this number as needed.
  const galleryItems = [...Array(30)].map((_, index) => ({
    id: index,
    // Using a reliable placeholder service for predictable image display.
    image: `https://randomuser.me/api/portraits/women/${index + 10}.jpg`,
    alt: `Gallery image ${index + 1}`,
  }));

  // This layout array precisely defines the grid positions to match the image
  // (large image on the right).
  const standardLayout = [
    { span: 'col-span-1 row-span-1' },
    { span: 'col-span-1 row-span-1' },
    { span: 'col-span-1 row-span-1' },
    { span: 'col-span-1 row-span-1' },
    { span: 'col-span-2 row-span-2' },
    { span: 'col-span-1 row-span-1' },
  ];

  // This is the reversed layout, with the large image on the left.
  const reversedLayout = [
    { span: 'col-span-2 row-span-2' },
    { span: 'col-span-1 row-span-1' },
    { span: 'col-span-1 row-span-1' },
    { span: 'col-span-1 row-span-1' },
    { span: 'col-span-1 row-span-1' },
    { span: 'col-span-1 row-span-1' },
  ];

  const combinedItems = galleryItems.map((item, index) => {
    // Determine which layout to use based on the block of 6 items.
    const layoutIndex = index % 6; // Position within the current block (0-5)
    // Check if we're in an even-numbered block (0, 2, 4...)
    const isStandardLayout = Math.floor(index / 6) % 2 === 0;
    const layout = isStandardLayout ? standardLayout : reversedLayout;
    
    return {
      ...item,
      span: layout[layoutIndex].span,
    };
  });

  return (
    <div className="bg-white p-6 rounded-lg shadow w-full">
      <h3 className="font-bold text-lg mb-2">Gallery</h3>
      <p className="text-gray-400 mb-4 text-sm">156 Photos</p>
      <div className="grid grid-cols-3 gap-2 overflow-y-scroll">
        {combinedItems.map((item) => (
          <div key={item.id} className={`${item.span} rounded overflow-hidden`}>
            <img
              src={item.image}
              alt={item.alt}
              className="w-full h-full object-cover"
            />
          </div>
        ))}
      </div>
    </div>
  );
}